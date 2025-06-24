import { useEffect, useRef, useState } from 'react';

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
  const [isDebugMode, setIsDebugMode] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

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
    // Vérifier si le mode debug Ezoic est activé
    const urlParams = new URLSearchParams(window.location.search);
    setIsDebugMode(urlParams.has('ez_js_debugger'));

    if (adType === 'ezoic') {
      try {
        if (typeof window !== 'undefined' && window.ezstandalone) {
          const placeholderId = getEzoicIdByPage();

          window.ezstandalone.cmd.push(function () {
            // Nettoyer les anciennes annonces pour éviter les conflits
            try {
              window.ezstandalone.destroyPlaceholders(placeholderId);

              // Petit délai avant d'afficher les nouvelles annonces
              setTimeout(() => {
                window.ezstandalone.showAds(placeholderId);
                setHasLoaded(true);
              }, 100);
            } catch (innerError) {
              console.log('Ezoic inner error:', innerError);
            }
          });
        } else {
          console.log('Ezoic script not loaded yet');
        }
      } catch (error) {
        console.log('Ezoic error:', error);
      }
    } else {
      try {
        // Vérifier si l'élément n'a pas déjà une annonce
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current && !hasLoaded) {
          const insElements = adRef.current.querySelectorAll('ins.adsbygoogle');
          let hasUnloadedAds = false;

          insElements.forEach((ins) => {
            const status = ins.getAttribute('data-adsbygoogle-status');
            if (!status || status === '' || status === 'unfilled') {
              hasUnloadedAds = true;
            }
          });

          if (hasUnloadedAds && insElements.length > 0) {
            try {
              window.adsbygoogle.push({});
              setHasLoaded(true);
            } catch (adsError) {
              // Ignorer les erreurs de doublons
              if (!adsError.message.includes('already have ads in them')) {
                console.log('AdSense error:', adsError);
              }
            }
          }
        }
      } catch (error) {
        console.log('AdSense setup error:', error);
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
  }, [adType, ezoicId, pageType, hasLoaded]);

  if (adType === 'ezoic') {
    const placeholderId = getEzoicIdByPage();
    return (
      <div className={`ad-container ${className}`} ref={adRef}>
        <div id={`ezoic-pub-ad-placeholder-${placeholderId}`}></div>
        {isDebugMode && (
          <div className="text-xs text-gray-500 mt-1 p-2 bg-gray-100 rounded">
            Debug Ezoic: Placeholder ID {placeholderId} | Page: {pageType}
            <br />
            Pour diagnostiquer: ajoutez ?ez_js_debugger=1 à l'URL
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7061214358444717"
        data-ad-slot={getSlotByPage()}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {isDebugMode && (
        <div className="text-xs text-gray-500 mt-1 p-2 bg-gray-100 rounded">
          Debug AdSense: Slot {getSlotByPage()} | Format: {format}
        </div>
      )}
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
