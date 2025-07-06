// import { useState } from "react";
// import BookingForm from "../components/BookingForm";

// export default function Home() {
//   const [submitted, setSubmitted] = useState(false);
//   const [data, setData] = useState(null);

//   const handleBooking = (formData) => {
//     // TODO: integrate with backend API here
//     setData(formData);
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       {!submitted ? (
//         <BookingForm onSubmit={handleBooking} />
//       ) : (
//         <div className="bg-white p-8 rounded-lg shadow text-center">
//           <h2 className="text-2xl font-bold mb-2 text-green-600">Booking Confirmed!</h2>
//           <p className="mb-1">Thank you, <span className="font-semibold">{data?.name}</span>.</p>
//           <p className="mb-1">Slot booked for: <span className="font-semibold">{data?.slot}</span></p>
//           <p>Confirmation sent to: <span className="font-semibold">{data?.email}</span></p>
//         </div>
//       )}
//     </div>
//   );
// }


import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl max-w-2xl w-full p-10 rounded-3xl flex flex-col items-center border border-blue-100">
        {/* Company Logo Placeholder */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center mb-6 shadow-md">
          <span className="text-white text-3xl font-bold tracking-wider">S</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900 drop-shadow-lg">
          SAMS Pvt Ltd
        </h1>
        <p className="mb-3 text-lg sm:text-xl text-gray-700 font-medium">
          Powering Digital Transformation Worldwide
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-5 py-3 flex flex-col items-center w-full sm:w-1/2">
            <span className="font-semibold text-blue-700">Contact</span>
            <span className="text-gray-600 text-sm">info@yourcompany.com</span>
            <span className="text-gray-600 text-sm">+1-234-567-8901</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-5 py-3 flex flex-col items-center w-full sm:w-1/2">
            <span className="font-semibold text-indigo-700">Location</span>
            <span className="text-gray-600 text-sm text-center">Virtual (Worldwide demos available)</span>
          </div>
        </div>
        <p className="mb-8 text-gray-500 text-base sm:text-lg max-w-xl text-center">
          Discover how our innovative solutions can drive success for your business.<br />
          Schedule a personalized demo with our expert team.
        </p>
        <Link
          href="/book-demo"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transform transition-all duration-200 hover:from-indigo-500 hover:to-blue-600"
        >
          🚀 Book a Demo
        </Link>
        <div className="mt-10 text-xs text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} SAMS Pvt Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
}


// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-red-500">
//       <h1 className="text-6xl font-bold text-white">RED TEST</h1>
//     </div>
//   );
// }