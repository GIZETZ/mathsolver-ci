// Programme officiel Terminale D - Côte d'Ivoire
// Documentation complète pour restreindre l'IA aux notions autorisées

export interface LessonCurriculum {
  id: number;
  name: string;
  description: string;
  objectives: string[];
  notions: string[];
  methods: string[];
  typicalExercises: string[];
  forbiddenTopics: string[];
  evaluationCriteria: {
    cm1: string[];
    cm2: string[];
    cm3: string[];
    cp: string[];
  };
}

export const TERMINALE_D_CURRICULUM: LessonCurriculum[] = [
  {
    id: 1,
    name: "Limites et Continuité",
    description: "Étude des limites de fonctions et notion de continuité",
    objectives: [
      "Calculer des limites de fonctions",
      "Déterminer la continuité d'une fonction",
      "Lever les indéterminations"
    ],
    notions: [
      "Limite finie ou infinie d'une fonction en un point",
      "Limite à droite, limite à gauche",
      "Limites et opérations",
      "Continuité en un point",
      "Fonctions continues sur un intervalle"
    ],
    methods: [
      "Calcul direct de limite",
      "Factorisation pour lever les indéterminations",
      "Utilisation des limites de référence",
      "Théorème des gendarmes"
    ],
    typicalExercises: [
      "Calculer lim(x→2) (x²-4)/(x-2)",
      "Étudier la continuité de f(x) = |x-1| en x=1",
      "Déterminer les asymptotes d'une fonction"
    ],
    forbiddenTopics: [
      "Développements limités",
      "Équivalents",
      "Continuité uniforme"
    ],
    evaluationCriteria: {
      cm1: ["Choix de la méthode adaptée", "Identification du type de limite"],
      cm2: ["Calculs corrects", "Application des théorèmes"],
      cm3: ["Justification des étapes", "Conclusion cohérente"],
      cp: ["Présentation claire", "Notation mathématique correcte"]
    }
  },
  {
    id: 2,
    name: "Probabilités",
    description: "Calcul de probabilités dans des situations d'équiprobabilité",
    objectives: [
      "Calculer des probabilités simples",
      "Utiliser les règles de probabilité",
      "Résoudre des problèmes d'équiprobabilité"
    ],
    notions: [
      "Expérience aléatoire, univers, événement",
      "Probabilité d'un événement",
      "Règles de calcul des probabilités",
      "Événements contraires, incompatibles",
      "Équiprobabilité"
    ],
    methods: [
      "Dénombrement des cas favorables/possibles",
      "Utilisation des formules P(A∪B), P(A∩B)",
      "Arbre de probabilité",
      "Tableau à double entrée"
    ],
    typicalExercises: [
      "Probabilité de tirer une carte rouge d'un jeu de 52 cartes",
      "Calcul avec des événements contraires",
      "Problèmes d'urnes"
    ],
    forbiddenTopics: [
      "Probabilités conditionnelles",
      "Variables aléatoires",
      "Lois de probabilité continues"
    ],
    evaluationCriteria: {
      cm1: ["Identification de l'univers", "Définition des événements"],
      cm2: ["Calculs de probabilités corrects", "Application des formules"],
      cm3: ["Interprétation du résultat", "Vérification de cohérence"],
      cp: ["Notation probabiliste", "Présentation du raisonnement"]
    }
  },
  {
    id: 3,
    name: "Dérivabilité et Étude de Fonctions",
    description: "Calcul de dérivées et étude complète de fonctions",
    objectives: [
      "Calculer la dérivée d'une fonction",
      "Étudier les variations d'une fonction",
      "Tracer la courbe représentative"
    ],
    notions: [
      "Dérivée en un point",
      "Fonction dérivée",
      "Dérivées des fonctions usuelles",
      "Dérivée d'une somme, d'un produit, d'un quotient",
      "Dérivée de la composée de deux fonctions",
      "Sens de variation et signe de la dérivée",
      "Extremums locaux"
    ],
    methods: [
      "Calcul de dérivées par les formules",
      "Étude du signe de la dérivée",
      "Tableau de variations",
      "Recherche d'extremums"
    ],
    typicalExercises: [
      "Calculer la dérivée de f(x) = x³ + 2x² - 5x + 1",
      "Étudier les variations de f(x) = x²/(x+1)",
      "Déterminer les extremums d'une fonction"
    ],
    forbiddenTopics: [
      "Dérivées d'ordre supérieur",
      "Formule de Taylor",
      "Théorème de Rolle avancé"
    ],
    evaluationCriteria: {
      cm1: ["Choix des formules de dérivation", "Méthode d'étude adaptée"],
      cm2: ["Calculs de dérivées corrects", "Résolution d'équations/inéquations"],
      cm3: ["Tableau de variations cohérent", "Interprétation graphique"],
      cp: ["Présentation du tableau", "Tracé de courbe"]
    }
  },
  {
    id: 4,
    name: "Primitives",
    description: "Recherche de primitives de fonctions usuelles",
    objectives: [
      "Déterminer une primitive d'une fonction",
      "Calculer une primitive avec conditions initiales",
      "Utiliser les primitives usuelles"
    ],
    notions: [
      "Notion de primitive",
      "Primitives des fonctions usuelles",
      "Primitive d'une somme",
      "Primitive de ku(x)u'(x)",
      "Primitive et condition initiale"
    ],
    methods: [
      "Reconnaissance de formes usuelles",
      "Intégration par reconnaissance",
      "Utilisation des tables de primitives"
    ],
    typicalExercises: [
      "Primitive de f(x) = 3x² + 2x - 1",
      "Trouver F telle que F'(x) = 2x+1 et F(0) = 3",
      "Primitive de (2x+1)³"
    ],
    forbiddenTopics: [
      "Intégration par parties",
      "Changement de variable",
      "Fractions rationnelles complexes"
    ],
    evaluationCriteria: {
      cm1: ["Reconnaissance de la forme", "Choix de la méthode"],
      cm2: ["Application des formules", "Calculs corrects"],
      cm3: ["Vérification par dérivation", "Gestion de la constante"],
      cp: ["Notation mathématique", "Présentation claire"]
    }
  },
  {
    id: 5,
    name: "Fonctions Logarithmes",
    description: "Étude des fonctions logarithmes népérien et décimal",
    objectives: [
      "Connaître les propriétés du logarithme",
      "Résoudre des équations logarithmiques",
      "Étudier des fonctions contenant des logarithmes"
    ],
    notions: [
      "Définition du logarithme népérien",
      "Propriétés algébriques : ln(ab), ln(a/b), ln(a^n)",
      "Fonction ln : domaine, variations, limites",
      "Dérivée de ln(u)",
      "Logarithme décimal"
    ],
    methods: [
      "Utilisation des propriétés algébriques",
      "Résolution d'équations ln(x) = a",
      "Dérivation de fonctions composées avec ln"
    ],
    typicalExercises: [
      "Résoudre ln(2x-1) = ln(3)",
      "Simplifier ln(e²) + ln(1/e)",
      "Dérivée de f(x) = ln(x² + 1)"
    ],
    forbiddenTopics: [
      "Logarithmes de base quelconque",
      "Développements asymptotiques",
      "Intégrales généralisées"
    ],
    evaluationCriteria: {
      cm1: ["Identification du domaine", "Choix de la propriété"],
      cm2: ["Application des formules", "Calculs algébriques"],
      cm3: ["Vérification des solutions", "Cohérence du résultat"],
      cp: ["Notation logarithmique", "Justification des étapes"]
    }
  },
  {
    id: 6,
    name: "Nombres Complexes (Partie 1 : Forme Algébrique)",
    description: "Introduction à l'ensemble des nombres complexes, à leur forme algébrique, et aux opérations arithmétiques de base.",
    objectives: [
      "Identifier la partie réelle et la partie imaginaire d'un nombre complexe",
      "Effectuer des calculs dans l'ensemble C (addition, soustraction, multiplication, division)",
      "Calculer le conjugué d'un nombre complexe",
      "Résoudre des équations du second degré dans C à coefficients réels"
    ],
    notions: [
      "Ensemble C et nombre i tel que i² = -1",
      "Forme algébrique a + ib",
      "Partie réelle Re(z) et partie imaginaire Im(z)",
      "Conjugué d'un nombre complexe",
      "Opérations arithmétiques dans C",
      "Résolution de l'équation az² + bz + c = 0 avec a, b, c réels"
    ],
    methods: [
      "Calcul direct pour somme, différence, produit",
      "Utilisation de l'expression conjuguée pour le quotient",
      "Calcul du discriminant Δ pour les équations du second degré"
    ],
    typicalExercises: [
      "Mettre Z = (2-i)/(3+2i) sous forme algébrique",
      "Résoudre dans C l'équation z² - 2z + 5 = 0"
    ],
    forbiddenTopics: [
      "Forme trigonométrique et exponentielle",
      "Argument et module (introduits dans la leçon suivante)",
      "Racines n-ièmes d'un nombre complexe",
      "Transformations géométriques complexes (similitudes, etc.)"
    ],
    evaluationCriteria: {
      cm1: ["Identification correcte des notions à utiliser (conjugué, discriminant)"],
      cm2: ["Maîtrise des techniques de calcul dans C", "Application correcte des formules de résolution"],
      cm3: ["Structuration du raisonnement (e.g., calcul de Δ puis des racines)"],
      cp: ["Présentation claire du résultat final sous la forme a+ib"]
    }
  },
  {
    id: 7,
    name: "Fonctions Exponentielles et Fonctions Puissances",
    description: "Étude de la fonction exponentielle népérienne, de ses propriétés algébriques et de sa dérivée.",
    objectives: [
      "Connaître la définition et les propriétés de la fonction exp(x)",
      "Calculer la dérivée de fonctions composées avec l'exponentielle",
      "Résoudre des équations et inéquations avec l'exponentielle",
      "Étudier les limites de référence de la fonction exponentielle"
    ],
    notions: [
      "Fonction exponentielle comme bijection réciproque de la fonction ln(x)",
      "Propriétés algébriques : exp(a+b), exp(a-b), exp(-a), exp(na)",
      "Dérivée de exp(x) et de exp(u(x))",
      "Limites aux bornes de l'ensemble de définition",
      "Croissance comparée (limites en +∞ de exp(x)/x)"
    ],
    methods: [
      "Application des propriétés algébriques pour simplifier des expressions",
      "Utilisation du changement de variable X = exp(x) pour résoudre des équations",
      "Étude de signe de l'exponentielle (toujours positive)"
    ],
    typicalExercises: [
      "Résoudre l'équation e^(2x) - 3e^x + 2 = 0",
      "Calculer la dérivée de f(x) = (x+1)e^(-x)",
      "Étudier les limites d'une fonction faisant intervenir l'exponentielle"
    ],
    forbiddenTopics: [
      "Fonctions exponentielles de base a (a≠e)",
      "Fonctions hyperboliques (sinh, cosh)"
    ],
    evaluationCriteria: {
      cm1: ["Reconnaissance du type d'équation ou de la forme de la fonction à dériver"],
      cm2: ["Application correcte des propriétés algébriques et des formules de dérivation"],
      cm3: ["Justification des étapes de résolution (changement de variable, tableau de signe)"],
      cp: ["Rigueur dans la manipulation des exposants et la simplification"]
    }
  },
  {
    id: 8,
    name: "Nombres Complexes et Géométrie",
    description: "Interprétation géométrique des nombres complexes.",
    objectives: [
      "Représenter un nombre complexe par un point ou un vecteur dans le plan",
      "Déterminer le module et un argument d'un nombre complexe",
      "Utiliser les nombres complexes pour caractériser des configurations géométriques"
    ],
    notions: [
      "Affixe d'un point, affixe d'un vecteur",
      "Module d'un nombre complexe |z|",
      "Argument d'un nombre complexe non nul arg(z)",
      "Formes trigonométrique et exponentielle",
      "Interprétation géométrique de |z' - z| et arg((z' - z)/(z'' - z))"
    ],
    methods: [
      "Calcul de module avec la formule |a+ib| = sqrt(a²+b²)",
      "Calcul d'argument avec cos(θ) et sin(θ)",
      "Utilisation des propriétés des modules et arguments (produit, quotient)"
    ],
    typicalExercises: [
      "Déterminer le module et un argument de z = 1 + i√3",
      "Déterminer la nature du triangle ABC connaissant les affixes de A, B, C"
    ],
    forbiddenTopics: [
      "Transformations complexes avancées (similitudes directes/indirectes)",
      "Formule de Moivre et applications à la trigonométrie"
    ],
    evaluationCriteria: {
      cm1: ["Association correcte entre notions complexes (module, argument) et notions géométriques (distance, angle)"],
      cm2: ["Exactitude des calculs de module et d'argument"],
      cm3: ["Enchaînement logique des déductions pour prouver une propriété géométrique"],
      cp: ["Qualité de la figure géométrique si demandée"]
    }
  },
  {
    id: 9,
    name: "Suites Numériques",
    description: "Étude des suites arithmétiques, géométriques et de leur convergence.",
    objectives: [
      "Identifier la nature d'une suite (arithmétique, géométrique)",
      "Calculer le terme général et la somme des termes d'une suite",
      "Déterminer la limite d'une suite numérique",
      "Utiliser le raisonnement par récurrence pour démontrer une propriété"
    ],
    notions: [
      "Suites arithmétiques : raison, terme général, somme",
      "Suites géométriques : raison, terme général, somme",
      "Sens de variation d'une suite",
      "Convergence et divergence d'une suite",
      "Limites de référence (suites géométriques, etc.)",
      "Principe du raisonnement par récurrence"
    ],
    methods: [
      "Calcul de U(n+1) - U(n) ou U(n+1)/U(n) pour étudier la nature et la monotonie",
      "Utilisation des formules du terme général et de la somme",
      "Théorèmes de convergence (suites monotones et majorées/minorées)"
    ],
    typicalExercises: [
      "Démontrer par récurrence qu'une suite est majorée",
      "Étudier la convergence d'une suite arithmético-géométrique"
    ],
    forbiddenTopics: [
      "Suites adjacentes",
      "Théorèmes de comparaison complexes",
      "Séries numériques"
    ],
    evaluationCriteria: {
      cm1: ["Identification correcte de la nature de la suite et de la méthode d'étude (récurrence, calcul direct)"],
      cm2: ["Application correcte des formules de suites et des théorèmes de convergence"],
      cm3: ["Rigueur du raisonnement par récurrence (initialisation, hérédité, conclusion)"],
      cp: ["Clarté dans la justification de la convergence et le calcul de la limite"]
    }
  },
  {
    id: 10,
    name: "Calcul Intégral",
    description: "Introduction au calcul de primitives et à l'intégrale définie pour le calcul d'aires.",
    objectives: [
      "Déterminer une primitive d'une fonction usuelle",
      "Utiliser les propriétés de l'intégrale (linéarité, relation de Chasles)",
      "Calculer l'intégrale définie d'une fonction continue sur un intervalle",
      "Calculer l'aire d'un domaine délimité par des courbes"
    ],
    notions: [
      "Notion de primitive",
      "Primitives des fonctions de référence",
      "Intégrale de a à b d'une fonction continue f : F(b) - F(a)",
      "Propriétés de l'intégrale",
      "Valeur moyenne d'une fonction",
      "Aire sous la courbe (pour une fonction positive)"
    ],
    methods: [
      "Lecture inverse du tableau des dérivées pour trouver des primitives",
      "Identification des formes u'u^n, u'/u, u'e^u",
      "Calcul d'aire par la différence de deux intégrales"
    ],
    typicalExercises: [
      "Calculer l'intégrale de 0 à 1 de f(x) = xe^(x²)",
      "Calculer l'aire du domaine délimité par les courbes de y=x² et y=√x"
    ],
    forbiddenTopics: [
      "Intégration par parties",
      "Changement de variable",
      "Intégrales impropres (bornes infinies)"
    ],
    evaluationCriteria: {
      cm1: ["Identification de la bonne primitive ou de la bonne intégrale à calculer"],
      cm2: ["Maîtrise du calcul des primitives et des intégrales définies"],
      cm3: ["Justification de la démarche pour le calcul d'aire (position relative des courbes)"],
      cp: ["Utilisation correcte des notations d'intégrale et de primitive"]
    }
  },
  {
    id: 11,
    name: "Statistique à Deux Variables",
    description: "Analyse de la relation entre deux variables statistiques.",
    objectives: [
      "Représenter un nuage de points",
      "Calculer les coordonnées du point moyen G",
      "Déterminer l'équation de la droite d'ajustement par la méthode des moindres carrés",
      "Calculer le coefficient de corrélation linéaire et l'interpréter",
      "Effectuer des prévisions à l'aide de l'ajustement affine"
    ],
    notions: [
      "Série statistique double (xi, yi)",
      "Nuage de points, point moyen G(x̄, ȳ)",
      "Covariance Cov(X, Y)",
      "Droite de régression de y en x",
      "Coefficient de corrélation linéaire r",
      "Ajustement affine"
    ],
    methods: [
      "Calcul des moyennes, variances, covariance",
      "Application des formules pour la droite des moindres carrés (y = ax + b)",
      "Application de la formule du coefficient de corrélation"
    ],
    typicalExercises: [
      "Ajuster un nuage de points par la droite des moindres carrés et faire une estimation"
    ],
    forbiddenTopics: [
      "Ajustements non linéaires (exponentiel, puissance)",
      "Intervalle de confiance",
      "Tests d'hypothèses"
    ],
    evaluationCriteria: {
      cm1: ["Choix pertinent de l'ajustement affine au vu du nuage de points"],
      cm2: ["Exactitude des calculs statistiques (moyennes, covariance, r, a, b)"],
      cm3: ["Cohérence de l'interprétation du coefficient de corrélation et de l'estimation"],
      cp: ["Qualité du graphique (nuage de points et droite d'ajustement)"]
    }
  },
  {
    id: 12,
    name: "Équations Différentielles",
    description: "Résolution d'équations différentielles linéaires du premier ordre.",
    objectives: [
      "Résoudre l'équation différentielle y' = ay",
      "Résoudre l'équation différentielle y' = ay + b",
      "Trouver une solution particulière vérifiant une condition initiale"
    ],
    notions: [
      "Équation différentielle",
      "Solution générale, solution particulière",
      "Condition initiale"
    ],
    methods: [
      "Application des formules de solutions générales (y(x) = Ce^(ax) et y(x) = Ce^(ax) - b/a)",
      "Détermination de la constante C à l'aide de la condition initiale"
    ],
    typicalExercises: [
      "Résoudre y' + 2y = 0 avec y(0) = 3",
      "Trouver la solution de y' = 3y + 5 qui s'annule en x=1"
    ],
    forbiddenTopics: [
      "Équations différentielles du second ordre",
      "Équations avec second membre non constant (sauf y' = ay + f(x) où une solution particulière est donnée)",
      "Méthode de variation de la constante"
    ],
    evaluationCriteria: {
      cm1: ["Identification correcte du type d'équation différentielle"],
      cm2: ["Application correcte des formules de résolution"],
      cm3: ["Démarche claire pour trouver la solution particulière avec la condition initiale"],
      cp: ["Rigueur dans la notation et la présentation de la solution finale"]
    }
  }
];

export const METHODOLOGY_UEMOA = {
  structure: {
    introduction: [
      "Identification du problème",
      "Reconnaissance des notions en jeu",
      "Choix des outils mathématiques",
      "Plan de résolution"
    ],
    development: [
      "Application méthodique des outils",
      "Justification de chaque étape",
      "Calculs détaillés et corrects",
      "Vérifications intermédiaires"
    ],
    conclusion: [
      "Synthèse de la résolution",
      "Réponse explicite au problème posé",
      "Vérification de cohérence",
      "Interprétation si nécessaire"
    ]
  },
  evaluationGrid: {
    cm1_pertinence: {
      maxPoints: 0.75,
      criteria: [
        "Pertinence de la méthode choisie",
        "Adaptation aux données du problème",
        "Cohérence du plan de résolution"
      ]
    },
    cm2_outils: {
      maxPoints: 2.5,
      criteria: [
        "Utilisation correcte des outils mathématiques",
        "Exactitude des calculs",
        "Application correcte des formules et théorèmes"
      ]
    },
    cm3_coherence: {
      maxPoints: 1.25,
      criteria: [
        "Cohérence du raisonnement",
        "Enchaînement logique des étapes",
        "Justification des démarches"
      ]
    },
    cp_perfectionnement: {
      maxPoints: 0.5,
      criteria: [
        "Qualité de la présentation",
        "Clarté de l'expression",
        "Respect des notations"
      ]
    }
  }
};