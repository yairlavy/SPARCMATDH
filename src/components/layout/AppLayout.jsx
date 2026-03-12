import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Upload, History, BarChart3, LogOut, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, toggleLang, lang, isRTL } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { path: "/Home", labelKey: "home", icon: Home },
    { path: "/Upload", labelKey: "newProfile", icon: Upload },
    { path: "/History", labelKey: "history", icon: History },
    { path: "/FeedbackDashboard", labelKey: "insights", icon: BarChart3 },
  ];

  const handleDeleteAccount = async () => {
    if (window.confirm(lang === "he" ? "האם אתה בטוח שברצונך למחוק את החשבון?" : "Are you sure you want to delete your account?")) {
      // Could add actual delete logic here
      base44.auth.logout("/");
    }
    setShowMenu(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-rose-50/60 via-white to-pink-50/30"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Top Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-rose-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/Home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-md shadow-rose-200/50">
                <span className="text-white text-lg">💍</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-rose-900">
                פרופיל לשידוך
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <nav className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-rose-100/80 text-rose-900"
                          : "text-stone-500 hover:text-rose-800 hover:bg-rose-50/60"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
              </nav>

              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all"
              >
                <span>{lang === "he" ? "🇬🇧" : "🇮🇱"}</span>
                {t("langToggle")}
              </button>

              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-stone-500 hover:text-rose-700 hover:bg-rose-50 transition-all"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 mt-1 w-48 bg-white rounded-xl border border-rose-100 shadow-lg z-50 overflow-hidden"
                    >
                      <button
                        onClick={() => { base44.auth.logout("/"); setShowMenu(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-stone-600 hover:bg-rose-50 hover:text-rose-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {lang === "he" ? "התנתק" : "Log out"}
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        {lang === "he" ? "מחק חשבון" : "Delete Account"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-rose-200/50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path, { replace: isActive })}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs transition-all select-none",
                  isActive ? "text-rose-800" : "text-stone-400"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-rose-600")} />
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content with page transition */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Click outside to close menu */}
      {showMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
}