// import { useState } from "react";

// export default function CalendarPicker({ onDateSelect, selectedDate }) {
//   const [currentMonth, setCurrentMonth] = useState(() => {
//     const today = new Date();
//     return new Date(today.getFullYear(), today.getMonth(), 1);
//   });

//   const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

//   const handlePrevMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
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

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-2">
//         <button onClick={handlePrevMonth} className="p-1 px-2 rounded hover:bg-gray-200">&lt;</button>
//         <span className="font-semibold">
//           {currentMonth.toLocaleString("default", { month: "long" })} {year}
//         </span>
//         <button onClick={handleNextMonth} className="p-1 px-2 rounded hover:bg-gray-200">&gt;</button>
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
//               className={`py-2 rounded ${
//                 selectedDate &&
//                 date.toDateString() === selectedDate.toDateString()
//                   ? "bg-blue-600 text-white"
//                   : isPast(date)
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "hover:bg-blue-100"
//               }`}
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
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="p-1 px-2 rounded hover:bg-gray-200">
          &lt;
        </button>
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button onClick={handleNextMonth} className="p-1 px-2 rounded hover:bg-gray-200">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((date, idx) =>
          date ? (
            <button
              key={idx}
              disabled={isPast(date)}
              onClick={() => onDateSelect(date)}
              className={`py-2 rounded 
                ${
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                    ? "bg-blue-600 text-white"
                    : isPast(date)
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : highlightedDates.includes(formatDate(date))
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "hover:bg-blue-100"
                }
              `}
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