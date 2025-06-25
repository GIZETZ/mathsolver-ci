import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// 🔽 Enregistrement du Service Worker (important pour PWA et APK)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré avec succès :", registration);
      })
      .catch((error) => {
        console.error("❌ Échec d'enregistrement du Service Worker :", error);
      });
  });
}
