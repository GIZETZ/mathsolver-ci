import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, BookOpen, Camera, Calculator, Download, Smartphone } from "lucide-react";
import { Link } from "wouter";

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Centre d'aide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Guide complet pour utiliser MathSolver CI
          </p>
        </div>

        {/* Quick Start */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <BookOpen className="h-6 w-6" />
              Démarrage rapide
            </CardTitle>
            <CardDescription>
              Commencez à résoudre vos problèmes en 3 étapes simples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
                <h4 className="font-semibold mb-2">Saisir le problème</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tapez votre exercice ou prenez une photo
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
                <h4 className="font-semibold mb-2">Analyser</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  L'IA identifie la leçon et les outils nécessaires
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
                <h4 className="font-semibold mb-2">Solution</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Obtenez une solution détaillée étape par étape
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              Questions fréquentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment utiliser l'appareil photo pour capturer un exercice ?</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p>Pour capturer un exercice avec l'appareil photo :</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Cliquez sur l'icône <Camera className="inline h-4 w-4" /> dans la page de résolution</li>
                    <li>Autorisez l'accès à la caméra de votre appareil</li>
                    <li>Cadrez bien l'exercice (texte lisible, bon éclairage)</li>
                    <li>Cliquez sur "Capturer" pour prendre la photo</li>
                    <li>L'application extraira automatiquement le texte</li>
                  </ol>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Conseil :</strong> Assurez-vous que le texte est bien visible et que l'image n'est pas floue pour de meilleurs résultats.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quels types de problèmes mathématiques sont supportés ?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">MathSolver CI couvre tous les domaines du programme Terminale D :</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Badge variant="outline">Analyse</Badge>
                      <ul className="text-sm space-y-1 ml-2">
                        <li>• Limites et continuité</li>
                        <li>• Dérivabilité et fonctions</li>
                        <li>• Primitives et intégrales</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <Badge variant="outline">Algèbre & Probabilités</Badge>
                      <ul className="text-sm space-y-1 ml-2">
                        <li>• Nombres complexes</li>
                        <li>• Suites numériques</li>
                        <li>• Probabilités et statistiques</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Comment fonctionne le mode hors ligne ?</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p>MathSolver CI est une PWA (Progressive Web App) qui permet :</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Download className="h-4 w-4 mt-0.5 text-green-600" />
                      <span>Installation sur votre appareil comme une app native</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Smartphone className="h-4 w-4 mt-0.5 text-blue-600" />
                      <span>Accès à l'historique des solutions même sans internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calculator className="h-4 w-4 mt-0.5 text-purple-600" />
                      <span>Interface rapide et responsive sur mobile</span>
                    </li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note :</strong> La résolution de nouveaux problèmes nécessite une connexion internet pour l'analyse IA.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>La méthodologie UEMOA est-elle respectée ?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">Oui, toutes les solutions suivent rigoureusement la méthodologie officielle UEMOA :</p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">Structure des réponses</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Introduction avec analyse du problème</li>
                        <li>• Développement avec étapes détaillées</li>
                        <li>• Conclusion avec résultat final</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Critères d'évaluation</h4>
                      <ul className="text-sm space-y-1">
                        <li>• CM1 : Pertinence de la démarche</li>
                        <li>• CM2 : Utilisation des outils mathématiques</li>
                        <li>• CM3 : Cohérence du raisonnement</li>
                        <li>• CP : Perfectionnement de la solution</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Comment améliorer la qualité des solutions ?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Pour de meilleurs résultats :</h4>
                      <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                        <li>• Saisissez l'énoncé complet avec toutes les données</li>
                        <li>• Précisez le contexte si nécessaire (géométrie, physique, etc.)</li>
                        <li>• Vérifiez l'orthographe des termes mathématiques</li>
                        <li>• Indiquez clairement ce qui est demandé</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">À éviter :</h4>
                      <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                        <li>• Énoncés incomplets ou tronqués</li>
                        <li>• Images floues ou mal cadrées</li>
                        <li>• Mélange de plusieurs exercices différents</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300">
              Besoin d'aide supplémentaire ?
            </CardTitle>
            <CardDescription>
              Notre équipe est là pour vous accompagner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Si vous rencontrez des difficultés ou avez des suggestions d'amélioration, 
              n'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline">
                <Link href="/about">
                  En savoir plus sur l'application
                </Link>
              </Button>
              <Button asChild>
                <Link href="/solve">
                  Commencer à résoudre
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}