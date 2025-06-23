import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LessonWithProgress } from "@/types";

interface LessonCardProps {
  lesson: LessonWithProgress;
  onClick?: () => void;
}

export default function LessonCard({ lesson, onClick }: LessonCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; icon: string; progress: string }> = {
      blue: { 
        bg: "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30", 
        icon: "text-blue-600 dark:text-blue-400",
        progress: "bg-blue-500"
      },
      purple: { 
        bg: "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30", 
        icon: "text-purple-600 dark:text-purple-400",
        progress: "bg-purple-500"
      },
      red: { 
        bg: "bg-red-100 dark:bg-red-900 dark:bg-opacity-30", 
        icon: "text-red-600 dark:text-red-400",
        progress: "bg-red-500"
      },
      green: { 
        bg: "bg-green-100 dark:bg-green-900 dark:bg-opacity-30", 
        icon: "text-green-600 dark:text-green-400",
        progress: "bg-green-500"
      },
      orange: { 
        bg: "bg-orange-100 dark:bg-orange-900 dark:bg-opacity-30", 
        icon: "text-orange-600 dark:text-orange-400",
        progress: "bg-orange-500"
      },
      indigo: { 
        bg: "bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-30", 
        icon: "text-indigo-600 dark:text-indigo-400",
        progress: "bg-indigo-500"
      },
      pink: { 
        bg: "bg-pink-100 dark:bg-pink-900 dark:bg-opacity-30", 
        icon: "text-pink-600 dark:text-pink-400",
        progress: "bg-pink-500"
      },
      teal: { 
        bg: "bg-teal-100 dark:bg-teal-900 dark:bg-opacity-30", 
        icon: "text-teal-600 dark:text-teal-400",
        progress: "bg-teal-500"
      },
      cyan: { 
        bg: "bg-cyan-100 dark:bg-cyan-900 dark:bg-opacity-30", 
        icon: "text-cyan-600 dark:text-cyan-400",
        progress: "bg-cyan-500"
      },
      yellow: { 
        bg: "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30", 
        icon: "text-yellow-600 dark:text-yellow-400",
        progress: "bg-yellow-500"
      },
      gray: { 
        bg: "bg-gray-100 dark:bg-gray-700", 
        icon: "text-gray-600 dark:text-gray-400",
        progress: "bg-gray-500"
      },
      emerald: { 
        bg: "bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30", 
        icon: "text-emerald-600 dark:text-emerald-400",
        progress: "bg-emerald-500"
      },
    };
    
    return colorMap[color] || colorMap.gray;
  };

  const colors = getColorClasses(lesson.color);
  const isCompleted = lesson.progress?.isCompleted || false;
  const isInProgress = lesson.progress && lesson.progress.completedSituations > 0 && !isCompleted;
  const isLocked = !lesson.progress || lesson.progress.completedSituations === 0;

  const getProgressPercentage = () => {
    if (!lesson.progress) return 0;
    if (lesson.progress.isCompleted) return 100;
    // Assuming each lesson has 10 situations maximum
    return Math.min((lesson.progress.completedSituations / 10) * 100, 100);
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <div className="w-6 h-6 bg-ivorian-green rounded-full flex items-center justify-center">
          <i className="fas fa-check text-white text-xs"></i>
        </div>
      );
    } else if (isInProgress) {
      return (
        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="fas fa-clock text-white text-xs"></i>
        </div>
      );
    } else {
      return (
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <i className="fas fa-lock text-gray-500 dark:text-gray-400 text-xs"></i>
        </div>
      );
    }
  };

  const getProgressColor = () => {
    if (isCompleted) return "bg-ivorian-green";
    if (isInProgress) return "bg-yellow-400";
    return "bg-gray-300 dark:bg-gray-600";
  };

  return (
    <Card 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 touch-target transition-smooth hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <i className={`${lesson.icon} ${colors.icon} text-sm`}></i>
          </div>
          {getStatusBadge()}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
          {lesson.name}
        </h3>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {lesson.progress?.completedSituations || 0} situation{(lesson.progress?.completedSituations || 0) !== 1 ? 's' : ''} résolue{(lesson.progress?.completedSituations || 0) !== 1 ? 's' : ''}
        </p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        {lesson.progress && lesson.progress.averageScore > 0 && (
          <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Score: {lesson.progress.averageScore.toFixed(1)}/5</span>
            <span>{lesson.progress.totalAttempts} tentative{lesson.progress.totalAttempts !== 1 ? 's' : ''}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
