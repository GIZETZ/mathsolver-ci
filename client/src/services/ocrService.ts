/**
 * Service OCR pour l'extraction de texte depuis les images
 * Utilise l'API OCR.Space pour traiter les images
 */

export interface OcrResult {
  success: boolean;
  text: string;
  error?: string;
  confidence?: number;
}

export interface OcrApiResponse {
  ParsedResults?: Array<{
    ParsedText: string;
    TextOverlay?: {
      HasOverlay: boolean;
      Message: string;
    };
  }>;
  OCRExitCode: number;
  IsErroredOnProcessing: boolean;
  ErrorMessage?: string[];
  ErrorDetails?: string;
}

/**
 * Configuration de l'API OCR
 */
const OCR_CONFIG = {
  apiKey: 'K83790365588957',
  baseUrl: 'https://api.ocr.space/parse/image',
  maxFileSize: 1024 * 1024 * 5, // 5MB max
  supportedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'],
  timeout: 30000 // 30 secondes
};

/**
 * Valide le fichier image avant traitement OCR
 */
function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Aucun fichier fourni' };
  }

  if (!OCR_CONFIG.supportedFormats.includes(file.type)) {
    return { 
      valid: false, 
      error: `Format non supporté. Formats acceptés: ${OCR_CONFIG.supportedFormats.join(', ')}` 
    };
  }

  if (file.size > OCR_CONFIG.maxFileSize) {
    return { 
      valid: false, 
      error: `Fichier trop volumineux. Taille maximum: ${OCR_CONFIG.maxFileSize / (1024 * 1024)}MB` 
    };
  }

  return { valid: true };
}

/**
 * Convertit une image en Base64 pour l'API OCR
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extraire seulement les données base64 (sans le préfixe data:image/...)
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsDataURL(file);
  });
}

/**
 * Utilise l'API OCR.space pour extraire le texte d'une image
 */
export async function extractTextFromImage(imageFile: File): Promise<OcrResult> {
  try {
    // Validation du fichier
    const validation = validateImageFile(imageFile);
    if (!validation.valid) {
      return {
        success: false,
        text: '',
        error: validation.error
      };
    }

    // Préparation des données pour l'API OCR.space
    const formData = new FormData();
    formData.append('apikey', 'K83790365588957');
    formData.append('file', imageFile); // Envoyer le fichier directement
    formData.append('language', 'fre'); // Français
    formData.append('isOverlayRequired', 'false');
    formData.append('detectOrientation', 'true');
    formData.append('isTable', 'false');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2');

    // Appel direct à l'API OCR.space
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erreur API OCR: ${response.status}`);
    }

    const data: OcrApiResponse = await response.json();

    // Traitement de la réponse
    if (data.IsErroredOnProcessing) {
      const errorMessage = data.ErrorMessage?.join(', ') || data.ErrorDetails || 'Erreur inconnue';
      return {
        success: false,
        text: '',
        error: `Erreur OCR: ${errorMessage}`
      };
    }

    if (!data.ParsedResults || data.ParsedResults.length === 0) {
      return {
        success: false,
        text: '',
        error: 'Aucun texte détecté dans l\'image'
      };
    }

    const extractedText = data.ParsedResults[0].ParsedText || '';
    
    if (!extractedText.trim()) {
      return {
        success: false,
        text: '',
        error: 'Aucun texte lisible détecté dans l\'image'
      };
    }

    // Nettoyage du texte extrait
    const cleanedText = cleanExtractedText(extractedText);

    return {
      success: true,
      text: cleanedText,
      confidence: data.OCRExitCode === 1 ? 0.9 : 0.7
    };

  } catch (error) {
    console.error('Erreur lors de l\'extraction OCR:', error);
    
    if (error instanceof Error) {
      return {
        success: false,
        text: '',
        error: `Erreur de traitement: ${error.message}`
      };
    }

    return {
      success: false,
      text: '',
      error: 'Erreur inconnue lors du traitement de l\'image'
    };
  }
}

/**
 * Nettoie le texte extrait par OCR
 */
function cleanExtractedText(text: string): string {
  return text
    // Normaliser les espaces
    .replace(/\s+/g, ' ')
    // Corriger les caractères mal reconnus courants
    .replace(/[|]/g, 'I')
    .replace(/[0]/g, 'O') // Contextuel - à améliorer
    .replace(/\bO\b/g, '0') // Remettre les vrais zéros
    // Nettoyer les lignes vides
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

/**
 * Traite une image capturée depuis la caméra ou un fichier
 */
export async function processImageForMath(imageFile: File): Promise<{
  success: boolean;
  text: string;
  error?: string;
  processingTime?: number;
}> {
  const startTime = Date.now();
  
  try {
    const result = await extractTextFromImage(imageFile);
    const processingTime = Date.now() - startTime;
    
    return {
      ...result,
      processingTime
    };
  } catch (error) {
    return {
      success: false,
      text: '',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      processingTime: Date.now() - startTime
    };
  }
}