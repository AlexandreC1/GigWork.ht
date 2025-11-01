
import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, UserRole } from '../types';
import { apiService } from '../services/apiService';
import Button from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';

const EditProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState('');
  const [moncashId, setMoncashId] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSkills(user.skills || []);
      setAvailabilities(user.availabilities || '');
      setMoncashId(user.moncashId || '');
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills(currentSkills => [...currentSkills, trimmedSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(currentSkills => currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const updatedData: Partial<User> = {
        name: name,
      };
      if (user.role === UserRole.Worker) {
        updatedData.skills = skills;
        updatedData.availabilities = availabilities;
        updatedData.moncashId = moncashId;
      }
      
      const updatedUser = await apiService.updateUser(user.id, updatedData);
      updateUser(updatedUser); // Update context
      alert(t('edit_profile_success'));
      navigate('/profile');
    } catch (err) {
      setError(t('error_updating_profile'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formInputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition";
  const formLabelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">{t('edit_profile_title')}</h1>
      <p className="text-center text-gray-600 mb-8">{t('edit_profile_subtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={formLabelStyle}>{t('edit_profile_name_label')}</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className={formInputStyle} required />
        </div>

        {user.role === UserRole.Worker && (
          <>
            <div>
              <label className={formLabelStyle}>{t('edit_profile_skills_label')}</label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg mb-2 min-h-[40px]">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-1 rounded-full">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800 font-bold text-lg leading-none"
                      aria-label={`Remove ${skill}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleSkillInputKeyDown}
                  placeholder={t('edit_profile_add_skill_placeholder')}
                  className={formInputStyle}
                />
                <Button type="button" variant="outline" onClick={handleAddSkill} className="!px-4 shrink-0">
                  {t('edit_profile_add_skill_button')}
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor="availabilities" className={formLabelStyle}>{t('edit_profile_availabilities_label')}</label>
              <input type="text" id="availabilities" name="availabilities" value={availabilities} onChange={(e) => setAvailabilities(e.target.value)} className={formInputStyle} />
            </div>
             <div>
              <label htmlFor="moncashId" className={formLabelStyle}>{t('edit_profile_moncash_id_label')}</label>
              <input type="text" id="moncashId" name="moncashId" value={moncashId} onChange={(e) => setMoncashId(e.target.value)} className={formInputStyle} />
            </div>
          </>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full text-lg" disabled={isLoading}>
          {isLoading ? t('edit_profile_saving') : t('edit_profile_save_button')}
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
