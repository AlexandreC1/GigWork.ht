
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GigDetailPage from './pages/GigDetailPage';
import BookingPage from './pages/BookingPage';
import AIToolsPage from './pages/AIToolsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AddGigPage from './pages/AddGigPage';
import FavoritesPage from './pages/FavoritesPage';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <HashRouter>
            <div className="bg-brand-light min-h-screen font-sans text-brand-dark">
              <Header />
              <main className="container mx-auto p-4 md:p-6">
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
              </main>
            </div>
          </HashRouter>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
