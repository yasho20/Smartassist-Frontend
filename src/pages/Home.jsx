import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const healthTips = [
  { tip: "Drink at least 8 glasses of water daily to stay hydrated! 💧", icon: "💧" },
  { tip: "Take a 10-minute walk after every meal to aid digestion. 🚶", icon: "🚶" },
  { tip: "Sleep 7-8 hours every night for a healthy mind and body. 😴", icon: "😴" },
  { tip: "Eat more fruits and vegetables for essential vitamins. 🥦", icon: "🥦" },
  { tip: "Practice deep breathing for 5 minutes to reduce stress. 🧘", icon: "🧘" },
  { tip: "Limit screen time before bed for better sleep quality. 📵", icon: "📵" },
  { tip: "Wash your hands regularly to prevent infections. 🧼", icon: "🧼" },
  { tip: "Smile more! It boosts your mood and immune system. 😊", icon: "😊" },
  { tip: "Exercise at least 30 minutes a day to stay fit. 🏃", icon: "🏃" },
  { tip: "Avoid skipping breakfast — it's the most important meal! 🍳", icon: "🍳" },
];

const todayTip = healthTips[new Date().getDate() % healthTips.length];

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode, user } = useAuth();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}>

      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className={`text-6xl font-extrabold mb-4 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
          {t("home.title")}
        </h1>
        {user && (
          <p className={`text-lg font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            👋 Welcome back, <span className="text-blue-500 font-bold">{user.username}</span>!
          </p>
        )}
        <p className={`text-xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {t("home.subtitle")}
        </p>
        <button
          onClick={() => navigate("/home/problem")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >
          {t("home.getStarted")}
        </button>
      </div>

      {/* Health Tip of the Day */}
      <div className={`mt-10 w-full max-w-2xl rounded-2xl p-5 border-l-4 border-blue-500 shadow-md flex items-start gap-4
        ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="text-4xl">{todayTip.icon}</div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${darkMode ? "text-blue-400" : "text-blue-500"}`}>
            💡 Health Tip of the Day
          </p>
          <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {todayTip.tip}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className={`rounded-2xl shadow-md p-6 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-4xl mb-3">🤖</div>
          <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>{t("home.feature1Title")}</h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t("home.feature1Desc")}</p>
        </div>
        <div className={`rounded-2xl shadow-md p-6 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-4xl mb-3">📅</div>
          <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>{t("home.feature2Title")}</h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t("home.feature2Desc")}</p>
        </div>
        <div className={`rounded-2xl shadow-md p-6 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-4xl mb-3">🌍</div>
          <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>{t("home.feature3Title")}</h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t("home.feature3Desc")}</p>
        </div>
      </div>

    </div>
  );
}