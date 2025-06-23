import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, MessageCircle, ExternalLink, Github, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Entrez en contact avec l'équipe MathSolver CI
          </p>
        </div>

        {/* Developer Contact */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <MessageCircle className="h-6 w-6" />
              Développeur Principal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    KOUAME SOURALEH JATHE ITHIEL
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    Étudiant en Système Informatique et Génie Logiciel
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span>Côte d'Ivoire</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5" />
                    <span>Disponible via LinkedIn</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  Passionné par l'innovation technologique dans l'éducation, je développe des solutions 
                  pour améliorer l'apprentissage des mathématiques en Afrique de l'Ouest.
                </p>
              </div>

              <div className="md:w-80 space-y-3">
                <Button asChild className="w-full" variant="default">
                  <a 
                    href="https://ci.linkedin.com/in/souraleh-jathe-ithiel-kouame-bab3322b8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    Profil LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Meilleur moyen de me contacter
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback & Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">
                Commentaires et suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Votre avis est précieux pour améliorer MathSolver CI. 
                Partagez vos suggestions d'amélioration ou signalez des problèmes.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Types de retours recherchés :</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Erreurs dans les solutions proposées</li>
                  <li>• Suggestions d'améliorations UX/UI</li>
                  <li>• Nouveaux types d'exercices à supporter</li>
                  <li>• Problèmes techniques rencontrés</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">
                Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Intéressé par une collaboration ? Je suis ouvert aux partenariats 
                pour développer des outils éducatifs innovants.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Opportunités :</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Intégration dans des plateformes éducatives</li>
                  <li>• Développement de nouvelles fonctionnalités</li>
                  <li>• Adaptation à d'autres curricula africains</li>
                  <li>• Projets de recherche en EdTech</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Support */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-300">
              Support technique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Avant de signaler un problème technique, assurez-vous d'avoir consulté notre 
              centre d'aide qui contient les solutions aux problèmes les plus courants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline">
                <Link href="/help">
                  Consulter l'aide
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Informations utiles à inclure lors d'un signalement :
              </h4>
              <ul className="text-sm space-y-1 text-orange-700 dark:text-orange-300">
                <li>• Type d'appareil utilisé (mobile, ordinateur)</li>
                <li>• Navigateur web et version</li>
                <li>• Description détaillée du problème</li>
                <li>• Étapes pour reproduire l'erreur</li>
                <li>• Capture d'écran si possible</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/">
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}