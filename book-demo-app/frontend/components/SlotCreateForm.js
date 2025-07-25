"use client";

import { useState } from "react";
import { addMinutes, format, parse, isAfter } from "date-fns";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const defaultIntervals = [10, 20, 30, 40, 60];

function getNextDateOfDay(startDate, dayIndex) {
  const date = new Date(startDate);
  const diff = (dayIndex + 1 - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}


function generateSlotsForWeek(slotConfig, weekStartDate) {
  let slots = [];
  daysOfWeek.forEach((day, idx) => {
    const config = slotConfig[idx];
    if (config.isOff) return;
    const slotDate = getNextDateOfDay(weekStartDate, idx);


    const minStart = "09:00";
    const maxEnd = "18:30";
    const startTime = config.startTime < minStart ? minStart : config.startTime;
    const endTime = config.endTime > maxEnd ? maxEnd : config.endTime;

    let currentTime = parse(startTime, "HH:mm", slotDate);
    const realEndTime = parse(endTime, "HH:mm", slotDate);
    while (isAfter(realEndTime, currentTime) || format(currentTime, "HH:mm") === endTime) {
      const slotEnd = addMinutes(currentTime, config.interval);
      if (isAfter(slotEnd, realEndTime)) break;
      slots.push({
        date: format(slotDate, "yyyy-MM-dd"),
        start_time: format(currentTime, "HH:mm"),
        end_time: format(slotEnd, "HH:mm"),
      });
      currentTime = slotEnd;
    }
  });
  return slots;
}

export default function SlotCreateForm() {
  const [slotConfig, setSlotConfig] = useState(
    daysOfWeek.map(day => ({
      day,
      isOff: false,
      startTime: "09:00",
      endTime: "18:30",
      interval: 30,
    }))
  );
  const [weekStart, setWeekStart] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [weeksCount, setWeeksCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [preview, setPreview] = useState([]);

  const handleDayChange = (idx, field, value) => {
    setSlotConfig(prev =>
      prev.map((d, i) =>
        i === idx ? { ...d, [field]: value } : d
      )
    );
  };

  const handlePreview = () => {
    if (!weekStart) {
      setMessage({ type: "error", text: "Select a start week." });
      return;
    }
    let allSlots = [];
    for (let w = 0; w < (recurring ? weeksCount : 1); ++w) {
      const weekDate = new Date(weekStart);
      weekDate.setDate(weekDate.getDate() + w * 7);
      allSlots = allSlots.concat(generateSlotsForWeek(slotConfig, weekDate));
    }
    setPreview(allSlots);
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      let allSlots = [];
      for (let w = 0; w < (recurring ? weeksCount : 1); ++w) {
        const weekDate = new Date(weekStart);
        weekDate.setDate(weekDate.getDate() + w * 7);
        allSlots = allSlots.concat(generateSlotsForWeek(slotConfig, weekDate));
      }
      if (allSlots.length === 0) throw new Error("No slots to create.");
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "${API_BASE_URL}";
       const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://book-demo-app-1.onrender.com";
      const res = await fetch(`${apiUrl}/api/slots/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots: allSlots }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error creating slots");
      }
      setMessage({ type: "success", text: "Slots created successfully!" });
      setPreview([]);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const themePrimary = "var(--theme-primary)";
  const themePrimaryLight = "var(--theme-primary-light)";
  const themeBgLight = "var(--theme-bg-light)";
  const themeCard = "var(--theme-card)";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-3xl mx-auto my-8 px-2 sm:px-6 py-5 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-700 z-10"
      style={{
        background: "var(--theme-card, #fff)",
        borderWidth: 2,
        borderColor: themePrimary,
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent"
        style={{
          boxShadow: "0 0 16px 2px #005e6a33, 0 0 0 8px #3ecbdb22 inset"
        }}
      />
      <h2
        className="text-2xl sm:text-3xl font-extrabold mb-6 text-center drop-shadow animate-fade-in"
        style={{ color: themePrimary }}
      >
        Create Recurring Slots
      </h2>
      <div className="mb-5 animate-fade-in delay-100">
        <label className="block mb-1 font-medium" style={{ color: themePrimary }}>
          Start week (Monday)
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-[color:var(--theme-primary-light)]"
          style={{ borderColor: themePrimary, color: themePrimary }}
          value={weekStart}
          onChange={e => setWeekStart(e.target.value)}
          required
        />
        <div className="text-xs pt-1" style={{ color: themePrimaryLight }}>
          Pick the Monday of the week you want to start from
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up delay-150">
        {slotConfig.map((dayConfig, idx) => (
          <div
            key={dayConfig.day}
            className="border rounded-xl p-4 flex flex-col gap-2 shadow hover:shadow-lg transition-all animate-fade-in-up"
            style={{
              background: themeBgLight,
              borderColor: themePrimaryLight,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold" style={{ color: themePrimaryLight }}>{dayConfig.day}</span>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={dayConfig.isOff}
                  onChange={e =>
                    handleDayChange(idx, "isOff", e.target.checked)
                  }
                  className="accent-[color:var(--theme-primary-light)]"
                />
                <span className="text-sm text-gray-500">Weekly Off</span>
              </label>
            </div>
            {!dayConfig.isOff && (
              <>
                <div className="flex gap-2 items-center">
                  <label style={{ color: themePrimary }}>From:</label>
                  <input
                    type="time"
                    min="09:00"
                    max="18:30"
                    value={dayConfig.startTime}
                    onChange={e =>
                      handleDayChange(idx, "startTime", e.target.value)
                    }
                    className="border rounded px-2 py-1 bg-white/80 focus:ring-2 focus:ring-[color:var(--theme-primary-light)]"
                    style={{ borderColor: themePrimaryLight, color: themePrimary }}
                  />
                  <label style={{ color: themePrimary }}>To:</label>
                  <input
                    type="time"
                    min="09:00"
                    max="18:30"
                    value={dayConfig.endTime}
                    onChange={e =>
                      handleDayChange(idx, "endTime", e.target.value)
                    }
                    className="border rounded px-2 py-1 bg-white/80 focus:ring-2 focus:ring-[color:var(--theme-primary-light)]"
                    style={{ borderColor: themePrimaryLight, color: themePrimary }}
                  />
                </div>
                <div>
                  <label style={{ color: themePrimary }} className="mr-2">Interval:</label>
                  <select
                    value={dayConfig.interval}
                    onChange={e =>
                      handleDayChange(idx, "interval", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 bg-white/80 focus:ring-2 focus:ring-[color:var(--theme-primary-light)]"
                    style={{ borderColor: themePrimaryLight, color: themePrimary }}
                  >
                    {defaultIntervals.map(intv => (
                      <option key={intv} value={intv}>{intv} min</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 items-center my-6 animate-fade-in delay-200">
        <input
          type="checkbox"
          checked={recurring}
          onChange={e => setRecurring(e.target.checked)}
          className="accent-[color:var(--theme-primary-light)]"
        />
        <span style={{ color: themePrimary }}>Apply these timings for multiple weeks</span>
        {recurring && (
          <>
            <input
              type="number"
              min={1}
              max={52}
              value={weeksCount}
              onChange={e => setWeeksCount(Number(e.target.value))}
              className="w-16 border rounded p-1 bg-white/80 focus:ring-2 focus:ring-[color:var(--theme-primary-light)]"
              style={{ borderColor: themePrimaryLight, color: themePrimary }}
            />
            <span className="text-gray-500">weeks</span>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-500 transition-all active:scale-95 animate-fade-in delay-250"
          onClick={handlePreview}
        >
          Preview Slots
        </button>
        <button
          type="submit"
          className="bg-[color:var(--theme-primary)] text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-[color:var(--theme-primary-light)] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary-light)] animate-fade-in delay-300"
          disabled={loading}
        >
          {loading ? (
            <span>
              <svg className="w-5 h-5 inline-block mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating...
            </span>
          ) : "Create Slots"}
        </button>
      </div>
      {message.text && (
        <div
          className={`text-center mt-4 font-semibold animate-fade-in-up ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message.text}
        </div>
      )}
      {preview && preview.length > 0 && (
        <div
          className="mt-8 max-h-60 overflow-y-auto rounded-xl p-4 shadow animate-fade-in-up delay-400"
          style={{
            background: themeBgLight,
            borderWidth: 2,
            borderColor: themePrimaryLight,
          }}
        >
          <div className="font-semibold mb-2" style={{ color: themePrimaryLight }}>
            Slot Preview ({preview.length} slots):
          </div>
          <ul className="text-xs space-y-1 font-mono">
            {preview.map((slot, i) => (
              <li key={i} style={{ color: themePrimary }}>
                {slot.date} | {slot.start_time} - {slot.end_time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}