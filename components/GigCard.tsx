import React from 'react';
import { Link } from 'react-router-dom';
import { Gig } from '../types';
import Rating from './Rating';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';

const GigCard: React.FC<{ gig: Gig }> = ({ gig }) => {
  const worker = gig.worker;
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { t } = useTranslation();
  const favorite = isFavorite(gig.id);

  return (
    <article className="service-card">
      <div className="service-media">
        <img src={gig.image} alt={gig.title} />
        <span className="service-city">{gig.city}</span>
        {user && (
          <button
            type="button"
            className={favorite ? 'save-button saved' : 'save-button'}
            aria-label={favorite ? 'Remove saved service' : 'Save service'}
            onClick={() => favorite ? removeFavorite(gig.id) : addFavorite(gig.id)}
          >
            {favorite ? 'Saved' : 'Save'}
          </button>
        )}
      </div>
      <div className="service-body">
        <div className="service-meta">
          <span>{gig.category}</span>
          <span>{gig.eta}</span>
        </div>
        <h3>{gig.title}</h3>
        <p>{gig.description}</p>
        <div className="tag-row">
          {gig.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <footer className="service-footer">
        {worker && (
          <div className="worker-mini">
            <img src={worker.avatar} alt="" />
            <span>
              <strong>{worker.name}</strong>
              <Rating rating={worker.rating} reviewCount={worker.reviewsCount} />
            </span>
          </div>
        )}
        <div className="price-stack">
          <strong>${gig.price}</strong>
          <small>{gig.currency || 'USD'}</small>
        </div>
      </footer>
      <Link className="card-link" to={`/gig/${gig.id}`}>{t('gig_card_view_details')}</Link>
    </article>
  );
};

export default GigCard;
