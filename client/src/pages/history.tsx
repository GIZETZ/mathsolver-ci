import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Clock, Trash2, Search } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import AdBanner from "@/components/AdBanner";

interface HistoryEntry {
  id: number;
  timestamp: string;
  problem: string;
  solution: string;
  steps: string[];
  subject: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mathHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const deleteEntry = (id: number) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('mathHistory', JSON.stringify(updatedHistory));
    toast({
      title: "Supprimé",
      description: "L'exercice a été supprimé de l'historique.",
    });
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem('mathHistory');
    toast({
      title: "Historique vidé",
      description: "Tous les exercices ont été supprimés.",
    });
  };

  const filteredHistory = history.filter(entry =>
    entry.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-8">
          <div className="flex items-center">
            <Link href="/">
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-3">Historique</h1>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Tout vider
            </button>
          )}
        </div>

        {history.length > 0 && (
          <div className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans l'historique..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-sm"
              />
            </div>
          </div>
        )}

        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {history.length === 0 ? "Aucun exercice résolu" : "Aucun résultat"}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {history.length === 0 
                ? "Commencez par résoudre votre premier exercice de mathématiques"
                : "Aucun exercice ne correspond à votre recherche"
              }
            </p>
            <Link href="/solve">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Résoudre un exercice
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Ad Banner - Ezoic */}
            <AdBanner adType="ezoic" pageType="history" className="mb-4" />
            
            {/* Ad Banner - AdSense (fallback) */}
            <AdBanner pageType="history" className="mb-4" />
            <div className="space-y-3">
              {filteredHistory.map((entry) => (
                <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {entry.subject}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(entry.timestamp).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                        {entry.problem.length > 100 
                          ? entry.problem.substring(0, 100) + "..."
                          : entry.problem
                        }
                      </p>
                    </div>
                    
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700 transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/result?id=${entry.id}`}>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Voir la solution
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {history.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Les 5 derniers exercices sont conservés localement
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
