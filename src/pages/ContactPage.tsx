import { useState } from "react";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, LifeBuoy, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check your input", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
    }, 800);
  };

  const channels = [
    { icon: Mail, label: "Email", value: "support@healthlink.io", hint: "24/7 inbox" },
    { icon: Phone, label: "Phone", value: "+1 (555) 010-2025", hint: "Mon–Fri, 9am–6pm" },
    { icon: MapPin, label: "Office", value: "221B Wellness Ave, Boston, MA", hint: "By appointment" },
    { icon: Globe, label: "Website", value: "www.healthlink.io", hint: "Docs & guides" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Contact Us</h1>
          <p className="text-sm text-muted-foreground">Get more information or reach our support team</p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <motion.div key={c.label} variants={item}>
              <Card className="h-full">
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

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-display">
                  <MessageCircle className="h-5 w-5 text-primary" /> Send us a message
                </CardTitle>
                <CardDescription>Tell us how we can help — we typically respond within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={form.name} maxLength={100}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} maxLength={255}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={form.subject} maxLength={150}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={6} value={form.message} maxLength={1000}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share details so we can assist you better..." />
                    <p className="text-[11px] text-muted-foreground text-right">{form.message.length}/1000</p>
                  </div>
                  <Button type="submit" disabled={submitting} className="gap-2">
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-display">
                  <Clock className="h-4 w-4 text-primary" /> Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Mon – Fri</span><span>9:00 – 18:00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span>10:00 – 14:00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span>Closed</span></div>
                <div className="flex justify-between pt-2 border-t"><span className="text-muted-foreground">Emergency</span><span className="font-medium text-primary">24/7</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-display">
                  <LifeBuoy className="h-4 w-4 text-primary" /> Quick Help
                </CardTitle>
                <CardDescription>Common topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Connecting your Arduino device", "Managing API keys", "Reading BPM & SpO2 data", "Patient–doctor chat"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
