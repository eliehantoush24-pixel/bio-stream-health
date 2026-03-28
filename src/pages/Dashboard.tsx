import { Heart, Droplets, Wifi, WifiOff, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useSimulatedData } from "@/hooks/useSimulatedData";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function StatusBadge({ value, type }: { value: number; type: "bpm" | "spo2" }) {
  let status: "normal" | "warning" | "critical" = "normal";
  if (type === "bpm") {
    if (value > 100 || value < 60) status = "warning";
    if (value > 120 || value < 50) status = "critical";
  } else {
    if (value < 95) status = "warning";
    if (value < 90) status = "critical";
  }

  const colors = {
    normal: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    critical: "bg-critical/10 text-critical border-critical/20",
  };

  const labels = { normal: "Normal", warning: "Warning", critical: "Critical" };

  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>{labels[status]}</span>;
}

export default function Dashboard() {
  const { data, latest, isConnected } = useSimulatedData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold font-display">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time health monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isConnected ? "default" : "destructive"} className="gap-1.5">
              {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {latest?.time}
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="metric-glow-heart border-heart/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Heart Rate</CardTitle>
                <Heart className="h-5 w-5 text-heart animate-heartbeat" />
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold font-display text-heart">{latest?.bpm ?? "--"}</span>
                  <span className="text-sm text-muted-foreground mb-1">BPM</span>
                </div>
                <div className="mt-2">
                  <StatusBadge value={latest?.bpm ?? 0} type="bpm" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="metric-glow-spo2 border-spo2/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Blood Oxygen (SpO2)</CardTitle>
                <Droplets className="h-5 w-5 text-spo2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold font-display text-spo2">{latest?.spo2 ?? "--"}</span>
                  <span className="text-sm text-muted-foreground mb-1">%</span>
                </div>
                <div className="mt-2">
                  <StatusBadge value={latest?.spo2 ?? 0} type="spo2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Heart Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                    <YAxis domain={[50, 110]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bpm" stroke="hsl(0, 85%, 60%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">SpO2 Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                    <YAxis domain={[88, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="spo2" stroke="hsl(210, 80%, 55%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
