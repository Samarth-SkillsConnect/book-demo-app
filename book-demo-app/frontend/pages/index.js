
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center font-sans overflow-auto"
      style={{
        background: "linear-gradient(135deg, #005e6a 0%, #e6f7fa 100%)"
      }}
    >
      <section
        className="relative w-[99vw] h-[99vh] max-w-2xl max-h-[700px] p-2 sm:p-8 rounded-3xl flex flex-col items-center border-2 shadow-2xl mx-auto my-auto overflow-y-auto animate-fade-in-up transition-all duration-700"
        style={{
          background: "var(--theme-card, #fff)",
          borderColor: "var(--theme-primary, #005e6a)",
          backdropFilter: "blur(18px)"
        }}
      >
        {/* Animated Border Shimmer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent"
          style={{
            boxShadow: "0 0 40px 3px #005e6a33, 0 0 0 8px #3ecbdb22 inset"
          }}
        ></div>

        {/* Logo avatar */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8 shadow-lg animate-bounce-in border-4 z-10"
          style={{
            background: "var(--theme-primary, #005e6a)",
            borderColor: "#fff"
          }}
        >
          <span className="text-white text-4xl font-extrabold tracking-widest select-none drop-shadow-lg">S</span>
        </div>
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-1 text-center animate-fade-in drop-shadow"
          style={{
            color: "var(--theme-primary, #005e6a)",
            letterSpacing: "0.01em"
          }}
        >
          Skills connect
        </h1>
        <p className="mb-2 text-base sm:text-lg text-gray-700 font-medium text-center animate-fade-in delay-100">
          Campus Hiring Platform
        </p>
        {/* Contact & Location - responsive card grid */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full justify-center items-stretch mb-4 animate-fade-in delay-150">
          <div
            className="rounded-xl px-4 py-3 flex-1 flex flex-col items-center shadow hover:shadow-md transition min-w-[120px]"
            style={{
              background: "var(--theme-bg-light, #e6f7fa)",
              border: "1px solid var(--theme-primary, #005e6a)"
            }}
          >
            <span className="font-semibold mb-1" style={{ color: "var(--theme-primary, #005e6a)" }}>Contact</span>
            <span className="text-gray-600 text-xs sm:text-sm break-all">support@skillsconnect.in</span>
            <span className="text-gray-600 text-xs sm:text-sm">+91 9870470502</span>
          </div>
          <div
            className="rounded-xl px-4 py-3 flex-1 flex flex-col items-center shadow hover:shadow-md transition min-w-[120px]"
            style={{
              background: "var(--theme-bg-light, #e6f7fa)",
              border: "1px solid var(--theme-primary-light, #3ecbdb)"
            }}
          >
            <span className="font-semibold mb-1" style={{ color: "var(--theme-primary-light, #3ecbdb)" }}>Location</span>
            <span className="text-gray-600 text-xs sm:text-sm text-center">Virtual (Worldwide demos available)</span>
          </div>
        </div>
        <p className="mb-6 text-gray-500 text-xs sm:text-base max-w-xl text-center animate-fade-in delay-200">
          Discover how our <span style={{ color: "var(--theme-primary)", fontWeight: 600 }}></span> Our campus hiring solution incorporates corporate branding seamlessly within the campus hiring process.<br />
          <span className="block mt-1">Schedule a personalized demo with our expert team.</span>
        </p>
        {/* CTA Button */}
        <Link
          href="/book-demo"
          className="inline-block py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-xl shadow-lg animate-fade-in delay-300 transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, var(--theme-primary, #005e6a) 0%, var(--theme-primary-light, #3ecbdb) 100%)",
            color: "#fff",
            paddingLeft: "1.75rem",
            paddingRight: "1.75rem"
          }}
        >
          🚀 Book a Demo
        </Link>
        <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-gray-400 tracking-wide text-center animate-fade-in delay-500">
          &copy; {new Date().getFullYear()} © UPSKILL TECH SOLUTIONS PRIVATE LIMITED. All Rights Reserved.
        </div>
      </section>
    </main>
  );
}