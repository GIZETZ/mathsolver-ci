import type { Express } from "express";
import { createServer, type Server } from "http";
import { mathResolver } from "./services/openai";

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
      console.error('Error extracting text:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });

  // Simple math solving endpoint - no authentication needed
  app.post('/api/solve', async (req, res) => {
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
      console.error("Error solving problem:", error);
      res.status(500).json({ message: "Failed to solve problem" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}