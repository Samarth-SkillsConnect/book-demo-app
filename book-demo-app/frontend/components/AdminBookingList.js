import { useState } from "react";

// Dummy data for illustration
const dummyBookings = [
  { id: 1, name: "Alice", email: "alice@example.com", slot: "10:00 AM" },
  { id: 2, name: "Bob", email: "bob@example.com", slot: "11:00 AM" }
];

export default function AdminBookingList() {
  const [bookings] = useState(dummyBookings);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left px-2 py-1">Name</th>
            <th className="text-left px-2 py-1">Email</th>
            <th className="text-left px-2 py-1">Slot</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border-t px-2 py-1">{b.name}</td>
              <td className="border-t px-2 py-1">{b.email}</td>
              <td className="border-t px-2 py-1">{b.slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}