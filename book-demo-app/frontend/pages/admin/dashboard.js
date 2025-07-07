import SlotCreateForm from "@/components/SlotCreateForm";

export default function AdminDashboard() {
  return (
    <main
      className="min-h-screen w-screen flex flex-col items-center py-8 font-sans overflow-x-auto animate-fade-in"
      style={{
        background: "linear-gradient(135deg, #005e6a 0%, #e6f7fa 100%)",
      }}
    >
      <section
        className="relative w-[99vw] max-w-3xl mx-auto rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border-2 p-5 sm:p-10 animate-fade-in-up overflow-hidden"
        style={{
          borderColor: "var(--theme-primary, #005e6a)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
          style={{
            boxShadow:
              "0 0 30px 4px #005e6a22, 0 0 0 6px #3ecbdb33 inset",
          }}
        ></div>

        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-6 text-center drop-shadow animate-fade-in"
          style={{
            color: "var(--theme-primary, #005e6a)",
            letterSpacing: "0.01em",
            background: "none",
            backgroundClip: "unset",
            WebkitBackgroundClip: "unset",
            WebkitTextFillColor: "unset",
          }}
        >
          Admin Dashboard
        </h1>
        <div className="mb-8 animate-fade-in-up delay-100">
          <SlotCreateForm />
        </div>
      </section>
    </main>
  );
}