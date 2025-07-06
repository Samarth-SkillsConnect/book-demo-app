// "use client";
// import { useState } from "react";
// import { addMinutes, format, parse, isAfter } from "date-fns";

// const daysOfWeek = [
//   "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
// ];

// const defaultIntervals = [10, 20, 30, 40, 60]; // Add more if you want

// function getNextDateOfDay(startDate, dayIndex) {
//   // Returns the date of the next ‘dayIndex’ (0=Monday) after startDate (inclusive)
//   const date = new Date(startDate);
//   const diff = (dayIndex + 1 - date.getDay() + 7) % 7; // JS: Sunday is 0, so +1
//   date.setDate(date.getDate() + diff);
//   return date;
// }

// function generateSlotsForWeek(slotConfig, weekStartDate) {
//   // Returns array of {date, start_time, end_time}
//   let slots = [];
//   daysOfWeek.forEach((day, idx) => {
//     const config = slotConfig[idx];
//     if (config.isOff) return;
//     // Calculate the date of this day in the selected week
//     const slotDate = getNextDateOfDay(weekStartDate, idx);
//     let currentTime = parse(config.startTime, "HH:mm", slotDate);
//     const endTime = parse(config.endTime, "HH:mm", slotDate);
//     while (isAfter(endTime, currentTime) || format(currentTime, "HH:mm") === config.endTime) {
//       const slotEnd = addMinutes(currentTime, config.interval);
//       if (isAfter(slotEnd, endTime)) break;
//       slots.push({
//         date: format(slotDate, "yyyy-MM-dd"),
//         start_time: format(currentTime, "HH:mm"),
//         end_time: format(slotEnd, "HH:mm"),
//       });
//       currentTime = slotEnd;
//     }
//   });
//   return slots;
// }

// export default function SlotCreateForm() {
//   const [slotConfig, setSlotConfig] = useState(
//     daysOfWeek.map(day => ({
//       day,
//       isOff: false,
//       startTime: "09:00",
//       endTime: "17:00",
//       interval: 30,
//     }))
//   );
//   const [weekStart, setWeekStart] = useState(""); // Monday of the week
//   const [recurring, setRecurring] = useState(false);
//   const [weeksCount, setWeeksCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [preview, setPreview] = useState([]);

//   const handleDayChange = (idx, field, value) => {
//     setSlotConfig(prev =>
//       prev.map((d, i) =>
//         i === idx ? { ...d, [field]: value } : d
//       )
//     );
//   };

//   const handlePreview = () => {
//     if (!weekStart) {
//       setMessage({ type: "error", text: "Select a start week." });
//       return;
//     }
//     let allSlots = [];
//     for (let w = 0; w < (recurring ? weeksCount : 1); ++w) {
//       const weekDate = new Date(weekStart);
//       weekDate.setDate(weekDate.getDate() + w * 7);
//       allSlots = allSlots.concat(generateSlotsForWeek(slotConfig, weekDate));
//     }
//     setPreview(allSlots);
//     setMessage({ type: "", text: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });
//     try {
//       // Generate all slots as [{date, start_time, end_time}]
//       let allSlots = [];
//       for (let w = 0; w < (recurring ? weeksCount : 1); ++w) {
//         const weekDate = new Date(weekStart);
//         weekDate.setDate(weekDate.getDate() + w * 7);
//         allSlots = allSlots.concat(generateSlotsForWeek(slotConfig, weekDate));
//       }
//       if (allSlots.length === 0) throw new Error("No slots to create.");
      
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//       // Send to backend
//       const res = await fetch(`${apiUrl}/api/slots/bulk`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slots: allSlots }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Error creating slots");
//       }
//       setMessage({ type: "success", text: "Slots created successfully!" });
//       setPreview([]);
//     } catch (err) {
//       setMessage({ type: "error", text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow space-y-6"
//     >
//       <h2 className="text-2xl font-bold mb-4">Create Recurring Slots</h2>
//       <div>
//         <label className="block mb-1 font-medium">Start week (Monday)</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded mb-2"
//           value={weekStart}
//           onChange={e => setWeekStart(e.target.value)}
//           required
//         />
//         <div className="text-xs text-gray-500">Pick the Monday of the week you want to start from</div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {slotConfig.map((dayConfig, idx) => (
//           <div key={dayConfig.day} className="border rounded p-4 flex flex-col gap-2">
//             <div className="flex items-center justify-between">
//               <span className="font-bold">{dayConfig.day}</span>
//               <label className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   checked={dayConfig.isOff}
//                   onChange={e =>
//                     handleDayChange(idx, "isOff", e.target.checked)
//                   }
//                 />
//                 <span className="text-sm">Weekly Off</span>
//               </label>
//             </div>
//             {!dayConfig.isOff && (
//               <>
//                 <div className="flex gap-2 items-center">
//                   <label>From:</label>
//                   <input
//                     type="time"
//                     value={dayConfig.startTime}
//                     onChange={e =>
//                       handleDayChange(idx, "startTime", e.target.value)
//                     }
//                   />
//                   <label>To:</label>
//                   <input
//                     type="time"
//                     value={dayConfig.endTime}
//                     onChange={e =>
//                       handleDayChange(idx, "endTime", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label>Interval:</label>
//                   <select
//                     value={dayConfig.interval}
//                     onChange={e =>
//                       handleDayChange(idx, "interval", Number(e.target.value))
//                     }
//                   >
//                     {defaultIntervals.map(intv => (
//                       <option key={intv} value={intv}>{intv} min</option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-3 items-center my-4">
//         <input
//           type="checkbox"
//           checked={recurring}
//           onChange={e => setRecurring(e.target.checked)}
//         />
//         <span>Apply these timings for multiple weeks</span>
//         {recurring && (
//           <input
//             type="number"
//             min={1}
//             max={52}
//             value={weeksCount}
//             onChange={e => setWeeksCount(Number(e.target.value))}
//             className="ml-2 w-16 border rounded p-1"
//           />
//         )}
//         {recurring && <span>weeks</span>}
//       </div>
//       <div className="flex gap-2">
//         <button
//           type="button"
//           className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
//           onClick={handlePreview}
//         >
//           Preview Slots
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Creating..." : "Create Slots"}
//         </button>
//       </div>
//       {message.text && (
//         <div
//           className={`text-center mt-3 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
//         >
//           {message.text}
//         </div>
//       )}
//       {preview && preview.length > 0 && (
//         <div className="mt-6 max-h-60 overflow-y-auto border rounded bg-gray-50 p-4">
//           <div className="font-semibold mb-2">Slot Preview ({preview.length} slots):</div>
//           <ul className="text-xs space-y-1">
//             {preview.map((slot, i) => (
//               <li key={i}>{slot.date} | {slot.start_time} - {slot.end_time}</li>
//             ))}
//           </ul>
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
      className="relative max-w-3xl mx-auto my-8 px-2 sm:px-6 py-5 bg-white/90 backdrop-blur-xl border-2 border-gradient-to-r from-blue-200 via-fuchsia-100 to-yellow-100 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-700 z-10"
    >
      {/* Sparkling shimmer border */}
      <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent border-gradient-to-r from-blue-200 via-fuchsia-100 to-yellow-100" style={{boxShadow:"0 0 16px 2px #a78bfa55, 0 0 0 8px #fef3c755 inset"}} />

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow animate-fade-in">
        Create Recurring Slots
      </h2>
      <div className="mb-5 animate-fade-in delay-100">
        <label className="block mb-1 font-medium text-blue-700">Start week (Monday)</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-fuchsia-400 border-blue-100 shadow-sm"
          value={weekStart}
          onChange={e => setWeekStart(e.target.value)}
          required
        />
        <div className="text-xs text-gray-500 pt-1">Pick the Monday of the week you want to start from</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up delay-150">
        {slotConfig.map((dayConfig, idx) => (
          <div key={dayConfig.day} className="border border-blue-100 bg-gradient-to-br from-blue-50 via-fuchsia-50 to-yellow-50 rounded-xl p-4 flex flex-col gap-2 shadow hover:shadow-lg transition-all animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-fuchsia-600">{dayConfig.day}</span>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={dayConfig.isOff}
                  onChange={e =>
                    handleDayChange(idx, "isOff", e.target.checked)
                  }
                  className="accent-fuchsia-500"
                />
                <span className="text-sm text-gray-500">Weekly Off</span>
              </label>
            </div>
            {!dayConfig.isOff && (
              <>
                <div className="flex gap-2 items-center">
                  <label className="text-blue-700">From:</label>
                  <input
                    type="time"
                    value={dayConfig.startTime}
                    onChange={e =>
                      handleDayChange(idx, "startTime", e.target.value)
                    }
                    className="border rounded px-2 py-1 bg-white/80 border-blue-100 focus:ring-2 focus:ring-fuchsia-300"
                  />
                  <label className="text-blue-700">To:</label>
                  <input
                    type="time"
                    value={dayConfig.endTime}
                    onChange={e =>
                      handleDayChange(idx, "endTime", e.target.value)
                    }
                    className="border rounded px-2 py-1 bg-white/80 border-blue-100 focus:ring-2 focus:ring-fuchsia-300"
                  />
                </div>
                <div>
                  <label className="text-blue-700 mr-2">Interval:</label>
                  <select
                    value={dayConfig.interval}
                    onChange={e =>
                      handleDayChange(idx, "interval", Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 bg-white/80 border-blue-100 focus:ring-2 focus:ring-fuchsia-300"
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
          className="accent-fuchsia-500"
        />
        <span className="text-gray-700">Apply these timings for multiple weeks</span>
        {recurring && (
          <>
            <input
              type="number"
              min={1}
              max={52}
              value={weeksCount}
              onChange={e => setWeeksCount(Number(e.target.value))}
              className="w-16 border rounded p-1 bg-white/80 border-blue-100 focus:ring-2 focus:ring-fuchsia-300"
            />
            <span className="text-gray-500">weeks</span>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-gray-500 hover:to-gray-600 transition-all active:scale-95 animate-fade-in delay-250"
          onClick={handlePreview}
        >
          Preview Slots
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 text-white px-8 py-2 rounded-full font-bold shadow-md hover:from-fuchsia-600 hover:to-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-400 animate-fade-in delay-300"
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
        <div className="mt-8 max-h-60 overflow-y-auto border-2 border-blue-100 rounded-xl bg-gradient-to-tr from-blue-50 via-fuchsia-50 to-yellow-50 p-4 shadow animate-fade-in-up delay-400">
          <div className="font-semibold mb-2 text-fuchsia-700">Slot Preview ({preview.length} slots):</div>
          <ul className="text-xs space-y-1 font-mono">
            {preview.map((slot, i) => (
              <li key={i} className="text-blue-800">{slot.date} | {slot.start_time} - {slot.end_time}</li>
            ))}
          </ul>
        </div>
      )}
      <style jsx global>{`
        .border-gradient-to-r {
          background: linear-gradient(90deg, #60a5fa44, #a78bfa44, #fef3c744);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </form>
  );
}