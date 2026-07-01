import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { SecurityEvent } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';

const controls = [
  'Supabase Auth with MFA-ready email, phone, and OAuth providers',
  'Postgres row-level security for every user-owned table',
  'Signed payment webhooks with replay protection and idempotency keys',
  'Device/session table for suspicious login and booking velocity limits',
  'Audit log for profile, gig, booking, payout, and admin changes',
  'Content moderation queue for listings, reviews, and message abuse reports',
];

const SecurityPage: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const { hasPermission } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    apiService.fetchSecurityEvents().then(setEvents);
  }, []);

  return (
    <section className="security-page">
      <div className="page-heading">
        <p className="eyebrow">Trust architecture</p>
        <h1>{t('security_title')}</h1>
        <p>{t('security_subtitle')}</p>
      </div>
      <div className="security-grid">
        <article className="security-card wide">
          <h2>Authorization model</h2>
          <p>Customers create bookings and reviews. Workers create services and manage their own bookings. Admins see operational aggregates and security queues. Server-side RLS enforces the same model even when clients are modified.</p>
        </article>
        {controls.map((control) => <article className="security-card" key={control}>{control}</article>)}
      </div>
      <section className="event-stream">
        <h2>{hasPermission('security:view') ? 'Live risk queue' : 'Security preview'}</h2>
        {events.map((event) => (
          <div className="event-row" key={event.id}>
            <span className={`severity ${event.severity}`}>{event.severity}</span>
            <strong>{event.title}</strong>
            <p>{event.detail}</p>
            <em>{event.status}</em>
          </div>
        ))}
      </section>
    </section>
  );
};

export default SecurityPage;
