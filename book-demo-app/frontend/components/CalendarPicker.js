
import { useState } from "react";

const pad = (n) => n.toString().padStart(2, "0");


export function formatLocalDate(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function ymdToLocalDate(ymd) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split('-');
  return new Date(+y, +m - 1, +d);
}

export default function CalendarPicker({
  onDateSelect,
  selectedDate, 
  highlightedDates = [],
}) {

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

  const themePrimary = "var(--theme-primary)";

  return (
    <section
      className="w-full max-w-md mx-auto rounded-xl p-4 shadow-card border animate-fade-in-up"
     
    >
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-2 h-10 w-10 flex justify-center  items-center rounded-full bg-[color:var(--theme-bg-light)] hover:bg-[color:var(--theme-primary-light)] "
          style={{ borderColor: themePrimary }}
          aria-label="Previous month"
        >
          <span className="text-xl" style={{ color: themePrimary }}>&lt;</span>
        </button>
        <span
          className="font-semibold text-lg sm:text-xl drop-shadow animate-fade-in"
          style={{ color: themePrimary, letterSpacing: "0.01em" }}
        >
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 h-10 w-10 flex justify-center items-center rounded-full bg-[color:var(--theme-bg-light)] hover:bg-[color:var(--theme-primary-light)] "
          style={{ borderColor: themePrimary }}
          aria-label="Next month"
        >
          <span className="text-xl" style={{ color: themePrimary }}>&gt;</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm pb-2 sm:text-sm mb-1 animate-fade-in delay-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="font-normal px-1 py-1 "
          
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center animate-fade-in-up delay-150">
        {days.map((date, idx) =>
          date ? (
            <button
              key={idx}
              disabled={isPast(date)}
              onClick={() => {
                const formatted = formatLocalDate(date);
                console.log("DEBUG CalendarPicker onDateSelect called with:", formatted);
                onDateSelect(formatted);
              }}
              className={[
                "py-2 rounded-full  h-10 lg:h-12 w-10 lg:w-12 font-normal duration-200 shadow-sm outline-none ",
                selectedDate &&
                formatLocalDate(date) === selectedDate
                  ? "bg-[color:var(--theme-primary)] text-white scale-110 shadow-lg   animate-bounce-in"
                  : isPast(date)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : highlightedDates.includes(formatLocalDate(date))
                  ? "bg-[color:var(--theme-bg-light)]  text-[#005e6a] hover:bg-[color:var(--theme-primary)] hover:text-white  shadow-md"
                  : "hover:bg-[color:var(--theme-bg-light)] hover:scale-105 bg-white/70 text-[color:var(--theme-primary)] cursor-not-allowed "
              ].join(" ")}
              style={{
                borderColor: themePrimary,
              }}
              aria-label={formatLocalDate(date)}
            >
              {date.getDate()}
            </button>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
      <div style={{ marginTop: 8, fontSize: "0.9em", color: "#888" }}>
        {/* [Debug: selectedDate = <b>{selectedDate}</b>] */}
      </div>
    </section>
  );
}