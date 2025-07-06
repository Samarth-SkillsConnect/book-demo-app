// import { formatTimeRange } from "./TimeHelpers";

// export default function SuccessModal({ data, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold text-green-600 mb-4">Demo Booked Successfully!</h2>
//         <p>Thank you <span className="font-semibold">{data.first_name} {data.last_name}</span> for booking a demo.</p>
//         <p className="mt-2">A confirmation has been sent to <span className="font-semibold">{data.email}</span></p>
//         {data.guests && data.guests.length > 0 && (
//           <p className="mt-2">
//             Your guests will also receive the invite: <span className="text-xs text-gray-700">{data.guests.join(", ")}</span>
//           </p>
//         )}
//         <p className="mt-2">Date: <span className="font-semibold">{data.date}</span></p>
//         <p>Time: <span className="font-semibold">{formatTimeRange(data.start_time, data.end_time)}</span></p>
//         <button
//           onClick={onClose}
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }


import { formatTimeRange } from "./TimeHelpers";

export default function SuccessModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-200/70 via-fuchsia-200/60 to-yellow-100/70 flex items-center justify-center px-3 py-6 animate-fade-in">
      {/* Shimmering border animation */}
      <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl border-4 border-transparent border-gradient-to-r from-blue-300 via-fuchsia-200 to-yellow-100" style={{boxShadow:"0 0 40px 3px #a78bfa55, 0 0 0 8px #fef3c755 inset"}} />
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl px-4 py-8 sm:px-8 w-full max-w-md text-center border-2 border-gradient-to-r from-blue-200 via-fuchsia-100 to-yellow-100 animate-fade-in-up transition-all duration-700 z-10">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 via-fuchsia-400 to-yellow-400 flex items-center justify-center shadow-lg animate-bounce-in">
            <svg className="w-10 h-10 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 7.293a1 1 0 00-1.414 0L9 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent mb-2 drop-shadow animate-fade-in">
          Demo Booked Successfully!
        </h2>
        <p className="mb-1 text-blue-800">
          Thank you <span className="font-semibold">{data.first_name} {data.last_name}</span> for booking a demo.
        </p>
        <p className="text-gray-700">
          A confirmation has been sent to <span className="font-semibold">{data.email}</span>
        </p>
        {data.guests && data.guests.length > 0 && (
          <p className="mt-2 text-fuchsia-700 text-xs">
            Your guests will also receive the invite:
            <span className="block text-gray-900 font-semibold">{data.guests.join(", ")}</span>
          </p>
        )}
        <div className="mt-2 flex flex-col items-center justify-center text-sm sm:text-base">
          <span>
            <span className="font-semibold text-blue-700">Date:</span> <span className="font-semibold">{data.date}</span>
          </span>
          <span>
            <span className="font-semibold text-blue-700">Time:</span> <span className="font-semibold">{formatTimeRange(data.start_time, data.end_time)}</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="mt-7 w-full bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 text-white py-2.5 rounded-full font-bold text-lg shadow-md hover:from-fuchsia-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-200 animate-fade-in-up delay-200"
        >
          Close
        </button>
      </div>
      <style jsx global>{`
        .border-gradient-to-r {
          background: linear-gradient(90deg, #60a5fa44, #a78bfa44, #fef3c744);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}