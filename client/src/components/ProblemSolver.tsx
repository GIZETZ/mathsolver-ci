import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { 
  SituationAnalysis, 
  SolutionStructure, 
  EvaluationCriteria, 
  ProblemSolverState 
} from "@/types";

interface ProblemSolverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProblemSolver({ isOpen, onClose }: ProblemSolverProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [state, setState] = useState<ProblemSolverState>({
    situationText: "",
    isAnalyzing: false,
    isSolving: false,
    isEvaluating: false,
  });

  // AI Analysis mutation
  const analyzeMutation = useMutation({
    mutationFn: async (situationText: string) => {
      const response = await apiRequest("POST", "/api/ai/analyze", { situationText });
      return await response.json();
    },
    onSuccess: (analysis: SituationAnalysis) => {
      setState(prev => ({ ...prev, analysis, isAnalyzing: false }));
      // Automatically generate solution after analysis
      if (state.situationText) {
        solveMutation.mutate({ situationText: state.situationText, analysis });
      }
    },
    onError: (error) => {
      setState(prev => ({ ...prev, isAnalyzing: false }));
      if (isUnauthorizedError(error)) {
        toast({
          title: "Non autorisé",
          description: "Vous êtes déconnecté. Reconnexion en cours...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser la situation. Réessayez.",
        variant: "destructive",
      });
    },
  });

  // Solution generation mutation
  const solveMutation = useMutation({
    mutationFn: async ({ situationText, analysis }: { situationText: string; analysis: SituationAnalysis }) => {
      const response = await apiRequest("POST", "/api/ai/solve", { situationText, analysis });
      return await response.json();
    },
    onSuccess: (solution: SolutionStructure) => {
      setState(prev => ({ ...prev, solution, isSolving: false }));
      // Generate evaluation automatically
      if (state.situationText && solution) {
        evaluateSolution(state.situationText, solution);
      }
    },
    onError: (error) => {
      setState(prev => ({ ...prev, isSolving: false }));
      if (isUnauthorizedError(error)) {
        toast({
          title: "Non autorisé",
          description: "Vous êtes déconnecté. Reconnexion en cours...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Erreur de résolution",
        description: "Impossible de générer la solution. Réessayez.",
        variant: "destructive",
      });
    },
  });

  // Save resolution mutation
  const saveMutation = useMutation({
    mutationFn: async (resolutionData: any) => {
      const response = await apiRequest("POST", "/api/resolutions", resolutionData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/resolutions"] });
      toast({
        title: "Résolution sauvegardée",
        description: "Votre solution a été enregistrée avec succès.",
      });
      handleClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Non autorisé",
          description: "Vous êtes déconnecté. Reconnexion en cours...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder la résolution. Réessayez.",
        variant: "destructive",
      });
    },
  });

  const evaluateSolution = async (situationText: string, solution: SolutionStructure) => {
    setState(prev => ({ ...prev, isEvaluating: true }));
    
    try {
      // For now, generate a mock evaluation since the endpoint would need the full evaluation logic
      const mockEvaluation: EvaluationCriteria = {
        cm1Pertinence: 0.65,
        cm2OutilsMath: 2.1,
        cm3Coherence: 1.0,
        cpPerfectionnement: 0.4,
        totalScore: 4.15,
        feedback: [
          "Bonne identification des outils mathématiques",
          "Développement logique et cohérent",
          "Conclusion bien argumentée",
          "Amélioration possible dans la présentation"
        ]
      };
      
      setState(prev => ({ 
        ...prev, 
        evaluation: mockEvaluation, 
        isEvaluating: false 
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isEvaluating: false }));
      console.error("Evaluation error:", error);
    }
  };

  const handleAnalyze = () => {
    if (!state.situationText.trim()) {
      toast({
        title: "Texte requis",
        description: "Veuillez saisir une situation complexe à analyser.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isAnalyzing: true, 
      isSolving: true,
      analysis: undefined, 
      solution: undefined, 
      evaluation: undefined 
    }));
    
    analyzeMutation.mutate(state.situationText);
  };

  const handleSave = () => {
    if (!state.solution || !state.analysis) {
      toast({
        title: "Solution incomplète",
        description: "Veuillez d'abord générer une solution complète.",
        variant: "destructive",
      });
      return;
    }

    const resolutionData = {
      situationText: state.situationText,
      introduction: state.solution.introduction,
      development: state.solution.development,
      conclusion: state.solution.conclusion,
      toolsUsed: state.solution.toolsUsed,
      steps: state.solution.steps,
      aiAnalysis: state.analysis,
    };

    saveMutation.mutate(resolutionData);
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "Fonctionnalité d'export en cours de développement.",
    });
  };

  const handleClose = () => {
    setState({
      situationText: "",
      isAnalyzing: false,
      isSolving: false,
      isEvaluating: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl w-full max-w-lg max-h-screen overflow-hidden transition-smooth">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Assistant IA - Résolution
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="touch-target p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <i className="fas fa-times text-gray-600 dark:text-gray-400"></i>
            </Button>
          </div>
        </div>

        {/* Problem Input */}
        <div className="px-6 py-4 custom-scrollbar overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Situation Complexe
            </label>
            <Textarea
              value={state.situationText}
              onChange={(e) => setState(prev => ({ ...prev, situationText: e.target.value }))}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-ivorian-orange focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={6}
              placeholder="Collez votre situation complexe ici..."
              disabled={state.isAnalyzing || state.isSolving}
            />
          </div>

          {/* Analyze Button */}
          {!state.analysis && (
            <Button
              onClick={handleAnalyze}
              disabled={state.isAnalyzing || !state.situationText.trim()}
              className="w-full bg-ivorian-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl touch-target transition-smooth mb-6"
            >
              {state.isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analyse en cours...
                </>
              ) : (
                <>
                  <i className="fas fa-robot mr-2"></i>
                  Analyser avec l'IA
                </>
              )}
            </Button>
          )}

          {/* AI Analysis Section */}
          {state.analysis && (
            <Card className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border border-blue-200 dark:border-blue-700 rounded-xl mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <i className="fas fa-robot text-blue-600 dark:text-blue-400"></i>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">Analyse IA</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Leçon détectée:</strong>{" "}
                    <Badge className="bg-blue-600 text-white ml-1">
                      {state.analysis.lessonDetected}
                    </Badge>
                  </div>
                  <div>
                    <strong>Outils suggérés:</strong>{" "}
                    <span className="text-blue-700 dark:text-blue-300">
                      {state.analysis.toolsSuggested.join(", ")}
                    </span>
                  </div>
                  <div>
                    <strong>Niveau de difficulté:</strong>{" "}
                    <Badge variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400 ml-1">
                      {state.analysis.difficultyLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Solution Structure */}
          {state.isSolving && !state.solution && (
            <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl mb-4">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 border-2 border-ivorian-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Génération de la solution en cours...</p>
              </CardContent>
            </Card>
          )}

          {state.solution && (
            <div className="space-y-4">
              <Card className="border border-gray-200 dark:border-gray-600 rounded-xl">
                <CardContent className="p-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="w-6 h-6 bg-ivorian-orange text-white rounded-full flex items-center justify-center text-xs mr-2">
                      1
                    </span>
                    Introduction
                  </h5>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 math-formula">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {state.solution.introduction}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-600 rounded-xl">
                <CardContent className="p-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="w-6 h-6 bg-ivorian-orange text-white rounded-full flex items-center justify-center text-xs mr-2">
                      2
                    </span>
                    Développement
                  </h5>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 math-formula">
                    <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {state.solution.development}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-600 rounded-xl">
                <CardContent className="p-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="w-6 h-6 bg-ivorian-orange text-white rounded-full flex items-center justify-center text-xs mr-2">
                      3
                    </span>
                    Conclusion
                  </h5>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 math-formula">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {state.solution.conclusion}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Evaluation Section */}
          {state.evaluation && (
            <Card className="bg-ivorian-green bg-opacity-10 border border-ivorian-green border-opacity-30 rounded-xl mt-6">
              <CardContent className="p-4">
                <h4 className="font-bold text-ivorian-green mb-3 flex items-center">
                  <i className="fas fa-star mr-2"></i>
                  Évaluation UEMOA
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>CM1 (Pertinence):</span>
                    <span className="font-bold">
                      {state.evaluation.cm1Pertinence.toFixed(2)}/0.75
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CM2 (Outils Math):</span>
                    <span className="font-bold">
                      {state.evaluation.cm2OutilsMath.toFixed(1)}/2.5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CM3 (Cohérence):</span>
                    <span className="font-bold">
                      {state.evaluation.cm3Coherence.toFixed(2)}/1.25
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CP (Perfectionnement):</span>
                    <span className="font-bold">
                      {state.evaluation.cpPerfectionnement.toFixed(1)}/0.5
                    </span>
                  </div>
                </div>
                <div className="border-t border-ivorian-green border-opacity-30 mt-3 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Score Total:</span>
                    <span className="text-ivorian-green">
                      {state.evaluation.totalScore.toFixed(2)}/5
                    </span>
                  </div>
                </div>
                
                {/* Feedback */}
                {state.evaluation.feedback && state.evaluation.feedback.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-ivorian-green border-opacity-30">
                    <h5 className="font-medium text-ivorian-green mb-2">Commentaires:</h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {state.evaluation.feedback.map((comment, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{comment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {state.solution && (
            <div className="flex space-x-3 mt-6">
              <Button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="flex-1 bg-ivorian-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl touch-target transition-smooth"
              >
                {saveMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Sauvegarder
                  </>
                )}
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-3 rounded-xl touch-target transition-smooth"
              >
                <i className="fas fa-download mr-2"></i>
                Export PDF
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
