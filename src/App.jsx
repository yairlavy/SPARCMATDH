import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { useEffect } from 'react';

import AppLayout from '@/components/layout/AppLayout';
import { LanguageProvider } from '@/components/LanguageContext';
import Landing from '@/pages/Landing';
import Home from '@/pages/Home';
import Upload from '@/pages/Upload';
import Questionnaire from '@/pages/Questionnaire';
import PartnerPreferences from '@/pages/PartnerPreferences';
import GeneratedProfile from '@/pages/GeneratedProfile';
import History from '@/pages/History';
import FeedbackDashboard from '@/pages/FeedbackDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-amber-50/30">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AppLayout />}>
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/Landing" element={<Navigate to="/" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Questionnaire" element={<Questionnaire />} />
        <Route path="/PartnerPreferences" element={<PartnerPreferences />} />
        <Route path="/GeneratedProfile" element={<GeneratedProfile />} />
        <Route path="/History" element={<History />} />
        <Route path="/FeedbackDashboard" element={<FeedbackDashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = (e) => document.documentElement.classList.toggle('dark', e.matches);
    apply(mq);
    mq.addEventListener('change', apply);

    // Global tap highlight & overscroll
    const style = document.createElement('style');
    style.textContent = `
      html, body { overscroll-behavior: none; }
      button, a, [role="button"], [role="tab"], [role="option"], nav * {
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        -webkit-user-select: none;
      }
      svg { -webkit-tap-highlight-color: transparent; }
    `;
    document.head.appendChild(style);

    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App