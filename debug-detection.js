// Script de debug pour tester la détection des leçons
const { identifyLessonFromText } = require('./server/data/lesson-keywords.ts');

const testCases = [
  "Mettre Z = (2-i)/(3+2i) sous forme algébrique et calculer son conjugué",
  "Déterminer le module et un argument de z = 1 + i√3",
  "Résoudre dans C l'équation z² - 2z + 5 = 0",
  "Calculer la partie réelle et imaginaire de (1+2i)³"
];

console.log("Test de détection des nombres complexes:");
testCases.forEach((test, i) => {
  try {
    const result = identifyLessonFromText(test);
    console.log(`\nTest ${i+1}: "${test}"`);
    console.log(`Leçon détectée: ${result.lessonName}`);
  } catch (error) {
    console.log(`\nTest ${i+1}: ERREUR - ${error.message}`);
  }
});