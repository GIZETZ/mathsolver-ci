import { Camera, Edit3, History, Calculator, Menu } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import SideMenu from "@/components/SideMenu";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-md mx-auto">
          {/* Header with Menu Button */}
          <div className="flex justify-between items-center mb-8 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSideMenuOpen(true)}
              className="p-2 hover:bg-white/20 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </Button>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MathSolver CI</h1>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Résolution instantanée d'exercices de maths<br />
              Programme Terminale D - Côte d'Ivoire
            </p>
          </div>

          {/* Main Action Button */}
          <Link href="/solve">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 mb-6 shadow-lg transition-all duration-200 active:scale-95">
              <div className="flex items-center justify-center space-x-3">
                <Calculator className="w-6 h-6" />
                <span className="text-lg font-semibold">Résoudre un exercice</span>
              </div>
              <p className="text-blue-100 text-sm mt-2">
                Photo ou saisie manuelle
              </p>
            </button>
          </Link>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link href="/solve?mode=camera">
              <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 active:scale-95">
                <Camera className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white block">Prendre photo</span>
              </button>
            </Link>
            
            <Link href="/solve?mode=text">
              <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 active:scale-95">
                <Edit3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white block">Saisir texte</span>
              </button>
            </Link>
          </div>

          {/* History */}
          <Link href="/history">
            <button className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 active:scale-95 mb-6">
              <div className="flex items-center space-x-3">
                <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Historique des exercices</span>
              </div>
            </button>
          </Link>

          {/* Program Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Programme Terminale D</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span>• Nombres complexes</span>
              <span>• Fonctions</span>
              <span>• Équations</span>
              <span>• Probabilités</span>
              <span>• Géométrie</span>
              <span>• Statistiques</span>
            </div>
          </div>

          {/* Ad Banner */}
          <AdBanner className="my-6" />

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
            Programme UEMOA - Côte d'Ivoire
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu 
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Overlay */}
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}
    </>
  );
}