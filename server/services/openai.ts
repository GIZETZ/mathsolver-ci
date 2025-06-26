
import OpenAI from "openai";
import { TERMINALE_D_CURRICULUM, METHODOLOGY_UEMOA } from "../data/curriculum";
import { EXERCISE_EXAMPLES } from "../data/examples";
import { COMPLEX_SITUATIONS } from "../data/situations";
import { getAllExampleSolutions as getEnrichedExamples, getExampleByLessonId } from "../data/examples-enriched";
import { identifyLessonFromText, getToolsForLesson } from "../data/lesson-keywords";

// Configuration multi-clés API OpenRouter avec rôles spécialisés
const API_KEYS = [
  process.env.OPENAI_API_KEY,
  process.env.OPENAI_API_KEY_2,
  process.env.OPENAI_API_KEY_3,
  process.env.OPENAI_API_KEY_4
].filter(key => key && key.trim() !== '');

if (API_KEYS.length < 4) {
  console.warn(`⚠️ Seulement ${API_KEYS.length}/4 clés API configurées. Système multi-IA incomplet.`);
} else {
  console.log(`✅ ${API_KEYS.length} clés API configurées - Système multi-IA activé`);
}

// Cache pour les analyses répétitives
const lessonCache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Système de performance monitoring
interface PerformanceMetrics {
  startTime: number;
  ai1Time?: number;
  ai2Time?: number;
  ai3Time?: number;
  totalTime?: number;
  cacheHit?: boolean;
}

// Mode rapide pour les exercices simples
const FAST_MODE_KEYWORDS = [
  'équation simple', 'calcul direct', 'application directe',
  'définition', 'formule basique', 'x =', 'résoudre'
];

// Rôles spécialisés des IA
const AI_ROLES = {
  SOLVER: 0,      // API 1 - Résolution initiale
  VALIDATOR: 1,   // API 2 - Validation de la leçon
  CORRECTOR: 2,   // API 3 - Correction des erreurs
  ASSISTANT: 3    // API 4 - Chat utilisateur (5 requêtes/jour)
};

// Stockage des limites d'usage pour l'API 4 (Chat)
const chatUsage = new Map<string, { count: number, lastReset: string }>();
const DAILY_CHAT_LIMIT = 5;

// Fonction pour créer un client OpenAI avec une clé spécifique
function createOpenAIClient(apiKey: string): OpenAI {
  return new OpenAI({ 
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://mathsolver-ci.onrender.com",
      "X-Title": "MathSolver CI Multi-IA"
    }
  });
}

// Fonction pour vérifier et gérer la limite de chat
function checkChatLimit(userId: string = 'anonymous'): boolean {
  const today = new Date().toDateString();
  const userUsage = chatUsage.get(userId);
  
  if (!userUsage || userUsage.lastReset !== today) {
    chatUsage.set(userId, { count: 0, lastReset: today });
    return true;
  }
  
  return userUsage.count < DAILY_CHAT_LIMIT;
}

function incrementChatUsage(userId: string = 'anonymous'): void {
  const today = new Date().toDateString();
  const userUsage = chatUsage.get(userId) || { count: 0, lastReset: today };
  userUsage.count++;
  chatUsage.set(userId, userUsage);
}

export interface SituationAnalysis {
  lessonDetected: string;
  toolsSuggested: string[];
  difficultyLevel: string;
  context: string;
  keyElements: string[];
  confidence: number;
  validationAttempts?: number;
}

export interface SolutionStructure {
  introduction: string;
  development: string;
  conclusion: string;
  toolsUsed: string[];
  steps: string[];
  isComplexSituation?: boolean;
  tasks?: Array<{
    id: number;
    consigne: string;
    solution: {
      introduction: string;
      steps: string[];
      conclusion: string;
    };
  }>;
  finalConclusion?: string;
  completeSolution?: string;
  calculations?: Array<{
    step: string;
    calculation: string;
    result: string;
  }>;
  validationResult?: {
    lessonCorrect: boolean;
    correctionsMade: boolean;
    qualityScore: number;
  };
  processingMode?: 'fast' | 'complete';
  fromCache?: boolean;
  performanceMetrics?: {
    startTime: number;
    ai1Time?: number;
    ai2Time?: number;
    ai3Time?: number;
    totalTime?: number;
    cacheHit?: boolean;
  };
}

export interface EvaluationCriteria {
  cm1Pertinence: number;
  cm2OutilsMath: number;
  cm3Coherence: number;
  cpPerfectionnement: number;
  totalScore: number;
  feedback: string[];
}

export interface ChatResponse {
  response: string;
  remainingQuestions: number;
  limitReached: boolean;
}

export class MathResolver {
  private model = "openai/gpt-4o-mini";

  // IA 1 - Résolution initiale du problème
  private async solveWithAI1(situationText: string, analysis: SituationAnalysis): Promise<SolutionStructure> {
    const client = createOpenAIClient(API_KEYS[AI_ROLES.SOLVER]);
    console.log('🤖 IA-1 (Solver): Résolution du problème...');

    const detectedLesson = identifyLessonFromText(situationText);
    const curriculum = TERMINALE_D_CURRICULUM.find(l => l.id === detectedLesson.lessonId);
    const perfectExamples = getExampleByLessonId(detectedLesson.lessonId);

    const prompt = `
Tu es l'IA-1 SOLVER spécialisée dans la résolution initiale d'exercices mathématiques Terminale D Côte d'Ivoire.

CONTRAINTES STRICTES:
- Respecte EXACTEMENT la méthodologie UEMOA
- Utilise UNIQUEMENT les notions du programme Terminale D
- Structure: Introduction/Développement/Conclusion

LEÇON IDENTIFIÉE: ${analysis.lessonDetected}
OUTILS AUTORISÉS: ${analysis.toolsSuggested.join(', ')}

EXERCICE À RÉSOUDRE:
${situationText}

EXEMPLES DE RÉFÉRENCE:
${perfectExamples.map(ex => `
Exemple: ${ex.situation.title}
Introduction: ${ex.officialSolution.introduction}
Développement: ${ex.officialSolution.development}
Conclusion: ${ex.officialSolution.conclusion}
`).join('\n')}

Réponds en JSON avec cette structure:
{
  "introduction": "Pour répondre au problème qui est posé, je vais utiliser ${analysis.lessonDetected} plus précisément ${analysis.toolsSuggested.join(' et ')}.",
  "development": "Développement structuré avec calculs détaillés",
  "conclusion": "Conclusion finale avec résultat",
  "toolsUsed": ["outil1", "outil2"],
  "steps": ["étape1", "étape2", "étape3"],
  "calculations": [
    {
      "step": "Description étape",
      "calculation": "Calcul effectué",
      "result": "Résultat obtenu"
    }
  ],
  "completeSolution": "Solution complète unifiée"
}
`;

    const response = await client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 4000,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  // IA 2 - Validation de la leçon choisie
  private async validateWithAI2(situationText: string, solution: SolutionStructure, analysis: SituationAnalysis): Promise<{ isValid: boolean, feedback: string, suggestedLesson?: string }> {
    const client = createOpenAIClient(API_KEYS[AI_ROLES.VALIDATOR]);
    console.log('🔍 IA-2 (Validator): Validation de la leçon...');

    const prompt = `
Tu es l'IA-2 VALIDATOR spécialisée dans la validation du choix de leçon pour les exercices de Terminale D.

PROGRAMME TERMINALE D AUTORISÉ:
${TERMINALE_D_CURRICULUM.map(lesson => `${lesson.id}. ${lesson.name}: ${lesson.notions.join(', ')}`).join('\n')}

EXERCICE ORIGINAL:
${situationText}

LEÇON CHOISIE PAR IA-1: ${analysis.lessonDetected}
SOLUTION PROPOSÉE:
${solution.completeSolution}
OUTILS UTILISÉS: ${solution.toolsUsed.join(', ')}

MISSION: Valide si la leçon choisie est EXACTEMENT appropriée pour cet exercice.

Critères de validation:
1. Les notions utilisées correspondent-elles à la leçon?
2. Existe-t-il une leçon plus appropriée?
3. Le niveau est-il correct pour Terminale D?

Réponds en JSON:
{
  "isValid": true/false,
  "feedback": "Explication détaillée de votre évaluation",
  "suggestedLesson": "Nom de la leçon correcte si différente",
  "confidence": 0.85
}
`;

    const response = await client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 1500,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  // IA 3 - Correction des erreurs de logique et calculs
  private async correctWithAI3(situationText: string, solution: SolutionStructure): Promise<SolutionStructure> {
    const client = createOpenAIClient(API_KEYS[AI_ROLES.CORRECTOR]);
    console.log('🔧 IA-3 (Corrector): Correction des erreurs...');

    const prompt = `
Tu es l'IA-3 CORRECTOR spécialisée dans la détection et correction d'erreurs dans les solutions mathématiques.

EXERCICE:
${situationText}

SOLUTION À CORRIGER:
Introduction: ${solution.introduction}
Développement: ${solution.development}
Conclusion: ${solution.conclusion}

CALCULS À VÉRIFIER:
${solution.calculations?.map(calc => `${calc.step}: ${calc.calculation} = ${calc.result}`).join('\n') || 'Aucun calcul détaillé'}

MISSION: 
1. Vérifie TOUS les calculs mathématiques
2. Corrige les erreurs de logique
3. Améliore la clarté des explications
4. Assure la cohérence méthodologique UEMOA

Réponds en JSON avec la solution corrigée:
{
  "introduction": "Introduction corrigée si nécessaire",
  "development": "Développement avec corrections appliquées",
  "conclusion": "Conclusion corrigée",
  "toolsUsed": ["outils corrects"],
  "steps": ["étapes corrigées"],
  "calculations": [
    {
      "step": "Étape corrigée",
      "calculation": "Calcul vérifié et correct",
      "result": "Résultat exact"
    }
  ],
  "completeSolution": "Solution finale corrigée et optimisée",
  "correctionsMade": true/false,
  "errorsFound": ["liste des erreurs corrigées"]
}
`;

    const response = await client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 4000,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  }

  // IA 4 - Assistant de chat (limité à 5 requêtes/jour)
  async chatWithAI4(userQuestion: string, userId: string = 'anonymous'): Promise<ChatResponse> {
    if (!checkChatLimit(userId)) {
      return {
        response: "Vous avez atteint votre limite quotidienne de 5 questions. Revenez demain !",
        remainingQuestions: 0,
        limitReached: true
      };
    }

    const client = createOpenAIClient(API_KEYS[AI_ROLES.ASSISTANT]);
    console.log('💬 IA-4 (Assistant): Réponse au chat utilisateur...');

    const prompt = `
Tu es l'IA-4 ASSISTANT, un tuteur mathématique pour élèves de Terminale D en Côte d'Ivoire.

CONTRAINTES:
- Réponds UNIQUEMENT aux questions sur les mathématiques Terminale D
- Sois pédagogique et encourageant
- Limite tes réponses à 200 mots maximum
- Si la question n'est pas liée aux maths, redirige vers les mathématiques

PROGRAMME AUTORISÉ: Limites, Probabilités, Dérivabilité, Primitives, Logarithmes, Nombres complexes, Fonctions exponentielles, Suites, Calcul intégral, Statistiques, Équations différentielles, Géométrie dans l'espace.

QUESTION DE L'UTILISATEUR:
${userQuestion}

Réponds de manière claire et pédagogique en français.
`;

    const response = await client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    incrementChatUsage(userId);
    const currentUsage = chatUsage.get(userId);
    const remaining = DAILY_CHAT_LIMIT - (currentUsage?.count || 0);

    return {
      response: response.choices[0].message.content || "Désolé, je n'ai pas pu traiter votre question.",
      remainingQuestions: remaining,
      limitReached: false
    };
  }

  // Système principal avec optimisations de performance
  async generateSolution(situationText: string, analysis: SituationAnalysis): Promise<SolutionStructure> {
    const metrics: PerformanceMetrics = { startTime: Date.now() };
    
    // Cache check
    const cacheKey = `${situationText.substring(0, 100)}_${analysis.lessonDetected}`;
    const cached = lessonCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      console.log('⚡ Solution trouvée en cache - Temps: <100ms');
      metrics.cacheHit = true;
      return { ...cached.solution, fromCache: true };
    }

    // Mode rapide pour exercices simples
    const isFastMode = FAST_MODE_KEYWORDS.some(keyword => 
      situationText.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isFastMode && API_KEYS.length >= 2) {
      console.log('⚡ Mode rapide activé - Traitement simplifié...');
      return await this.generateFastSolution(situationText, analysis, metrics);
    }

    // Mode complet multi-IA
    console.log('🚀 Mode complet multi-IA activé...');
    return await this.generateCompleteSolution(situationText, analysis, metrics);
  }

  // Mode rapide (IA-1 + IA-3 seulement)
  private async generateFastSolution(
    situationText: string, 
    analysis: SituationAnalysis, 
    metrics: PerformanceMetrics
  ): Promise<SolutionStructure> {
    // IA-1: Résolution
    const ai1Start = Date.now();
    const solution = await this.solveWithAI1(situationText, analysis);
    metrics.ai1Time = Date.now() - ai1Start;

    // IA-3: Correction rapide
    const ai3Start = Date.now();
    const finalSolution = await this.correctWithAI3(situationText, solution);
    metrics.ai3Time = Date.now() - ai3Start;

    metrics.totalTime = Date.now() - metrics.startTime;
    console.log(`⚡ Mode rapide terminé en ${metrics.totalTime}ms`);

    // Cache la solution
    const cacheKey = `${situationText.substring(0, 100)}_${analysis.lessonDetected}`;
    lessonCache.set(cacheKey, {
      solution: finalSolution,
      timestamp: Date.now()
    });

    finalSolution.processingMode = 'fast';
    return finalSolution;
  }

  // Mode complet (toutes les IA)
  private async generateCompleteSolution(
    situationText: string, 
    analysis: SituationAnalysis, 
    metrics: PerformanceMetrics
  ): Promise<SolutionStructure> {
    let attempts = 0;
    const maxAttempts = 3;
    let finalSolution: SolutionStructure;

    do {
      attempts++;
      console.log(`\n--- Tentative ${attempts}/${maxAttempts} ---`);

      // IA-1: Résolution initiale
      const ai1Start = Date.now();
      finalSolution = await this.solveWithAI1(situationText, analysis);
      metrics.ai1Time = Date.now() - ai1Start;

      // IA-2: Validation de la leçon
      const ai2Start = Date.now();
      const validation = await this.validateWithAI2(situationText, finalSolution, analysis);
      metrics.ai2Time = Date.now() - ai2Start;
      
      console.log(`✅ IA-2 Validation: ${validation.isValid ? 'APPROUVÉE' : 'REJETÉE'}`);

      if (validation.isValid) {
        console.log('✅ Leçon validée, passage à la correction...');
        break;
      } else if (validation.suggestedLesson && attempts < maxAttempts) {
        console.log(`🔄 Nouvelle leçon suggérée: ${validation.suggestedLesson}`);
        analysis.lessonDetected = validation.suggestedLesson;
        analysis.toolsSuggested = getToolsForLesson(validation.suggestedLesson);
      }

    } while (attempts < maxAttempts);

    // IA-3: Correction finale
    const ai3Start = Date.now();
    finalSolution = await this.correctWithAI3(situationText, finalSolution);
    metrics.ai3Time = Date.now() - ai3Start;

    metrics.totalTime = Date.now() - metrics.startTime;
    console.log(`🎉 Mode complet terminé en ${metrics.totalTime}ms`);

    // Cache la solution
    const cacheKey = `${situationText.substring(0, 100)}_${analysis.lessonDetected}`;
    lessonCache.set(cacheKey, {
      solution: finalSolution,
      timestamp: Date.now()
    });

    finalSolution.validationResult = {
      lessonCorrect: attempts <= maxAttempts,
      correctionsMade: true,
      qualityScore: Math.max(0.7, 1 - (attempts - 1) * 0.15)
    };

    finalSolution.processingMode = 'complete';
    finalSolution.performanceMetrics = metrics;
    return finalSolution;
  }

  // Méthodes héritées (simplifiées pour utiliser le nouveau système)
  async analyzeSituation(situationText: string): Promise<SituationAnalysis> {
    const identifiedLesson = identifyLessonFromText(situationText);
    const tools = getToolsForLesson(identifiedLesson.lessonName);
    
    return {
      lessonDetected: identifiedLesson.lessonName,
      toolsSuggested: tools,
      difficultyLevel: "moyen",
      context: this.extractContext(situationText, identifiedLesson),
      keyElements: this.extractKeyElements(situationText, identifiedLesson),
      confidence: identifiedLesson.confidence || 0.8
    };
  }

  private extractContext(text: string, lesson: any): string {
    const contextMap: Record<string, string> = {
      "Limites et continuité": "Problème d'optimisation à long terme",
      "Probabilité": "Analyse de probabilités et événements",
      "Dérivabilité et étude de fonctions": "Problème d'optimisation",
      "Primitives": "Recherche de fonction primitive",
      "Fonctions logarithmes": "Modélisation logarithmique",
      "Nombres complexes": "Géométrie dans le plan complexe",
      "Fonctions exponentielles et fonctions puissances": "Modélisation exponentielle",
      "Suites numériques": "Évolution par récurrence",
      "Calcul intégral": "Calcul d'aires et moyennes",
      "Statistique à deux variables": "Analyse de corrélation",
      "Équations différentielles": "Évolution continue"
    };
    return contextMap[lesson.lessonName] || "Problème mathématique";
  }

  private extractKeyElements(text: string, lesson: any): string[] {
    return lesson.keywords.slice(0, 3);
  }

  async extractTextFromImage(imageBase64: string, language: string = 'french'): Promise<string> {
    // Utilise l'IA-1 pour l'OCR
    const client = createOpenAIClient(API_KEYS[AI_ROLES.SOLVER]);
    
    try {
      if (!imageBase64 || !imageBase64.startsWith('data:image/')) {
        throw new Error('Format d\'image invalide. Utilisez une image en base64 valide.');
      }

      if (imageBase64.length < 100) {
        throw new Error('Données d\'image trop courtes. Veuillez fournir une image valide.');
      }

      const response = await client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Extrait le texte exact de cette image d'exercice de mathématiques en ${language}. Conserve la mise en forme et les formules mathématiques. Réponds uniquement avec le texte extrait, sans commentaires additionnels.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.1
      });

      const extractedText = response.choices[0]?.message?.content || '';
      
      if (!extractedText.trim()) {
        throw new Error('Aucun texte détecté dans l\'image. Assurez-vous que l\'image contient du texte lisible.');
      }

      return extractedText;
    } catch (error: any) {
      console.error('Error extracting text from image:', error);
      
      if (error?.status === 400) {
        throw new Error('Image invalide ou corrompue. Veuillez utiliser une image claire et lisible.');
      } else if (error?.status === 401 || error?.status === 403) {
        throw new Error('Erreur d\'authentification API. Veuillez vérifier la configuration.');
      } else if (error?.status === 429) {
        throw new Error('Trop de requêtes. Veuillez réessayer dans quelques instants.');
      } else if (error?.message?.includes('Format d\'image invalide') || error?.message?.includes('Données d\'image trop courtes')) {
        throw error;
      } else {
        throw new Error('Erreur lors de l\'extraction du texte. Veuillez réessayer avec une image différente.');
      }
    }
  }

  async evaluateSolution(
    situationText: string,
    solution: SolutionStructure
  ): Promise<EvaluationCriteria> {
    // Utilise l'IA-3 pour l'évaluation
    const client = createOpenAIClient(API_KEYS[AI_ROLES.CORRECTOR]);
    
    const prompt = `
Tu es un évaluateur expert des solutions mathématiques selon les critères UEMOA pour la Terminale D en Côte d'Ivoire.

Évalue la solution suivante selon les critères officiels :

Situation : ${situationText}

Solution proposée :
- Introduction : ${solution.introduction}
- Développement : ${solution.development}
- Conclusion : ${solution.conclusion}
- Outils utilisés : ${solution.toolsUsed.join(", ")}

Critères d'évaluation UEMOA :
1. CM1 - Pertinence (0,75 points max) : Pertinence de la méthode et des outils choisis
2. CM2 - Utilisation correcte des outils mathématiques (2,5 points max) : Exactitude des calculs et formules
3. CM3 - Cohérence de la réponse (1,25 points max) : Logique du raisonnement et lien entre les étapes
4. CP - Critère de perfectionnement (0,5 points max) : Qualité de la présentation et clarté

Réponds en JSON avec cette structure :
{
  "cm1Pertinence": 0.75,
  "cm2OutilsMath": 2.3,
  "cm3Coherence": 1.1,
  "cpPerfectionnement": 0.4,
  "totalScore": 4.55,
  "feedback": ["commentaire1", "commentaire2", "suggestion d'amélioration"]
}
`;

    try {
      const response = await client.chat.completions.create({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      result.totalScore = 
        (result.cm1Pertinence || 0) + 
        (result.cm2OutilsMath || 0) + 
        (result.cm3Coherence || 0) + 
        (result.cpPerfectionnement || 0);

      return result as EvaluationCriteria;
    } catch (error) {
      console.error("Error evaluating solution:", error);
      throw new Error("Failed to evaluate mathematical solution");
    }
  }
}

export const mathResolver = new MathResolver();
