
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import Button from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Customer);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, role);
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">{t('login_title')}</h1>
        <p className="text-center text-gray-600 mb-8">{t('login_subtitle')}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('login_name_label')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('login_name_placeholder')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
              required
            />
          </div>
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">{t('login_role_label')}</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole(UserRole.Customer)}
                className={`p-4 border rounded-lg text-center transition-all ${
                  role === UserRole.Customer ? 'bg-brand-primary text-white border-brand-primary ring-2 ring-offset-2 ring-brand-primary' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-4xl">👥</span>
                <span className="block mt-2 font-semibold">{t('role_customer')}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.Worker)}
                className={`p-4 border rounded-lg text-center transition-all ${
                  role === UserRole.Worker ? 'bg-brand-primary text-white border-brand-primary ring-2 ring-offset-2 ring-brand-primary' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-4xl">🛠️</span>
                <span className="block mt-2 font-semibold">{t('role_worker')}</span>
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full text-lg">
            {t('login_button')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
