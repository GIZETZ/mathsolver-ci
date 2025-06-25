import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { X, Home, Calculator, History, User, Settings, HelpCircle, Sun, Moon, Info, Mail, Shield } from "lucide-react";

interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  school?: string;
  class?: string;
}

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function SideMenu({ isOpen, onClose, isDarkMode, onToggleTheme }: SideMenuProps) {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  // Type assertion to help TypeScript understand the user object structure
  const typedUser = user as User | undefined;

  const menuItems = [
    { path: "/", icon: "fas fa-chart-line", label: "Tableau de Bord" },
    { path: "/solve", icon: "fas fa-calculator", label: "Résoudre" },
    { path: "/history", icon: "fas fa-history", label: "Historique" },
    { path: "/settings", icon: "fas fa-cog", label: "Paramètres" },
  ];

  const infoItems = [
    { path: "/about", icon: "fas fa-info-circle", label: "En savoir plus" },
    { path: "/help", icon: "fas fa-question-circle", label: "Aide" },
    { path: "/contact", icon: "fas fa-envelope", label: "Contact" },
    { path: "/privacy-policy", icon: "fas fa-shield-alt", label: "Confidentialité" },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
    onClose();
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <i className="fas fa-times text-gray-600 dark:text-gray-400"></i>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-ivorian-orange to-ivorian-green rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              MS
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              MathSolver CI
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Terminale D - Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="py-4">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center space-x-3 w-full px-6 py-3 text-left transition-smooth hover:bg-gray-50 dark:hover:bg-gray-700 ${
              location === item.path 
                ? "bg-ivorian-orange bg-opacity-10 text-ivorian-orange border-r-2 border-ivorian-orange"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <i className={`${item.icon} w-5 text-center`}></i>
            <span>{item.label}</span>
          </button>
        ))}

        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 mb-2">
              Informations
            </h4>
            {infoItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-6 py-3 text-left transition-smooth hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  location === item.path 
                    ? "bg-ivorian-orange bg-opacity-10 text-ivorian-orange border-r-2 border-ivorian-orange"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <i className={`${item.icon} w-5 text-center`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onToggleTheme}
            className="flex items-center space-x-3 w-full px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-5 text-center`}></i>
            <span>Mode {isDarkMode ? 'clair' : 'sombre'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-6 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-smooth"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Footer Status */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
          <i className="fas fa-wifi text-ivorian-green text-2xl mb-2"></i>
          <p className="text-sm text-gray-600 dark:text-gray-300">Mode en ligne</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Synchronisation active</p>
        </div>
      </div>
    </div>
  );
}
