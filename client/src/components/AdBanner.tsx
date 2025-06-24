import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  pageType?: 'home' | 'solve' | 'result' | 'history' | 'general';
}

export default function AdBanner({ 
  slot, 
  format = "auto", 
  className = "",
  pageType = "general"
}: AdBannerProps) {
  
  // Slots automatiques par page
  const getSlotByPage = () => {
    if (slot) return slot;
    
    switch (pageType) {
      case 'home': return "4067600841";
      case 'solve': return "1234567890";
      case 'result': return "9876543210";
      case 'history': return "5555666677";
      default: return "4067600841";
    }
  };
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7061214358444717"
        data-ad-slot={getSlotByPage()}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Declare global adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
