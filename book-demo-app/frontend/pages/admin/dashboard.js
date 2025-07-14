
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Utility for formatting local date as "YYYY-MM-DD"
function toLocalDateString(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

  // Reschedule Modal State
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });

  // Calendar State for Reschedule
  const [slots, setSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState(new Set());
  const [selectedRescheduleDate, setSelectedRescheduleDate] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchBookings();
    // Don't fetch slots until reschedule modal opens
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setBookings([]);
    }
    setLoadingBookings(false);
  }

  async function fetchSlots() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/admin/slots`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSlots(data);

      // Only dates from today onward, remove past dates
      const todayStr = toLocalDateString(new Date());
      const dates = new Set(
        data
          .map(slot => slot.date)
          .filter(date => date >= todayStr)
      );
      setAvailableDates(dates);
    } catch (err) {
      setSlots([]);
      setAvailableDates(new Set());
    }
  }

  async function handleAccept(id) {
    const meet_link = prompt("Enter Google Meet link for this demo:");
    if (!meet_link) return;
    setActionLoading(id);
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_BASE_URL}/api/admin/bookings/${id}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ meet_link }),
    });
    await fetchBookings();
    setActionLoading(null);
  }

  function openRescheduleModal(b) {
    setRescheduleBooking(b);
    setRescheduleForm({
      date: "",
      start_time: "",
      end_time: "",
    });
    setSelectedRescheduleDate(null);
    setShowRescheduleModal(true);
    fetchSlots(); // fetch slots only when modal is opened
  }

  function closeRescheduleModal() {
    setShowRescheduleModal(false);
    setRescheduleBooking(null);
    setRescheduleForm({
      date: "",
      start_time: "",
      end_time: "",
    });
    setSelectedRescheduleDate(null);
  }

  function handleRescheduleFormChange(e) {
    const { name, value } = e.target;
    setRescheduleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRescheduleSubmit(e) {
    e.preventDefault();
    if (!rescheduleBooking) return;
    setActionLoading(rescheduleBooking.id);
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_BASE_URL}/api/admin/bookings/${rescheduleBooking.id}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        date: rescheduleForm.date,
        start_time: rescheduleForm.start_time,
        end_time: rescheduleForm.end_time,
      }),
    });
    await fetchBookings();
    setActionLoading(null);
    closeRescheduleModal();
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

  // Calendar logic for reschedule modal
  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) return true;
    const dateStr = toLocalDateString(date);
    return !availableDates.has(dateStr);
  }

  function tileClassName({ date, view }) {
    if (view !== "month") return "";
    const dateStr = toLocalDateString(date);
    if (availableDates.has(dateStr)) {
      return "calendar-available";
    }
    return "";
  }

  const minDate = new Date();
  minDate.setHours(0,0,0,0);

  function handleActiveStartDateChange({ activeStartDate }) {
    if (activeStartDate < minDate) {
      setSelectedRescheduleDate(minDate);
    }
  }

  // When user selects date from calendar in reschedule modal, update form
  function handleRescheduleDateChange(dateObj) {
    setSelectedRescheduleDate(dateObj);
    const dateStr = toLocalDateString(dateObj);
    setRescheduleForm((prev) => ({
      ...prev,
      date: dateStr,
      start_time: "",
      end_time: "",
    }));
  }

  // Get available slots for selected date
  const slotsForSelectedDate = selectedRescheduleDate
    ? slots.filter(slot => slot.date === toLocalDateString(selectedRescheduleDate))
    : [];

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 font-sans bg-gradient-to-br bg-gray-300">
      <section
        className="relative w-full h-full max-w-[98vw] mx-auto rounded-lg bg-white/95  border-1 p-2 sm:p-8 animate-fade-in-up overflow-visible"
        style={{
          borderColor: "var(--theme-primary, #005e6a)",
        }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            boxShadow: "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
          }}
        ></div>

        <h1
          className="text-xl sm:text-4xl font-medium mb-6 text-center drop-shadow animate-fade-in"
          style={{
            color: "var(--theme-primary, #005e6a)",
            letterSpacing: "0.01em",
          }}
        >
          Admin Dashboard
        </h1>

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

          {/* FILTERS PANEL */}
          {filtersOpen && (
            <div className="mb-6 p-4 bg-[#f5fafd] rounded-xl border border-[#bfe7ef] shadow animate-fade-in-up">
              <form
                className="w-full grid grid-cols-1 md:grid-cols-8 gap-3 items-end"
                onSubmit={e => { e.preventDefault(); applyFilters(); }}
              >
                {/* ... filter fields ... */}
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Date/Time</label>
                  <input type="text" name="dateTime" value={filters.dateTime} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm" placeholder="Date/Time" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Email</label>
                  <input type="text" name="email" value={filters.email} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm" placeholder="Email" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">First/Last Name</label>
                  <input type="text" name="name" value={filters.name} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm" placeholder="First or Last Name" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Company</label>
                  <input type="text" name="company" value={filters.company} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm" placeholder="Company Name" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Status</label>
                  <select name="status" value={filters.status} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-[#005e6a] text-xs mb-1">Phone Number</label>
                  <input type="text" name="phone" value={filters.phone} onChange={handleFilterChange}
                    className="px-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#005e6a] text-sm" placeholder="Phone Number" />
                </div>
                <div className="flex flex-col w-full gap-2 md:justify-end md:items-end">
                  <button className="bg-[#005e6a] text-white px-3 py-2 w-full rounded hover:bg-[#077e8d] transition-all text-sm font-semibold" type="submit">
                    Apply Filters
                  </button>
                  <button className="bg-gray-200 text-[#005e6a] px-3 py-2 w-full rounded hover:bg-gray-300 transition-all text-sm font-semibold"
                    onClick={resetFilters} type="button">
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
                      <td className="p-3 border border-[#e0f2f7] break-all max-w-[220px]" style={{ wordBreak: "break-all" }}>
                        {b.email}
                      </td>
                      <td className="p-3 border border-[#e0f2f7] text-blue-700 cursor-pointer hover:underline" style={{ width: 100, maxWidth: 100, minWidth: 80 }}>
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
                      <td className="p-3 border border-[#e0f2f7] max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ textOverflow: "ellipsis" }}>
                        {b.guests}
                      </td>
                      <td className="p-3 border border-[#e0f2f7] font-semibold capitalize whitespace-nowrap">
                        <span
                          className={
                            b.status === "pending"
                              ? "text-yellow-600"
                              : b.status === "accepted"
                                ? "text-green-700"
                                : "text-green-600"
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
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:opacity-60 transition-all border border-yellow-700"
                                onClick={() => openRescheduleModal(b)}
                                disabled={actionLoading === b.id}
                              >
                                Reschedule
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
            className="bg-white rounded-sm shadow-xl p-6 max-w-xl w-[90vw] relative"
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

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={closeRescheduleModal}>
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
              onClick={closeRescheduleModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#005e6a]">Reschedule Booking</h3>
            <div>
              <label className="block font-medium mb-2 text-[#005e6a]">Select Date (Available Only)</label>
              <Calendar
                onChange={handleRescheduleDateChange}
                value={selectedRescheduleDate}
                minDate={minDate}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                onActiveStartDateChange={handleActiveStartDateChange}
                prevLabel={null}
                prev2Label={null}
              />
              <style jsx>{`
                .calendar-available {
                  background: #e8fff1 !important;
                  border-radius: 50%;
                }
                .react-calendar__tile--active {
                  background: #3ecbdb !important;
                  color: white !important;
                }
                .react-calendar__tile:disabled {
                  background: #f5fafd !important;
                  color: #aaa !important;
                }
              `}</style>
            </div>
            {selectedRescheduleDate && (
              <form onSubmit={handleRescheduleSubmit} className="flex flex-col gap-4 mt-4">
                <div>
                  <label className="block mb-1 font-medium text-sm text-[#005e6a]">Start Time</label>
                  <select
                    name="start_time"
                    value={rescheduleForm.start_time}
                    onChange={handleRescheduleFormChange}
                    className="px-3 py-2 border rounded w-full text-sm"
                    required
                  >
                    <option value="">Select Start Time</option>
                    {slotsForSelectedDate.map(slot => (
                      <option key={slot.id} value={slot.start_time}>{slot.start_time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm text-[#005e6a]">End Time</label>
                  <select
                    name="end_time"
                    value={rescheduleForm.end_time}
                    onChange={handleRescheduleFormChange}
                    className="px-3 py-2 border rounded w-full text-sm"
                    required
                  >
                    <option value="">Select End Time</option>
                    {slotsForSelectedDate.map(slot => (
                      <option key={slot.id} value={slot.end_time}>{slot.end_time}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-semibold mt-2"
                  disabled={actionLoading === (rescheduleBooking && rescheduleBooking.id)}
                >
                  {actionLoading === (rescheduleBooking && rescheduleBooking.id) ? "Rescheduling..." : "Reschedule"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}