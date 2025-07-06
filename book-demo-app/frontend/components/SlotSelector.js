import { formatTimeRange } from "./TimeHelpers";

export default function SlotSelector({ slots, onSlotSelect, selectedSlot, loading }) {
  if (loading) return <div>Loading slots...</div>;
  if (!slots || slots.length === 0) return <div>No slots available for this date.</div>;

  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => onSlotSelect(slot)}
          className={`px-4 py-2 rounded border transition ${
            selectedSlot && selectedSlot.id === slot.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
          }`}
        >
          {formatTimeRange(slot.start_time, slot.end_time)}
        </button>
      ))}
    </div>
  );
}