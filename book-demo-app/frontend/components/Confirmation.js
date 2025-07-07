export default function Confirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-2 text-green-600">Booking Confirmed!</h2>
        <p className="mb-1">Thank you for your booking.</p>
        <p className="mb-1">Check your email for confirmation.</p>
      </div>
    </div>
  );
}