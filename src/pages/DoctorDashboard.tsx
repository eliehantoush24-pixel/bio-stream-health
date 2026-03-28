import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Droplets, Search, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const patients = [
  { id: 1, name: "Ahmed Al-Pasha", age: 24, bpm: 78, spo2: 97, status: "normal" as const, data: Array.from({ length: 10 }, () => ({ v: 68 + Math.random() * 20 })) },
  { id: 2, name: "Sara Mohamed", age: 31, bpm: 105, spo2: 93, status: "warning" as const, data: Array.from({ length: 10 }, () => ({ v: 90 + Math.random() * 20 })) },
  { id: 3, name: "Omar Hassan", age: 45, bpm: 72, spo2: 98, status: "normal" as const, data: Array.from({ length: 10 }, () => ({ v: 65 + Math.random() * 15 })) },
  { id: 4, name: "Fatima Ali", age: 28, bpm: 130, spo2: 88, status: "critical" as const, data: Array.from({ length: 10 }, () => ({ v: 110 + Math.random() * 30 })) },
  { id: 5, name: "Youssef Khaled", age: 55, bpm: 68, spo2: 96, status: "normal" as const, data: Array.from({ length: 10 }, () => ({ v: 62 + Math.random() * 12 })) },
];

const statusColors = {
  normal: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-critical/10 text-critical border-critical/20",
};

export default function DoctorDashboard() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Doctor Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor all patients</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display">{patients.length}</p><p className="text-xs text-muted-foreground">Total Patients</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display text-success">{patients.filter(p => p.status === "normal").length}</p><p className="text-xs text-muted-foreground">Normal</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display text-warning">{patients.filter(p => p.status === "warning").length}</p><p className="text-xs text-muted-foreground">Warning</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold font-display text-critical">{patients.filter(p => p.status === "critical").length}</p><p className="text-xs text-muted-foreground">Critical</p></CardContent></Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${selected === p.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-semibold text-primary">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Age: {p.age}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden sm:block w-24 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={p.data}>
                            <Line type="monotone" dataKey="v" stroke={p.status === "critical" ? "hsl(0,72%,55%)" : p.status === "warning" ? "hsl(38,92%,55%)" : "hsl(152,55%,48%)"} strokeWidth={1.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="h-3.5 w-3.5 text-heart" />
                        <span className="font-medium">{p.bpm}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Droplets className="h-3.5 w-3.5 text-spo2" />
                        <span className="font-medium">{p.spo2}%</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[p.status]}`}>
                        {p.status === "critical" && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {selected === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">Latest readings updated in real-time from the patient's Arduino sensor device.</p>
                      <Button size="sm" className="mt-2" onClick={(e) => { e.stopPropagation(); }}>View Full Profile</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
