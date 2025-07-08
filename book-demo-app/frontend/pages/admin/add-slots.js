// export default function AddSlots() {
//   return (
//     <main className="min-h-screen flex flex-col justify-center items-center">
//       <h1 className="text-3xl font-bold mb-4">Add Slots</h1>
//       <p>Slot booking functionality coming soon!</p>
//     </main>
//   );
// }



// "use client";
// import { useState } from "react";

// const weekDays = [
//   { key: "sun", name: "Sunday" },
//   { key: "mon", name: "Monday" },
//   { key: "tue", name: "Tuesday" },
//   { key: "wed", name: "Wednesday" },
//   { key: "thu", name: "Thursday" },
//   { key: "fri", name: "Friday" },
//   { key: "sat", name: "Saturday" },
// ];

// const intervals = [10, 20, 30, 40, 50, 60];

// export default function AddSlotsPage() {
//   // Slot state
//   const [slot, setSlot] = useState({
//     days: [],
//     start: "",
//     end: "",
//     interval: 30,
//   });

//   function handleDayChange(day) {
//     setSlot((prev) => ({
//       ...prev,
//       days: prev.days.includes(day)
//         ? prev.days.filter((d) => d !== day)
//         : [...prev.days, day],
//     }));
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setSlot((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleDelete() {
//     setSlot({
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//     });
//   }

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-[#bfe7ef]">
//         <h1 className="text-2xl font-extrabold mb-6 text-center text-[#005e6a]">Slot Booking</h1>
//         <div className="flex flex-col gap-4">
//           {/* Days checkboxes */}
//           <label className="font-semibold text-[#005e6a] mb-1">Select Days</label>
//           <div className="flex flex-wrap gap-4 mb-2">
//             {weekDays.map((d) => (
//               <label key={d.key} className="flex items-center gap-1 text-sm font-medium text-gray-700">
//                 <input
//                   type="checkbox"
//                   checked={slot.days.includes(d.key)}
//                   onChange={() => handleDayChange(d.key)}
//                   className="accent-[#005e6a]"
//                 />
//                 {d.name}
//               </label>
//             ))}
//           </div>
//           {/* Start and End Time */}
//           <div className="flex gap-4 items-center">
//             <div className="flex flex-col flex-1">
//               <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//               <input
//                 type="time"
//                 name="start"
//                 value={slot.start}
//                 onChange={handleChange}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//               <input
//                 type="time"
//                 name="end"
//                 value={slot.end}
//                 onChange={handleChange}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//               />
//             </div>
//           </div>
//           {/* Slot interval */}
//           <div className="flex flex-col mt-3">
//             <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
//             <select
//               name="interval"
//               value={slot.interval}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//             >
//               {intervals.map((mins) => (
//                 <option key={mins} value={mins}>
//                   {mins} min
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Delete button */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleDelete}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold transition"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";
// import { useState } from "react";

// const weekDays = [
//   { key: "sun", name: "Sunday" },
//   { key: "mon", name: "Monday" },
//   { key: "tue", name: "Tuesday" },
//   { key: "wed", name: "Wednesday" },
//   { key: "thu", name: "Thursday" },
//   { key: "fri", name: "Friday" },
//   { key: "sat", name: "Saturday" },
// ];

// const intervals = [10, 20, 30, 40, 50, 60];

// export default function AddSlotsPage() {
//   // Recurring slots state
//   const [slots, setSlots] = useState([
//     {
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//       created: false,
//     },
//   ]);
//   // Custom slots state
//   const [showCustomSlot, setShowCustomSlot] = useState(false);
//   const [customSlot, setCustomSlot] = useState({
//     date: "",
//     openClose: "",
//     start: "",
//     end: "",
//   });

//   // Handle recurring slot changes
//   function handleDayChange(slotIdx, day) {
//     setSlots((prev) =>
//       prev.map((slot, idx) =>
//         idx === slotIdx
//           ? {
//               ...slot,
//               days: slot.days.includes(day)
//                 ? slot.days.filter((d) => d !== day)
//                 : [...slot.days, day],
//             }
//           : slot
//       )
//     );
//   }

//   function handleSlotChange(slotIdx, e) {
//     const { name, value } = e.target;
//     setSlots((prev) =>
//       prev.map((slot, idx) =>
//         idx === slotIdx ? { ...slot, [name]: value } : slot
//       )
//     );
//   }

//   function handleCreate(slotIdx) {
//     setSlots((prev) =>
//       prev.map((slot, idx) =>
//         idx === slotIdx ? { ...slot, created: true } : slot
//       ).concat([
//         {
//           days: [],
//           start: "",
//           end: "",
//           interval: 30,
//           created: false,
//         },
//       ])
//     );
//   }

//   // Custom slot handlers
//   function handleCustomSlotChange(e) {
//     const { name, value } = e.target;
//     setCustomSlot((prev) => ({ ...prev, [name]: value }));
//     // Reset times if toggling open/close
//     if (name === "openClose" && value === "close") {
//       setCustomSlot((prev) => ({ ...prev, start: "", end: "" }));
//     }
//   }

//   function handleCustomDateChange(e) {
//     setCustomSlot((prev) => ({ ...prev, date: e.target.value, openClose: "" }));
//   }

//   // Already selected days for created slots
//   const usedDays = slots
//     .filter((s) => s.created)
//     .flatMap((s) => s.days);

//   // For demonstration, not persisting custom slots
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-[#bfe7ef]">
//         <h1 className="text-2xl font-extrabold mb-6 text-center text-[#005e6a]">Slot Booking</h1>

//         {/* Recurring slots */}
//         {slots.map((slot, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col gap-4 mb-6 border-b last:border-b-0 pb-6 last:pb-0"
//           >
//             <div className="font-semibold text-[#005e6a] mb-1">
//               Select Days {slot.created && <span className="text-xs text-gray-400">(created)</span>}
//             </div>
//             <div className="flex flex-wrap gap-4 mb-2">
//               {weekDays.map((d) => {
//                 const isUsed = usedDays.includes(d.key) && !slot.days.includes(d.key);
//                 return (
//                   <label key={d.key} className="flex items-center gap-1 text-sm font-medium text-gray-700">
//                     <input
//                       type="checkbox"
//                       disabled={slot.created ? true : isUsed}
//                       checked={slot.days.includes(d.key)}
//                       onChange={() => handleDayChange(idx, d.key)}
//                       className="accent-[#005e6a]"
//                     />
//                     <span
//                       className={
//                         isUsed
//                           ? "text-gray-400 line-through"
//                           : slot.created
//                           ? "text-gray-400"
//                           : undefined
//                       }
//                     >
//                       {d.name}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>
//             <div className="flex gap-4 items-center">
//               <div className="flex flex-col flex-1">
//                 <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                 <input
//                   type="time"
//                   name="start"
//                   value={slot.start}
//                   onChange={(e) => handleSlotChange(idx, e)}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                   disabled={slot.created}
//                 />
//               </div>
//               <div className="flex flex-col flex-1">
//                 <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                 <input
//                   type="time"
//                   name="end"
//                   value={slot.end}
//                   onChange={(e) => handleSlotChange(idx, e)}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                   disabled={slot.created}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col mt-3">
//               <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
//               <select
//                 name="interval"
//                 value={slot.interval}
//                 onChange={(e) => handleSlotChange(idx, e)}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//                 disabled={slot.created}
//               >
//                 {intervals.map((mins) => (
//                   <option key={mins} value={mins}>
//                     {mins} min
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {!slot.created && (
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => handleCreate(idx)}
//                   disabled={slot.days.length === 0 || !slot.start || !slot.end}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                 >
//                   Create
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Custom slot */}
//         <div className="mt-8">
//           <button
//             className="bg-[#005e6a] text-white px-4 py-2 rounded hover:bg-[#077e8d] font-semibold transition"
//             onClick={() => setShowCustomSlot((val) => !val)}
//           >
//             {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
//           </button>
//         </div>
//         {showCustomSlot && (
//           <div className="mt-6 p-4 bg-[#f3f8fb] border border-[#bfe7ef] rounded-xl flex flex-col gap-4">
//             <div className="flex flex-col">
//               <label className="font-semibold text-[#005e6a] mb-1">Select Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={customSlot.date}
//                 onChange={handleCustomDateChange}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//               />
//             </div>
//             {customSlot.date && (
//               <div className="flex flex-col gap-2">
//                 <div className="font-semibold text-[#005e6a] mb-1">Status</div>
//                 <div className="flex gap-6">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="openClose"
//                       value="open"
//                       checked={customSlot.openClose === "open"}
//                       onChange={handleCustomSlotChange}
//                       className="accent-[#005e6a]"
//                     />
//                     Open
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="openClose"
//                       value="close"
//                       checked={customSlot.openClose === "close"}
//                       onChange={handleCustomSlotChange}
//                       className="accent-[#005e6a]"
//                     />
//                     Close
//                   </label>
//                 </div>
//                 {customSlot.openClose === "open" && (
//                   <div className="flex gap-4 items-center mt-2">
//                     <div className="flex flex-col flex-1">
//                       <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                       <input
//                         type="time"
//                         name="start"
//                         value={customSlot.start}
//                         onChange={handleCustomSlotChange}
//                         className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                       />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                       <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                       <input
//                         type="time"
//                         name="end"
//                         value={customSlot.end}
//                         onChange={handleCustomSlotChange}
//                         className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {customSlot.openClose === "close" && (
//                   <div className="text-red-600 mt-2 font-semibold">
//                     This day's slots will be disabled
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


"use client";
import { useState } from "react";

const weekDays = [
  { key: "sun", name: "Sunday" },
  { key: "mon", name: "Monday" },
  { key: "tue", name: "Tuesday" },
  { key: "wed", name: "Wednesday" },
  { key: "thu", name: "Thursday" },
  { key: "fri", name: "Friday" },
  { key: "sat", name: "Saturday" },
];

const intervals = [10, 20, 30, 40, 50, 60];

export default function AddSlotsPage() {
  // State for current slot creation box
  const [slotDraft, setSlotDraft] = useState({
    days: [],
    start: "",
    end: "",
    interval: 30,
  });
  // State for created slots
  const [recurringSlots, setRecurringSlots] = useState([]);
  // Used days (from created slots)
  const usedDays = recurringSlots.flatMap((s) => s.days);

  // Custom slot state
  const [showCustomSlot, setShowCustomSlot] = useState(false);
  const [customSlotDraft, setCustomSlotDraft] = useState({
    date: "",
    openClose: "",
    start: "",
    end: "",
  });
  const [customSlots, setCustomSlots] = useState([]);

  // Handlers for recurring slot draft
  function handleDayChange(day) {
    setSlotDraft((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  }

  function handleSlotDraftChange(e) {
    const { name, value } = e.target;
    setSlotDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCreateSlot() {
    if (
      slotDraft.days.length === 0 ||
      !slotDraft.start ||
      !slotDraft.end ||
      slotDraft.start >= slotDraft.end
    )
      return;

    setRecurringSlots((prev) => [...prev, { ...slotDraft }]);
    setSlotDraft({
      days: [],
      start: "",
      end: "",
      interval: 30,
    });
  }

  function handleDeleteSlot(idx) {
    setRecurringSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  // Handlers for custom slot draft
  function handleCustomSlotChange(e) {
    const { name, value } = e.target;
    setCustomSlotDraft((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "openClose" && value === "close"
        ? { start: "", end: "" }
        : {}),
    }));
  }

  function handleCustomDateChange(e) {
    setCustomSlotDraft((prev) => ({
      ...prev,
      date: e.target.value,
      openClose: "",
      start: "",
      end: "",
    }));
  }

  function handleCreateCustomSlot() {
    if (
      !customSlotDraft.date ||
      !customSlotDraft.openClose ||
      (customSlotDraft.openClose === "open" &&
        (!customSlotDraft.start ||
          !customSlotDraft.end ||
          customSlotDraft.start >= customSlotDraft.end))
    )
      return;
    setCustomSlots((prev) => [...prev, { ...customSlotDraft }]);
    setCustomSlotDraft({
      date: "",
      openClose: "",
      start: "",
      end: "",
    });
    setShowCustomSlot(false);
  }

  function handleDeleteCustomSlot(idx) {
    setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-2xl font-extrabold mb-2 text-center text-[#005e6a]">Slot Booking</h1>
        {/* Recurring Slots Creation Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#bfe7ef]">
          <h2 className="text-lg font-bold text-[#005e6a] mb-3">Create Recurring Slot</h2>
          <div className="flex flex-col gap-4">
            {/* Days checkboxes */}
            <div>
              <label className="font-semibold text-[#005e6a] mb-1 block">Select Days</label>
              <div className="flex flex-wrap gap-3">
                {weekDays.map((d) => {
                  const isUsed = usedDays.includes(d.key);
                  return (
                    <label
                      key={d.key}
                      className={
                        "flex items-center gap-1 text-sm font-medium " +
                        (isUsed
                          ? "text-gray-400 line-through cursor-not-allowed"
                          : "text-gray-700")
                      }
                    >
                      <input
                        type="checkbox"
                        checked={slotDraft.days.includes(d.key)}
                        onChange={() => handleDayChange(d.key)}
                        disabled={isUsed}
                        className="accent-[#005e6a]"
                      />
                      {d.name}
                    </label>
                  );
                })}
              </div>
            </div>
            {/* Start and End Time */}
            <div className="flex gap-4 items-center">
              <div className="flex flex-col flex-1">
                <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
                <input
                  type="time"
                  name="start"
                  value={slotDraft.start}
                  onChange={handleSlotDraftChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
                <input
                  type="time"
                  name="end"
                  value={slotDraft.end}
                  onChange={handleSlotDraftChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                />
              </div>
            </div>
            {/* Slot interval */}
            <div className="flex flex-col mt-3">
              <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
              <select
                name="interval"
                value={slotDraft.interval}
                onChange={handleSlotDraftChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
              >
                {intervals.map((mins) => (
                  <option key={mins} value={mins}>
                    {mins} min
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCreateSlot}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
                disabled={
                  slotDraft.days.length === 0 ||
                  !slotDraft.start ||
                  !slotDraft.end ||
                  slotDraft.start >= slotDraft.end ||
                  slotDraft.days.some((d) => usedDays.includes(d))
                }
              >
                Create
              </button>
            </div>
          </div>
        </div>

        {/* Render Created Recurring Slots */}
        {recurringSlots.map((slot, idx) => (
          <div
            key={idx}
            className="bg-[#f7fbfc] rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative"
          >
            <button
              onClick={() => handleDeleteSlot(idx)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
              title="Delete this slot"
            >
              Delete
            </button>
            <div className="text-sm">
              <span className="font-bold text-[#005e6a]">Days: </span>
              {slot.days.map((d) => weekDays.find((w) => w.key === d)?.name).join(", ")}
            </div>
            <div className="text-sm">
              <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}
              &nbsp;&nbsp;
              <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
              &nbsp;&nbsp;
              <span className="font-bold text-[#005e6a]">Interval:</span> {slot.interval} min
            </div>
          </div>
        ))}

        {/* Custom Slot Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#bfe7ef]">
          <button
            className="bg-[#005e6a] text-white px-4 py-2 rounded hover:bg-[#077e8d] font-semibold transition"
            onClick={() => setShowCustomSlot((val) => !val)}
          >
            {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
          </button>
          {showCustomSlot && (
            <div className="mt-6 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] p-4 space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-[#005e6a] mb-1">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={customSlotDraft.date}
                  onChange={handleCustomDateChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
                />
              </div>
              {customSlotDraft.date && (
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-[#005e6a] mb-1">Status</div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="openClose"
                        value="open"
                        checked={customSlotDraft.openClose === "open"}
                        onChange={handleCustomSlotChange}
                        className="accent-[#005e6a]"
                      />
                      Open
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="openClose"
                        value="close"
                        checked={customSlotDraft.openClose === "close"}
                        onChange={handleCustomSlotChange}
                        className="accent-[#005e6a]"
                      />
                      Close
                    </label>
                  </div>
                  {customSlotDraft.openClose === "open" && (
                    <div className="flex gap-4 items-center mt-2">
                      <div className="flex flex-col flex-1">
                        <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
                        <input
                          type="time"
                          name="start"
                          value={customSlotDraft.start}
                          onChange={handleCustomSlotChange}
                          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
                        <input
                          type="time"
                          name="end"
                          value={customSlotDraft.end}
                          onChange={handleCustomSlotChange}
                          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                        />
                      </div>
                    </div>
                  )}
                  {customSlotDraft.openClose === "close" && (
                    <div className="text-red-600 mt-2 font-semibold">
                      This day's slots will be disabled.
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={handleCreateCustomSlot}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
                  disabled={
                    !customSlotDraft.date ||
                    !customSlotDraft.openClose ||
                    (customSlotDraft.openClose === "open" &&
                      (!customSlotDraft.start ||
                        !customSlotDraft.end ||
                        customSlotDraft.start >= customSlotDraft.end))
                  }
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Render Created Custom Slots */}
        {customSlots.map((slot, idx) => (
          <div
            key={idx}
            className="bg-[#f7fbfc] rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative"
          >
            <button
              onClick={() => handleDeleteCustomSlot(idx)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
              title="Delete this slot"
            >
              Delete
            </button>
            <div className="text-sm">
              <span className="font-bold text-[#005e6a]">Date: </span>
              {slot.date}
            </div>
            <div className="text-sm">
              <span className="font-bold text-[#005e6a]">Status:</span>{" "}
              {slot.openClose === "open" ? (
                <>
                  Open | <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}{" "}
                  <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
                </>
              ) : (
                <span className="text-red-600">Closed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}