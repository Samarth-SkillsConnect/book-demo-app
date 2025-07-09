
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
//   // Per-day recurring slots with status
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
//   // Custom slots
//   const [customSlots, setCustomSlots] = useState([]);
//   const [showCustomSlotsPopup, setShowCustomSlotsPopup] = useState(false);

//   // Bulk/popup modal state
//   const [showSetSlots, setShowSetSlots] = useState(false);
//   const [editIdx, setEditIdx] = useState(null);

//   // Slot draft for modal
//   const [slotDraft, setSlotDraft] = useState({
//     days: [],
//     start: defaultStart,
//     end: defaultEnd,
//     interval: 30,
//     status: "active",
//   });
//   const [createdSlots, setCreatedSlots] = useState([]);
//   const [bulkSaveMsg, setBulkSaveMsg] = useState("");
//   const [savingBulk, setSavingBulk] = useState(false);
//   const [deleteDayMsg, setDeleteDayMsg] = useState("");
//   // Custom slot modal state (shared for popup and inline)
//   const [showCustomSlot, setShowCustomSlot] = useState(false);
//   const [customSlotDraft, setCustomSlotDraft] = useState({
//     date: "",
//     openClose: "",
//     start: "",
//     end: "",
//     status: "active",
//   });
//   const [customSaveMsg, setCustomSaveMsg] = useState("");
//   const [savingCustom, setSavingCustom] = useState(false);

//   // Confirmation dialogs
//   const [showDeleteDayConfirm, setShowDeleteDayConfirm] = useState(false);
//   const [pendingDeleteDayIdx, setPendingDeleteDayIdx] = useState(null);
//   const [showBulkSaveConfirm, setShowBulkSaveConfirm] = useState(false);

//   // --- Table Actions ---
//   function handleEdit(idx) {
//     setEditIdx(idx);
//     setShowSetSlots(true);
//     setSlotDraft({
//       days: [daySlots[idx].day],
//       start: daySlots[idx].start,
//       end: daySlots[idx].end,
//       interval: daySlots[idx].interval,
//       status: daySlots[idx].status,
//     });
//     setCreatedSlots([]); // clear any previous
//     setBulkSaveMsg("");
//   }

//   function handleDelete(idx) {
//     setPendingDeleteDayIdx(idx);
//     setShowDeleteDayConfirm(true);
//   }

//   async function confirmDeleteDay() {
//     if (pendingDeleteDayIdx !== null) {
//       const dayToDelete = daySlots[pendingDeleteDayIdx].day;

//       // Call backend API to delete all slots for this day
//       try {
//         await fetch(
//           `http://localhost:5000/api/admin/slots/day/${dayToDelete}`,
//           { method: "DELETE" }
//         ); if (res.ok) {
//           setDeleteDayMsg(
//             `All slots for ${daySlots[pendingDeleteDayIdx].name} have been deleted successfully!`
//           );
//         } else {
//           setDeleteDayMsg("Failed to delete slots for that day.");
//         }
//       } catch (err) {
//         setDeleteDayMsg("Error deleting slots for that day.");
//       }

//       setDaySlots((prev) =>
//         prev.map((slot, i) =>
//           i === pendingDeleteDayIdx
//             ? {
//               ...slot,
//               start: defaultStart,
//               end: defaultEnd,
//               interval: defaultInterval,
//               status: "inactive",
//             }
//             : slot
//         )
//       );

//       setCreatedSlots((prev) =>
//         prev.filter((slot) => !slot.days.includes(dayToDelete))
//       );
//     }
//     setShowDeleteDayConfirm(false);
//     setPendingDeleteDayIdx(null);
//     setTimeout(() => setDeleteDayMsg(""), 2500);
//   }
//   function cancelDeleteDay() {
//     setShowDeleteDayConfirm(false);
//     setPendingDeleteDayIdx(null);
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
//   function handleSlotStatusChange(status) {
//     setSlotDraft((prev) => ({
//       ...prev,
//       status,
//       ...(status === "weekly-off"
//         ? { start: "", end: "", interval: defaultInterval }
//         : { start: defaultStart, end: defaultEnd }),
//     }));
//   }

//   function handleCreateSlot() {
//     if (
//       slotDraft.days.length === 0 ||
//       (!slotDraft.start && slotDraft.status !== "weekly-off") ||
//       (!slotDraft.end && slotDraft.status !== "weekly-off") ||
//       (slotDraft.start >= slotDraft.end && slotDraft.status !== "weekly-off")
//     )
//       return;

//     setCreatedSlots((prev) => [
//       ...prev.filter((s) => !s.days.some((d) => slotDraft.days.includes(d))),
//       { ...slotDraft },
//     ]);
//     setSlotDraft({
//       days: [],
//       start: defaultStart,
//       end: defaultEnd,
//       interval: 30,
//       status: "active",
//     });
//   }
//   function handleDeleteSlot(idx) {
//     setCreatedSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // Helper to get disabled days (already added)
//   const disabledDays = createdSlots.flatMap((slot) => slot.days);

//   // -- Custom Slot Logic (shared) --
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
//   function handleCustomSlotStatusChange(status) {
//     setCustomSlotDraft((prev) => ({
//       ...prev,
//       status,
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
//   function handleAddCustomSlotDraft() {
//     if (
//       !customSlotDraft.date ||
//       !customSlotDraft.openClose ||
//       (customSlotDraft.openClose === "open" &&
//         (!customSlotDraft.start ||
//           !customSlotDraft.end ||
//           customSlotDraft.start >= customSlotDraft.end))
//     )
//       return;
//     // Overwrite if already exists for that date
//     setCustomSlots((prev) => [
//       ...prev.filter((s) => s.date !== customSlotDraft.date),
//       { ...customSlotDraft },
//     ]);
//     setCustomSlotDraft({
//       date: "",
//       openClose: "",
//       start: "",
//       end: "",
//       status: "active",
//     });
//     setCustomSaveMsg("");
//   }
//   function handleDeleteCustomSlot(idx) {
//     setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
//   }

//   // --- Save from popup modal into daySlots ---
//   function updateDaySlotsFromPopup() {
//     if (editIdx !== null) {
//       // Only update the day being edited
//       const slot = createdSlots.length
//         ? createdSlots.find((s) => s.days.includes(daySlots[editIdx].day))
//         : slotDraft;
//       if (slot) {
//         setDaySlots((prev) =>
//           prev.map((d, i) =>
//             i === editIdx
//               ? {
//                 ...d,
//                 start: slot.start,
//                 end: slot.end,
//                 interval: slot.interval,
//                 status: slot.status,
//               }
//               : d
//           )
//         );
//       }
//     } else {
//       // Bulk: update all days in createdSlots
//       setDaySlots((prev) =>
//         prev.map((d) => {
//           const slot = createdSlots.find((s) => s.days.includes(d.day));
//           if (slot) {
//             return {
//               ...d,
//               start: slot.start,
//               end: slot.end,
//               interval: slot.interval,
//               status: slot.status,
//             };
//           }
//           return d;
//         })
//       );
//     }
//   }

//   // --- API Integration for bulk slots ---
//   async function saveRecurringSlotsToBackend() {
//     setShowBulkSaveConfirm(false);
//     setSavingBulk(true);
//     setBulkSaveMsg("");
//     updateDaySlotsFromPopup();
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/slots/bulk-generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           daysConfig: (editIdx !== null
//             ? daySlots.map((d, i) =>
//               i === editIdx
//                 ? {
//                   day: d.day,
//                   status:
//                     createdSlots.length > 0
//                       ? createdSlots[0].status
//                       : slotDraft.status,
//                   start:
//                     createdSlots.length > 0
//                       ? createdSlots[0].start
//                       : slotDraft.start,
//                   end:
//                     createdSlots.length > 0
//                       ? createdSlots[0].end
//                       : slotDraft.end,
//                   interval:
//                     createdSlots.length > 0
//                       ? createdSlots[0].interval
//                       : slotDraft.interval,
//                 }
//                 : d
//             )
//             : daySlots.map((d) => ({
//               day: d.day,
//               status: d.status,
//               start: d.start,
//               end: d.end,
//               interval: d.interval,
//             }))),
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to save slots");
//       const data = await res.json();
//       setBulkSaveMsg(data.message || "Recurring slots saved!");
//       // Close popup after saving
//       setShowSetSlots(false);
//       setEditIdx(null);
//       setCreatedSlots([]);
//       setSlotDraft({
//         days: [],
//         start: defaultStart,
//         end: defaultEnd,
//         interval: 30,
//         status: "active",
//       });
//     } catch (err) {
//       setBulkSaveMsg("Failed to save recurring slots.");
//     }
//     setSavingBulk(false);
//   }

//   // --- API Integration for custom slots ---
//   async function saveCustomSlotsToBackend() {
//     setSavingCustom(true);
//     setCustomSaveMsg("");
//     try {
//       for (const slot of customSlots) {
//         if (slot.openClose === "open") {
//           // Remove any existing slot for this date and time
//           await fetch("http://localhost:5000/api/admin/slots/custom", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               date: slot.date,
//               start: slot.start,
//               end: slot.end,
//               openClose: "open"
//             }),
//           });
//         } else if (slot.openClose === "close") {
//           await fetch("http://localhost:5000/api/admin/slots/custom", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               date: slot.date,
//               openClose: "close"
//             }),
//           });
//         }
//       }
//       setCustomSaveMsg("Custom slots created!");
//       setCustomSlots([]); // clear after creating
//     } catch (err) {
//       setCustomSaveMsg("Failed to create custom slots.");
//     }
//     setSavingCustom(false);
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
//           <div className="flex gap-2">
//             <button
//               className="bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 font-semibold transition"
//               onClick={() => setShowCustomSlotsPopup(true)}
//             >
//               View Custom Slots
//             </button>
//             <button
//               className="bg-[#005e6a] text-white px-6 py-2 rounded-lg shadow hover:bg-[#077e8d] font-semibold transition"
//               onClick={() => {
//                 setShowSetSlots(true);
//                 setEditIdx(null);
//                 setCreatedSlots([]);
//                 setSlotDraft({
//                   days: [],
//                   start: defaultStart,
//                   end: defaultEnd,
//                   interval: 30,
//                   status: "active",
//                 });
//                 setBulkSaveMsg("");
//               }}
//             >
//               Set Slots Bulk
//             </button>
//             <button
//               className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
//               onClick={() => setShowCustomSlot((v) => !v)}
//             >
//               {showCustomSlot ? "Hide Custom Slot" : "Add Custom Slot"}
//             </button>
//           </div>
//         </div>

//         {/* Custom Slot Inline Form */}
//         {showCustomSlot && (
//           <div className="mb-8 bg-white border border-[#bfe7ef] rounded-xl shadow-xl p-6">
//             <h2 className="text-lg font-bold text-[#005e6a] mb-2">Add Custom Slot</h2>
//             <div className="flex flex-col md:flex-row gap-4 items-end">
//               <div className="flex flex-col">
//                 <label className="font-semibold text-[#005e6a] mb-1">Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={customSlotDraft.date}
//                   onChange={handleCustomDateChange}
//                   className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="font-semibold text-[#005e6a] mb-1">Status</label>
//                 <div className="flex gap-2 mt-1">
//                   <button
//                     type="button"
//                     onClick={() => handleCustomSlotStatusChange("active")}
//                     className={`px-3 py-1 rounded font-semibold text-xs border ${customSlotDraft.status === "active"
//                       ? "bg-green-100 text-green-700 border-green-400"
//                       : "bg-white text-gray-600 border-gray-300"
//                       }`}
//                   >
//                     Active
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleCustomSlotStatusChange("inactive")}
//                     className={`px-3 py-1 rounded font-semibold text-xs border ${customSlotDraft.status === "inactive"
//                       ? "bg-red-100 text-red-600 border-red-400"
//                       : "bg-white text-gray-600 border-gray-300"
//                       }`}
//                   >
//                     Inactive
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <label className="font-semibold text-[#005e6a] mb-1">Open/Close</label>
//                 <div className="flex gap-2 mt-1">
//                   <label className="flex items-center gap-1">
//                     <input
//                       type="radio"
//                       name="openClose"
//                       value="open"
//                       checked={customSlotDraft.openClose === "open"}
//                       onChange={handleCustomSlotChange}
//                       className="accent-[#005e6a]"
//                     />
//                     Open
//                   </label>
//                   <label className="flex items-center gap-1">
//                     <input
//                       type="radio"
//                       name="openClose"
//                       value="close"
//                       checked={customSlotDraft.openClose === "close"}
//                       onChange={handleCustomSlotChange}
//                       className="accent-[#005e6a]"
//                     />
//                     Close
//                   </label>
//                 </div>
//               </div>
//               {customSlotDraft.openClose === "open" && (
//                 <>
//                   <div className="flex flex-col">
//                     <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                     <input
//                       type="time"
//                       name="start"
//                       value={customSlotDraft.start}
//                       onChange={handleCustomSlotChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                     <input
//                       type="time"
//                       name="end"
//                       value={customSlotDraft.end}
//                       onChange={handleCustomSlotChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="flex flex-col">
//                 <button
//                   onClick={handleAddCustomSlotDraft}
//                   className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                   disabled={
//                     !customSlotDraft.date ||
//                     !customSlotDraft.openClose ||
//                     (customSlotDraft.openClose === "open" &&
//                       (!customSlotDraft.start ||
//                         !customSlotDraft.end ||
//                         customSlotDraft.start >= customSlotDraft.end))
//                   }
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//             {/* Custom Slots Table */}
//             {customSlots.length > 0 && (
//               <div className="mt-8">
//                 <h2 className="text-lg font-bold text-[#005e6a] mb-2">Slots to Create</h2>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-[600px] w-full border border-[#bfe7ef] rounded-xl shadow text-sm bg-white">
//                     <thead>
//                       <tr className="bg-[#f5fafd] text-[#005e6a]">
//                         <th className="p-3 border border-[#c5e7ef] text-left">Date</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">Open/Close</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">Start</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">End</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">Status</th>
//                         <th className="p-3 border border-[#c5e7ef] text-center">Delete</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {customSlots.map((slot, idx) => (
//                         <tr key={idx} className="border-b border-[#e0f2f7]">
//                           <td className="p-3 border border-[#e0f2f7]">{slot.date}</td>
//                           <td className="p-3 border border-[#e0f2f7] capitalize">{slot.openClose}</td>
//                           <td className="p-3 border border-[#e0f2f7]">{slot.start || "-"}</td>
//                           <td className="p-3 border border-[#e0f2f7]">{slot.end || "-"}</td>
//                           <td className="p-3 border border-[#e0f2f7]">
//                             <span
//                               className={`inline-block px-3 py-1 rounded font-bold text-xs w-20 text-center ${slot.status === "active"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-600"
//                                 }`}
//                             >
//                               {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
//                             </span>
//                           </td>
//                           <td className="p-3 border border-[#e0f2f7] text-center">
//                             <button
//                               className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
//                               onClick={() => handleDeleteCustomSlot(idx)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//             {/* Create Custom Slots Button */}
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition disabled:opacity-60"
//                 onClick={saveCustomSlotsToBackend}
//                 disabled={savingCustom || customSlots.length === 0}
//               >
//                 {savingCustom ? "Creating..." : "Create"}
//               </button>
//             </div>
//             {/* Save Feedback */}
//             {customSaveMsg && (
//               <div className="mt-3 text-center font-semibold text-blue-700">{customSaveMsg}</div>
//             )}
//           </div>
//         )}

//         {/* View Custom Slots Popup */}
//         {showCustomSlotsPopup && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
//             <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-[#bfe7ef]">
//               <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
//                 onClick={() => setShowCustomSlotsPopup(false)}
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <h2 className="text-2xl font-bold text-[#005e6a] mb-4 text-center">All Custom Slots</h2>
//               {customSlots.length === 0 ? (
//                 <div className="text-center text-gray-500 py-12">No custom slots created yet.</div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-[600px] w-full border border-[#bfe7ef] rounded-xl shadow text-sm bg-white">
//                     <thead>
//                       <tr className="bg-[#f5fafd] text-[#005e6a]">
//                         <th className="p-3 border border-[#c5e7ef] text-left">Date</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">Open/Close</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">Start</th>
//                         <th className="p-3 border border-[#c5e7ef] text-left">End</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {customSlots.map((slot, idx) => (
//                         <tr key={idx} className="border-b border-[#e0f2f7]">
//                           <td className="p-3 border border-[#e0f2f7]">{slot.date}</td>
//                           <td className="p-3 border border-[#e0f2f7] capitalize">{slot.openClose}</td>
//                           <td className="p-3 border border-[#e0f2f7]">{slot.start || "-"}</td>
//                           <td className="p-3 border border-[#e0f2f7]">{slot.end || "-"}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}


//         {/* Main Recurring Slots Table */}
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
//                   <td className="p-3 border border-[#e0f2f7] text-base">
//                     {slot.status === "weekly-off" ? (
//                       <span className="text-gray-400 font-semibold">-</span>
//                     ) : (
//                       slot.start
//                     )}
//                   </td>
//                   {/* End Time */}
//                   <td className="p-3 border border-[#e0f2f7] text-base">
//                     {slot.status === "weekly-off" ? (
//                       <span className="text-gray-400 font-semibold">-</span>
//                     ) : (
//                       slot.end
//                     )}
//                   </td>
//                   {/* Time Interval */}
//                   <td className="p-3 border border-[#e0f2f7] text-base">
//                     {slot.status === "weekly-off" ? (
//                       <span className="text-gray-400 font-semibold">-</span>
//                     ) : (
//                       `${slot.interval} min`
//                     )}
//                   </td>
//                   {/* Status */}
//                   <td className="p-3 border border-[#e0f2f7] text-center">
//                     <span
//                       className={`inline-block px-3 py-1 rounded font-bold text-xs w-24 text-center ${slot.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : slot.status === "inactive"
//                           ? "bg-red-100 text-red-600"
//                           : "bg-gray-200 text-gray-700"
//                         }`}
//                     >
//                       {slot.status === "active"
//                         ? "Active"
//                         : slot.status === "inactive"
//                           ? "Inactive"
//                           : "Weekly Off"}
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

//       {/* Confirm Delete Day Modal */}
//       {showDeleteDayConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-[#bfe7ef] text-center">
//             <h2 className="text-xl font-bold text-red-700 mb-4">Confirm Deletion</h2>
//             <p className="mb-6">
//               Do you really want to delete all slots for{" "}
//               <span className="font-bold text-[#005e6a]">
//                 {pendingDeleteDayIdx !== null && daySlots[pendingDeleteDayIdx].name}
//               </span>
//               ?
//             </p>
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={confirmDeleteDay}
//                 className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700"
//               >
//                 Yes, Delete All
//               </button>
//               <button
//                 onClick={cancelDeleteDay}
//                 className="bg-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {deleteDayMsg && (
//         <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 text-lg font-semibold transition">
//           {deleteDayMsg}
//         </div>
//       )}
//       {/* Set Slots Bulk Modal */}
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
//                   start: defaultStart,
//                   end: defaultEnd,
//                   interval: 30,
//                   status: "active",
//                 });
//                 setBulkSaveMsg("");
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
//                         isUsed = d.key !== daySlots[editIdx].day;
//                       } else {
//                         isUsed = disabledDays.includes(d.key);
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
//                 {slotDraft.status !== "weekly-off" && (
//                   <div className="flex gap-4 items-center">
//                     <div className="flex flex-col flex-1">
//                       <label className="font-semibold text-[#005e6a] mb-1">Start Time</label>
//                       <input
//                         type="time"
//                         name="start"
//                         value={slotDraft.start}
//                         onChange={handleSlotDraftChange}
//                         className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                       />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                       <label className="font-semibold text-[#005e6a] mb-1">End Time</label>
//                       <input
//                         type="time"
//                         name="end"
//                         value={slotDraft.end}
//                         onChange={handleSlotDraftChange}
//                         className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a]"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {/* Slot interval */}
//                 {slotDraft.status !== "weekly-off" && (
//                   <div className="flex flex-col mt-3">
//                     <label className="font-semibold text-[#005e6a] mb-1">Slot Time Interval</label>
//                     <select
//                       name="interval"
//                       value={slotDraft.interval}
//                       onChange={handleSlotDraftChange}
//                       className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005e6a] max-w-xs"
//                     >
//                       {intervals.map((mins) => (
//                         <option key={mins} value={mins}>
//                           {mins} min
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {/* Status */}
//                 <div className="flex flex-col mt-3">
//                   <label className="font-semibold text-[#005e6a] mb-1">Status</label>
//                   <div className="flex gap-2 mt-1">
//                     <button
//                       type="button"
//                       onClick={() => handleSlotStatusChange("active")}
//                       className={`px-3 py-1 rounded font-semibold text-xs border ${slotDraft.status === "active"
//                         ? "bg-green-100 text-green-700 border-green-400"
//                         : "bg-white text-gray-600 border-gray-300"
//                         }`}
//                     >
//                       Active
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleSlotStatusChange("weekly-off")}
//                       className={`px-3 py-1 rounded font-semibold text-xs border ${slotDraft.status === "weekly-off"
//                         ? "bg-gray-200 text-gray-700 border-gray-400"
//                         : "bg-white text-gray-600 border-gray-300"
//                         }`}
//                     >
//                       Weekly Off
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={handleCreateSlot}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
//                     disabled={
//                       slotDraft.days.length === 0 ||
//                       (slotDraft.status !== "weekly-off" &&
//                         (!slotDraft.start ||
//                           !slotDraft.end ||
//                           slotDraft.start >= slotDraft.end))
//                     }
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* Render Created Recurring Slots */}
//             {createdSlots.length > 0 && (
//               <div className="mb-4">
//                 {createdSlots.map((slot, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative mb-2"
//                   >
//                     <button
//                       onClick={() => handleDeleteSlot(idx)}
//                       className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-bold"
//                       title="Delete this slot"
//                     >
//                       Delete
//                     </button>
//                     <div className="text-sm">
//                       <span className="font-bold text-[#005e6a]">Days: </span>
//                       {slot.days.map((d) => weekDays.find((w) => w.key === d)?.name).join(", ")}
//                     </div>
//                     <div className="text-sm">
//                       {slot.status === "weekly-off" ? (
//                         <span className="text-gray-600 font-semibold">Weekly Off</span>
//                       ) : (
//                         <>
//                           <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}
//                           &nbsp;&nbsp;
//                           <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
//                           &nbsp;&nbsp;
//                           <span className="font-bold text-[#005e6a]">Interval:</span> {slot.interval} min
//                           &nbsp;&nbsp;
//                           <span className="font-bold text-[#005e6a]">Status:</span> {slot.status}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {/* Save Recurring Slots Button */}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
//                 onClick={() => setShowBulkSaveConfirm(true)}
//                 disabled={savingBulk}
//               >
//                 {savingBulk ? "Saving..." : "Save Recurring Slots"}
//               </button>
//             </div>
//             {/* Save Feedback */}
//             {bulkSaveMsg && (
//               <div className="mt-3 text-center font-semibold text-blue-700">{bulkSaveMsg}</div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Confirm Save Recurring Slots Modal */}
//       {showBulkSaveConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-[#bfe7ef] text-center">
//             <h2 className="text-xl font-bold text-[#005e6a] mb-4">Please Wait</h2>
//             <p className="mb-6">
//               Your slots will be created shortly.<br />
//               Do you want to continue?
//             </p>
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={saveRecurringSlotsToBackend}
//                 className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800"
//               >
//                 Yes, Create Slots
//               </button>
//               <button
//                 onClick={() => setShowBulkSaveConfirm(false)}
//                 className="bg-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
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
  // Per-day recurring slots with status
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
  // Custom slots (local draft)
  const [customSlots, setCustomSlots] = useState([]);
  // For popup: all custom slots fetched from backend
  const [allCustomSlots, setAllCustomSlots] = useState([]);
  const [isLoadingCustomSlots, setIsLoadingCustomSlots] = useState(false);
  const [showCustomSlotsPopup, setShowCustomSlotsPopup] = useState(false);

  // Bulk/popup modal state
  const [showSetSlots, setShowSetSlots] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  // Slot draft for modal
  const [slotDraft, setSlotDraft] = useState({
    days: [],
    start: defaultStart,
    end: defaultEnd,
    interval: 30,
    status: "active",
  });
  const [createdSlots, setCreatedSlots] = useState([]);
  const [bulkSaveMsg, setBulkSaveMsg] = useState("");
  const [savingBulk, setSavingBulk] = useState(false);
  const [deleteDayMsg, setDeleteDayMsg] = useState("");
  // Custom slot modal state (shared for popup and inline)
  const [showCustomSlot, setShowCustomSlot] = useState(false);
  const [customSlotDraft, setCustomSlotDraft] = useState({
    date: "",
    openClose: "",
    start: "",
    end: "",
    status: "active",
  });
  const [customSaveMsg, setCustomSaveMsg] = useState("");
  const [savingCustom, setSavingCustom] = useState(false);

  // Confirmation dialogs
  const [showDeleteDayConfirm, setShowDeleteDayConfirm] = useState(false);
  const [pendingDeleteDayIdx, setPendingDeleteDayIdx] = useState(null);
  const [showBulkSaveConfirm, setShowBulkSaveConfirm] = useState(false);

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
    setBulkSaveMsg("");
  }

  function handleDelete(idx) {
    setPendingDeleteDayIdx(idx);
    setShowDeleteDayConfirm(true);
  }

  async function confirmDeleteDay() {
    if (pendingDeleteDayIdx !== null) {
      const dayToDelete = daySlots[pendingDeleteDayIdx].day;

      try {
        const res = await fetch(
          `http://localhost:5000/api/admin/slots/day/${dayToDelete}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          setDeleteDayMsg(
            `All slots for ${daySlots[pendingDeleteDayIdx].name} have been deleted successfully!`
          );
        } else {
          setDeleteDayMsg("Failed to delete slots for that day.");
        }
      } catch (err) {
        setDeleteDayMsg("Error deleting slots for that day.");
      }

      setDaySlots((prev) =>
        prev.map((slot, i) =>
          i === pendingDeleteDayIdx
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

      setCreatedSlots((prev) =>
        prev.filter((slot) => !slot.days.includes(dayToDelete))
      );
    }
    setShowDeleteDayConfirm(false);
    setPendingDeleteDayIdx(null);
    setTimeout(() => setDeleteDayMsg(""), 2500);
  }
  function cancelDeleteDay() {
    setShowDeleteDayConfirm(false);
    setPendingDeleteDayIdx(null);
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
      ...(status === "weekly-off"
        ? { start: "", end: "", interval: defaultInterval }
        : { start: defaultStart, end: defaultEnd }),
    }));
  }

  function handleCreateSlot() {
    if (
      slotDraft.days.length === 0 ||
      (!slotDraft.start && slotDraft.status !== "weekly-off") ||
      (!slotDraft.end && slotDraft.status !== "weekly-off") ||
      (slotDraft.start >= slotDraft.end && slotDraft.status !== "weekly-off")
    )
      return;

    setCreatedSlots((prev) => [
      ...prev.filter((s) => !s.days.some((d) => slotDraft.days.includes(d))),
      { ...slotDraft },
    ]);
    setSlotDraft({
      days: [],
      start: defaultStart,
      end: defaultEnd,
      interval: 30,
      status: "active",
    });
  }
  function handleDeleteSlot(idx) {
    setCreatedSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  // Helper to get disabled days (already added)
  const disabledDays = createdSlots.flatMap((slot) => slot.days);

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
  function handleAddCustomSlotDraft() {
    if (
      !customSlotDraft.date ||
      !customSlotDraft.openClose ||
      (customSlotDraft.openClose === "open" &&
        (!customSlotDraft.start ||
          !customSlotDraft.end ||
          customSlotDraft.start >= customSlotDraft.end))
    )
      return;
    // Overwrite if already exists for that date
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
    setCustomSaveMsg("");
  }
  function handleDeleteCustomSlot(idx) {
    setCustomSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  // --- Save from popup modal into daySlots ---
  function updateDaySlotsFromPopup() {
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
  }

  // --- API Integration for bulk slots ---
  async function saveRecurringSlotsToBackend() {
    setShowBulkSaveConfirm(false);
    setSavingBulk(true);
    setBulkSaveMsg("");
    updateDaySlotsFromPopup();
    try {
      const res = await fetch("http://localhost:5000/api/admin/slots/bulk-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          daysConfig: (editIdx !== null
            ? daySlots.map((d, i) =>
                i === editIdx
                  ? {
                      day: d.day,
                      status:
                        createdSlots.length > 0
                          ? createdSlots[0].status
                          : slotDraft.status,
                      start:
                        createdSlots.length > 0
                          ? createdSlots[0].start
                          : slotDraft.start,
                      end:
                        createdSlots.length > 0
                          ? createdSlots[0].end
                          : slotDraft.end,
                      interval:
                        createdSlots.length > 0
                          ? createdSlots[0].interval
                          : slotDraft.interval,
                    }
                  : d
              )
            : daySlots.map((d) => ({
                day: d.day,
                status: d.status,
                start: d.start,
                end: d.end,
                interval: d.interval,
              }))),
        }),
      });
      if (!res.ok) throw new Error("Failed to save slots");
      const data = await res.json();
      setBulkSaveMsg(data.message || "Recurring slots saved!");
      // Close popup after saving
      setShowSetSlots(false);
      setEditIdx(null);
      setCreatedSlots([]);
      setSlotDraft({
        days: [],
        start: defaultStart,
        end: defaultEnd,
        interval: 30,
        status: "active",
      });
    } catch (err) {
      setBulkSaveMsg("Failed to save recurring slots.");
    }
    setSavingBulk(false);
  }

  // --- API Integration for custom slots ---
  async function saveCustomSlotsToBackend() {
    setSavingCustom(true);
    setCustomSaveMsg("");
    try {
      for (const slot of customSlots) {
        if (slot.openClose === "open") {
          await fetch("http://localhost:5000/api/admin/slots/custom", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: slot.date,
              start: slot.start,
              end: slot.end,
              openClose: "open"
            }),
          });
        } else if (slot.openClose === "close") {
          await fetch("http://localhost:5000/api/admin/slots/custom", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: slot.date,
              openClose: "close"
            }),
          });
        }
      }
      setCustomSaveMsg("Custom slots created!");
      setCustomSlots([]); // clear after creating
    } catch (err) {
      setCustomSaveMsg("Failed to create custom slots.");
    }
    setSavingCustom(false);
  }

  // --- Fetch all custom slots from backend for popup ---
  async function fetchAllCustomSlots() {
    setIsLoadingCustomSlots(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/slots/custom");
      if (!res.ok) throw new Error("Failed to fetch custom slots");
      const data = await res.json();
      // Assume data.slots or just data is an array
      setAllCustomSlots(Array.isArray(data.slots) ? data.slots : (Array.isArray(data) ? data : []));
    } catch (err) {
      setAllCustomSlots([]);
    }
    setIsLoadingCustomSlots(false);
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
              className="bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 font-semibold transition"
              onClick={() => {
                setShowCustomSlotsPopup(true);
                fetchAllCustomSlots();
              }}
            >
              View Custom Slots
            </button>
            <button
              className="bg-[#005e6a] text-white px-6 py-2 rounded-lg shadow hover:bg-[#077e8d] font-semibold transition"
              onClick={() => {
                setShowSetSlots(true);
                setEditIdx(null);
                setCreatedSlots([]);
                setSlotDraft({
                  days: [],
                  start: defaultStart,
                  end: defaultEnd,
                  interval: 30,
                  status: "active",
                });
                setBulkSaveMsg("");
              }}
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
                    className={`px-3 py-1 rounded font-semibold text-xs border ${customSlotDraft.status === "active"
                      ? "bg-green-100 text-green-700 border-green-400"
                      : "bg-white text-gray-600 border-gray-300"
                      }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCustomSlotStatusChange("inactive")}
                    className={`px-3 py-1 rounded font-semibold text-xs border ${customSlotDraft.status === "inactive"
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
                  onClick={handleAddCustomSlotDraft}
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
            {/* Custom Slots Table */}
            {customSlots.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-[#005e6a] mb-2">Slots to Create</h2>
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
                              className={`inline-block px-3 py-1 rounded font-bold text-xs w-20 text-center ${slot.status === "active"
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
            {/* Create Custom Slots Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition disabled:opacity-60"
                onClick={saveCustomSlotsToBackend}
                disabled={savingCustom || customSlots.length === 0}
              >
                {savingCustom ? "Creating..." : "Create"}
              </button>
            </div>
            {/* Save Feedback */}
            {customSaveMsg && (
              <div className="mt-3 text-center font-semibold text-blue-700">{customSaveMsg}</div>
            )}
          </div>
        )}

        {/* View Custom Slots Popup */}
        {showCustomSlotsPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-[#bfe7ef]">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
                onClick={() => setShowCustomSlotsPopup(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-[#005e6a] mb-4 text-center">All Custom Slots</h2>
              {isLoadingCustomSlots ? (
                <div className="text-center text-gray-500 py-12">Loading...</div>
              ) : allCustomSlots.length === 0 ? (
                <div className="text-center text-gray-500 py-12">No custom slots created yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-[600px] w-full border border-[#bfe7ef] rounded-xl shadow text-sm bg-white">
                    <thead>
                      <tr className="bg-[#f5fafd] text-[#005e6a]">
                        <th className="p-3 border border-[#c5e7ef] text-left">Date</th>
                        <th className="p-3 border border-[#c5e7ef] text-left">Open/Close</th>
                        <th className="p-3 border border-[#c5e7ef] text-left">Start</th>
                        <th className="p-3 border border-[#c5e7ef] text-left">End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCustomSlots.map((slot, idx) => (
                        <tr key={idx} className="border-b border-[#e0f2f7]">
                          <td className="p-3 border border-[#e0f2f7]">{slot.date}</td>
                          <td className="p-3 border border-[#e0f2f7] capitalize">{slot.openClose}</td>
                          <td className="p-3 border border-[#e0f2f7]">{slot.start || "-"}</td>
                          <td className="p-3 border border-[#e0f2f7]">{slot.end || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                  <td className="p-3 border border-[#e0f2f7] font-bold text-[#005e6a] text-lg whitespace-nowrap">
                    {slot.name}
                  </td>
                  <td className="p-3 border border-[#e0f2f7] text-base">
                    {slot.status === "weekly-off" ? (
                      <span className="text-gray-400 font-semibold">-</span>
                    ) : (
                      slot.start
                    )}
                  </td>
                  <td className="p-3 border border-[#e0f2f7] text-base">
                    {slot.status === "weekly-off" ? (
                      <span className="text-gray-400 font-semibold">-</span>
                    ) : (
                      slot.end
                    )}
                  </td>
                  <td className="p-3 border border-[#e0f2f7] text-base">
                    {slot.status === "weekly-off" ? (
                      <span className="text-gray-400 font-semibold">-</span>
                    ) : (
                      `${slot.interval} min`
                    )}
                  </td>
                  <td className="p-3 border border-[#e0f2f7] text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded font-bold text-xs w-24 text-center ${slot.status === "active"
                        ? "bg-green-100 text-green-700"
                        : slot.status === "inactive"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {slot.status === "active"
                        ? "Active"
                        : slot.status === "inactive"
                          ? "Inactive"
                          : "Weekly Off"}
                    </span>
                  </td>
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

      {/* Confirm Delete Day Modal */}
      {showDeleteDayConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-[#bfe7ef] text-center">
            <h2 className="text-xl font-bold text-red-700 mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Do you really want to delete all slots for{" "}
              <span className="font-bold text-[#005e6a]">
                {pendingDeleteDayIdx !== null && daySlots[pendingDeleteDayIdx].name}
              </span>
              ?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmDeleteDay}
                className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700"
              >
                Yes, Delete All
              </button>
              <button
                onClick={cancelDeleteDay}
                className="bg-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteDayMsg && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 text-lg font-semibold transition">
          {deleteDayMsg}
        </div>
      )}
      {/* Set Slots Bulk Modal */}
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
                  start: defaultStart,
                  end: defaultEnd,
                  interval: 30,
                  status: "active",
                });
                setBulkSaveMsg("");
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
                        isUsed = d.key !== daySlots[editIdx].day;
                      } else {
                        isUsed = disabledDays.includes(d.key);
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
                {slotDraft.status !== "weekly-off" && (
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
                )}
                {/* Slot interval */}
                {slotDraft.status !== "weekly-off" && (
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
                )}
                {/* Status */}
                <div className="flex flex-col mt-3">
                  <label className="font-semibold text-[#005e6a] mb-1">Status</label>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => handleSlotStatusChange("active")}
                      className={`px-3 py-1 rounded font-semibold text-xs border ${slotDraft.status === "active"
                        ? "bg-green-100 text-green-700 border-green-400"
                        : "bg-white text-gray-600 border-gray-300"
                        }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSlotStatusChange("weekly-off")}
                      className={`px-3 py-1 rounded font-semibold text-xs border ${slotDraft.status === "weekly-off"
                        ? "bg-gray-200 text-gray-700 border-gray-400"
                        : "bg-white text-gray-600 border-gray-300"
                        }`}
                    >
                      Weekly Off
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCreateSlot}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition disabled:opacity-60"
                    disabled={
                      slotDraft.days.length === 0 ||
                      (slotDraft.status !== "weekly-off" &&
                        (!slotDraft.start ||
                          !slotDraft.end ||
                          slotDraft.start >= slotDraft.end))
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            {/* Render Created Recurring Slots */}
            {createdSlots.length > 0 && (
              <div className="mb-4">
                {createdSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow border border-[#bfe7ef] p-5 flex flex-col gap-2 relative mb-2"
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
                      {slot.status === "weekly-off" ? (
                        <span className="text-gray-600 font-semibold">Weekly Off</span>
                      ) : (
                        <>
                          <span className="font-bold text-[#005e6a]">Start:</span> {slot.start}
                          &nbsp;&nbsp;
                          <span className="font-bold text-[#005e6a]">End:</span> {slot.end}
                          &nbsp;&nbsp;
                          <span className="font-bold text-[#005e6a]">Interval:</span> {slot.interval} min
                          &nbsp;&nbsp;
                          <span className="font-bold text-[#005e6a]">Status:</span> {slot.status}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Save Recurring Slots Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 font-semibold transition"
                onClick={() => setShowBulkSaveConfirm(true)}
                disabled={savingBulk}
              >
                {savingBulk ? "Saving..." : "Save Recurring Slots"}
              </button>
            </div>
            {/* Save Feedback */}
            {bulkSaveMsg && (
              <div className="mt-3 text-center font-semibold text-blue-700">{bulkSaveMsg}</div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Save Recurring Slots Modal */}
      {showBulkSaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-[#bfe7ef] text-center">
            <h2 className="text-xl font-bold text-[#005e6a] mb-4">Please Wait</h2>
            <p className="mb-6">
              Your slots will be created shortly.<br />
              Do you want to continue?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={saveRecurringSlotsToBackend}
                className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800"
              >
                Yes, Create Slots
              </button>
              <button
                onClick={() => setShowBulkSaveConfirm(false)}
                className="bg-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
