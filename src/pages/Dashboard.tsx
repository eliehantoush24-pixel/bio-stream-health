import { Heart, Droplets, Wifi, WifiOff, Clock, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSimulatedData } from "@/hooks/useSimulatedData";
import { motion, AnimatePresence } from "framer-motion";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useI18n } from "@/hooks/useI18n";

function getStatus(value: number, type: "bpm" | "spo2") {
  if (type === "bpm") {
    if (value > 120 || value < 50) return "critical";
    if (value > 100 || value < 60) return "warning";
    return "normal";
  }
  if (value < 90) return "critical";
  if (value < 95) return "warning";
  return "normal";
}

function StatusBadge({ value, type }: { value: number; type: "bpm" | "spo2" }) {
  const { t } = useI18n();
  const status = getStatus(value, type);
  const statusConfig = {
    normal: { label: t("Normal"), color: "bg-success/10 text-success border-success/20" },
    warning: { label: t("Warning"), color: "bg-warning/10 text-warning border-warning/20" },
    critical: { label: t("Critical"), color: "bg-critical/10 text-critical border-critical/20" },
  };
  const { label, color } = statusConfig[status];
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>{label}</span>;
}

function VitalGauge({ value, min, max, label, unit, type }: { value: number; min: number; max: number; label: string; unit: string; type: "bpm" | "spo2" }) {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const status = getStatus(value, type);
  const barColor = status === "normal" ? "bg-success" : status === "warning" ? "bg-warning" : "bg-critical";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{value} {unit}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground/60">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data, latest, isConnected } = useSimulatedData();
  const { t } = useI18n();

  const avgBpm = data.length ? Math.round(data.reduce((s, d) => s + d.bpm, 0) / data.length) : 0;
  const avgSpo2 = data.length ? Math.round(data.reduce((s, d) => s + d.spo2, 0) / data.length) : 0;
  const maxBpm = data.length ? Math.max(...data.map(d => d.bpm)) : 0;
  const minBpm = data.length ? Math.min(...data.map(d => d.bpm)) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display">{t("Patient Monitor")}</h1>
            <p className="text-sm text-muted-foreground">{t("Real-time heart rate & blood oxygen tracking")}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isConnected ? "default" : "destructive"} className="gap-1.5">
              {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {isConnected ? t("Sensor Active") : t("Disconnected")}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {latest?.time}
            </div>
          </div>
        </div>

        {/* Digital Vital Signs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="metric-glow-heart border-heart/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-heart/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-heart" />
                  {t("Heart Rate")}
                </CardTitle>
                <Heart className="h-6 w-6 text-heart animate-heartbeat" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={latest?.bpm}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-5xl font-bold font-display text-heart tabular-nums"
                    >
                      {latest?.bpm ?? "--"}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-base text-muted-foreground mb-1.5">BPM</span>
                </div>
                <StatusBadge value={latest?.bpm ?? 0} type="bpm" />
                <VitalGauge value={latest?.bpm ?? 0} min={40} max={140} label={t("Current Range")} unit="BPM" type="bpm" />
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Avg")}</p>
                    <p className="text-sm font-semibold text-heart">{avgBpm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-0.5"><TrendingUp className="h-2.5 w-2.5" /> {t("Max")}</p>
                    <p className="text-sm font-semibold">{maxBpm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-0.5"><TrendingDown className="h-2.5 w-2.5" /> {t("Min")}</p>
                    <p className="text-sm font-semibold">{minBpm}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="metric-glow-spo2 border-spo2/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-spo2/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-spo2" />
                  {t("Blood Oxygen (SpO2)")}
                </CardTitle>
                <Droplets className="h-6 w-6 text-spo2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={latest?.spo2}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-5xl font-bold font-display text-spo2 tabular-nums"
                    >
                      {latest?.spo2 ?? "--"}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-base text-muted-foreground mb-1.5">%</span>
                </div>
                <StatusBadge value={latest?.spo2 ?? 0} type="spo2" />
                <VitalGauge value={latest?.spo2 ?? 0} min={80} max={100} label={t("Saturation Level")} unit="%" type="spo2" />
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Average")}</p>
                    <p className="text-sm font-semibold text-spo2">{avgSpo2}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Status")}</p>
                    <p className="text-sm font-semibold">{avgSpo2 >= 95 ? t("Healthy") : t("Low")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Live Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 text-heart" />
                  {t("Heart Rate Trend")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="bpmGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(0, 85%, 60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(0, 85%, 60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                      <YAxis domain={[50, 110]} tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="bpm" stroke="hsl(0, 85%, 60%)" strokeWidth={2} fill="url(#bpmGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-spo2" />
                  {t("SpO2 Trend")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="spo2Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                      <YAxis domain={[88, 100]} tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="spo2" stroke="hsl(210, 80%, 55%)" strokeWidth={2} fill="url(#spo2Grad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
