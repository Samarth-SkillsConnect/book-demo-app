// import { useState } from "react";

// export default function AdminSlotManager() {
//   const [slots, setSlots] = useState(["10:00 AM", "11:00 AM", "12:00 PM"]);
//   const [newSlot, setNewSlot] = useState("");

//   const addSlot = (e) => {
//     e.preventDefault();
//     if (newSlot && !slots.includes(newSlot)) {
//       setSlots([...slots, newSlot]);
//       setNewSlot("");
//     }
//   };

//   const removeSlot = (slot) => {
//     setSlots(slots.filter((s) => s !== slot));
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow mb-6">
//       <h2 className="text-xl font-bold mb-4">Manage Slots</h2>
//       <form onSubmit={addSlot} className="flex mb-4 gap-2">
//         <input
//           type="text"
//           className="border rounded px-3 py-2 flex-1"
//           placeholder="Add slot (e.g. 2:00 PM)"
//           value={newSlot}
//           onChange={(e) => setNewSlot(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           Add
//         </button>
//       </form>
//       <ul>
//         {slots.map((slot) => (
//           <li key={slot} className="flex items-center justify-between py-1">
//             <span>{slot}</span>
//             <button
//               className="text-red-600 hover:underline"
//               onClick={() => removeSlot(slot)}
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState } from "react";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];
const defaultIntervals = [10, 20, 30, 40];

export default function AdminSlotManager() {
  const [slotConfig, setSlotConfig] = useState(
    daysOfWeek.map(day => ({
      day,
      isOff: false,
      startTime: "09:00",
      endTime: "17:00",
      interval: 30,
    }))
  );
  const [recurring, setRecurring] = useState(false);

  const handleChange = (idx, field, value) => {
    setSlotConfig(prev =>
      prev.map((d, i) =>
        i === idx ? { ...d, [field]: value } : d
      )
    );
  };

  // Generate slots for preview
  const generateSlots = (start, end, interval) => {
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);
    let startMinutes = h * 60 + m;
    let endMinutes = eh * 60 + em;
    while (startMinutes + interval <= endMinutes) {
      let sh = Math.floor(startMinutes / 60);
      let sm = startMinutes % 60;
      let slotStr = `${String(sh).padStart(2, "0")}:${String(sm).padStart(2, "0")}`;
      slots.push(slotStr);
      startMinutes += interval;
    }
    return slots;
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Weekly Slots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slotConfig.map((config, idx) => (
          <div key={config.day} className="border rounded p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">{config.day}</span>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={config.isOff}
                  onChange={e => handleChange(idx, "isOff", e.target.checked)}
                />
                <span className="text-sm">Weekly Off</span>
              </label>
            </div>
            {!config.isOff && (
              <>
                <div className="flex gap-2 items-center">
                  <label>From:</label>
                  <input
                    type="time"
                    value={config.startTime}
                    onChange={e => handleChange(idx, "startTime", e.target.value)}
                  />
                  <label>To:</label>
                  <input
                    type="time"
                    value={config.endTime}
                    onChange={e => handleChange(idx, "endTime", e.target.value)}
                  />
                </div>
                <div>
                  <label>Interval:</label>
                  <select
                    value={config.interval}
                    onChange={e => handleChange(idx, "interval", Number(e.target.value))}
                  >
                    {defaultIntervals.map(intv => (
                      <option key={intv} value={intv}>{intv} min</option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Slots preview:{" "}
                  {generateSlots(config.startTime, config.endTime, config.interval)
                    .map(t => t)
                    .join(", ") || "No slots"}
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
        <span>Apply these timings to all future weeks/years</span>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => {
          // Save slotConfig and recurring to backend
          alert("Settings saved! (implement backend integration)");
        }}
      >
        Save Settings
      </button>
    </div>
  );
}