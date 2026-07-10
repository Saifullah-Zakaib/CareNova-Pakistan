import { createFileRoute, Link } from "@tanstack/react-router";
import { WelcomeBanner } from "@/components/portal-shell";
import { CalendarDays, HeartPulse, FileText, Bookmark, Sparkles, ChevronRight, Video, Activity, Droplet, Footprints, Moon, Stethoscope, Pill } from "lucide-react";
import { doctors, appointments, timeline } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useFavoriteDoctors } from "@/hooks/use-patient-data";
import { useAuth } from "@/contexts/auth.context";

export const Route = createFileRoute("/patient/")({
  component: PatientDashboard,
});

const bp = [
  { m: "Jan", v: 118 }, { m: "Feb", v: 122 }, { m: "Mar", v: 119 }, { m: "Apr", v: 117 },
  { m: "May", v: 121 }, { m: "Jun", v: 116 }, { m: "Jul", v: 114 },
];
const scoreData = [{ name: "score", value: 82, fill: "var(--primary)" }];

function PatientDashboard() {
  const { user } = useAuth();
  const { data: favoriteDoctorsData, isLoading: loadingFavorites } = useFavoriteDoctors({ limit: 4 });
  const upcoming = appointments.find(a => a.status === "Upcoming")!;
  const upcomingDoc = doctors.find(d => d.id === upcoming.doctorId)!;

  // Get saved doctors from API or fallback to mock data
  const savedDoctors = favoriteDoctorsData?.data?.data || [];
  const hasFavoriteDoctors = savedDoctors.length > 0;

  return (
    <div>
      <WelcomeBanner
        greeting="Assalam-o-Alaikum 👋"
        name={`Welcome back, ${user?.firstName || 'Patient'}`}
        subtitle="Your next appointment is tomorrow at 12:30 PM. Everything looks good — keep it up."
        actions={
          <>
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/patient/ai"><Sparkles className="mr-2 h-4 w-4" /> Ask AI Assistant</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Link to="/patient/doctors">Book Appointment</Link></Button>
          </>
        }
        stats={[
          { label: "Upcoming", value: "1", icon: CalendarDays, tone: "primary" },
          { label: "Health Score", value: "82/100", icon: HeartPulse, tone: "success" },
          { label: "Records", value: "12", icon: FileText, tone: "info" },
          { label: "Saved", value: "5", icon: Bookmark, tone: "accent" },
        ]}
      />

      {/* Vitals row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Heart rate", value: "72", unit: "bpm", icon: Activity, tone: "bg-primary-soft text-primary" },
          { label: "Blood pressure", value: "118/76", unit: "mmHg", icon: Droplet, tone: "bg-info/15 text-info" },
          { label: "Steps today", value: "6,842", unit: "steps", icon: Footprints, tone: "bg-success/15 text-success" },
          { label: "Sleep", value: "7h 12m", unit: "last night", icon: Moon, tone: "bg-accent/15 text-accent" },
        ].map(v => (
          <div key={v.label} className="card-elevated rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${v.tone}`}><v.icon className="h-5 w-5" /></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{v.label}</span>
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-2xl font-black">{v.value}</span>
              <span className="text-xs text-muted-foreground">{v.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left: appointment + trend */}
        <div className="space-y-6 lg:col-span-2">
          <div className="card-elevated overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between p-5">
              <div>
                <div className="text-sm font-bold">Next appointment</div>
                <div className="text-xs text-muted-foreground">Your upcoming visit</div>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-primary"><Link to="/patient/appointments">View all <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
            </div>
            <div className="mx-5 mb-5 grid gap-4 rounded-2xl bg-primary-soft/70 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <img src={upcomingDoc.image} className="h-16 w-16 rounded-2xl bg-background" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-bold">{upcomingDoc.name}</div>
                  <span className="chip">{upcomingDoc.specialty}</span>
                </div>
                <div className="text-xs text-muted-foreground">{upcomingDoc.hospital} · {upcomingDoc.city}</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                  <CalendarDays className="h-3.5 w-3.5" /> {upcoming.date} · {upcoming.time}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full">Reschedule</Button>
                <Button size="sm" className="rounded-full"><Video className="mr-1 h-4 w-4" /> Join</Button>
              </div>
            </div>
          </div>

          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Blood pressure trend</div>
                <div className="text-xs text-muted-foreground">Systolic · last 7 months</div>
              </div>
              <span className="chip bg-success/15 text-success">Healthy range</span>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer>
                <AreaChart data={bp}>
                  <defs><linearGradient id="bpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" domain={[100, 130]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} fill="url(#bpg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="card-elevated rounded-2xl p-5">
            <div className="text-sm font-bold">Health score</div>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-32 w-32 shrink-0">
                <ResponsiveContainer>
                  <RadialBarChart data={scoreData} innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--muted)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="text-3xl font-black text-primary">82<span className="text-base text-muted-foreground">/100</span></div>
                <div className="mt-1 text-xs text-success font-semibold">+4 this month</div>
                <div className="mt-2 text-xs text-muted-foreground">Based on vitals, activity and sleep.</div>
              </div>
            </div>
          </div>

          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-primary" /> AI recommendations</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { t: "Lipid profile is due — 3 months since last test.", tone: "warning" },
                { t: "Schedule your annual dental check-up.", tone: "info" },
                { t: "Great sleep streak — 5 nights over 7 hours!", tone: "success" },
              ].map((r) => (
                <li key={r.t} className="flex items-start gap-2 rounded-xl border border-border/60 bg-background p-3">
                  <span className={`mt-0.5 h-2 w-2 rounded-full ${r.tone === "warning" ? "bg-warning" : r.tone === "info" ? "bg-info" : "bg-success"}`} />
                  <span>{r.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-bold">Saved doctors</div>
            <Button asChild size="sm" variant="ghost" className="text-primary"><Link to="/patient/saved">All <ChevronRight className="h-4 w-4" /></Link></Button>
          </div>
          {loadingFavorites ? (
            <div className="py-8 text-center text-sm text-muted-foreground">Loading your saved doctors...</div>
          ) : hasFavoriteDoctors ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {savedDoctors.map((fav: any) => {
                const doctor = fav.doctor;
                const doctorName = `${doctor.user.firstName} ${doctor.user.lastName}`;
                const specialty = doctor.specialization?.name || 'General Physician';
                const city = doctor.user.city || doctor.hospital?.city?.name || 'Pakistan';
                const image = doctor.user.profileImage || `https://api.dicebear.com/9.x/avataaars/svg?seed=${doctor.user.email}`;
                
                return (
                  <div key={doctor.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                    <img src={image} className="h-11 w-11 rounded-xl bg-muted object-cover" alt={doctorName} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{doctorName}</div>
                      <div className="truncate text-xs text-muted-foreground">{specialty} · {city}</div>
                    </div>
                    <Button asChild size="sm" className="rounded-full">
                      <Link to="/patient/doctors" search={{ doctorId: doctor.id }}>View</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/60 p-8 text-center">
              <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-2 text-sm font-medium">No saved doctors yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Save your favorite doctors for quick access</p>
              <Button asChild size="sm" className="mt-4 rounded-full">
                <Link to="/patient/doctors">Find Doctors</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold"><Stethoscope className="h-4 w-4 text-primary" /> Health timeline</div>
          <ol className="relative space-y-4 border-l-2 border-primary-soft pl-5">
            {timeline.slice(0, 4).map((t, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[26px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary ring-4 ring-primary-soft" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{t.year}</div>
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.detail}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
