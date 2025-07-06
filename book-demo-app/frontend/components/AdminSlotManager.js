import { useState } from "react";

export default function AdminSlotManager() {
  const [slots, setSlots] = useState(["10:00 AM", "11:00 AM", "12:00 PM"]);
  const [newSlot, setNewSlot] = useState("");

  const addSlot = (e) => {
    e.preventDefault();
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot]);
      setNewSlot("");
    }
  };

  const removeSlot = (slot) => {
    setSlots(slots.filter((s) => s !== slot));
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Slots</h2>
      <form onSubmit={addSlot} className="flex mb-4 gap-2">
        <input
          type="text"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Add slot (e.g. 2:00 PM)"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add
        </button>
      </form>
      <ul>
        {slots.map((slot) => (
          <li key={slot} className="flex items-center justify-between py-1">
            <span>{slot}</span>
            <button
              className="text-red-600 hover:underline"
              onClick={() => removeSlot(slot)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}