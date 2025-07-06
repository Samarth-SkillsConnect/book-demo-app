import { formatTimeRange } from "./TimeHelpers";

export default function SuccessModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Demo Booked Successfully!</h2>
        <p>Thank you <span className="font-semibold">{data.first_name} {data.last_name}</span> for booking a demo.</p>
        <p className="mt-2">A confirmation has been sent to <span className="font-semibold">{data.email}</span></p>
        {data.guests && data.guests.length > 0 && (
          <p className="mt-2">
            Your guests will also receive the invite: <span className="text-xs text-gray-700">{data.guests.join(", ")}</span>
          </p>
        )}
        <p className="mt-2">Date: <span className="font-semibold">{data.date}</span></p>
        <p>Time: <span className="font-semibold">{formatTimeRange(data.start_time, data.end_time)}</span></p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}