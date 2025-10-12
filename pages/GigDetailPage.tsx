
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GIGS, USERS, REVIEWS } from '../constants';
import Rating from '../components/Rating';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const GigDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const gig = GIGS.find(g => g.id === id);
  if (!gig) return <p>{t('gig_detail_not_found')}</p>;

  const worker = USERS.find(u => u.id === gig.workerId);
  if (!worker) return <p>{t('gig_detail_worker_not_found')}</p>;

  const handleBooking = () => {
    if (user) {
      navigate(`/book/${gig.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={gig.image} alt={gig.title} className="w-full h-80 object-cover rounded-lg" />
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">{t('gig_detail_portfolio')}</h3>
            <div className="grid grid-cols-3 gap-2">
              {worker.portfolioImages?.map((img, index) => (
                <img key={index} src={img} alt={`${t('gig_detail_portfolio_image')} ${index+1}`} className="w-full h-24 object-cover rounded-md" />
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-primary">{gig.category.toUpperCase()}</p>
          <h1 className="text-4xl font-bold text-brand-dark mt-1">{gig.title}</h1>
          <div className="mt-4 flex items-center space-x-4">
             <img src={worker.avatar} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-4 border-brand-light" />
             <div>
                <h2 className="text-xl font-semibold">{worker.name}</h2>
                <Rating rating={worker.rating} reviewCount={worker.reviewsCount} />
             </div>
          </div>
          <div className="my-6">
            <p className="text-gray-700">{gig.description}</p>
          </div>
          <div className="flex items-center space-x-4 my-4 text-sm text-gray-600">
            <span><strong>{t('gig_detail_eta')}:</strong> {gig.eta}</span>
            <span>&bull;</span>
            <span><strong>{t('gig_detail_distance')}:</strong> {gig.distance}</span>
          </div>

           <div className="my-4">
            <h3 className="text-lg font-bold mb-2">{t('skills')}</h3>
            <div className="flex flex-wrap gap-2">
                {worker.skills?.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>
                ))}
            </div>
           </div>

          <div className="text-3xl font-bold text-brand-primary my-6">${gig.price.toFixed(2)}</div>
          
           {(!user || user.role === UserRole.Customer) && (
             <Button onClick={handleBooking} variant="secondary" className="w-full text-lg">
               {t('gig_detail_book_now')}
             </Button>
           )}

           {user?.id === worker.id && (
             <p className="text-center text-gray-500 bg-gray-100 p-3 rounded-md">{t('gig_detail_your_listing')}</p>
           )}
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-4">{t('reviews')}</h3>
        <div className="space-y-6">
          {REVIEWS.map(review => (
            <div key={review.id} className="bg-brand-light p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <Rating rating={review.rating} reviewCount={0} />
                    <span className="ml-auto text-sm text-gray-500">{t('gig_detail_by_customer')}</span>
                </div>
                <p className="text-gray-800">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;
