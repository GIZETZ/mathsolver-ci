import type { Express } from "express";
import { createServer, type Server } from "http";
import { mathResolver } from "./services/openai";
import type { Request, Response } from 'express';

export async function registerRoutes(app: Express): Promise<Server> {
  // Text extraction endpoint using OpenAI Vision
  app.post('/api/extract-text', async (req, res) => {
    try {
      const { image, language } = req.body;

      if (!image) {
        return res.status(400).json({ 
          success: false, 
          error: "Image data is required" 
        });
      }

      const extractedText = await mathResolver.extractTextFromImage(image, language || 'french');

      res.json({
        success: true,
        text: extractedText,
        confidence: 0.9
      });

    } catch (error) {
      console.error('Erreur détaillée OCR:', error);

      let errorMessage = 'Erreur inconnue lors de l\'extraction du texte';

      if (error instanceof Error) {
        console.error('Message d\'erreur OCR:', error.message);

        // Messages d'erreur spécifiques
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          errorMessage = 'Clé API OCR invalide ou expirée';
        } else if (error.message.includes('File size exceeds')) {
          errorMessage = 'Image trop volumineuse. Veuillez utiliser une image plus petite';
        } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
          errorMessage = 'Délai d\'attente dépassé. Veuillez réessayer';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Problème de connexion. Vérifiez votre réseau';
        } else {
          errorMessage = error.message;
        }
      }

      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  });

  // Route pour le chat avec l'IA-4 (limité à 5 requêtes/jour)
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { question, userId } = req.body;

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ 
          message: "Question requise" 
        });
      }

      const chatResponse = await mathResolver.chatWithAI4(question, userId);

      res.json(chatResponse);
    } catch (error: any) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({ 
        message: "Erreur lors du traitement de votre question",
        error: error.message 
      });
    }
  });

  app.post("/api/solve", async (req: Request, res: Response) => {
    try {
      const { text, image } = req.body;

      if (!text && !image) {
        return res.status(400).json({ message: "Either text or image is required" });
      }

      let problemText = text;

      // If image is provided, extract text from it first
      if (image && !text) {
        // For now, we'll just return an error asking for text input
        // In a production app, you would use OCR here
        return res.status(400).json({ 
          message: "La reconnaissance d'image n'est pas encore disponible. Veuillez saisir le texte de l'exercice." 
        });
      }

      // Use OpenRouter API directly
      const analysis = await mathResolver.analyzeSituation(problemText);
      const solution = await mathResolver.generateSolution(problemText, analysis);

      // Ensure proper lesson detection and response format
      const responseData = {
        problem: problemText,
        solution: solution.completeSolution || 
                 (String(solution.introduction || '') + '\n\n' + String(solution.development || '') + '\n\n' + String(solution.conclusion || '')),
        steps: solution.steps,
        subject: analysis.lessonDetected, // Use the correctly identified lesson
        difficulty: analysis.difficultyLevel,
        isComplexSituation: solution.isComplexSituation || false,
        tasks: solution.tasks || [],
        finalConclusion: solution.finalConclusion || solution.conclusion,
        calculations: solution.calculations || [],
        detailedSolution: {
          introduction: String(solution.introduction || ''),
          development: String(solution.development || ''),
          conclusion: String(solution.conclusion || '')
        }
      };

      console.log('Text analyzed:', problemText.substring(0, 100) + '...');
      console.log('Lesson detected:', analysis.lessonDetected);
      console.log('Solution generated:', solution.introduction);

      res.json(responseData);

    } catch (error) {
      console.error("Erreur détaillée lors de la résolution:", error);

      // Log détaillé pour diagnostiquer le problème
      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message);
        console.error("Stack trace:", error.stack);
      }

      // Vérifier si c'est un problème de clé API
      if (error instanceof Error && error.message.includes('401')) {
        return res.status(500).json({ 
          message: "Erreur de configuration API. Vérifiez la clé OPENAI_API_KEY dans les variables d'environnement." 
        });
      }

      // Vérifier si c'est un problème de connexion
      if (error instanceof Error && (error.message.includes('ECONNREFUSED') || error.message.includes('fetch'))) {
        return res.status(500).json({ 
          message: "Problème de connexion au service IA. Veuillez réessayer dans quelques minutes." 
        });
      }

      res.status(500).json({ 
        message: "Impossible de résoudre l'exercice. Veuillez vérifier votre connexion.",
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : String(error) : undefined
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
