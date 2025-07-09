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
//   // State for current slot creation box
//   const [slotDraft, setSlotDraft] = useState({
//     days: [],
//     start: "",
//     end: "",
//     interval: 30,
//   });
//   // State for created slots
//   const [recurringSlots, setRecurringSlots] = useState([]);
//   // Used days (from created slots)
//   const usedDays = recurringSlots.flatMap((s) => s.days);

//   // Custom slot state
//   const [showCustomSlot, setShowCustomSlot] = useState(false);
//   const [customSlotDraft, setCustomSlotDraft] = useState({
//     date: "",
//     openClose: "",
//     start: "",
//     end: "",
//   });
//   const [customSlots, setCustomSlots] = useState([]);

//   // Handlers for recurring slot draft
//   function handleDayChange(day) {
//     setSlotDraft((prev) => ({
//       ...prev,
//       days: prev.days.includes(day)
//         ? prev.days.filter((d) => d !== day)
//         : [...prev.days, day],
//     }));
//   }

//   function handleSlotDraftChange(e) {
//     const { name, value } = e.target;
//     setSlotDraft((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleCreateSlot() {
//     if (
//       slotDraft.days.length === 0 ||
//       !slotDraft.start ||
//       !slotDraft.end ||
//       slotDraft.start >= slotDraft.end
//     )
//       return;

//     setRecurringSlots((prev) => [...prev, { ...slotDraft }]);
//     setSlotDraft({
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//     });
//   }

//   function handleDeleteSlot(idx) {
//     setRecurringSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // Handlers for custom slot draft
//   function handleCustomSlotChange(e) {
//     const { name, value } = e.target;
//     setCustomSlotDraft((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "openClose" && value === "close"
//         ? { start: "", end: "" }
//         : {}),
//     }));
//   }

//   function handleCustomDateChange(e) {
//     setCustomSlotDraft((prev) => ({
//       ...prev,
//       date: e.target.value,
//       openClose: "",
//       start: "",
//       end: "",
//     }));
//   }

//   function handleCreateCustomSlot() {
//     if (
//       !customSlotDraft.date ||
//       !customSlotDraft.openClose ||
//       (customSlotDraft.openClose === "open" &&
//         (!customSlotDraft.start ||
//           !customSlotDraft.end ||
//           customSlotDraft.start >= customSlotDraft.end))
//     )
//       return;
//     setCustomSlots((prev) => [...prev, { ...customSlotDraft }]);
//     setCustomSlotDraft({
//       date: "",
//       openClose: "",
//       start: "",
//       end: "",
//     });
//     setShowCustomSlot(false);
//   }

//   function handleDeleteCustomSlot(idx) {
//     setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
//       <div className="w-full max-w-2xl space-y-8">
//         <h1 className="text-2xl font-extrabold mb-2 text-center text-[#005e6a]">Slot Booking</h1>
//         {/* Recurring Slots Creation Box */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#bfe7ef]">
//           <h2 className="text-lg font-bold text-[#005e6a] mb-3">Create Recurring Slot</h2>
//           <div className="flex flex-col gap-4">
//             {/* Days checkboxes */}
//             <div>
//               <label className="font-semibold text-[#005e6a] mb-1 block">Select Days</label>
//               <div className="flex flex-wrap gap-3">
//                 {weekDays.map((d) => {
//                   const isUsed = usedDays.includes(d.key);
//                   return (
//                     <label
//                       key={d.key}
//                       className={
//                         "flex items-center gap-1 text-sm font-medium " +
//                         (isUsed
//                           ? "text-gray-400 line-through cursor-not-allowed"
//                           : "text-gray-700")
//                       }
//                     >
//                       <input
//                         type="checkbox"
//                         checked={slotDraft.days.includes(d.key)}
//                         onChange={() => handleDayChange(d.key)}
//                         disabled={isUsed}
//                         className="accent-[#005e6a]"
//                       />
//                       {d.name}
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//             {/* Start and End Time */}
//             <div className="flex gap-4 items-center">
//               <div className="flex flex-col flex-1">
//                 <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                 <input
//                   type="time"
//                   name="start"
//                   value={slotDraft.start}
//                   onChange={handleSlotDraftChange}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                 />
//               </div>
//               <div className="flex flex-col flex-1">
//                 <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                 <input
//                   type="time"
//                   name="end"
//                   value={slotDraft.end}
//                   onChange={handleSlotDraftChange}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                 />
//               </div>
//             </div>
//             {/* Slot interval */}
//             <div className="flex flex-col mt-3">
//               <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
//               <select
//                 name="interval"
//                 value={slotDraft.interval}
//                 onChange={handleSlotDraftChange}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//               >
//                 {intervals.map((mins) => (
//                   <option key={mins} value={mins}>
//                     {mins} min
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handleCreateSlot}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                 disabled={
//                   slotDraft.days.length === 0 ||
//                   !slotDraft.start ||
//                   !slotDraft.end ||
//                   slotDraft.start >= slotDraft.end ||
//                   slotDraft.days.some((d) => usedDays.includes(d))
//                 }
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Render Created Recurring Slots */}
//         {recurringSlots.map((slot, idx) => (
//           <div
//             key={idx}
//             className="bg-[#f7fbfc] rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative"
//           >
//             <button
//               onClick={() => handleDeleteSlot(idx)}
//               className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
//               title="Delete this slot"
//             >
//               Delete
//             </button>
//             <div className="text-sm">
//               <span className="font-bold text-[#005e6a]">Days: </span>
//               {slot.days.map((d) => weekDays.find((w) => w.key === d)?.name).join(", ")}
//             </div>
//             <div className="text-sm">
//               <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}
//               &nbsp;&nbsp;
//               <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
//               &nbsp;&nbsp;
//               <span className="font-bold text-[#005e6a]">Interval:</span> {slot.interval} min
//             </div>
//           </div>
//         ))}

//         {/* Custom Slot Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#bfe7ef]">
//           <button
//             className="bg-[#005e6a] text-white px-4 py-2 rounded hover:bg-[#077e8d] font-semibold transition"
//             onClick={() => setShowCustomSlot((val) => !val)}
//           >
//             {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
//           </button>
//           {showCustomSlot && (
//             <div className="mt-6 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] p-4 space-y-4">
//               <div className="flex flex-col">
//                 <label className="font-semibold text-[#005e6a] mb-1">Select Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={customSlotDraft.date}
//                   onChange={handleCustomDateChange}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//                 />
//               </div>
//               {customSlotDraft.date && (
//                 <div className="flex flex-col gap-2">
//                   <div className="font-semibold text-[#005e6a] mb-1">Status</div>
//                   <div className="flex gap-6">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="openClose"
//                         value="open"
//                         checked={customSlotDraft.openClose === "open"}
//                         onChange={handleCustomSlotChange}
//                         className="accent-[#005e6a]"
//                       />
//                       Open
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="openClose"
//                         value="close"
//                         checked={customSlotDraft.openClose === "close"}
//                         onChange={handleCustomSlotChange}
//                         className="accent-[#005e6a]"
//                       />
//                       Close
//                     </label>
//                   </div>
//                   {customSlotDraft.openClose === "open" && (
//                     <div className="flex gap-4 items-center mt-2">
//                       <div className="flex flex-col flex-1">
//                         <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                         <input
//                           type="time"
//                           name="start"
//                           value={customSlotDraft.start}
//                           onChange={handleCustomSlotChange}
//                           className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                         />
//                       </div>
//                       <div className="flex flex-col flex-1">
//                         <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                         <input
//                           type="time"
//                           name="end"
//                           value={customSlotDraft.end}
//                           onChange={handleCustomSlotChange}
//                           className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                         />
//                       </div>
//                     </div>
//                   )}
//                   {customSlotDraft.openClose === "close" && (
//                     <div className="text-red-600 mt-2 font-semibold">
//                       This day's slots will be disabled.
//                     </div>
//                   )}
//                 </div>
//               )}
//               <div className="flex justify-end">
//                 <button
//                   onClick={handleCreateCustomSlot}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                   disabled={
//                     !customSlotDraft.date ||
//                     !customSlotDraft.openClose ||
//                     (customSlotDraft.openClose === "open" &&
//                       (!customSlotDraft.start ||
//                         !customSlotDraft.end ||
//                         customSlotDraft.start >= customSlotDraft.end))
//                   }
//                 >
//                   Create
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Render Created Custom Slots */}
//         {customSlots.map((slot, idx) => (
//           <div
//             key={idx}
//             className="bg-[#f7fbfc] rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative"
//           >
//             <button
//               onClick={() => handleDeleteCustomSlot(idx)}
//               className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
//               title="Delete this slot"
//             >
//               Delete
//             </button>
//             <div className="text-sm">
//               <span className="font-bold text-[#005e6a]">Date: </span>
//               {slot.date}
//             </div>
//             <div className="text-sm">
//               <span className="font-bold text-[#005e6a]">Status:</span>{" "}
//               {slot.openClose === "open" ? (
//                 <>
//                   Open | <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}{" "}
//                   <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
//                 </>
//               ) : (
//                 <span className="text-red-600">Closed</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }













"use client";
import { useState } from "react";

const weekDays = [
  { key: "mon", name: "Monday" },
  { key: "tue", name: "Tuesday" },
  { key: "wed", name: "Wednesday" },
  { key: "thu", name: "Thursday" },
  { key: "fri", name: "Friday" },
  { key: "sat", name: "Saturday" },
  { key: "sun", name: "Sunday" },
];

const intervals = [10, 20, 30, 40, 50, 60];
const defaultStart = "09:00";
const defaultEnd = "18:30";
const defaultInterval = 10;

export default function AddSlotsPage() {
  // Per-day recurring slots
  const [daySlots, setDaySlots] = useState(
    weekDays.map((d) => ({
      day: d.key,
      name: d.name,
      start: defaultStart,
      end: defaultEnd,
      interval: defaultInterval,
      status: "active",
    }))
  );
  // Custom slots
  const [customSlots, setCustomSlots] = useState([]);

  // Bulk/popup modal state
  const [showSetSlots, setShowSetSlots] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  // Slot draft for modal
  const [slotDraft, setSlotDraft] = useState({
    days: [],
    start: "",
    end: "",
    interval: 30,
    status: "active",
  });
  const [createdSlots, setCreatedSlots] = useState([]);

  // Custom slot modal state (shared for popup and inline)
  const [showCustomSlot, setShowCustomSlot] = useState(false);
  const [customSlotDraft, setCustomSlotDraft] = useState({
    date: "",
    openClose: "",
    start: "",
    end: "",
    status: "active",
  });

  // --- Table Actions ---
  function handleEdit(idx) {
    setEditIdx(idx);
    setShowSetSlots(true);
    setSlotDraft({
      days: [daySlots[idx].day],
      start: daySlots[idx].start,
      end: daySlots[idx].end,
      interval: daySlots[idx].interval,
      status: daySlots[idx].status,
    });
    setCreatedSlots([]); // clear any previous
  }

  function handleDelete(idx) {
    setDaySlots((prev) =>
      prev.map((slot, i) =>
        i === idx
          ? {
              ...slot,
              start: defaultStart,
              end: defaultEnd,
              interval: defaultInterval,
              status: "inactive",
            }
          : slot
      )
    );
  }

  // --- Bulk Modal (Set Slots) Logic ---
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
  function handleSlotStatusChange(status) {
    setSlotDraft((prev) => ({
      ...prev,
      status,
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

    setCreatedSlots((prev) => [
      ...prev.filter((s) => !s.days.some((d) => slotDraft.days.includes(d))),
      { ...slotDraft },
    ]);
    setSlotDraft({
      days: [],
      start: "",
      end: "",
      interval: 30,
      status: "active",
    });
  }
  function handleDeleteSlot(idx) {
    setCreatedSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  // -- Custom Slot Logic (shared) --
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
  function handleCustomSlotStatusChange(status) {
    setCustomSlotDraft((prev) => ({
      ...prev,
      status,
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
    setCustomSlots((prev) => [
      ...prev.filter((s) => s.date !== customSlotDraft.date),
      { ...customSlotDraft },
    ]);
    setCustomSlotDraft({
      date: "",
      openClose: "",
      start: "",
      end: "",
      status: "active",
    });
    setShowCustomSlot(false);
  }
  function handleDeleteCustomSlot(idx) {
    setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  // --- Save from popup modal into daySlots ---
  function handleBulkSave() {
    if (editIdx !== null) {
      // Only update the day being edited
      const slot = createdSlots.length
        ? createdSlots.find((s) => s.days.includes(daySlots[editIdx].day))
        : slotDraft;
      if (slot) {
        setDaySlots((prev) =>
          prev.map((d, i) =>
            i === editIdx
              ? {
                  ...d,
                  start: slot.start,
                  end: slot.end,
                  interval: slot.interval,
                  status: slot.status,
                }
              : d
          )
        );
      }
    } else {
      // Bulk: update all days in createdSlots
      setDaySlots((prev) =>
        prev.map((d) => {
          const slot = createdSlots.find((s) => s.days.includes(d.day));
          if (slot) {
            return {
              ...d,
              start: slot.start,
              end: slot.end,
              interval: slot.interval,
              status: slot.status,
            };
          }
          return d;
        })
      );
    }
    setShowSetSlots(false);
    setEditIdx(null);
    setCreatedSlots([]);
    setSlotDraft({
      days: [],
      start: "",
      end: "",
      interval: 30,
      status: "active",
    });
  }

  function handleBulkOpen() {
    setShowSetSlots(true);
    setEditIdx(null);
    setCreatedSlots([]);
    setSlotDraft({
      days: [],
      start: "",
      end: "",
      interval: 30,
      status: "active",
    });
  }

  // ---- UI ----
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
      <section
        className="relative w-full max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-2 p-2 sm:p-8 animate-fade-in-up overflow-visible"
        style={{
          borderColor: "#005e6a",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
          style={{
            boxShadow: "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
          }}
        ></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 z-10 relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow text-[#005e6a] tracking-wide">
            Slot Settings
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-[#005e6a] text-white px-6 py-2 rounded-lg shadow hover:bg-[#077e8d] font-semibold transition"
              onClick={handleBulkOpen}
            >
              Set Slots Bulk
            </button>
            <button
              className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
              onClick={() => setShowCustomSlot((v) => !v)}
            >
              {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
            </button>
          </div>
        </div>

        {/* Custom Slot Inline Form */}
        {showCustomSlot && (
          <div className="mb-8 bg-white border border-[#bfe7ef] rounded-xl shadow-xl p-6">
            <h2 className="text-lg font-bold text-[#005e6a] mb-2">Add Custom Slot</h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex flex-col">
                <label className="font-semibold text-[#005e6a] mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={customSlotDraft.date}
                  onChange={handleCustomDateChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-[#005e6a] mb-1">Status</label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => handleCustomSlotStatusChange("active")}
                    className={`px-3 py-1 rounded font-semibold text-xs border ${
                      customSlotDraft.status === "active"
                        ? "bg-green-100 text-green-700 border-green-400"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCustomSlotStatusChange("inactive")}
                    className={`px-3 py-1 rounded font-semibold text-xs border ${
                      customSlotDraft.status === "inactive"
                        ? "bg-red-100 text-red-600 border-red-400"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-[#005e6a] mb-1">Open/Close</label>
                <div className="flex gap-2 mt-1">
                  <label className="flex items-center gap-1">
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
                  <label className="flex items-center gap-1">
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
              </div>
              {customSlotDraft.openClose === "open" && (
                <>
                  <div className="flex flex-col">
                    <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
                    <input
                      type="time"
                      name="start"
                      value={customSlotDraft.start}
                      onChange={handleCustomSlotChange}
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
                    <input
                      type="time"
                      name="end"
                      value={customSlotDraft.end}
                      onChange={handleCustomSlotChange}
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <button
                  onClick={handleCreateCustomSlot}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
                  disabled={
                    !customSlotDraft.date ||
                    !customSlotDraft.openClose ||
                    (customSlotDraft.openClose === "open" &&
                      (!customSlotDraft.start ||
                        !customSlotDraft.end ||
                        customSlotDraft.start >= customSlotDraft.end))
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Slots Table */}
        {customSlots.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#005e6a] mb-2">Custom Slots</h2>
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full border border-[#bfe7ef] rounded-xl shadow text-sm bg-white">
                <thead>
                  <tr className="bg-[#f5fafd] text-[#005e6a]">
                    <th className="p-3 border border-[#c5e7ef] text-left">Date</th>
                    <th className="p-3 border border-[#c5e7ef] text-left">Open/Close</th>
                    <th className="p-3 border border-[#c5e7ef] text-left">Start</th>
                    <th className="p-3 border border-[#c5e7ef] text-left">End</th>
                    <th className="p-3 border border-[#c5e7ef] text-left">Status</th>
                    <th className="p-3 border border-[#c5e7ef] text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {customSlots.map((slot, idx) => (
                    <tr key={idx} className="border-b border-[#e0f2f7]">
                      <td className="p-3 border border-[#e0f2f7]">{slot.date}</td>
                      <td className="p-3 border border-[#e0f2f7] capitalize">{slot.openClose}</td>
                      <td className="p-3 border border-[#e0f2f7]">{slot.start || "-"}</td>
                      <td className="p-3 border border-[#e0f2f7]">{slot.end || "-"}</td>
                      <td className="p-3 border border-[#e0f2f7]">
                        <span
                          className={`inline-block px-3 py-1 rounded font-bold text-xs w-20 text-center ${
                            slot.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 border border-[#e0f2f7] text-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                          onClick={() => handleDeleteCustomSlot(idx)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Main Recurring Slots Table */}
        <div
          className="overflow-x-auto bg-white rounded-2xl shadow-2xl border border-[#bfe7ef]"
          style={{
            minWidth: "900px",
            boxShadow: "0 2px 24px 0 #005e6a18, 0 0 0 1.5px #3ecbdb44",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <table
            className="w-full text-sm table-fixed"
            style={{
              minWidth: "900px",
              tableLayout: "fixed",
            }}
          >
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr className="bg-[#f5fafd] text-[#005e6a]">
                <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Day</th>
                <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Start Time</th>
                <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">End Time</th>
                <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Time Interval</th>
                <th className="p-3 border border-[#c5e7ef] text-center text-base font-semibold">Status</th>
                <th className="p-3 border border-[#c5e7ef] text-center text-base font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {daySlots.map((slot, idx) => (
                <tr
                  key={slot.day}
                  className="border-b border-[#e0f2f7] hover:bg-[#f2fcfd] transition"
                >
                  {/* Day Name */}
                  <td className="p-3 border border-[#e0f2f7] font-bold text-[#005e6a] text-lg whitespace-nowrap">
                    {slot.name}
                  </td>
                  {/* Start Time */}
                  <td className="p-3 border border-[#e0f2f7] text-base">{slot.start}</td>
                  {/* End Time */}
                  <td className="p-3 border border-[#e0f2f7] text-base">{slot.end}</td>
                  {/* Time Interval */}
                  <td className="p-3 border border-[#e0f2f7] text-base">{slot.interval} min</td>
                  {/* Status */}
                  <td className="p-3 border border-[#e0f2f7] text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded font-bold text-xs w-24 text-center ${
                        slot.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                    </span>
                  </td>
                  {/* Edit/Delete Actions */}
                  <td className="p-3 border border-[#e0f2f7] text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded text-xs hover:bg-blue-700 transition"
                        onClick={() => handleEdit(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded text-xs hover:bg-red-600 transition"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete Slot
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Set Slots Bulk Modal - pops up on Edit or Set Slots Bulk */}
      {showSetSlots && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative border border-[#bfe7ef] overflow-y-auto max-h-[90vh]"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
              onClick={() => {
                setShowSetSlots(false);
                setEditIdx(null);
                setCreatedSlots([]);
                setSlotDraft({
                  days: [],
                  start: "",
                  end: "",
                  interval: 30,
                  status: "active",
                });
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#005e6a] text-center">Set Recurring Slots</h2>
            {/* Recurring Slots Creation Box */}
            <div className="bg-[#f5fafd] rounded-xl border border-[#bfe7ef] p-6 mb-6">
              <div className="flex flex-col gap-4">
                {/* Days checkboxes */}
                <div>
                  <label className="font-semibold text-[#005e6a] mb-1 block">Select Days</label>
                  <div className="flex flex-wrap gap-3">
                    {weekDays.map((d) => {
                      let isUsed = false;
                      if (editIdx !== null) {
                        // Only allow the day being edited
                        isUsed = d.key !== daySlots[editIdx].day;
                      }
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
                {/* Status */}
                <div className="flex flex-col mt-3">
                  <label className="font-semibold text-[#005e6a] mb-1">Status</label>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => handleSlotStatusChange("active")}
                      className={`px-3 py-1 rounded font-semibold text-xs border ${
                        slotDraft.status === "active"
                          ? "bg-green-100 text-green-700 border-green-400"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSlotStatusChange("inactive")}
                      className={`px-3 py-1 rounded font-semibold text-xs border ${
                        slotDraft.status === "inactive"
                          ? "bg-red-100 text-red-600 border-red-400"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCreateSlot}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
                    disabled={
                      slotDraft.days.length === 0 ||
                      !slotDraft.start ||
                      !slotDraft.end ||
                      slotDraft.start >= slotDraft.end
                    }
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            {/* Render Created Recurring Slots */}
            {createdSlots.map((slot, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative mb-4"
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
                  &nbsp;&nbsp;
                  <span className="font-bold text-[#005e6a]">Status:</span> {slot.status}
                </div>
              </div>
            ))}
            {/* Save All Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
                onClick={handleBulkSave}
                disabled={
                  editIdx !== null
                    ? !(
                        (createdSlots.length > 0 &&
                          createdSlots.some((s) =>
                            s.days.includes(daySlots[editIdx].day)
                          )) ||
                        slotDraft.start ||
                        slotDraft.end
                      )
                    : createdSlots.length === 0
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}







// "use client";
// import { useState } from "react";

// const weekDays = [
//   { key: "mon", name: "Monday" },
//   { key: "tue", name: "Tuesday" },
//   { key: "wed", name: "Wednesday" },
//   { key: "thu", name: "Thursday" },
//   { key: "fri", name: "Friday" },
//   { key: "sat", name: "Saturday" },
//   { key: "sun", name: "Sunday" },
// ];

// const intervals = [10, 20, 30, 40, 50, 60];
// const defaultStart = "09:00";
// const defaultEnd = "18:30";
// const defaultInterval = 10;

// export default function AddSlotsPage() {
//   // State for each day's slot settings
//   const [daySlots, setDaySlots] = useState(
//     weekDays.map((d) => ({
//       day: d.key,
//       name: d.name,
//       start: defaultStart,
//       end: defaultEnd,
//       interval: defaultInterval,
//       status: "active",
//     }))
//   );
//   const [editIdx, setEditIdx] = useState(null);

//   // Modal for set slots (show/hide)
//   const [showSetSlots, setShowSetSlots] = useState(false);

//   // Set Slots Bulk Code (from your previous message)
//   // State for slot creation in bulk modal
//   const [slotDraft, setSlotDraft] = useState({
//     days: [],
//     start: "",
//     end: "",
//     interval: 30,
//   });
//   const [createdSlots, setCreatedSlots] = useState([]);
//   const usedDays = createdSlots.flatMap((s) => s.days);

//   // Custom slot state for modal
//   const [showCustomSlot, setShowCustomSlot] = useState(false);
//   const [customSlotDraft, setCustomSlotDraft] = useState({
//     date: "",
//     openClose: "",
//     start: "",
//     end: "",
//   });
//   const [customSlots, setCustomSlots] = useState([]);

//   // --- Table Actions ---
//   function handleEdit(idx) {
//     setEditIdx(idx);
//     setShowSetSlots(true);
//   }

//   function handleDelete(idx) {
//     setDaySlots((prev) =>
//       prev.map((slot, i) =>
//         i === idx
//           ? {
//               ...slot,
//               start: defaultStart,
//               end: defaultEnd,
//               interval: defaultInterval,
//               status: "inactive",
//             }
//           : slot
//       )
//     );
//   }

//   // --- Bulk Modal (Set Slots) Logic ---
//   function handleDayChange(day) {
//     setSlotDraft((prev) => ({
//       ...prev,
//       days: prev.days.includes(day)
//         ? prev.days.filter((d) => d !== day)
//         : [...prev.days, day],
//     }));
//   }

//   function handleSlotDraftChange(e) {
//     const { name, value } = e.target;
//     setSlotDraft((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleCreateSlot() {
//     if (
//       slotDraft.days.length === 0 ||
//       !slotDraft.start ||
//       !slotDraft.end ||
//       slotDraft.start >= slotDraft.end
//     )
//       return;

//     setCreatedSlots((prev) => [...prev, { ...slotDraft }]);
//     setSlotDraft({
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//     });
//   }

//   function handleDeleteSlot(idx) {
//     setCreatedSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // Custom slot modal handlers
//   function handleCustomSlotChange(e) {
//     const { name, value } = e.target;
//     setCustomSlotDraft((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "openClose" && value === "close"
//         ? { start: "", end: "" }
//         : {}),
//     }));
//   }

//   function handleCustomDateChange(e) {
//     setCustomSlotDraft((prev) => ({
//       ...prev,
//       date: e.target.value,
//       openClose: "",
//       start: "",
//       end: "",
//     }));
//   }

//   function handleCreateCustomSlot() {
//     if (
//       !customSlotDraft.date ||
//       !customSlotDraft.openClose ||
//       (customSlotDraft.openClose === "open" &&
//         (!customSlotDraft.start ||
//           !customSlotDraft.end ||
//           customSlotDraft.start >= customSlotDraft.end))
//     )
//       return;
//     setCustomSlots((prev) => [...prev, { ...customSlotDraft }]);
//     setCustomSlotDraft({
//       date: "",
//       openClose: "",
//       start: "",
//       end: "",
//     });
//     setShowCustomSlot(false);
//   }

//   function handleDeleteCustomSlot(idx) {
//     setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // Apply the createdSlots to the main table (for the days being edited)
//   function handleBulkSave() {
//     if (editIdx !== null) {
//       // Only update the day that was edited
//       const slot = createdSlots.find((s) =>
//         s.days.includes(daySlots[editIdx].day)
//       );
//       if (slot) {
//         setDaySlots((prev) =>
//           prev.map((d, i) =>
//             i === editIdx
//               ? {
//                   ...d,
//                   start: slot.start,
//                   end: slot.end,
//                   interval: slot.interval,
//                   status: "active",
//                 }
//               : d
//           )
//         );
//       }
//     } else {
//       // If it's bulk add, update all days in createdSlots
//       setDaySlots((prev) =>
//         prev.map((d) => {
//           const slot = createdSlots.find((s) => s.days.includes(d.day));
//           if (slot) {
//             return {
//               ...d,
//               start: slot.start,
//               end: slot.end,
//               interval: slot.interval,
//               status: "active",
//             };
//           }
//           return d;
//         })
//       );
//     }

//     // Reset modal states
//     setShowSetSlots(false);
//     setEditIdx(null);
//     setCreatedSlots([]);
//     setSlotDraft({
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//     });
//   }

//   function handleBulkOpen() {
//     setShowSetSlots(true);
//     setEditIdx(null);
//     setCreatedSlots([]);
//     setSlotDraft({
//       days: [],
//       start: "",
//       end: "",
//       interval: 30,
//     });
//   }

//   // ---- UI ----
//   return (
//     <main className="min-h-screen w-full flex flex-col items-center justify-start py-12 bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
//       <section
//         className="relative w-full max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-2 p-2 sm:p-8 animate-fade-in-up overflow-visible"
//         style={{
//           borderColor: "#005e6a",
//         }}
//       >
//         <div
//           className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
//           style={{
//             boxShadow: "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
//           }}
//         ></div>
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 z-10 relative">
//           <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow text-[#005e6a] tracking-wide">
//             Slot Settings
//           </h1>
//           <button
//             className="bg-[#005e6a] text-white px-6 py-2 rounded-lg shadow hover:bg-[#077e8d] font-semibold transition"
//             onClick={handleBulkOpen}
//           >
//             Set Slots Bulk
//           </button>
//         </div>
//         <div
//           className="overflow-x-auto bg-white rounded-2xl shadow-2xl border border-[#bfe7ef]"
//           style={{
//             minWidth: "900px",
//             boxShadow: "0 2px 24px 0 #005e6a18, 0 0 0 1.5px #3ecbdb44",
//             width: "100%",
//             maxWidth: "100%",
//           }}
//         >
//           <table
//             className="w-full text-sm table-fixed"
//             style={{
//               minWidth: "900px",
//               tableLayout: "fixed",
//             }}
//           >
//             <colgroup>
//               <col style={{ width: "18%" }} />
//               <col style={{ width: "17%" }} />
//               <col style={{ width: "17%" }} />
//               <col style={{ width: "20%" }} />
//               <col style={{ width: "13%" }} />
//               <col style={{ width: "15%" }} />
//             </colgroup>
//             <thead>
//               <tr className="bg-[#f5fafd] text-[#005e6a]">
//                 <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Day</th>
//                 <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Start Time</th>
//                 <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">End Time</th>
//                 <th className="p-3 border border-[#c5e7ef] text-left text-base font-semibold">Time Interval</th>
//                 <th className="p-3 border border-[#c5e7ef] text-center text-base font-semibold">Status</th>
//                 <th className="p-3 border border-[#c5e7ef] text-center text-base font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {daySlots.map((slot, idx) => (
//                 <tr
//                   key={slot.day}
//                   className="border-b border-[#e0f2f7] hover:bg-[#f2fcfd] transition"
//                 >
//                   {/* Day Name */}
//                   <td className="p-3 border border-[#e0f2f7] font-bold text-[#005e6a] text-lg whitespace-nowrap">
//                     {slot.name}
//                   </td>
//                   {/* Start Time */}
//                   <td className="p-3 border border-[#e0f2f7] text-base">{slot.start}</td>
//                   {/* End Time */}
//                   <td className="p-3 border border-[#e0f2f7] text-base">{slot.end}</td>
//                   {/* Time Interval */}
//                   <td className="p-3 border border-[#e0f2f7] text-base">{slot.interval} min</td>
//                   {/* Status */}
//                   <td className="p-3 border border-[#e0f2f7] text-center">
//                     <span
//                       className={`inline-block px-3 py-1 rounded font-bold text-xs w-24 text-center ${
//                         slot.status === "active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
//                     </span>
//                   </td>
//                   {/* Edit/Delete Actions */}
//                   <td className="p-3 border border-[#e0f2f7] text-center">
//                     <div className="flex justify-center gap-3">
//                       <button
//                         className="bg-blue-600 text-white px-4 py-1 rounded text-xs hover:bg-blue-700 transition"
//                         onClick={() => handleEdit(idx)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-4 py-1 rounded text-xs hover:bg-red-600 transition"
//                         onClick={() => handleDelete(idx)}
//                       >
//                         Delete Slot
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Set Slots Bulk Modal - pops up on Edit or Set Slots Bulk */}
//       {showSetSlots && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div
//             className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative border border-[#bfe7ef] overflow-y-auto max-h-[90vh]"
//           >
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
//               onClick={() => {
//                 setShowSetSlots(false);
//                 setEditIdx(null);
//                 setCreatedSlots([]);
//                 setSlotDraft({
//                   days: [],
//                   start: "",
//                   end: "",
//                   interval: 30,
//                 });
//               }}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-[#005e6a] text-center">Set Recurring Slots</h2>
//             {/* Recurring Slots Creation Box */}
//             <div className="bg-[#f5fafd] rounded-xl border border-[#bfe7ef] p-6 mb-6">
//               <div className="flex flex-col gap-4">
//                 {/* Days checkboxes */}
//                 <div>
//                   <label className="font-semibold text-[#005e6a] mb-1 block">Select Days</label>
//                   <div className="flex flex-wrap gap-3">
//                     {weekDays.map((d) => {
//                       let isUsed = false;
//                       if (editIdx !== null) {
//                         // bulk edit for this day only
//                         isUsed = d.key !== daySlots[editIdx].day;
//                       }
//                       return (
//                         <label
//                           key={d.key}
//                           className={
//                             "flex items-center gap-1 text-sm font-medium " +
//                             (isUsed
//                               ? "text-gray-400 line-through cursor-not-allowed"
//                               : "text-gray-700")
//                           }
//                         >
//                           <input
//                             type="checkbox"
//                             checked={slotDraft.days.includes(d.key)}
//                             onChange={() => handleDayChange(d.key)}
//                             disabled={isUsed}
//                             className="accent-[#005e6a]"
//                           />
//                           {d.name}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 {/* Start and End Time */}
//                 <div className="flex gap-4 items-center">
//                   <div className="flex flex-col flex-1">
//                     <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                     <input
//                       type="time"
//                       name="start"
//                       value={slotDraft.start}
//                       onChange={handleSlotDraftChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                     />
//                   </div>
//                   <div className="flex flex-col flex-1">
//                     <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                     <input
//                       type="time"
//                       name="end"
//                       value={slotDraft.end}
//                       onChange={handleSlotDraftChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                     />
//                   </div>
//                 </div>
//                 {/* Slot interval */}
//                 <div className="flex flex-col mt-3">
//                   <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
//                   <select
//                     name="interval"
//                     value={slotDraft.interval}
//                     onChange={handleSlotDraftChange}
//                     className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//                   >
//                     {intervals.map((mins) => (
//                       <option key={mins} value={mins}>
//                         {mins} min
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={handleCreateSlot}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                     disabled={
//                       slotDraft.days.length === 0 ||
//                       !slotDraft.start ||
//                       !slotDraft.end ||
//                       slotDraft.start >= slotDraft.end
//                     }
//                   >
//                     Create
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* Render Created Recurring Slots */}
//             {createdSlots.map((slot, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative mb-4"
//               >
//                 <button
//                   onClick={() => handleDeleteSlot(idx)}
//                   className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
//                   title="Delete this slot"
//                 >
//                   Delete
//                 </button>
//                 <div className="text-sm">
//                   <span className="font-bold text-[#005e6a]">Days: </span>
//                   {slot.days.map((d) => weekDays.find((w) => w.key === d)?.name).join(", ")}
//                 </div>
//                 <div className="text-sm">
//                   <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}
//                   &nbsp;&nbsp;
//                   <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
//                   &nbsp;&nbsp;
//                   <span className="font-bold text-[#005e6a]">Interval:</span> {slot.interval} min
//                 </div>
//               </div>
//             ))}

//             {/* Custom Slot Section */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#bfe7ef] mb-4">
//               <button
//                 className="bg-[#005e6a] text-white px-4 py-2 rounded hover:bg-[#077e8d] font-semibold transition"
//                 onClick={() => setShowCustomSlot((val) => !val)}
//               >
//                 {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
//               </button>
//               {showCustomSlot && (
//                 <div className="mt-6 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] p-4 space-y-4">
//                   <div className="flex flex-col">
//                     <label className="font-semibold text-[#005e6a] mb-1">Select Date</label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={customSlotDraft.date}
//                       onChange={handleCustomDateChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//                     />
//                   </div>
//                   {customSlotDraft.date && (
//                     <div className="flex flex-col gap-2">
//                       <div className="font-semibold text-[#005e6a] mb-1">Status</div>
//                       <div className="flex gap-6">
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="openClose"
//                             value="open"
//                             checked={customSlotDraft.openClose === "open"}
//                             onChange={handleCustomSlotChange}
//                             className="accent-[#005e6a]"
//                           />
//                           Open
//                         </label>
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="openClose"
//                             value="close"
//                             checked={customSlotDraft.openClose === "close"}
//                             onChange={handleCustomSlotChange}
//                             className="accent-[#005e6a]"
//                           />
//                           Close
//                         </label>
//                       </div>
//                       {customSlotDraft.openClose === "open" && (
//                         <div className="flex gap-4 items-center mt-2">
//                           <div className="flex flex-col flex-1">
//                             <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                             <input
//                               type="time"
//                               name="start"
//                               value={customSlotDraft.start}
//                               onChange={handleCustomSlotChange}
//                               className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                             />
//                           </div>
//                           <div className="flex flex-col flex-1">
//                             <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                             <input
//                               type="time"
//                               name="end"
//                               value={customSlotDraft.end}
//                               onChange={handleCustomSlotChange}
//                               className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                             />
//                           </div>
//                         </div>
//                       )}
//                       {customSlotDraft.openClose === "close" && (
//                         <div className="text-red-600 mt-2 font-semibold">
//                           This day's slots will be disabled.
//                         </div>
//                       )}
//                     </div>
//                   )}
//                   <div className="flex justify-end">
//                     <button
//                       onClick={handleCreateCustomSlot}
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                       disabled={
//                         !customSlotDraft.date ||
//                         !customSlotDraft.openClose ||
//                         (customSlotDraft.openClose === "open" &&
//                           (!customSlotDraft.start ||
//                             !customSlotDraft.end ||
//                             customSlotDraft.start >= customSlotDraft.end))
//                       }
//                     >
//                       Create
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Render Created Custom Slots */}
//             {customSlots.map((slot, idx) => (
//               <div
//                 key={idx}
//                 className="bg-[#f7fbfc] rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative mb-4"
//               >
//                 <button
//                   onClick={() => handleDeleteCustomSlot(idx)}
//                   className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
//                   title="Delete this slot"
//                 >
//                   Delete
//                 </button>
//                 <div className="text-sm">
//                   <span className="font-bold text-[#005e6a]">Date: </span>
//                   {slot.date}
//                 </div>
//                 <div className="text-sm">
//                   <span className="font-bold text-[#005e6a]">Status:</span>{" "}
//                   {slot.openClose === "open" ? (
//                     <>
//                       Open | <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}{" "}
//                       <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
//                     </>
//                   ) : (
//                     <span className="text-red-600">Closed</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {/* Save All Button */}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
//                 onClick={handleBulkSave}
//                 disabled={createdSlots.length === 0}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }