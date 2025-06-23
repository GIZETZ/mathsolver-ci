// Exemples types d'exercices par leçon - Terminale D Côte d'Ivoire

export interface ExerciseExample {
  lessonId: number;
  title: string;
  statement: string;
  expectedSolution: {
    introduction: string;
    development: string;
    conclusion: string;
  };
  commonErrors: string[];
  keyPoints: string[];
}

export const EXERCISE_EXAMPLES: ExerciseExample[] = [
  {
    lessonId: 1, // Limites et Continuité
    title: "Calcul de limite avec indétermination",
    statement: "Calculer la limite : lim(x→2) (x²-4)/(x-2)",
    expectedSolution: {
      introduction: "On observe une forme indéterminée 0/0 quand x tend vers 2. Pour lever cette indétermination, on va factoriser le numérateur.",
      development: "x²-4 = (x-2)(x+2). Donc (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 pour x≠2. Par conséquent, lim(x→2) (x²-4)/(x-2) = lim(x→2) (x+2) = 2+2 = 4.",
      conclusion: "La limite cherchée est 4."
    },
    commonErrors: [
      "Conclure directement que la limite est 0/0",
      "Ne pas factoriser pour simplifier",
      "Oublier la condition x≠2"
    ],
    keyPoints: [
      "Identification de l'indétermination",
      "Factorisation du numérateur",
      "Simplification avant calcul de limite"
    ]
  },
  {
    lessonId: 2, // Probabilités  
    title: "Probabilité avec événements contraires",
    statement: "Dans une urne contenant 5 boules rouges et 3 boules vertes, on tire une boule au hasard. Quelle est la probabilité de ne pas tirer une boule rouge ?",
    expectedSolution: {
      introduction: "L'univers est constitué des 8 boules. L'événement A 'tirer une boule rouge' a pour contraire Ā 'ne pas tirer une boule rouge'.",
      development: "P(A) = nombre de boules rouges / nombre total de boules = 5/8. Comme P(Ā) = 1 - P(A), on a P(Ā) = 1 - 5/8 = 3/8.",
      conclusion: "La probabilité de ne pas tirer une boule rouge est 3/8."
    },
    commonErrors: [
      "Confondre événement et événement contraire",
      "Oublier la formule P(Ā) = 1 - P(A)",
      "Erreur de calcul dans la soustraction"
    ],
    keyPoints: [
      "Définition de l'univers",
      "Utilisation de la propriété des événements contraires",
      "Vérification : P(A) + P(Ā) = 1"
    ]
  },
  {
    lessonId: 6, // Nombres Complexes (Partie 1)
    title: "Résolution d'équation du second degré dans C",
    statement: "Résoudre dans l'ensemble des nombres complexes C l'équation (E) : z² - 6z + 13 = 0.",
    expectedSolution: {
      introduction: "Je vais résoudre cette équation du second degré dans C en calculant le discriminant puis en appliquant la formule des racines.",
      development: "Je calcule le discriminant : Δ = b² - 4ac = (-6)² - 4(1)(13) = 36 - 52 = -16. Comme Δ < 0, l'équation n'a pas de solutions réelles mais a deux solutions complexes conjuguées. Je calcule √Δ = √(-16) = √(16 × (-1)) = 4i. Les solutions sont : z₁ = (6 + 4i)/2 = 3 + 2i et z₂ = (6 - 4i)/2 = 3 - 2i.",
      conclusion: "L'ensemble des solutions de l'équation dans C est S = {3 + 2i ; 3 - 2i}."
    },
    commonErrors: [
      "Oublier que √(-16) = 4i et non pas -4",
      "Confondre les parties réelle et imaginaire",
      "Ne pas vérifier que les solutions sont bien conjuguées"
    ],
    keyPoints: [
      "Calcul correct du discriminant",
      "Reconnaissance que Δ < 0 donne des solutions complexes",
      "Application de la formule avec √Δ = √|Δ| × i"
    ]
  },
  {
    lessonId: 7, // Fonctions Exponentielles
    title: "Résolution d'équation exponentielle",
    statement: "Résoudre l'équation e^(2x) - 3e^x + 2 = 0.",
    expectedSolution: {
      introduction: "Je vais résoudre cette équation en effectuant un changement de variable pour la ramener à une équation du second degré.",
      development: "Je pose X = e^x (avec X > 0 car e^x > 0 pour tout x réel). L'équation devient : X² - 3X + 2 = 0. Je calcule le discriminant : Δ = 9 - 8 = 1 > 0. Les solutions sont : X₁ = (3+1)/2 = 2 et X₂ = (3-1)/2 = 1. Je reviens à la variable x : e^x = 2 ⟹ x = ln(2) et e^x = 1 ⟹ x = ln(1) = 0.",
      conclusion: "L'ensemble des solutions est S = {0 ; ln(2)}."
    },
    commonErrors: [
      "Oublier la condition X > 0 lors du changement de variable",
      "Confondre ln(2) et ln(1)",
      "Ne pas vérifier les solutions dans l'équation initiale"
    ],
    keyPoints: [
      "Changement de variable X = e^x",
      "Résolution de l'équation du second degré en X",
      "Retour à la variable x avec la fonction ln"
    ]
  }
];