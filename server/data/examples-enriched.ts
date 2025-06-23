import { ComplexSituation } from './situations';

export interface EnrichedExampleSolution {
  lessonId: number;
  situation: ComplexSituation;
  officialSolution: {
    introduction: string;
    development: string;
    conclusion: string;
    calculations: Array<{
      step: string;
      calculation: string;
      result: string;
    }>;
  };
}

export const ENRICHED_EXAMPLES: EnrichedExampleSolution[] = [
  // Leçon 1: LIMITES ET CONTINUITÉ
  {
    lessonId: 1,
    situation: {
      id: 'sc-01-limites-depliants',
      lessonIds: [1],
      title: 'Coût par client d\'une campagne publicitaire',
      context: 'La maman d\'un élève en terminale D au lycée moderne de Bouaflé désire une relance publicitaire auprès de ses meilleurs clients.',
      supports: [
        {
          type: 'text',
          content: 'Elle fait donc imprimer des dépliants qui lui coûtent 4 000 FCFA en frais fixes plus 100 FCFA par dépliant à l\'exception de 20 copies qui ne seront pas distribuées. Elle est sure que chaque dépliant sera lu par 20 personnes. La commerçante voudrait déterminer le coût d\'un dépliant par client pour une production de dépliants à long terme.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Détermine ce coût pour la maman.',
          solution: {
            introduction: 'Pour répondre au problème qui est posé, je vais utiliser les limites et la continuité',
            steps: [
              'Je vais d\'abord déterminer le coût de production C(x) pour x clients',
              'Puis calculer la limite de C(x) lorsque x tend vers +∞'
            ],
            conclusion: 'En définitive, le coût de production par client à long terme est 5 FCFA.'
          }
        }
      ],
      finalConclusion: 'Le coût de production par client à long terme est de 5 FCFA.'
    },
    officialSolution: {
      introduction: 'Pour répondre au problème qui est posé, je vais utiliser les limites et la continuité. Je vais d\'abord déterminer le coût de production C(x) pour x clients puis calculer la limite de C(x) lorsque x tend vers +∞.',
      development: 'Notons x le nombre de dépliants à produire, où x > 20 et C(x) le coût de production, par client, en FCFA.\n\nIl faut déterminer le coût C(x) et puis calculer lim(x→+∞) C(x).\n\nLe coût de revient de x dépliants est 4000 + 100(x – 20)\nLe nombre de clients susceptibles de lire les dépliants est 20(x – 20).\n\nC(x) = [4000 + 100(x - 20)] / [20(x - 20)] = 5 + 200/(x - 20)\n\nlim(x→+∞) C(x) = 5',
      conclusion: 'En définitive, le coût de production par client à long terme est 5 FCFA.',
      calculations: [
        {
          step: 'Coût de revient total',
          calculation: '4000 + 100(x - 20)',
          result: '4000 + 100x - 2000 = 2000 + 100x'
        },
        {
          step: 'Nombre de clients potentiels',
          calculation: '20(x - 20)',
          result: '20x - 400'
        },
        {
          step: 'Coût par client',
          calculation: 'C(x) = [4000 + 100(x - 20)] / [20(x - 20)]',
          result: 'C(x) = 5 + 200/(x - 20)'
        },
        {
          step: 'Limite à l\'infini',
          calculation: 'lim(x→+∞) [5 + 200/(x - 20)]',
          result: '5 FCFA'
        }
      ]
    }
  },

  // Leçon 2: PROBABILITÉ
  {
    lessonId: 2,
    situation: {
      id: 'sc-02-probabilite-microprocesseurs',
      lessonIds: [2],
      title: 'Contrôle qualité des microprocesseurs',
      context: 'Dans le cadre de l\'introduction des TIC à l\'école, un établissement scolaire a organisé une visite d\'étude dans une usine de fabrique de microprocesseurs.',
      supports: [
        {
          type: 'text',
          content: 'Le directeur de la fabrique informe les élèves que 4% de la production journalière est défectueuse. Le service de contrôle qualité a mis en place un système de vérification systématique des microprocesseurs. Cette vérification n\'est pas parfaite, elle ne détecte que 95% des microprocesseurs défectueux et déclare défectueux 2% des microprocesseurs qui ne présentent pourtant aucun défaut.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Détermine la probabilité qu\'il y ait erreur lors de son contrôle.',
          solution: {
            introduction: 'Pour résoudre le problème, je vais utiliser les probabilités',
            steps: [
              'Considérons les événements M : « Le microprocesseur est défectueux » et R : « Le microprocesseur est accepté »',
              'Il y a erreur si le microprocesseur est défectueux et accepté ou en bon état et rejeté',
              'Calculons P(M∩R̄) + P(M̄∩R̄)'
            ],
            conclusion: 'La probabilité d\'erreur est 0,0212 soit 2,12%'
          }
        }
      ],
      finalConclusion: 'La probabilité qu\'il y ait erreur lors du contrôle est de 2,12%.'
    },
    officialSolution: {
      introduction: 'Pour résoudre le problème, je vais utiliser les probabilités. Considérons les événements : M : « Le microprocesseur est défectueux » et R : « Le microprocesseur est accepté »',
      development: 'Il y a erreur si le microprocesseur est défectueux et accepté ou en bon état et rejeté.\n\nDonnées :\n- P(M) = 4/100 = 0,04\n- P(R̄|M) = 5/100 = 0,05 (5% des défectueux sont acceptés)\n- P(R̄|M̄) = 2/100 = 0,02 (2% des bons sont rejetés)\n\nCalcul de la probabilité d\'erreur :\nP(erreur) = P(M∩R) + P(M̄∩R̄)\n= P(M) × P(R|M) + P(M̄) × P(R̄|M̄)\n= (4/100) × (5/100) + (96/100) × (2/100)\n= 0,0020 + 0,0192 = 0,0212',
      conclusion: 'Donc la probabilité qu\'il y ait une erreur est 0,0212 soit 2,12%.',
      calculations: [
        {
          step: 'Probabilité microprocesseur défectueux',
          calculation: 'P(M) = 4/100',
          result: '0,04'
        },
        {
          step: 'Erreur type 1: défectueux accepté',
          calculation: 'P(M) × P(R|M) = 0,04 × 0,05',
          result: '0,0020'
        },
        {
          step: 'Erreur type 2: bon rejeté',
          calculation: 'P(M̄) × P(R̄|M̄) = 0,96 × 0,02',
          result: '0,0192'
        },
        {
          step: 'Probabilité totale d\'erreur',
          calculation: '0,0020 + 0,0192',
          result: '0,0212 = 2,12%'
        }
      ]
    }
  },

  // Leçon 3: DÉRIVABILITÉ ET ÉTUDE DE FONCTIONS
  {
    lessonId: 3,
    situation: {
      id: 'sc-03-derivabilite-gouttiere',
      lessonIds: [3],
      title: 'Optimisation du volume d\'une gouttière',
      context: 'M. Bolou a acheté une feuille métallique de forme rectangulaire de 12 cm de largeur et 2 m de longueur.',
      supports: [
        {
          type: 'text',
          content: 'Il veut la modeler pour en faire une gouttière en pliant les deux longs côtés pour les relever perpendiculairement à la feuille. Il a du mal à trouver la hauteur des côtés relevés pour que la gouttière ait une contenance maximale.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Propose-lui une solution argumentée.',
          solution: {
            introduction: 'Pour résoudre ce problème d\'optimisation, je vais utiliser la dérivabilité et l\'étude de fonctions',
            steps: [
              'Notons x la hauteur des bords relevés',
              'Déterminons le volume V(x) de la gouttière',
              'Étudions les variations de V(x) pour trouver le maximum'
            ],
            conclusion: 'La hauteur optimale des bords relevés est de 3 cm pour obtenir un volume maximal de 3600 cm³'
          }
        }
      ],
      finalConclusion: 'La hauteur des bords relevés pour obtenir un volume maximal est donc de 3 cm.'
    },
    officialSolution: {
      introduction: 'Pour résoudre ce problème d\'optimisation, je vais utiliser la dérivabilité et l\'étude de fonctions.',
      development: 'a. Notons x la hauteur des bords relevés.\nLa gouttière obtenue a la forme d\'un pavé droit dont les dimensions sont :\nh = 200 cm ; L = 12 – 2x cm ; l = x cm.\n\nDonc le volume V(x) est :\nV(x) = l × L × h\nV(x) = x(12 – 2x) × 200\nSoit V(x) = 400(6x – x²)\n\nb. Déterminons le maximum de la fonction V.\nD = [0;6]\n∀x ∈ D, V\'(x) = 800(3 - x)\nV\'(x) = 0 ⟺ x = 3\n\nV est croissante sur [0;3]\nV est décroissante sur [3;6]\n\nLe maximum de V est 3600 cm³ atteint pour x = 3 cm.',
      conclusion: 'La hauteur des bords relevés pour obtenir un volume maximal est donc de 3 cm.',
      calculations: [
        {
          step: 'Dimensions de la gouttière',
          calculation: 'Longueur = 200 cm, Largeur = 12-2x cm, Hauteur = x cm',
          result: 'V(x) = x(12-2x) × 200'
        },
        {
          step: 'Expression du volume',
          calculation: 'V(x) = 200x(12-2x) = 400(6x-x²)',
          result: 'V(x) = 2400x - 400x²'
        },
        {
          step: 'Dérivée première',
          calculation: 'V\'(x) = 2400 - 800x = 800(3-x)',
          result: 'V\'(x) = 0 ⟺ x = 3'
        },
        {
          step: 'Volume maximal',
          calculation: 'V(3) = 400(6×3 - 3²) = 400(18-9)',
          result: '3600 cm³'
        }
      ]
    }
  },

  // Leçon 4: PRIMITIVES
  {
    lessonId: 4,
    situation: {
      id: 'sc-04-primitives-glacier',
      lessonIds: [4],
      title: 'Optimisation du bénéfice d\'un pâtissier',
      context: 'Un pâtissier commercialise des glaces d\'un même type très prisées par les consommateurs.',
      supports: [
        {
          type: 'text',
          content: 'Il peut en produire entre 0 et 300 par jour dans sa petite entreprise familiale. Cette production est vendue dans sa totalité. Lorsque x représente le nombre en centaines de glaces produites, on note B(x), le bénéfice réalisé par le pâtissier pour la vente des x centaines de glaces. Pour tout x de l\'intervalle [1 ; 3], on a : B\'(x) = − 20x + 30, où B(x) est exprimé en milliers de francs et B\' la fonction dérivée de B. Pour une centaine de glaces vendue, son bénéfice est 20 mille francs.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Détermine son bénéfice maximal.',
          solution: {
            introduction: 'Pour déterminer le bénéfice maximal, je vais utiliser les primitives et l\'étude de fonctions',
            steps: [
              'Étudier le signe de B\'(x) pour déterminer les variations de B',
              'Déterminer l\'expression de B(x) à partir de B\'(x)',
              'Calculer B(1,5) pour obtenir le bénéfice maximal'
            ],
            conclusion: 'Le bénéfice maximal est de 22 500 F pour une production de 150 glaces par jour'
          }
        }
      ],
      finalConclusion: 'Donc le bénéfice maximal est 22 500 F.'
    },
    officialSolution: {
      introduction: 'Pour déterminer le bénéfice maximal, je vais utiliser les primitives et l\'étude de fonctions.',
      development: 'a. Pour tout x élément de ]1;3[\nB\'(x) = –20(x – 1,5)\nB\'(x) = 0 ⟺ x = 1,5 ; B\'(x) < 0 ⟺ x < 1,5 et B\'(x) > 0 ⟺ x > 1,5\n\n∀x ∈ ]1;1,5[, B\'(x) > 0 et ∀x ∈ ]1,5;3[, B\'(x) < 0\nD\'où, B atteint son maximum en 1,5.\nDonc, il devra fabriquer 1500 glaces par jour pour que le bénéfice soit maximal.\n\nb. Pour tout x élément de ]1;3[\nB(x) = –10x² + 30x + c (c ∈ ℝ) et B(1) = 20\nB(1) = 20 ⟹ -10 + 30 + c = 20\n⟹ c = 0\n\nD\'où, ∀x ∈ [1 ; 3], B(x) = –10x² + 30x\nB(1,5) = 22,5',
      conclusion: 'Donc le bénéfice maximal est 22 500 F.',
      calculations: [
        {
          step: 'Étude du signe de B\'(x)',
          calculation: 'B\'(x) = -20x + 30 = -20(x - 1,5)',
          result: 'B\'(x) = 0 ⟺ x = 1,5'
        },
        {
          step: 'Primitive de B\'(x)',
          calculation: '∫(-20x + 30)dx = -10x² + 30x + c',
          result: 'B(x) = -10x² + 30x + c'
        },
        {
          step: 'Détermination de c',
          calculation: 'B(1) = 20 ⟹ -10 + 30 + c = 20',
          result: 'c = 0'
        },
        {
          step: 'Bénéfice maximal',
          calculation: 'B(1,5) = -10(1,5)² + 30(1,5)',
          result: '22,5 milliers de francs = 22 500 F'
        }
      ]
    }
  },

  // Leçon 5: FONCTIONS LOGARITHMES
  {
    lessonId: 5,
    situation: {
      id: 'sc-05-logarithmes-carbone14',
      lessonIds: [5],
      title: 'Datation au carbone 14',
      context: 'Au cours d\'une conférence prononcée dans un lycée, le conférencier a donné des informations sur la datation au carbone 14.',
      supports: [
        {
          type: 'text',
          content: 'Une modélisation mathématique permet d\'établir : f(x) = 1 – 8310ln(x) où f(x) est l\'âge en années d\'un fossile et x la fraction de carbone 14. Des archéologues ont découvert récemment deux types de fragments d\'os : un des types contient 35% de leur teneur en carbone et l\'autre type est vieux de 15 000 ans.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Calcule l\'âge d\'un fossile qui contient encore 35% de son carbone 14.',
          solution: {
            introduction: 'Pour calculer l\'âge du fossile, je vais utiliser les fonctions logarithmes',
            steps: [
              'Appliquer la formule f(x) = 1 – 8310ln(x) avec x = 0,35',
              'Calculer f(0,35)'
            ],
            conclusion: 'Un fossile qui contient encore 35% de son carbone 14 a environ 8725 ans'
          }
        },
        {
          id: 2,
          consigne: 'Détermine la fraction de carbone 14 restant dans un fossile vieux de 15 000 ans.',
          solution: {
            introduction: 'Pour déterminer la fraction de carbone 14, je vais résoudre l\'équation f(x) = 15000',
            steps: [
              'Résoudre 1 – 8310ln(x) = 15000',
              'Isoler ln(x) puis calculer x'
            ],
            conclusion: 'Un fossile vieux de 15 000 ans contient environ 16,45% de carbone 14'
          }
        }
      ],
      finalConclusion: 'Les calculs confirment la cohérence du modèle de datation au carbone 14.'
    },
    officialSolution: {
      introduction: 'Pour résoudre ces problèmes de datation, je vais utiliser les fonctions logarithmes.',
      development: '1. Son âge est f(0,35)\nOn a :\nf(0,35) = 1 – 8310 ln(0,35) = 8725,0218\nUn fossile qui contient encore 35% de son carbone 14 a environ 8725 ans.\n\n2. Il s\'agit de trouver x tel que :\nf(x) = 15000\nf(x) = 15000 ⟹ 1 – 8310 ln(x) = 15000\n⟹ ln(x) = (1-15000)/(-8310)\n⟹ ln(x) = -14999/8310\n⟹ x = e^(-14999/8310)\n⟹ x = 0,1645 (par excès à 10⁻⁴ près)\nSoit environ 16,45 %',
      conclusion: 'Les fragments vieux de 15 000 ans contiennent environ 16,45% de leur carbone 14 initial.',
      calculations: [
        {
          step: 'Âge pour 35% de carbone 14',
          calculation: 'f(0,35) = 1 – 8310×ln(0,35)',
          result: '8725 ans (arrondi à la centaine)'
        },
        {
          step: 'Résolution de f(x) = 15000',
          calculation: '1 – 8310×ln(x) = 15000',
          result: 'ln(x) = -14999/8310'
        },
        {
          step: 'Calcul de la fraction',
          calculation: 'x = e^(-14999/8310)',
          result: 'x ≈ 0,1645 = 16,45%'
        }
      ]
    }
  },

  // Leçon 10: CALCUL INTÉGRAL
  {
    lessonId: 10,
    situation: {
      id: 'sc-10-integrales-terrain',
      lessonIds: [10],
      title: 'Calcul de l\'aire d\'un terrain agricole',
      context: 'La coopérative d\'un lycée a reçu le terrain représenté par la zone hachurée pour cultiver de la tomate.',
      supports: [
        {
          type: 'text',
          content: 'Le géomètre qui a travaillé sur le lot du lycée affirme que la courbe (C) représentée est celle de la fonction f définie par : f(x) = 1600 - x²/4 + x/124 ; x est exprimé en mètres. Les élèves de la promotion terminale souhaitent connaître l\'aire de leur terrain pour acheter les grains de tomate.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'En utilisant tes connaissances sur le calcul intégral, détermine l\'aire du terrain.',
          solution: {
            introduction: 'Pour calculer l\'aire du terrain, je vais utiliser le calcul intégral',
            steps: [
              'Déterminer une primitive de la fonction f sur l\'intervalle [0;600]',
              'Calculer l\'intégrale définie ∫₀⁶⁰⁰ f(x) dx',
              'Multiplier par l\'échelle appropriée pour obtenir l\'aire réelle'
            ],
            conclusion: 'L\'aire du terrain est 119 040 000 m²'
          }
        }
      ],
      finalConclusion: 'L\'aire du terrain est 119 040 000 m².'
    },
    officialSolution: {
      introduction: 'Pour calculer l\'aire du terrain, je vais utiliser le calcul intégral.',
      development: '1. Déterminons une primitive de la fonction f sur l\'intervalle [0;600].\nf(x) = 1600 - x²/4 + x/124\n\nUne primitive F de f définie par:\nF(x) = 1600x - x³/12 + x²/248\n\n2. Déterminons l\'aire de la partie limitée par la courbe et les droites d\'équation x = 0 et x = 600\n\nA = ∫₀⁶⁰⁰ f(x) dx u.a\n= [F(600) - F(0)] u.a\n= [74400 - 0]\n= 74400 u.a\n\nL\'aire du terrain est 74400 × 1600 soit 119 040 000 m²',
      conclusion: 'L\'aire du terrain est 119 040 000 m².',
      calculations: [
        {
          step: 'Primitive de f(x)',
          calculation: '∫(1600 - x²/4 + x/124)dx',
          result: 'F(x) = 1600x - x³/12 + x²/248'
        },
        {
          step: 'Calcul de F(600)',
          calculation: 'F(600) = 1600×600 - 600³/12 + 600²/248',
          result: 'F(600) = 74400'
        },
        {
          step: 'Intégrale définie',
          calculation: '∫₀⁶⁰⁰ f(x) dx = F(600) - F(0)',
          result: '74400 unités d\'aire'
        },
        {
          step: 'Aire réelle du terrain',
          calculation: '74400 × 1600 m²',
          result: '119 040 000 m²'
        }
      ]
    }
  },

  // Leçon 11: STATISTIQUE À DEUX VARIABLES
  {
    lessonId: 11,
    situation: {
      id: 'sc-11-statistiques-entreprise',
      lessonIds: [11],
      title: 'Analyse des facteurs influençant le chiffre d\'affaires',
      context: 'Des élèves en classe de Terminale dans un lycée, après leur formation sur l\'entrepreneuriat, ont reçu un financement d\'une ONG pour mener des activités.',
      supports: [
        {
          type: 'text',
          content: 'Ils ont mis en place une petite entreprise de distribution de cahiers dans la région. Après quelques années d\'activités, ils cherchent à déterminer lequel des facteurs N (nombre de points de vente à installer) ou X (frais de la promotion) a influencé le plus leur chiffre d\'affaires Y. Données : 2013: N=10, X=1, Y=37,5 ; 2014: N=20, X=1,7, Y=61,5 ; 2015: N=40, X=1,9, Y=97,5 ; 2016: N=70, X=2, Y=180 ; 2017: N=100, X=2,5, Y=270,4'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'Détermine la variable qui influence le chiffre d\'affaires.',
          solution: {
            introduction: 'Pour déterminer la variable la plus influente, je vais utiliser les statistiques à deux variables',
            steps: [
              'Calculer le coefficient de corrélation r₁ entre N et Y',
              'Calculer le coefficient de corrélation r₂ entre X et Y',
              'Comparer |r₁| et |r₂| pour déterminer la variable la plus influente'
            ],
            conclusion: 'Le nombre de points de vente influence plus que les frais publicitaires'
          }
        }
      ],
      finalConclusion: 'Le nombre de points de vente influence plus que les frais publicitaires en millions de francs CFA.'
    },
    officialSolution: {
      introduction: 'Pour répondre au problème posé, je vais utiliser les statistiques à deux variables.',
      development: '1. Déterminons le coefficient de corrélation r₁ entre N et Y :\n\nN̄ = (10 + 20 + 40 + 70 + 100)/5 = 48\nȲ = (37,5 + 61,5 + 97,5 + 180 + 270,4)/5 = 129,4\n\nV(N) = (10² + 20² + 40² + 70² + 100²)/5 - 48² = 1096\nV(Y) = (37,5² + 61,5² + 97,5² + 180² + 270,4²)/5 - 129,4² = 7302,9976\n\nCov(N,Y) = (10×37,5 + 20×61,5 + 40×97,5 + 70×180 + 100×270,4)/5 - 48×129,4 = 2819,76\n\nr₁ = Cov(N,Y)/√[V(N)×V(Y)] = 2819,76/√[1096×7302,9976] = 0,99\n\n2. Déterminons le coefficient de corrélation r₂ entre X et Y :\n\nX̄ = (1 + 1,7 + 1,9 + 2 + 2,5)/5 = 1,82\nV(X) = (1² + 1,7² + 1,9² + 2² + 2,5²)/5 - 1,82² = 0,2376\n\nCov(X,Y) = (1×37,5 + 1,7×61,5 + 1,9×97,5 + 2×180 + 2,5×270,4)/5 - 1,82×129,4 = 37,1884\n\nr₂ = Cov(X,Y)/√[V(X)×V(Y)] = 0,89\n\n3. 0,87 ≤ |r₂| < |r₁| < 1',
      conclusion: 'D\'où le nombre de points de vente influence plus que les frais publicitaires en millions de francs CFA.',
      calculations: [
        {
          step: 'Moyennes et variances (N,Y)',
          calculation: 'N̄ = 48, Ȳ = 129,4, V(N) = 1096, V(Y) = 7302,9976',
          result: 'Paramètres statistiques calculés'
        },
        {
          step: 'Covariance Cov(N,Y)',
          calculation: 'Σ(nᵢyᵢ)/5 - N̄×Ȳ',
          result: 'Cov(N,Y) = 2819,76'
        },
        {
          step: 'Coefficient r₁',
          calculation: 'r₁ = 2819,76/√[1096×7302,9976]',
          result: 'r₁ = 0,99'
        },
        {
          step: 'Coefficient r₂',
          calculation: 'r₂ = Cov(X,Y)/√[V(X)×V(Y)]',
          result: 'r₂ = 0,89'
        }
      ]
    }
  },

  // Leçon 12: ÉQUATIONS DIFFÉRENTIELLES
  {
    lessonId: 12,
    situation: {
      id: 'sc-12-equations-differentielles-singes',
      lessonIds: [12],
      title: 'Évolution d\'une population de singes',
      context: 'En regardant un documentaire à la télévision, un élève en classe de Terminale D a appris des informations sur l\'évolution d\'une population de singes.',
      supports: [
        {
          type: 'text',
          content: 'Dans une forêt africaine, la population de singes était de 512 en l\'an 2000 et de 256 en 2016. La vitesse de diminution de cette population est, à chaque instant, proportionnelle à cette population. Le chef de classe affirme qu\'il ne devrait plus avoir de singes dans cette forêt après l\'an 2030.'
        }
      ],
      tasks: [
        {
          id: 1,
          consigne: 'En utilisant tes connaissances mathématiques au programme, confirme ou infirme l\'affirmation du chef de classe.',
          solution: {
            introduction: 'Pour vérifier l\'affirmation, je vais utiliser les équations différentielles',
            steps: [
              'Modéliser l\'évolution par une équation différentielle p\'(t) = ap(t)',
              'Déterminer les constantes à partir des données de 2000 et 2016',
              'Calculer la population en 2030'
            ],
            conclusion: 'En l\'an 2030 il y aura encore environ 139 singes, l\'affirmation est fausse'
          }
        }
      ],
      finalConclusion: 'L\'affirmation du chef de classe n\'est pas juste.'
    },
    officialSolution: {
      introduction: 'Pour vérifier l\'affirmation, je vais utiliser les équations différentielles.',
      development: '1. La vitesse de diminution de la population est p\'(t), comme elle est à chaque instant proportionnelle à cette population, on a :\np\'(t) = ap(t) avec a ∈ ℝ\n\nOn a alors p(t) = ke^(at), avec k ∈ ℝ\nAinsi : p(0) = 512 ⟹ k = 512\nDonc p(t) = 512e^(at)\n\nOn a : p(16) = 256 ⟹ 512e^(16a) = 256\n⟹ e^(16a) = 0,5\n⟹ 16a = ln(0,5)\n⟹ a = (1/16)ln(1/2)\n\nDonc, p(t) = 512e^((1/16)ln(1/2)t)\n\n2. En l\'an 2030, on a : t = 30\nOn a : p(30) = 512e^((1/16)ln(1/2)×30) ≈ 139,6\n\nEn l\'an 2030 il y aura encore environ 139 singes.',
      conclusion: 'L\'affirmation du chef de classe n\'est pas juste.',
      calculations: [
        {
          step: 'Équation différentielle',
          calculation: 'p\'(t) = ap(t) avec solution p(t) = ke^(at)',
          result: 'Modèle exponentiel de décroissance'
        },
        {
          step: 'Condition initiale',
          calculation: 'p(0) = 512 ⟹ k = 512',
          result: 'p(t) = 512e^(at)'
        },
        {
          step: 'Détermination de a',
          calculation: 'p(16) = 256 ⟹ e^(16a) = 0,5',
          result: 'a = (1/16)ln(1/2)'
        },
        {
          step: 'Population en 2030',
          calculation: 'p(30) = 512e^((30/16)ln(1/2))',
          result: '≈ 139,6 singes'
        }
      ]
    }
  }
];

export const getExampleByLessonId = (lessonId: number): EnrichedExampleSolution[] => {
  return ENRICHED_EXAMPLES.filter(example => example.lessonId === lessonId);
};

export const getAllExampleSolutions = (): string => {
  return ENRICHED_EXAMPLES.map(example => 
    `Leçon ${example.lessonId}: ${example.situation.title}\n` +
    `Contexte: ${example.situation.context}\n` +
    `Solution officielle:\n${example.officialSolution.introduction}\n` +
    `${example.officialSolution.development}\n` +
    `${example.officialSolution.conclusion}\n\n`
  ).join('---\n\n');
};