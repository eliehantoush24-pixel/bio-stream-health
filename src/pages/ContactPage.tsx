import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, MessageCircle, Clock, LifeBuoy,
  HelpCircle, Stethoscope, Cpu, ShieldCheck, Building2, ChevronDown,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  topic: z.string().min(1, "Please choose a topic"),
  subject: z.string().trim().min(1, "Subject is required").max(150, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

const topics = [
  { value: "medical", label: "Medical / Clinical question", icon: Stethoscope },
  { value: "device", label: "Arduino device & setup", icon: Cpu },
  { value: "account", label: "Account & billing", icon: ShieldCheck },
  { value: "partnership", label: "Partnership / Hospitals", icon: Building2 },
  { value: "other", label: "Something else", icon: HelpCircle },
];

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@healthlink.io",
    hint: "Best for non-urgent questions · replies within 24h",
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    label: "Call support",
    value: "+1 (555) 014-2280",
    hint: "Mon–Fri, 9am–6pm EST",
    accent: "text-spo2",
    bg: "bg-spo2/10",
  },
  {
    icon: LifeBuoy,
    label: "Emergency line",
    value: "24/7 critical alerts",
    hint: "For abnormal readings & device outages",
    accent: "text-heart",
    bg: "bg-heart/10",
  },
  {
    icon: MapPin,
    label: "Visit our office",
    value: "120 Wellness Ave, Boston, MA",
    hint: "By appointment only",
    accent: "text-success",
    bg: "bg-success/10",
  },
];

const faqs = [
  {
    q: "How quickly will I get a response?",
    a: "Most emails are answered within one business day. Emergency line calls are picked up 24/7 for critical health alerts and device outages.",
  },
  {
    q: "I'm a patient — should I contact my doctor here?",
    a: "No. For medical advice please reach your doctor directly through the in-app Chat. This form is for HealthLink platform support, not clinical consultations.",
  },
  {
    q: "My Arduino device isn't sending data. What do I do?",
    a: "Check the Device page for connection status and your API key. If the issue persists, contact us with topic ‘Arduino device & setup’ and include your device ID.",
  },
  {
    q: "Do you offer hospital or clinic partnerships?",
    a: "Yes. Choose ‘Partnership / Hospitals’ as your topic and tell us about your facility, patient volume, and integration needs.",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", topic: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", topic: "", subject: "", message: "" });
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — our team will get back to you within 24 hours.",
      });
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <MessageCircle className="h-3 w-3" />
            Contact Us
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            We're here to help
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            Pick the channel that fits your need. For platform questions, the form below routes
            your message to the right team. For medical advice, please use the in-app Chat with
            your doctor.
          </p>
        </motion.div>

        {/* Channel cards — 4 across, clearly labeled */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="glass-card p-5 h-full hover:border-primary/30 hover:-translate-y-0.5 transition-all">
                <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
                  <c.icon className={`h-5 w-5 ${c.accent}`} />
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="font-semibold text-foreground mt-1">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{c.hint}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Form + side info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card className="glass-card p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold">Send us a message</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fill out the form and we'll route it to the right team.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  ~24h reply
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
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
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">What is this about?</Label>
                  <Select
                    value={form.topic}
                    onValueChange={(v) => setForm({ ...form, topic: v })}
                  >
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Choose a topic so we can route your message" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          <span className="flex items-center gap-2">
                            <t.icon className="h-4 w-4 text-muted-foreground" />
                            {t.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.topic && <p className="text-xs text-destructive">{errors.topic}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    maxLength={150}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="A short summary of your question"
                  />
                  {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    maxLength={1000}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share as much detail as you can — device ID, error messages, what you were trying to do…"
                  />
                  <div className="flex justify-between">
                    {errors.message ? (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Please don't include sensitive medical details here.
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{form.message.length}/1000</p>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" />
                    Your information is encrypted and never shared with third parties.
                  </p>
                  <Button type="submit" size="lg" className="gap-2" disabled={submitting}>
                    {submitting ? "Sending…" : "Send message"}
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Side: who-to-contact + FAQ */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                Not sure who to ask?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <Stethoscope className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><span className="font-medium text-foreground">Medical concern?</span> <span className="text-muted-foreground">Use the in-app Chat with your doctor.</span></span>
                </li>
                <li className="flex gap-3">
                  <Cpu className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><span className="font-medium text-foreground">Device offline?</span> <span className="text-muted-foreground">Visit the Device page first to verify status & API key.</span></span>
                </li>
                <li className="flex gap-3">
                  <LifeBuoy className="h-4 w-4 text-heart mt-0.5 shrink-0" />
                  <span><span className="font-medium text-foreground">Critical alert?</span> <span className="text-muted-foreground">Call the 24/7 emergency line above.</span></span>
                </li>
              </ul>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="h-4 w-4 text-primary" />
                Frequently asked
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
                    <AccordionTrigger className="text-sm text-left hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
