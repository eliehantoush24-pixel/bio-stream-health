import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Intensity = "off" | "low" | "medium" | "high";

const ORDER: Intensity[] = ["off", "low", "medium", "high"];

// Light-mode and dark-mode opacity values per intensity level.
const LIGHT_OPACITY: Record<Intensity, string> = {
  off: "0",
  low: "0.08",
  medium: "0.18",
  high: "0.32",
};
const DARK_OPACITY: Record<Intensity, string> = {
  off: "0",
  low: "0.05",
  medium: "0.10",
  high: "0.20",
};

function applyIntensity(level: Intensity) {
  const root = document.documentElement;
  root.dataset.ecg = level;
  root.style.setProperty("--ecg-opacity-light", LIGHT_OPACITY[level]);
  root.style.setProperty("--ecg-opacity-dark", DARK_OPACITY[level]);
}

export function getInitialEcgIntensity(): Intensity {
  if (typeof window === "undefined") return "medium";
  const stored = localStorage.getItem("ecg-intensity") as Intensity | null;
  return stored && ORDER.includes(stored) ? stored : "medium";
}

export function EcgIntensityToggle() {
  const [level, setLevel] = useState<Intensity>(getInitialEcgIntensity);

  useEffect(() => {
    applyIntensity(level);
    localStorage.setItem("ecg-intensity", level);
  }, [level]);

  const cycle = () => {
    const idx = ORDER.indexOf(level);
    setLevel(ORDER[(idx + 1) % ORDER.length]);
  };

  const labelMap: Record<Intensity, string> = {
    off: "Off",
    low: "Low",
    medium: "Med",
    high: "High",
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycle}
      aria-label={`ECG background intensity: ${labelMap[level]}`}
      title={`ECG background: ${labelMap[level]}`}
      className="gap-1.5 h-9 px-2"
    >
      <Activity
        className={`h-4 w-4 ${level === "off" ? "opacity-40" : "text-primary"}`}
      />
      <span className="text-xs font-medium hidden sm:inline">
        {labelMap[level]}
      </span>
    </Button>
  );
}
