
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { generateGigDescription, getDisputeResolutionSuggestion } from '../services/geminiService';
import Button from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';

const AIToolsPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  
  // State for Gig Description Generator
  const [keywords, setKeywords] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isDescLoading, setIsDescLoading] = useState(false);

  // State for Dispute Resolver
  const [disputeDetails, setDisputeDetails] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

  if (!user || user.role !== UserRole.Worker) {
    // Redirect non-workers or logged-out users
    return <Navigate to="/" />;
  }

  const handleGenerateDescription = async () => {
    if (!keywords) return;
    setIsDescLoading(true);
    const result = await generateGigDescription(keywords, language);
    setGeneratedDesc(result);
    setIsDescLoading(false);
  };

  const handleGetSuggestion = async () => {
    if (!disputeDetails) return;
    setIsSuggestionLoading(true);
    const result = await getDisputeResolutionSuggestion(disputeDetails, language);
    setSuggestion(result);
    setIsSuggestionLoading(false);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(t('ai_tools_copied'));
  }

  const useDescription = () => {
    navigate('/add-gig', { state: { description: generatedDesc } });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{t('ai_tools_title')}</h1>
      
      <div className="flex justify-center border-b mb-6">
        <button onClick={() => setActiveTab('description')} className={`px-6 py-3 font-semibold ${activeTab === 'description' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-gray-500'}`}>
          {t('ai_tools_tab_description')}
        </button>
        <button onClick={() => setActiveTab('dispute')} className={`px-6 py-3 font-semibold ${activeTab === 'dispute' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-gray-500'}`}>
          {t('ai_tools_tab_dispute')}
        </button>
      </div>

      {activeTab === 'description' && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('ai_tools_desc_title')}</h2>
          <p className="text-gray-600 mb-4">{t('ai_tools_desc_subtitle')}</p>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t('ai_tools_desc_placeholder')}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-brand-primary"
          />
          <Button onClick={handleGenerateDescription} disabled={isDescLoading} className="mt-4">
            {isDescLoading ? t('ai_tools_desc_loading') : t('ai_tools_desc_button')}
          </Button>
          {generatedDesc && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900">{t('ai_tools_desc_result_title')}</h3>
              <p className="text-blue-800 whitespace-pre-wrap mb-4">{generatedDesc}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => copyToClipboard(generatedDesc)}>
                  {t('ai_tools_copy_button')}
                </Button>
                 <Button variant="primary" onClick={useDescription}>
                  {t('ai_tools_use_description_button')}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'dispute' && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t('ai_tools_dispute_title')}</h2>
          <p className="text-gray-600 mb-4">{t('ai_tools_dispute_subtitle')}</p>
          <textarea
            value={disputeDetails}
            onChange={(e) => setDisputeDetails(e.target.value)}
            placeholder={t('ai_tools_dispute_placeholder')}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-brand-primary"
          />
          <Button onClick={handleGetSuggestion} disabled={isSuggestionLoading} className="mt-4">
            {isSuggestionLoading ? t('ai_tools_dispute_loading') : t('ai_tools_dispute_button')}
          </Button>
          {suggestion && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900">{t('ai_tools_dispute_result_title')}</h3>
              <p className="text-green-800 whitespace-pre-wrap">{suggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIToolsPage;
