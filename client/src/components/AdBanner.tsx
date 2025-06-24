import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  pageType?: 'home' | 'solve' | 'result' | 'history' | 'general';
  ezoicId?: number;
  adType?: 'adsense' | 'ezoic';
}

export default function AdBanner({ 
  slot, 
  format = "auto", 
  className = "",
  pageType = "general",
  ezoicId,
  adType = "adsense"
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

  // IDs Ezoic automatiques par page
  const getEzoicIdByPage = () => {
    if (ezoicId) return ezoicId;
    
    switch (pageType) {
      case 'home': return 101;
      case 'solve': return 102;
      case 'result': return 103;
      case 'history': return 104;
      default: return 105;
    }
  };

  useEffect(() => {
    if (adType === 'ezoic') {
      try {
        if (typeof window !== 'undefined' && window.ezstandalone) {
          const placeholderId = getEzoicIdByPage();
          
          window.ezstandalone.cmd.push(function () {
            // Nettoyer les anciennes annonces pour éviter les conflits
            window.ezstandalone.destroyPlaceholders(placeholderId);
            
            // Afficher les nouvelles annonces
            window.ezstandalone.showAds(placeholderId);
          });
        }
      } catch (error) {
        console.log('Ezoic error:', error);
      }
    } else {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.log('AdSense error:', error);
      }
    }

    // Cleanup function pour nettoyer les annonces Ezoic quand le composant se démonte
    return () => {
      if (adType === 'ezoic' && typeof window !== 'undefined' && window.ezstandalone) {
        try {
          const placeholderId = getEzoicIdByPage();
          window.ezstandalone.cmd.push(function () {
            window.ezstandalone.destroyPlaceholders(placeholderId);
          });
        } catch (error) {
          console.log('Ezoic cleanup error:', error);
        }
      }
    };
  }, [adType, ezoicId, pageType]);

  if (adType === 'ezoic') {
    return (
      <div className={`ad-container ${className}`}>
        <div id={`ezoic-pub-ad-placeholder-${getEzoicIdByPage()}`}></div>
      </div>
    );
  }

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

// Declare global objects for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
    ezstandalone: {
      cmd: any[];
      showAds: (...ids: number[]) => void;
      destroyPlaceholders: (...ids: number[]) => void;
      destroyAll: () => void;
    };
  }
}
