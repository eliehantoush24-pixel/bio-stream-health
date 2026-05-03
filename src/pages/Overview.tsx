import { Activity, Heart, Droplets, Cpu, Radio, ShieldCheck, ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/ThemeToggle";


export default function Overview() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const stats = [
    { value: "24/7", label: t("Live Monitoring"), icon: Activity },
    { value: "<1s", label: t("Alert Latency"), icon: Zap },
    { value: "256-bit", label: t("Encryption"), icon: ShieldCheck },
    { value: "MQTT", label: t("Streaming Protocol"), icon: Radio },
  ];

  const pipeline = [
    { step: "01", title: t("Sensor Capture"), desc: t("Arduino IR pulse oximeter samples heart rate and SpO2 every second."), icon: Cpu },
    { step: "02", title: t("Secure Stream"), desc: t("Readings are encrypted and pushed through MQTT to the cloud broker."), icon: Radio },
    { step: "03", title: t("Smart Analysis"), desc: t("AI evaluates trends, flags anomalies, and triggers thresholds in real time."), icon: Activity },
    { step: "04", title: t("Doctor Action"), desc: t("Notifications reach assigned doctors and patients with actionable context."), icon: Heart },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)/0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-heart/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-spo2/20 blur-3xl" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-xl bg-foreground text-background flex items-center justify-center">
            <Activity className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-base">HealthLink</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("Command Center")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 md:px-12">
        <section className="max-w-6xl mx-auto pt-16 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                <span className="h-px w-8 bg-foreground/40" />
                {t("IoT Health Intelligence")}
              </div>
              <h1 className="font-display text-[3.25rem] md:text-[5.5rem] font-extrabold leading-[0.95] tracking-tighter">
                {t("Vitals.")}
                <br />
                <span className="text-heart">{t("Decoded")}</span>{" "}
                <span className="text-muted-foreground/40">/</span>{" "}
                <span className="text-spo2">{t("Delivered")}</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("A unified operations layer for continuous patient monitoring — from the sensor on the finger to the doctor on call.")}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Button size="lg" className="h-12 px-7 gap-2 rounded-full" onClick={() => navigate("/login")}>
                  {t("Log In")}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  {t("System operational")}
                </div>
              </div>
            </motion.div>

            {/* Vital ticker card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("Live Stream")}</p>
                  <span className="text-[10px] text-success font-mono">● REC</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-heart animate-heartbeat" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("Heart Rate")}</p>
                        <p className="font-display font-bold text-2xl tabular-nums">78 <span className="text-xs text-muted-foreground font-normal">BPM</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] text-success">↑ 2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-spo2" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("Blood Oxygen (SpO2)")}</p>
                        <p className="font-display font-bold text-2xl tabular-nums">98<span className="text-xs text-muted-foreground font-normal">%</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">— stable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border divide-x divide-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-4 md:px-6 py-6"
              >
                <s.icon className="h-4 w-4 text-muted-foreground mb-3" />
                <p className="font-display text-2xl md:text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pipeline */}
        <section className="max-w-6xl mx-auto pb-24">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{t("How it works")}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{t("From sensor to doctor in seconds")}</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t("Every reading travels a secure, observable pipeline — engineered for clinical-grade reliability.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {pipeline.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-6 hover:bg-card transition-colors group relative"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs text-muted-foreground">{p.step}</span>
                  <p.icon className="h-5 w-5 text-foreground/60 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-6xl mx-auto pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.18),transparent_60%)]" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
                {t("Step into the command center.")}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                {t("Sign in to access the live monitoring dashboard, alerts, and patient records.")}
              </p>
              <Button size="lg" className="mt-8 h-12 px-8 rounded-full gap-2" onClick={() => navigate("/login")}>
                {t("Log In")}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} HealthLink</span>
        <span className="font-mono">{t("Command Center")} · v2.0</span>
      </footer>
    </div>
  );
}
