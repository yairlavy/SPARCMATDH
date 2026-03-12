import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MobileSelect from "@/components/ui/MobileSelect";
import { Upload as UploadIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function UploadPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [communityStyle, setCommunityStyle] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: {
        type: "object",
        properties: {
          profile_text: { type: "string", description: "The full text content of the shidduch/matchmaking profile card" }
        }
      }
    });
    if (result.status === "success" && result.output) {
      setOriginalText(result.output.profile_text || "");
    }
    setFileUploading(false);
  };

  const handleContinue = async () => {
    if (!name.trim()) return;
    setUploading(true);
    const card = await base44.entities.ProfileCard.create({
      candidate_name: name.trim(),
      gender,
      original_card_text: originalText,
      community_style: communityStyle || undefined,
      status: "questionnaire"
    });
    navigate(`/Questionnaire?id=${card.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <div className="text-4xl mb-3">💍</div>
        <h1 className="text-2xl font-bold text-rose-900">{t("newProfileTitle")}</h1>
        <p className="text-stone-500 mt-1">{t("newProfileSubtitle")}</p>
      </div>

      <div className="space-y-8 bg-white rounded-2xl border border-rose-100 shadow-sm p-6 sm:p-8">
        {/* Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-rose-900">🌸 {t("candidateName")}</Label>
          <Input
            placeholder={t("enterFullName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border-rose-200 focus:border-rose-400"
            style={{ fontSize: "16px" }}
          />
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-rose-900">🕊️ {t("gender")}</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="female" className="border-rose-300 text-rose-600" />
              <Label htmlFor="female" className="cursor-pointer text-stone-600">{t("female")}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="male" className="border-rose-300 text-rose-600" />
              <Label htmlFor="male" className="cursor-pointer text-stone-600">{t("male")}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Community Style */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-rose-900">💐 {t("communityStyle")}</Label>
          <MobileSelect
            value={communityStyle}
            onValueChange={setCommunityStyle}
            placeholder={t("selectCommunity")}
            options={[
              { value: "dati", label: t("dati") },
              { value: "dati_lite", label: t("datiLite") },
              { value: "chozer_bitshuva", label: t("chozerBitshuva") },
              { value: "dati_torani", label: t("datiTorani") },
              { value: "yeshivish", label: t("yeshivish") },
              { value: "chassidish", label: t("chassidish") },
              { value: "other", label: t("other") },
            ]}
            triggerClassName="h-11 rounded-xl border-rose-200"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-rose-50" />

        {/* Existing card */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-rose-900">📋 {t("existingCard")}</Label>
          <p className="text-xs text-stone-400">{t("existingCardHint")}</p>

          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-rose-200 text-sm text-stone-500 hover:border-rose-400 hover:text-rose-700 cursor-pointer transition-colors">
              <UploadIcon className="w-4 h-4" />
              {fileUploading ? t("extracting") : t("uploadFile")}
              <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt" onChange={handleFileUpload} />
            </label>
          </div>

          <Textarea
            placeholder={t("pasteCard")}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="min-h-[140px] rounded-xl border-rose-200 resize-none"
          />
        </div>

        {/* Continue */}
        <Button
          onClick={handleContinue}
          disabled={!name.trim() || uploading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200/40 text-base"
        >
          {uploading ? t("creating") : t("continueBtn")}
          <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
        </Button>
      </div>
    </motion.div>
  );
}