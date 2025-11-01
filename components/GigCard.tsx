
import React from 'react';
import { Link } from 'react-router-dom';
import { Gig } from '../types';
import Rating from './Rating';
import { useTranslation } from '../hooks/useTranslation';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

interface GigCardProps {
  gig: Gig;
}

const FavoriteButton: React.FC<{ gigId: string }> = ({ gigId }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const isFav = isFavorite(gigId);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent navigation when clicking the button
        e.stopPropagation();
        if (isFav) {
            removeFavorite(gigId);
        } else {
            addFavorite(gigId);
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-brand-secondary hover:text-red-500 transition-all duration-200"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
        </button>
    );
}


const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const worker = gig.worker;

  if (!worker) {
    // This should not happen if the API provides the worker data
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out relative">
      <img className="h-48 w-full object-cover" src={gig.image} alt={gig.title} />
      {user && <FavoriteButton gigId={gig.id} />}
      <div className="p-4">
        <p className="text-sm text-brand-primary font-semibold">{gig.category.toUpperCase()}</p>
        <h3 className="font-bold text-xl mt-1 mb-2 text-brand-dark">{gig.title}</h3>
        <div className="flex items-center mb-3">
          <img src={worker.avatar} alt={worker.name} className="w-8 h-8 rounded-full object-cover mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-800">{worker.name}</p>
            <Rating rating={worker.rating} reviewCount={worker.reviewsCount} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-brand-primary">${gig.price.toFixed(2)}</p>
          <Link
            to={`/gig/${gig.id}`}
            className="bg-brand-secondary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            {t('gig_card_view_details')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
