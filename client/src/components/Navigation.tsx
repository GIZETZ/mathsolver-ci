import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProblemSolver from "./ProblemSolver";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isProblemSolverOpen, setIsProblemSolverOpen] = useState(false);

  const navItems = [
    { path: "/", icon: "fas fa-home", label: "Accueil" },
    { path: "/lessons", icon: "fas fa-book", label: "Leçons" },
    { path: "/solver", icon: "fas fa-plus", label: "Résoudre", isCenter: true },
    { path: "/progress", icon: "fas fa-chart-bar", label: "Progrès" },
    { path: "/profile", icon: "fas fa-user", label: "Profil" },
  ];

  const handleNavigation = (path: string, isCenter?: boolean) => {
    if (isCenter) {
      setIsProblemSolverOpen(true);
    } else {
      setLocation(path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 py-2 px-3 touch-target transition-smooth ${
                item.isCenter
                  ? "relative"
                  : location === item.path
                  ? "text-ivorian-orange"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => handleNavigation(item.path, item.isCenter)}
            >
              {item.isCenter ? (
                <div className="w-12 h-12 bg-gradient-to-r from-ivorian-orange to-ivorian-green rounded-full flex items-center justify-center -mt-2 shadow-lg">
                  <i className={`${item.icon} text-xl text-white`}></i>
                </div>
              ) : (
                <i className={`${item.icon} text-xl`}></i>
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      <ProblemSolver 
        isOpen={isProblemSolverOpen}
        onClose={() => setIsProblemSolverOpen(false)}
      />
    </>
  );
}
