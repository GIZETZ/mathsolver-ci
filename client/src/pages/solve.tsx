import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Type, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import OcrCapture from "@/components/OcrCapture";
import AdBanner from "@/components/AdBanner";

interface MathSolution {
  problem: string;
  solution: string;
  steps: string[];
  subject: string;
  difficulty: string;
  isComplexSituation?: boolean;
  tasks?: any[];
  finalConclusion?: string;
  calculations?: Array<{
    step: string;
    calculation: string;
    result: string;
  }>;
  detailedSolution?: {
    introduction: string;
    development: string;
    conclusion: string;
  };
}

export default function Solve() {
  const [mode, setMode] = useState<'choose' | 'camera' | 'upload' | 'text'>('choose');
  const [problemText, setProblemText] = useState('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();

  // Check URL params for mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'camera' || urlMode === 'upload' || urlMode === 'text') {
      setMode(urlMode as 'camera' | 'upload' | 'text');
    }
  }, []);

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const solveMutation = useMutation({
    mutationFn: async (data: { text?: string; image?: string }): Promise<MathSolution> => {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to solve problem');
      }

      return response.json();
    },
    onSuccess: (solution: any) => {
      // Clear any corrupted localStorage first
      try {
        JSON.parse(localStorage.getItem('mathHistory') || '[]');
      } catch {
        localStorage.removeItem('mathHistory');
      }

      // Save to local history with enhanced structure
      const history = JSON.parse(localStorage.getItem('mathHistory') || '[]');
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        problem: String(solution.problem || ""),
        solution: String(solution.solution || ""),
        steps: Array.isArray(solution.steps) ? solution.steps.map(String) : [],
        subject: String(solution.subject || ""),
        isComplexSituation: Boolean(solution.isComplexSituation),
        tasks: Array.isArray(solution.tasks) ? solution.tasks : [],
        finalConclusion: String(solution.finalConclusion || solution.solution || ""),
        calculations: Array.isArray(solution.calculations) ? solution.calculations : [],
        detailedSolution: {
          introduction: String(solution.detailedSolution?.introduction || ""),
          development: String(solution.detailedSolution?.development || ""), 
          conclusion: String(solution.detailedSolution?.conclusion || "")
        },
      };

      console.log('Saving entry:', newEntry);
      console.log('Development being saved:', newEntry.detailedSolution.development);

      history.unshift(newEntry);
      localStorage.setItem('mathHistory', JSON.stringify(history.slice(0, 10)));

      window.location.href = `/result?id=${newEntry.id}`;
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de résoudre l'exercice. Vérifiez votre connexion.",
        variant: "destructive",
      });
    },
  });

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Erreur caméra",
        description: "Impossible d'accéder à la caméra. Utilisez la saisie manuelle.",
        variant: "destructive",
      });
      setMode('text');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);

      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = () => {
    if (problemText.trim()) {
      solveMutation.mutate({ text: problemText.trim() });
    } else if (capturedImage) {
      // Fallback pour les images sans OCR (si jamais utilisé)
      toast({
        title: "Information",
        description: "Veuillez d'abord extraire le texte de l'image ou saisir l'exercice manuellement.",
        variant: "default",
      });
    }
  };

  const handleTextExtracted = (extractedText: string) => {
    setProblemText(extractedText);
    toast({
      title: "Texte extrait",
      description: "Le texte a été extrait avec succès. Vous pouvez maintenant le modifier si nécessaire.",
      variant: "default",
    });
  };

  if (mode === 'choose') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6 pt-8">
            <Link href="/">
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-3">Résoudre un exercice</h1>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setMode('camera');
                setProblemText('');
              }}
              className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Prendre une photo</h3>
              <p className="text-sm text-gray-600">
                Reconnaissance automatique de texte (OCR)
              </p>
            </button>

            <button
              onClick={() => setMode('text')}
              className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Type className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Saisir le texte</h3>
              <p className="text-sm text-gray-600">
                Tapez ou collez votre exercice de mathématiques
              </p>
            </button>

            <button
              onClick={() => {
                setMode('upload');
                setProblemText(''); // Reset text when switching to OCR mode
              }}
              className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Importer une image</h3>
              <p className="text-sm text-gray-600">
                Reconnaissance automatique de texte (OCR)
              </p>
            </button>
          </div>


        </div>
      </div>
    );
  }

  if (mode === 'camera') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6 pt-8">
            <button
              onClick={() => {
                setMode('choose');
                setProblemText('');
                setCapturedImage(null);
              }}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-3">Prendre une photo</h1>
          </div>

          {/* Composant OCR avec mode caméra */}
          <OcrCapture onTextExtracted={handleTextExtracted} mode="camera" />

          {/* Zone de texte si du texte a été extrait */}
          {problemText && (
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte extrait (vous pouvez le modifier)
                </label>
                <textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                  placeholder="Le texte extrait apparaîtra ici..."
                />
              </div>

              <button
                onClick={handleSolve}
                disabled={!problemText.trim() || solveMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                {solveMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Résolution en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Résoudre l'exercice
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6 pt-8">
            <button
              onClick={() => {
                setMode('choose');
                setProblemText('');
                setCapturedImage(null);
              }}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-3">Importer une image</h1>
          </div>

          {/* Composant OCR avec mode upload */}
          <OcrCapture onTextExtracted={handleTextExtracted} mode="upload" />

          {/* Zone de texte si du texte a été extrait */}
          {problemText && (
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte extrait (vous pouvez le modifier)
                </label>
                <textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                  placeholder="Le texte extrait apparaîtra ici..."
                />
              </div>

              <button
                onClick={handleSolve}
                disabled={!problemText.trim() || solveMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
              >
                {solveMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Résolution en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Résoudre l'exercice
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'text') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          {/* Ad Banner Top */}
          <AdBanner slot="1234567890" format="horizontal" className="mb-4" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setMode('choose')}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-3">Saisir l'exercice</h1>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Énoncé de l'exercice
              </label>
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Tapez ou collez votre exercice de mathématiques ici...

Exemple :
Résoudre l'équation : 2x² + 5x - 3 = 0

Ou :
Calculer la dérivée de f(x) = x³ + 2x² - 5x + 1"
                className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
              />
            </div>

            <button
              onClick={handleSolve}
              disabled={!problemText.trim() || solveMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              {solveMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Résolution en cours...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Résoudre l'exercice
                </>
              )}
            </button>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Conseils pour une meilleure résolution :</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Écrivez l'énoncé de manière claire et complète</li>
                <li>• Utilisez les symboles mathématiques standards (x², √, ∫, etc.)</li>
                <li>• Précisez les consignes (résoudre, calculer, démontrer...)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
