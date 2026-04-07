import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const GigDetailPage = React.lazy(() => import('./pages/GigDetailPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const AIToolsPage = React.lazy(() => import('./pages/AIToolsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AddGigPage = React.lazy(() => import('./pages/AddGigPage'));
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage'));
const EditProfilePage = React.lazy(() => import('./pages/EditProfilePage'));

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <ToastProvider>
            <HashRouter>
              <div className="bg-brand-light min-h-screen font-sans text-brand-dark">
                <Header />
                <main className="container mx-auto p-4 md:p-6">
                  <ErrorBoundary>
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
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </main>
              </div>
            </HashRouter>
          </ToastProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
