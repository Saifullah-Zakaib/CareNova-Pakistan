import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  HeartPulse, ShieldCheck, Users, Sparkles, Info, Target, Eye, Compass,
  ArrowRight, Building2, Stethoscope, Globe2, TrendingUp, Quote,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CareNova Pakistan" },
      { name: "description", content: "Our mission is to make quality healthcare accessible to every Pakistani." },
    ],
  }),
  component: About,
});

const values = [
  { icon: HeartPulse, title: "Patient first", desc: "Every product decision starts with a real patient outcome — never a vanity metric." },
  { icon: ShieldCheck, title: "Trust & safety", desc: "Verified doctors, encrypted records and transparent reviews built into the platform." },
  { icon: Sparkles, title: "Smart, not scary", desc: "AI that guides and informs — always with a licensed clinician in the loop." },
  { icon: Users, title: "Built in Pakistan", desc: "Designed for the reality of local hospitals, families, languages and payment norms." },
];

const stats = [
  { icon: Users, k: "150K+", v: "Patients served" },
  { icon: Stethoscope, k: "1,248", v: "Verified doctors" },
  { icon: Building2, k: "60+", v: "Partner hospitals" },
  { icon: Globe2, k: "8", v: "Cities live" },
];

const timeline = [
  { year: "2026", title: "The Vision", desc: "CareNova Health is founded with a mission to make quality healthcare more accessible across Pakistan by connecting patients, doctors, and AI-powered healthcare solutions in one platform." },
  { year: "2026", title: "Building the Foundation", desc: "The platform begins with verified doctor discovery, patient profiles, appointment booking, and digital healthcare management for patients and healthcare professionals." },
  { year: "Future", title: "AI-Powered Healthcare Assistance", desc: "CareNova AI helps patients understand their symptoms, assess health urgency, find suitable specialists, and receive personalized healthcare guidance while keeping doctors at the center of medical decisions." },
  { year: "Future", title: "Scaling Nationwide Healthcare", desc: "CareNova aims to connect patients with verified doctors, hospitals, laboratories, and healthcare services across Pakistan, creating a smarter and more accessible healthcare ecosystem." },
];


function About() {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="About CareNova"
        eyebrowIcon={Info}
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        title="Healthcare,"
        highlight="without the friction."
        description="We're building Pakistan's most trusted digital health platform — connecting patients, doctors and hospitals in one seamless experience."
      />

      {/* MISSION / VISION / STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: Target, tag: "Our Mission", title: "Care within reach — for every family.", desc: "Make quality healthcare accessible, affordable and understandable for every Pakistani, regardless of city or income." },
            { icon: Eye, tag: "Our Vision", title: "The default front door to health.", desc: "A future where booking a specialist, chatting with an AI, and finding your records is as easy as ordering a ride." },
            { icon: Compass, tag: "Our Approach", title: "Human care, quietly powered by AI.", desc: "Doctors stay at the center. Our AI does the tedious work — triage, follow-ups, records — so clinicians can focus on people." },
          ].map((c, i) => (
            <Reveal key={c.tag} delay={i * 80}>
              <div className="card-elevated group flex h-full flex-col rounded-3xl p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-md shadow-primary/25">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{c.tag}</div>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 via-background to-background p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
            {stats.map((s) => (
              <div key={s.v} className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-background text-primary shadow-sm ring-1 ring-border">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-3xl font-extrabold tracking-tight">{s.k}</div>
                  <div className="text-sm text-muted-foreground">{s.v}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> What we value
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Principles we ship by.</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Four commitments that show up in every doctor we verify, every feature we ship and every conversation with our AI.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="card-elevated group h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:gradient-primary group-hover:text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-lg font-bold tracking-tight">{v.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Our story
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">From a healthcare idea to Pakistan's digital health ecosystem.</h2>
          </div>
        </Reveal>

        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-primary/40 via-border to-primary/40 md:block md:left-1/2" />
          <ol className="space-y-8 md:space-y-14">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <li className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className={`md:[direction:ltr] ${i % 2 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                    <div className="card-elevated rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40">
                      <div className="font-display text-3xl font-extrabold text-primary">{t.year}</div>
                      <div className="mt-1 font-display text-lg font-bold">{t.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                  <span className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full gradient-primary ring-4 ring-background md:left-1/2 md:block" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <figure className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary-soft/50 via-background to-background p-10 sm:p-14">
            <Quote className="absolute -top-2 left-8 h-24 w-24 text-primary/10" />
            <blockquote className="relative max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
              "Every Pakistani should be able to reach a good doctor in minutes — not days, not favors, not fear. That's what we're building, one appointment at a time."
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Hamza%20Raza" alt="" className="h-12 w-12 rounded-full bg-muted ring-2 ring-background" />
              <div>
                <div className="font-semibold">Hamza Raza</div>
                <div className="text-sm text-muted-foreground">Co-founder & CEO, CareNova</div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] gradient-primary p-10 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-14">
            <div aria-hidden className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <TrendingUp className="h-3.5 w-3.5" /> Join us
                </span>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Doctor, patient or partner — there's a seat at the table.
                </h2>
                <p className="mt-3 max-w-xl text-primary-foreground/85">
                  We're hiring clinicians, engineers and operators who want to rebuild healthcare from the ground up.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-6 font-semibold shadow-lg">
                  <Link to="/register">Join CareNova <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-6 font-semibold text-primary-foreground hover:bg-white/10">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PublicFooter />
    </div>
  );
}
