# Documentation Complète - Programme Terminale D Côte d'Ivoire

## Objectif
Cette documentation sert de référence stricte pour l'IA afin de limiter ses réponses aux seules notions, méthodes et exercices du programme officiel Terminale D en Côte d'Ivoire.

## Structure de la Documentation

### 1. Curriculum Officiel (`server/data/curriculum.ts`)
- **12 leçons complètes** avec notions autorisées et interdites
- **Méthodes spécifiques** au niveau Terminale D
- **Critères d'évaluation UEMOA** détaillés
- **Objectifs pédagogiques** précis

### 2. Exemples Types (`server/data/examples.ts`)
- **Solutions modèles** respectant la méthodologie UEMOA
- **Erreurs communes** à éviter
- **Points clés** pour chaque type d'exercice

### 3. Intégration IA (`server/services/openai.ts`)
- **Prompts contraints** utilisant la documentation
- **Vérification de conformité** au programme
- **Adaptation automatique** si hors programme

## Comment Étendre la Documentation

### Ajouter une nouvelle leçon :
```typescript
{
  id: 6,
  name: "Nom de la leçon",
  description: "Description courte",
  objectives: ["Objectif 1", "Objectif 2"],
  notions: ["Notion autorisée 1", "Notion autorisée 2"],
  methods: ["Méthode 1", "Méthode 2"],
  typicalExercises: ["Exercice type 1"],
  forbiddenTopics: ["Notion interdite 1"], // TRÈS IMPORTANT
  evaluationCriteria: {
    cm1: ["Critère pertinence"],
    cm2: ["Critère outils math"],
    cm3: ["Critère cohérence"],
    cp: ["Critère présentation"]
  }
}
```

### Ajouter des exemples :
```typescript
{
  lessonId: 6,
  title: "Titre de l'exercice",
  statement: "Énoncé complet",
  expectedSolution: {
    introduction: "Introduction selon UEMOA",
    development: "Développement détaillé",
    conclusion: "Conclusion avec réponse"
  },
  commonErrors: ["Erreur 1", "Erreur 2"],
  keyPoints: ["Point clé 1", "Point clé 2"]
}
```

## Processus de Validation

### L'IA vérifie automatiquement :
1. **Conformité au programme** - Chaque notion utilisée doit être dans la liste autorisée
2. **Respect de la méthodologie UEMOA** - Structure obligatoire Introduction/Développement/Conclusion
3. **Niveau approprié** - Pas de notions de niveau supérieur
4. **Adaptation si nécessaire** - Propose des alternatives si hors programme

### Indicateurs de qualité :
- `isInCurriculum: true/false` - Vérifie si dans le programme
- `curriculumCompliance: true/false` - Respecte les contraintes
- `adaptationMade` - Explique les adaptations apportées

## Maintenance

### Pour mettre à jour :
1. **Modifier** `curriculum.ts` pour ajouter/corriger des leçons
2. **Enrichir** `examples.ts` avec de nouveaux exercices types
3. **Tester** avec des exercices hors programme pour vérifier les restrictions
4. **Valider** que l'IA refuse les notions interdites

### Fichiers à maintenir :
- `server/data/curriculum.ts` - Programme officiel
- `server/data/examples.ts` - Exemples et solutions
- `server/services/openai.ts` - Logique de contraintes IA

## Usage

L'IA utilise automatiquement cette documentation pour :
- **Analyser** chaque exercice par rapport au programme
- **Générer** des solutions conformes à UEMOA
- **Refuser** ou **adapter** les exercices hors programme
- **Évaluer** selon les critères officiels

Cette approche garantit que l'application reste fidèle au programme Terminale D de Côte d'Ivoire.