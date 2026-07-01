import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { PlatformStats } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const { user, hasPermission } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    apiService.fetchPlatformStats().then(setStats);
  }, []);

  const locked = !user;

  return (
    <section className="operations-page">
      <div className="page-heading">
        <p className="eyebrow">Analytics layer</p>
        <h1>{t('stats_title')}</h1>
        <p>{t('stats_subtitle')}</p>
      </div>
      {locked ? <p className="notice-panel">Sign in to view role-scoped marketplace analytics.</p> : null}
      <div className="metric-grid">
        <div><span>Active gigs</span><strong>{stats?.activeGigs ?? '-'}</strong></div>
        <div><span>Verified workers</span><strong>{stats?.verifiedWorkers ?? '-'}</strong></div>
        <div><span>Completed bookings</span><strong>{stats?.completedBookings.toLocaleString() ?? '-'}</strong></div>
        <div><span>Monthly volume</span><strong>${stats?.monthlyVolume.toLocaleString() ?? '-'}</strong></div>
      </div>
      <div className="ops-split">
        <article>
          <h2>Production database path</h2>
          <p>Use Supabase Postgres with row-level security: profiles, gigs, bookings, messages, reviews, payments, audit_logs, and device_sessions. Customers can read public gigs and their own bookings; workers manage only their listings; admins read aggregate operational tables.</p>
        </article>
        <article>
          <h2>Stats pipeline</h2>
          <p>Track booking funnel, worker response time, cancellation reasons, dispute aging, webhook delivery, payment capture, and city-level supply gaps. Admin-only views should be backed by materialized daily summaries.</p>
        </article>
        <article>
          <h2>Network readiness</h2>
          <p>Ship optimistic UI, retry queues for messages/bookings, webhook idempotency keys, image compression, CDN caching, and offline-readable saved bookings for unstable mobile networks.</p>
        </article>
        <article>
          <h2>Access level</h2>
          <p>{hasPermission('stats:view-platform') ? 'You are viewing platform-level admin metrics.' : 'You are viewing a role-scoped preview. Admin users unlock full platform metrics.'}</p>
        </article>
      </div>
    </section>
  );
};

export default StatsPage;
