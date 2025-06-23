// Situations complexes - Structure APC pour Terminale D Côte d'Ivoire

export interface ComplexSituation {
  id: string; // e.g., 'sc-01-diff-eq'
  lessonIds: number[]; // Les leçons principales mobilisées
  title: string;
  
  // Le cadre narratif du problème
  context: string; 
  
  // Les données brutes, textes ou images à analyser
  supports: {
    type: 'text' | 'image' | 'data';
    content: string;
  }[];

  // La liste des tâches à accomplir
  tasks: {
    id: number;
    consigne: string; // La question posée pour cette tâche
    solution: {
      introduction: string; // "Pour accomplir cette tâche, je dois..."
      steps: string[]; // Les étapes détaillées utilisant les verbes d'action
      conclusion: string; // Conclusion partielle pour cette tâche
    };
  }[];

  // La conclusion finale qui synthétise tout
  finalConclusion: string;
}

export const COMPLEX_SITUATIONS: ComplexSituation[] = [
  {
    id: 'sc-01-diff-eq',
    lessonIds: [12, 7], // Équations différentielles, Fonctions exponentielles
    title: "Croissance d'une culture bactérienne",
    context: "Un laboratoire de biologie étudie la croissance d'une population de bactéries. La vitesse de croissance de la population est, à chaque instant, proportionnelle à la taille de la population.",
    supports: [
      { type: 'data', content: "Population initiale (t=0) : N(0) = 1000 bactéries." },
      { type: 'data', content: "Population à t=2 heures : N(2) = 4000 bactéries." }
    ],
    tasks: [
      {
        id: 1,
        consigne: "Déterminer le modèle mathématique qui régit cette croissance.",
        solution: {
          introduction: "Je traduis les informations du contexte en langage mathématique pour établir une équation différentielle.",
          steps: [
            "Je définis N(t) comme le nombre de bactéries à l'instant t.",
            "La vitesse de croissance est la dérivée N'(t).",
            "L'énoncé dit que N'(t) est proportionnelle à N(t).",
            "J'écris donc l'équation : N'(t) = k × N(t), où k est une constante de proportionnalité réelle positive, car il s'agit d'une croissance."
          ],
          conclusion: "Le modèle mathématique est l'équation différentielle N'(t) = k × N(t) de la forme y' = ky."
        }
      },
      {
        id: 2,
        consigne: "Trouver l'expression du nombre de bactéries N(t) en fonction du temps t.",
        solution: {
          introduction: "Je vais résoudre l'équation différentielle trouvée et utiliser les données du support pour déterminer les constantes.",
          steps: [
            "Je reconnais une équation différentielle de type y' = ky dont la solution générale est N(t) = C × e^(kt), où C est une constante réelle.",
            "J'utilise la condition initiale N(0) = 1000 : 1000 = C × e^(k×0) ⟹ 1000 = C × 1 ⟹ C = 1000.",
            "L'expression devient donc N(t) = 1000 × e^(kt).",
            "J'utilise la deuxième condition N(2) = 4000 : 4000 = 1000 × e^(k×2) ⟹ 4 = e^(2k).",
            "J'applique la fonction logarithme népérien : ln(4) = ln(e^(2k)) ⟹ ln(4) = 2k.",
            "Je calcule k : k = ln(4)/2 = ln(2²)/2 = 2ln(2)/2 = ln(2).",
            "Je remplace dans l'expression : N(t) = 1000 × e^(t×ln(2)) = 1000 × e^(ln(2^t)) = 1000 × 2^t."
          ],
          conclusion: "L'expression du nombre de bactéries en fonction du temps est N(t) = 1000 × 2^t bactéries."
        }
      },
      {
        id: 3,
        consigne: "Au bout de combien de temps la population aura-t-elle doublé par rapport à sa taille initiale ?",
        solution: {
          introduction: "Je cherche l'instant t pour lequel N(t) sera égal au double de la population initiale, soit 2 × 1000 = 2000 bactéries.",
          steps: [
            "Je pose l'équation à résoudre : N(t) = 2000.",
            "Je substitue l'expression trouvée : 1000 × 2^t = 2000.",
            "Je simplifie l'équation : 2^t = 2000/1000 = 2.",
            "Je reconnais que 2^t = 2^1, donc t = 1."
          ],
          conclusion: "La population doublera au bout de 1 heure."
        }
      }
    ],
    finalConclusion: "En modélisant la croissance bactérienne par l'équation différentielle N'(t) = k×N(t), nous avons déterminé que la population suit la loi N(t) = 1000 × 2^t. Cette population double toutes les heures, ce qui est cohérent avec les données observées au laboratoire."
  },
  {
    id: 'sc-02-complex-geom',
    lessonIds: [8, 6], // Nombres Complexes et Géométrie, Nombres Complexes forme algébrique
    title: "Étude d'un triangle dans le plan complexe",
    context: "Dans le plan complexe, on considère les points A, B et C d'affixes respectives zA = 1 + 2i, zB = 3 - i et zC = -1 + i.",
    supports: [
      { type: 'data', content: "Point A d'affixe zA = 1 + 2i" },
      { type: 'data', content: "Point B d'affixe zB = 3 - i" },
      { type: 'data', content: "Point C d'affixe zC = -1 + i" }
    ],
    tasks: [
      {
        id: 1,
        consigne: "Calculer les longueurs des côtés du triangle ABC.",
        solution: {
          introduction: "Je vais utiliser la propriété que la distance entre deux points d'affixes z₁ et z₂ est égale au module |z₂ - z₁|.",
          steps: [
            "Je calcule AB = |zB - zA| = |(3 - i) - (1 + 2i)| = |2 - 3i|.",
            "Je calcule le module : |2 - 3i| = √(2² + (-3)²) = √(4 + 9) = √13.",
            "Je calcule BC = |zC - zB| = |(-1 + i) - (3 - i)| = |-4 + 2i|.",
            "Je calcule le module : |-4 + 2i| = √((-4)² + 2²) = √(16 + 4) = √20 = 2√5.",
            "Je calcule CA = |zA - zC| = |(1 + 2i) - (-1 + i)| = |2 + i|.",
            "Je calcule le module : |2 + i| = √(2² + 1²) = √(4 + 1) = √5."
          ],
          conclusion: "Les longueurs des côtés sont : AB = √13, BC = 2√5 et CA = √5."
        }
      },
      {
        id: 2,
        consigne: "Déterminer la nature du triangle ABC.",
        solution: {
          introduction: "Je vais analyser les relations entre les longueurs des côtés pour déterminer si le triangle a des propriétés particulières.",
          steps: [
            "Je vérifie s'il existe une relation du type a² + b² = c² (théorème de Pythagore).",
            "Je calcule les carrés : AB² = 13, BC² = 20, CA² = 5.",
            "Je teste : CA² + AB² = 5 + 13 = 18 ≠ 20 = BC².",
            "Je teste : CA² + BC² = 5 + 20 = 25 ≠ 13 = AB².",
            "Je teste : AB² + BC² = 13 + 20 = 33 ≠ 5 = CA².",
            "Aucune relation de Pythagore n'est vérifiée, donc le triangle n'est pas rectangle.",
            "Je vérifie si deux côtés sont égaux : AB ≠ BC ≠ CA, donc le triangle n'est pas isocèle."
          ],
          conclusion: "Le triangle ABC est un triangle quelconque (scalène)."
        }
      }
    ],
    finalConclusion: "L'étude du triangle ABC dans le plan complexe montre qu'il s'agit d'un triangle scalène de côtés AB = √13, BC = 2√5 et CA = √5. Les nombres complexes permettent de calculer facilement les distances géométriques grâce au module."
  },
  {
    id: 'sc-03-suite-finance',
    lessonIds: [9], // Suites Numériques
    title: "Évolution d'un capital avec intérêts composés",
    context: "Une personne place un capital initial de 100 000 FCFA dans une banque qui propose un taux d'intérêt annuel de 5% avec capitalisation des intérêts.",
    supports: [
      { type: 'data', content: "Capital initial : C₀ = 100 000 FCFA" },
      { type: 'data', content: "Taux d'intérêt annuel : t = 5% = 0,05" },
      { type: 'data', content: "Les intérêts sont capitalisés chaque année" }
    ],
    tasks: [
      {
        id: 1,
        consigne: "Exprimer le capital Cₙ en fonction du nombre d'années n.",
        solution: {
          introduction: "Je vais modéliser l'évolution du capital par une suite géométrique car les intérêts sont capitalisés.",
          steps: [
            "Chaque année, le capital est multiplié par (1 + t) = 1,05.",
            "Après 1 an : C₁ = C₀ × 1,05 = 100 000 × 1,05.",
            "Après 2 ans : C₂ = C₁ × 1,05 = C₀ × (1,05)².",
            "Je généralise : après n années, Cₙ = C₀ × (1,05)ⁿ.",
            "Je substitue C₀ = 100 000 : Cₙ = 100 000 × (1,05)ⁿ."
          ],
          conclusion: "Le capital après n années est donné par Cₙ = 100 000 × (1,05)ⁿ FCFA."
        }
      },
      {
        id: 2,
        consigne: "Calculer le capital après 10 ans.",
        solution: {
          introduction: "J'applique la formule trouvée avec n = 10.",
          steps: [
            "Je calcule C₁₀ = 100 000 × (1,05)¹⁰.",
            "Je calcule (1,05)¹⁰ ≈ 1,6289 (valeur approchée).",
            "Donc C₁₀ ≈ 100 000 × 1,6289 = 162 890 FCFA."
          ],
          conclusion: "Après 10 ans, le capital sera d'environ 162 890 FCFA."
        }
      },
      {
        id: 3,
        consigne: "Au bout de combien d'années le capital aura-t-il doublé ?",
        solution: {
          introduction: "Je cherche la valeur de n pour laquelle Cₙ = 2 × C₀ = 200 000 FCFA.",
          steps: [
            "Je pose l'équation : 100 000 × (1,05)ⁿ = 200 000.",
            "Je simplifie : (1,05)ⁿ = 2.",
            "J'applique la fonction logarithme népérien : ln((1,05)ⁿ) = ln(2).",
            "Je utilise la propriété : n × ln(1,05) = ln(2).",
            "Je résous : n = ln(2)/ln(1,05) ≈ 0,6931/0,0488 ≈ 14,2 années."
          ],
          conclusion: "Le capital doublera au bout d'environ 14,2 années, soit environ 14 ans et 2 mois."
        }
      }
    ],
    finalConclusion: "La modélisation par une suite géométrique permet de prévoir l'évolution du capital avec intérêts composés. Avec un taux de 5% par an, le capital de 100 000 FCFA atteindra environ 162 890 FCFA après 10 ans et doublera en 14,2 années."
  }
];