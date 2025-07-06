// import Link from "next/link";
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4">
//       <div className="bg-white/90 backdrop-blur-md shadow-xl max-w-2xl w-full p-10 rounded-3xl flex flex-col items-center border border-blue-100">
//         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center mb-6 shadow-md">
//           <span className="text-white text-3xl font-bold tracking-wider">S</span>
//         </div>
//         <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900 drop-shadow-lg">
//           SAMS Pvt Ltd
//         </h1>
//         <p className="mb-3 text-lg sm:text-xl text-gray-700 font-medium">
//           Powering Digital Transformation Worldwide
//         </p>
//         <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center mb-6">
//           <div className="bg-blue-50 border border-blue-100 rounded-lg px-5 py-3 flex flex-col items-center w-full sm:w-1/2">
//             <span className="font-semibold text-blue-700">Contact</span>
//             <span className="text-gray-600 text-sm">samarth@sams.com</span>
//             <span className="text-gray-600 text-sm">+91 9833431924</span>
//           </div>
//           <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-5 py-3 flex flex-col items-center w-full sm:w-1/2">
//             <span className="font-semibold text-indigo-700">Location</span>
//             <span className="text-gray-600 text-sm text-center">Virtual (Worldwide demos available)</span>
//           </div>
//         </div>
//         <p className="mb-8 text-gray-500 text-base sm:text-lg max-w-xl text-center">
//           Discover how our innovative solutions can drive success for your business.<br />
//           Schedule a personalized demo with our expert team.
//         </p>
//         <Link
//           href="/book-demo"
//           className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transform transition-all duration-200 hover:from-indigo-500 hover:to-blue-600"
//         >
//           🚀 Book a Demo
//         </Link>
//         <div className="mt-10 text-xs text-gray-400 tracking-wide">
//           &copy; {new Date().getFullYear()} SAMS Pvt Ltd. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// }







// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 flex items-center justify-center py-6 px-2 sm:px-4">
//       <div className="bg-white/90 backdrop-blur-md shadow-2xl max-w-2xl w-full p-6 sm:p-10 rounded-3xl flex flex-col items-center border border-blue-100 transition-all duration-300">
//         {/* Logo avatar with nice animation */}
//         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center mb-6 shadow-lg animate-fade-in-up">
//           <span className="text-white text-4xl font-extrabold tracking-widest select-none">S</span>
//         </div>
//         {/* Title */}
//         <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900 drop-shadow-lg text-center animate-fade-in">
//           SAMS Pvt Ltd
//         </h1>
//         <p className="mb-3 text-lg sm:text-xl text-gray-700 font-medium text-center animate-fade-in delay-100">
//           Powering Digital Transformation Worldwide
//         </p>
//         {/* Contact & Location - responsive card grid */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-stretch mb-6 animate-fade-in delay-150">
//           <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex-1 flex flex-col items-center shadow hover:shadow-md transition">
//             <span className="font-semibold text-blue-700 mb-1">Contact</span>
//             <span className="text-gray-600 text-sm">samarth@sams.com</span>
//             <span className="text-gray-600 text-sm">+91 9833431924</span>
//           </div>
//           <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 flex-1 flex flex-col items-center shadow hover:shadow-md transition">
//             <span className="font-semibold text-indigo-700 mb-1">Location</span>
//             <span className="text-gray-600 text-sm text-center">Virtual (Worldwide demos available)</span>
//           </div>
//         </div>
//         <p className="mb-8 text-gray-500 text-base sm:text-lg max-w-xl text-center animate-fade-in delay-200">
//           Discover how our innovative solutions can drive success for your business.<br />
//           <span className="block mt-1">Schedule a personalized demo with our expert team.</span>
//         </p>
//         {/* CTA Button */}
//         <Link
//           href="/book-demo"
//           className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 focus:scale-105 active:scale-95 transform transition-all duration-200 hover:from-indigo-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 animate-fade-in delay-300"
//         >
//           🚀 Book a Demo
//         </Link>
//         <div className="mt-10 text-xs text-gray-400 tracking-wide text-center animate-fade-in delay-500">
//           &copy; {new Date().getFullYear()} SAMS Pvt Ltd. All rights reserved.
//         </div>
//       </div>
//       {/* Animations (Tailwind custom, see tailwind.config.js) */}
//       <style jsx global>{`
//         @media (max-width: 640px) {
//           .rounded-3xl { border-radius: 1.5rem !important; }
//         }
//       `}</style>
//     </div>
//   );
// }




import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-fuchsia-100 to-yellow-100 flex items-center justify-center font-sans overflow-auto">
      <div className="relative bg-white/80 backdrop-blur-2xl shadow-2xl w-[99vw] h-[99vh] max-w-2xl max-h-[700px] p-2 sm:p-8 rounded-3xl flex flex-col items-center border-2 border-gradient-to-r from-blue-300 via-fuchsia-200 to-yellow-200 animate-fade-in-up transition-all duration-700 mx-auto my-auto overflow-y-auto">
        {/* Animated Border Shimmer */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent" style={{boxShadow:"0 0 40px 3px #a78bfa55, 0 0 0 8px #fef3c755 inset"}}></div>

        {/* Logo avatar with nice animation */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-fuchsia-400 to-yellow-400 flex items-center justify-center mb-8 shadow-lg animate-bounce-in border-4 border-white/80 z-10">
          <span className="text-white text-4xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
        </div>
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1 bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow text-center animate-fade-in">
          SAMS Pvt Ltd
        </h1>
        <p className="mb-2 text-base sm:text-lg text-gray-700 font-medium text-center animate-fade-in delay-100">
          Powering Digital Transformation Worldwide
        </p>
        {/* Contact & Location - responsive card grid */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full justify-center items-stretch mb-4 animate-fade-in delay-150">
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl px-4 py-3 flex-1 flex flex-col items-center shadow hover:shadow-md transition min-w-[120px]">
            <span className="font-semibold text-blue-700 mb-1">Contact</span>
            <span className="text-gray-600 text-xs sm:text-sm break-all">samarth@sams.com</span>
            <span className="text-gray-600 text-xs sm:text-sm">+91 9833431924</span>
          </div>
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl px-4 py-3 flex-1 flex flex-col items-center shadow hover:shadow-md transition min-w-[120px]">
            <span className="font-semibold text-indigo-700 mb-1">Location</span>
            <span className="text-gray-600 text-xs sm:text-sm text-center">Virtual (Worldwide demos available)</span>
          </div>
        </div>
        <p className="mb-6 text-gray-500 text-xs sm:text-base max-w-xl text-center animate-fade-in delay-200">
          Discover how our <span className="text-fuchsia-500 font-semibold">innovative solutions</span> can drive success for your business.<br />
          <span className="block mt-1">Schedule a personalized demo with our expert team.</span>
        </p>
        {/* CTA Button */}
        <Link
          href="/book-demo"
          className="inline-block bg-gradient-to-r from-blue-600 via-fuchsia-500 to-yellow-400 shadow-lg text-white px-7 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-xl hover:scale-105 focus:scale-105 active:scale-95 transform transition-all duration-200 hover:from-fuchsia-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 animate-fade-in delay-300"
        >
          🚀 Book a Demo
        </Link>
        <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-gray-400 tracking-wide text-center animate-fade-in delay-500">
          &copy; {new Date().getFullYear()} SAMS Pvt Ltd. All rights reserved.
        </div>
      </div>
      {/* Animations (Tailwind custom, see tailwind.config.js) */}
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          min-height: 0;
        }
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