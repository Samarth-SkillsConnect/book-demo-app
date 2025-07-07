// import { useState, useEffect } from "react";
// import CompanyInfo from "../components/CompanyInfo";
// import CalendarPicker from "../components/CalendarPicker";
// import SlotSelector from "../components/SlotSelector";
// import DemoRegistrationForm from "../components/DemoRegistrationForm";
// import SuccessModal from "../components/SuccessModal";

// const API_BASE_URL = "http://localhost:5000/api";

// export default function BookDemoPage() {
//   const [selectedDate, setSelectedDate] = useState(null); // now a string: 'YYYY-MM-DD'
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successData, setSuccessData] = useState(null);
//   const [error, setError] = useState(null);
//   const [highlightedDates, setHighlightedDates] = useState([]);

//   // Fetch available dates for highlighting
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/demo-slots/available-dates`)
//       .then((res) => res.json())
//       .then(setHighlightedDates)
//       .catch(() => setHighlightedDates([]));
//   }, []);

//   // Fetch slots when date changes
//   const handleDateSelect = async (dateStr) => {
//     setSelectedDate(dateStr);
//     setSelectedSlot(null);
//     setShowForm(false);
//     setError(null);

//     try {
//       const res = await fetch(`${API_BASE_URL}/demo-slots?date=${dateStr}`);
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

//   // --- ADMIN BUTTON ---
//   const handleAdminClick = () => {
//     window.location.href = "/admin";
//   };

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-yellow-100 flex items-center justify-center overflow-auto font-sans">
//       <div className="jsx-10c5633b3ddcb1bc relative bg-white/90 backdrop-blur-md px-2 sm:px-6 py-3 sm:py-10 flex flex-col items-center from-blue-300 via-pink-200 to-yellow-200 animate-fade-in-up transition-all duration-700 mx-auto my-auto overflow-y-auto">
        
//         {/* Animated Glitter Border */}
//         <div className="absolute inset-0 pointer-events-none z-0 rounded-3xl border-4 border-transparent" style={{boxShadow:"0 0 40px 3px #a78bfa55, 0 0 0 8px #fef3c755 inset"}}>
//           {/* shimmer/shine effect with CSS */}
//         </div>
        
//         {/* ADMIN BUTTON */}
//         <button
//           onClick={handleAdminClick}
//           className="absolute top-5 right-6 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 text-white px-5 py-2 rounded-full shadow-md text-sm font-bold z-20 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in"
//         >
//           Admin
//         </button>

//         {/* Company Logo with Animation */}
//         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-fuchsia-400 to-yellow-400 flex items-center justify-center mb-8 shadow-lg animate-bounce-in z-10 border-4 border-white/80">
//           <span className="text-white text-4xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
//         </div>
//         <CompanyInfo />

//         <div className="mt-5 sm:mt-8 w-full animate-fade-in delay-100 z-10">
//           {/* <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">Select a date for your demo</h2>
//           <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-left">
//             <CalendarPicker
//               onDateSelect={handleDateSelect}
//               selectedDate={selectedDate}
//               highlightedDates={highlightedDates}
//             />
//           </div>
//         </div>
//         {selectedDate && (
//           <div className="mt-6 sm:mt-8 w-full animate-fade-in-up delay-200 z-10">
//             <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">Choose an available time slot</h2>
//             <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-right">
//               <SlotSelector
//                 slots={slots}
//                 onSlotSelect={handleSlotSelect}
//                 selectedSlot={selectedSlot}
//                 loading={selectedDate && slots === null}
//               />
//             </div>
//           </div> */}
//           <div className="flex flex-col sm:flex-row gap-8 w-full">
//   {/* Left side: Date selection */}
//   <div className="flex-1 flex flex-col items-start">
//     <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
//       Select a date for your demo
//     </h2>
//     <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-left">
//       <CalendarPicker
//         onDateSelect={handleDateSelect}
//         selectedDate={selectedDate}
//         highlightedDates={highlightedDates}
//       />
//     </div>
//   </div>

//   {/* Right side: Time slot selection, only shown if a date is selected */}
//   {selectedDate && (
//     <div className="flex-1 flex flex-col items-start animate-fade-in-up delay-200 z-10">
//       <h2 className="text-lg sm:text-2xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
//         Choose an available time slot
//       </h2>
//       <div className="rounded-xl bg-white/80 shadow-lg p-3 sm:p-5 transition-all duration-300 animate-slide-in-right w-full">
//         <SlotSelector
//           slots={slots}
//           onSlotSelect={handleSlotSelect}
//           selectedSlot={selectedSlot}
//           loading={selectedDate && slots === null}
//         />
//       </div>
//     </div>
//   )}
// </div>
//         )}
//         {error && (
//           <div className="mt-6 text-red-600 text-center font-semibold animate-fade-in z-10">{error}</div>
//         )}
//       </div>
//       {/* Modal overlays */}
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
//       {/* Custom global styles for smooth fit */}
//       <style jsx global>{`
//         html, body, #__next {
//           height: 100%;
//           min-height: 0;
//         }
//         /* Subtle shimmer animation for the glitter border effect */
//         .border-gradient-to-r {
//           background: linear-gradient(90deg, #60a5fa44, #a78bfa44, #fef3c744);
//           background-size: 300% 300%;
//           animation: shimmer 4s linear infinite;
//         }
//         @keyframes shimmer {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// }












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
//   const [highlightedDates, setHighlightedDates] = useState([]);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/demo-slots/available-dates`)
//       .then((res) => res.json())
//       .then(setHighlightedDates)
//       .catch(() => setHighlightedDates([]));
//   }, []);

//   const handleDateSelect = async (dateStr) => {
//     setSelectedDate(dateStr);
//     setSelectedSlot(null);
//     setShowForm(false);
//     setError(null);

//     try {
//       const res = await fetch(`${API_BASE_URL}/demo-slots?date=${dateStr}`);
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

//   const handleAdminClick = () => {
//     window.location.href = "/admin";
//   };

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-yellow-100 flex items-center justify-center overflow-hidden font-sans">
//       <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full h-[94vh] flex flex-col items-center justify-center px-2 sm:px-8 py-4">
//         {/* ADMIN BUTTON */}
//         <button
//           onClick={handleAdminClick}
//           className="absolute top-4 right-6 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 text-white px-5 py-2 rounded-full shadow-md text-sm font-bold z-20 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           Admin
//         </button>
//         {/* Company Logo and Info */}
//         <div className="flex flex-col items-center w-full mt-2 mb-2">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 via-fuchsia-400 to-yellow-400 flex items-center justify-center shadow-lg z-10 border-4 border-white/80 mb-3">
//             <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
//           </div>
//           <CompanyInfo />
//         </div>
//         <div className="flex-1 flex flex-col items-center justify-center w-full">
//           {!selectedDate ? (
//             // Only Calendar Centered
//             <div className="flex flex-col items-center justify-center w-full h-full">
//               <div className="bg-white/90 rounded-2xl shadow-xl py-6 px-4 sm:px-8 w-full max-w-xs flex flex-col items-center">
//                 <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
//                   Select a date for your demo
//                 </h2>
//                 <CalendarPicker
//                   onDateSelect={handleDateSelect}
//                   selectedDate={selectedDate}
//                   highlightedDates={highlightedDates}
//                 />
//               </div>
//             </div>
//           ) : (
//             // Calendar left, slots right (responsive)
//             <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 h-full transition-all duration-500">
//               {/* Calendar fixed width left */}
//               <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl py-6 px-4 sm:px-6 w-full max-w-xs z-10">
//                 <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
//                   Select a date for your demo
//                 </h2>
//                 <CalendarPicker
//                   onDateSelect={handleDateSelect}
//                   selectedDate={selectedDate}
//                   highlightedDates={highlightedDates}
//                 />
//               </div>
//               {/* Slot area right */}
//               <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl py-0 px-0 sm:py-0 sm:px-0 w-full max-w-xs h-[410px] sm:h-[410px] z-10">
//                 {/* Title fixed */}
//                 <div className="sticky top-0 z-20 bg-white/90 w-full pt-6 pb-2 rounded-t-2xl">
//                   <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
//                     Choose an available time slot
//                   </h2>
//                 </div>
//                 {/* Scrollable slot list */}
//                 <div className="flex-1 w-full overflow-y-auto px-3 sm:px-5 pb-4" style={{maxHeight: "340px"}}>
//                   <SlotSelector
//                     slots={slots}
//                     onSlotSelect={handleSlotSelect}
//                     selectedSlot={selectedSlot}
//                     loading={selectedDate && slots === null}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         {error && (
//           <div className="mt-2 text-red-600 text-center font-semibold z-10">{error}</div>
//         )}
//       </div>
//       {/* Modal overlays */}
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
//       <style jsx global>{`
//         html, body, #__next {
//           height: 100%;
//           min-height: 0;
//           overflow: hidden !important;
//         }
//         body {
//           overscroll-behavior: none;
//         }
//         @media (max-width: 640px) {
//           .max-w-xs {
//             max-width: 98vw !important;
//           }
//           .max-w-3xl {
//             max-width: 99vw !important;
//           }
//         }
//       `}</style>
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

  const handleAdminClick = () => {
    window.location.href = "/admin";
  };

  // Professional main theme color
  const themeColor = "#005e6a";

  return (
    <main
      className="w-screen h-screen min-h-screen min-w-full flex flex-col overflow-hidden font-sans"
      style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #f4f8fa 100%)` }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between w-full px-4 sm:px-10 py-4 bg-white/80 shadow-md backdrop-blur-sm z-10">
        <section className="flex items-center gap-4">
          {/* <aside
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border-4"
            style={{
              background: themeColor,
              borderColor: "#fff",
            }}
          >
            <span className="text-white text-2xl sm:text-3xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
          </aside> */}
          <nav className="hidden sm:block">
            <CompanyInfo />
          </nav>
        </section>
        <button
          onClick={handleAdminClick}
          className="bg-gradient-to-r from-[#005e6a] to-[#3ecbdb] text-white px-5 py-2 rounded-full shadow-md text-sm font-bold hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-700"
        >
          Admin
        </button>
      </header>
      <section className="sm:hidden px-4 pb-2 pt-2 bg-white/80 w-full">
        <CompanyInfo />
      </section>
      {/* Main booking area */}
      <section className="flex-1 flex items-center justify-center w-full max-w-[100vw]">
        {!selectedDate ? (
          <section className="flex flex-col items-center justify-center w-full h-full">
            <section
              className="bg-white rounded-2xl shadow-2xl py-8 px-4 sm:px-8 w-full max-w-md flex flex-col items-center border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              <h2
                className="text-lg sm:text-xl font-bold mb-2 text-center"
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
          <section className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 min-h-[400px] max-h-[500px] px-2">
            {/* Calendar */}
            <section
              className="flex flex-col items-center bg-white rounded-2xl shadow-2xl py-8 px-4 sm:px-6 w-full max-w-md z-10 border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              <h2
                className="text-lg sm:text-xl font-bold mb-2 text-center"
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
              className="flex flex-col items-center bg-white rounded-2xl shadow-2xl w-full max-w-md h-[370px] sm:h-[430px] mt-6 sm:mt-0 border"
              style={{ borderColor: themeColor, borderWidth: 2 }}
            >
              {/* Fixed header */}
              <header className="sticky top-0 z-20 bg-white w-full pt-6 pb-2 rounded-t-2xl border-b" style={{ borderColor: themeColor }}>
                <h2
                  className="text-lg sm:text-xl font-bold text-center"
                  style={{
                    color: themeColor,
                    letterSpacing: '0.01em',
                  }}
                >
                  Choose an available time slot
                </h2>
              </header>
              {/* Scrollable slot list */}
              <section className="flex-1 w-full overflow-y-auto px-3 sm:px-5 pb-4" style={{maxHeight: "280px"}}>
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
        <footer className="mt-3 text-red-600 text-center font-semibold z-10">{error}</footer>
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
        /* Custom scrollbar for slots */
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
      `}</style>
    </main>
  );
}