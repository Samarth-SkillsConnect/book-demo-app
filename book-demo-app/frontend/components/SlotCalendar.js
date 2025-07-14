import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function SlotCalendar() {
  const [slots, setSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch dates from demo_slots table created by this admin (using JWT)
    const token = localStorage.getItem("adminToken");
    fetch("http://localhost:5000/api/admin/slots", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSlots(data);
        // Only dates from today onward, remove past dates
        const todayStr = new Date().toISOString().slice(0, 10);
        const dates = new Set(
          data
            .map(slot => slot.date)
            .filter(date => date >= todayStr)
        );
        setAvailableDates(dates);
      });
  }, []);

  // Disable tiles for dates without slots or in the past
  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) return true;
    const dateStr = date.toISOString().slice(0,10);
    return !availableDates.has(dateStr);
  }

  // Optionally, highlight available days
  function tileClassName({ date, view }) {
    if (view !== "month") return "";
    const dateStr = date.toISOString().slice(0,10);
    if (availableDates.has(dateStr)) {
      return "calendar-available";
    }
    return "";
  }

  // Only allow selection from today onward
  const minDate = new Date();
  minDate.setHours(0,0,0,0);

  // Hide previous months and disallow navigation to months before today
  function handleActiveStartDateChange({ activeStartDate }) {
    if (activeStartDate < minDate) {
      // force to current month
      setSelectedDate(minDate);
    }
  }

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={minDate}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        onActiveStartDateChange={handleActiveStartDateChange}
        // This disables navigation to previous months in react-calendar
        prevLabel={null}
        prev2Label={null}
      />
      <style jsx>{`
        .calendar-available {
          background: #e8fff1;
          border-radius: 50%;
        }
      `}</style>
      {selectedDate && (
        <div className="mt-4">
          <h3>Slots for {selectedDate.toISOString().slice(0,10)}</h3>
          <ul>
            {slots
              .filter(slot => slot.date === selectedDate.toISOString().slice(0,10))
              .map(slot => (
                <li key={slot.id}>
                  {slot.start_time} - {slot.end_time}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}