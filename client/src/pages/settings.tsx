import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Palette, Camera, Type, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoCapture, setAutoCapture] = useState(true);
  const [language, setLanguage] = useState("french");
  const [fontSize, setFontSize] = useState("medium");
  const [showSteps, setShowSteps] = useState(true);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mathsolver-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode || false);
      setAutoCapture(settings.autoCapture !== undefined ? settings.autoCapture : true);
      setLanguage(settings.language || "french");
      setFontSize(settings.fontSize || "medium");
      setShowSteps(settings.showSteps !== undefined ? settings.showSteps : true);
    }
    
    // Check current dark mode status
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const saveSettings = () => {
    const settings = {
      isDarkMode,
      autoCapture,
      language,
      fontSize,
      showSteps
    };
    localStorage.setItem('mathsolver-settings', JSON.stringify(settings));
    
    // Apply dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply font size
    document.documentElement.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px';
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Paramètres
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Personnalisez votre expérience MathSolver CI
          </p>
        </div>

        {/* Appearance Settings */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Ajustez l'apparence de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Mode sombre
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Basculer entre le thème clair et sombre
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Taille du texte
              </label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Petit</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="large">Grand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Camera Settings */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Camera className="h-5 w-5" />
              Appareil photo
            </CardTitle>
            <CardDescription>
              Configuration de la capture d'images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Capture automatique
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Analyser automatiquement après la prise de photo
                </p>
              </div>
              <Switch
                checked={autoCapture}
                onCheckedChange={setAutoCapture}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Langue de reconnaissance
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Solution Display Settings */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Type className="h-5 w-5" />
              Affichage des solutions
            </CardTitle>
            <CardDescription>
              Personnaliser l'affichage des résultats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Afficher les étapes détaillées
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Montrer chaque étape de résolution
                </p>
              </div>
              <Switch
                checked={showSteps}
                onCheckedChange={setShowSteps}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Settings Summary */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-300">
              Configuration actuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant={isDarkMode ? "default" : "secondary"}>
                {isDarkMode ? "Mode sombre" : "Mode clair"}
              </Badge>
              <Badge variant="secondary">
                Texte {fontSize === 'small' ? 'petit' : fontSize === 'large' ? 'grand' : 'moyen'}
              </Badge>
              <Badge variant={autoCapture ? "default" : "secondary"}>
                {autoCapture ? "Capture auto" : "Capture manuelle"}
              </Badge>
              <Badge variant="secondary">
                {language === 'french' ? 'Français' : 'Anglais'}
              </Badge>
              <Badge variant={showSteps ? "default" : "secondary"}>
                {showSteps ? "Étapes détaillées" : "Résultat simple"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={saveSettings} className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder les paramètres
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note :</strong> Les paramètres sont sauvegardés localement sur votre appareil. 
            Ils seront conservés même après fermeture de l'application.
          </p>
        </div>
      </div>
    </div>
  );
}