import { useNavigate } from "react-router-dom";
import { Heart, Shield, Wifi, ArrowRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";

const features = [
  { icon: Heart, titleKey: "Real-time Monitoring", descKey: "Track heart rate and SpO2 levels continuously with IoT sensors" },
  { icon: Shield, titleKey: "Smart Alerts", descKey: "Get instant notifications when vitals go beyond safe thresholds" },
  { icon: Wifi, titleKey: "IoT Connected", descKey: "Seamless Arduino-based sensor integration via WiFi connectivity" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-spo2/5 blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-heart/5 blur-[80px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">HealthLink</span>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-20 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Floating heartbeat icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-heart/10 border border-heart/20"
          >
            <Heart className="h-10 w-10 text-heart" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-4">
            {t("IoT Health")}
            <br />
            <span className="text-primary">{t("Monitoring System")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {t("A smart patient monitoring platform powered by Arduino IoT sensors. Track heart rate and blood oxygen levels in real-time with instant alerts for healthcare professionals.")}
          </p>

          <p className="text-sm text-muted-foreground/70 mb-8">
            {t("Graduation Project")} — {t("IoT Health Monitoring System")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              onClick={() => navigate("/login")}
            >
              <Stethoscope className="h-5 w-5" />
              {t("Doctor Login")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-8 text-base"
              onClick={() => navigate("/login")}
            >
              <Heart className="h-5 w-5" />
              {t("Patient Login")}
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold font-display mb-2">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-muted-foreground/60">
        © 2026 VitaLink — {t("IoT Health Monitoring System")}
      </footer>
    </div>
  );
}
