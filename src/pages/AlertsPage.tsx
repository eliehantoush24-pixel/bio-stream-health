import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Heart, Droplets, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const alerts = [
  { id: 1, type: "critical" as const, icon: Heart, message: "Fatima Ali — Heart rate at 130 BPM (Critical)", time: "2 min ago" },
  { id: 2, type: "critical" as const, icon: Droplets, message: "Fatima Ali — SpO2 dropped to 88% (Critical)", time: "2 min ago" },
  { id: 3, type: "warning" as const, icon: Heart, message: "Sara Mohamed — Heart rate at 105 BPM (Elevated)", time: "8 min ago" },
  { id: 4, type: "warning" as const, icon: Droplets, message: "Sara Mohamed — SpO2 at 93% (Below normal)", time: "8 min ago" },
  { id: 5, type: "normal" as const, icon: CheckCircle, message: "Ahmed Al-Pasha — All vitals normal", time: "15 min ago" },
  { id: 6, type: "normal" as const, icon: CheckCircle, message: "Omar Hassan — All vitals normal", time: "20 min ago" },
];

const styles = {
  critical: { bg: "bg-critical/5 border-critical/20", icon: "text-critical", dot: "bg-critical" },
  warning: { bg: "bg-warning/5 border-warning/20", icon: "text-warning", dot: "bg-warning" },
  normal: { bg: "bg-success/5 border-success/20", icon: "text-success", dot: "bg-success" },
};

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Alerts & Notifications</h1>
          <p className="text-sm text-muted-foreground">Real-time health alerts from connected devices</p>
        </div>

        <div className="space-y-3">
          {alerts.map((a, i) => {
            const s = styles[a.type];
            return (
              <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`border ${s.bg}`}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full shrink-0 ${s.dot}`} />
                    <a.icon className={`h-4 w-4 shrink-0 ${s.icon}`} />
                    <p className="text-sm flex-1">{a.message}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />{a.time}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
