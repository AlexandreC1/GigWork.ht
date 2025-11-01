
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Rating from '../components/Rating';
import { UserRole } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:space-x-8">
        <img src={user.avatar} alt={user.name} className="w-40 h-40 rounded-full object-cover border-4 border-brand-primary shadow-lg -mt-20" />
        <div className="mt-4 md:mt-0 flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-brand-dark">{user.name}</h1>
              <p className={`mt-1 text-lg font-semibold ${user.role === UserRole.Worker ? 'text-brand-primary' : 'text-green-600'}`}>
                {user.role === UserRole.Worker ? t('role_worker') : t('role_customer')}
              </p>
              {user.role === UserRole.Worker && (
                <div className="mt-2 flex justify-center sm:justify-start">
                  <Rating rating={user.rating} reviewCount={user.reviewsCount} />
                </div>
              )}
            </div>
             <div className="flex items-center gap-4 mt-4 sm:mt-0">
                 {user.role === UserRole.Worker && (
                    <Link to="/add-gig">
                        <Button variant="secondary">{t('profile_add_gig_button')}</Button>
                    </Link>
                 )}
                 <Link to="/profile/edit">
                    <Button variant="outline">{t('profile_edit_button')}</Button>
                 </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 border-t pt-8">
        {user.role === UserRole.Worker && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('skills')}</h2>
              <div className="flex flex-wrap gap-3">
                {user.skills?.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 text-md font-semibold px-4 py-2 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
             <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('profile_availabilities')}</h2>
              <p className="bg-gray-100 p-3 rounded-lg text-gray-700 text-lg">{user.availabilities}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('profile_moncash_id')}</h2>
              <p className="bg-gray-100 p-3 rounded-lg text-gray-700 text-lg">{user.moncashId}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('gig_detail_portfolio')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.portfolioImages?.map((img, index) => (
                  <img key={index} src={img} alt={`Portfolio ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
                ))}
              </div>
            </div>
          </>
        )}
        {user.role === UserRole.Customer && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('profile_activity')}</h2>
            <p className="text-gray-600">{t('profile_activity_placeholder')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
