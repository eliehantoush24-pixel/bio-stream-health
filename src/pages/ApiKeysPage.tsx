import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, RefreshCw, Key, Shield, Trash2, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  label: string;
  key: string;
  type: "write" | "read";
  createdAt: string;
  lastUsed: string | null;
}

const generateKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: "1",
      label: "Arduino Uno - Write",
      key: generateKey(),
      type: "write",
      createdAt: "2025-03-25",
      lastUsed: "2025-03-28",
    },
    {
      id: "2",
      label: "Dashboard - Read",
      key: generateKey(),
      type: "read",
      createdAt: "2025-03-25",
      lastUsed: "2025-03-27",
    },
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [externalKey, setExternalKey] = useState("");
  const [externalLabel, setExternalLabel] = useState("");

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = useCallback((id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    toast({ title: "Copied!", description: "API key copied to clipboard." });
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const regenerateKey = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, key: generateKey(), lastUsed: null } : k))
    );
    toast({ title: "Key regenerated", description: "Your old key is now invalid." });
  };

  const generateNewKey = (type: "write" | "read") => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      label: type === "write" ? "New Write Key" : "New Read Key",
      key: generateKey(),
      type,
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: null,
    };
    setKeys((prev) => [...prev, newKey]);
    toast({ title: "Key generated", description: `New ${type} API key created.` });
  };

  const deleteKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast({ title: "Key deleted", description: "The API key has been removed." });
  };

  const saveExternalKey = () => {
    if (!externalKey.trim() || !externalLabel.trim()) {
      toast({ title: "Missing fields", description: "Please enter both a label and key.", variant: "destructive" });
      return;
    }
    const newKey: ApiKey = {
      id: Date.now().toString(),
      label: externalLabel.trim(),
      key: externalKey.trim(),
      type: "read",
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: null,
    };
    setKeys((prev) => [...prev, newKey]);
    setExternalKey("");
    setExternalLabel("");
    toast({ title: "Key saved", description: "External API key has been stored." });
  };

  const maskKey = (key: string) => key.slice(0, 6) + "••••••••••••••••••" + key.slice(-4);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage authentication keys for your Arduino device and external services
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => generateNewKey("write")} className="gap-1.5">
            <Plus className="h-4 w-4" /> Generate Write Key
          </Button>
          <Button size="sm" variant="outline" onClick={() => generateNewKey("read")} className="gap-1.5">
            <Plus className="h-4 w-4" /> Generate Read Key
          </Button>
        </div>

        {/* Generated keys */}
        <div className="space-y-3">
          {keys.map((apiKey, i) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Key className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{apiKey.label}</p>
                          <Badge
                            variant={apiKey.type === "write" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {apiKey.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          {visibleKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleVisibility(apiKey.id)}>
                        {visibleKeys[apiKey.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyKey(apiKey.id, apiKey.key)}>
                        {copiedId === apiKey.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => regenerateKey(apiKey.id)}>
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteKey(apiKey.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2 text-[11px] text-muted-foreground pl-12">
                    <span>Created: {apiKey.createdAt}</span>
                    <span>Last used: {apiKey.lastUsed ?? "Never"}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* External key input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Add External API Key
            </CardTitle>
            <CardDescription>
              Paste an API key from a third-party service (e.g., cloud MQTT broker, webhook endpoint)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-end">
              <div className="space-y-1.5">
                <Label htmlFor="ext-label" className="text-xs">Label</Label>
                <Input
                  id="ext-label"
                  placeholder="e.g. MQTT Broker"
                  value={externalLabel}
                  onChange={(e) => setExternalLabel(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ext-key" className="text-xs">API Key</Label>
                <Input
                  id="ext-key"
                  type="password"
                  placeholder="Paste your key here"
                  value={externalKey}
                  onChange={(e) => setExternalKey(e.target.value)}
                />
              </div>
              <Button onClick={saveExternalKey} className="gap-1.5">
                <Plus className="h-4 w-4" /> Save Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage guide */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Arduino Integration Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-foreground">{`// Arduino HTTP POST example
#include <WiFi.h>
#include <HTTPClient.h>

const char* API_KEY = "YOUR_WRITE_API_KEY";
const char* endpoint = "https://api.vitalink.io/v1/data";

void sendReading(int bpm, int spo2) {
  HTTPClient http;
  http.begin(endpoint);
  http.addHeader("Authorization", "Bearer " + String(API_KEY));
  http.addHeader("Content-Type", "application/json");

  String payload = "{\\"bpm\\":" + String(bpm) 
                 + ",\\"spo2\\":" + String(spo2) + "}";

  int code = http.POST(payload);
  Serial.println("Response: " + String(code));
  http.end();
}`}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
