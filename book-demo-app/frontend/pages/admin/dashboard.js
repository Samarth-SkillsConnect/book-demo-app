import SlotCreateForm from "@/components/SlotCreateForm";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 via-fuchsia-100 to-yellow-100 flex flex-col items-center py-8 font-sans overflow-x-auto animate-fade-in">
      {/* Animated shimmering border + glass card */}
      <div className="relative w-[99vw] max-w-3xl mx-auto rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border-2 border-gradient-to-r from-blue-300 via-fuchsia-200 to-yellow-200 p-5 sm:p-10 animate-fade-in-up overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent" style={{boxShadow:"0 0 30px 4px #a78bfa77, 0 0 0 6px #fef3c755 inset"}}></div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow animate-fade-in">
          Admin Dashboard
        </h1>
        
        {/* Slot Create Form */}
        <div className="mb-8 animate-fade-in-up delay-100">
          <SlotCreateForm />
        </div>
      </div>

      {/* shimmer border animation */}
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