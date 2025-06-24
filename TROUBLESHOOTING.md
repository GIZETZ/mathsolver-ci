# Guide de Dépannage - MathSolver CI

## Problèmes Courants sur Render.com

### 1. "Impossible de résoudre l'exercice" 

**Cause:** Variable d'environnement OPENAI_API_KEY manquante ou incorrecte

**Solution:**
1. Connectez-vous à votre dashboard Render.com
2. Allez dans votre service `mathsolver-ci`
3. Cliquez sur "Environment" dans le menu latéral
4. Ajoutez la variable:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-or-v1-...` (votre clé OpenRouter)
5. Cliquez "Save Changes"
6. Le service redémarrera automatiquement

### 2. "File size exceeds 1024KB" (OCR)

**Cause:** Image trop volumineuse pour l'API OCR

**Solutions appliquées:**
- ✅ Compression automatique des images > 1MB
- ✅ Redimensionnement intelligent (max 1200x1200px)
- ✅ Conversion en JPEG avec 70% de qualité
- ✅ Validation avant envoi à l'API

**Si le problème persiste:**
- Utilisez des images plus petites (< 500KB recommandé)
- Évitez les captures d'écran haute résolution
- Préférez les photos prises directement avec l'appareil

### 3. Vérification du Déploiement

**Variables d'environnement requises:**
```
OPENAI_API_KEY=sk-or-v1-[votre-clé-openrouter]
NODE_ENV=production
PORT=10000
```

**Logs de démarrage attendus:**
```
✅ Variables d'environnement OK
[express] serving on port 10000
```

**Si vous voyez:**
```
🚨 ERREUR: Variables d'environnement manquantes:
   - OPENAI_API_KEY
❌ Démarrage interrompu à cause des variables manquantes
```

→ Ajoutez la variable manquante dans Render

### 4. Test de l'API

**URL de test:** `https://votre-app.onrender.com/api/solve`

**Requête test:**
```bash
curl -X POST https://votre-app.onrender.com/api/solve \
  -H "Content-Type: application/json" \
  -d '{"text":"Résoudre: 2x + 3 = 7"}'
```

**Réponse attendue:** JSON avec solution mathématique

### 5. Configuration OpenRouter

**Clé API OpenRouter:**
1. Allez sur https://openrouter.ai/
2. Créez un compte / connectez-vous
3. Allez dans "API Keys"
4. Créez une nouvelle clé
5. Format: `sk-or-v1-...`

**Modèle utilisé:** `openai/gpt-4o-mini` (économique et performant)

### 6. Résolution Step-by-Step

1. **Vérifiez les logs Render:**
   - Dashboard → votre service → "Logs"
   - Cherchez les erreurs de démarrage

2. **Testez l'API:**
   - Ouvrez `https://votre-app.onrender.com`
   - Essayez de résoudre un exercice simple
   - Vérifiez la console du navigateur (F12)

3. **Redéploiement si nécessaire:**
   - Dans Render, cliquez "Manual Deploy" → "Deploy latest commit"

### 7. Contact et Support

**Si les problèmes persistent:**
- Vérifiez les logs détaillés dans Render
- Testez en local d'abord avec `npm run dev`
- Contactez le support Render si problème de plateforme

**Logs utiles à fournir:**
- Logs de démarrage du serveur
- Erreurs dans la console navigateur
- Réponse de l'API en cas d'erreur

---

**État actuel des corrections:**
- ✅ Compression automatique des images OCR
- ✅ Gestion d'erreurs API améliorée
- ✅ Vérification des variables d'environnement au démarrage
- ✅ Messages d'erreur explicites