import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Gig, User, Review, UserRole } from '../types';
import Rating from '../components/Rating';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import StarRatingInput from '../components/StarRatingInput';
import Modal from '../components/Modal';
import GigCard from '../components/GigCard';
import SocialShareButtons from '../components/SocialShareButtons';

const GigDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const [gig, setGig] = useState<Gig | null>(null);
  const [worker, setWorker] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarGigs, setSimilarGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for new review form
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [newReviewPhoto, setNewReviewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  // State for modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    if (!id) return;
    const loadDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedGig = await apiService.fetchGigById(id);
        
        if (!fetchedGig) {
          setError(t('gig_detail_not_found'));
          setIsLoading(false);
          return;
        }

        setGig(fetchedGig);

        const [fetchedWorker, fetchedReviews, fetchedSimilarGigs] = await Promise.all([
          apiService.fetchUserById(fetchedGig.workerId),
          apiService.fetchReviewsByGigId(id),
          apiService.fetchSimilarGigs(fetchedGig.id, fetchedGig.category),
        ]);

        setWorker(fetchedWorker || null);
        setReviews(fetchedReviews);
        setSimilarGigs(fetchedSimilarGigs);

      } catch (err) {
        setError(t('error_fetch_gig_details'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [id, t]);


  const handleBooking = () => {
    if (user) {
      setIsBookingModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleConfirmBooking = () => {
    setIsBookingModalOpen(false);
    navigate(`/book/${gig?.id}`);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewReviewPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating > 0 && newComment.trim() && user && id) {
      setIsSubmittingReview(true);
      try {
        let imageUrl: string | undefined = undefined;
        if (newReviewPhoto) {
          // In a real app, you would upload the file here and get a URL.
          // We'll simulate this by generating a random image URL.
          console.log('Simulating photo upload for:', newReviewPhoto.name);
          imageUrl = `https://picsum.photos/seed/review${Date.now()}/400/300`;
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate upload delay
        }

        const submittedReview = await apiService.addReview(id, { rating: newRating, comment: newComment, imageUrl }, user.id);
        setReviews(prev => [...prev, submittedReview]);
        setNewRating(0);
        setNewComment('');
        setNewReviewPhoto(null);
        setPhotoPreview(null);
      } catch (error) {
        console.error("Failed to submit review:", error);
      } finally {
        setIsSubmittingReview(false);
      }
    }
  };
  
  const handleDeleteGig = async () => {
    if (!gig) return;
    try {
      await apiService.deleteGig(gig.id);
      setIsDeleteModalOpen(false);
      alert('Gig deleted successfully!');
      navigate('/profile');
    } catch (error) {
      console.error("Failed to delete gig:", error);
      alert('Failed to delete gig. Please try again.');
    }
  };

  if (isLoading) return <Loader text={t('loading')} />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!gig || !worker) return <p>{t('gig_detail_not_found')}</p>;

  const pageUrl = window.location.href;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
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

            <SocialShareButtons title={gig.title} url={pageUrl} />

            <div className="text-3xl font-bold text-brand-primary my-6">${gig.price.toFixed(2)}</div>
            
             {(!user || user.role === UserRole.Customer) && (
               <Button onClick={handleBooking} variant="secondary" className="w-full text-lg">
                 {t('gig_detail_book_now')}
               </Button>
             )}

             {user?.id === worker.id && (
               <div className="mt-4 p-3 bg-gray-100 rounded-md text-center">
                 <p className="text-gray-600 mb-3">{t('gig_detail_your_listing')}</p>
                 <Button onClick={() => setIsDeleteModalOpen(true)} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                     {t('gig_detail_delete_button')}
                 </Button>
              </div>
             )}
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h3 className="text-2xl font-bold mb-4">{t('reviews')}</h3>
          <div className="space-y-6">
            {reviews.length > 0 ? reviews.map(review => (
              <div key={review.id} className="bg-brand-light p-4 rounded-lg">
                  {review.imageUrl && (
                    <img src={review.imageUrl} alt="Review" className="mb-4 w-full h-48 object-cover rounded-md" />
                  )}
                  <div className="flex items-center mb-2">
                      <Rating rating={review.rating} reviewCount={0} />
                      <span className="ml-auto text-sm text-gray-500">{t('gig_detail_by_customer')}</span>
                  </div>
                  <p className="text-gray-800">{review.comment}</p>
              </div>
            )) : <p className="text-gray-500">{t('gig_detail_no_reviews')}</p>}
          </div>

          {user && user.role === UserRole.Customer && (
            <div className="mt-8 border-t pt-6">
              <h4 className="text-xl font-bold mb-4">{t('review_form_title')}</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('review_form_rating_label')}</label>
                  <StarRatingInput rating={newRating} setRating={setNewRating} />
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">{t('review_form_comment_label')}</label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('review_form_comment_placeholder')}
                    className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-brand-primary"
                    required
                  />
                </div>
                 <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('review_form_add_photo')}</label>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {photoPreview ? t('review_form_change_photo') : t('review_form_select_photo')}
                  </label>
                  {photoPreview && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">{t('review_form_photo_preview')}</p>
                        <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
                <Button type="submit" disabled={isSubmittingReview}>
                  {isSubmittingReview ? t('review_form_submitting') : t('review_form_submit_button')}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {similarGigs.length > 0 && (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">{t('gig_detail_similar_gigs')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarGigs.map(similarGig => (
                    <GigCard key={similarGig.id} gig={similarGig} />
                ))}
            </div>
        </div>
      )}


      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={t('booking_confirmation_title')}
      >
        <div>
          <p className="text-gray-600 mb-6">{t('booking_confirmation_message')}</p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
              {t('booking_confirmation_cancel')}
            </Button>
            <Button variant="secondary" onClick={handleConfirmBooking}>
              {t('booking_confirmation_confirm')}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('delete_confirmation_title')}
      >
        <div>
          <p className="text-gray-600 mb-6">{t('delete_confirmation_message')}</p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              {t('delete_confirmation_cancel')}
            </Button>
            <Button variant="secondary" onClick={handleDeleteGig}>
              {t('delete_confirmation_confirm')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GigDetailPage;