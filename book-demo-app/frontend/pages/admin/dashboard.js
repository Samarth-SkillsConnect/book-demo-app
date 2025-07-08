// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import SlotCreateForm from "@/components/SlotCreateForm";

// // Simple utility for filtering
// function filterBookings(bookings, filters) {
//   return bookings.filter((b) => {
//     // Date/Time
//     if (filters.dateTime) {
//       const dt = filters.dateTime.toLowerCase();
//       if (
//         !(
//           (b.date && b.date.toLowerCase().includes(dt)) ||
//           (b.start_time && b.start_time.toLowerCase().includes(dt)) ||
//           (b.end_time && b.end_time.toLowerCase().includes(dt))
//         )
//       ) {
//         return false;
//       }
//     }
//     // Email
//     if (filters.email && b.email && !b.email.toLowerCase().includes(filters.email.toLowerCase())) {
//       return false;
//     }
//     // Name (first or last)
//     if (
//       filters.name &&
//       !(
//         (b.first_name && b.first_name.toLowerCase().includes(filters.name.toLowerCase())) ||
//         (b.last_name && b.last_name.toLowerCase().includes(filters.name.toLowerCase()))
//       )
//     ) {
//       return false;
//     }
//     // Company
//     if (
//       filters.company &&
//       b.company_name &&
//       !b.company_name.toLowerCase().includes(filters.company.toLowerCase())
//     ) {
//       return false;
//     }
//     // Status
//     if (filters.status && b.status && b.status.toLowerCase() !== filters.status.toLowerCase()) {
//       return false;
//     }
//     // Phone
//     if (
//       filters.phone &&
//       b.mobile_number &&
//       !b.mobile_number.toLowerCase().includes(filters.phone.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });
// }

// export default function AdminDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [actionLoading, setActionLoading] = useState(null);
//   const [descModal, setDescModal] = useState({ open: false, description: "" });

//   // FILTER STATE
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     dateTime: "",
//     email: "",
//     name: "",
//     company: "",
//     status: "",
//     phone: "",
//   });
//   const [filteredBookings, setFilteredBookings] = useState([]);

//   const router = useRouter();

//   useEffect(() => {
//     fetchBookings();
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     setFilteredBookings(bookings);
//   }, [bookings]);

//   async function fetchBookings() {
//     setLoadingBookings(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/bookings");
//       if (!res.ok) throw new Error("Failed to fetch bookings");
//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       setBookings([]);
//     }
//     setLoadingBookings(false);
//   }

//   async function handleAccept(id) {
//     const meet_link = prompt("Enter Google Meet link for this demo:");
//     if (!meet_link) return;
//     setActionLoading(id);
//     await fetch(`http://localhost:5000/api/admin/bookings/${id}/accept`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ meet_link }),
//     });
//     await fetchBookings();
//     setActionLoading(null);
//   }

//   async function handleReject(id) {
//     if (!window.confirm("Are you sure you want to reject this demo request?")) return;
//     setActionLoading(id);
//     await fetch(`http://localhost:5000/api/admin/bookings/${id}/reject`, {
//       method: "POST",
//     });
//     await fetchBookings();
//     setActionLoading(null);
//   }

//   function handleJoin(link) {
//     window.open(link, "_blank");
//   }

//   function openDescModal(description) {
//     setDescModal({ open: true, description });
//   }

//   function closeDescModal() {
//     setDescModal({ open: false, description: "" });
//   }

//   function handleFilterChange(e) {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   }

//   function applyFilters() {
//     setFilteredBookings(filterBookings(bookings, filters));
//   }

//   function resetFilters() {
//     setFilters({
//       dateTime: "",
//       email: "",
//       name: "",
//       company: "",
//       status: "",
//       phone: "",
//     });
//     setFilteredBookings(bookings);
//   }

//   function handleAddSlots() {
//     router.push("/admin/add-slots");
//   }

//   return (
//     <main className="min-h-screen w-full flex flex-col items-center py-8 font-sans bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
//       <section
//         className="relative w-full max-w-[98vw] mx-auto rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-2 p-2 sm:p-8 animate-fade-in-up overflow-visible"
//         style={{
//           borderColor: "var(--theme-primary, #005e6a)",
//         }}
//       >
//         <div
//           className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
//           style={{
//             boxShadow: "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
//           }}
//         ></div>

//         <h1
//           className="text-2xl sm:text-4xl font-extrabold mb-6 text-center drop-shadow animate-fade-in"
//           style={{
//             color: "var(--theme-primary, #005e6a)",
//             letterSpacing: "0.01em",
//           }}
//         >
//           Admin Dashboard
//         </h1>
//         <div className="mb-6 sm:mb-10 animate-fade-in-up delay-100">
//           {/* <SlotCreateForm /> */}
//         </div>

//         <div className="animate-fade-in-up delay-150 w-full">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
//             <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "#005e6a" }}>
//               Requested Demos
//             </h2>
//             <div className="flex gap-2">
//               <button
//                 className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 transition-all text-sm font-semibold"
//                 onClick={handleAddSlots}
//               >
//                 View Slots
//               </button>
//               <button
//                 className="bg-[#005e6a] text-white px-4 py-2 rounded-lg shadow hover:bg-[#077e8d] transition-all text-sm font-semibold"
//                 onClick={() => setFiltersOpen((prev) => !prev)}
//               >
//                 {filtersOpen ? "Hide Filters" : "Filters"}
//               </button>
              
//             </div>
//           </div>

//           {/* FILTERS PANEL */}
//           {filtersOpen && (
//             <div className="mb-6 p-2 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] shadow flex flex-wrap items-end gap-2 animate-fade-in-up">
//               {/* 1. Date / Time */}
//               <div className="flex flex-col min-w-[110px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">Date/Time</label>
//                 <input
//                   type="text"
//                   name="dateTime"
//                   value={filters.dateTime}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                   placeholder="Date/Time"
//                 />
//               </div>
//               {/* 2. Email */}
//               <div className="flex flex-col min-w-[110px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">Email</label>
//                 <input
//                   type="text"
//                   name="email"
//                   value={filters.email}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                   placeholder="Email"
//                 />
//               </div>
//               {/* 3. Name (first/last) */}
//               <div className="flex flex-col min-w-[130px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">First/Last Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={filters.name}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                   placeholder="First or Last Name"
//                 />
//               </div>
//               {/* 4. Company */}
//               <div className="flex flex-col min-w-[110px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">Company</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={filters.company}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                   placeholder="Company Name"
//                 />
//               </div>
//               {/* 5. Status */}
//               <div className="flex flex-col min-w-[100px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">Status</label>
//                 <select
//                   name="status"
//                   value={filters.status}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                 >
//                   <option value="">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="accepted">Accepted</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//               {/* 6. Phone */}
//               <div className="flex flex-col min-w-[110px]">
//                 <label className="font-medium text-[#005e6a] text-xs mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={filters.phone}
//                   onChange={handleFilterChange}
//                   className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
//                   placeholder="Phone Number"
//                 />
//               </div>
//               {/* Apply & Reset Buttons */}
//               <div className="flex gap-1 ml-2 mt-4 mb-1">
//                 <button
//                   className="bg-[#005e6a] text-white px-3 py-1 rounded hover:bg-[#077e8d] transition-all text-sm font-semibold"
//                   onClick={applyFilters}
//                 >
//                   Apply Filters
//                 </button>
//                 <button
//                   className="bg-gray-200 text-[#005e6a] px-3 py-1 rounded hover:bg-gray-300 transition-all text-sm font-semibold"
//                   onClick={resetFilters}
//                   type="button"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* TABLE */}
//           {loadingBookings ? (
//             <div className="text-center py-8 text-lg text-gray-400">Loading...</div>
//           ) : (
//             <div className="w-full overflow-x-auto">
//               <table className="min-w-[1100px] w-full border border-[#005e6a] rounded-xl shadow text-sm bg-white">
//                 <thead>
//                   <tr className="bg-[#f5fafd] text-[#005e6a]">
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Slot</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">First Name</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Last Name</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Company</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Mobile</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Email</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap" style={{ width: 100 }}>Description</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Guests</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Status</th>
//                     <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredBookings.length === 0 && (
//                     <tr>
//                       <td colSpan={10} className="text-center text-gray-400 py-8 border">
//                         No demo bookings yet.
//                       </td>
//                     </tr>
//                   )}
//                   {filteredBookings.map((b) => (
//                     <tr
//                       key={b.id}
//                       className="border-b border-[#e0f2f7] hover:bg-[#eaf7fa]"
//                     >
//                       <td className="p-3 border border-[#e0f2f7] break-words font-medium max-w-[120px]">
//                         {b.date && b.start_time && b.end_time
//                           ? `${b.date} ${b.start_time}-${b.end_time}`
//                           : <span className="text-gray-400">Slot not found</span>}
//                       </td>
//                       <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.first_name}</td>
//                       <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.last_name}</td>
//                       <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.company_name}</td>
//                       <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.mobile_number}</td>
//                       <td className="p-3 border border-[#e0f2f7] break-all max-w-[220px]" style={{wordBreak:"break-all"}}>
//                         {b.email}
//                       </td>
//                       {/* DESCRIPTION: preview, click to open modal */}
//                       <td className="p-3 border border-[#e0f2f7] text-blue-700 cursor-pointer hover:underline" style={{width:100, maxWidth:100, minWidth:80}}>
//                         <span
//                           tabIndex={0}
//                           onClick={() => openDescModal(b.description || "")}
//                           title={b.description && b.description.length > 40 ? b.description : undefined}
//                           style={{
//                             display: "block",
//                             overflow: "hidden",
//                             whiteSpace: "nowrap",
//                             textOverflow: "ellipsis",
//                             maxWidth: 100
//                           }}
//                         >
//                           {b.description
//                             ? b.description.length > 40
//                               ? b.description.slice(0, 40) + "..."
//                               : b.description
//                             : ""}
//                         </span>
//                       </td>
//                       {/* GUESTS: single line, no wrap, no scroll */}
//                       <td className="p-3 border border-[#e0f2f7] max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis" style={{textOverflow: "ellipsis"}}>
//                         {b.guests}
//                       </td>
//                       <td className="p-3 border border-[#e0f2f7] font-semibold capitalize whitespace-nowrap">
//                         <span
//                           className={
//                             b.status === "pending"
//                               ? "text-yellow-600"
//                               : b.status === "accepted"
//                               ? "text-green-700"
//                               : "text-red-600"
//                           }
//                         >
//                           {b.status}
//                         </span>
//                       </td>
//                       <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           {b.status === "pending" && (
//                             <>
//                               <button
//                                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-60 transition-all border border-green-700"
//                                 onClick={() => handleAccept(b.id)}
//                                 disabled={actionLoading === b.id}
//                               >
//                                 {actionLoading === b.id ? "Accepting..." : "Accept"}
//                               </button>
//                               <button
//                                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-60 transition-all border border-red-700"
//                                 onClick={() => handleReject(b.id)}
//                                 disabled={actionLoading === b.id}
//                               >
//                                 {actionLoading === b.id ? "Rejecting..." : "Reject"}
//                               </button>
//                             </>
//                           )}
//                           {b.status === "accepted" && b.meet_link && (
//                             <button
//                               className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition-all border border-blue-900"
//                               onClick={() => handleJoin(b.meet_link)}
//                             >
//                               Join
//                             </button>
//                           )}
//                           {b.status === "rejected" && (
//                             <span className="text-red-600 font-bold">Rejected</span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Description Modal */}
//       {descModal.open && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//           onClick={closeDescModal}
//         >
//           <div
//             className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-[90vw] relative"
//             onClick={e => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
//               onClick={closeDescModal}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//             <h3 className="text-lg font-semibold mb-3 text-[#005e6a]">Full Description</h3>
//             <div className="whitespace-pre-line text-gray-800 max-h-[50vh] overflow-y-auto">
//               {descModal.description}
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }



import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SlotCreateForm from "@/components/SlotCreateForm";

// Simple utility for filtering
function filterBookings(bookings, filters) {
  return bookings.filter((b) => {
    if (filters.dateTime) {
      const dt = filters.dateTime.toLowerCase();
      if (
        !(
          (b.date && b.date.toLowerCase().includes(dt)) ||
          (b.start_time && b.start_time.toLowerCase().includes(dt)) ||
          (b.end_time && b.end_time.toLowerCase().includes(dt))
        )
      ) {
        return false;
      }
    }
    if (filters.email && b.email && !b.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (
      filters.name &&
      !(
        (b.first_name && b.first_name.toLowerCase().includes(filters.name.toLowerCase())) ||
        (b.last_name && b.last_name.toLowerCase().includes(filters.name.toLowerCase()))
      )
    ) {
      return false;
    }
    if (
      filters.company &&
      b.company_name &&
      !b.company_name.toLowerCase().includes(filters.company.toLowerCase())
    ) {
      return false;
    }
    if (filters.status && b.status && b.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    if (
      filters.phone &&
      b.mobile_number &&
      !b.mobile_number.toLowerCase().includes(filters.phone.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [descModal, setDescModal] = useState({ open: false, description: "" });

  // FILTER STATE
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateTime: "",
    email: "",
    name: "",
    company: "",
    status: "",
    phone: "",
  });
  const [filteredBookings, setFilteredBookings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setBookings([]);
    }
    setLoadingBookings(false);
  }

  async function handleAccept(id) {
    const meet_link = prompt("Enter Google Meet link for this demo:");
    if (!meet_link) return;
    setActionLoading(id);
    await fetch(`http://localhost:5000/api/admin/bookings/${id}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meet_link }),
    });
    await fetchBookings();
    setActionLoading(null);
  }

  async function handleReject(id) {
    if (!window.confirm("Are you sure you want to reject this demo request?")) return;
    setActionLoading(id);
    await fetch(`http://localhost:5000/api/admin/bookings/${id}/reject`, {
      method: "POST",
    });
    await fetchBookings();
    setActionLoading(null);
  }

  function handleJoin(link) {
    window.open(link, "_blank");
  }

  function openDescModal(description) {
    setDescModal({ open: true, description });
  }

  function closeDescModal() {
    setDescModal({ open: false, description: "" });
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function applyFilters() {
    setFilteredBookings(filterBookings(bookings, filters));
  }

  function resetFilters() {
    setFilters({
      dateTime: "",
      email: "",
      name: "",
      company: "",
      status: "",
      phone: "",
    });
    setFilteredBookings(bookings);
  }

  function handleAddSlots() {
    router.push("/admin/add-slots");
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 font-sans bg-gradient-to-br from-[#005e6a] to-[#e6f7fa]">
      <section
        className="relative w-full max-w-[98vw] mx-auto rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-2 p-2 sm:p-8 animate-fade-in-up overflow-visible"
        style={{
          borderColor: "var(--theme-primary, #005e6a)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
          style={{
            boxShadow: "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
          }}
        ></div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold mb-6 text-center drop-shadow animate-fade-in"
          style={{
            color: "var(--theme-primary, #005e6a)",
            letterSpacing: "0.01em",
          }}
        >
          Admin Dashboard
        </h1>
        <div className="mb-6 sm:mb-10 animate-fade-in-up delay-100">
          {/* <SlotCreateForm /> */}
        </div>

        <div className="animate-fade-in-up delay-150 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "#005e6a" }}>
              Requested Demos
            </h2>
            <div className="flex gap-2">
              <button
                className="bg-[#005e6a] text-white px-4 py-2 rounded-lg shadow hover:bg-[#077e8d] transition-all text-sm font-semibold"
                onClick={() => setFiltersOpen((prev) => !prev)}
              >
                {filtersOpen ? "Hide Filters" : "Filters"}
              </button>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 transition-all text-sm font-semibold"
                onClick={handleAddSlots}
              >
                View Slots
              </button>
            </div>
          </div>

          {/* FILTERS PANEL - full width grid */}
          {filtersOpen && (
            <div className="mb-6 p-4 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] shadow animate-fade-in-up">
              <form
                className="w-full grid grid-cols-1 md:grid-cols-7 gap-3 items-end"
                onSubmit={e => { e.preventDefault(); applyFilters(); }}
              >
                {/* 1. Date / Time */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Date/Time</label>
                  <input
                    type="text"
                    name="dateTime"
                    value={filters.dateTime}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                    placeholder="Date/Time"
                  />
                </div>
                {/* 2. Email */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                    placeholder="Email"
                  />
                </div>
                {/* 3. Name (first/last) */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">First/Last Name</label>
                  <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                    placeholder="First or Last Name"
                  />
                </div>
                {/* 4. Company */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={filters.company}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                    placeholder="Company Name"
                  />
                </div>
                {/* 5. Status */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                {/* 6. Phone */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={filters.phone}
                    onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm"
                    placeholder="Phone Number"
                  />
                </div>
                {/* Apply & Reset Buttons */}
                <div className="flex gap-2 w-full mt-4 md:mt-0">
                  <button
                    className="bg-[#005e6a] text-white px-3 py-2 w-full rounded hover:bg-[#077e8d] transition-all text-sm font-semibold"
                    type="submit"
                  >
                    Apply Filters
                  </button>
                  <button
                    className="bg-gray-200 text-[#005e6a] px-3 py-2 w-full rounded hover:bg-gray-300 transition-all text-sm font-semibold"
                    onClick={resetFilters}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TABLE */}
          {loadingBookings ? (
            <div className="text-center py-8 text-lg text-gray-400">Loading...</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-[1100px] w-full border border-[#005e6a] rounded-xl shadow text-sm bg-white">
                <thead>
                  <tr className="bg-[#f5fafd] text-[#005e6a]">
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Slot</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">First Name</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Last Name</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Company</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Mobile</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Email</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap" style={{ width: 100 }}>Description</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Guests</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Status</th>
                    <th className="p-3 border border-[#c5e7ee] text-left whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center text-gray-400 py-8 border">
                        No demo bookings yet.
                      </td>
                    </tr>
                  )}
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-[#e0f2f7] hover:bg-[#eaf7fa]"
                    >
                      <td className="p-3 border border-[#e0f2f7] break-words font-medium max-w-[120px]">
                        {b.date && b.start_time && b.end_time
                          ? `${b.date} ${b.start_time}-${b.end_time}`
                          : <span className="text-gray-400">Slot not found</span>}
                      </td>
                      <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.first_name}</td>
                      <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.last_name}</td>
                      <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.company_name}</td>
                      <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">{b.mobile_number}</td>
                      <td className="p-3 border border-[#e0f2f7] break-all max-w-[220px]" style={{wordBreak:"break-all"}}>
                        {b.email}
                      </td>
                      {/* DESCRIPTION: preview, click to open modal */}
                      <td className="p-3 border border-[#e0f2f7] text-blue-700 cursor-pointer hover:underline" style={{width:100, maxWidth:100, minWidth:80}}>
                        <span
                          tabIndex={0}
                          onClick={() => openDescModal(b.description || "")}
                          title={b.description && b.description.length > 40 ? b.description : undefined}
                          style={{
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: 100
                          }}
                        >
                          {b.description
                            ? b.description.length > 40
                              ? b.description.slice(0, 40) + "..."
                              : b.description
                            : ""}
                        </span>
                      </td>
                      {/* GUESTS: single line, no wrap, no scroll */}
                      <td className="p-3 border border-[#e0f2f7] max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis" style={{textOverflow: "ellipsis"}}>
                        {b.guests}
                      </td>
                      <td className="p-3 border border-[#e0f2f7] font-semibold capitalize whitespace-nowrap">
                        <span
                          className={
                            b.status === "pending"
                              ? "text-yellow-600"
                              : b.status === "accepted"
                              ? "text-green-700"
                              : "text-red-600"
                          }
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 border border-[#e0f2f7] whitespace-nowrap">
                        <div className="flex flex-col sm:flex-row gap-2">
                          {b.status === "pending" && (
                            <>
                              <button
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-60 transition-all border border-green-700"
                                onClick={() => handleAccept(b.id)}
                                disabled={actionLoading === b.id}
                              >
                                {actionLoading === b.id ? "Accepting..." : "Accept"}
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-60 transition-all border border-red-700"
                                onClick={() => handleReject(b.id)}
                                disabled={actionLoading === b.id}
                              >
                                {actionLoading === b.id ? "Rejecting..." : "Reject"}
                              </button>
                            </>
                          )}
                          {b.status === "accepted" && b.meet_link && (
                            <button
                              className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition-all border border-blue-900"
                              onClick={() => handleJoin(b.meet_link)}
                            >
                              Join
                            </button>
                          )}
                          {b.status === "rejected" && (
                            <span className="text-red-600 font-bold">Rejected</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Description Modal */}
      {descModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={closeDescModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-[90vw] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
              onClick={closeDescModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-3 text-[#005e6a]">Full Description</h3>
            <div className="whitespace-pre-line text-gray-800 max-h-[50vh] overflow-y-auto">
              {descModal.description}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}