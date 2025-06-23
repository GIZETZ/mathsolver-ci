# Guide d'Usage - Documentation Terminale D

## Test de la Documentation Restrictive

Votre système est maintenant configuré pour restreindre l'IA au programme officiel. Voici comment tester :

### 1. Exercices Simples (Conformes au Programme)

**Test 1 - Limites :**
```
Calculer la limite : lim(x→3) (x²-9)/(x-3)
```
✅ **Attendu :** Solution avec factorisation, méthode autorisée Terminale D

**Test 2 - Nombres Complexes :**
```
Résoudre dans C : z² + 2z + 5 = 0
```
✅ **Attendu :** Discriminant négatif, solutions complexes conjuguées

### 2. Situations Complexes (Format APC)

**Test 3 - Situation Multi-tâches :**
```
Contexte : Une population de bactéries double toutes les 2 heures.
À t=0, il y a 1000 bactéries.

Tâche 1 : Modéliser la croissance par une équation différentielle
Tâche 2 : Déterminer N(t)
Tâche 3 : Calculer la population après 6 heures
```
✅ **Attendu :** Réponse structurée par tâches avec verbes d'action ("Je calcule...", "Je détermine...")

### 3. Exercices Hors Programme (Doivent être Refusés/Adaptés)

**Test 4 - Niveau Supérieur :**
```
Calculer l'intégrale ∫ x ln(x) dx par intégration par parties
```
❌ **Attendu :** Refus ou adaptation car "intégration par parties" est dans `forbiddenTopics`

**Test 5 - Notion Avancée :**
```
Résoudre l'équation différentielle y'' + 3y' + 2y = 0
```
❌ **Attendu :** Refus car équations du second ordre interdites

## Vérification du Fonctionnement

### Indicateurs de Succès
1. **`isInCurriculum: true/false`** - Vérifie la conformité
2. **`adaptationMade`** - Explique les modifications apportées
3. **Méthodologie UEMOA** respectée (Introduction/Développement/Conclusion)
4. **Situations complexes** structurées par tâches

### Exemple de Réponse Conforme
```json
{
  "introduction": "Je vais résoudre cette équation du second degré dans C...",
  "development": "Je calcule le discriminant Δ = b² - 4ac...",
  "conclusion": "L'ensemble des solutions est S = {3+2i, 3-2i}",
  "isComplexSituation": false,
  "curriculumCompliance": true,
  "toolsUsed": ["Calcul du discriminant", "Formule des racines complexes"]
}
```

### Exemple de Refus/Adaptation
```json
{
  "adaptationMade": "L'intégration par parties n'est pas au programme Terminale D. Je propose plutôt de calculer une primitive par reconnaissance de forme.",
  "curriculumCompliance": false
}
```

## Maintenance de la Documentation

### Ajouter une Nouvelle Leçon
1. Modifier `server/data/curriculum.ts`
2. Ajouter des exemples dans `server/data/examples.ts`
3. Créer des situations complexes dans `server/data/situations.ts`

### Structure Recommandée
- **Toujours définir `forbiddenTopics`** pour exclure les notions supérieures
- **Respecter les 4 critères UEMOA** (CM1, CM2, CM3, CP)
- **Inclure des exercices types** représentatifs du niveau

Cette documentation garantit que votre application reste fidèle au programme officiel Terminale D de Côte d'Ivoire.