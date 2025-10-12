
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, setLanguage, language } = useTranslation();

  const activeLinkStyle = {
    color: '#D21034',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-haiti-blue">
          GigWork<span className="text-haiti-red">.ht</span>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="text-gray-600 hover:text-haiti-red transition-colors">{t('header_home')}</NavLink>
            {user?.role === UserRole.Worker && (
              <NavLink to="/ai-tools" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="text-gray-600 hover:text-haiti-red transition-colors">{t('header_ai_tools')}</NavLink>
            )}
          </div>
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
        </div>
        <div>
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
      </nav>
    </header>
  );
};

export default Header;
