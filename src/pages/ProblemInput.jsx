import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!selected) {
      setError(t("problem.errorCategory"));
      return;
    }
    if (!issue.trim()) {
      setError(t("problem.errorEmpty"));
      return;
    }
    if (issue.trim().length < 10) {
      setError(t("problem.errorShort"));
      return;
    }
    setError("");
    navigate("/home/recommendation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center">
          {t("problem.title")}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          {t("problem.subtitle")}
        </p>

        <p className="font-semibold text-gray-700 mb-3">{t("problem.selectCategory")}</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelected(cat.label)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition duration-200 cursor-pointer
                ${selected === cat.label
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                  : "border-gray-200 hover:border-blue-300 text-gray-600"
                }`}
            >
              <span className="text-3xl mb-1">{cat.icon}</span>
              <span className="text-xs text-center">{cat.label}</span>
            </button>
          ))}
        </div>

        <p className="font-semibold text-gray-700 mb-2">{t("problem.describeIssue")}</p>
        <textarea
          placeholder={t("problem.placeholder")}
          maxLength={500}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full h-36 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-blue-400 text-gray-700"
        />
        <p className="text-right text-sm text-gray-400 mt-1">{issue.length}/500</p>

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