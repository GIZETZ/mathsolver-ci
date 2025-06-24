
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useEzoicPageChange() {
  const [location] = useLocation();

  useEffect(() => {
    // Rafraîchir toutes les annonces Ezoic lors d'un changement de page
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(function () {
        // Nettoyer toutes les anciennes annonces
        window.ezstandalone.destroyAll();
        
        // Afficher toutes les nouvelles annonces pour la nouvelle page
        window.ezstandalone.showAds();
      });
    }
  }, [location]);
}
