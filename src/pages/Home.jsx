import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">
          {t("home.title")}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t("home.subtitle")}
        </p>
        <button
          onClick={() => navigate("/home/problem")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >
          {t("home.getStarted")}
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-lg font-bold text-blue-700 mb-2">{t("home.feature1Title")}</h3>
          <p className="text-gray-500 text-sm">{t("home.feature1Desc")}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-lg font-bold text-blue-700 mb-2">{t("home.feature2Title")}</h3>
          <p className="text-gray-500 text-sm">{t("home.feature2Desc")}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="text-lg font-bold text-blue-700 mb-2">{t("home.feature3Title")}</h3>
          <p className="text-gray-500 text-sm">{t("home.feature3Desc")}</p>
        </div>
      </div>

    </div>
  );
}