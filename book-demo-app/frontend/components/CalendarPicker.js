// import { useState } from "react";

// // Helper for zero-padding
// const pad = (n) => n.toString().padStart(2, "0");

// // Format a Date to YYYY-MM-DD (local, not UTC)
// function formatLocalDate(date) {
//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
// }

// // Convert "YYYY-MM-DD" string to local Date object (never use new Date("YYYY-MM-DD"))
// export function ymdToLocalDate(ymd) {
//   if (!ymd) return null;
//   const [y, m, d] = ymd.split('-');
//   return new Date(+y, +m - 1, +d);
// }

// export default function CalendarPicker({
//   onDateSelect,
//   selectedDate, // "YYYY-MM-DD" string
//   highlightedDates = [],
// }) {
//   const [currentMonth, setCurrentMonth] = useState(() => {
//     const today = new Date();
//     return new Date(today.getFullYear(), today.getMonth(), 1);
//   });

//   const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
//   const handlePrevMonth = () => {
//     setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//   };
//   const handleNextMonth = () => {
//     setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
//   };

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const year = currentMonth.getFullYear();
//   const month = currentMonth.getMonth();
//   const days = [];
//   const firstDay = new Date(year, month, 1).getDay();
//   const totalDays = daysInMonth(month, year);

//   for (let i = 0; i < firstDay; i++) days.push(null);
//   for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));

//   const isPast = (date) => date < today;

//   // selectedDate is always "YYYY-MM-DD"
//   return (
//     <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-yellow-50 rounded-2xl p-4 shadow-card border border-blue-100 animate-fade-in-up">
//       <div className="flex justify-between items-center mb-3">
//         <button
//           onClick={handlePrevMonth}
//           className="p-2 rounded-full bg-gradient-to-tr from-fuchsia-200 to-blue-200 hover:from-blue-300 hover:to-fuchsia-300 shadow transition-all active:scale-90 animate-bounce-in"
//           aria-label="Previous month"
//         >
//           <span className="text-xl text-blue-700">&lt;</span>
//         </button>
//         <span className="font-semibold text-lg sm:text-xl text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-500 bg-clip-text drop-shadow animate-fade-in">
//           {currentMonth.toLocaleString("default", { month: "long" })} {year}
//         </span>
//         <button
//           onClick={handleNextMonth}
//           className="p-2 rounded-full bg-gradient-to-tr from-yellow-200 to-blue-200 hover:from-blue-300 hover:to-yellow-200 shadow transition-all active:scale-90 animate-bounce-in"
//           aria-label="Next month"
//         >
//           <span className="text-xl text-yellow-600">&gt;</span>
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm mb-1 animate-fade-in delay-100">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//           <div
//             key={d}
//             className="font-semibold text-blue-600 bg-white/70 px-1 py-1 rounded"
//           >
//             {d}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center animate-fade-in-up delay-150">
//         {days.map((date, idx) =>
//           date ? (
//             <button
//               key={idx}
//               disabled={isPast(date)}
//               onClick={() => onDateSelect(formatLocalDate(date))}
//               className={[
//                 "py-2 rounded-lg font-bold transition-all duration-200 shadow-sm outline-none focus:ring-2 focus:ring-fuchsia-400",
//                 selectedDate &&
//                 formatLocalDate(date) === selectedDate
//                   ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white scale-110 shadow-lg border-2 border-fuchsia-200 animate-bounce-in"
//                   : isPast(date)
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : highlightedDates.includes(formatLocalDate(date))
//                   ? "bg-gradient-to-r from-green-400 to-yellow-300 text-white hover:from-green-500 hover:to-yellow-400 border-2 border-green-300 shadow-md animate-pulse"
//                   : "hover:bg-blue-100 hover:scale-105 bg-white/70 text-blue-700"
//               ].join(" ")}
//               aria-label={formatLocalDate(date)}
//             >
//               {date.getDate()}
//             </button>
//           ) : (
//             <div key={idx}></div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }





import { useState } from "react";

// Helper for zero-padding
const pad = (n) => n.toString().padStart(2, "0");

// Format a Date to YYYY-MM-DD (local, not UTC)
export function formatLocalDate(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Convert "YYYY-MM-DD" string to local Date object (never use new Date("YYYY-MM-DD"))
export function ymdToLocalDate(ymd) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split('-');
  return new Date(+y, +m - 1, +d);
}

export default function CalendarPicker({
  onDateSelect,
  selectedDate, // "YYYY-MM-DD" string
  highlightedDates = [],
}) {
  // Initialize to selectedDate's month if present, otherwise today
  const initialMonth = selectedDate ? ymdToLocalDate(selectedDate) : new Date();
  const [currentMonth, setCurrentMonth] = useState(() =>
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(month, year);

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));

  const isPast = (date) => date < today;

  // selectedDate is always "YYYY-MM-DD"
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-yellow-50 rounded-2xl p-4 shadow-card border border-blue-100 animate-fade-in-up">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full bg-gradient-to-tr from-fuchsia-200 to-blue-200 hover:from-blue-300 hover:to-fuchsia-300 shadow transition-all active:scale-90 animate-bounce-in"
          aria-label="Previous month"
        >
          <span className="text-xl text-blue-700">&lt;</span>
        </button>
        <span className="font-semibold text-lg sm:text-xl text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-500 bg-clip-text drop-shadow animate-fade-in">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full bg-gradient-to-tr from-yellow-200 to-blue-200 hover:from-blue-300 hover:to-yellow-200 shadow transition-all active:scale-90 animate-bounce-in"
          aria-label="Next month"
        >
          <span className="text-xl text-yellow-600">&gt;</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm mb-1 animate-fade-in delay-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="font-semibold text-blue-600 bg-white/70 px-1 py-1 rounded"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center animate-fade-in-up delay-150">
        {days.map((date, idx) =>
          date ? (
            <button
              key={idx}
              disabled={isPast(date)}
              onClick={() => onDateSelect(formatLocalDate(date))}
              className={[
                "py-2 rounded-lg font-bold transition-all duration-200 shadow-sm outline-none focus:ring-2 focus:ring-fuchsia-400",
                selectedDate &&
                formatLocalDate(date) === selectedDate
                  ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white scale-110 shadow-lg border-2 border-fuchsia-200 animate-bounce-in"
                  : isPast(date)
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : highlightedDates.includes(formatLocalDate(date))
                  ? "bg-gradient-to-r from-green-400 to-yellow-300 text-white hover:from-green-500 hover:to-yellow-400 border-2 border-green-300 shadow-md animate-pulse"
                  : "hover:bg-blue-100 hover:scale-105 bg-white/70 text-blue-700"
              ].join(" ")}
              aria-label={formatLocalDate(date)}
            >
              {date.getDate()}
            </button>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  );
}