
import { Calculator, Camera, BookOpen, Award } from "lucide-react";
import { Link } from "wouter";

export default function SEOLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Résolvez vos exercices de <span className="text-yellow-300">mathématiques Terminale D</span> en Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Application intelligente avec IA spécialisée dans le programme UEMOA
          </p>
          <Link href="/solve">
            <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
              Commencer maintenant - Gratuit
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi les élèves de Terminale D choisissent MathSolver CI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">IA Spécialisée UEMOA</h3>
              <p className="text-gray-600">
                Intelligence artificielle formée spécifiquement sur le programme de mathématiques Terminale D en Côte d'Ivoire
              </p>
            </div>
            <div className="text-center p-6">
              <Camera className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Scan d'exercices</h3>
              <p className="text-gray-600">
                Prenez une photo de votre exercice et obtenez la solution détaillée instantanément
              </p>
            </div>
            <div className="text-center p-6">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Méthodologie Officielle</h3>
              <p className="text-gray-600">
                Solutions respectant la méthodologie du ministère de l'éducation ivoirien
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Toutes les matières du programme Terminale D couvertes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Analyse</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Limites et continuité</li>
                <li>• Dérivabilité et applications</li>
                <li>• Fonctions logarithmes et exponentielles</li>
                <li>• Primitives et calcul intégral</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Algèbre & Géométrie</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Nombres complexes</li>
                <li>• Géométrie dans l'espace</li>
                <li>• Probabilités conditionnelles</li>
                <li>• Statistiques descriptives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez les milliers d'élèves qui réussissent avec MathSolver CI
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Application gratuite, disponible 24h/24, conforme au programme officiel
          </p>
          <Link href="/">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Accéder à l'application
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p>&copy; 2024 MathSolver CI - Développé pour l'excellence éducative en Côte d'Ivoire</p>
          <p className="text-gray-400 mt-2">Par KOUAME SOURALEH JATHE ITHIEL</p>
        </div>
      </footer>
    </div>
  );
}
