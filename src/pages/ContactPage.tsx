import { useState } from "react";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  LifeBuoy,
  Globe,
  ShieldCheck,
  Activity,
  HeartPulse,
  Cpu,
  KeyRound,
  Users,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  category: z.string().trim().min(1, "Please choose a category"),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Please add at least 10 characters").max(1000),
});

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check your input",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", category: "", subject: "", message: "" });
      toast({
        title: "Message sent",
        description: "Our team will respond within 24 hours.",
      });
    }, 800);
  };

  const channels = [
    {
      icon: Mail,
      label: "Email Support",
      value: "support@healthlink.io",
      hint: "Replies within 24 hours",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 010-2025",
      hint: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: MapPin,
      label: "Headquarters",
      value: "221B Wellness Ave, Boston, MA",
      hint: "Visits by appointment",
    },
    {
      icon: Globe,
      label: "Website & Docs",
      value: "www.healthlink.io",
      hint: "Guides, API & tutorials",
    },
  ];

  const helpTopics = [
    {
      icon: Cpu,
      title: "Device Setup",
      desc: "Pair your Arduino, configure the IR sensor, and stream BPM & SpO2 in minutes.",
    },
    {
      icon: KeyRound,
      title: "API Keys & MQTT",
      desc: "Generate 32-char keys, secure your endpoints and publish data through MQTT or webhooks.",
    },
    {
      icon: HeartPulse,
      title: "Health Monitoring",
      desc: "Understand BPM, SpO2 readings, gauges, trends and abnormal value alerts.",
    },
    {
      icon: Users,
      title: "Patient ↔ Doctor",
      desc: "Direct chat, profile sharing, and real-time alerts between patients and clinicians.",
    },
  ];

  const faqs = [
    {
      q: "How fast will I get a response?",
      a: "Most tickets are answered within 24 hours. Emergency device or data-loss issues are handled 24/7 via the priority email line.",
    },
    {
      q: "Is my health data secure?",
      a: "Yes. All readings are transmitted over TLS, stored encrypted at rest, and protected by role-based access. Only you and clinicians you authorize can view your records.",
    },
    {
      q: "Can I export or import my health records?",
      a: "Absolutely. You can export your data in CSV or JSON from your profile, and re-import it later — duplicates are merged automatically.",
    },
    {
      q: "My device isn't connecting. What should I check?",
      a: "Verify your Wi-Fi credentials, confirm the API key is exactly 32 characters, and make sure the MQTT broker URL matches the one shown on the Device page.",
    },
    {
      q: "Do you offer support for clinics and hospitals?",
      a: "Yes. We provide multi-seat plans, custom dashboards, and dedicated onboarding for medical teams. Use the form with category 'Partnership' to get in touch.",
    },
  ];

  const slas = [
    { label: "Critical (device down, data loss)", time: "< 2 hours", tone: "destructive" as const },
    { label: "High (account / billing)", time: "< 8 hours", tone: "default" as const },
    { label: "Standard (questions, feedback)", time: "< 24 hours", tone: "secondary" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-3 gap-1">
                <Sparkles className="h-3 w-3" /> We're here to help
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold font-display">Contact HealthLink</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Questions about your device, your data, or how to get the most out of HealthLink?
                Our medical-tech support team is ready to help patients, doctors, and partners.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1"><ShieldCheck className="h-3 w-3" /> HIPAA-aware</Badge>
              <Badge variant="outline" className="gap-1"><Activity className="h-3 w-3" /> 99.9% uptime</Badge>
              <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" /> 24h response</Badge>
            </div>
          </div>
        </motion.div>

        {/* Channels */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {channels.map((c) => (
            <motion.div key={c.label} variants={item}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-5 space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-medium break-words">{c.value}</p>
                  <p className="text-[11px] text-muted-foreground">{c.hint}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Form + side info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-display">
                  <MessageCircle className="h-5 w-5 text-primary" /> Send us a message
                </CardTitle>
                <CardDescription>
                  Pick a category so we can route your message to the right specialist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        maxLength={100}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        maxLength={255}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => setForm({ ...form, category: v })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="device">Device & sensors</SelectItem>
                          <SelectItem value="account">Account & billing</SelectItem>
                          <SelectItem value="medical">Medical / data question</SelectItem>
                          <SelectItem value="partnership">Clinic / partnership</SelectItem>
                          <SelectItem value="feedback">Feedback & ideas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        maxLength={150}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Short summary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      maxLength={1000}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your question — include device ID, screenshots or steps to reproduce if relevant."
                    />
                    <p className="text-[11px] text-muted-foreground text-right">
                      {form.message.length}/1000
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Your message is encrypted in transit and never shared with third parties.
                    </p>
                    <Button type="submit" disabled={submitting} className="gap-2">
                      <Send className="h-4 w-4" />
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-display">
                  <Clock className="h-4 w-4 text-primary" /> Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mon – Fri</span>
                  <span>9:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>10:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Emergency line</span>
                  <span className="font-medium text-primary">24/7</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-display">
                  <AlertTriangle className="h-4 w-4 text-primary" /> Response SLAs
                </CardTitle>
                <CardDescription>What to expect after you write to us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {slas.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">{s.label}</span>
                    <Badge variant={s.tone}>{s.time}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-display">
                  <LifeBuoy className="h-4 w-4 text-primary" /> Before reaching out
                </CardTitle>
                <CardDescription>Quick self-help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {[
                  "Restart your Arduino device and check Wi-Fi.",
                  "Confirm your API key is exactly 32 characters.",
                  "Check the Device page for the last received reading.",
                  "Open Chat to message your assigned doctor directly.",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Help topics */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-3">What can we help you with?</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {helpTopics.map((t) => (
              <motion.div key={t.title} variants={item}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-5 space-y-2">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <t.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold">{t.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FAQ + community */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <BookOpen className="h-5 w-5 text-primary" /> Frequently asked questions
              </CardTitle>
              <CardDescription>Answers to the most common questions we receive.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-display">
                <Users className="h-4 w-4 text-primary" /> Join the community
              </CardTitle>
              <CardDescription>Tips, updates and direct contact with our team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <Github className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-xs text-muted-foreground">Open-source SDK & samples</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">Company news & partnerships</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <Twitter className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Twitter / X</p>
                  <p className="text-xs text-muted-foreground">Status updates & releases</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
