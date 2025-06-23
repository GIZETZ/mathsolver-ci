import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, GraduationCap, Code, Target, Users } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            En savoir plus
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez MathSolver CI et son créateur
          </p>
        </div>

        {/* About the App */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Target className="h-6 w-6" />
              But de l'application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>MathSolver CI</strong> est une application web progressive (PWA) spécialement conçue 
              pour aider les élèves de Terminale D en Côte d'Ivoire à résoudre des situations complexes 
              en mathématiques.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Fonctionnalités principales :</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">AI</Badge>
                    Analyse intelligente des problèmes mathématiques
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">OCR</Badge>
                    Extraction de texte à partir d'images
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">PWA</Badge>
                    Utilisation hors ligne possible
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">UEMOA</Badge>
                    Méthodologie conforme au programme officiel
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Domaines couverts :</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Limites et continuité</li>
                  <li>• Dérivabilité et étude de fonctions</li>
                  <li>• Fonctions logarithmes et exponentielles</li>
                  <li>• Nombres complexes</li>
                  <li>• Probabilités et statistiques</li>
                  <li>• Calcul intégral</li>
                  <li>• Suites numériques</li>
                  <li>• Équations différentielles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the Developer */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <GraduationCap className="h-6 w-6" />
              À propos du développeur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  KOUAME SOURALEH JATHE ITHIEL
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Code className="h-4 w-4" />
                  <span>Étudiant en Système Informatique et Génie Logiciel</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Passionné par le développement d'applications éducatives et l'intelligence artificielle, 
                  je me spécialise dans la création de solutions technologiques innovantes pour 
                  améliorer l'apprentissage des mathématiques en Afrique de l'Ouest.
                </p>
              </div>
              
              <div className="md:w-auto">
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <a 
                    href="https://ci.linkedin.com/in/souraleh-jathe-ithiel-kouame-bab3322b8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Profil LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Code className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Technologies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">React, TypeScript, AI/ML</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Formation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Génie Logiciel</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Mission</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Éducation digitale</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/solve">
              Commencer à résoudre des problèmes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}