// import { useState, useEffect } from "react";
// import CompanyInfo from "../components/CompanyInfo";
// import CalendarPicker from "../components/CalendarPicker";
// import SlotSelector from "../components/SlotSelector";
// import DemoRegistrationForm from "../components/DemoRegistrationForm";
// import SuccessModal from "../components/SuccessModal";

// const API_BASE_URL = "http://localhost:5000/api";

// export default function BookDemoPage() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successData, setSuccessData] = useState(null);
//   const [error, setError] = useState(null);
//   const [highlightedDates, setHighlightedDates] = useState([]); // <-- NEW STATE

//   // Fetch available dates for highlighting
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/demo-slots/available-dates`)
//       .then((res) => res.json())
//       .then(setHighlightedDates)
//       .catch(() => setHighlightedDates([]));
//   }, []);

//   // Fetch slots when date changes
//   const handleDateSelect = async (date) => {
//     setSelectedDate(date);
//     setSelectedSlot(null);
//     setShowForm(false);
//     setError(null);

//     try {
//       const res = await fetch(`${API_BASE_URL}/demo-slots?date=${date.toISOString().slice(0, 10)}`);
//       if (!res.ok) throw new Error("Failed to fetch slots");
//       const data = await res.json();
//       setSlots(data);
//     } catch (err) {
//       setSlots([]);
//       setError("Could not load slots. Please try another date.");
//     }
//   };

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     setShowForm(true);
//     setError(null);
//   };

//   const handleFormSubmit = async (formData, testMode = false) => {
//     setError(null);
//     try {
//       const res = await fetch(`${API_BASE_URL}/book-demo${testMode ? "?test=true" : ""}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           slot_id: selectedSlot.id,
//           first_name: formData.first_name,
//           last_name: formData.last_name,
//           company_name: formData.company_name,
//           mobile_number: formData.mobile_number,
//           email: formData.email,
//           description: formData.description,
//           guests: formData.guests,
//         }),
//       });
//       const result = await res.json();

//       if (!res.ok) {
//         setError(result.message || "Booking failed. Please try again.");
//         return false;
//       }

//       setShowForm(false);
//       setShowSuccess(true);
//       setSuccessData({
//         ...formData,
//         date: selectedSlot.date,
//         start_time: selectedSlot.start_time,
//         end_time: selectedSlot.end_time,
//         guests: formData.guests
//           ? formData.guests.split(",").map((g) => g.trim()).filter(Boolean)
//           : [],
//       });
//       setSlots(slots.filter((s) => s.id !== selectedSlot.id));
//       setSelectedSlot(null);
//       return true;
//     } catch (err) {
//       setError("Server error. Please try again.");
//       return false;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-2">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
//         <CompanyInfo />
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-2">Select a date for your demo:</h2>
//           <CalendarPicker
//             onDateSelect={handleDateSelect}
//             selectedDate={selectedDate}
//             highlightedDates={highlightedDates} // <-- Pass as prop
//           />
//         </div>
//         {selectedDate && (
//           <div className="mt-8">
//             <h2 className="text-xl font-bold mb-2">Choose an available time slot:</h2>
//             <SlotSelector
//               slots={slots}
//               onSlotSelect={handleSlotSelect}
//               selectedSlot={selectedSlot}
//               loading={selectedDate && slots === null}
//             />
//           </div>
//         )}
//         {error && (
//           <div className="mt-6 text-red-600 text-center font-semibold">{error}</div>
//         )}
//       </div>
//       {showForm && selectedSlot && (
//         <DemoRegistrationForm
//           slot={selectedSlot}
//           onClose={() => setShowForm(false)}
//           onSubmit={handleFormSubmit}
//         />
//       )}
//       {showSuccess && (
//         <SuccessModal
//           data={successData}
//           onClose={() => setShowSuccess(false)}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import CompanyInfo from "../components/CompanyInfo";
import CalendarPicker from "../components/CalendarPicker";
import SlotSelector from "../components/SlotSelector";
import DemoRegistrationForm from "../components/DemoRegistrationForm";
import SuccessModal from "../components/SuccessModal";

const API_BASE_URL = "http://localhost:5000/api";

export default function BookDemoPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);

  // Fetch available dates for highlighting
  useEffect(() => {
    fetch(`${API_BASE_URL}/demo-slots/available-dates`)
      .then((res) => res.json())
      .then(setHighlightedDates)
      .catch(() => setHighlightedDates([]));
  }, []);

  // Fetch slots when date changes
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setShowForm(false);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/demo-slots?date=${date.toISOString().slice(0, 10)}`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      setSlots([]);
      setError("Could not load slots. Please try another date.");
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowForm(true);
    setError(null);
  };

  const handleFormSubmit = async (formData, testMode = false) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/book-demo${testMode ? "?test=true" : ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_id: selectedSlot.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: formData.company_name,
          mobile_number: formData.mobile_number,
          email: formData.email,
          description: formData.description,
          guests: formData.guests,
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Booking failed. Please try again.");
        return false;
      }

      setShowForm(false);
      setShowSuccess(true);
      setSuccessData({
        ...formData,
        date: selectedSlot.date,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        guests: formData.guests
          ? formData.guests.split(",").map((g) => g.trim()).filter(Boolean)
          : [],
      });
      setSlots(slots.filter((s) => s.id !== selectedSlot.id));
      setSelectedSlot(null);
      return true;
    } catch (err) {
      setError("Server error. Please try again.");
      return false;
    }
  };

  // --- ADMIN BUTTON ---
  const handleAdminClick = () => {
    // Navigate to admin page (adjust route as needed)
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow relative">
        {/* Admin Button */}
        <button
          onClick={handleAdminClick}
          className="absolute top-4 right-4 bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-900 text-sm font-semibold shadow-md z-10"
        >
          Admin
        </button>
        <CompanyInfo />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Select a date for your demo:</h2>
          <CalendarPicker
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            highlightedDates={highlightedDates}
          />
        </div>
        {selectedDate && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Choose an available time slot:</h2>
            <SlotSelector
              slots={slots}
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
              loading={selectedDate && slots === null}
            />
          </div>
        )}
        {error && (
          <div className="mt-6 text-red-600 text-center font-semibold">{error}</div>
        )}
      </div>
      {showForm && selectedSlot && (
        <DemoRegistrationForm
          slot={selectedSlot}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {showSuccess && (
        <SuccessModal
          data={successData}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}