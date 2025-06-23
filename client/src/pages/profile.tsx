import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "@/types";

interface ProfileProps {
  onToggleMenu: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Profile({ onToggleMenu, isDarkMode, onToggleTheme }: ProfileProps) {
  const { user } = useAuth();

  const { data: dashboardData } = useQuery({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  const stats: DashboardStats = dashboardData?.stats || {
    weeklyScore: 0,
    totalResolutions: 0,
    completedLessons: 0,
    currentStreak: 0,
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-black dark:bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-black dark:bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
        </div>
        <div className="font-medium text-gray-900 dark:text-white">MathResolver CI</div>
        <div className="flex items-center space-x-1">
          <i className="fas fa-wifi text-ivorian-green"></i>
          <div className="w-6 h-3 border border-black dark:border-white rounded-sm">
            <div className="w-4 h-full bg-ivorian-green rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMenu}
              className="touch-target p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <i className="fas fa-bars text-xl text-gray-700 dark:text-gray-300"></i>
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Mon Profil</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Informations personnelles</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="touch-target p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg text-gray-600 dark:text-gray-400`}></i>
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-ivorian-orange to-ivorian-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.firstName?.[0] || "M"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <section className="px-4 py-6">
        <Card className="bg-gradient-to-r from-ivorian-orange to-ivorian-green border-0 text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {user?.firstName?.[0] || "M"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || "Étudiant"
                  }
                </h2>
                <p className="text-sm opacity-90 mb-1">
                  {user?.class || "Terminale D"}
                </p>
                <p className="text-sm opacity-75">
                  {user?.school || "École"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-ivorian-orange mb-1">{stats.completedLessons}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Leçons</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-ivorian-green mb-1">{stats.totalResolutions}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Résolutions</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">{stats.weeklyScore}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Profile Information */}
      <section className="px-4">
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Informations Personnelles</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Nom complet</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : "Non renseigné"
                  }
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.email || "Non renseigné"}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Classe</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.class || "Terminale D"}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">École</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.school || "Non renseigné"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Paramètres</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-moon text-gray-500 dark:text-gray-400"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mode sombre</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleTheme}
                  className="text-xs"
                >
                  {isDarkMode ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-bell text-gray-500 dark:text-gray-400"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Notifications</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Gérer
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-download text-gray-500 dark:text-gray-400"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mode hors ligne</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">À propos</h3>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Version de l'application</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Dernière mise à jour</span>
                <span className="font-medium">Décembre 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Développé pour</span>
                <span className="font-medium">🇨🇮 Côte d'Ivoire</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Assistant IA pour les mathématiques - Système éducatif ivoirien
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl touch-target transition-smooth"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Se déconnecter
        </Button>
      </section>
    </div>
  );
}
