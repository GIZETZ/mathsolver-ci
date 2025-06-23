// Script de test pour vérifier la détection des 12 leçons par l'IA

const testProblems = [
  {
    id: 1,
    expectedLesson: "Limites et continuité",
    problem: "Calculer la limite de (x²-4)/(x-2) quand x tend vers 2"
  },
  {
    id: 2,
    expectedLesson: "Probabilités",
    problem: "Dans une urne contenant 5 boules rouges et 3 boules bleues, quelle est la probabilité de tirer une boule rouge?"
  },
  {
    id: 3,
    expectedLesson: "Dérivabilité et Étude de Fonctions",
    problem: "Calculer la dérivée de f(x) = x³ + 2x² - 5x + 1 et étudier ses variations"
  },
  {
    id: 4,
    expectedLesson: "Primitives",
    problem: "Trouver une primitive de f(x) = 3x² + 2x - 1"
  },
  {
    id: 5,
    expectedLesson: "Fonctions Logarithmes",
    problem: "Simplifier ln(e²) + ln(1/e) et résoudre ln(2x-1) = ln(3)"
  },
  {
    id: 6,
    expectedLesson: "Nombres Complexes (Partie 1 : Forme Algébrique)",
    problem: "Mettre Z = (2-i)/(3+2i) sous forme algébrique et calculer son conjugué"
  },
  {
    id: 7,
    expectedLesson: "Fonctions Exponentielles",
    problem: "Résoudre l'équation e^(2x) - 3e^x + 2 = 0"
  },
  {
    id: 8,
    expectedLesson: "Nombres Complexes et Géométrie",
    problem: "Déterminer le module et un argument de z = 1 + i√3"
  },
  {
    id: 9,
    expectedLesson: "Suites Numériques",
    problem: "Démontrer par récurrence que pour tout n≥1, 1+2+3+...+n = n(n+1)/2"
  },
  {
    id: 10,
    expectedLesson: "Calcul Intégral",
    problem: "Calculer l'intégrale de 0 à 1 de f(x) = x²"
  },
  {
    id: 11,
    expectedLesson: "Statistique à Deux Variables",
    problem: "Ajuster par la droite des moindres carrés les points (1,2), (2,3), (3,5), (4,6)"
  },
  {
    id: 12,
    expectedLesson: "Équations Différentielles",
    problem: "Résoudre l'équation différentielle y' + 2y = 0 avec y(0) = 3"
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
    
    const isCorrect = detectedLesson.toLowerCase().includes(testCase.expectedLesson.toLowerCase()) || 
                     testCase.expectedLesson.toLowerCase().includes(detectedLesson.toLowerCase());
    
    return {
      id: testCase.id,
      expected: testCase.expectedLesson,
      detected: detectedLesson,
      correct: isCorrect,
      problem: testCase.problem
    };
  } catch (error) {
    return {
      id: testCase.id,
      expected: testCase.expectedLesson,
      detected: 'ERROR: ' + error.message,
      correct: false,
      problem: testCase.problem
    };
  }
}

async function runAllTests() {
  console.log('🧪 Test de détection des 12 leçons du programme Terminale D\n');
  
  const results = [];
  let correctCount = 0;
  
  for (const testCase of testProblems) {
    console.log(`Test ${testCase.id}/12: ${testCase.expectedLesson}...`);
    const result = await testLesson(testCase);
    results.push(result);
    
    if (result.correct) {
      correctCount++;
      console.log(`✅ CORRECT: ${result.detected}`);
    } else {
      console.log(`❌ INCORRECT: Attendu "${result.expected}", obtenu "${result.detected}"`);
    }
    
    // Pause entre les tests pour éviter la surcharge
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 RÉSULTATS FINAUX:');
  console.log(`Succès: ${correctCount}/${testProblems.length} (${Math.round(correctCount/testProblems.length*100)}%)`);
  
  if (correctCount < testProblems.length) {
    console.log('\n❌ ÉCHECS DÉTAILLÉS:');
    results.filter(r => !r.correct).forEach(r => {
      console.log(`- Leçon ${r.id}: "${r.problem}"`);
      console.log(`  Attendu: ${r.expected}`);
      console.log(`  Obtenu: ${r.detected}\n`);
    });
  }
  
  return results;
}

// Exécuter les tests
runAllTests().catch(console.error);