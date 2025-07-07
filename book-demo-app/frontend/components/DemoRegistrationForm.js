
// import { useState } from "react";
// import { validateEmail, validatePhone, validateGuestEmails } from "./ValidationHelpers";
// import { formatTimeRange } from "./TimeHelpers";

// export default function DemoRegistrationForm({ slot, onClose, onSubmit }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [company, setCompany] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [description, setDescription] = useState("");
//   const [guests, setGuests] = useState("");
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const guestArr = guests
//       .split(",")
//       .map((g) => g.trim())
//       .filter((g) => g.length);

//     const fieldErrors = {};
//     if (!firstName) fieldErrors.firstName = "First name is required";
//     if (!lastName) fieldErrors.lastName = "Last name is required";
//     if (!validatePhone(mobile)) fieldErrors.mobile = "Valid mobile number with country code required";
//     if (!validateEmail(email)) fieldErrors.email = "Valid email required";
//     if (!description) fieldErrors.description = "Description is required";
//     if (guestArr.length > 30) fieldErrors.guests = "Max 30 guests allowed";
//     if (!validateGuestEmails(guestArr)) fieldErrors.guests = "All guest emails must be valid";

//     if (Object.keys(fieldErrors).length) {
//       setErrors(fieldErrors);
//       return;
//     }
//     setSubmitting(true);
//     const ok = await onSubmit(
//       {
//         first_name: firstName,
//         last_name: lastName,
//         company_name: company,
//         mobile_number: mobile,
//         email,
//         description,
//         guests: guests.trim(),
//       }
//     );
//     setSubmitting(false);
//     if (!ok) {
//       // errors are set in parent
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center px-2 py-6">
//       <div
//         className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-lg max-h-[92vh] overflow-y-auto
//                     transition-all animate-fade-in scale-95 sm:scale-100"
//         style={{
//           fontSize: "0.98rem",
//         }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-blue-800 tracking-tight drop-shadow">Book Your Demo</h2>
//         <div className="text-center mb-4 text-gray-500 text-sm">
//           <span className="font-semibold text-blue-700">Date:</span> {slot.date} &nbsp;|&nbsp; <span className="font-semibold text-blue-700">Time:</span> {formatTimeRange(slot.start_time, slot.end_time)}
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <div className="flex-1">
//               <label className="block mb-1 font-medium text-blue-700">First Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//                 value={firstName}
//                 onChange={e => setFirstName(e.target.value)}
//                 autoComplete="given-name"
//               />
//               {errors.firstName && <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>}
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 font-medium text-blue-700">Last Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//                 value={lastName}
//                 onChange={e => setLastName(e.target.value)}
//                 autoComplete="family-name"
//               />
//               {errors.lastName && <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>}
//             </div>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Company Name</label>
//             <input
//               className="w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 border-gray-200 focus:ring-blue-300"
//               value={company}
//               onChange={e => setCompany(e.target.value)}
//               autoComplete="organization"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Mobile Number (with country code) *</label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.mobile ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//               value={mobile}
//               onChange={e => setMobile(e.target.value)}
//               placeholder="+1xxxxxxxxxx"
//               autoComplete="tel"
//             />
//             {errors.mobile && <div className="text-red-600 text-xs mt-1">{errors.mobile}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Email *</label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               autoComplete="email"
//             />
//             {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Description *</label>
//             <textarea
//               className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.description ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//               rows={3}
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               placeholder="What do you want to know about us?"
//             />
//             {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Guests <span className="text-xs text-gray-400">(comma-separated emails, max 30)</span></label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.guests ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'}`}
//               value={guests}
//               onChange={e => setGuests(e.target.value)}
//               placeholder="guest1@email.com, guest2@email.com"
//             />
//             {errors.guests && <div className="text-red-600 text-xs mt-1">{errors.guests}</div>}
//           </div>
//           <button
//             className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 py-2.5 text-lg text-white rounded-lg font-bold shadow hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-60"
//             disabled={submitting}
//             type="submit"
//           >
//             {submitting ? (
//               <span>
//                 <svg className="w-5 h-5 inline-block mr-2 animate-spin" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//                 Booking...
//               </span>
//             ) : "Book Demo"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import { useState } from "react";
// import { validateEmail, validatePhone, validateGuestEmails } from "./ValidationHelpers";
// import { formatTimeRange } from "./TimeHelpers";

// export default function DemoRegistrationForm({ slot, onClose, onSubmit }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [company, setCompany] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [description, setDescription] = useState("");
//   const [guests, setGuests] = useState("");
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const guestArr = guests
//       .split(",")
//       .map((g) => g.trim())
//       .filter((g) => g.length);

//     const fieldErrors = {};
//     if (!firstName) fieldErrors.firstName = "First name is required";
//     if (!lastName) fieldErrors.lastName = "Last name is required";
//     if (!validatePhone(mobile)) fieldErrors.mobile = "Valid mobile number with country code required";
//     if (!validateEmail(email)) fieldErrors.email = "Valid email required";
//     if (!description) fieldErrors.description = "Description is required";
//     if (guestArr.length > 30) fieldErrors.guests = "Max 30 guests allowed";
//     if (!validateGuestEmails(guestArr)) fieldErrors.guests = "All guest emails must be valid";

//     if (Object.keys(fieldErrors).length) {
//       setErrors(fieldErrors);
//       return;
//     }
//     setSubmitting(true);
//     const ok = await onSubmit(
//       {
//         first_name: firstName,
//         last_name: lastName,
//         company_name: company,
//         mobile_number: mobile,
//         email,
//         description,
//         guests: guests.trim(),
//       }
//     );
//     setSubmitting(false);
//     // errors are set in parent
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-200/70 via-fuchsia-200/60 to-yellow-100/70 flex items-center justify-center px-2 py-6 animate-fade-in">
//       {/* Sparkling border animation */}
//       <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent border-gradient-to-r from-blue-300 via-fuchsia-200 to-yellow-100" style={{boxShadow:"0 0 40px 3px #a78bfa55, 0 0 0 8px #fef3c755 inset"}} />
//       <div
//         className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl px-3 py-3 sm:px-8 sm:py-6 w-full max-w-lg max-h-[92vh] overflow-y-auto border-2 border-gradient-to-r from-blue-200 via-fuchsia-100 to-yellow-100 animate-fade-in-up transition-all duration-700"
//         style={{
//           fontSize: "0.98rem",
//         }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-400 hover:text-fuchsia-600 text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition z-10 animate-bounce-in"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent tracking-tight drop-shadow animate-fade-in">
//           Book Your Demo
//         </h2>
//         <div className="text-center mb-4 text-gray-600 text-sm animate-fade-in delay-100">
//           <span className="font-semibold text-blue-700">Date:</span> {slot.date} &nbsp;|&nbsp; <span className="font-semibold text-blue-700">Time:</span> {formatTimeRange(slot.start_time, slot.end_time)}
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-fade-in-up delay-150">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <div className="flex-1">
//               <label className="block mb-1 font-medium text-blue-700">First Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//                 value={firstName}
//                 onChange={e => setFirstName(e.target.value)}
//                 autoComplete="given-name"
//               />
//               {errors.firstName && <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>}
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 font-medium text-blue-700">Last Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//                 value={lastName}
//                 onChange={e => setLastName(e.target.value)}
//                 autoComplete="family-name"
//               />
//               {errors.lastName && <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>}
//             </div>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Company Name</label>
//             <input
//               className="w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 border-blue-100 focus:ring-fuchsia-300"
//               value={company}
//               onChange={e => setCompany(e.target.value)}
//               autoComplete="organization"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Mobile Number (with country code) *</label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.mobile ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//               value={mobile}
//               onChange={e => setMobile(e.target.value)}
//               placeholder="+1xxxxxxxxxx"
//               autoComplete="tel"
//             />
//             {errors.mobile && <div className="text-red-600 text-xs mt-1">{errors.mobile}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Email *</label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               autoComplete="email"
//             />
//             {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">Description *</label>
//             <textarea
//               className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.description ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//               rows={3}
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               placeholder="What do you want to know about us?"
//             />
//             {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-blue-700">
//               Guests <span className="text-xs text-gray-400">(comma-separated emails, max 30)</span>
//             </label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 bg-white/80 shadow focus:outline-none focus:ring-2 ${errors.guests ? 'border-red-400 focus:ring-red-300' : 'border-blue-100 focus:ring-fuchsia-300'}`}
//               value={guests}
//               onChange={e => setGuests(e.target.value)}
//               placeholder="guest1@email.com, guest2@email.com"
//             />
//             {errors.guests && <div className="text-red-600 text-xs mt-1">{errors.guests}</div>}
//           </div>
//           <button
//             className="w-full bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 py-2.5 text-lg text-white rounded-lg font-bold shadow hover:from-fuchsia-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-150 disabled:opacity-60 animate-fade-in delay-200"
//             disabled={submitting}
//             type="submit"
//           >
//             {submitting ? (
//               <span>
//                 <svg className="w-5 h-5 inline-block mr-2 animate-spin" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//                 Booking...
//               </span>
//             ) : "Book Demo"}
//           </button>
//         </form>
//       </div>
//       <style jsx global>{`
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




import { useState } from "react";
import { validateEmail, validatePhone, validateGuestEmails } from "./ValidationHelpers";
import { formatTimeRange } from "./TimeHelpers";

export default function DemoRegistrationForm({ slot, onClose, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guestArr = guests
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length);

    const fieldErrors = {};
    if (!firstName) fieldErrors.firstName = "First name is required";
    if (!lastName) fieldErrors.lastName = "Last name is required";
    if (!validatePhone(mobile)) fieldErrors.mobile = "Valid mobile number with country code required";
    if (!validateEmail(email)) fieldErrors.email = "Valid email required";
    if (!description) fieldErrors.description = "Description is required";
    if (guestArr.length > 30) fieldErrors.guests = "Max 30 guests allowed";
    if (!validateGuestEmails(guestArr)) fieldErrors.guests = "All guest emails must be valid";

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const ok = await onSubmit(
      {
        first_name: firstName,
        last_name: lastName,
        company_name: company,
        mobile_number: mobile,
        email,
        description,
        guests: guests.trim(),
      }
    );
    setSubmitting(false);
    // errors are set in parent
  };

  // THEME COLORS
  const themePrimary = "var(--theme-primary)";
  const themePrimaryLight = "var(--theme-primary-light)";
  const themeBgLight = "var(--theme-bg-light)";
  const themeCard = "var(--theme-card)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 animate-fade-in"
      style={{
        background: "linear-gradient(135deg, #005e6a33 0%, #3ecbdb18 100%)"
      }}
    >
      {/* Themed border shimmer */}
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent"
        style={{
          boxShadow: "0 0 40px 3px #005e6a33, 0 0 0 8px #3ecbdb22 inset"
        }}
      />
      <div
        className="relative rounded-2xl shadow-2xl px-3 py-3 sm:px-8 sm:py-6 w-full max-w-lg max-h-[92vh] overflow-y-auto animate-fade-in-up transition-all duration-700 border-2"
        style={{
          background: themeCard,
          borderColor: themePrimary,
          fontSize: "0.98rem",
          backdropFilter: "blur(18px)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-[color:var(--theme-primary-light)] text-3xl focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)] rounded-full transition z-10 animate-bounce-in"
          aria-label="Close"
        >
          &times;
        </button>
        <h2
          className="text-2xl sm:text-3xl font-extrabold mb-2 text-center tracking-tight drop-shadow animate-fade-in"
          style={{ color: themePrimary }}
        >
          Book Your Demo
        </h2>
        <div className="text-center mb-4 text-gray-600 text-sm animate-fade-in delay-100">
          <span className="font-semibold" style={{ color: themePrimary }}>Date:</span> {slot.date} &nbsp;|&nbsp; <span className="font-semibold" style={{ color: themePrimary }}>Time:</span> {formatTimeRange(slot.start_time, slot.end_time)}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-fade-in-up delay-150">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium" style={{ color: themePrimary }}>First Name *</label>
              <input
                className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                  errors.firstName
                    ? "border-red-400 focus:ring-red-300"
                    : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
                }`}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoComplete="given-name"
                style={{ color: themePrimary }}
              />
              {errors.firstName && <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Last Name *</label>
              <input
                className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                  errors.lastName
                    ? "border-red-400 focus:ring-red-300"
                    : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
                }`}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
                style={{ color: themePrimary }}
              />
              {errors.lastName && <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Company Name</label>
            <input
              className="w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
              value={company}
              onChange={e => setCompany(e.target.value)}
              autoComplete="organization"
              style={{ color: themePrimary }}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Mobile Number (with country code) *</label>
            <input
              className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                errors.mobile
                  ? "border-red-400 focus:ring-red-300"
                  : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
              }`}
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="+1xxxxxxxxxx"
              autoComplete="tel"
              style={{ color: themePrimary }}
            />
            {errors.mobile && <div className="text-red-600 text-xs mt-1">{errors.mobile}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Email *</label>
            <input
              className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
              }`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              style={{ color: themePrimary }}
            />
            {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Description *</label>
            <textarea
              className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                errors.description
                  ? "border-red-400 focus:ring-red-300"
                  : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
              }`}
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What do you want to know about us?"
              style={{ color: themePrimary }}
            />
            {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>
              Guests <span className="text-xs text-gray-400">(comma-separated emails, max 30)</span>
            </label>
            <input
              className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
                errors.guests
                  ? "border-red-400 focus:ring-red-300"
                  : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
              }`}
              value={guests}
              onChange={e => setGuests(e.target.value)}
              placeholder="guest1@email.com, guest2@email.com"
              style={{ color: themePrimary }}
            />
            {errors.guests && <div className="text-red-600 text-xs mt-1">{errors.guests}</div>}
          </div>
          <button
            className="w-full py-2.5 text-lg text-white rounded-lg font-bold shadow transition-all duration-150 disabled:opacity-60 animate-fade-in delay-200"
            style={{
              background: `linear-gradient(90deg, ${themePrimary} 0%, ${themePrimaryLight} 100%)`
            }}
            disabled={submitting}
            type="submit"
          >
            {submitting ? (
              <span>
                <svg className="w-5 h-5 inline-block mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Booking...
              </span>
            ) : "Book Demo"}
          </button>
        </form>
      </div>
    </div>
  );
}