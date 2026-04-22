import { Heart, Activity, Droplets, Bell, ShieldCheck, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import bg from "@/assets/medical-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const features = [
    { icon: Activity, title: t("Real-time Monitoring"), desc: t("Continuous heart rate & SpO2 tracking from your IoT device.") },
    { icon: Bell, title: t("Smart Alerts"), desc: t("Instant notifications when vitals leave the safe range.") },
    { icon: Stethoscope, title: t("Doctor Access"), desc: t("Share live data with your physician for remote care.") },
    { icon: ShieldCheck, title: t("Secure & Private"), desc: t("Your medical data is encrypted and protected end-to-end.") },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with adaptive overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/70 dark:bg-background/85 backdrop-blur-[2px]" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display font-bold text-lg">HealthLink</span>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            {t("Log In")}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 md:px-10">
        <section className="max-w-5xl mx-auto pt-12 md:pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t("IoT Health Monitor")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.05] bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent"
          >
            {t("Your Vitals, Always Connected")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-light tracking-wide"
          >
            {t("HealthLink is an IoT-powered platform that continuously measures heart rate and blood oxygen using an Arduino sensor, streams readings in real time, and connects patients with doctors for proactive care.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" className="gap-2 px-7" onClick={() => navigate("/login")}>
              {t("Log In to Platform")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Floating vital chips */}
          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3"
            >
              <Heart className="h-5 w-5 text-heart animate-heartbeat" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("Heart Rate")}</p>
                <p className="font-display font-bold text-foreground">78 <span className="text-xs font-normal text-muted-foreground">BPM</span></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3"
            >
              <Droplets className="h-5 w-5 text-spo2" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("Blood Oxygen (SpO2)")}</p>
                <p className="font-display font-bold text-foreground">98<span className="text-xs font-normal text-muted-foreground">%</span></p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Objectives */}
        <section className="max-w-6xl mx-auto pb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold">{t("Project Objectives")}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t("Empowering patients and doctors with continuous, accessible, and intelligent vital sign monitoring.")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full p-5 glass-card hover:border-primary/30 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HealthLink · {t("IoT Health Monitor")}
      </footer>
    </div>
  );
}
