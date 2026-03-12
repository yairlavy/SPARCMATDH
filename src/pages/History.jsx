import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, ChevronRight, RefreshCw } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { format } from "date-fns";
import { useLanguage } from "@/components/LanguageContext";

export default function History() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(null);
  const PULL_THRESHOLD = 70;

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const dist = Math.max(0, Math.min(e.touches[0].clientY - touchStartY.current, 100));
    setPullDistance(dist);
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setIsPulling(true);
      await queryClient.invalidateQueries({ queryKey: ["profileCards"] });
      setIsPulling(false);
    }
    touchStartY.current = null;
    setPullDistance(0);
  };

  const statusColors = {
    draft: "bg-stone-100 text-stone-600",
    questionnaire: "bg-blue-100 text-blue-700",
    preferences: "bg-purple-100 text-purple-700",
    generated: "bg-rose-100 text-rose-700",
    edited: "bg-emerald-100 text-emerald-700",
    finalized: "bg-pink-100 text-pink-700",
  };

  const statusLabelKeys = {
    draft: "statusDraft",
    questionnaire: "statusQuestionnaire",
    preferences: "statusPreferences",
    generated: "statusGenerated",
    edited: "statusEdited",
    finalized: "statusFinalized",
  };

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["profileCards"],
    queryFn: () => base44.entities.ProfileCard.list("-created_date"),
  });

  const getRoute = (card) => {
    if (card.status === "draft" || card.status === "questionnaire") return `/Questionnaire?id=${card.id}`;
    if (card.status === "preferences") return `/PartnerPreferences?id=${card.id}`;
    return `/GeneratedProfile?id=${card.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <motion.div
        animate={{ height: pullDistance > 0 || isPulling ? 48 : 0, opacity: pullDistance > 10 || isPulling ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center justify-center overflow-hidden"
      >
        <motion.div animate={{ rotate: isPulling ? 360 : pullDistance * 3.6 }} transition={isPulling ? { repeat: Infinity, duration: 0.7, ease: "linear" } : {}}>
          <RefreshCw className={`w-5 h-5 ${pullDistance >= PULL_THRESHOLD || isPulling ? "text-rose-500" : "text-stone-300"}`} />
        </motion.div>
      </motion.div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-rose-900">💍 {t("profileHistory")}</h1>
          <p className="text-stone-500 text-sm mt-0.5">{cards.length} {t("profiles")}</p>
        </div>
        <Link to="/Upload">
          <Button className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
            <Plus className="w-4 h-4 me-1.5" />
            {t("newProfile")}
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💐</div>
          <p className="text-stone-500 mb-4">{t("noProfiles")}</p>
          <Link to="/Upload">
            <Button className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white">
              {t("createFirst")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(getRoute(card))}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 cursor-pointer transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center flex-shrink-0 text-xl">
                {card.gender === "female" ? "👩" : "👨"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-rose-900 truncate">{card.candidate_name}</h3>
                  <Badge className={`${statusColors[card.status]} text-xs border-0 px-2 py-0.5`}>
                    {t(statusLabelKeys[card.status])}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  {card.community_style && (
                    <span className="capitalize">{card.community_style.replace(/_/g, " ")}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(card.created_date), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-rose-500 transition-colors flex-shrink-0 rtl:rotate-180" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}