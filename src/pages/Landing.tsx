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
    { icon: Activity, title: t("Real-time Monitoring"), desc: t("Continuous heart rate & SpO2 tracking from your IoT device with millisecond precision.") },
    { icon: Bell, title: t("Smart Alerts"), desc: t("AI-powered instant notifications when vitals leave the safe range, with customizable thresholds.") },
    { icon: Stethoscope, title: t("Doctor Access"), desc: t("Seamless data sharing with healthcare providers for remote diagnostics and timely interventions.") },
    { icon: ShieldCheck, title: t("Secure & Private"), desc: t("End-to-end encryption with HIPAA-compliant data handling and role-based access controls.") },
  ];

  const objectives = [
    { title: t("Continuous Health Tracking"), desc: t("Enable 24/7 monitoring of vital signs through affordable Arduino-based IoT sensors, making healthcare accessible to everyone regardless of location or economic status.") },
    { title: t("Early Warning System"), desc: t("Detect abnormal patterns in heart rate and blood oxygen levels before they become critical, enabling preventive care and reducing emergency situations.") },
    { title: t("Remote Patient Care"), desc: t("Bridge the gap between patients and healthcare providers through real-time data sharing, allowing doctors to monitor multiple patients remotely and intervene when necessary.") },
    { title: t("Data-Driven Decisions"), desc: t("Transform raw sensor data into actionable insights with trend analysis, historical reports, and intelligent recommendations for better health management.") },
    { title: t("Patient Empowerment"), desc: t("Give patients visibility into their own health metrics, fostering proactive health management and informed conversations with medical professionals.") },
    { title: t("Scalable Architecture"), desc: t("Build a robust, extensible platform that can integrate with various medical devices and scale to support hospitals, clinics, and home care simultaneously.") },
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
              {t("Log In")}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* Detailed Mission Objectives */}
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
            <div className="text-center mb-10">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">{t("Our Mission")}</h3>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("HealthLink was developed to address the growing need for accessible, continuous health monitoring. By combining IoT technology with modern web platforms, we aim to democratize healthcare and bring hospital-grade monitoring to every home.")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectives.map((obj, i) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">
                      {i + 1}
                    </span>
                    {obj.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-12 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("Powered By")}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>Arduino IoT</span>
              <span className="text-border">•</span>
              <span>React & TypeScript</span>
              <span className="text-border">•</span>
              <span>Real-time MQTT</span>
              <span className="text-border">•</span>
              <span>Cloud Database</span>
              <span className="text-border">•</span>
              <span>AI Analytics</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HealthLink · {t("IoT Health Monitor")}
      </footer>
    </div>
  );
}
