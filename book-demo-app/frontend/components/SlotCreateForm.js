// "use client";

// import { useState } from "react";

// export default function SlotCreateForm() {
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const res = await fetch("/api/slots", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ date, start_time: startTime, end_time: endTime }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Error creating slot");
//       }

//       setMessage({ type: "success", text: "Slot created successfully!" });
//       setDate("");
//       setStartTime("");
//       setEndTime("");
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow space-y-6"
//     >
//       <h2 className="text-2xl font-bold mb-4">Create a Slot</h2>
//       <div>
//         <label className="block mb-1 font-medium">Date</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded"
//           value={date}
//           onChange={e => setDate(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">Start Time</label>
//         <input
//           type="time"
//           className="w-full p-2 border rounded"
//           value={startTime}
//           onChange={e => setStartTime(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">End Time</label>
//         <input
//           type="time"
//           className="w-full p-2 border rounded"
//           value={endTime}
//           onChange={e => setEndTime(e.target.value)}
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Creating..." : "Create Slot"}
//       </button>
//       {message.text && (
//         <div
//           className={`text-center mt-3 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
//         >
//           {message.text}
//         </div>
//       )}
//     </form>
//   );
// }







"use client";
import { useState } from "react";
import { addMinutes, format, parse, isAfter } from "date-fns";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const defaultIntervals = [10, 20, 30, 40, 60]; // Add more if you want

function getNextDateOfDay(startDate, dayIndex) {
  // Returns the date of the next ‘dayIndex’ (0=Monday) after startDate (inclusive)
  const date = new Date(startDate);
  const diff = (dayIndex + 1 - date.getDay() + 7) % 7; // JS: Sunday is 0, so +1
  date.setDate(date.getDate() + diff);
  return date;
}

function generateSlotsForWeek(slotConfig, weekStartDate) {
  // Returns array of {date, start_time, end_time}
  let slots = [];
  daysOfWeek.forEach((day, idx) => {
    const config = slotConfig[idx];
    if (config.isOff) return;
    // Calculate the date of this day in the selected week
    const slotDate = getNextDateOfDay(weekStartDate, idx);
    let currentTime = parse(config.startTime, "HH:mm", slotDate);
    const endTime = parse(config.endTime, "HH:mm", slotDate);
    while (isAfter(endTime, currentTime) || format(currentTime, "HH:mm") === config.endTime) {
      const slotEnd = addMinutes(currentTime, config.interval);
      if (isAfter(slotEnd, endTime)) break;
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
      endTime: "17:00",
      interval: 30,
    }))
  );
  const [weekStart, setWeekStart] = useState(""); // Monday of the week
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
      // Generate all slots as [{date, start_time, end_time}]
      let allSlots = [];
      for (let w = 0; w < (recurring ? weeksCount : 1); ++w) {
        const weekDate = new Date(weekStart);
        weekDate.setDate(weekDate.getDate() + w * 7);
        allSlots = allSlots.concat(generateSlotsForWeek(slotConfig, weekDate));
      }
      if (allSlots.length === 0) throw new Error("No slots to create.");
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Send to backend
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Create Recurring Slots</h2>
      <div>
        <label className="block mb-1 font-medium">Start week (Monday)</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-2"
          value={weekStart}
          onChange={e => setWeekStart(e.target.value)}
          required
        />
        <div className="text-xs text-gray-500">Pick the Monday of the week you want to start from</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slotConfig.map((dayConfig, idx) => (
          <div key={dayConfig.day} className="border rounded p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">{dayConfig.day}</span>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={dayConfig.isOff}
                  onChange={e =>
                    handleDayChange(idx, "isOff", e.target.checked)
                  }
                />
                <span className="text-sm">Weekly Off</span>
              </label>
            </div>
            {!dayConfig.isOff && (
              <>
                <div className="flex gap-2 items-center">
                  <label>From:</label>
                  <input
                    type="time"
                    value={dayConfig.startTime}
                    onChange={e =>
                      handleDayChange(idx, "startTime", e.target.value)
                    }
                  />
                  <label>To:</label>
                  <input
                    type="time"
                    value={dayConfig.endTime}
                    onChange={e =>
                      handleDayChange(idx, "endTime", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Interval:</label>
                  <select
                    value={dayConfig.interval}
                    onChange={e =>
                      handleDayChange(idx, "interval", Number(e.target.value))
                    }
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
      <div className="flex gap-3 items-center my-4">
        <input
          type="checkbox"
          checked={recurring}
          onChange={e => setRecurring(e.target.checked)}
        />
        <span>Apply these timings for multiple weeks</span>
        {recurring && (
          <input
            type="number"
            min={1}
            max={52}
            value={weeksCount}
            onChange={e => setWeeksCount(Number(e.target.value))}
            className="ml-2 w-16 border rounded p-1"
          />
        )}
        {recurring && <span>weeks</span>}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
          onClick={handlePreview}
        >
          Preview Slots
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Slots"}
        </button>
      </div>
      {message.text && (
        <div
          className={`text-center mt-3 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message.text}
        </div>
      )}
      {preview && preview.length > 0 && (
        <div className="mt-6 max-h-60 overflow-y-auto border rounded bg-gray-50 p-4">
          <div className="font-semibold mb-2">Slot Preview ({preview.length} slots):</div>
          <ul className="text-xs space-y-1">
            {preview.map((slot, i) => (
              <li key={i}>{slot.date} | {slot.start_time} - {slot.end_time}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}