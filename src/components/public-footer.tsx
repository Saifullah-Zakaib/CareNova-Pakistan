import { Link } from "@tanstack/react-router";
import { Brand } from "./brand";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-primary-soft/40 font-sans">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full hero-blob opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full hero-blob opacity-60" />

      {/* CTA band */}
      <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 sm:p-12 text-primary-foreground shadow-xl">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Get started free
              </div>
              <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Better health starts with one appointment.
              </h3>
              <p className="mt-2 text-primary-foreground/85 max-w-xl">
                Join 42,000+ patients using CareNova to find verified doctors, book instantly and manage records — all in one place.
              </p>
            </div>
            <form className="flex w-full items-center gap-2 rounded-2xl bg-white/12 p-2 backdrop-blur ring-1 ring-white/25">
              <Mail className="ml-3 h-5 w-5 text-primary-foreground/80" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 border-0 bg-transparent text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-0"
              />
              <Button type="submit" size="lg" variant="secondary" className="rounded-xl">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-5 lg:col-span-4">
          <Brand />
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Pakistan's AI-powered healthcare platform. Verified doctors, smart guidance, secure records — care that fits your life.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Clifton, Karachi, Pakistan</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +92 300 123 4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@carenova.pk</li>
          </ul>
          <div className="flex gap-2 pt-1">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-primary hover:border-primary hover:-translate-y-0.5">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="font-display text-sm font-bold mb-4">Platform</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/find-doctors" className="hover:text-primary transition">Find Doctors</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-primary transition">AI Assistant</Link></li>
            <li><Link to="/articles" className="hover:text-primary transition">Articles</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="font-display text-sm font-bold mb-4">Company</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition">Terms</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="font-display text-sm font-bold mb-4">Why CareNova</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><ShieldCheck className="h-4 w-4" /></span>
              <span><span className="font-medium text-foreground">Verified doctors</span> — every profile is credentialed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><HeartPulse className="h-4 w-4" /></span>
              <span><span className="font-medium text-foreground">24/7 AI guidance</span> — triage symptoms anytime.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><Sparkles className="h-4 w-4" /></span>
              <span><span className="font-medium text-foreground">End-to-end encrypted</span> — your records, your control.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} CareNova Pakistan. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <span>Made with care in Karachi 🇵🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
