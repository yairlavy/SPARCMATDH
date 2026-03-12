import React, { createContext, useContext, useState, useEffect } from "react";

// All translations
const translations = {
  en: {
    // Nav
    home: "Home",
    newProfile: "New Profile",
    history: "History",
    insights: "Insights",
    appName: "ShidduchPro",
    langToggle: "עברית",

    // Home
    premiumBadge: "Premium Profile Rewriting",
    heroTitle1: "Transform every profile into its",
    heroTitle2: "best version",
    heroSubtitle: "Craft polished, authentic shidduch profiles that truly represent the person — warm, concise, and memorable.",
    startNewProfile: "Start New Profile",
    viewHistory: "View History",
    howItWorks: "How It Works",
    step1: "Upload existing card",
    step2: "Answer guided questions",
    step3: "Get polished summary",
    step4: "Edit & finalize",
    feat1Title: "Smart Questionnaire",
    feat1Desc: "Deep, warm questions that reveal authentic personality and uniqueness",
    feat2Title: "AI-Powered Rewriting",
    feat2Desc: "Elegant 4-paragraph summaries that sound human and refined",
    feat3Title: "Learning System",
    feat3Desc: "Improves over time based on your feedback and preferences",

    // Upload
    newProfileTitle: "New Profile",
    newProfileSubtitle: "Start by entering basic details and the existing card if available.",
    candidateName: "Candidate's Name",
    enterFullName: "Enter full name",
    gender: "Gender",
    female: "Female",
    male: "Male",
    communityStyle: "Community / Religious Style",
    selectCommunity: "Select community style",
    dati: "Dati",
    datiLite: "Dati Lite",
    chozerBitshuva: "Chozer Bitshuva",
    datiTorani: "Dati Torani",
    yeshivish: "Yeshivish",
    chassidish: "Chassidish",
    other: "Other",
    continueWeb: "Continue on Website",
    continueWebSub: "Use in browser",
    downloadApp: "Download App",
    downloadAppSub: "Coming soon",
    downloadComingSoon: "The app download will be available soon!",
    existingCard: "Existing Profile Card",
    existingCardHint: "Upload a file or paste the existing card text below. This is optional.",
    uploadFile: "Upload File",
    extracting: "Extracting...",
    pasteCard: "Paste the existing profile card text here...",
    continueBtn: "Continue to Questionnaire",
    creating: "Creating...",

    // Questionnaire / Progress
    progress: "Progress",
    back: "Back",
    nextSection: "Next Section",
    continueToPartnerPrefs: "Continue to Partner Preferences",
    saving: "Saving...",

    // Partner Preferences
    partnerPrefsTitle: "Partner Preferences",
    partnerPrefsSubtitle: "What are they looking for in a partner?",
    generateProfile: "Generate Profile",

    // Generated Profile
    generatedSummary: "Generated Profile Summary",
    crafting: "Crafting the perfect profile...",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    regenerate: "Regenerate",
    feedback: "Feedback",
    finalize: "Finalize",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    viewOriginal: "View original card",
    changesSaved: "Changes saved",
    profileFinalized: "Profile finalized!",
    copiedToClipboard: "Copied to clipboard",

    // History
    profileHistory: "Profile History",
    profiles: "profiles",
    noProfiles: "No profiles yet",
    createFirst: "Create Your First Profile",
    statusDraft: "Draft",
    statusQuestionnaire: "Questionnaire",
    statusPreferences: "Preferences",
    statusGenerated: "Generated",
    statusEdited: "Edited",
    statusFinalized: "Finalized",

    // Feedback
    giveFeedback: "Give Feedback",
    likedThis: "Liked this version",
    tooGeneric: "Too generic",
    tooFormal: "Too formal",
    notAccurate: "Not accurate",
    betterPersonality: "Better emphasis on personality",
    additionalNotes: "Any additional notes? (optional)",
    submitFeedback: "Submit Feedback",
    submitRegenerate: "Submit & Regenerate",
    feedbackSaved: "Feedback saved — thank you!",

    // Dashboard
    insightsTitle: "Insights & Feedback",
    insightsSubtitle: "Track patterns and improve future profiles",
    totalProfiles: "Total Profiles",
    finalized: "Finalized",
    feedbackItems: "Feedback Items",
    avgRegenerations: "Avg Regenerations",
    feedbackDistribution: "Feedback Distribution",
    recentFeedback: "Recent Feedback",
    noFeedback: "No feedback yet",
    liked: "Liked",
    tooGenericLabel: "Too Generic",
    tooFormalLabel: "Too Formal",
    notAccurateLabel: "Not Accurate",
    morePersonality: "More Personality",
  },
  he: {
    // Nav
    home: "בית",
    newProfile: "פרופיל חדש",
    history: "היסטוריה",
    insights: "תובנות",
    appName: "שידוך פרופיל",
    langToggle: "English",

    // Home
    premiumBadge: "כתיבה מחדש של פרופילים ",
    heroTitle1: "הפכו כל פרופיל ",
    heroTitle2: "לגרסה הטובה ביותר שלו",
    heroSubtitle: "כתבו פרופילי שידוך מלוטשים ואותנטיים שמייצגים את האדם באמת — חמים, תמציתיים ובלתי נשכחים.",
    startNewProfile: "התחל פרופיל חדש",
    viewHistory: "צפה בהיסטוריה",
    howItWorks: "איך זה עובד",
    step1: "העלאת כרטיס קיים",
    step2: "מענה על שאלות מנחות",
    step3: "קבלת סיכום מלוטש",
    step4: "עריכה וסיום",
    feat1Title: "שאלון חכם",
    feat1Desc: "שאלות עמוקות וחמות שחושפות אישיות אותנטית וייחודיות",
    feat2Title: "כתיבה מחדש בעזרת AI",
    feat2Desc: "סיכומים אלגנטיים של כ-4 פסקאות שנשמעים אנושיים ומעודנים",
    feat3Title: "מערכת לומדת",
    feat3Desc: "משתפרת עם הזמן על סמך המשוב וההעדפות שלך",

    // Upload
    newProfileTitle: "פרופיל חדש",
    newProfileSubtitle: "התחל על ידי הזנת פרטים בסיסיים וכרטיס קיים אם יש.",
    candidateName: "שם המועמד/ת",
    enterFullName: "הכנס שם מלא",
    gender: "מין",
    female: "אישה",
    male: "גבר",
    communityStyle: "סגנון קהילה / דתי",
    selectCommunity: "בחר סגנון קהילה",
    dati: "דתי",
    datiLite: "דתי לייט",
    chozerBitshuva: "חוזר בתשובה",
    datiTorani: "דתי תורני",
    yeshivish: "דתי ישיבתי",
    chassidish: "דתי חסידי",
    other: "אחר",
    continueWeb: "המשך באתר",
    continueWebSub: "גישה דרך הדפדפן",
    downloadApp: "הורד אפליקציה",
    downloadAppSub: "בקרוב",
    downloadComingSoon: "הורדת האפליקציה תהיה זמינה בקרוב!",
    existingCard: "כרטיס פרופיל קיים",
    existingCardHint: "העלה קובץ או הדבק את טקסט הכרטיס הקיים למטה. זה אופציונלי.",
    uploadFile: "העלאת קובץ",
    extracting: "מחלץ...",
    pasteCard: "הדבק כאן את טקסט כרטיס הפרופיל הקיים...",
    continueBtn: "המשך לשאלון",
    creating: "יוצר...",

    // Questionnaire / Progress
    progress: "התקדמות",
    back: "חזור",
    nextSection: "קטע הבא",
    continueToPartnerPrefs: "המשך להעדפות שידוך",
    saving: "שומר...",

    // Partner Preferences
    partnerPrefsTitle: "העדפות שידוך",
    partnerPrefsSubtitle: "מה הם מחפשים בבן/בת זוג?",
    generateProfile: "צור פרופיל",

    // Generated Profile
    generatedSummary: "סיכום פרופיל שנוצר",
    crafting: "מעצב את הפרופיל המושלם...",
    copy: "העתק",
    copied: "הועתק",
    edit: "ערוך",
    regenerate: "צור מחדש",
    feedback: "משוב",
    finalize: "סיים",
    saveChanges: "שמור שינויים",
    cancel: "ביטול",
    viewOriginal: "הצג כרטיס מקורי",
    changesSaved: "שינויים נשמרו",
    profileFinalized: "הפרופיל הושלם!",
    copiedToClipboard: "הועתק ללוח",

    // History
    profileHistory: "היסטוריית פרופילים",
    profiles: "פרופילים",
    noProfiles: "אין פרופילים עדיין",
    createFirst: "צור את הפרופיל הראשון שלך",
    statusDraft: "טיוטה",
    statusQuestionnaire: "שאלון",
    statusPreferences: "העדפות",
    statusGenerated: "נוצר",
    statusEdited: "נערך",
    statusFinalized: "הושלם",

    // Feedback
    giveFeedback: "תן משוב",
    likedThis: "אהבתי גרסה זו",
    tooGeneric: "כללי מדי",
    tooFormal: "פורמלי מדי",
    notAccurate: "לא מדויק",
    betterPersonality: "דגש טוב יותר על אישיות",
    additionalNotes: "הערות נוספות? (אופציונלי)",
    submitFeedback: "שלח משוב",
    submitRegenerate: "שלח וצור מחדש",
    feedbackSaved: "המשוב נשמר — תודה!",

    // Dashboard
    insightsTitle: "תובנות ומשוב",
    insightsSubtitle: "עקוב אחר דפוסים ושפר פרופילים עתידיים",
    totalProfiles: "סה\"כ פרופילים",
    finalized: "הושלמו",
    feedbackItems: "פריטי משוב",
    avgRegenerations: "ממוצע יצירות מחדש",
    feedbackDistribution: "התפלגות משוב",
    recentFeedback: "משוב אחרון",
    noFeedback: "אין משוב עדיין",
    liked: "אהבתי",
    tooGenericLabel: "כללי מדי",
    tooFormalLabel: "פורמלי מדי",
    notAccurateLabel: "לא מדויק",
    morePersonality: "יותר אישיות",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("shidduch_lang") || "he"; } catch { return "he"; }
  });

  useEffect(() => {
    try { localStorage.setItem("shidduch_lang", lang); } catch {}
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
  const toggleLang = () => setLang(l => l === "en" ? "he" : "en");

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL: lang === "he" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "he", t: (k) => k, toggleLang: () => {}, isRTL: true };
  return ctx;
}