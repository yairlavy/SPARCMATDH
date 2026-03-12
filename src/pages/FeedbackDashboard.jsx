import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, TrendingUp, FileText, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useLanguage } from "@/components/LanguageContext";

const COLORS = ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#e11d48", "#be123c"];

export default function FeedbackDashboard() {
  const { t } = useLanguage();

  const feedbackLabelKeys = {
    liked: "liked",
    too_generic: "tooGenericLabel",
    too_formal: "tooFormalLabel",
    not_accurate: "notAccurateLabel",
    better_personality: "morePersonality",
    other: "other"
  };

  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => base44.entities.Feedback.list("-created_date"),
  });

  const { data: cards = [] } = useQuery({
    queryKey: ["profileCards"],
    queryFn: () => base44.entities.ProfileCard.list("-created_date"),
  });

  const totalProfiles = cards.length;
  const finalized = cards.filter(c => c.status === "finalized").length;
  const totalFeedback = feedback.length;
  const avgRegenerations = totalProfiles > 0
    ? (cards.reduce((sum, c) => sum + (c.generation_count || 0), 0) / totalProfiles).toFixed(1)
    : 0;

  const typeCounts = {};
  feedback.forEach(f => {
    typeCounts[f.feedback_type] = (typeCounts[f.feedback_type] || 0) + 1;
  });
  const pieData = Object.entries(typeCounts).map(([name, value]) => ({
    name: t(feedbackLabelKeys[name] || name),
    value
  }));

  const recentFeedback = feedback.slice(0, 8);

  const stats = [
    { labelKey: "totalProfiles", value: totalProfiles, icon: FileText, color: "text-rose-600" },
    { labelKey: "finalized", value: finalized, icon: ThumbsUp, color: "text-pink-600" },
    { labelKey: "feedbackItems", value: totalFeedback, icon: MessageSquare, color: "text-rose-500" },
    { labelKey: "avgRegenerations", value: avgRegenerations, icon: TrendingUp, color: "text-pink-500" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-rose-900">📊 {t("insightsTitle")}</h1>
        <p className="text-stone-500 text-sm mt-0.5">{t("insightsSubtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-rose-100">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-xs text-stone-500">{t(stat.labelKey)}</span>
                  </div>
                  <p className="text-2xl font-bold text-rose-900">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid sm:grid-cols-2 gap-6">
        {pieData.length > 0 && (
          <Card className="border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-rose-900">{t("feedbackDistribution")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs text-stone-500">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {item.name} ({item.value})
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-rose-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-rose-900">💌 {t("recentFeedback")}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentFeedback.length === 0 ? (
              <p className="text-sm text-stone-400 py-8 text-center">{t("noFeedback")}</p>
            ) : (
              <div className="space-y-3 max-h-[260px] overflow-y-auto">
                {recentFeedback.map((fb) => (
                  <div key={fb.id} className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50">
                    <Badge className="bg-rose-100 text-rose-700 border-0 text-xs px-2 py-0.5 flex-shrink-0">
                      {t(feedbackLabelKeys[fb.feedback_type] || fb.feedback_type)}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      {fb.feedback_text && (
                        <p className="text-xs text-stone-600 truncate">{fb.feedback_text}</p>
                      )}
                      <p className="text-xs text-stone-400 mt-0.5">
                        {format(new Date(fb.created_date), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}