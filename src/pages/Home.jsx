import React from "react";
import { Link } from "react-router-dom";
import { Upload, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

const featureIcons = ["💌", "✨", "💕"];
const stepIcons = ["📋", "❓", "📝", "💍"];

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: featureIcons[0], titleKey: "feat1Title", descKey: "feat1Desc" },
    { icon: featureIcons[1], titleKey: "feat2Title", descKey: "feat2Desc" },
    { icon: featureIcons[2], titleKey: "feat3Title", descKey: "feat3Desc" },
  ];

  const steps = ["step1", "step2", "step3", "step4"];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-8 sm:pt-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-700 text-sm font-medium mb-6 border border-rose-200/50">
          <span>💍</span>
          {t("premiumBadge")}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-rose-950 tracking-tight leading-tight max-w-2xl mx-auto">
          {t("heroTitle1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
            {t("heroTitle2")}
          </span>
        </h1>
        <p className="mt-5 text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
          {t("heroSubtitle")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/Upload">
            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl px-8 h-12 text-base shadow-lg shadow-rose-200/60">
              <Upload className="w-4 h-4 mr-2" />
              {t("startNewProfile")}
            </Button>
          </Link>
          <Link to="/History">
            <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 text-base border-rose-200 text-rose-700 hover:bg-rose-50">
              <History className="w-4 h-4 mr-2" />
              {t("viewHistory")}
            </Button>
          </Link>
        </div>

        {/* Decorative flowers */}
        <div className="mt-10 flex justify-center gap-4 text-2xl opacity-40 select-none">
          <span>🌸</span><span>💐</span><span>🕊️</span><span>💐</span><span>🌸</span>
        </div>
      </motion.section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="group p-6 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center mb-4 text-2xl">
              {feature.icon}
            </div>
            <h3 className="text-base font-semibold text-rose-900 mb-1.5">{t(feature.titleKey)}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{t(feature.descKey)}</p>
          </motion.div>
        ))}
      </section>

      {/* How it works */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-rose-900 mb-8">{t("howItWorks")}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
          {steps.map((stepKey, i) => (
            <React.Fragment key={stepKey}>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-rose-100 shadow-sm">
                <span className="text-xl">{stepIcons[i]}</span>
                <span className="text-sm font-medium text-rose-800">{t(stepKey)}</span>
              </div>
              {i < 3 && <ArrowRight className="w-4 h-4 text-rose-300 hidden sm:block" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}