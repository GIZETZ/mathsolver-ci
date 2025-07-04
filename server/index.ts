import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Vérification des variables d'environnement critiques au démarrage
function checkEnvironmentVariables() {
  const requiredVars = ['OPENAI_API_KEY'];
  const optionalVars = ['OPENAI_API_KEY_2', 'OPENAI_API_KEY_3', 'OPENAI_API_KEY_4'];
  
  const missingRequired = requiredVars.filter(varName => !process.env[varName]);
  const availableOptional = optionalVars.filter(varName => process.env[varName]);
  
  if (missingRequired.length > 0) {
    console.error('🚨 ERREUR: Variables d\'environnement critiques manquantes:');
    missingRequired.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('ℹ️  Ajoutez ces variables dans votre configuration Render.com');
    return false;
  }
  
  console.log('✅ Variables d\'environnement OK');
  console.log(`🤖 Système multi-IA: ${1 + availableOptional.length}/4 IA configurées`);
  
  if (availableOptional.length < 3) {
    console.warn('⚠️  Pour un système multi-IA complet, configurez les 4 clés API');
    console.warn('   OPENAI_API_KEY_2, OPENAI_API_KEY_3, OPENAI_API_KEY_4');
  } else {
    console.log('🎉 Système multi-IA complet activé !');
  }
  
  return true;
}

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Vérifier les variables d'environnement avant de démarrer
  const envCheck = checkEnvironmentVariables();
  if (!envCheck) {
    console.error('❌ Démarrage interrompu à cause des variables manquantes');
    process.exit(1);
  }

  // Redirection ads.txt vers Ezoic Ads.txt Manager
  app.get('/ads.txt', (req, res) => {
    res.redirect(301, 'https://srv.adstxtmanager.com/75863/mathsolverci.site');
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
