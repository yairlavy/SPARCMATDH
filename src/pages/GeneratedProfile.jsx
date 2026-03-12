import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCw, Save, ArrowLeft, ThumbsUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import FeedbackPanel from "@/components/profile/FeedbackPanel";
import { useLanguage } from "@/components/LanguageContext";

export default function GeneratedProfile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");

  const [card, setCard] = useState(null);
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!cardId) { navigate("/Upload"); return; }
    loadCard();
  }, [cardId]);

  const loadCard = async () => {
    const cards = await base44.entities.ProfileCard.list();
    const found = cards.find(c => c.id === cardId);
    if (!found) { navigate("/Upload"); return; }
    setCard(found);
    if (found.edited_summary) {
      setSummary(found.edited_summary);
    } else if (found.generated_summary) {
      setSummary(found.generated_summary);
    } else {
      generateSummary(found);
    }
  };

  const buildPrompt = (c) => {
    const genderWord = c.gender === "male" ? "he" : "she";
    const partnerWord = c.gender === "male" ? "wife" : "husband";
    const communityNote = c.community_style ? `Use terminology appropriate for the ${c.community_style.replace(/_/g, " ")} community.` : "";

    return `You are an expert shidduch profile writer. Write a polished matchmaking profile summary.

CANDIDATE: ${c.candidate_name} (${c.gender})
${communityNote}

ORIGINAL CARD (if provided):
${c.original_card_text || "No original card provided."}

QUESTIONNAIRE ANSWERS:
${JSON.stringify(c.questionnaire_answers || {}, null, 2)}

PARTNER PREFERENCES:
${JSON.stringify(c.partner_preferences || {}, null, 2)}

INSTRUCTIONS:
Write EXACTLY 4 paragraphs. Each paragraph should flow naturally. Use third person (${genderWord}).

Paragraph 1 - PRESENT (max 20 words): Who ${genderWord} is today: height, current occupation, where ${genderWord} lives.
Paragraph 2 - LIFE JOURNEY (max 30 words): Main stages and meaningful parts of their life path.
Paragraph 3 - PERSONAL DETAILS (max 30 words): Hobbies, traits, unique characteristics, values, personality, what makes them special.
Paragraph 4 - WHAT THEY'RE LOOKING FOR (max 30 words): What they seek in a ${partnerWord}: important traits, lifestyle, religious level, values, preferred home dynamic.

STYLE RULES:
- Elegant, warm, natural, high-quality writing
- Human, respectful, suitable for matchmaking
- No clichés, robotic wording, or exaggeration
- Refined, positive, believable
- Do NOT invent details not provided
- If information is missing, gracefully omit it

Return ONLY the 4 paragraphs, separated by blank lines. No headers, no labels, no numbering.`;
  };

  const generateSummary = async (cardData) => {
    const c = cardData || card;
    if (!c) return;
    setGenerating(true);

    const allFeedback = await base44.entities.Feedback.list();
    const relevantFeedback = allFeedback.filter(f => f.profile_card_id === cardId);
    let feedbackLearning = "";
    if (relevantFeedback.length > 0) {
      feedbackLearning = `\nPREVIOUS FEEDBACK ON THIS PROFILE:\n${relevantFeedback.map(f => `- ${f.feedback_type}: ${f.feedback_text || ""}`).join("\n")}\nPlease address this feedback in your rewrite.\n`;
    }

    const result = await base44.integrations.Core.InvokeLLM({ prompt: buildPrompt(c) + feedbackLearning });
    setSummary(result);
    setGenerating(false);

    await base44.entities.ProfileCard.update(cardId, {
      generated_summary: result,
      status: "generated",
      generation_count: (c.generation_count || 0) + 1
    });
    setCard(prev => ({ ...prev, generated_summary: result, generation_count: (prev?.generation_count || 0) + 1 }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedText : summary);
    setCopied(true);
    toast.success(t("copiedToClipboard"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = async () => {
    await base44.entities.ProfileCard.update(cardId, {
      edited_summary: editedText,
      final_summary: editedText,
      status: "edited"
    });
    setSummary(editedText);
    setIsEditing(false);
    toast.success(t("changesSaved"));
  };

  const handleFinalize = async () => {
    await base44.entities.ProfileCard.update(cardId, {
      final_summary: summary,
      status: "finalized"
    });
    toast.success(t("profileFinalized"));
    navigate("/History");
  };

  if (!card) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-rose-900">💍 {card.candidate_name}</h1>
          <p className="text-stone-500 text-sm mt-0.5">{t("generatedSummary")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/History")} className="rounded-xl border-rose-200 text-rose-700">
          <ArrowLeft className="w-4 h-4 me-1 rtl:rotate-180" />
          {t("history")}
        </Button>
      </div>

      {/* Generated Summary */}
      <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 sm:p-8">
        {generating ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="text-4xl animate-pulse">💌</div>
            <p className="text-stone-500 text-sm">{t("crafting")}</p>
          </div>
        ) : isEditing ? (
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="min-h-[300px] rounded-xl border-rose-200 text-sm leading-relaxed resize-none"
          />
        ) : (
          <div className="prose prose-stone prose-sm max-w-none">
            {summary.split("\n").filter(p => p.trim()).map((paragraph, i) => (
              <p key={i} className="text-stone-700 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Actions */}
        {!generating && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-rose-50">
            {isEditing ? (
              <>
                <Button onClick={handleSaveEdit} className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                  <Save className="w-4 h-4 me-1.5" />
                  {t("saveChanges")}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl border-rose-200">
                  {t("cancel")}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleCopy} variant="outline" className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50">
                  {copied ? <Check className="w-4 h-4 me-1.5 text-green-600" /> : <Copy className="w-4 h-4 me-1.5" />}
                  {copied ? t("copied") : t("copy")}
                </Button>
                <Button onClick={() => { setEditedText(summary); setIsEditing(true); }} variant="outline" className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50">
                  {t("edit")}
                </Button>
                <Button onClick={() => generateSummary()} variant="outline" className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50">
                  <RefreshCw className="w-4 h-4 me-1.5" />
                  {t("regenerate")}
                </Button>
                <Button onClick={() => setShowFeedback(!showFeedback)} variant="outline" className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50">
                  <MessageSquare className="w-4 h-4 me-1.5" />
                  {t("feedback")}
                </Button>
                <Button onClick={handleFinalize} className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white ms-auto">
                  <ThumbsUp className="w-4 h-4 me-1.5" />
                  {t("finalize")}
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Feedback Panel */}
      {showFeedback && (
        <FeedbackPanel cardId={cardId} onClose={() => setShowFeedback(false)} onRegenerate={() => generateSummary()} />
      )}

      {/* Original Card comparison */}
      {card.original_card_text && (
        <details className="mt-6">
          <summary className="text-sm text-stone-400 cursor-pointer hover:text-rose-600 transition-colors">
            {t("viewOriginal")}
          </summary>
          <div className="mt-3 p-5 bg-rose-50/50 rounded-xl text-sm text-stone-500 leading-relaxed whitespace-pre-wrap border border-rose-100">
            {card.original_card_text}
          </div>
        </details>
      )}
    </motion.div>
  );
}