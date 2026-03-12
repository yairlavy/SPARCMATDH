import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

const APP_URL = "https://intelligent-spark-match-flow.base44.app";

export default function Landing() {
  const { t, toggleLang, lang } = useLanguage();

  const handleContinue = () => {
    window.open(APP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 flex flex-col"
      dir={lang === "he" ? "rtl" : "ltr"}
    >
      {/* Top bar */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all"
        >
          <span>{lang === "he" ? "🇬🇧" : "🇮🇱"}</span>
          {t("langToggle")}
        </button>
      </div>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="text-6xl mb-6">💍</div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-700 text-sm font-medium mb-5 border border-rose-200/50">
            <span>🌸</span>
            {t("premiumBadge")}
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-rose-950 tracking-tight leading-tight mb-5">
            {t("heroTitle1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              {t("heroTitle2")}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-500 leading-relaxed mb-10 max-w-lg mx-auto">
            {t("heroSubtitle")}
          </p>

          {/* Two main CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Web App */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleContinue}
                className="w-64 h-16 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-xl shadow-rose-200/60 text-base flex flex-col gap-0.5"
              >
                <span className="font-semibold">{t("continueWeb")}</span>
                <span className="text-xs text-rose-100">{t("continueWebSub")}</span>
              </Button>
            </motion.div>

            {/* Download App */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => alert(t("downloadComingSoon"))}
                className="w-64 h-16 rounded-2xl border-2 border-rose-200 bg-white text-rose-800 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-md flex flex-col items-center justify-center gap-0.5"
              >
                <span className="font-semibold text-base">{t("downloadApp")}</span>
                <span className="text-xs text-stone-400">{t("downloadAppSub")}</span>
              </button>
            </motion.div>
          </div>

          {/* decorative */}
          <div className="mt-12 flex justify-center gap-3 text-2xl opacity-30 select-none">
            <span>🌸</span>
            <span>💐</span>
            <span>🕊️</span>
            <span>💐</span>
            <span>🌸</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-stone-400">
        <span>💍 {t("appName")}</span>
      </footer>
    </div>
  );
}