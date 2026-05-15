import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const categories = [
  { label: "Mental Health", icon: "🧠" },
  { label: "Physical Pain", icon: "🦴" },
  { label: "Heart & Blood", icon: "❤️" },
  { label: "Skin & Hair", icon: "🧴" },
  { label: "Eyes & Ears", icon: "👁️" },
  { label: "Other", icon: "🏥" },
];

export default function ProblemInput() {
  const [issue, setIssue] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useAuth();

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input not supported in this browser!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);
    toast("🎤 Listening... Speak now!", { icon: "🎙️" });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIssue((prev) => prev ? prev + " " + transcript : transcript);
      setListening(false);
      toast.success("Voice captured! ✅");
    };

    recognition.onerror = () => {
      setListening(false);
      toast.error("Could not capture voice. Try again!");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleSubmit = () => {
    if (!selected) {
      setError(t("problem.errorCategory"));
      toast.error(t("problem.errorCategory"));
      return;
    }
    if (!issue.trim()) {
      setError(t("problem.errorEmpty"));
      toast.error(t("problem.errorEmpty"));
      return;
    }
    if (issue.trim().length < 10) {
      setError(t("problem.errorShort"));
      toast.error(t("problem.errorShort"));
      return;
    }
    setError("");
    toast.success("Problem submitted! Getting recommendations... 🤖");
    navigate("/home/recommendation");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}>
      <div className={`rounded-3xl shadow-xl p-8 w-full max-w-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>

        <h1 className={`text-4xl font-extrabold mb-2 text-center ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
          {t("problem.title")}
        </h1>
        <p className={`text-center mb-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {t("problem.subtitle")}
        </p>

        <p className={`font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{t("problem.selectCategory")}</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelected(cat.label)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition duration-200 cursor-pointer
                ${selected === cat.label
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                  : darkMode
                  ? "border-gray-600 hover:border-blue-400 text-gray-300 bg-gray-700"
                  : "border-gray-200 hover:border-blue-300 text-gray-600"
                }`}
            >
              <span className="text-3xl mb-1">{cat.icon}</span>
              <span className="text-xs text-center">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Describe Issue + Voice Button */}
        <div className="flex justify-between items-center mb-2">
          <p className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{t("problem.describeIssue")}</p>
          <button
            onClick={handleVoiceInput}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200
              ${listening
                ? "bg-red-500 text-white animate-pulse"
                : darkMode
                ? "bg-gray-700 text-blue-400 border border-gray-600 hover:bg-gray-600"
                : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
              }`}
          >
            {listening ? "🔴 Listening..." : "🎤 Voice Input"}
          </button>
        </div>

        <textarea
          placeholder={t("problem.placeholder")}
          maxLength={500}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className={`w-full h-36 p-4 border-2 rounded-2xl resize-none focus:outline-none focus:border-blue-400
            ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-200 text-gray-700"}`}
        />
        <p className={`text-right text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>{issue.length}/500</p>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-2xl shadow-md transition duration-300"
        >
          {t("problem.submit")}
        </button>

      </div>
    </div>
  );
}