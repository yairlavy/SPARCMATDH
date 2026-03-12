import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function FeedbackPanel({ cardId, onClose, onRegenerate }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const feedbackOptions = [
    { value: "liked", labelKey: "likedThis", emoji: "💕" },
    { value: "too_generic", labelKey: "tooGeneric", emoji: "😐" },
    { value: "too_formal", labelKey: "tooFormal", emoji: "🎩" },
    { value: "not_accurate", labelKey: "notAccurate", emoji: "❌" },
    { value: "better_personality", labelKey: "betterPersonality", emoji: "✨" },
  ];

  const handleSubmit = async (andRegenerate = false) => {
    if (!selected) return;
    setSubmitting(true);
    await base44.entities.Feedback.create({
      profile_card_id: cardId,
      feedback_type: selected,
      feedback_text: text || undefined,
    });
    toast.success(t("feedbackSaved"));
    setSubmitting(false);
    if (andRegenerate) onRegenerate();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 bg-white rounded-2xl border border-rose-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-rose-900">💌 {t("giveFeedback")}</h3>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {feedbackOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`px-3.5 py-2 rounded-xl text-sm border transition-all ${
              selected === opt.value
                ? "bg-rose-100 border-rose-300 text-rose-800"
                : "bg-white border-stone-200 text-stone-600 hover:border-rose-200"
            }`}
          >
            {opt.emoji} {t(opt.labelKey)}
          </button>
        ))}
      </div>

      <Textarea
        placeholder={t("additionalNotes")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[70px] rounded-xl border-rose-200 resize-none text-sm mb-4"
      />

      <div className="flex gap-2">
        <Button
          onClick={() => handleSubmit(false)}
          disabled={!selected || submitting}
          variant="outline"
          className="rounded-xl border-rose-200 text-rose-700"
        >
          {t("submitFeedback")}
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          disabled={!selected || submitting}
          className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white"
        >
          <RefreshCw className="w-4 h-4 me-1.5" />
          {t("submitRegenerate")}
        </Button>
      </div>
    </motion.div>
  );
}