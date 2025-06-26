// Système d'identification automatique des leçons basé sur l'analyse des exemples officiels

export interface LessonKeywords {
  lessonId: number;
  lessonName: string;
  keywords: string[];
  contextKeywords: string[];
  problemTypes: string[];
  forbiddenWords: string[];
}

// Analyse des mots-clés extraits des exemples officiels et du curriculum
export const LESSON_KEYWORDS: LessonKeywords[] = [
  {
    lessonId: 1,
    lessonName: "Limites et continuité",
    keywords: [
      "limite", "long terme", "tend vers", "asymptote", "continuité", 
      "comportement", "infini", "coût à long terme", "production tendant",
      "production de dépliants à long terme", "détermine ce coût", "coût d'un dépliant par client"
    ],
    contextKeywords: [
      "production de dépliants à long terme", "coût par client", "comportement asymptotique",
      "quand x tend vers", "limite quand", "à l'infini", "détermine ce coût",
      "coût d'un dépliant par client", "relance publicitaire", "dépliants", "frais fixes"
    ],
    problemTypes: [
      "coût de production à long terme", "comportement limite d'une fonction",
      "analyse asymptotique", "optimisation à long terme"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "intégrale"]
  },
  {
    lessonId: 2,
    lessonName: "Probabilité",
    keywords: [
      "probabilité", "événement", "chance", "%", "pourcentage", "erreur",
      "détection", "contrôle qualité", "défectueux", "aléatoire"
    ],
    contextKeywords: [
      "contrôle qualité", "microprocesseurs", "système de vérification",
      "détecte", "déclare défectueux", "erreur lors du contrôle"
    ],
    problemTypes: [
      "contrôle qualité avec erreurs", "probabilité d'événements",
      "probabilités conditionnelles", "arbres de probabilité"
    ],
    forbiddenWords: ["limite", "dérivée", "primitive", "intégrale"]
  },
  {
    lessonId: 3,
    lessonName: "Dérivabilité et étude de fonctions",
    keywords: [
      "maximum", "minimum", "optimal", "dérivée", "variation", "optimisation",
      "gouttière", "volume maximal", "contenance", "dimensions", "f'(", "calculer la dérivée", "dériver"
    ],
    contextKeywords: [
      "feuille métallique", "gouttière", "volume maximal", "contenance maximale",
      "hauteur des côtés", "plier", "relever perpendiculairement"
    ],
    problemTypes: [
      "optimisation de volume", "recherche de maximum", "étude de variations",
      "problème de géométrie optimale"
    ],
    forbiddenWords: ["probabilité", "limite à l'infini", "primitive", "intégrale"]
  },
  {
    lessonId: 4,
    lessonName: "Primitives",
    keywords: [
      "primitive", "bénéfice", "B'(x)", "dérivée", "primitivation",
      "pâtissier", "glaces", "fonction dérivée"
    ],
    contextKeywords: [
      "bénéfice réalisé", "pâtissier", "glaces", "B'(x)", "fonction dérivée",
      "centaines de glaces", "bénéfice maximal"
    ],
    problemTypes: [
      "calcul de primitives", "optimisation via primitives",
      "recherche de fonction à partir de sa dérivée"
    ],
    forbiddenWords: ["probabilité", "limite", "intégrale définie"]
  },
  {
    lessonId: 5,
    lessonName: "Fonctions logarithmes",
    keywords: [
      "logarithme", "ln", "log", "carbone 14", "datation", "âge",
      "fossile", "archéologue", "modélisation"
    ],
    contextKeywords: [
      "carbone 14", "datation", "fossile", "archéologue", "âge en années",
      "fraction de carbone", "f(x) = 1 – 8310ln(x)"
    ],
    problemTypes: [
      "datation au carbone 14", "modélisation logarithmique",
      "calculs d'âge", "équations logarithmiques"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 6,
    lessonName: "Nombres Complexes (Partie 1 : Forme Algébrique)",
    keywords: [
      "forme algébrique", "conjugué", "a+ib", "partie réelle", "partie imaginaire",
      "Re(z)", "Im(z)", "nombre complexe", "complexe", "z=", "mettre sous forme",
      "division complexe", "quotient complexe", "simplifier", "calculer", "opérations",
      "i", "imaginaire", "C", "ensemble C", "z²", "équation complexe", "nombres complexes"
    ],
    contextKeywords: [
      "mettre sous forme algébrique", "conjugué", "partie réelle", "partie imaginaire",
      "Re(z)", "Im(z)", "a+ib", "multiplier par le conjugué", "simplifier l'expression",
      "résoudre dans C", "équation du second degré", "discriminant négatif", "racines complexes"
    ],
    problemTypes: [
      "mise sous forme algébrique", "calcul de conjugué", "opérations dans C",
      "résolution d'équations du second degré", "calculs algébriques"
    ],
    forbiddenWords: ["module", "argument", "géométrie", "affixe", "plan", "angle", "probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 8,
    lessonName: "Nombres Complexes et Géométrie",
    keywords: [
      "module", "argument", "affixe", "plan complexe", "géométrie", "triangle",
      "|z|", "arg(z)", "point", "vecteur", "distance", "angle", "repère",
      "représenter", "configuration géométrique", "cercle"
    ],
    contextKeywords: [
      "affixe d'un point", "module", "argument", "plan complexe", "géométrie",
      "triangle", "configuration géométrique", "représentation graphique",
      "distance", "angle", "repère orthonormé"
    ],
    problemTypes: [
      "calcul de module et argument", "géométrie dans le plan complexe",
      "propriétés géométriques", "affixes et configurations", "triangles et complexes"
    ],
    forbiddenWords: ["forme algébrique", "conjugué", "Re(z)", "Im(z)", "a+ib", "probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 7,
    lessonName: "Fonctions Exponentielles et Fonctions Puissances",
    keywords: [
      "exponentielle", "e^", "pharmacocinétique", "médicament", "concentration",
      "demi-vie", "élimination", "μg.L⁻¹", "administration"
    ],
    contextKeywords: [
      "pharmacocinétique", "médicament", "concentration plasmatique",
      "demi-vie", "administration intraveineuse", "f(t) = 20e^(-0,1t)"
    ],
    problemTypes: [
      "pharmacocinétique", "décroissance exponentielle",
      "calcul de demi-vie", "élimination de médicament"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 9,
    lessonName: "Suites numériques",
    keywords: [
      "suite", "récurrence", "bassin", "transfert", "géométrique",
      "aₙ", "terme", "relation de récurrence", "volume d'eau"
    ],
    contextKeywords: [
      "bassins d'eau", "volume constant", "transfert", "pourcentage transféré",
      "relation de récurrence", "suite géométrique", "aₙ₊₁"
    ],
    problemTypes: [
      "échanges entre bassins", "suites récurrentes",
      "modélisation par suites", "suites géométriques"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 10,
    lessonName: "Calcul intégral",
    keywords: [
      "intégrale", "aire", "capacité pulmonaire", "moyenne", "∫",
      "calcul d'aire", "fonction définie", "âge", "capacité moyenne",
      "entre 20 et 70", "médecin", "justifie", "intégral"
    ],
    contextKeywords: [
      "capacité pulmonaire", "médecin", "modélisée par la fonction",
      "capacité moyenne", "entre 20 et 70 ans", "tranche d'âge",
      "justifie par le calcul intégral", "n'atteint pas 5 L"
    ],
    problemTypes: [
      "calcul de moyenne par intégrale", "aire sous courbe",
      "capacité pulmonaire", "calcul intégral", "justification par intégrale"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "suite"]
  },
  {
    lessonId: 11,
    lessonName: "Statistique à deux variables",
    keywords: [
      "corrélation", "variables", "coefficient", "entrepreneur", "chiffre d'affaires",
      "points de vente", "frais promotion", "influence", "régression"
    ],
    contextKeywords: [
      "entrepreneuriat", "chiffre d'affaires", "points de vente", "frais de promotion",
      "influence", "facteurs", "données sur 5 ans", "coefficient de corrélation"
    ],
    problemTypes: [
      "analyse de corrélation", "influence de facteurs",
      "statistiques à deux variables", "régression linéaire"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "limite"]
  },
  {
    lessonId: 12,
    lessonName: "Équations différentielles",
    keywords: [
      "population", "bactéries", "vitesse", "proportionnelle", "évolution",
      "différentielle", "y'", "p'(t)", "diminution", "laboratoire"
    ],
    contextKeywords: [
      "population de bactéries", "laboratoire", "vitesse de diminution",
      "proportionnelle à la population", "évolution", "observation"
    ],
    problemTypes: [
      "évolution de population", "équations différentielles",
      "croissance/décroissance", "modélisation continue"
    ],
    forbiddenWords: ["probabilité", "dérivée", "primitive", "limite"]
  }
];

// Fonction d'identification basée sur l'analyse des mots-clés
export function identifyLessonFromText(text: string): LessonKeywords {
  const lowerText = text.toLowerCase();
  
  // Détection prioritaire pour les dérivées
  const derivativeKeywords = ['dérivée', "dériver", "f'(", "calculer la dérivée", "dérivabilité"];
  const hasDerivativeKeywords = derivativeKeywords.some(keyword => lowerText.includes(keyword));
  
  if (hasDerivativeKeywords) {
    return LESSON_KEYWORDS.find(l => l.lessonId === 3)!; // Dérivabilité et étude de fonctions
  }
  
  // Détection prioritaire pour les limites (problème fréquent)
  const limitKeywords = ['long terme', 'coût à long terme', 'production de dépliants à long terme', 'détermine ce coût', 'tend vers', 'limite'];
  const hasLimitKeywords = limitKeywords.some(keyword => lowerText.includes(keyword));
  
  if (hasLimitKeywords) {
    return LESSON_KEYWORDS.find(l => l.lessonId === 1)!; // Limites et continuité
  }
  
  // Détection spéciale pour les nombres complexes
  const complexKeywords = ['complexe', 'conjugué', 'forme algébrique', 'partie réelle', 'partie imaginaire', 'i', 'z=', 'a+ib', 'module', 'argument', 'affixe'];
  const hasComplexKeywords = complexKeywords.some(keyword => lowerText.includes(keyword));
  
  if (hasComplexKeywords) {
    // Distinguer entre les deux leçons de nombres complexes
    const algebraicKeywords = ['forme algébrique', 'conjugué', 'partie réelle', 'partie imaginaire', 'mettre sous forme', 'simplifier', 'résoudre dans c'];
    const geometricKeywords = ['module', 'argument', 'affixe', 'géométrie', 'plan', 'triangle', 'distance', 'angle'];
    
    const algebraicScore = algebraicKeywords.filter(k => lowerText.includes(k)).length;
    const geometricScore = geometricKeywords.filter(k => lowerText.includes(k)).length;
    
    if (algebraicScore > geometricScore) {
      return LESSON_KEYWORDS.find(l => l.lessonId === 6)!; // Forme algébrique
    } else if (geometricScore > 0) {
      return LESSON_KEYWORDS.find(l => l.lessonId === 8)!; // Géométrie
    }
  }
  
  // Score pour chaque leçon
  const scores: { lesson: LessonKeywords; score: number }[] = [];
  
  for (const lesson of LESSON_KEYWORDS) {
    let score = 0;
    
    // Points pour les mots-clés principaux
    for (const keyword of lesson.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        // Plus de poids pour les mots-clés spécifiques
        if (keyword.length > 5) {
          score += 5; // Mots-clés longs et spécifiques
        } else {
          score += 3;
        }
      }
    }
    
    // Points bonus pour les mots-clés contextuels
    for (const contextKeyword of lesson.contextKeywords) {
      if (lowerText.includes(contextKeyword.toLowerCase())) {
        score += 7; // Plus de poids pour le contexte
      }
    }
    
    // Points bonus pour les types de problèmes
    for (const problemType of lesson.problemTypes) {
      if (lowerText.includes(problemType.toLowerCase())) {
        score += 6;
      }
    }
    
    // Pénalité plus forte pour les mots interdits
    for (const forbiddenWord of lesson.forbiddenWords) {
      if (lowerText.includes(forbiddenWord.toLowerCase())) {
        score -= 5;
      }
    }
    
    scores.push({ lesson, score });
  }
  
  // Retourner la leçon avec le score le plus élevé
  scores.sort((a, b) => b.score - a.score);
  
  // Si aucun score positif, retourner les limites par défaut
  if (scores[0].score <= 0) {
    return LESSON_KEYWORDS[0]; // Limites et continuité par défaut
  }
  
  return scores[0].lesson;
}

// Fonction pour obtenir les outils spécifiques d'une leçon
export function getToolsForLesson(lessonName: string): string[] {
  const toolsMap: Record<string, string[]> = {
    "Limites et continuité": ["calcul de limites", "limites à l'infini", "continuité", "asymptotes"],
    "Probabilité": ["probabilités conditionnelles", "événements", "arbres de probabilité", "calcul de probabilités"],
    "Dérivabilité et étude de fonctions": ["dérivées", "étude de variations", "optimisation", "extremums"],
    "Primitives": ["calcul de primitives", "intégration", "fonctions primitives"],
    "Fonctions logarithmes": ["propriétés du logarithme", "équations logarithmiques", "modélisation logarithmique"],
    "Nombres Complexes (Partie 1 : Forme Algébrique)": ["forme algébrique", "conjugué", "opérations dans C", "calculs algébriques"],
    "Nombres Complexes et Géométrie": ["module", "argument", "géométrie complexe", "affixes et points"],
    "Fonctions Exponentielles et Fonctions Puissances": ["fonction exponentielle", "équations exponentielles", "décroissance exponentielle"],
    "Suites numériques": ["suites arithmétiques", "suites géométriques", "récurrence", "convergence"],
    "Calcul intégral": ["calcul d'intégrales", "aire sous courbe", "intégrales définies"],
    "Statistique à deux variables": ["coefficient de corrélation", "régression linéaire", "analyse statistique"],
    "Équations différentielles": ["résolution d'équations différentielles", "conditions initiales", "modélisation continue"]
  };
  
  return toolsMap[lessonName] || ["outils mathématiques"];
}
