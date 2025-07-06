// export default function CompanyInfo() {
//   return (
//     <div className="text-center">
//       <h1 className="text-3xl font-bold mb-2">Book a Live Demo</h1>
//       <p className="text-gray-700 mb-4">
//         Experience our digital products firsthand! Schedule a personalized demo with our experts and discover how our solutions can help your business grow.
//       </p>
//       <div className="text-sm text-gray-500">
//         <p><strong>Contact:</strong> samarth@sams.com | +91 9833431924</p>
//         <p><strong>Location:</strong> Worldwide (virtual demos)</p>
//       </div>
//     </div>
//   );
// }

export default function CompanyInfo() {
  return (
    <div className="text-center w-full animate-fade-in-up bg-white/60 backdrop-blur rounded-2xl px-4 sm:px-8 py-6 shadow-card mb-4 border border-blue-100 relative z-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow animate-fade-in">
        Book a Live Demo
      </h1>
      <p className="text-gray-700 text-base sm:text-lg mb-4 animate-fade-in delay-100">
        Experience our digital products firsthand!&nbsp;
        <span className="text-fuchsia-500 font-semibold">Schedule a personalized demo</span> with our experts and discover how our solutions can help your business grow.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500 animate-fade-in delay-150">
        <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2 shadow hover:shadow-md transition">
          <span className="font-semibold text-blue-700">Contact:</span>
          <span className="break-all">samarth@sams.com</span>
          <span className="hidden sm:inline">|</span>
          <span>+91 9833431924</span>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2 shadow hover:shadow-md transition">
          <span className="font-semibold text-indigo-700">Location:</span>
          <span>Worldwide (virtual demos)</span>
        </div>
      </div>
    </div>
  );
}