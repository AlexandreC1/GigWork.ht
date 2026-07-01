import React, { Suspense, lazy } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Loader from './components/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const GigDetailPage = lazy(() => import('./pages/GigDetailPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AIToolsPage = lazy(() => import('./pages/AIToolsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AddGigPage = lazy(() => import('./pages/AddGigPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const PublishPage = lazy(() => import('./pages/PublishPage'));

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <HashRouter>
            <div className="app-shell">
              <Header />
              <main className="app-main">
                <Suspense fallback={<Loader text="Loading..." />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gig/:id" element={<GigDetailPage />} />
                    <Route path="/book/:id" element={<BookingPage />} />
                    <Route path="/ai-tools" element={<AIToolsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/add-gig" element={<AddGigPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/publish" element={<PublishPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </HashRouter>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
