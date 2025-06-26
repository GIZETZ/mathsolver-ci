import OpenAI from "openai";
import { TERMINALE_D_CURRICULUM, METHODOLOGY_UEMOA } from "../data/curriculum";
import { EXERCISE_EXAMPLES } from "../data/examples";
import { COMPLEX_SITUATIONS } from "../data/situations";
import { getAllExampleSolutions as getEnrichedExamples, getExampleByLessonId } from "../data/examples-enriched";
import { identifyLessonFromText, getToolsForLesson } from "../data/lesson-keywords";

// Configuration multi-clés API OpenRouter
const API_KEYS = [
  process.env.OPENAI_API_KEY,
  process.env.OPENAI_API_KEY_2,
  process.env.OPENAI_API_KEY_3,
  process.env.OPENAI_API_KEY_4
].filter(key => key && key.trim() !== '');

if (API_KEYS.length === 0) {
  console.error('ERREUR: Aucune clé API OpenRouter configurée');
  console.error('Configurez au moins OPENAI_API_KEY dans les variables d\'environnement');
}

console.log(`✅ ${API_KEYS.length} clé(s) API OpenRouter configurée(s)`);

// Index de rotation des clés
let currentKeyIndex = 0;

// Fonction pour obtenir la prochaine clé API
function getNextApiKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error('Aucune clé API disponible');
  }
  
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  
  console.log(`🔄 Utilisation de la clé API ${currentKeyIndex + 1}/${API_KEYS.length}`);
  return key;
}

// Fonction pour créer un client OpenAI avec une clé spécifique
function createOpenAIClient(apiKey: string): OpenAI {
  return new OpenAI({ 
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://mathsolver-ci.onrender.com",
      "X-Title": "MathSolver CI"
    }
  });
}

// Client OpenAI par défaut avec la première clé
const openai = createOpenAIClient(API_KEYS[0] || '');

export interface SituationAnalysis {
  lessonDetected: string;
  toolsSuggested: string[];
  difficultyLevel: string;
  context: string;
  keyElements: string[];
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
  completeSolution?: string; // Texte unifié complet
  calculations?: Array<{
    step: string;
    calculation: string;
    result: string;
  }>; // Calculs détaillés avec résultats
}

export interface EvaluationCriteria {
  cm1Pertinence: number;
  cm2OutilsMath: number;
  cm3Coherence: number;
  cpPerfectionnement: number;
  totalScore: number;
  feedback: string[];
}

export class MathResolver {
  // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
  private model = "openai/gpt-4o-mini";

  // Fonction pour exécuter une requête avec retry et rotation des clés
  private async executeWithRetry<T>(
    operation: (client: OpenAI) => Promise<T>,
    maxRetries: number = API_KEYS.length
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiKey = getNextApiKey();
        const client = createOpenAIClient(apiKey);
        
        console.log(`🚀 Tentative ${attempt + 1}/${maxRetries} avec clé API ${currentKeyIndex}/${API_KEYS.length}`);
        
        const result = await operation(client);
        
        if (attempt > 0) {
          console.log(`✅ Succès après ${attempt + 1} tentative(s)`);
        }
        
        return result;
      } catch (error: any) {
        lastError = error;
        console.warn(`⚠️ Échec tentative ${attempt + 1}: ${error.message}`);
        
        // Si c'est la dernière tentative, on lance l'erreur
        if (attempt === maxRetries - 1) {
          break;
        }
        
        // Attendre un peu avant la prochaine tentative
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
    
    console.error(`❌ Échec de toutes les tentatives après ${maxRetries} essais`);
    throw lastError || new Error('Toutes les clés API ont échoué');
  }

  async analyzeSituation(situationText: string): Promise<SituationAnalysis> {
    // Utiliser le système d'identification intelligent basé sur les mots-clés des exemples
    const identifiedLesson = identifyLessonFromText(situationText);
    const tools = getToolsForLesson(identifiedLesson.lessonName);
    

    
    return {
      lessonDetected: identifiedLesson.lessonName,
      toolsSuggested: tools,
      difficultyLevel: "moyen",
      context: this.extractContext(situationText, identifiedLesson),
      keyElements: this.extractKeyElements(situationText, identifiedLesson)
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
    // Extraire les éléments clés selon la leçon identifiée
    return lesson.keywords.slice(0, 3); // Prendre les 3 premiers mots-clés
  }

  async extractTextFromImage(imageBase64: string, language: string = 'french'): Promise<string> {
    try {
      // Validate image data format
      if (!imageBase64 || !imageBase64.startsWith('data:image/')) {
        throw new Error('Format d\'image invalide. Utilisez une image en base64 valide.');
      }

      // Check if image data is too small (likely invalid)
      if (imageBase64.length < 100) {
        throw new Error('Données d\'image trop courtes. Veuillez fournir une image valide.');
      }

      const response = await this.executeWithRetry(async (client) => {
        return await client.chat.completions.create({
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
      });

      const extractedText = response.choices[0]?.message?.content || '';
      
      if (!extractedText.trim()) {
        throw new Error('Aucun texte détecté dans l\'image. Assurez-vous que l\'image contient du texte lisible.');
      }

      return extractedText;
    } catch (error: any) {
      console.error('Error extracting text from image:', error);
      
      // Handle specific OpenAI/OpenRouter errors
      if (error?.status === 400) {
        throw new Error('Image invalide ou corrompue. Veuillez utiliser une image claire et lisible.');
      } else if (error?.status === 401 || error?.status === 403) {
        throw new Error('Erreur d\'authentification API. Veuillez vérifier la configuration.');
      } else if (error?.status === 429) {
        throw new Error('Trop de requêtes. Veuillez réessayer dans quelques instants.');
      } else if (error?.message?.includes('Format d\'image invalide') || error?.message?.includes('Données d\'image trop courtes')) {
        throw error; // Re-throw validation errors as-is
      } else {
        throw new Error('Erreur lors de l\'extraction du texte. Veuillez réessayer avec une image différente.');
      }
    }
  }

  async generateSolution(situationText: string, analysis: SituationAnalysis): Promise<SolutionStructure> {
    const detectedLesson = identifyLessonFromText(situationText);
    const curriculum = TERMINALE_D_CURRICULUM.find(l => l.id === detectedLesson.lessonId);
    
    if (!curriculum) {
      throw new Error(`Leçon non trouvée: ${detectedLesson.lessonId}`);
    }

    // Récupérer les exemples parfaits pour cette leçon spécifique
    const perfectExamples = getExampleByLessonId(detectedLesson.lessonId);
    
    // Vérifier si c'est une situation complexe multi-tâches
    const isComplexSituation = this.detectComplexSituation(situationText);
    
    if (isComplexSituation) {
      return this.generateComplexSolution(situationText, analysis, perfectExamples);
    } else {
      return this.generateSimpleSolution(situationText, analysis, perfectExamples);
    }
  }

  private detectComplexSituation(situationText: string): boolean {
    const complexIndicators = [
      /tâche \d+/i,
      /question \d+/i,
      /(\d+)\s*[\.\)]/g,
      /contexte|situation d'apprentissage/i,
      /justifier|calculer|déterminer|démontrer/gi
    ];
    
    let indicatorCount = 0;
    complexIndicators.forEach(pattern => {
      if (pattern.test(situationText)) {
        indicatorCount++;
      }
    });
    
    return indicatorCount >= 2 || situationText.length > 300;
  }

  private async generateComplexSolution(situationText: string, analysis: SituationAnalysis, perfectExamples: any[] = []): Promise<SolutionStructure> {
    const relevantSituations = COMPLEX_SITUATIONS.filter(sit => 
      sit.lessonIds.some(id => {
        const lesson = TERMINALE_D_CURRICULUM.find(l => l.id === id);
        return lesson?.name === analysis.lessonDetected;
      })
    );

    const situationExamples = relevantSituations.map(sit => 
      `Exemple: ${sit.title}\nContexte: ${sit.context}\nStructure: ${sit.tasks.length} tâches avec méthodologie APC`
    ).join('\n\n');

    const prompt = `
Tu es un expert en résolution de situations complexes mathématiques selon l'Approche Par Compétences (APC) pour la Terminale D en Côte d'Ivoire.

CONTRAINTES STRICTES:
- Respecte le format APC avec tâches décomposées
- Utilise les verbes d'action à la première personne ("Je calcule...", "Je détermine...", "Je justifie...")
- Structure par tâches distinctes avec introduction/étapes/conclusion pour chaque tâche
- Conclusion finale synthétique

PROGRAMME AUTORISÉ: ${analysis.lessonDetected} uniquement
EXEMPLES DE SITUATIONS COMPLEXES:
${situationExamples}

SITUATION À RÉSOUDRE:
${situationText}

STRUCTURE DE RÉPONSE OBLIGATOIRE:

1. INTRODUCTION (format imposé):
"Pour répondre au [problème qui est posé], je vais utiliser [la leçon concernée] plus précisément [les notions qui sont dans cette leçon]."

2. DÉVELOPPEMENT structuré avec connecteurs logiques:
- Premièrement, ...
- Deuxièmement, ...  
- Ensuite, ...
- Enfin, ...

3. CONCLUSION: Retour au problème posé

IMPORTANT: 
- EFFECTUE TOUS LES CALCULS et donne les résultats numériques exacts
- Utilise UNIQUEMENT les outils de la leçon identifiée
- Structure avec connecteurs logiques

Pour les situations complexes, décompose en tâches avec:
1. Introduction: "Pour accomplir cette tâche, je dois..."
2. Étapes: "Je calcule...", "Je détermine..." avec CALCULS RÉELS
3. Conclusion partielle avec RÉSULTATS NUMÉRIQUES

INSTRUCTIONS STRICTES:
1. LEÇON IDENTIFIÉE: ${analysis.lessonDetected}
2. OUTILS À UTILISER: ${analysis.toolsSuggested.join(', ')}
3. INTRODUCTION OBLIGATOIRE: "Pour répondre au problème qui est posé, je vais utiliser ${analysis.lessonDetected} plus précisément ${analysis.toolsSuggested.join(' et ')}."
4. UTILISE UNIQUEMENT les méthodes et notions de cette leçon

Réponds en JSON avec cette structure:
{
  "introduction": "Pour répondre au problème qui est posé, je vais utiliser ${analysis.lessonDetected} plus précisément ${analysis.toolsSuggested.join(' et ')}.",
  "development": "Développement structuré avec connecteurs logiques et calculs détaillés selon la leçon identifiée",
  "conclusion": "Conclusion finale répondant au problème posé",
  "toolsUsed": ["calcul de limites", "limites à l'infini"],
  "steps": ["Déterminer C(x)", "Calculer la limite", "Conclure"],
  "isComplexSituation": false,
  "calculations": [
    {
      "step": "Fonction coût",
      "calculation": "C(x) = (4000 + 100x)/(20(x-20)) = 5 + 200/(x-20)",
      "result": "C(x) = 5 + 200/(x-20)"
    },
    {
      "step": "Limite à l'infini",
      "calculation": "lim(x→+∞) [5 + 200/(x-20)] = 5 + 0",
      "result": "5 FCFA"
    }
  ]
}
`;

    try {
      const response = await this.executeWithRetry(async (client) => {
        return await client.chat.completions.create({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 4000,
        });
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result as SolutionStructure;
    } catch (error) {
      console.error("Error generating complex solution:", error);
      throw new Error("Failed to generate complex mathematical solution");
    }
  }

  private async generateSimpleSolution(situationText: string, analysis: SituationAnalysis, perfectExamples: any[] = []): Promise<SolutionStructure> {
    const relevantLesson = TERMINALE_D_CURRICULUM.find(lesson => 
      lesson.name === analysis.lessonDetected
    );

    const methodologyGuide = METHODOLOGY_UEMOA.structure;
    
    // Utiliser les exemples parfaits du PDF officiel en priorité
    const perfectExampleText = perfectExamples.length > 0 
      ? perfectExamples.map(ex => `
EXEMPLE PARFAIT OFFICIEL - ${ex.situation.title}:
INTRODUCTION: ${ex.officialSolution.introduction}
DÉVELOPPEMENT: ${ex.officialSolution.development}
CONCLUSION: ${ex.officialSolution.conclusion}

CALCULS DÉTAILLÉS:
${ex.officialSolution.calculations.map((calc: { step: string; calculation: string; result: string }) => `• ${calc.step}: ${calc.calculation} = ${calc.result}`).join('\n')}
`).join('\n---\n')
      : '';

    const exampleSolutions = EXERCISE_EXAMPLES
      .filter(ex => ex.lessonId === relevantLesson?.id)
      .map(ex => `Exemple: ${ex.title}\n${ex.expectedSolution.introduction}\n${ex.expectedSolution.development}\n${ex.expectedSolution.conclusion}`)
      .join('\n\n');

    const prompt = `
Tu es un assistant spécialisé dans la résolution d'exercices mathématiques pour les élèves de Terminale D en Côte d'Ivoire.

CONTRAINTES STRICTES:
- Utilise UNIQUEMENT les notions et méthodes du programme Terminale D Côte d'Ivoire
- Respecte EXACTEMENT la méthodologie UEMOA
- Ne dépasse JAMAIS le niveau requis

LEÇON OBLIGATOIRE: ${analysis.lessonDetected}
OUTILS OBLIGATOIRES: ${analysis.toolsSuggested.join(', ')}

${relevantLesson ? `
Notions autorisées: ${relevantLesson.notions.join(', ')}
Méthodes autorisées: ${relevantLesson.methods.join(', ')}
Sujets interdits: ${relevantLesson.forbiddenTopics.join(', ')}
` : ''}

MÉTHODOLOGIE UEMOA OBLIGATOIRE:
Introduction: ${methodologyGuide.introduction.join(', ')}
Développement: ${methodologyGuide.development.join(', ')}
Conclusion: ${methodologyGuide.conclusion.join(', ')}

EXEMPLES PARFAITS OFFICIELS (PRIORITÉ ABSOLUE):
${perfectExampleText}

EXEMPLES DE RÉFÉRENCE COMPLÉMENTAIRES:
${exampleSolutions}

Exercice à résoudre : ${situationText}

STRUCTURE DE RÉPONSE OBLIGATOIRE:

1. INTRODUCTION (format imposé):
"Pour répondre au [problème qui est posé], je vais utiliser [la leçon concernée] plus précisément [les notions qui sont dans cette leçon]."

2. DÉVELOPPEMENT structuré avec connecteurs logiques OBLIGATOIRES:
- Premièrement, je détermine la fonction coût C(x)
- Deuxièmement, je calcule la limite de C(x) quand x tend vers +∞
- Enfin, je donne le résultat final

3. CONCLUSION: Retour au problème posé avec résultat final

IMPORTANT: 
- Si l'exercice nécessite des notions hors programme, adapte-le au niveau Terminale D
- EFFECTUE TOUS LES CALCULS et donne les résultats numériques exacts
- Utilise UNIQUEMENT les outils de la leçon identifiée
- Structure avec connecteurs logiques obligatoires

INSTRUCTIONS POUR LA LEÇON IDENTIFIÉE:
- Leçon: ${analysis.lessonDetected}
- Outils: ${analysis.toolsSuggested.join(', ')}
- Introduction obligatoire: "Pour répondre au problème qui est posé, je vais utiliser ${analysis.lessonDetected} plus précisément ${analysis.toolsSuggested.join(' et ')}."
- Respecte strictement les méthodes de cette leçon

Réponds en JSON avec cette structure :
{
  "introduction": "Pour répondre au problème qui est posé, je vais utiliser ${analysis.lessonDetected} plus précisément ${analysis.toolsSuggested.join(' et ')}.",
  "development": "Développement structuré avec connecteurs logiques selon la leçon ${analysis.lessonDetected}",
  "conclusion": "Conclusion finale adaptée à la leçon identifiée",
  "toolsUsed": ["calcul de limites", "limites à l'infini"],
  "steps": ["Établir la fonction coût C(x)", "Simplifier C(x) = 5 + 200/(x-20)", "Calculer lim(x→+∞) C(x) = 5"],
  "isComplexSituation": false,
  "curriculumCompliance": true,
  "completeSolution": "Solution complète adaptée au problème posé",
  "calculations": [
    {
      "step": "Fonction coût",
      "calculation": "C(x) = (4000 + 100x)/(20(x-20)) = 5 + 200/(x-20)",
      "result": "C(x) = 5 + 200/(x-20)"
    },
    {
      "step": "Limite à l'infini",
      "calculation": "lim(x→+∞) [5 + 200/(x-20)] = 5 + 0",
      "result": "5 FCFA"
    }
  ]
}
`;

    try {
      const response = await this.executeWithRetry(async (client) => {
        return await client.chat.completions.create({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 4000
        });
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result as SolutionStructure;
    } catch (error) {
      console.error("Error generating solution:", error);
      throw new Error("Failed to generate mathematical solution");
    }
  }

  async evaluateSolution(
    situationText: string,
    solution: SolutionStructure
  ): Promise<EvaluationCriteria> {
    const prompt = `
Tu es un évaluateur expert des situations complexes mathématiques selon les critères UEMOA pour la Terminale D en Côte d'Ivoire.

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
      const response = await this.executeWithRetry(async (client) => {
        return await client.chat.completions.create({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.2,
        });
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      // Ensure total score is calculated correctly
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
