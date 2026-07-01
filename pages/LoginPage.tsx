import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { UserRole } from '../types';

const roleOptions = [UserRole.Customer, UserRole.Worker, UserRole.Admin];

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Customer);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const labelForRole = (item: UserRole) => {
    if (item === UserRole.Worker) return t('role_worker');
    if (item === UserRole.Admin) return t('role_admin');
    return t('role_customer');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await login(name, role);
    setIsLoading(false);
    navigate(role === UserRole.Admin ? '/stats' : '/');
  };

  return (
    <section className="auth-layout">
      <div className="auth-art">
        <p className="eyebrow">Auth + authorization preview</p>
        <h1>{t('login_title')}</h1>
        <p>{t('login_subtitle')}</p>
        <div className="auth-checklist">
          <span>Session persistence</span>
          <span>Role permissions</span>
          <span>Production RLS plan</span>
        </div>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>{t('login_name_label')}</span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder={t('login_name_placeholder')} required />
        </label>
        <fieldset>
          <legend>{t('login_role_label')}</legend>
          <div className="role-grid">
            {roleOptions.map((item) => (
              <button key={item} type="button" className={role === item ? 'role-card selected' : 'role-card'} onClick={() => setRole(item)}>
                <strong>{labelForRole(item)}</strong>
                <small>{item === UserRole.Admin ? 'Stats and security' : item === UserRole.Worker ? 'Create and manage services' : 'Book and save services'}</small>
              </button>
            ))}
          </div>
        </fieldset>
        <Button type="submit" disabled={isLoading}>{isLoading ? t('login_logging_in') : t('login_button')}</Button>
      </form>
    </section>
  );
};

export default LoginPage;
