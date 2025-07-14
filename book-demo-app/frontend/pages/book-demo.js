import { useState, useEffect } from "react";
import CalendarPicker from "../components/CalendarPicker";
import SlotSelector from "../components/SlotSelector";
import DemoRegistrationForm from "../components/DemoRegistrationForm";
import SuccessModal from "../components/SuccessModal";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
      const res = await fetch(`${API_BASE_URL}/api/book-demo${testMode ? "?test=true" : ""}`, {
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

  return (
    <main className="w-full min-h-screen flex flex-col overflow-x-hidden font-sans">
      {/* ------------------------------------------------------------------ */}
      <section className=" flex-1 flex items-center justify-center w-full px-2 py-6 min-h-screen bg-gradient-to-br from-[#f6fcfa] to-[#eff6fb]">
        <div className="w-full lg:w-[80%]  bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
          {/* Left Panel: Company Info */}
          <div className="w-full lg:w-[30%] flex flex-col items-center md:items-start px-6 py-8 md:py-10 border-b md:border-b-0 md:border-r border-gray-200 min-h-[400px]">
            <div className="w-full flex flex-col items-center md:items-start">
              {/* Company Logo / Info */}
              <img className="w-40" src="https://skillsconnect.blob.core.windows.net/skillsconnect/assets/frontend/images/logo/skillsconnect-logo-n.svg" alt="SkillsConnect Logo" />
              {/* <CompanyInfo /> */}

              {/* Book Demo Title & Info */}
              <div className="w-full mt-6">
                <h1 className="text-center lg:text-left text-3xl font-bold text-[#0a2342] mb-4">Book Demo</h1>
                <div className="flex items-center gap-2 mb-2"></div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="#64748b" strokeWidth="1.5" />
                    <path d="M3 8h14" stroke="#64748b" strokeWidth="1.5" />
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#64748b" />
                  </svg>
                  <span className="text-gray-500 text-[15px] font-semibold">Web conferencing details provided upon confirmation.</span>
                </div>
              
                <div className="text-gray-700 text-[15px] mb-2">
                  Ready to see how our platform can help your team to do campus hiring more effectively? Schedule a demo in the form below.
                </div>
                <div className="text-gray-700 text-[15px]">
                  Ready to see how our platform can help your organization to do campus hiring more effectively? Schedule a demo in the form.
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Calendar, Slot Selection, or Registration Form */}

          <div className="w-full lg:w-[70%] mx-auto">


            <div className="flex flex-col px-4 sm:px-8 py-8 md:py-10 relative">

              {showForm && selectedSlot ? (

                // Show registration form inline instead of calendar/slot selector
                <div className="w-full">

                  <DemoRegistrationForm
                    slot={selectedSlot}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              ) : (
                <>
                  {/* Right Panel: Calendar and Slot Selection */}
                

                    <h2 className="text-xl md:text-2xl font-bold pb-4 text-[#0a2342] text-center">Select a Date &amp; Time</h2>
                    <div className="flex flex-col md:flex-row gap-3">
                      {/* Calendar */}
                      <div className="w-full lg:w-[60%] mx-auto flex justify-center">
                        <CalendarPicker
                          onDateSelect={handleDateSelect}
                          selectedDate={selectedDate}
                          highlightedDates={highlightedDates}
                        />
                      </div>

                      {selectedDate && (
                        <section className="w-full lg:w-[30%] flex flex-col items-center max-h-[400px] shadow md:shadow-none rounded-l-2xl md:rounded-none p-5 md:p-0">
                          <h1 className="text-center text-sm pt-2  text-[#0a2342]">
                            Choose an available time slot
                            <span className="block mb-2">
                              {(() => {
                                const [yyyy, mm, dd] = selectedDate.split("-");
                                return <span className="text-xs text-gray-500">Selected Date: {`${dd}-${mm}-${yyyy}`}</span>;
                              })()}
                            </span>
                          </h1>
                          <div className="overflow-auto w-[200px]">
                            <SlotSelector
                              slots={slots}
                              onSlotSelect={handleSlotSelect}
                              selectedSlot={selectedSlot}
                              loading={selectedDate && slots === null}
                            />
                          </div>
                        </section>
                      )}
                    </div>
                  


                  {/* ------------------------------------------------------- */}

                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------------------- */}

      {/* Error message */}
      {error && (
        <footer className="mt-3 text-red-600 text-center font-semibold z-10 px-2">{error}</footer>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          data={successData}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  );
}