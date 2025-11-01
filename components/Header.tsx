
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, setLanguage, language } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#D21034',
    textDecoration: 'underline',
  };
  
  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) { // Tailwind's `md` breakpoint
            setIsMobileMenuOpen(false);
        }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleMobileLinkClick = () => {
      setIsMobileMenuOpen(false);
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <nav className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-haiti-blue flex-shrink-0">
          GigWork<span className="text-haiti-red">.ht</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-haiti-red transition-colors">{t('header_home')}</NavLink>
          {user && (
               <NavLink to="/favorites" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-haiti-red transition-colors">{t('header_favorites')}</NavLink>
          )}
          {user?.role === UserRole.Worker && (
            <NavLink to="/ai-tools" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-haiti-red transition-colors">{t('header_ai_tools')}</NavLink>
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
             <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'es' | 'ht')}
              className="bg-gray-100 border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
            >
              <option value="en">English</option>
              <option value="ht">Kreyòl</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary" />
                <span className="font-semibold hidden sm:block">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="bg-brand-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                {t('header_logout')}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              {t('header_login')}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label={isMobileMenuOpen ? t('header_close_menu') : t('header_open_menu')}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-md text-brand-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-5 space-y-3">
            <NavLink to="/" onClick={handleMobileLinkClick} className="block text-lg py-2 text-center text-gray-700 hover:bg-gray-100 rounded-md">{t('header_home')}</NavLink>
             {user && (
               <NavLink to="/favorites" onClick={handleMobileLinkClick} className="block text-lg py-2 text-center text-gray-700 hover:bg-gray-100 rounded-md">{t('header_favorites')}</NavLink>
            )}
            {user?.role === UserRole.Worker && (
                <NavLink to="/ai-tools" onClick={handleMobileLinkClick} className="block text-lg py-2 text-center text-gray-700 hover:bg-gray-100 rounded-md">{t('header_ai_tools')}</NavLink>
            )}
             <div className="border-t border-gray-200 !mt-4 pt-4 space-y-4">
                {user ? (
                    <>
                        <Link to="/profile" onClick={handleMobileLinkClick} className="flex items-center justify-center space-x-3 py-2 text-lg hover:bg-gray-100 rounded-md">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary" />
                            <span className="font-semibold text-gray-800">{user.name}</span>
                        </Link>
                         <button
                            onClick={() => { logout(); handleMobileLinkClick(); }}
                            className="w-full bg-brand-secondary text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-all font-semibold"
                        >
                            {t('header_logout')}
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        onClick={handleMobileLinkClick}
                        className="block w-full text-center bg-brand-primary text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-all font-semibold"
                        >
                        {t('header_login')}
                    </Link>
                )}
                 <div className="flex justify-center pt-2">
                     <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'es' | 'ht')}
                      className="bg-gray-100 border-gray-300 rounded-md py-2 px-3 focus:ring-brand-primary focus:border-brand-primary"
                    >
                      <option value="en">English</option>
                      <option value="ht">Kreyòl</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                    </select>
                 </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
