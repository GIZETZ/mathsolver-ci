import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import type { DashboardStats } from "@/types";

interface ProgressProps {
  onToggleMenu: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Progress({ onToggleMenu, isDarkMode, onToggleTheme }: ProgressProps) {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  const stats: DashboardStats = dashboardData?.stats || {
    weeklyScore: 0,
    totalResolutions: 0,
    completedLessons: 0,
    currentStreak: 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ivorian-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Mes Progrès</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Suivi de performance</p>
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

      {/* Overview Stats */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <i className="fas fa-trophy text-3xl mb-2 opacity-80"></i>
                <div className="text-2xl font-bold">{stats.completedLessons}</div>
                <div className="text-sm opacity-90">Leçons terminées</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <i className="fas fa-check-circle text-3xl mb-2 opacity-80"></i>
                <div className="text-2xl font-bold">{stats.totalResolutions}</div>
                <div className="text-sm opacity-90">Résolutions totales</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-ivorian-orange to-orange-600 border-0 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <i className="fas fa-chart-line text-3xl mb-2 opacity-80"></i>
                <div className="text-2xl font-bold">{stats.weeklyScore}%</div>
                <div className="text-sm opacity-90">Score hebdomadaire</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-ivorian-green to-green-600 border-0 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <i className="fas fa-fire text-3xl mb-2 opacity-80"></i>
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <div className="text-sm opacity-90">Jours consécutifs</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Progress */}
      <section className="px-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Progression Détaillée</h2>
        
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Programme Global</h3>
              <span className="text-sm text-ivorian-orange font-medium">
                {Math.round((stats.completedLessons / 12) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-ivorian-orange to-ivorian-green h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(stats.completedLessons / 12) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{stats.completedLessons} sur 12 leçons terminées</span>
              <span>Objectif: 100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Évolution des Scores</h3>
            <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <i className="fas fa-chart-area text-4xl mb-4"></i>
                <p className="text-sm">Graphique des performances</p>
                <p className="text-xs">Disponible après plusieurs résolutions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance by Criteria */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Performance par Critère UEMOA</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CM1 - Pertinence</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">0.65/0.75</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CM2 - Outils Mathématiques</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2.1/2.5</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CM3 - Cohérence</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">1.0/1.25</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CP - Perfectionnement</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">0.4/0.5</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">Score Total Moyen</span>
                <span className="text-2xl font-bold text-ivorian-green">4.15/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Réalisations</h3>
            
            {stats.totalResolutions === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <i className="fas fa-medal text-4xl mb-4"></i>
                <p className="text-sm">Vos réalisations apparaîtront ici</p>
                <p className="text-xs">Commencez à résoudre des problèmes pour débloquer des badges</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <i className="fas fa-star text-2xl text-yellow-500 mb-2"></i>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Premier pas</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Première résolution</p>
                </div>
                
                <div className="text-center p-4 bg-gray-100 dark:bg-gray-600 rounded-lg opacity-50">
                  <i className="fas fa-fire text-2xl text-orange-500 mb-2"></i>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Série de 7</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">7 jours consécutifs</p>
                </div>
                
                <div className="text-center p-4 bg-gray-100 dark:bg-gray-600 rounded-lg opacity-50">
                  <i className="fas fa-trophy text-2xl text-gold-accent mb-2"></i>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Expert</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">10 leçons terminées</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
