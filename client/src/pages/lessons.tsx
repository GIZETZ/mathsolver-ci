import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import LessonCard from "@/components/LessonCard";
import type { LessonWithProgress } from "@/types";

interface LessonsProps {
  onToggleMenu: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Lessons({ onToggleMenu, isDarkMode, onToggleTheme }: LessonsProps) {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  const lessons: LessonWithProgress[] = dashboardData?.lessons || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ivorian-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement des leçons...</p>
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
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Les 12 Leçons</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Programme Terminale D</p>
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

      {/* Progress Overview */}
      <section className="px-4 py-6">
        <Card className="bg-gradient-to-r from-ivorian-orange to-ivorian-green text-white border-0 mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Programme Complet</h2>
              <p className="text-sm opacity-90 mb-4">
                Maîtrisez les 12 leçons essentielles de Terminale D
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold">12</div>
                  <div className="opacity-80">Leçons</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {lessons.filter(l => l.progress?.isCompleted).length}
                  </div>
                  <div className="opacity-80">Terminées</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {lessons.filter(l => l.progress && !l.progress.isCompleted).length}
                  </div>
                  <div className="opacity-80">En cours</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Badges */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <Badge variant="default" className="bg-ivorian-orange hover:bg-orange-600 text-white px-4 py-2 rounded-full whitespace-nowrap">
            Toutes
          </Badge>
          <Badge variant="outline" className="border-ivorian-green text-ivorian-green px-4 py-2 rounded-full whitespace-nowrap">
            Terminées
          </Badge>
          <Badge variant="outline" className="border-yellow-500 text-yellow-600 px-4 py-2 rounded-full whitespace-nowrap">
            En cours
          </Badge>
          <Badge variant="outline" className="border-gray-400 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full whitespace-nowrap">
            Non commencées
          </Badge>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="px-4 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {lessons.length === 0 ? (
            <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <i className="fas fa-book text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Aucune leçon disponible</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Les leçons seront bientôt disponibles. Revenez plus tard.
                </p>
              </CardContent>
            </Card>
          ) : (
            lessons.map((lesson) => (
              <Card key={lesson.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-smooth">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-${lesson.color}-100 dark:bg-${lesson.color}-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center`}>
                        <i className={`${lesson.icon} text-${lesson.color}-600 dark:text-${lesson.color}-400 text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{lesson.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {lesson.progress?.isCompleted ? (
                        <Badge className="bg-ivorian-green text-white">
                          <i className="fas fa-check mr-1"></i>
                          Terminé
                        </Badge>
                      ) : lesson.progress && lesson.progress.completedSituations > 0 ? (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                          <i className="fas fa-clock mr-1"></i>
                          En cours
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-400 text-gray-600">
                          <i className="fas fa-lock mr-1"></i>
                          Verrouillé
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progression</span>
                      <span>
                        {lesson.progress?.completedSituations || 0} situations
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          lesson.progress?.isCompleted 
                            ? 'bg-ivorian-green' 
                            : lesson.progress && lesson.progress.completedSituations > 0
                            ? 'bg-yellow-400'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{ 
                          width: lesson.progress?.isCompleted ? '100%' : 
                                 lesson.progress ? `${Math.min((lesson.progress.completedSituations / 10) * 100, 100)}%` : '0%'
                        }}
                      ></div>
                    </div>
                  </div>

                  {lesson.progress && (
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Score moyen: {lesson.progress.averageScore?.toFixed(1) || '0.0'}/5</span>
                      <span>{lesson.progress.totalAttempts || 0} tentatives</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
