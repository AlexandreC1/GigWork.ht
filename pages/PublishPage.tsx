import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const phases = [
  { title: '1. Web production', detail: 'Deploy Vite build to Vercel/Netlify with HTTPS, CSP headers, analytics, error reporting, and Supabase environment variables.' },
  { title: '2. PWA installability', detail: 'Add manifest, service worker, app icons, offline fallback, install prompt, and Lighthouse PWA checks.' },
  { title: '3. Android wrapper', detail: 'Add Capacitor, configure com.gigwork.ht package id, generate Android project, and map deep links to app routes.' },
  { title: '4. Release hardening', detail: 'Configure signing key, privacy policy, data safety form, screenshots, crash reporting, staged rollout, and Play Integrity checks.' },
];

const PublishPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="publish-page">
      <div className="page-heading">
        <p className="eyebrow">Mobile launch</p>
        <h1>{t('publish_title')}</h1>
        <p>{t('publish_subtitle')}</p>
      </div>
      <div className="timeline">
        {phases.map((phase) => (
          <article key={phase.title}>
            <h2>{phase.title}</h2>
            <p>{phase.detail}</p>
          </article>
        ))}
      </div>
      <div className="command-panel">
        <h2>Implementation commands after backend keys exist</h2>
        <pre>{`npm install @capacitor/core @capacitor/cli @capacitor/android vite-plugin-pwa
npx cap init GigWork.ht com.gigwork.ht --web-dir=dist
npm run build
npx cap add android
npx cap sync android
npx cap open android`}</pre>
      </div>
    </section>
  );
};

export default PublishPage;
