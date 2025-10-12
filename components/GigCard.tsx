
import React from 'react';
import { Link } from 'react-router-dom';
import { Gig, User } from '../types';
import { USERS } from '../constants';
import Rating from './Rating';
import { useTranslation } from '../hooks/useTranslation';

interface GigCardProps {
  gig: Gig;
}

const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const worker = USERS.find(u => u.id === gig.workerId) as User;
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <img className="h-48 w-full object-cover" src={gig.image} alt={gig.title} />
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
