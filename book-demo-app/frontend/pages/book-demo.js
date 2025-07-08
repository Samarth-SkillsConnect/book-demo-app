
import { useState, useEffect } from "react";
import CompanyInfo from "../components/CompanyInfo";
import CalendarPicker from "../components/CalendarPicker";
import SlotSelector from "../components/SlotSelector";
import DemoRegistrationForm from "../components/DemoRegistrationForm";
import SuccessModal from "../components/SuccessModal";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://book-demo-app-1.onrender.com/api";

export default function BookDemoPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/demo-slots/available-dates`)
      .then((res) => res.json())
      .then(setHighlightedDates)
      .catch(() => setHighlightedDates([]));
  }, []);

  const handleDateSelect = async (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setShowForm(false);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/demo-slots?date=${dateStr}`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      let data = await res.json();

      data = data.map(slot => ({
        ...slot,
        date: slot.date ? slot.date.split("T")[0] : slot.date
      }));
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

  const handleAdminClick = () => {
    window.location.href = "/admin";
  };

  const themeColor = "#005e6a";

  return (
    <main
      className="w-full min-h-screen flex flex-col overflow-x-hidden font-sans"
      style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #f4f8fa 100%)` }}
    >
      {/* Responsive Top bar */}
      <header className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 py-4 bg-white/80 shadow-md backdrop-blur-sm z-10">
        <section className="flex items-center gap-4">
          <nav className="hidden sm:block">
            <CompanyInfo />
          </nav>
        </section>
        <button
          onClick={handleAdminClick}
          className="bg-gradient-to-r from-[#005e6a] to-[#3ecbdb] text-white px-4 sm:px-5 py-2 rounded-full shadow-md text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-700"
        >
          Admin
        </button>
      </header>
      <section className="sm:hidden px-4 pb-2 pt-2 bg-white/80 w-full">
        <CompanyInfo />
      </section>
      {/* Main booking area */}
      <section className="flex-1 flex items-center justify-center w-full max-w-full">
        {!selectedDate ? (
          <section className="flex flex-col items-center justify-center w-full h-full px-2 py-4">
            <section
              className="bg-white rounded-2xl shadow-2xl py-6 px-2 xs:px-2 sm:px-8 w-full max-w-xs xs:max-w-sm sm:max-w-md flex flex-col items-center border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              <h2
                className="text-base xs:text-lg sm:text-xl font-bold mb-2 text-center"
                style={{
                  color: themeColor,
                  letterSpacing: '0.01em',
                }}
              >
                Select a date for your demo
              </h2>
              <CalendarPicker
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                highlightedDates={highlightedDates}
              />
            </section>
          </section>
        ) : (
          <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-8 min-h-[400px] max-h-[100vh] px-2 py-4">
            {/* Calendar */}
            <section
              className="flex flex-col items-center bg-white rounded-2xl shadow-2xl py-6 px-2 sm:px-6 w-full max-w-xs xs:max-w-sm sm:max-w-md z-10 border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              <h2
                className="text-base xs:text-lg sm:text-xl font-bold mb-2 text-center"
                style={{
                  color: themeColor,
                  letterSpacing: '0.01em',
                }}
              >
                Select a date for your demo
              </h2>
              <CalendarPicker
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                highlightedDates={highlightedDates}
              />
            </section>
            {/* Slot selector card */}
            <section
              className="flex flex-col items-center bg-white rounded-2xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md h-auto md:h-[430px] mt-6 md:mt-0 border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              <header className="sticky top-0 z-20 bg-white w-full pt-6 pb-2 rounded-t-2xl border-b" style={{ borderColor: themeColor }}>
                <h2
                  className="text-base xs:text-lg sm:text-xl font-bold text-center"
                  style={{
                    color: themeColor,
                    letterSpacing: '0.01em',
                  }}
                >
                  Choose an available time slot:
                  <span style={{ display: "block", fontSize: "0.8em", color: "#888", marginTop: 4 }}>
                    {selectedDate && (() => {
                      const [yyyy, mm, dd] = selectedDate.split("-");
                      return <> [Selected Date: <b>{`${dd}-${mm}-${yyyy}`}</b>]</>
                    })()}
                  </span>
                </h2>
              </header>
              <section className="flex-1 w-full overflow-y-auto px-2 sm:px-5 pb-4" style={{ maxHeight: "280px" }}>
                <SlotSelector
                  slots={slots}
                  onSlotSelect={handleSlotSelect}
                  selectedSlot={selectedSlot}
                  loading={selectedDate && slots === null}
                />
              </section>
            </section>
          </section>
        )}
      </section>
      {/* Error message */}
      {error && (
        <footer className="mt-3 text-red-600 text-center font-semibold z-10 px-2">{error}</footer>
      )}
      {/* Modals */}
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
      <style jsx global>{`
        html, body, #__next {
          min-height: 100%;
          height: 100%;
        }
        body {
          overscroll-behavior: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          background: #e4efef;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #005e6a;
          border-radius: 4px;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #005e6a #e4efef;
        }
        @media (max-width: 640px) {
          .max-w-xs {
            max-width: 98vw !important;
          }
        }
        @media (max-width: 480px) {
          .max-w-xs, .max-w-sm, .max-w-md {
            max-width: 99vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .py-6, .py-8 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          .rounded-2xl {
            border-radius: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}