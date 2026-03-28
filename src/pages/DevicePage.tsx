import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Wifi, WifiOff, Radio, RefreshCw, Play } from "lucide-react";
import { useSimulatedData } from "@/hooks/useSimulatedData";
import { motion } from "framer-motion";

export default function DevicePage() {
  const { isConnected, toggleConnection, latest } = useSimulatedData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Device Management</h1>
          <p className="text-sm text-muted-foreground">Arduino sensor connection & status</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cpu className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold font-display">Arduino Uno R3</h2>
                    <p className="text-sm text-muted-foreground">MAX30102 IR Pulse Oximeter Sensor</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant={isConnected ? "default" : "destructive"} className="mt-1 gap-1">
                        {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                        {isConnected ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sensor</p>
                      <p className="text-sm font-medium mt-1 flex items-center gap-1"><Radio className="h-3 w-3" /> IR Infrared</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last BPM</p>
                      <p className="text-sm font-medium mt-1">{latest?.bpm ?? "--"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last SpO2</p>
                      <p className="text-sm font-medium mt-1">{latest?.spo2 ?? "--"}%</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant={isConnected ? "destructive" : "default"} size="sm" onClick={toggleConnection}>
                      {isConnected ? <WifiOff className="h-4 w-4 mr-1" /> : <Wifi className="h-4 w-4 mr-1" />}
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" /> Simulate Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Log */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Connection Log</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {[
                { time: "10:32:15", msg: "Device connected via USB Serial", type: "success" },
                { time: "10:32:16", msg: "MAX30102 sensor initialized", type: "success" },
                { time: "10:32:17", msg: "First reading received: BPM=76, SpO2=97%", type: "info" },
                { time: "10:35:42", msg: "Data transmission stable — 20 readings/min", type: "info" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs text-muted-foreground font-mono shrink-0">{log.time}</span>
                  <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${log.type === "success" ? "bg-success" : "bg-primary"}`} />
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
