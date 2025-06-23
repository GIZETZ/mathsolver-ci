import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, FileImage, Loader2, CheckCircle, AlertCircle, Eye, Trash2, RotateCcw } from 'lucide-react';
import { processImageForMath } from '@/services/ocrService';

interface OcrCaptureProps {
  onTextExtracted: (text: string) => void;
  className?: string;
  mode?: 'camera' | 'upload';
}

interface ProcessingState {
  isProcessing: boolean;
  progress: string;
  error?: string;
}

interface ExtractedResult {
  text: string;
  processingTime: number;
  confidence?: number;
}

/**
 * Composant pour capturer des images et extraire le texte par OCR
 */
const OcrCapture: React.FC<OcrCaptureProps> = ({ onTextExtracted, className = '', mode = 'camera' }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({ isProcessing: false, progress: '' });
  const [extractedResult, setExtractedResult] = useState<ExtractedResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [cameraMode, setCameraMode] = useState<'none' | 'photo' | 'file'>('none');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Nettoyage du stream à la sortie
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  /**
   * Traite l'image sélectionnée et extrait le texte
   */
  const handleImageProcessing = async (file: File) => {
    setProcessing({ isProcessing: true, progress: 'Préparation de l\'image...' });
    setExtractedResult(null);

    try {
      // Afficher l'image capturée
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);

      setProcessing({ isProcessing: true, progress: 'Extraction du texte en cours...' });
      
      // Traitement OCR
      const result = await processImageForMath(file);
      
      if (result.success && result.text.trim()) {
        setExtractedResult({
          text: result.text,
          processingTime: result.processingTime || 0,
          confidence: 0.85 // Valeur par défaut
        });
        setProcessing({ isProcessing: false, progress: 'Texte extrait avec succès!' });
        
        // Notifier le parent
        onTextExtracted(result.text);
      } else {
        setProcessing({ 
          isProcessing: false, 
          progress: '', 
          error: result.error || 'Aucun texte détecté dans l\'image'
        });
      }
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
      setProcessing({ 
        isProcessing: false, 
        progress: '', 
        error: 'Erreur lors du traitement de l\'image'
      });
    }
  };

  /**
   * Démarre la caméra pour la prise de photo
   */
  const startCamera = async () => {
    try {
      setProcessing({ isProcessing: true, progress: 'Accès à la caméra...' });
      
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'environment', // Caméra arrière pour les exercices
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
          aspectRatio: { ideal: 16/9 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Attendre que la vidéo soit prête
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
        };
      }
      
      setCameraMode('photo');
      setProcessing({ isProcessing: false, progress: '' });
    } catch (error) {
      console.error('Erreur caméra:', error);
      let errorMessage = 'Impossible d\'accéder à la caméra.';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Autorisation caméra refusée. Veuillez autoriser l\'accès dans les paramètres.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'Aucune caméra trouvée sur cet appareil.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Caméra déjà utilisée par une autre application.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'Paramètres caméra non supportés. Essayez de redémarrer l\'app.';
        }
      }
      
      setProcessing({ 
        isProcessing: false, 
        progress: '', 
        error: errorMessage
      });
    }
  };

  /**
   * Capture une photo depuis la caméra
   */
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    // Vérifier que la vidéo est prête
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.warn('Vidéo pas encore prête pour la capture');
      return;
    }

    // Définir les dimensions pour le format 16:9
    const aspectRatio = 16 / 9;
    let captureWidth = video.videoWidth;
    let captureHeight = video.videoHeight;
    
    // Ajuster pour respecter le ratio 16:9
    if (captureWidth / captureHeight > aspectRatio) {
      captureWidth = captureHeight * aspectRatio;
    } else {
      captureHeight = captureWidth / aspectRatio;
    }
    
    // Centrer la capture
    const offsetX = (video.videoWidth - captureWidth) / 2;
    const offsetY = (video.videoHeight - captureHeight) / 2;

    // Ajuster la taille du canvas
    canvas.width = captureWidth;
    canvas.height = captureHeight;
    
    // Capturer l'image avec le bon cadrage
    context.drawImage(
      video, 
      offsetX, offsetY, captureWidth, captureHeight,
      0, 0, captureWidth, captureHeight
    );
    
    // Convertir en blob puis en file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        handleImageProcessing(file);
        
        // Arrêter la caméra
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
        setCameraMode('none');
      }
    }, 'image/jpeg', 0.95);
  };

  /**
   * Gère la sélection d'un fichier
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageProcessing(file);
    }
  };

  /**
   * Réinitialise l'état du composant
   */
  const resetCapture = () => {
    setCapturedImage(null);
    setExtractedResult(null);
    setProcessing({ isProcessing: false, progress: '' });
    setShowPreview(false);
    setCameraMode('none');
    
    // Arrêter la caméra si active
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Utilise le texte extrait
   */
  const useExtractedText = () => {
    if (extractedResult?.text) {
      onTextExtracted(extractedResult.text);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mode caméra active */}
      {cameraMode === 'photo' && (
        <div className="space-y-4">
          <div className="bg-black rounded-xl overflow-hidden relative aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ minHeight: '300px' }}
            />
            <div className="absolute inset-0 border-2 border-white/50 rounded-xl m-6">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/70 text-center">
                <Camera className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Cadrez votre exercice</p>
                <p className="text-xs mt-1 opacity-75">Format 16:9 optimal</p>
              </div>
            </div>
            
            {/* Overlay de guide */}
            <div className="absolute inset-6 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
              <div className="text-white/50 text-xs text-center">
                <div className="mb-2">Zone de capture</div>
                <div className="w-16 h-16 border-2 border-white/30 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={resetCapture}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Annuler
            </button>
            <button
              onClick={capturePhoto}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capturer
            </button>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Zone de sélection d'image */}
      {!capturedImage && cameraMode === 'none' && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {mode === 'camera' ? 'Capturer un exercice' : 'Importer une image'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {mode === 'camera' 
                ? 'Prenez une photo de l\'exercice de mathématiques' 
                : 'Sélectionnez une image contenant l\'exercice de mathématiques'
              }
            </p>
          </div>

          {/* Boutons de capture */}
          <div className="space-y-3">
            {/* Bouton caméra (uniquement en mode caméra) */}
            {mode === 'camera' && (
              <button
                onClick={() => {
                  if (isMobile) {
                    // Sur mobile, utiliser l'input file avec capture pour la caméra
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.capture = 'environment';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        handleImageProcessing(file);
                      }
                    };
                    input.click();
                  } else {
                    // Sur desktop, utiliser l'API caméra
                    startCamera();
                  }
                }}
                disabled={processing.isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-medium transition-colors flex items-center justify-center space-x-3"
              >
                <Camera className="w-5 h-5" />
                <span>Prendre une photo</span>
              </button>
            )}

            {/* Bouton de sélection de fichier (uniquement en mode upload) */}
            {mode === 'upload' && (
              <button
                onClick={() => {
                  // Pour l'upload, ne jamais utiliser capture - toujours ouvrir la galerie
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  // Pas d'attribut capture = galerie/fichiers
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      handleImageProcessing(file);
                    }
                  };
                  input.click();
                }}
                disabled={processing.isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-medium transition-colors flex items-center justify-center space-x-3"
              >
                <Upload className="w-5 h-5" />
                <span>Sélectionner une image</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture={mode === 'camera' && isMobile ? 'environment' : undefined}
            onChange={handleFileSelect}
            className="hidden"
            disabled={processing.isProcessing}
          />

          {/* Formats supportés */}
          <div className="text-xs text-gray-500 text-center">
            Formats supportés: JPG, PNG, GIF, BMP (max 5MB)
          </div>
        </div>
      )}

      {/* Image capturée et traitement */}
      {capturedImage && (
        <div className="space-y-4">
          {/* Aperçu de l'image */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <FileImage className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Image capturée</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title={showPreview ? "Masquer l'aperçu" : "Voir l'aperçu"}
                >
                  <Eye className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={resetCapture}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Recommencer"
                  disabled={processing.isProcessing}
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {showPreview && (
              <div className="p-3">
                <img
                  ref={imageRef}
                  src={capturedImage}
                  alt="Image capturée"
                  className="w-full h-auto max-h-64 object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          {/* État du traitement */}
          {processing.isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <div className="text-sm font-medium text-blue-900">Traitement en cours...</div>
                  <div className="text-xs text-blue-700">{processing.progress}</div>
                </div>
              </div>
            </div>
          )}

          {/* Erreur */}
          {processing.error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-red-900">Erreur de traitement</div>
                  <div className="text-xs text-red-700 mt-1">{processing.error}</div>
                </div>
              </div>
              <button
                onClick={resetCapture}
                className="mt-3 text-sm text-red-700 hover:text-red-800 font-medium"
              >
                Réessayer avec une autre image
              </button>
            </div>
          )}

          {/* Texte extrait */}
          {extractedResult && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-green-900">Texte extrait avec succès</div>
                  <div className="text-xs text-green-700">
                    Traité en {extractedResult.processingTime}ms
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs text-gray-500 mb-2">Texte détecté:</div>
                <div className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                  {extractedResult.text}
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={useExtractedText}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Utiliser ce texte
                </button>
                <button
                  onClick={resetCapture}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Nouvelle image
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Conseils d'utilisation */}
      {!capturedImage && cameraMode === 'none' && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Conseils pour une meilleure reconnaissance:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Assurez-vous que le texte est bien lisible et contrasté</li>
            <li>• Évitez les reflets et les ombres sur l'image</li>
            <li>• Cadrez au plus près du texte de l'exercice</li>
            <li>• Tenez le téléphone bien droit pour éviter la déformation</li>
            {isMobile && <li>• Utilisez un bon éclairage naturel si possible</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OcrCapture;