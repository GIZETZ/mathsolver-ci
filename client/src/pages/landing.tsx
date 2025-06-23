import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivorian-orange via-orange-400 to-ivorian-green flex flex-col">
      {/* Status Bar Simulation */}
      <div className="bg-white bg-opacity-90 border-b border-gray-200 px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
        </div>
        <div className="font-medium">MathResolver CI</div>
        <div className="flex items-center space-x-1">
          <i className="fas fa-wifi text-ivorian-green"></i>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-full bg-ivorian-green rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-white">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-robot text-4xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2">MathResolver CI</h1>
          <p className="text-lg opacity-90 mb-2">Assistant IA Mathématiques</p>
          <p className="text-sm opacity-75">Terminale D - Côte d'Ivoire</p>
        </div>

        <Card className="w-full max-w-sm bg-white bg-opacity-95 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6 text-gray-800">
              <h2 className="text-xl font-bold mb-2">Bienvenue</h2>
              <p className="text-sm text-gray-600">
                Résolvez vos situations complexes mathématiques avec l'aide de l'intelligence artificielle
              </p>
            </div>

            <div className="space-y-4 mb-6 text-sm text-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-ivorian-green rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span>Assistant IA spécialisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-ivorian-green rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span>12 leçons du programme</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-ivorian-green rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span>Évaluation UEMOA</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-ivorian-green rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span>Suivi de progression</span>
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-ivorian-orange to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl touch-target transition-smooth border-0"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Se connecter
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Connectez-vous avec votre compte Replit pour commencer
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-white text-opacity-75">
          <p className="text-sm">
            🇨🇮 Développé pour les élèves ivoiriens
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-white text-opacity-60 text-xs">
        <p>Version 1.0.0 - Système éducatif ivoirien</p>
      </div>
    </div>
  );
}
