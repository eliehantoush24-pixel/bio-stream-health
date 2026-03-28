import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: "patient" | "doctor";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "doctor", text: "Good morning Ahmed! I reviewed your latest readings.", time: "09:00" },
  { id: 2, sender: "doctor", text: "Your heart rate has been stable around 76 BPM — that's great.", time: "09:01" },
  { id: 3, sender: "patient", text: "Thank you, Dr. Hana! I've been wearing the sensor daily.", time: "09:05" },
  { id: 4, sender: "doctor", text: "Keep it up! Let me know if you feel any dizziness or chest discomfort.", time: "09:06" },
  { id: 5, sender: "patient", text: "Will do. Should I keep monitoring overnight as well?", time: "09:10" },
  { id: 6, sender: "doctor", text: "Yes, overnight readings would be very helpful for a complete picture.", time: "09:12" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now(),
      sender: "patient",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");

    // Simulated doctor reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          text: "Thanks for your message. I'll review and get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-7rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold font-display">Chat</h1>
          <p className="text-sm text-muted-foreground">Communication with Dr. Hana Ibrahim</p>
        </div>

        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="border-b py-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-accent" />
              </div>
              <div>
                <CardTitle className="text-sm">Dr. Hana Ibrahim</CardTitle>
                <p className="text-xs text-muted-foreground">Cardiologist • Online</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-success ml-1" />
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  m.sender === "patient"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.sender === "patient" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </motion.div>
            ))}
            <div ref={endRef} />
          </CardContent>

          <div className="p-3 border-t shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
