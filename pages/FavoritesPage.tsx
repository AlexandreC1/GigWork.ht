
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { apiService } from '../services/apiService';
import { Gig } from '../types';
import GigCard from '../components/GigCard';
import Loader from '../components/Loader';
import { useTranslation } from '../hooks/useTranslation';

const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const { favoriteIds, isLoading: favoritesLoading } = useFavorites();
  const { t } = useTranslation();
  
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteGigs = async () => {
      if (!user || favoritesLoading) return;
      
      setIsLoading(true);
      if (favoriteIds.length > 0) {
        const gigs = await apiService.fetchGigsByIds(favoriteIds);
        setFavoriteGigs(gigs);
      } else {
        setFavoriteGigs([]);
      }
      setIsLoading(false);
    };

    fetchFavoriteGigs();
  }, [user, favoriteIds, favoritesLoading]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isLoadingOverall = isLoading || favoritesLoading;

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">{t('favorites_title')}</h1>
      </div>
      
      {isLoadingOverall && <Loader text={t('loading')} />}
      
      {!isLoadingOverall && (
        <>
          {favoriteGigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteGigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <p className="mt-4 text-lg text-gray-500">{t('favorites_empty')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
