import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, HeartPulse, Sparkles, Stethoscope, Users, ShieldAlert } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CareNova" }] }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      <PublicNav />
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-60" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — brand story */}
        <div className="hidden flex-col justify-between lg:flex">
          <div>
            <div className="chip"><Sparkles className="h-3 w-3" /> Welcome back</div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Your health, <span className="text-primary">continued.</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Sign in to access your appointments, prescriptions, AI insights and secure medical records — all in one place.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, t: "Bank-grade security", d: "End-to-end encrypted records." },
                { icon: HeartPulse, t: "24/7 AI guidance", d: "Talk to CareNova AI anytime." },
                { icon: Stethoscope, t: "1,200+ verified doctors", d: "Across every specialty in Pakistan." },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-elevated mt-10 flex items-center gap-4 rounded-2xl p-5">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=user${i}`} className="h-10 w-10 rounded-full ring-2 ring-background bg-muted" alt="" />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold">42,000+ patients</div>
              <div className="text-muted-foreground">trust CareNova with their care.</div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="card-elevated rounded-3xl p-8 sm:p-10">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">Sign in to CareNova</h2>
                <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to continue.</p>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-xl h-11 font-semibold">
                  <GoogleGlyph /> Google
                </Button>
                <Button variant="outline" className="rounded-xl h-11 font-semibold">
                  <AppleGlyph /> Apple
                </Button>
              </div>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or with email
                <span className="h-px flex-1 bg-border" />
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" className="h-12 rounded-xl pl-10" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</Label>
                    <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot?</a>
                  </div>
                  <div className="relative mt-1.5">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="h-12 rounded-xl pl-10 pr-10" />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox id="remember" /> <span>Keep me signed in for 30 days</span>
                </label>

                <Button asChild className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/25">
                  <Link to="/patient">
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                Continue as
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <PortalPill to="/patient" icon={Users} label="Patient" />
                <PortalPill to="/doctor" icon={Stethoscope} label="Doctor" />
                <PortalPill to="/admin" icon={ShieldAlert} label="Admin" />
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New to CareNova?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Protected by 256-bit encryption · <Link to="/privacy" className="hover:text-primary">Privacy</Link> · <Link to="/terms" className="hover:text-primary">Terms</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalPill({ to, icon: Icon, label }: { to: "/patient" | "/doctor" | "/admin"; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-1 rounded-xl border border-border bg-background px-3 py-3 text-xs font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="mr-1 h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.5-1.7 4.4-5.5 4.4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.6 14.7 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12S6.8 21.4 12 21.4c6.9 0 9.5-4.8 9.5-8.6 0-.6-.1-1-.1-1.4L12 10.2z" />
    </svg>
  );
}
function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="mr-1 h-4 w-4" aria-hidden>
      <path fill="currentColor" d="M16.5 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.9-1.1-2.9-3.8zM14.3 5.3c.7-.8 1.1-1.9 1-3-.9.1-2 .6-2.7 1.4-.6.7-1.2 1.9-1 2.9 1 .1 2-.5 2.7-1.3z" />
    </svg>
  );
}
