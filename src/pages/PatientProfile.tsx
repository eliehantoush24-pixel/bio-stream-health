import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { User, Calendar, FileText, Heart, Droplets, Download, Upload, FileDown, FileUp, Check, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const weeklyData = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return {
    day: d.toLocaleDateString([], { weekday: "short" }),
    date: d.toISOString().slice(0, 10),
    avgBpm: Math.floor(70 + Math.random() * 12),
    avgSpo2: Math.floor(95 + Math.random() * 4),
  };
});

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

function exportToCSV(data: typeof weeklyData) {
  const header = "Date,Day,Avg BPM,Avg SpO2\n";
  const rows = data.map((r) => `${r.date},${r.day},${r.avgBpm},${r.avgSpo2}`).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vitalink-health-data-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportToJSON(data: typeof weeklyData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vitalink-health-data-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

interface ImportedData {
  count: number;
  preview: { date: string; bpm: number; spo2: number }[];
}

function parseCSV(text: string): ImportedData | null {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return null;
  const rows = lines.slice(1).map((line) => {
    const parts = line.split(",");
    return { date: parts[0], bpm: parseInt(parts[2]), spo2: parseInt(parts[3]) };
  }).filter((r) => !isNaN(r.bpm) && !isNaN(r.spo2));
  if (rows.length === 0) return null;
  return { count: rows.length, preview: rows.slice(0, 5) };
}

function parseJSON(text: string): ImportedData | null {
  try {
    const arr = JSON.parse(text);
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const rows = arr.map((r: any) => ({
      date: r.date || r.day || "N/A",
      bpm: r.avgBpm ?? r.bpm ?? 0,
      spo2: r.avgSpo2 ?? r.spo2 ?? 0,
    })).filter((r) => r.bpm > 0 && r.spo2 > 0);
    if (rows.length === 0) return null;
    return { count: rows.length, preview: rows.slice(0, 5) };
  } catch {
    return null;
  }
}

export default function PatientProfile() {
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [importResult, setImportResult] = useState<ImportedData | null>(null);
  const [importError, setImportError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError("");
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      let result: ImportedData | null = null;
      if (file.name.endsWith(".csv")) {
        result = parseCSV(text);
      } else if (file.name.endsWith(".json")) {
        result = parseJSON(text);
      } else {
        setImportError("Unsupported file format. Please use .csv or .json files.");
        return;
      }
      if (result) {
        setImportResult(result);
      } else {
        setImportError("Could not parse any valid health data from the file.");
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    toast({ title: "Data imported", description: `${importResult?.count} records imported successfully.` });
    setImportOpen(false);
    setImportResult(null);
  };

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display">Patient Profile</h1>
            <p className="text-sm text-muted-foreground">Personal info & health history</p>
          </div>
          <div className="flex gap-2">
            {/* Import Dialog */}
            <Dialog open={importOpen} onOpenChange={(open) => { setImportOpen(open); if (!open) { setImportResult(null); setImportError(""); } }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Upload className="h-4 w-4" /> Import Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><FileUp className="h-5 w-5 text-primary" /> Import Health Data</DialogTitle>
                  <DialogDescription>Upload a CSV or JSON file with your health readings.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="import-file" className="text-xs">Select File</Label>
                    <Input id="import-file" type="file" accept=".csv,.json" onChange={handleFileUpload} />
                  </div>

                  {importError && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                      <AlertCircle className="h-4 w-4 shrink-0" /> {importError}
                    </div>
                  )}

                  {importResult && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-success bg-success/10 rounded-lg p-3">
                        <Check className="h-4 w-4 shrink-0" /> Found {importResult.count} valid records
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-2 font-medium">Date</th>
                              <th className="text-left p-2 font-medium">BPM</th>
                              <th className="text-left p-2 font-medium">SpO2</th>
                            </tr>
                          </thead>
                          <tbody>
                            {importResult.preview.map((r, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-2">{r.date}</td>
                                <td className="p-2">{r.bpm}</td>
                                <td className="p-2">{r.spo2}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {importResult.count > 5 && (
                          <p className="text-xs text-muted-foreground text-center py-1.5">
                            ...and {importResult.count - 5} more records
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setImportOpen(false)}>Cancel</Button>
                  <Button disabled={!importResult} onClick={confirmImport} className="gap-1.5">
                    <Upload className="h-4 w-4" /> Import
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Export Dialog */}
            <Dialog open={exportOpen} onOpenChange={setExportOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><FileDown className="h-5 w-5 text-primary" /> Export Health Data</DialogTitle>
                  <DialogDescription>Download your health readings in your preferred format.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 py-4">
                  <button
                    onClick={() => { exportToCSV(weeklyData); setExportOpen(false); toast({ title: "Exported", description: "CSV file downloaded." }); }}
                    className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                      <FileDown className="h-6 w-6 text-success" />
                    </div>
                    <span className="font-semibold text-sm">CSV</span>
                    <span className="text-xs text-muted-foreground text-center">Spreadsheet compatible</span>
                  </button>
                  <button
                    onClick={() => { exportToJSON(weeklyData); setExportOpen(false); toast({ title: "Exported", description: "JSON file downloaded." }); }}
                    className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileDown className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">JSON</span>
                    <span className="text-xs text-muted-foreground text-center">Developer friendly</span>
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-semibold">Ahmed Al-Pasha</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="font-semibold">24 years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Type</p>
                    <p className="font-semibold">A+</p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="h-3 w-3" /> Medical Notes</p>
                    <p className="text-sm mt-1">No known allergies. Regular monitoring for tachycardia episodes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Summary */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Avg Heart Rate", value: "76 BPM", icon: Heart, status: "Normal", color: "text-success" },
            { label: "Avg SpO2", value: "97%", icon: Droplets, status: "Normal", color: "text-success" },
            { label: "Last Checkup", value: "Mar 25", icon: Calendar, status: "Recent", color: "text-primary" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-semibold">{s.value}</p>
                  <span className={`text-xs font-medium ${s.color}`}>{s.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Weekly Charts */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Weekly Heart Rate</CardTitle></CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgBpm" stroke="hsl(0,85%,60%)" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Weekly SpO2</CardTitle></CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgSpo2" stroke="hsl(210,80%,55%)" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}