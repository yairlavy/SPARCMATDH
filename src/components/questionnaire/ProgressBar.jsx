import React from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function ProgressBar({ current, total }) {
  const { t } = useLanguage();
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-stone-400 mb-2">
        <span>{t("progress")}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-rose-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}