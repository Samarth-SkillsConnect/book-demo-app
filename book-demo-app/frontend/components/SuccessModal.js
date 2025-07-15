import { formatTimeRange } from "./TimeHelpers";

export default function SuccessModal({ data, onClose }) {

  const themePrimary = "var(--theme-primary)";
  const themePrimaryLight = "var(--theme-primary-light)";
  const themeCard = "var(--theme-card)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-3 py-6 animate-fade-in bg-gray-600/50"
    
    >
  
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-transparent"
        style={{
          boxShadow: "0 0 40px 3px #005e6a33, 0 0 0 8px #3ecbdb22 inset"
        }}
      />
      <div
        className="relative rounded-2xl shadow-2xl px-4 py-8 sm:px-8 w-full max-w-md text-center animate-fade-in-up transition-all duration-700 z-10"
        style={{
          background: themeCard,
          borderColor: themePrimary,
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce-in"
            style={{
              background: themePrimaryLight
            }}
          >
            <svg className="w-10 h-10 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 7.293a1 1 0 00-1.414 0L9 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-normal mb-3 drop-shadow animate-fade-in"
          style={{ color: themePrimary }}
        >
          Demo request has been initiated Successfully!
        </h2>
        <p className=" text-gray-500 text-md" >
          Thank you <span className="font-semibold">{data.first_name} {data.last_name}</span> for booking a demo.
        </p>
        <p className=" text-gray-500 text-md">
          A confirmation has been sent to <span className="font-semibold text-teal-800">{data.email}</span>
        </p>
        {data.guests && data.guests.length > 0 && (
          <p className="mt-2 text-xs" style={{ color: themePrimaryLight }}>
            Your guests will also receive the invite:
            <span className="block text-gray-900 font-semibold">{data.guests.join(", ")}</span>
          </p>
        )}
        <div className="mt-2 flex flex-col items-center justify-center text-sm sm:text-base">
          <span>
            <span className="font-semibold" style={{ color: themePrimary }}>Date:</span> <span className="font-semibold">{data.date}</span>
          </span>
          <span>
            <span className="font-semibold" style={{ color: themePrimary }}>Time:</span>{" "}
            <span className="font-semibold">{formatTimeRange(data.start_time, data.end_time)}</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="mt-7 w-full py-2.5 rounded-full font-bold text-lg shadow-md transition-all duration-200 animate-fade-in-up delay-200"
          style={{
            background: `linear-gradient(90deg, var(--theme-primary, #005e6a) 0%, var(--theme-primary-light, #3ecbdb) 100%)`,
            color: "#fff"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}