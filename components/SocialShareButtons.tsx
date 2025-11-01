import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title, url }) => {
  const { t } = useTranslation();
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`Check out this service: ${title}`);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const IconWrapper: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('gig_detail_share')}</h3>
      <div className="flex items-center space-x-3">
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <IconWrapper className="bg-[#1877F2]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.034C18.343 21.128 22 16.991 22 12z"></path></svg>
          </IconWrapper>
        </a>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <IconWrapper className="bg-[#1DA1F2]">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13a4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.337.578-.53 1.248-.53 1.956 0 1.616.823 3.043 2.072 3.878a4.62 4.62 0 01-2.11-.583v.06a4.66 4.66 0 003.733 4.568 4.69 4.69 0 01-2.104.08 4.661 4.661 0 004.35 3.234 9.348 9.348 0 01-5.786 1.995c-.376 0-.747-.022-1.112-.065a13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.45 9.45 0 002.323-2.41z"></path></svg>
          </IconWrapper>
        </a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <IconWrapper className="bg-[#25D366]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.81L2 22l5.3-1.38c1.37.71 2.92 1.12 4.55 1.12h.1c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.16h-.1c-1.47 0-2.88-.38-4.11-1.05l-.3-.17-3.06.8.82-3-.18-.32c-.73-1.28-1.12-2.77-1.12-4.32 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.49-5.83c-.24-.12-1.44-.71-1.67-.79-.23-.08-.39-.12-.56.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06s-1.03-.38-1.96-1.21c-.73-.64-1.22-1.44-1.36-1.68-.14-.24-.02-.38.1-.5.11-.11.24-.28.37-.42s.16-.24.24-.4.04-.32-.02-.44c-.06-.12-.56-1.34-.76-1.84s-.4-.42-.55-.42h-.47c-.16 0-.42.06-.63.3s-.84.82-.84 2c0 1.18.86 2.32 1 2.48.14.16 1.69 2.59 4.1 3.61.59.24 1.05.38 1.41.49.52.16 1 .14 1.38.08.42-.06 1.44-.59 1.64-1.16.2-.56.2-.95.14-1.09s-.22-.24-.46-.36z"></path></svg>
          </IconWrapper>
        </a>
      </div>
    </div>
  );
};

export default SocialShareButtons;