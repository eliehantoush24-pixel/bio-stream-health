import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved ECG background intensity before first paint.
(function initEcgIntensity() {
  const LIGHT = { off: "0", low: "0.08", medium: "0.18", high: "0.32" } as const;
  const DARK = { off: "0", low: "0.05", medium: "0.10", high: "0.20" } as const;
  const stored = (localStorage.getItem("ecg-intensity") as keyof typeof LIGHT) || "medium";
  const level = stored in LIGHT ? stored : "medium";
  const root = document.documentElement;
  root.dataset.ecg = level;
  root.style.setProperty("--ecg-opacity-light", LIGHT[level]);
  root.style.setProperty("--ecg-opacity-dark", DARK[level]);
})();

createRoot(document.getElementById("root")!).render(<App />);
