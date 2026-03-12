import React from "react";
import { User, Route, Heart, Sparkles, Palette, Target, BookOpen, Home, Compass } from "lucide-react";

const iconMap = {
  User, Route, Heart, Sparkles, Palette, Target, BookOpen, Home, Compass
};

export default function SectionHeader({ title, iconName, current, total }) {
  const Icon = iconMap[iconName] || Sparkles;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
          <p className="text-xs text-stone-400">Section {current} of {total}</p>
        </div>
      </div>
    </div>
  );
}