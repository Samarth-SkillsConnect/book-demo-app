import { useState, useEffect } from "react";
import CompanyInfo from "../components/CompanyInfo";
import CalendarPicker from "../components/CalendarPicker";
import SlotSelector from "../components/SlotSelector";
import DemoRegistrationForm from "../components/DemoRegistrationForm";
import SuccessModal from "../components/SuccessModal";

const API_BASE_URL = "http://localhost:5000/api";

export default function BookDemoPage() {
  const [selectedDate, setSelectedDate] = useState(null); // now a string: 'YYYY-MM-DD'
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
  const handleDateSelect = async (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setShowForm(false);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/demo-slots?date=${dateStr}`);
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
    window.location.href = "/admin";
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-yellow-100 flex items-center justify-center overflow-auto font-sans">
      <div className="relative bg-white/90 backdrop-blur-md shadow-2xl w-[99vw] h-[99vh] max-w-3xl max-h-[900px] px-2 sm:px-6 py-3 sm:py-10 rounded-3xl flex flex-col items-center border-2 border-gradient-to-r from-blue-300 via-pink-200 to-yellow-200 animate-fade-in-up transition-all duration-700 mx-auto my-auto overflow-y-auto">
        
        {/* Animated Glitter Border */}
        <div className="absolute inset-0 pointer-events-none z-0 rounded-3xl border-4 border-transparent" style={{boxShadow:"0 0 40px 3px #a78bfa55, 0 0 0 8px #fef3c755 inset"}}>
          {/* shimmer/shine effect with CSS */}
        </div>
        
        {/* ADMIN BUTTON */}
        <button
          onClick={handleAdminClick}
          className="absolute top-5 right-6 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 text-white px-5 py-2 rounded-full shadow-md text-sm font-bold z-20 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in"
        >
          Admin
        </button>

        {/* Company Logo with Animation */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-fuchsia-400 to-yellow-400 flex items-center justify-center mb-8 shadow-lg animate-bounce-in z-10 border-4 border-white/80">
          <span className="text-white text-4xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
        </div>
        <CompanyInfo />

        <div className="mt-5 sm:mt-8 w-full animate-fade-in delay-100 z-10">
          <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">Select a date for your demo</h2>
          <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-left">
            <CalendarPicker
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              highlightedDates={highlightedDates}
            />
          </div>
        </div>
        {selectedDate && (
          <div className="mt-6 sm:mt-8 w-full animate-fade-in-up delay-200 z-10">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">Choose an available time slot</h2>
            <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-right">
              <SlotSelector
                slots={slots}
                onSlotSelect={handleSlotSelect}
                selectedSlot={selectedSlot}
                loading={selectedDate && slots === null}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="mt-6 text-red-600 text-center font-semibold animate-fade-in z-10">{error}</div>
        )}
      </div>
      {/* Modal overlays */}
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
      {/* Custom global styles for smooth fit */}
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          min-height: 0;
        }
        /* Subtle shimmer animation for the glitter border effect */
        .border-gradient-to-r {
          background: linear-gradient(90deg, #60a5fa44, #a78bfa44, #fef3c744);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}