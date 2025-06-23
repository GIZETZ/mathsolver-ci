import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Clock, Star, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { MathSolution, MathText, CalculationStep } from "@/components/MathRenderer";

interface TaskSolution {
  id: number;
  consigne: string;
  solution: {
    introduction: string;
    steps: string[];
    conclusion: string;
  };
}

interface HistoryEntry {
  id: number;
  timestamp: string;
  problem: string;
  solution: string;
  steps: string[];
  subject: string;
  isComplexSituation?: boolean;
  tasks?: TaskSolution[];
  finalConclusion?: string;
  calculations?: Array<{
    step: string;
    calculation: string;
    result: string;
  }>;
  detailedSolution?: {
    introduction: string;
    development: string;
    conclusion: string;
  };
}

export default function Result() {
  const [entry, setEntry] = useState<HistoryEntry | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      try {
        const history = JSON.parse(localStorage.getItem('mathHistory') || '[]');
        const found = history.find((item: HistoryEntry) => item.id === parseInt(id));
        if (found) {
          console.log('Found entry:', found);
          console.log('Development type:', typeof found.detailedSolution?.development);
          console.log('Development content:', found.detailedSolution?.development);
          
          // Ensure all fields are properly converted to strings
          const cleanedEntry = {
            ...found,
            solution: String(found.solution || ""),
            detailedSolution: {
              introduction: String(found.detailedSolution?.introduction || ""),
              development: String(found.detailedSolution?.development || ""),
              conclusion: String(found.detailedSolution?.conclusion || "")
            }
          };
          
          console.log('Cleaned entry development:', cleanedEntry.detailedSolution.development);
          setEntry(cleanedEntry);
        }
      } catch (error) {
        console.error('Error loading history entry:', error);
        // Clear corrupted localStorage
        localStorage.removeItem('mathHistory');
      }
    }
  }, []);

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center py-20">
            <p className="text-gray-600">Exercice non trouvé</p>
            <Link href="/">
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl">
                Retour à l'accueil
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-8">
          <Link href="/history">
            <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 ml-3">
            {entry.isComplexSituation ? 'Situation Complexe' : 'Résolution'}
          </h1>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-900">
              {entry.isComplexSituation ? 'Contexte et énoncé' : 'Énoncé'}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">
            {entry.problem}
          </p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-orange-500 mr-2" />
              <span className="text-sm text-gray-600">Leçon</span>
            </div>
            <p className="font-medium text-gray-900 mt-1">{entry.subject}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Résolu le</span>
            </div>
            <p className="font-medium text-gray-900 mt-1">
              {new Date(entry.timestamp).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Complex Situation Tasks */}
        {entry.isComplexSituation && entry.tasks && entry.tasks.length > 0 ? (
          <div className="space-y-6 mb-6">
            {entry.tasks.map((task, taskIndex) => (
              <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {taskIndex + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900">Tâche {taskIndex + 1}</h3>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-blue-900 font-medium">
                    {task.consigne}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Introduction</h4>
                    <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
                      {task.solution.introduction}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Étapes de résolution</h4>
                    <ol className="space-y-2">
                      {task.solution.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Conclusion</h4>
                    <p className="text-gray-700 text-sm bg-green-50 rounded-lg p-3">
                      {task.solution.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Final Conclusion for Complex Situations */}
            {entry.finalConclusion && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-4">Conclusion générale</h3>
                <p className="text-blue-100">
                  {entry.finalConclusion}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Standard Solution Display */
          <>
            {/* Solution with Mathematical Rendering */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Solution mathématique</h3>
              <MathSolution
                introduction={entry.detailedSolution?.introduction || ""}
                development={entry.detailedSolution?.development || ""}
                conclusion={entry.detailedSolution?.conclusion || ""}
                calculations={entry.calculations || []}
                steps={entry.steps || []}
              />
            </div>

            {/* Fallback: Complete Solution Text (if detailed solution not available) */}
            {(!entry.detailedSolution || (!entry.detailedSolution.introduction && !entry.detailedSolution.development && !entry.detailedSolution.conclusion)) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Solution complète</h3>
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700">
                    <MathText text={typeof entry.solution === 'string' ? entry.solution : String(entry.solution || '')} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Link href="/solve" className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
              Nouvel exercice
            </button>
          </Link>
          <Link href="/history" className="flex-1">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors">
              Historique
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}