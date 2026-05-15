import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully! 👋");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1 rounded-xl transition
          ${user.role === "admin" ? "bg-purple-50 hover:bg-purple-100" : "bg-blue-50 hover:bg-blue-100"}`}
      >
        <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm
          ${user.role === "admin" ? "bg-purple-600" : "bg-blue-600"}`}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.username}</span>
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">

          {/* Profile Header */}
          <div className={`rounded-t-2xl p-4 text-white ${user.role === "admin"
            ? "bg-gradient-to-r from-purple-600 to-pink-400"
            : "bg-gradient-to-r from-blue-600 to-cyan-400"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-xl
                ${user.role === "admin" ? "text-purple-600" : "text-blue-600"}`}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg">{user.username}</p>
                <p className={`text-xs capitalize bg-white px-2 py-0.5 rounded-full w-fit font-semibold
                  ${user.role === "admin" ? "text-purple-600" : "text-blue-600"}`}>
                  {user.role === "admin" ? "🔐 Administrator" : "👤 User"}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {user.role === "admin" ? (
            <div className="grid grid-cols-3 gap-2 p-3 border-b">
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600">0</p>
                <p className="text-xs text-gray-400">Users</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600">0</p>
                <p className="text-xs text-gray-400">Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600">0</p>
                <p className="text-xs text-gray-400">Specialists</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-3 border-b">
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{user.problemsCount || 0}</p>
                <p className="text-xs text-gray-400">Problems</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{user.bookingsCount || 0}</p>
                <p className="text-xs text-gray-400">Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">{user.ratingsCount || 0}</p>
                <p className="text-xs text-gray-400">Ratings</p>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="p-2">
            {user.role === "admin" ? (
              <>
                <button
                  onClick={() => { navigate("/home/admin"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 text-gray-600 text-sm transition"
                >
                  <span>📊</span> Admin Dashboard
                </button>
                <button
                  onClick={() => { navigate("/home/admin/specialists"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 text-gray-600 text-sm transition"
                >
                  <span>🔧</span> Manage Specialists
                </button>
                <button
                  onClick={() => { navigate("/home/admin/analytics"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 text-gray-600 text-sm transition"
                >
                  <span>📈</span> Analytics
                </button>
                <button
                  onClick={() => { navigate("/home/admin/users"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 text-gray-600 text-sm transition"
                >
                  <span>👥</span> Manage Users
                </button>
                <button
                  onClick={() => { navigate("/home/settings"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-50 text-gray-600 text-sm transition"
                >
                  <span>⚙️</span> Settings
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate("/home/profile"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 text-gray-600 text-sm transition"
                >
                  <span>👤</span> My Profile
                </button>
                <button
                  onClick={() => { navigate("/home/activity"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 text-gray-600 text-sm transition"
                >
                  <span>🕐</span> Recent Activity
                </button>
                <button
                  onClick={() => { navigate("/home/favourites"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 text-gray-600 text-sm transition"
                >
                  <span>⭐</span> Favourite Specialists
                </button>
                <button
                  onClick={() => { navigate("/home/notifications"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 text-gray-600 text-sm transition"
                >
                  <span>🔔</span> Notifications
                </button>
                <button
                  onClick={() => { navigate("/home/settings"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 text-gray-600 text-sm transition"
                >
                  <span>⚙️</span> Settings
                </button>
              </>
            )}

            <hr className="my-2" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-500 text-sm font-semibold transition"
            >
              <span>🚪</span> Logout
            </button>
          </div>

          {/* Member Since */}
          <div className="px-4 pb-3 text-center">
            <p className="text-xs text-gray-400">
              Member since {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}