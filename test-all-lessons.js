// Test complet de détection des 12 leçons du programme Terminale D

const testCases = [
  {
    id: 1,
    expectedLesson: "Limites et continuité",
    problem: "La maman d'un élève désire une relance publicitaire. Elle fait imprimer des dépliants qui lui coûtent 4000 FCFA en frais fixes plus 100 FCFA par dépliant. Déterminer le coût d'un dépliant par client pour une production de dépliants à long terme."
  },
  {
    id: 2,
    expectedLesson: "Probabilité",
    problem: "Dans une usine de microprocesseurs, 4% de la production est défectueuse. Le système de vérification détecte 95% des microprocesseurs défectueux et déclare défectueux 2% des microprocesseurs qui ne présentent aucun défaut. Déterminer la probabilité qu'il y ait erreur lors du contrôle."
  },
  {
    id: 3,
    expectedLesson: "Dérivabilité et étude de fonctions",
    problem: "M. Bolou a une feuille métallique rectangulaire de 12 cm de largeur et 2 m de longueur. Il veut la modeler pour en faire une gouttière en pliant les deux longs côtés. Proposer la hauteur des côtés relevés pour que la gouttière ait une contenance maximale."
  },
  {
    id: 4,
    expectedLesson: "Primitives",
    problem: "Un pâtissier commercialise des glaces. Pour x centaines de glaces produites, B'(x) = -20x + 30 où B(x) est le bénéfice en milliers de francs. Pour une centaine de glaces vendue, son bénéfice est 20 mille francs. Déterminer son bénéfice maximal."
  },
  {
    id: 5,
    expectedLesson: "Fonctions logarithmes",
    problem: "Une modélisation mathématique permet d'établir f(x) = 1 - 8310ln(x) où f(x) est l'âge en années d'un fossile et x la fraction de carbone 14. Calculer l'âge d'un fossile qui contient encore 35% de son carbone 14."
  },
  {
    id: 6,
    expectedLesson: "Nombres Complexes (Partie 1 : Forme Algébrique)",
    problem: "Résoudre dans l'ensemble des nombres complexes C l'équation z² - 6z + 13 = 0"
  },
  {
    id: 7,
    expectedLesson: "Fonctions Exponentielles et Fonctions Puissances",
    problem: "La pharmacocinétique étudie l'évolution d'un médicament. Le modèle mathématique est f(t) = 20e^(-0,1t). La demi-vie du médicament est la durée après laquelle la concentration est égale à la moitié de la concentration initiale. Déterminer la demi-vie."
  },
  {
    id: 8,
    expectedLesson: "Nombres Complexes et Géométrie",
    problem: "Un mathématicien peintre précise que les sommets des triangles sont des points An d'affixe zn telle que z0 = 6 et pour tout entier naturel n, zn+1 = (4+i4)/3 × zn. Reproduire le dessin en utilisant les nombres complexes."
  },
  {
    id: 9,
    expectedLesson: "Suites numériques",
    problem: "Deux bassins d'eau A et B contiennent respectivement 800 m³ et 1400 m³. Chaque jour, 10% du volume d'eau du bassin A est transféré dans B, et 15% du volume de B est transféré dans A. Déterminer si le bassin A aura plus d'eau que B après un certain nombre de jours."
  },
  {
    id: 10,
    expectedLesson: "Calcul intégral",
    problem: "La capacité pulmonaire est modélisée par f(x) = 110(ln(x)-2)/x où x est l'âge. Justifier par le calcul intégral que la capacité pulmonaire moyenne entre 20 et 70 ans n'atteint pas 5 L."
  },
  {
    id: 11,
    expectedLesson: "Statistique à deux variables",
    problem: "Des élèves ont une entreprise de distribution. Ils cherchent à déterminer lequel des facteurs N (nombre de points de vente) ou X (frais de promotion) influence le plus leur chiffre d'affaires Y, avec les données sur 5 ans. Déterminer la variable qui influence le chiffre d'affaires."
  },
  {
    id: 12,
    expectedLesson: "Équations différentielles",
    problem: "Dans une forêt, la population de singes était de 512 en 2000 et de 256 en 2016. La vitesse de diminution est proportionnelle à la population. Le chef de classe affirme qu'il ne devrait plus y avoir de singes après 2030. Confirmer ou infirmer cette affirmation."
  }
];

async function testLesson(testCase) {
  try {
    const response = await fetch('http://localhost:5000/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: testCase.problem })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const detectedLesson = data.subject;
    
    // Comparaison flexible pour gérer les variations de noms
    const isCorrect = 
      detectedLesson.toLowerCase().includes(testCase.expectedLesson.toLowerCase()) || 
      testCase.expectedLesson.toLowerCase().includes(detectedLesson.toLowerCase().split(' ')[0]) ||
      (testCase.expectedLesson.includes("Probabilité") && detectedLesson.includes("Probabilité"));
    
    return {
      id: testCase.id,
      expected: testCase.expectedLesson,
      detected: detectedLesson,
      correct: isCorrect,
      problem: testCase.problem.substring(0, 60) + "..."
    };
  } catch (error) {
    return {
      id: testCase.id,
      expected: testCase.expectedLesson,
      detected: 'ERROR: ' + error.message,
      correct: false,
      problem: testCase.problem.substring(0, 60) + "..."
    };
  }
}

async function runAllTests() {
  console.log('🧪 Test complet de détection des 12 leçons - Programme Terminale D\n');
  
  const results = [];
  let correctCount = 0;
  
  for (const testCase of testCases) {
    console.log(`\nTest ${testCase.id}/12: ${testCase.expectedLesson}`);
    console.log(`Problème: ${testCase.problem.substring(0, 80)}...`);
    
    const result = await testLesson(testCase);
    results.push(result);
    
    if (result.correct) {
      correctCount++;
      console.log(`✅ CORRECT: ${result.detected}`);
    } else {
      console.log(`❌ INCORRECT:`);
      console.log(`   Attendu: ${result.expected}`);
      console.log(`   Obtenu:  ${result.detected}`);
    }
    
    // Pause entre les tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS FINAUX:');
  console.log('='.repeat(60));
  console.log(`Taux de réussite: ${correctCount}/${testCases.length} (${Math.round(correctCount/testCases.length*100)}%)\n`);
  
  if (correctCount === testCases.length) {
    console.log('🎉 PARFAIT! Toutes les leçons sont correctement détectées.');
  } else {
    console.log('❌ ÉCHECS DÉTAILLÉS:');
    results.filter(r => !r.correct).forEach(r => {
      console.log(`\n- Leçon ${r.id}: ${r.expected}`);
      console.log(`  Problème: ${r.problem}`);
      console.log(`  Détecté comme: ${r.detected}`);
    });
  }
  
  console.log('\n📈 RÉCAPITULATIF PAR DOMAINE:');
  const domaines = {
    'Analyse': [1, 3, 5, 7, 9, 10],
    'Algèbre': [4, 6, 8, 12],
    'Probabilités/Statistiques': [2, 11]
  };
  
  Object.entries(domaines).forEach(([domaine, lessonIds]) => {
    const domainResults = results.filter(r => lessonIds.includes(r.id));
    const domainSuccess = domainResults.filter(r => r.correct).length;
    console.log(`${domaine}: ${domainSuccess}/${domainResults.length} (${Math.round(domainSuccess/domainResults.length*100)}%)`);
  });
  
  return results;
}

// Exécuter les tests
runAllTests().catch(console.error);