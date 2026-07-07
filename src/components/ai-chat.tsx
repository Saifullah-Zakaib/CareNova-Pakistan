import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DoctorCard } from "./doctor-card";
import { doctors } from "@/lib/mock-data";
import { Send, Mic, Paperclip, AlertTriangle, ShieldCheck, Stethoscope, Thermometer, HeartPulse, Brain, Activity, Copy, ThumbsUp, ThumbsDown } from "lucide-react";

type Msg = { role: "user" | "ai"; content: string; card?: boolean; time?: string };

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const seed: Msg[] = [
  {
    role: "ai",
    time: now(),
    content:
      "Hello 👋 I'm CareNova AI, your health guide. Tell me how you're feeling — symptoms, duration, severity — and I'll help you find the right care. I offer guidance, not diagnoses.",
  },
];

const suggestions = [
  { icon: Thermometer, label: "I've had a fever for 3 days" },
  { icon: HeartPulse, label: "Chest discomfort when climbing stairs" },
  { icon: Brain, label: "Recurring headaches this week" },
  { icon: Activity, label: "Recommend a specialist for my report" },
];

function AiAvatar() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow ring-1 ring-primary/20">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M3 13h4l2-4 3 8 3-6 2 2h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function UserAvatar() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-muted text-sm font-bold text-foreground">
      A
    </span>
  );
}

export function AiChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(0);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const push = (text: string) => {
    const userMsg: Msg = { role: "user", content: text, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    const s = step;
    setStep(s + 1);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      if (s === 0)
        setMessages((m) => [
          ...m,
          { role: "ai", time: now(), content: "Thanks for sharing. Could you tell me your age and how long you've had these symptoms?" },
        ]);
      else if (s === 1)
        setMessages((m) => [
          ...m,
          { role: "ai", time: now(), content: "Got it. On a scale of 1–10, how severe is the discomfort? Any other symptoms like nausea, cough or fatigue?" },
        ]);
      else
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            time: now(),
            content: "Based on what you've shared, here's a preliminary assessment. This is guidance — please confirm with a licensed doctor.",
            card: true,
          },
        ]);
    }, 900);
  };

  const send = () => {
    if (!input.trim()) return;
    push(input.trim());
  };

  return (
    <div className={`flex flex-col ${compact ? "h-[680px]" : "h-[calc(100vh-9rem)]"} card-elevated rounded-3xl overflow-hidden bg-gradient-to-b from-background to-primary-soft/30`}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/70 bg-background/70 px-5 py-4 backdrop-blur">
        <div className="relative">
          <AiAvatar />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-background" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-display font-bold">CareNova AI</div>
            <span className="chip bg-success/15 text-success">Online</span>
          </div>
          <div className="text-xs text-muted-foreground">Powered by medical LLM · Trained on verified guidelines</div>
        </div>
        <div className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-success" /> Encrypted session
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((m, i) => (
            <MessageRow key={i} msg={m} />
          ))}
          {typing && (
            <div className="flex items-end gap-3">
              <AiAvatar />
              <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            </div>
          )}

          {messages.length === 1 && !typing && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Try asking</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => push(s.label)}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:gradient-primary group-hover:text-primary-foreground">
                      <s.icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-foreground/90">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottom} />
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border/70 bg-background/80 px-4 pt-3 pb-4 backdrop-blur sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-warning/15 px-3 py-1.5 text-xs text-warning-foreground">
            <AlertTriangle className="h-3.5 w-3.5" /> CareNova AI provides guidance, not medical diagnoses. In emergencies call 1122.
          </div>

          <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex items-center gap-0.5 pb-1 pl-1">
              <Button size="icon" variant="ghost" aria-label="attach" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-primary">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="voice" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-primary">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Describe your symptoms in detail…"
              className="min-h-[44px] max-h-40 flex-1 resize-none border-0 bg-transparent px-2 py-2.5 shadow-none focus-visible:ring-0"
              rows={1}
            />
            <Button
              onClick={send}
              disabled={!input.trim()}
              className="h-10 rounded-xl px-4 font-semibold shadow-md shadow-primary/25 disabled:opacity-50"
            >
              <Send className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to send · <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Shift + Enter</kbd> for newline</span>
            <span className="hidden sm:inline">GPT-4o medical · v1.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageRow({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <AiAvatar />}
      <div className={`flex max-w-[85%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={
            isUser
              ? "rounded-2xl rounded-br-md gradient-primary px-4 py-2.5 text-sm text-primary-foreground shadow-md shadow-primary/20"
              : "rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm"
          }
        >
          <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
          {msg.card && <AssessmentCard />}
        </div>
        <div className={`mt-1 flex items-center gap-2 px-1 text-[11px] text-muted-foreground ${isUser ? "flex-row-reverse" : ""}`}>
          <span>{msg.time}</span>
          {!isUser && (
            <div className="flex items-center gap-0.5">
              <button className="rounded p-0.5 hover:text-primary" aria-label="copy"><Copy className="h-3 w-3" /></button>
              <button className="rounded p-0.5 hover:text-success" aria-label="good"><ThumbsUp className="h-3 w-3" /></button>
              <button className="rounded p-0.5 hover:text-destructive" aria-label="bad"><ThumbsDown className="h-3 w-3" /></button>
            </div>
          )}
        </div>
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
}

function AssessmentCard() {
  return (
    <div className="mt-3 rounded-2xl border border-border bg-background p-4 text-foreground">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary"><Stethoscope className="h-4 w-4" /></span>
          <div className="font-display font-bold">Health Assessment</div>
        </div>
        <span className="chip bg-warning/20 text-warning-foreground">Severity: Medium</span>
      </div>
      <div className="mt-3 grid gap-2 text-sm">
        <Row label="Recommended specialist" value="General Physician" />
        <Row label="Suggested next step" value="Book a consultation within 24–48h" />
        <Row label="Home care" value="Rest, hydrate, monitor temperature" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-semibold">Nearby doctors</div>
        <span className="text-xs text-muted-foreground">Karachi · Verified</span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {doctors.filter((d) => d.specialty === "General Physician").slice(0, 2).map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
