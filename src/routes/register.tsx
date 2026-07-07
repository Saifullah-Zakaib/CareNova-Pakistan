import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, BadgeCheck, Stethoscope, HeartPulse, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — CareNova" }] }),
  component: Register,
});

function Register() {
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      <PublicNav />
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-60" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — value story */}
        <div className="hidden flex-col justify-between lg:flex">
          <div>
            <div className="chip"><Sparkles className="h-3 w-3" /> Get started free</div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Join Pakistan's <span className="text-primary">smartest care network.</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Create an account in under a minute — book verified doctors, chat with our AI health assistant and keep every report in one secure vault.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { k: "1,248", v: "Verified doctors" },
                { k: "42k+", v: "Active patients" },
                { k: "4.9★", v: "Avg. doctor rating" },
                { k: "24/7", v: "AI health support" },
              ].map((s) => (
                <div key={s.k} className="card-elevated rounded-2xl p-4">
                  <div className="font-display text-2xl font-extrabold text-primary">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                { icon: BadgeCheck, t: "Every doctor credential-verified by our team" },
                { icon: ShieldCheck, t: "Records encrypted end-to-end, always" },
                { icon: HeartPulse, t: "AI-guided triage before you book" },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-foreground/90">{f.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex items-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="card-elevated rounded-3xl p-8 sm:p-10">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">Create your account</h2>
                <p className="mt-1 text-sm text-muted-foreground">Choose the account type that fits you.</p>
              </div>

              <Tabs defaultValue="patient">
                <TabsList className="grid grid-cols-2 w-full rounded-full bg-muted p-1 h-12">
                  <TabsTrigger value="patient" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <HeartPulse className="mr-1.5 h-4 w-4" /> Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Stethoscope className="mr-1.5 h-4 w-4" /> Doctor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient" className="mt-6 space-y-4">
                  <IconField label="Full name" icon={User} placeholder="Ali Raza" />
                  <IconField label="Email" icon={Mail} type="email" placeholder="you@example.com" />
                  <IconField label="Phone" icon={Phone} placeholder="+92 300 1234567" />
                  <PasswordField />
                  <Terms />
                  <Button asChild className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/25">
                    <Link to="/patient">Create patient account <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </TabsContent>

                <TabsContent value="doctor" className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <IconField label="Full name" icon={User} placeholder="Dr. Ayesha Khan" />
                    <IconField label="PMC / Reg. No." icon={BadgeCheck} placeholder="PMC-12345" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <IconField label="Specialty" icon={Stethoscope} placeholder="Cardiology" />
                    <IconField label="Qualification" icon={GraduationCap} placeholder="MBBS, FCPS" />
                  </div>
                  <IconField label="Email" icon={Mail} type="email" placeholder="doctor@example.com" />
                  <PasswordField />
                  <div className="rounded-xl border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                    <div className="font-semibold text-foreground">Verification required</div>
                    Doctor accounts activate after our team verifies your PMC credentials — usually within 24 hours.
                  </div>
                  <Terms />
                  <Button asChild className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/25">
                    <Link to="/doctor">Submit for verification <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </TabsContent>
              </Tabs>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconField({
  label,
  icon: Icon,
  ...rest
}: { label: string; icon: React.ComponentType<{ className?: string }> } & React.ComponentProps<typeof Input>) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-12 rounded-xl pl-10" {...rest} />
      </div>
    </div>
  );
}

function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</Label>
      <div className="relative mt-1.5">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type={show ? "text" : "password"} placeholder="At least 8 characters" className="h-12 rounded-xl pl-10 pr-10" />
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
  );
}

function Terms() {
  return (
    <label className="flex items-start gap-2 text-xs text-muted-foreground">
      <Checkbox id="terms" className="mt-0.5" />
      <span>
        I agree to CareNova's{" "}
        <Link to="/terms" className="font-medium text-primary hover:underline">Terms</Link> and{" "}
        <Link to="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
      </span>
    </label>
  );
}
