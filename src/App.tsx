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
import { CaseDetail } from './pages/CaseDetail';
import { Documents } from './pages/Documents';
import { DocumentWorkspace } from './pages/DocumentWorkspace';
import { SavedResearch } from './pages/SavedResearch';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { EvidenceDemo } from './pages/EvidenceDemo';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

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
  '/login': 'Login',
  '/register': 'Register',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
};

function AppContent() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  useEffect(() => {
    const pageTitle = routeTitles[location.pathname];
    document.title = pageTitle ? `${pageTitle} - Law Link` : 'Law Link';
  }, [location.pathname]);

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><LegalSearch /></ProtectedRoute>} />
        <Route path="/cases" element={<ProtectedRoute><CaseSearch /></ProtectedRoute>} />
        <Route path="/cases/:id" element={<ProtectedRoute><CaseDetail /></ProtectedRoute>} />
        <Route path="/verification" element={<ProtectedRoute><EvidenceDemo /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
        <Route path="/documents/:id" element={<ProtectedRoute><DocumentWorkspace /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedResearch /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
