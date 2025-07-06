// import { useState } from "react";

// export default function CalendarPicker({
//   onDateSelect,
//   selectedDate,
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
//   const formatDate = (date) => date.toISOString().slice(0, 10);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <button onClick={handlePrevMonth} className="p-1 px-2 rounded hover:bg-gray-200">
//           &lt;
//         </button>
//         <span className="font-semibold">
//           {currentMonth.toLocaleString("default", { month: "long" })} {year}
//         </span>
//         <button onClick={handleNextMonth} className="p-1 px-2 rounded hover:bg-gray-200">
//           &gt;
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center text-sm mb-1">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//           <div key={d} className="font-medium">{d}</div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center">
//         {days.map((date, idx) =>
//           date ? (
//             <button
//               key={idx}
//               disabled={isPast(date)}
//               onClick={() => onDateSelect(date)}
//               className={`py-2 rounded 
//                 ${
//                   selectedDate &&
//                   date.toDateString() === selectedDate.toDateString()
//                     ? "bg-blue-600 text-white"
//                     : isPast(date)
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : highlightedDates.includes(formatDate(date))
//                     ? "bg-green-500 text-white hover:bg-green-600"
//                     : "hover:bg-blue-100"
//                 }
//               `}
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

export default function CalendarPicker({
  onDateSelect,
  selectedDate,
  highlightedDates = [],
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

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
  const formatDate = (date) => date.toISOString().slice(0, 10);

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
              onClick={() => onDateSelect(date)}
              className={[
                "py-2 rounded-lg font-bold transition-all duration-200 shadow-sm outline-none focus:ring-2 focus:ring-fuchsia-400",
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white scale-110 shadow-lg border-2 border-fuchsia-200 animate-bounce-in"
                  : isPast(date)
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : highlightedDates.includes(formatDate(date))
                  ? "bg-gradient-to-r from-green-400 to-yellow-300 text-white hover:from-green-500 hover:to-yellow-400 border-2 border-green-300 shadow-md animate-pulse"
                  : "hover:bg-blue-100 hover:scale-105 bg-white/70 text-blue-700"
              ].join(" ")}
              aria-label={date.toDateString()}
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