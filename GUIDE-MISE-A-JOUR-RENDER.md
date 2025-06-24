# Guide de Mise à Jour - MathSolver CI sur Render

## 🔄 Mise à jour via GitHub

### Étape 1 : Fichiers à remplacer

Téléchargez et remplacez ces fichiers dans votre repository GitHub :

**Fichiers modifiés :**
- `server/services/openai.ts` - ✅ Correction authentification OpenRouter
- `server/routes.ts` - ✅ Meilleure gestion d'erreurs
- `server/index.ts` - ✅ Vérification variables d'environnement au démarrage
- `client/src/services/ocrService.ts` - ✅ Compression automatique des images
- `TROUBLESHOOTING.md` - ✅ Guide de dépannage complet

**Nouveaux fichiers :**
- `GUIDE-MISE-A-JOUR-RENDER.md` (ce fichier)

### Étape 2 : Commit sur GitHub

```bash
git add .
git commit -m "🔧 Fix: Correction API OpenRouter et compression images OCR"
git push origin main
```

### Étape 3 : Render redéploiera automatiquement

✅ Render détecte les changements  
✅ Redéploiement automatique (2-5 minutes)  
✅ Application mise à jour

---

## 🔑 Configuration de la clé API OpenRouter

### Obtenir une nouvelle clé API

1. **Allez sur https://openrouter.ai/**
2. **Créez un compte ou connectez-vous**
3. **Cliquez sur "API Keys" dans le menu**
4. **Cliquez "Create Key"**
5. **Copiez la clé complète** (commence par `sk-or-v1-`)

### Configurer dans Render

1. **Dashboard Render** → Votre service `mathsolver-ci`
2. **Cliquez "Environment"** dans le menu latéral
3. **Trouvez `OPENAI_API_KEY`** ou cliquez "Add Environment Variable"
4. **Collez votre nouvelle clé** (format : `sk-or-v1-...`)
5. **Cliquez "Save Changes"**
6. **Render redémarre automatiquement**

---

## 🛠️ Résolutions de Problèmes

### Problème 1 : "Impossible de résoudre l'exercice"

**Cause :** Variable `OPENAI_API_KEY` manquante ou invalide

**Solution :**
```
✅ Vérifiez dans Render → Environment → OPENAI_API_KEY
✅ La clé commence par "sk-or-v1-"
✅ Aucun espace avant/après la clé
✅ Cliquez "Save Changes" après modification
```

**Test :** Essayez de résoudre "2x + 3 = 7"

### Problème 2 : "File size exceeds 1024KB" (OCR)

**Cause :** Image trop volumineuse

**Solution appliquée :**
```
✅ Compression automatique des images > 1MB
✅ Redimensionnement intelligent (max 1200x1200px)
✅ Conversion JPEG avec 70% qualité
```

**Conseils utilisateur :**
- Utilisez des photos nettes mais pas trop haute résolution
- Évitez les captures d'écran 4K
- Préférez les photos directes aux PDF scannés

### Problème 3 : Déploiement bloqué

**Si Render ne redéploie pas automatiquement :**

1. **Manual Deploy :**
   - Dashboard → votre service
   - "Manual Deploy" → "Deploy latest commit"

2. **Vérifier les logs :**
   - Onglet "Logs" dans Render
   - Chercher "✅ Variables d'environnement OK"

3. **Redémarrage forcé :**
   - "Settings" → "Restart Service"

### Problème 4 : Erreurs de build

**Erreurs courantes et solutions :**

```bash
# Erreur : Module not found
Solution : Vérifiez que tous les fichiers sont bien uploadés

# Erreur : Environment variable undefined  
Solution : Configurez OPENAI_API_KEY dans Render

# Erreur : Port binding
Solution : Render utilise automatiquement le bon port
```

---

## 🔍 Vérification après mise à jour

### Tests à effectuer

1. **API de résolution :**
   - Tapez "Résoudre 2x + 3 = 7"
   - Doit retourner une solution structurée

2. **OCR fonctionnel :**
   - Prenez une photo d'un exercice
   - Vérifiez que le texte est extrait

3. **Logs serveur :**
   - Dans Render → Logs
   - Vérifiez : "✅ Variables d'environnement OK"
   - Pas d'erreurs 401 ou 500

### Indicateurs de succès

```
✅ Application accessible sur votre-app.onrender.com
✅ Résolution d'exercices fonctionne
✅ OCR extrait le texte des images
✅ Pas d'erreurs dans les logs Render
✅ Messages d'erreur clairs pour l'utilisateur
```

---

## 🚨 En cas de problème persistant

### Étapes de diagnostic

1. **Vérifiez les logs Render :**
   ```
   Dashboard → votre service → Logs
   Cherchez les erreurs en rouge
   ```

2. **Testez l'API directement :**
   ```bash
   curl -X POST https://votre-app.onrender.com/api/solve \
     -H "Content-Type: application/json" \
     -d '{"text":"Test simple"}'
   ```

3. **Vérifiez la clé API :**
   ```
   Environment → OPENAI_API_KEY
   Format : sk-or-v1-[long-code-alphanumérique]
   ```

### Support et contact

**Si les problèmes persistent :**
- Consultez le fichier `TROUBLESHOOTING.md`
- Vérifiez les logs détaillés dans Render
- Testez d'abord en local avec `npm run dev`

---

## 📋 Checklist de mise à jour

### Avant mise à jour
- [ ] Sauvegarde du code actuel
- [ ] Nouvelle clé API OpenRouter obtenue
- [ ] GitHub repository accessible

### Pendant mise à jour  
- [ ] Fichiers remplacés sur GitHub
- [ ] Commit effectué
- [ ] Clé API configurée dans Render
- [ ] Déploiement automatique lancé

### Après mise à jour
- [ ] Application accessible
- [ ] Test résolution d'exercice
- [ ] Test OCR avec photo
- [ ] Vérification logs sans erreur
- [ ] Guide utilisateur mis à jour si nécessaire

---

**Temps estimé total :** 10-15 minutes  
**Redéploiement Render :** 2-5 minutes automatique