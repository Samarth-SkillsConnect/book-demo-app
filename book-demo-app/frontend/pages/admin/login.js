
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcf6] via-white to-[#f6f4fe] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <Image src="https://skillsconnect.blob.core.windows.net/skillsconnect/assets/frontend/images/logo/skillsconnect-logo-n.svg" alt="Skills Connect Logo" width={250} height={200}/>
        </div>
      </header>

      {/* Login Form Card */}
      <main className="flex justify-center items-center flex-1">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl px-12 py-10 max-w-md w-full flex flex-col"
        >
          <h2 className="text-3xl font-bold text-center text-[#12686c] mb-2">Welcome back</h2>
          <p className="text-center text-[#3e4e59] mb-6">Please log in to access your account</p>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#273043]">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border-2 border-[#e5e7eb] rounded-lg px-4 py-2 focus:outline-[#12686c]"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium text-[#273043]">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-2 border-[#e5e7eb] rounded-lg px-4 py-2 focus:outline-[#12686c]"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 text-xl text-[#8e9aad] focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-[#273043] text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="accent-[#12686c]"
              />
              Remember password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#12686c] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#0b5156] transition mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
}