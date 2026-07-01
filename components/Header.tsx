import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../translations';
import { UserRole } from '../types';

const languages: Array<{ value: Language; label: string }> = [
  { value: 'ht', label: 'Kreyol' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Francais' },
  { value: 'es', label: 'Espanol' },
];

const Header: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();
  const { t, setLanguage, language } = useTranslation();

  const navItems = [
    { to: '/', label: t('header_home'), show: true },
    { to: '/stats', label: t('header_stats'), show: Boolean(user) },
    { to: '/security', label: t('header_security'), show: hasPermission('security:view') || user?.role === UserRole.Worker },
    { to: '/publish', label: t('header_publish'), show: true },
    { to: '/favorites', label: t('header_favorites'), show: Boolean(user) },
    { to: '/ai-tools', label: t('header_ai_tools'), show: user?.role === UserRole.Worker },
  ];

  return (
    <header className="app-header">
      <Link to="/" className="brand-mark" aria-label="GigWork.ht home">
        <span className="brand-symbol">G</span>
        <span>
          <strong>GigWork.ht</strong>
          <small>{t('app_tagline')}</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.filter((item) => item.show).map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <select className="language-select" value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Language">
          {languages.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>

        {user ? (
          <div className="identity-chip">
            <Link to="/profile" className="avatar-link">
              <img src={user.avatar} alt="" />
              <span>{user.name}</span>
            </Link>
            <button type="button" className="ghost-button" onClick={logout}>{t('header_logout')}</button>
          </div>
        ) : (
          <Link to="/login" className="solid-button">{t('header_login')}</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
