import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Please enter your username.");
      toast.error("Please enter your username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      toast.error("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short!");
      return;
    }
    if (passwordStrength < 3) {
      setError("Password is too weak. Please meet all requirements.");
      toast.error("Password is too weak!");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login(username, role);
      toast.success(`Welcome, ${username}! 👋`);
      if (role === "admin") {
        navigate("/home/admin");
      } else {
        navigate("/home");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">SmartAssist</h1>
          <p className="text-gray-400 text-sm mt-1">Your AI Health Companion</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => { setRole("user"); setError(""); }}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition duration-200
              ${role === "user" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}
          >
            👤 User
          </button>
          <button
            onClick={() => { setRole("admin"); setError(""); }}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition duration-200
              ${role === "admin" ? "bg-blue-600 text-white shadow" : "text-gray-500"}`}
          >
            🔐 Admin
          </button>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-gray-700 mb-1">
          {role === "admin" ? "Admin Login" : "Welcome Back!"}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {role === "admin" ? "Access the admin dashboard" : "Login to get AI recommendations"}
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 text-gray-700"
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 text-gray-700 pr-12"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-9 text-gray-400 hover:text-blue-500 text-lg"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Password Strength */}
        {password.length > 0 && (
          <div className="mt-2 mb-3">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300
                    ${passwordStrength >= level
                      ? level === 1 ? "bg-red-400"
                      : level === 2 ? "bg-yellow-400"
                      : level === 3 ? "bg-blue-400"
                      : "bg-green-500"
                      : "bg-gray-200"
                    }`}
                />
              ))}
            </div>

            <p className={`text-xs font-medium mb-2
              ${passwordStrength === 1 ? "text-red-400"
              : passwordStrength === 2 ? "text-yellow-500"
              : passwordStrength === 3 ? "text-blue-500"
              : passwordStrength === 4 ? "text-green-500"
              : "text-gray-400"}`}>
              {passwordStrength === 1 ? "Weak 😟"
              : passwordStrength === 2 ? "Fair 🙂"
              : passwordStrength === 3 ? "Good 👍"
              : passwordStrength === 4 ? "Strong 💪"
              : ""}
            </p>

            <div className="grid grid-cols-2 gap-1 bg-gray-50 rounded-xl p-3">
              <p className={`text-xs flex items-center gap-1 ${password.length >= 6 ? "text-green-500" : "text-gray-400"}`}>
                {password.length >= 6 ? "✅" : "⬜"} Min 6 characters
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-400"}`}>
                {/[A-Z]/.test(password) ? "✅" : "⬜"} Uppercase letter
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-400"}`}>
                {/[0-9]/.test(password) ? "✅" : "⬜"} Number
              </p>
              <p className={`text-xs flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-gray-400"}`}>
                {/[^A-Za-z0-9]/.test(password) ? "✅" : "⬜"} Special character
              </p>
            </div>
          </div>
        )}

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <span className="text-sm text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">⚠️ {error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg transition duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            `Login as ${role === "admin" ? "Admin" : "User"} →`
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}