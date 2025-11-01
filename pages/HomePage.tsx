
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { Gig } from '../types';
import { apiService } from '../services/apiService';
import GigCard from '../components/GigCard';
import Loader from '../components/Loader';
import { useTranslation } from '../hooks/useTranslation';

const HomePage: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t } = useTranslation();

  useEffect(() => {
    const loadGigs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedGigs = await apiService.fetchGigs();
        setGigs(fetchedGigs);
      } catch (err) {
        setError(t('error_fetch_gigs'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadGigs();
  }, [t]);


  const filteredGigs = gigs.filter(gig => {
    const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">{t('home_title')}</h1>
        <p className="text-gray-600">{t('home_subtitle')}</p>
        <div className="mt-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder={t('home_search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              selectedCategory === category
                ? 'bg-brand-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category === 'All' ? t('category_all') : category}
          </button>
        ))}
      </div>
      
      {isLoading && <Loader text={t('loading')} />}
      {error && <p className="text-center text-red-500 mt-8">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGigs.length > 0 ? (
            filteredGigs.map(gig => <GigCard key={gig.id} gig={gig} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">{t('home_no_gigs')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
