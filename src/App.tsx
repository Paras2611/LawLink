/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { LegalSearch } from './pages/LegalSearch';
import { CaseSearch } from './pages/CaseSearch';
import { Documents } from './pages/Documents';
import { SavedResearch } from './pages/SavedResearch';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/chat': 'Ask LawLink',
  '/search': 'Legal Search',
  '/cases': 'Case Search',
  '/documents': 'Documents',
  '/saved': 'Saved Research',
  '/history': 'History',
  '/settings': 'Settings',
  '/profile': 'Profile',
  '/auth/login': 'Login',
  '/auth/register': 'Register',
};

function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');

  useEffect(() => {
    const pageTitle = routeTitles[location.pathname];
    document.title = pageTitle ? `${pageTitle} - Law Link` : 'Law Link';
  }, [location.pathname]);

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<LegalSearch />} />
        <Route path="/cases" element={<CaseSearch />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/saved" element={<SavedResearch />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
