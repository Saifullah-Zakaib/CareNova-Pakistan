import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { PublicFooter } from "@/components/public-footer";
import { DoctorCard } from "@/components/doctor-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors, specialties, cities, articles } from "@/lib/mock-data";
import heroDoctors from "@/assets/hero-doctors.png";
import {
  Search, Stethoscope, CalendarCheck, MessageSquareHeart, FolderHeart,
  Heart, Baby, Brain, Bone, Sparkles, Smile, Activity, ShieldCheck, ArrowRight, BadgeCheck, Play, BadgeCheck as Verified,
  Star, Quote, Users, Award, Clock, Video, Building2, TrendingUp,
} from "lucide-react";


export const Route = createFileRoute("/")({ component: Landing });

const categories = [
  { name: "General Physician", icon: Stethoscope },
  { name: "Dentist", icon: Smile },
  { name: "Cardiologist", icon: Heart },
  { name: "Dermatologist", icon: Sparkles },
  { name: "Neurologist", icon: Brain },
  { name: "Pediatrician", icon: Baby },
  { name: "Orthopedic", icon: Bone },
];

const steps = [
  { icon: Search, title: "Search doctors", desc: "Filter by specialty, city, rating & fee." },
  { icon: CalendarCheck, title: "Book appointment", desc: "Instant booking, in-person or online." },
  { icon: MessageSquareHeart, title: "Consult doctor", desc: "Meet, chat and get your prescription." },
  { icon: FolderHeart, title: "Manage records", desc: "All reports & prescriptions in one place." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden pt-20">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-[600px] w-[600px] rounded-full hero-blob" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full hero-blob opacity-60" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-28 lg:pt-16 lg:px-8">
          {/* Left copy */}
          <div className="relative z-10">
            <span className="chip animate-fade-in" style={{ animationDelay: "0ms", animationFillMode: "both" }}><ShieldCheck className="h-3.5 w-3.5" /> Trusted by 40,000+ Pakistanis</span>
            <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in" style={{ animationDelay: "80ms", animationFillMode: "both" }}>
              Your Partner in <br className="hidden sm:block" />
              Health and <span className="text-primary">Wellness</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "180ms", animationFillMode: "both" }}>
              CareNova connects you with verified doctors, AI-powered health guidance and complete medical records — the modern way to care for your family across Pakistan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: "260ms", animationFillMode: "both" }}>
              <Button asChild size="lg" className="rounded-full px-7 hover-scale">
                <Link to="/find-doctors"><Search className="mr-2 h-4 w-4" /> Find a Doctor</Link>
              </Button>
              <Link to="/about" className="group inline-flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg ring-1 ring-border transition group-hover:scale-110">
                  <Play className="h-5 w-5 fill-primary text-primary" />
                </span>
                See how we work
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "340ms", animationFillMode: "both" }}>
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Verified profiles</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Encrypted records</div>
              <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> 24/7 AI guidance</div>
            </div>
          </div>

          {/* Right hero image with floating cards */}
          <div className="relative min-h-[420px] lg:min-h-[640px]">
            <img
              src={heroDoctors}
              alt="CareNova doctors"
              className="relative z-10 mx-auto h-full max-h-[680px] w-auto object-contain drop-shadow-2xl"
            />

            {/* Floating patient recover pill */}
            <div className="absolute left-2 top-1/2 z-20 flex -translate-y-1/2 items-center gap-3 rounded-full bg-white/85 px-4 py-3 shadow-xl ring-1 ring-border backdrop-blur sm:left-6">
              <div className="flex -space-x-2">
                {doctors.slice(0, 3).map((d) => (
                  <img key={d.id} src={d.image} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="pr-2">
                <div className="text-lg font-black leading-none text-foreground">150K+</div>
                <div className="text-xs text-muted-foreground">Patients Recovered</div>
              </div>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                <Verified className="h-4 w-4" />
              </span>
            </div>

            {/* Floating doctors card */}
            <div className="absolute right-2 top-24 z-20 rounded-2xl bg-white/85 p-4 shadow-xl ring-1 ring-border backdrop-blur sm:right-6">
              <div className="flex -space-x-3">
                {doctors.slice(3, 6).map((d) => (
                  <img key={d.id} src={d.image} alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                ))}
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-primary text-xs font-bold text-primary-foreground">+</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-xl font-black leading-none text-foreground">870+</div>
                <div className="mt-1 text-xs text-muted-foreground">Verified Doctors</div>
              </div>
            </div>

            {/* Floating appointment card */}
            <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-xl ring-1 ring-border backdrop-blur sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Appointment Confirmed</div>
                <div className="text-xs text-muted-foreground">Dr. Fatima · Tomorrow, 12:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar overlapping hero bottom */}
        <div className="relative z-20 mx-auto -mb-10 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="card-elevated rounded-2xl p-3 sm:p-4">
            <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <Select>
                <SelectTrigger className="border-transparent bg-muted/50"><SelectValue placeholder="Specialty" /></SelectTrigger>
                <SelectContent>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-transparent bg-muted/50"><SelectValue placeholder="Location" /></SelectTrigger>
                <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Input placeholder="Doctor name" className="border-transparent bg-muted/50" />
              <Button asChild className="rounded-lg"><Link to="/find-doctors"><Search className="h-4 w-4" /> <span className="ml-2 hidden sm:inline">Search</span></Link></Button>
            </div>
          </div>
        </div>
      </section>


      {/* TRUST BAR */}
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-6 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground animate-fade-in">
          Trusted by leading hospitals & insurers across Pakistan
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 lg:grid-cols-6">
          {["Aga Khan University", "Shaukat Khanum", "SIUT", "Indus Hospital", "Liaquat National", "JS Health"].map((n, i) => (
            <div
              key={n}
              className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight text-muted-foreground/90 transition hover:text-primary animate-fade-in"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              <Building2 className="h-4 w-4 text-primary/70" /> {n}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section
        eyebrow="How it works"
        title="Care in four calm steps"
        description="From your first symptom to a signed prescription — designed to feel effortless."
      >
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-14 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative card-elevated rounded-3xl p-6 transition hover:-translate-y-1 hover:border-primary/40">
              <div className="absolute -top-3 right-6 rounded-full bg-background px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/20">
                Step 0{i + 1}
              </div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-md shadow-primary/25">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section
        eyebrow="Specialties"
        title="Browse by specialty"
        description="Verified consultants across every discipline of modern medicine."
        action={<Link to="/find-doctors" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline">All specialties <ArrowRight className="h-4 w-4" /></Link>}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/find-doctors"
              className="group relative overflow-hidden card-elevated rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary transition group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-md">
                <c.icon className="h-6 w-6" />
              </div>
              <div className="text-sm font-semibold leading-tight">{c.name}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{80 + ((c.name.length * 7) % 90)}+ doctors</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* STATS BAND */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 via-background to-background p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
          {[
            { icon: Users, k: "150K+", v: "Patients recovered", tone: "text-primary" },
            { icon: Stethoscope, k: "1,248", v: "Verified doctors", tone: "text-accent" },
            { icon: Award, k: "4.9 / 5", v: "Average doctor rating", tone: "text-success" },
            { icon: Clock, k: "< 5 min", v: "Avg. booking time", tone: "text-info" },
          ].map((s) => (
            <div key={s.v} className="flex items-center gap-4">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-background shadow-sm ring-1 ring-border ${s.tone}`}>
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-3xl font-extrabold tracking-tight text-foreground">{s.k}</div>
                <div className="text-sm text-muted-foreground">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <Section
        eyebrow="Featured"
        title="Top-rated doctors this week"
        description="Hand-picked consultants patients love — book in a tap."
        action={<Link to="/find-doctors" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>}
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 6).map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </Section>

      {/* WHY CARENOVA */}
      <Section
        eyebrow="Why CareNova"
        title="Modern healthcare, made human"
        description="Everything a patient (and their family) needs — designed with clinicians, for real life."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Every doctor verified", desc: "PMC credentials, references and hospital affiliations checked by our clinical team." },
            { icon: Video, title: "Online & in-person", desc: "Talk to a specialist from home, or book an in-clinic visit — one seamless flow." },
            { icon: FolderHeart, title: "One secure record vault", desc: "Reports, prescriptions and history — encrypted and shareable in one tap." },
            { icon: Sparkles, title: "AI triage in 60 seconds", desc: "CareNova AI asks the right questions and points you to the right specialist." },
            { icon: TrendingUp, title: "Smart follow-ups", desc: "Automatic reminders for tests, medications and preventive check-ups." },
            { icon: BadgeCheck, title: "Transparent pricing", desc: "See consultation fees upfront. No surprises, no hidden add-ons." },
          ].map((f) => (
            <div key={f.title} className="card-elevated group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:gradient-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AI ASSISTANT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] gradient-primary p-8 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-14">
          <div aria-hidden className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> AI Health Assistant
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Describe symptoms.<br />Get guidance in seconds.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/85 leading-relaxed">
                CareNova AI asks the right follow-up questions, assesses severity and connects you to the right specialist — a helpful guide, never a replacement for a doctor.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-6 font-semibold shadow-lg">
                  <Link to="/ai-assistant">Try the AI Assistant <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-6 font-semibold text-primary-foreground hover:bg-white/10">
                  <Link to="/about">How it works</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-primary-foreground/80">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Encrypted end-to-end</span>
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5" /> Reviewed by clinicians</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur ring-1 ring-white/20 sm:p-5">
              <div className="mb-3 flex items-center justify-between text-xs text-primary-foreground/80">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> CareNova AI · Online</span>
                <span>Just now</span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="w-fit rounded-2xl rounded-bl-md bg-white/20 px-3.5 py-2.5">I have chest tightness after climbing stairs.</div>
                <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-background/95 px-3.5 py-2.5 text-foreground shadow-sm">
                  How long has this been going on? Any shortness of breath or dizziness?
                </div>
                <div className="w-fit rounded-2xl rounded-bl-md bg-white/20 px-3.5 py-2.5">About 2 weeks. Some shortness of breath.</div>
                <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-background/95 px-3.5 py-3 text-foreground shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Recommended specialist</div>
                  <div className="mt-1 font-semibold">Cardiologist</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="chip bg-warning/20 text-warning-foreground">Severity: Medium</span>
                    <span>· Book within 24–48h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section
        eyebrow="Testimonials"
        title="Loved by families across Pakistan"
        description="Real stories from patients who found the right care at the right time."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card-elevated flex h-full flex-col rounded-3xl p-6">
              <Quote className="h-8 w-8 text-primary/30" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <img src={t.image} alt="" className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
                <div className="flex items-center gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-warning" />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Section>

      {/* ARTICLES */}
      <Section
        eyebrow="Health library"
        title="From our doctors"
        description="Evidence-based reading, written by our verified consultants."
        action={<Link to="/articles" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline">All articles <ArrowRight className="h-4 w-4" /></Link>}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link key={a.id} to="/articles/$id" params={{ id: a.id }} className="group card-elevated overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img src={a.cover} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" alt="" />
                <span className="absolute left-4 top-4 chip bg-background/90 backdrop-blur">{a.category}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold leading-snug tracking-tight group-hover:text-primary">{a.title}</h3>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <img src={a.authorImage} className="h-6 w-6 rounded-full bg-muted" alt="" />
                    {a.author}
                  </span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-background via-primary-soft/40 to-background p-10 text-center sm:p-14">
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full hero-blob" />
          <div className="relative">
            <span className="chip"><Sparkles className="h-3 w-3" /> Free to join</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Your family's health, in one calm place.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join 42,000+ Pakistanis using CareNova to book doctors, chat with AI and keep every record safe.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7 font-semibold shadow-lg shadow-primary/25">
                <Link to="/register">Create free account <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7 font-semibold">
                <Link to="/find-doctors">Browse doctors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

const testimonials = [
  {
    name: "Sana Iqbal",
    city: "Karachi",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sana%20Iqbal",
    quote: "I found a cardiologist, booked an appointment and had my ECG report uploaded — all in one afternoon. It felt like healthcare finally caught up with the rest of my life.",
  },
  {
    name: "Bilal Ahmed",
    city: "Lahore",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bilal%20Ahmed",
    quote: "The AI assistant helped me understand my father's symptoms at 2 AM and pointed us to the right specialist by morning. Genuinely reassuring in a stressful moment.",
  },
  {
    name: "Ayesha Rahman",
    city: "Islamabad",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha%20Rahman",
    quote: "Every doctor I've booked has been genuinely verified and prepared. The record vault means I never have to carry a folder of test results anywhere again.",
  },
];

function Section({
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {eyebrow}
              </div>
            )}
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            {description && <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>}
          </div>
          {action}
        </div>
      </Reveal>
      <Reveal delay={100}>{children}</Reveal>
    </section>
  );
}
