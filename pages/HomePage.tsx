import React, { useEffect, useMemo, useState } from 'react';
import { CATEGORIES } from '../constants';
import { Gig, PlatformStats } from '../types';
import { apiService } from '../services/apiService';
import GigCard from '../components/GigCard';
import Loader from '../components/Loader';
import { useTranslation } from '../hooks/useTranslation';

const HomePage: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t } = useTranslation();

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [nextGigs, nextStats] = await Promise.all([apiService.fetchGigs(), apiService.fetchPlatformStats()]);
        setGigs(nextGigs);
        setStats(nextStats);
      } catch (err) {
        setError(t('error_fetch_gigs'));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [t]);

  const filteredGigs = useMemo(() => gigs.filter((gig) => {
    const haystack = [gig.title, gig.description, gig.category, gig.city, gig.worker?.name, ...(gig.tags || [])].join(' ').toLowerCase();
    const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  }), [gigs, searchTerm, selectedCategory]);

  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">GigWork.ht network</p>
          <h1>{t('home_title')}</h1>
          <p>{t('home_subtitle')}</p>
          <div className="search-dock">
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t('home_search_placeholder')} />
          </div>
        </div>
        <div className="hero-ops" aria-label="Marketplace metrics">
          <div><strong>{stats?.verifiedWorkers ?? 0}</strong><span>verified workers</span></div>
          <div><strong>{stats?.averageResponseMinutes ?? 0}m</strong><span>avg response</span></div>
          <div><strong>{stats?.disputeRate ?? 0}%</strong><span>dispute rate</span></div>
        </div>
      </section>

      <div className="category-rail" aria-label="Service categories">
        {CATEGORIES.map((category) => (
          <button key={category} type="button" className={selectedCategory === category ? 'active' : ''} onClick={() => setSelectedCategory(category)}>
            {category === 'All' ? t('category_all') : category}
          </button>
        ))}
      </div>

      {isLoading && <Loader text={t('loading')} />}
      {error && <p className="error-text">{error}</p>}

      {!isLoading && !error && (
        <section className="service-grid" aria-label="Available services">
          {filteredGigs.length ? filteredGigs.map((gig) => <GigCard key={gig.id} gig={gig} />) : <p className="empty-state">{t('home_no_gigs')}</p>}
        </section>
      )}
    </div>
  );
};

export default HomePage;
