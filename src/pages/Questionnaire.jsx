import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { candidateQuestions } from "@/components/questionnaire/questionData";
import QuestionCard from "@/components/questionnaire/QuestionCard.jsx";
import SectionHeader from "@/components/questionnaire/SectionHeader";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import { useLanguage } from "@/components/LanguageContext";

export default function Questionnaire() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");

  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!cardId) { navigate("/Upload"); return; }
    base44.entities.ProfileCard.list().then(cards => {
      const card = cards.find(c => c.id === cardId);
      if (card?.questionnaire_answers) {
        setAnswers(card.questionnaire_answers);
      }
    });
  }, [cardId]);

  const section = candidateQuestions[sectionIndex];
  const totalSections = candidateQuestions.length;

  const handleChange = (id, value) => {
    // Optimistic update - instant UI, save in background
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (cardId) {
      base44.entities.ProfileCard.update(cardId, {
        questionnaire_answers: { ...answers, [id]: value }
      }).catch(() => {}); // silent background save
    }
  };

  const handleNext = async () => {
    if (sectionIndex < totalSections - 1) {
      setSectionIndex(sectionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSaving(true);
      await base44.entities.ProfileCard.update(cardId, {
        questionnaire_answers: answers,
        status: "preferences"
      });
      navigate(`/PartnerPreferences?id=${cardId}`);
    }
  };

  const handleBack = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/Upload");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <ProgressBar current={sectionIndex + 1} total={totalSections} />

      <AnimatePresence mode="wait">
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 sm:p-8"
        >
          <SectionHeader
            title={section.section}
            iconName={section.icon}
            current={sectionIndex + 1}
            total={totalSections}
          />

          <div className="space-y-5">
            {section.questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={handleChange}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleBack} className="rounded-xl px-6 border-rose-200 text-rose-700">
          <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
          {t("back")}
        </Button>
        <Button
          onClick={handleNext}
          disabled={saving}
          className="rounded-xl px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
        >
          {saving ? t("saving") : sectionIndex === totalSections - 1 ? t("continueToPartnerPrefs") : t("nextSection")}
          <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
        </Button>
      </div>
    </motion.div>
  );
}