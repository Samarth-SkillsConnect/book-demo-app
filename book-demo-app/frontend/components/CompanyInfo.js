export default function CompanyInfo() {
  return (
    <section className="text-center w-full animate-fade-in-up bg-white/70 backdrop-blur rounded-2xl px-4 sm:px-8 py-6 shadow-card mb-4 border border-[color:var(--theme-primary)] relative z-10">
      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-2 drop-shadow animate-fade-in"
        style={{
          color: "var(--theme-primary)",
          background: "none",
          backgroundClip: "unset",
          WebkitBackgroundClip: "unset",
          WebkitTextFillColor: "unset",
        }}
      >
        Book a Live Demo
      </h1>
      <p className="text-gray-700 text-base sm:text-lg mb-4 animate-fade-in delay-100">
        Experience our digital products firsthand!&nbsp;
        <span style={{ color: "var(--theme-primary)", fontWeight: 600 }}>Schedule a personalized demo</span> with our experts and discover how our solutions can help your business grow.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 animate-fade-in delay-150">
        <div className="flex items-center gap-2 bg-[color:var(--theme-bg-light)] rounded-xl px-3 py-2 shadow hover:shadow-md border border-[color:var(--theme-primary)] transition">
          <span className="font-semibold" style={{ color: "var(--theme-primary)" }}>Contact:</span>
          <span className="break-all">samarth@sams.com</span>
          <span className="hidden sm:inline">|</span>
          <span>+91 9833431924</span>
        </div>
        <div className="flex items-center gap-2 bg-[color:var(--theme-bg-light)] rounded-xl px-3 py-2 shadow hover:shadow-md border border-[color:var(--theme-primary-light)] transition">
          <span className="font-semibold" style={{ color: "var(--theme-primary-light)" }}>Location:</span>
          <span>Worldwide (virtual demos)</span>
        </div>
      </div>
    </section>
  );
}