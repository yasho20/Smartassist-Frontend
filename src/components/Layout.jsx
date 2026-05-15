import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">SmartAssist</h1>

          {/* Hamburger Button - mobile only */}
          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link to="/home" className="hover:text-blue-600">{t("nav.home")}</Link>
            <Link to="/home/problem" className="hover:text-blue-600">{t("nav.getHelp")}</Link>
            <Link to="/home/book" className="hover:text-blue-600">{t("nav.book")}</Link>
            <Link to="/home/ratings" className="hover:text-blue-600">{t("nav.ratings")}</Link>
            <Link to="/home/admin" className="hover:text-blue-600">{t("nav.admin")}</Link>
          </div>

          {/* Right Side - Language + Profile */}
          <div className="hidden md:flex items-center gap-3">

            {/* Language Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 rounded-lg text-sm font-medium border transition
                  ${i18n.language === "en" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("ta")}
                className={`px-3 py-1 rounded-lg text-sm font-medium border transition
                  ${i18n.language === "ta" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className={`px-3 py-1 rounded-lg text-sm font-medium border transition
                  ${i18n.language === "hi" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}
              >
                हिंदी
              </button>
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 text-sm font-medium text-gray-600">
            <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t("nav.home")}</Link>
            <Link to="/home/problem" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t("nav.getHelp")}</Link>
            <Link to="/home/book" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t("nav.book")}</Link>
            <Link to="/home/ratings" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t("nav.ratings")}</Link>
            <Link to="/home/admin" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">{t("nav.admin")}</Link>

            {/* Language Switcher - mobile */}
            <div className="flex gap-2 mt-2">
              <button onClick={() => changeLanguage("en")} className={`px-3 py-1 rounded-lg text-sm font-medium border transition ${i18n.language === "en" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600"}`}>EN</button>
              <button onClick={() => changeLanguage("ta")} className={`px-3 py-1 rounded-lg text-sm font-medium border transition ${i18n.language === "ta" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600"}`}>தமிழ்</button>
              <button onClick={() => changeLanguage("hi")} className={`px-3 py-1 rounded-lg text-sm font-medium border transition ${i18n.language === "hi" ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600"}`}>हिंदी</button>
            </div>

            {/* Logout - mobile */}
            {user && (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="px-4 py-1 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition w-fit"
              >
                🚪 Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-sm text-gray-400 py-4">
        © 2026 SmartAssist. All rights reserved.
      </footer>

    </div>
  );
}