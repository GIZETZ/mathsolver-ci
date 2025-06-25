
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Politique de confidentialité - MathSolver CI";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-8">
          <Link href="/">
            <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 ml-3">Politique de confidentialité</h1>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              MathSolver CI ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité 
              explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre service 
              de résolution d'exercices mathématiques.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Informations que nous collectons</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-3">2.1 Informations fournies directement</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Texte des exercices mathématiques que vous soumettez</li>
              <li>Images d'exercices que vous téléchargez</li>
              <li>Historique de vos résolutions (stocké localement)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.2 Informations collectées automatiquement</h3>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>Adresse IP</li>
              <li>Type de navigateur et version</li>
              <li>Pages visitées et temps passé</li>
              <li>Données d'utilisation anonymisées</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Comment nous utilisons vos informations</h2>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>Fournir et améliorer notre service de résolution mathématique</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Analyser l'utilisation pour améliorer nos algorithmes</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Partage des informations</h2>
            <p className="text-gray-700 mb-4">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers, sauf dans les cas suivants :
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>Avec votre consentement explicite</li>
              <li>Pour respecter une obligation légale</li>
              <li>Avec nos fournisseurs de services (OpenAI pour l'IA, Ezoic pour la publicité)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Stockage des données</h2>
            <p className="text-gray-700 mb-6">
              Votre historique d'exercices est stocké localement dans votre navigateur. Nous ne conservons pas 
              vos exercices ou solutions sur nos serveurs de manière permanente.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Sécurité</h2>
            <p className="text-gray-700 mb-6">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre 
              l'accès non autorisé, l'altération, la divulgation ou la destruction.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
            <p className="text-gray-700 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies et technologies similaires</h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience et analyser l'utilisation de notre site. 
              Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.
            </p>

            {/* Section Ezoic requise */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">9. Partenaire publicitaire - Ezoic</h2>
              <p className="text-blue-800 mb-4">
                Ce site utilise Ezoic pour optimiser les publicités et améliorer l'expérience utilisateur. 
                Ezoic est notre partenaire technologique qui nous aide à servir des publicités pertinentes.
              </p>
              
              {/* Zone d'intégration Ezoic */}
              <div id="ezoic-privacy-policy-embed" className="mb-4">
                {/* Le contenu Ezoic sera injecté ici automatiquement */}
              </div>
              
              <p className="text-blue-800 text-sm">
                Pour plus d'informations sur la politique de confidentialité d'Ezoic et les cookies utilisés, 
                visitez : <a href="http://g.ezoic.net/privacy/mathsolverci.site" className="underline" target="_blank" rel="noopener noreferrer">
                  http://g.ezoic.net/privacy/mathsolverci.site
                </a>
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Services tiers</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-3">10.1 OpenAI</h3>
            <p className="text-gray-700 mb-4">
              Nous utilisons les services d'OpenAI pour traiter vos exercices mathématiques. Les données envoyées 
              à OpenAI sont traitées selon leur politique de confidentialité disponible sur openai.com.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">10.2 Ezoic</h3>
            <p className="text-gray-700 mb-6">
              Ezoic nous aide à optimiser les publicités et améliorer les performances du site. 
              Ils peuvent collecter des données anonymisées à des fins d'analyse et d'optimisation.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Modifications de cette politique</h2>
            <p className="text-gray-700 mb-6">
              Nous pouvons mettre à jour cette politique de confidentialité occasionnellement. 
              Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-700 mb-4">
              Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :
            </p>
            <ul className="list-disc ml-6 mb-6 text-gray-700">
              <li>Email : contact@mathsolverci.site</li>
              <li>Site web : <a href="https://mathsolverci.site" className="text-blue-600 underline">mathsolverci.site</a></li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
              <p className="text-sm text-gray-600">
                Cette politique de confidentialité est conforme au Règlement Général sur la Protection des Données (RGPD) 
                et aux lois ivoiriennes sur la protection des données personnelles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
