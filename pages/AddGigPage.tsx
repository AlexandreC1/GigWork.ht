
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { apiService } from '../services/apiService';
import Button from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';
import { CATEGORIES } from '../constants';

const AddGigPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [eta, setEta] = useState('');
  const [distance, setDistance] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.description) {
      setDescription(location.state.description);
      // Optional: Clear the state so it doesn't persist on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  if (!user || user.role !== UserRole.Worker) {
    return <Navigate to="/login" />;
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
        setError("Please select an image for your gig.");
        return;
    }
    setError(null);
    setIsLoading(true);

    try {
      // In a real app, you would upload the file here and get a URL.
      // We'll simulate this by generating a random image URL.
      console.log('Simulating image upload for:', imageFile.name);
      const imageUrl = `https://picsum.photos/seed/newgig${Date.now()}/400/300`;
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate upload delay

      const gigData = {
        title,
        category,
        price: parseFloat(price),
        description,
        eta,
        distance,
        image: imageUrl,
      };
      const newGig = await apiService.addGig(gigData, user.id);
      alert(t('add_gig_success'));
      navigate(`/gig/${newGig.id}`);
    } catch (err) {
      setError(t('error_creating_gig'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formInputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition";
  const formLabelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">{t('add_gig_title')}</h1>
      <p className="text-center text-gray-600 mb-8">{t('add_gig_subtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={formLabelStyle}>{t('add_gig_form_title_label')}</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('add_gig_form_title_placeholder')} className={formInputStyle} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="category" className={formLabelStyle}>{t('add_gig_form_category_label')}</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={formInputStyle} required>
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="price" className={formLabelStyle}>{t('add_gig_form_price_label')}</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={t('add_gig_form_price_placeholder')} className={formInputStyle} required min="0" step="0.01"/>
            </div>
        </div>

        <div>
            <label htmlFor="description" className={formLabelStyle}>{t('add_gig_form_desc_label')}</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('add_gig_form_desc_placeholder')} className={`${formInputStyle} h-32`} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="eta" className={formLabelStyle}>{t('add_gig_form_eta_label')}</label>
                <input type="text" id="eta" value={eta} onChange={(e) => setEta(e.target.value)} placeholder={t('add_gig_form_eta_placeholder')} className={formInputStyle} required />
            </div>
            <div>
                <label htmlFor="distance" className={formLabelStyle}>{t('add_gig_form_distance_label')}</label>
                <input type="text" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder={t('add_gig_form_distance_placeholder')} className={formInputStyle} required />
            </div>
        </div>

         <div>
            <label className={formLabelStyle}>{t('add_gig_form_image_label')}</label>
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="mt-1 flex items-center gap-4">
                <label htmlFor="image-upload" className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {imagePreview ? t('add_gig_form_change_image') : t('add_gig_form_select_image')}
                </label>
                {imagePreview && (
                    <img src={imagePreview} alt="Gig preview" className="w-32 h-20 object-cover rounded-lg border" />
                )}
            </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full text-lg" disabled={isLoading}>
            {isLoading ? t('add_gig_form_creating') : t('add_gig_form_submit_button')}
        </Button>
      </form>
    </div>
  );
};

export default AddGigPage;
