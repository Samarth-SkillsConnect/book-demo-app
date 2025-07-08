// import { useState, useRef } from "react";
// import {
//   validateEmail,
//   validatePhone,
//   validateGuestEmails,
//   validateName,
//   validateCompany,
//   validateDescription
// } from "./ValidationHelpers";
// import { formatTimeRange } from "./TimeHelpers";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// function formatDateDMY(dateStr) {
//   if (!dateStr) return "";
//   const [yyyy, mm, dd] = dateStr.split("-");
//   return `${dd}-${mm}-${yyyy}`;
// }

// // Validation function for a single field
// function validateField(field, value, allValues) {
//   switch (field) {
//     case "firstName":
//       if (!value) return "First name is required";
//       if (!validateName(value)) {
//         if (value.trim().length < 2)
//           return "First name must be at least 2 characters";
//         if (value.trim().length > 40)
//           return "First name must be at most 40 characters";
//         return "First name contains invalid characters (only letters, spaces, hyphens, apostrophes)";
//       }
//       return "";
//     case "lastName":
//       if (!value) return "Last name is required";
//       if (!validateName(value)) {
//         if (value.trim().length < 2)
//           return "Last name must be at least 2 characters";
//         if (value.trim().length > 40)
//           return "Last name must be at most 40 characters";
//         return "Last name contains invalid characters (only letters, spaces, hyphens, apostrophes)";
//       }
//       return "";
//     case "company":
//       if (value && !validateCompany(value)) {
//         if (value.trim().length < 2)
//           return "Company name must be at least 2 characters";
//         if (/^[0-9]+$/.test(value.trim()))
//           return "Company name cannot be only numbers";
//         return "Company name contains invalid characters";
//       }
//       return "";
//     case "mobile":
//       if (!validatePhone(value)) {
//         if (!value)
//           return "Mobile number is required";
//         if (!/^\+\d{10,15}$/.test(value))
//           return "Enter a valid mobile number starting with country code (e.g., +1234567890)";
//         if (/^(\d)\1+$/.test(value.replace('+', '')))
//           return "Mobile number cannot be all the same digit";
//         return "Mobile number contains invalid characters";
//       }
//       return "";
//     case "email":
//       if (!validateEmail(value)) {
//         if (!value)
//           return "Email is required";
//         return "Enter a valid, non-disposable email address";
//       }
//       return "";
//     case "description":
//       if (!validateDescription(value)) {
//         if (!value)
//           return "Description is required";
//         if (value.trim().length < 10)
//           return "Description must be at least 10 characters";
//         if (value.trim().length > 500)
//           return "Description must be at most 500 characters";
//         return "Description is invalid";
//       }
//       return "";
//     case "guests":
//       if (Array.isArray(value)) {
//         let guestArr = value.map((g) => g.trim()).filter((g) => g.length);
//         if (guestArr.length > 0) {
//           if (guestArr.length > 30)
//             return "Max 30 guests allowed";
//           if (allValues && allValues.email &&
//               guestArr.some(g => g.toLowerCase() === allValues.email.toLowerCase())) {
//             return "You cannot add yourself as a guest";
//           }
//           if (!validateGuestEmails(guestArr, allValues?.email))
//             return "Guest emails must be valid, unique, not yours, and not empty";
//         }
//       }
//       return "";
//     default:
//       return "";
//   }
// }

// export default function DemoRegistrationForm({ slot, onClose, onSubmit }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [company, setCompany] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [description, setDescription] = useState("");

//   // Guests: use array for tags, guestInput for controlled input, and touched for error display
//   const [guests, setGuests] = useState([]);
//   const [guestInput, setGuestInput] = useState("");
//   const [guestInputTouched, setGuestInputTouched] = useState(false);
//   const guestInputRef = useRef();

//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const allValues = { firstName, lastName, company, mobile, email, description, guests };

//   const handleChange = (field, value) => {
//     switch (field) {
//       case "firstName":
//         setFirstName(value);
//         break;
//       case "lastName":
//         setLastName(value);
//         break;
//       case "company":
//         setCompany(value);
//         break;
//       case "mobile":
//         setMobile(value);
//         break;
//       case "email":
//         setEmail(value);
//         break;
//       case "description":
//         setDescription(value);
//         break;
//       case "guests":
//         setGuests(value);
//         setGuestInputTouched(true);
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({
//       ...prev,
//       [field]: validateField(field, value, { ...allValues, [field]: value }),
//     }));
//   };

//   // Space key handler for guests
//   const handleGuestInputKeyDown = (e) => {
//     if (e.key === " ") {
//       e.preventDefault();
//       const newEmail = guestInput.trim();
//       if (!newEmail) return;
//       if (!validateEmail(newEmail)) {
//         setErrors((prev) => ({
//           ...prev,
//           guests: "Invalid guest email address"
//         }));
//         return;
//       }
//       if (guests.includes(newEmail)) {
//         setErrors((prev) => ({
//           ...prev,
//           guests: "Duplicate guest email"
//         }));
//         return;
//       }
//       if (guests.length >= 30) {
//         setErrors((prev) => ({
//           ...prev,
//           guests: "Max 30 guests allowed"
//         }));
//         return;
//       }
//       if (email && newEmail.toLowerCase() === email.toLowerCase()) {
//         setErrors((prev) => ({
//           ...prev,
//           guests: "You cannot add yourself as a guest"
//         }));
//         return;
//       }
//       const newGuests = [...guests, newEmail];
//       setGuests(newGuests);
//       setGuestInput("");
//       setErrors((prev) => ({
//         ...prev,
//         guests: validateField("guests", newGuests, { ...allValues, guests: newGuests })
//       }));
//     }
//   };

//   // Remove tag handler
//   const handleRemoveGuest = (idx) => {
//     const newGuests = guests.filter((_, i) => i !== idx);
//     setGuests(newGuests);
//     setErrors((prev) => ({
//       ...prev,
//       guests: validateField("guests", newGuests, { ...allValues, guests: newGuests })
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.keys(allValues).forEach(field => {
//       const error = validateField(field, allValues[field], allValues);
//       if (error) newErrors[field] = error;
//     });
//     if (Object.keys(newErrors).length) {
//       setErrors(newErrors);
//       setGuestInputTouched(true);
//       return;
//     }
//     setSubmitting(true);
//     await onSubmit({
//       first_name: firstName,
//       last_name: lastName,
//       company_name: company,
//       mobile_number: mobile,
//       email,
//       description,
//       guests: guests.join(","),
//     });
//     setSubmitting(false);
//   };

//   const themePrimary = "var(--theme-primary)";
//   const themePrimaryLight = "var(--theme-primary-light)";
//   const themeBgLight = "var(--theme-bg-light)";
//   const themeCard = "var(--theme-card)";
//   const prettyDate = formatDateDMY(slot?.date);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 animate-fade-in"
//       style={{
//         background: "linear-gradient(135deg, #005e6a33 0%, #3ecbdb18 100%)"
//       }}
//     >
//       <div
//         className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent"
//         style={{
//           boxShadow: "0 0 40px 3px #005e6a33, 0 0 0 8px #3ecbdb22 inset"
//         }}
//       />
//       <div
//         className="relative rounded-2xl shadow-2xl px-3 py-3 sm:px-8 sm:py-6 w-full max-w-lg max-h-[92vh] overflow-y-auto animate-fade-in-up transition-all duration-700 border-2"
//         style={{
//           background: themeCard,
//           borderColor: themePrimary,
//           fontSize: "0.98rem",
//           backdropFilter: "blur(18px)",
//         }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-400 hover:text-[color:var(--theme-primary-light)] text-3xl focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)] rounded-full transition z-10 animate-bounce-in"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <h2
//           className="text-2xl sm:text-3xl font-extrabold mb-2 text-center tracking-tight drop-shadow animate-fade-in"
//           style={{ color: themePrimary }}
//         >
//           Book Your Demo
//         </h2>
//         <div className="text-center mb-4 text-gray-600 text-sm animate-fade-in delay-100">
//           <span className="font-semibold" style={{ color: themePrimary }}>Date:</span> {prettyDate}
//           &nbsp;|&nbsp;
//           <span className="font-semibold" style={{ color: themePrimary }}>Time:</span> {formatTimeRange(slot.start_time, slot.end_time)}
//           <div style={{ fontSize: "0.85em", color: "#888", marginTop: 2 }}>
//             {/* [Debug: Raw slot.date = <b>{slot?.date}</b>] */}
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-fade-in-up delay-150">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <div className="flex-1">
//               <label className="block mb-1 font-medium" style={{ color: themePrimary }}>First Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
//                   errors.firstName
//                     ? "border-red-400 focus:ring-red-300"
//                     : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
//                 }`}
//                 value={firstName}
//                 onChange={e => handleChange("firstName", e.target.value)}
//                 autoComplete="given-name"
//                 style={{ color: themePrimary }}
//               />
//               {errors.firstName && <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>}
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Last Name *</label>
//               <input
//                 className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
//                   errors.lastName
//                     ? "border-red-400 focus:ring-red-300"
//                     : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
//                 }`}
//                 value={lastName}
//                 onChange={e => handleChange("lastName", e.target.value)}
//                 autoComplete="family-name"
//                 style={{ color: themePrimary }}
//               />
//               {errors.lastName && <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>}
//             </div>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Company Name</label>
//             <input
//               className="w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
//               value={company}
//               onChange={e => handleChange("company", e.target.value)}
//               autoComplete="organization"
//               style={{ color: themePrimary }}
//             />
//             {errors.company && <div className="text-red-600 text-xs mt-1">{errors.company}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Mobile Number (with country code) *</label>
//             <PhoneInput
//               country={'in'}
//               value={mobile}
//               onChange={value => {
//                 handleChange("mobile", value ? ("+" + value) : "");
//               }}
//               inputClass={`w-full ${errors.mobile ? 'border-red-400' : 'border-[color:var(--theme-primary)]'}`}
//               inputProps={{
//                 name: 'mobile',
//                 required: true,
//                 autoFocus: false
//               }}
//               disableDropdown={false}
//               enableSearch
//               countryCodeEditable={true}
//             />
//             {errors.mobile && <div className="text-red-600 text-xs mt-1">{errors.mobile}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Email *</label>
//             <input
//               className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
//                 errors.email
//                   ? "border-red-400 focus:ring-red-300"
//                   : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
//               }`}
//               value={email}
//               onChange={e => handleChange("email", e.target.value)}
//               autoComplete="email"
//               style={{ color: themePrimary }}
//             />
//             {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Description *</label>
//             <textarea
//               className={`w-full border-2 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 bg-white/80 ${
//                 errors.description
//                   ? "border-red-400 focus:ring-red-300"
//                   : "border-[color:var(--theme-primary)] focus:ring-[color:var(--theme-primary-light)]"
//               }`}
//               rows={3}
//               value={description}
//               onChange={e => handleChange("description", e.target.value)}
//               placeholder="What do you want to know about us?"
//               style={{ color: themePrimary }}
//             />
//             {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" style={{ color: themePrimary }}>
//               Guests <span className="text-xs text-gray-400">(type email and press space, max 30)</span>
//             </label>
//             <div className="w-full border-2 rounded-lg px-2 py-2 bg-white/80 min-h-[48px] flex flex-wrap items-center">
//               {guests.map((guest, idx) => (
//                 <span
//                   key={idx}
//                   className="flex items-center bg-[color:var(--theme-primary-light)] text-[color:var(--theme-primary)] px-2 py-1 rounded mr-2 mb-1"
//                 >
//                   {guest}
//                   <button
//                     type="button"
//                     className="ml-1 text-red-600 hover:text-red-800 focus:outline-none"
//                     onClick={() => handleRemoveGuest(idx)}
//                     aria-label="Remove"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//               <input
//                 ref={guestInputRef}
//                 type="text"
//                 className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-[color:var(--theme-primary)]"
//                 placeholder="Add guest email and press space"
//                 value={guestInput}
//                 onChange={e => {
//                   setGuestInput(e.target.value);
//                   setErrors((prev) => ({ ...prev, guests: "" }));
//                 }}
//                 onKeyDown={handleGuestInputKeyDown}
//                 onBlur={() => setGuestInputTouched(true)}
//                 style={{ color: themePrimary }}
//               />
//             </div>
//             {(guestInputTouched || submitting) && errors.guests && (
//               <div className="text-red-600 text-xs mt-1">{errors.guests}</div>
//             )}
//           </div>
//           <button
//             className="w-full py-2.5 text-lg text-white rounded-lg font-bold shadow transition-all duration-150 disabled:opacity-60 animate-fade-in delay-200"
//             style={{
//               background: `linear-gradient(90deg, ${themePrimary} 0%, ${themePrimaryLight} 100%)`
//             }}
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




import { useState, useRef } from "react";
import {
  validateEmail,
  validatePhone,
  validateGuestEmails,
  validateName,
  validateCompany,
  validateDescription
} from "./ValidationHelpers";
import { formatTimeRange } from "./TimeHelpers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function formatDateDMY(dateStr) {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
}

// Validation function for a single field
function validateField(field, value, allValues) {
  switch (field) {
    case "firstName":
      if (!value) return "First name is required";
      if (!validateName(value)) {
        if (value.trim().length < 2)
          return "First name must be at least 2 characters";
        if (value.trim().length > 40)
          return "First name must be at most 40 characters";
        return "First name contains invalid characters (only letters, spaces, hyphens, apostrophes)";
      }
      return "";
    case "lastName":
      if (!value) return "Last name is required";
      if (!validateName(value)) {
        if (value.trim().length < 2)
          return "Last name must be at least 2 characters";
        if (value.trim().length > 40)
          return "Last name must be at most 40 characters";
        return "Last name contains invalid characters (only letters, spaces, hyphens, apostrophes)";
      }
      return "";
    case "company":
      if (value && !validateCompany(value)) {
        if (value.trim().length < 2)
          return "Company name must be at least 2 characters";
        if (/^[0-9]+$/.test(value.trim()))
          return "Company name cannot be only numbers";
        return "Company name contains invalid characters";
      }
      return "";
    case "mobile":
      if (!validatePhone(value)) {
        if (!value)
          return "Mobile number is required";
        if (!/^\+\d{10,15}$/.test(value))
          return "Enter a valid mobile number starting with country code (e.g., +1234567890)";
        if (/^(\d)\1+$/.test(value.replace('+', '')))
          return "Mobile number cannot be all the same digit";
        return "Mobile number contains invalid characters";
      }
      return "";
    case "email":
      if (!validateEmail(value)) {
        if (!value)
          return "Email is required";
        return "Enter a valid, non-disposable email address";
      }
      return "";
    case "description":
      if (!validateDescription(value)) {
        if (!value)
          return "Description is required";
        if (value.trim().length < 10)
          return "Description must be at least 10 characters";
        if (value.trim().length > 500)
          return "Description must be at most 500 characters";
        return "Description is invalid";
      }
      return "";
    case "guests":
      if (Array.isArray(value)) {
        let guestArr = value.map((g) => g.trim()).filter((g) => g.length);
        if (guestArr.length > 0) {
          if (guestArr.length > 30)
            return "Max 30 guests allowed";
          if (allValues && allValues.email &&
              guestArr.some(g => g.toLowerCase() === allValues.email.toLowerCase())) {
            return "You cannot add yourself as a guest";
          }
          if (!validateGuestEmails(guestArr, allValues?.email))
            return "Guest emails must be valid, unique, not yours, and not empty";
        }
      }
      return "";
    default:
      return "";
  }
}

export default function DemoRegistrationForm({ slot, onClose, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // Guests: use array for tags, guestInput for controlled input, and touched for error display
  const [guests, setGuests] = useState([]);
  const [guestInput, setGuestInput] = useState("");
  const [guestInputTouched, setGuestInputTouched] = useState(false);
  const guestInputRef = useRef();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const allValues = { firstName, lastName, company, mobile, email, description, guests };

  const handleChange = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "guests":
        setGuests(value);
        setGuestInputTouched(true);
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value, { ...allValues, [field]: value }),
    }));
  };

  // Helper to add multiple emails from a string (comma or space separated)
  const addGuestsFromString = (str) => {
    let emails = str
      .split(/[\s,]+/)
      .map(e => e.trim())
      .filter(e => e.length);
    let newGuests = [...guests];
    let skipped = [];
    for (let emailVal of emails) {
      if (!validateEmail(emailVal)) {
        skipped.push(emailVal);
        continue;
      }
      if (newGuests.includes(emailVal)) {
        skipped.push(emailVal);
        continue;
      }
      if (newGuests.length >= 30) {
        break;
      }
      if (email && emailVal.toLowerCase() === email.toLowerCase()) {
        skipped.push(emailVal);
        continue;
      }
      newGuests.push(emailVal);
    }
    setGuests(newGuests);
    setGuestInput("");
    setErrors((prev) => ({
      ...prev,
      guests: skipped.length
        ? `Skipped invalid/duplicate/self emails: ${skipped.join(", ")}`
        : ""
    }));
  };

  // Modified input keydown for space/comma/enter
  const handleGuestInputKeyDown = (e) => {
    if (e.key === " " || e.key === "," || e.key === "Enter") {
      e.preventDefault();
      if (guestInput.trim() === "") return;
      addGuestsFromString(guestInput);
    }
  };

  // Handle paste event
  const handleGuestInputPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (paste.includes(",") || paste.includes(" ") || paste.includes("\n")) {
      e.preventDefault();
      addGuestsFromString(paste);
    }
  };

  // Remove tag handler
  const handleRemoveGuest = (idx) => {
    const newGuests = guests.filter((_, i) => i !== idx);
    setGuests(newGuests);
    setErrors((prev) => ({
      ...prev,
      guests: validateField("guests", newGuests, { ...allValues, guests: newGuests })
    }));
  };

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
    await onSubmit({
      first_name: firstName,
      last_name: lastName,
      company_name: company,
      mobile_number: mobile,
      email,
      description,
      guests: guests.join(","),
    });
    setSubmitting(false);
  };

  const themePrimary = "var(--theme-primary)";
  const themePrimaryLight = "var(--theme-primary-light)";
  const themeBgLight = "var(--theme-bg-light)";
  const themeCard = "var(--theme-card)";
  const prettyDate = formatDateDMY(slot?.date);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 animate-fade-in"
      style={{
        background: "linear-gradient(135deg, #005e6a33 0%, #3ecbdb18 100%)"
      }}
    >
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
          <span className="font-semibold" style={{ color: themePrimary }}>Date:</span> {prettyDate}
          &nbsp;|&nbsp;
          <span className="font-semibold" style={{ color: themePrimary }}>Time:</span> {formatTimeRange(slot.start_time, slot.end_time)}
          <div style={{ fontSize: "0.85em", color: "#888", marginTop: 2 }}>
            {/* [Debug: Raw slot.date = <b>{slot?.date}</b>] */}
          </div>
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
                onChange={e => handleChange("firstName", e.target.value)}
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
                onChange={e => handleChange("lastName", e.target.value)}
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
              onChange={e => handleChange("company", e.target.value)}
              autoComplete="organization"
              style={{ color: themePrimary }}
            />
            {errors.company && <div className="text-red-600 text-xs mt-1">{errors.company}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>Mobile Number (with country code) *</label>
            <PhoneInput
              country={'in'}
              value={mobile}
              onChange={value => {
                handleChange("mobile", value ? ("+" + value) : "");
              }}
              inputClass={`w-full ${errors.mobile ? 'border-red-400' : 'border-[color:var(--theme-primary)]'}`}
              inputProps={{
                name: 'mobile',
                required: true,
                autoFocus: false
              }}
              disableDropdown={false}
              enableSearch
              countryCodeEditable={true}
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
              onChange={e => handleChange("email", e.target.value)}
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
              onChange={e => handleChange("description", e.target.value)}
              placeholder="What do you want to know about us?"
              style={{ color: themePrimary }}
            />
            {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium" style={{ color: themePrimary }}>
              Guests <span className="text-xs text-gray-400">(type or paste emails, press space/comma/enter, max 30)</span>
            </label>
            <div className="w-full border-2 rounded-lg px-2 py-2 bg-white/80 min-h-[48px] flex flex-wrap items-center">
              {guests.map((guest, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-[color:var(--theme-primary-light)] text-[color:var(--theme-primary)] px-2 py-1 rounded mr-2 mb-1"
                >
                  {guest}
                  <button
                    type="button"
                    className="ml-1 text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleRemoveGuest(idx)}
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={guestInputRef}
                type="text"
                className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-[color:var(--theme-primary)]"
                placeholder="Add guest email and press space/comma/enter or paste list"
                value={guestInput}
                onChange={e => {
                  setGuestInput(e.target.value);
                  setErrors((prev) => ({ ...prev, guests: "" }));
                }}
                onKeyDown={handleGuestInputKeyDown}
                onPaste={handleGuestInputPaste}
                onBlur={() => setGuestInputTouched(true)}
                style={{ color: themePrimary }}
              />
            </div>
            {(guestInputTouched || submitting) && errors.guests && (
              <div className="text-red-600 text-xs mt-1">{errors.guests}</div>
            )}
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