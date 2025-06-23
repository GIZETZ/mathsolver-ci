export interface DashboardStats {
  weeklyScore: number;
  totalResolutions: number;
  completedLessons: number;
  currentStreak: number;
}

export interface LessonProgress {
  id: number;
  userId: string;
  lessonId: number;
  completedSituations: number;
  averageScore: number;
  totalAttempts: number;
  lastAttempt?: Date;
  isCompleted: boolean;
}

export interface LessonWithProgress {
  id: number;
  name: string;
  description?: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  progress?: LessonProgress;
}

export interface SituationAnalysis {
  lessonDetected: string;
  toolsSuggested: string[];
  difficultyLevel: string;
  context: string;
  keyElements: string[];
}

export interface SolutionStructure {
  introduction: string;
  development: string;
  conclusion: string;
  toolsUsed: string[];
  steps: string[];
}

export interface EvaluationCriteria {
  cm1Pertinence: number;
  cm2OutilsMath: number;
  cm3Coherence: number;
  cpPerfectionnement: number;
  totalScore: number;
  feedback: string[];
}

export interface ProblemSolverState {
  situationText: string;
  analysis?: SituationAnalysis;
  solution?: SolutionStructure;
  evaluation?: EvaluationCriteria;
  isAnalyzing: boolean;
  isSolving: boolean;
  isEvaluating: boolean;
}
