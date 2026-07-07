import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { StatCard } from "@/components/stat-card";
import {
  Stethoscope, Users, CalendarDays, Sparkles, TrendingUp, Activity, Building2,
  Wallet, ShieldCheck, Bell, Check, X, ArrowUpRight, Star, MapPin, Clock, Eye,
} from "lucide-react";
import {
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
  AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar,
} from "recharts";
import { doctors } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const growth = [
  { m: "Jan", doctors: 320, patients: 12400, appts: 4200 },
  { m: "Feb", doctors: 410, patients: 15800, appts: 5100 },
  { m: "Mar", doctors: 520, patients: 19200, appts: 6800 },
  { m: "Apr", doctors: 640, patients: 24500, appts: 8300 },
  { m: "May", doctors: 790, patients: 30100, appts: 10200 },
  { m: "Jun", doctors: 980, patients: 36400, appts: 13400 },
  { m: "Jul", doctors: 1248, patients: 42318, appts: 18942 },
];

const specialtiesMix = [
  { name: "GP", value: 32 },
  { name: "Cardiology", value: 18 },
  { name: "Derma", value: 14 },
  { name: "Pediatrics", value: 12 },
  { name: "Other", value: 24 },
];
const COLORS = ["var(--primary)", "var(--accent)", "var(--info)", "var(--success)", "var(--warning)"];

const revenue = [
  { d: "Mon", v: 42 }, { d: "Tue", v: 55 }, { d: "Wed", v: 48 },
  { d: "Thu", v: 71 }, { d: "Fri", v: 63 }, { d: "Sat", v: 82 }, { d: "Sun", v: 58 },
];

const cityBreakdown = [
  { city: "Karachi", patients: 18420, share: 44 },
  { city: "Lahore", patients: 11250, share: 27 },
  { city: "Islamabad", patients: 6820, share: 16 },
  { city: "Rawalpindi", patients: 3210, share: 8 },
  { city: "Peshawar", patients: 2118, share: 5 },
];

const health = [{ name: "score", value: 92, fill: "var(--primary)" }];

const activity = [
  { icon: ShieldCheck, tone: "text-success bg-success/15", title: "Dr. Sana Malik verified", time: "2 min ago" },
  { icon: Users, tone: "text-primary bg-primary-soft", title: "218 new patient signups today", time: "1 hr ago" },
  { icon: Wallet, tone: "text-accent bg-accent/15", title: "Payout batch #4821 completed", time: "3 hr ago" },
  { icon: Bell, tone: "text-warning bg-warning/20", title: "3 disputes need review", time: "5 hr ago" },
  { icon: Building2, tone: "text-info bg-info/15", title: "AKUH added 12 new doctors", time: "Yesterday" },
];

export const Route = createFileRoute("/admin/")({
  component: () => (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-6 sm:p-8 text-primary-foreground shadow-lg">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Activity className="h-3.5 w-3.5" /> Live · All systems normal
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back, Nadia 👋</h1>
            <p className="mt-1 text-primary-foreground/85 max-w-xl">Here's what's happening on CareNova today — 1,248 doctors, 42k patients, real impact.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { k: "Uptime", v: "99.98%" },
              { k: "AI latency", v: "412 ms" },
              { k: "Active now", v: "3,412" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur ring-1 ring-white/20">
                <div className="text-[11px] uppercase tracking-wide text-primary-foreground/70">{s.k}</div>
                <div className="mt-0.5 text-lg font-bold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total doctors" value="1,248" icon={Stethoscope} tone="primary" trend={{ value: "+124 this month", direction: "up" }} />
        <StatCard label="Total patients" value="42,318" icon={Users} tone="info" trend={{ value: "+5,600", direction: "up" }} />
        <StatCard label="Appointments" value="18,942" icon={CalendarDays} tone="success" trend={{ value: "+12%", direction: "up" }} />
        <StatCard label="AI requests" value="204k" icon={Sparkles} tone="accent" trend={{ value: "+38%", direction: "up" }} />
      </div>

      {/* Growth + revenue */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-base font-bold">Platform growth</div>
              <div className="text-xs text-muted-foreground">Doctors & patients onboarded over the last 7 months.</div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="chip"><span className="h-2 w-2 rounded-full bg-primary" /> Doctors</span>
              <span className="chip bg-accent/15 text-accent"><span className="h-2 w-2 rounded-full bg-accent" /> Patients</span>
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={growth} margin={{ left: -10, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="gDoc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="patients" stroke="var(--accent)" strokeWidth={2.5} fill="url(#gPat)" />
                <Area type="monotone" dataKey="doctors" stroke="var(--primary)" strokeWidth={2.5} fill="url(#gDoc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-base font-bold">Weekly revenue</div>
              <div className="text-xs text-muted-foreground">PKR (in lakhs)</div>
            </div>
            <span className="chip bg-success/15 text-success"><TrendingUp className="h-3 w-3" /> +18.2%</span>
          </div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight">₨ 41.9L</div>
          <div className="mt-3 h-48">
            <ResponsiveContainer>
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mix + Cities + Health score */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-2xl p-5">
          <div className="font-display text-base font-bold">Specialty mix</div>
          <div className="text-xs text-muted-foreground">Distribution across all verified doctors.</div>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={specialtiesMix} innerRadius={50} outerRadius={82} paddingAngle={3} dataKey="value">
                  {specialtiesMix.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend iconType="circle" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="font-display text-base font-bold">Top cities</div>
            <span className="chip"><MapPin className="h-3 w-3" /> Pakistan</span>
          </div>
          <ul className="mt-4 space-y-4">
            {cityBreakdown.map((c) => (
              <li key={c.city}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.city}</span>
                  <span className="text-muted-foreground">{c.patients.toLocaleString()} · {c.share}%</span>
                </div>
                <Progress value={c.share * 2.2} className="mt-1.5 h-2" />
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="font-display text-base font-bold">Platform health</div>
          <div className="text-xs text-muted-foreground">Composite reliability score.</div>
          <div className="relative h-56">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={health} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="text-4xl font-extrabold tracking-tight">92</div>
                <div className="text-xs text-muted-foreground">Excellent</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-muted/60 p-2"><div className="font-semibold">API</div><div className="text-success">99.9%</div></div>
            <div className="rounded-lg bg-muted/60 p-2"><div className="font-semibold">DB</div><div className="text-success">99.8%</div></div>
            <div className="rounded-lg bg-muted/60 p-2"><div className="font-semibold">AI</div><div className="text-success">98.4%</div></div>
          </div>
        </div>
      </div>

      {/* Queue + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between p-5">
            <div>
              <div className="font-display text-base font-bold">Doctor verification queue</div>
              <div className="text-xs text-muted-foreground">Review and approve new doctor applications.</div>
            </div>
            <Button variant="outline" size="sm">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.slice(0, 5).map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={d.image} className="h-9 w-9 rounded-full bg-muted" alt="" />
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.hospital}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{d.specialty}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {d.rating}
                    </span>
                  </TableCell>
                  <TableCell><span className="chip bg-warning/20 text-warning-foreground"><Clock className="h-3 w-3" /> Pending</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="outline"><X className="mr-1 h-3.5 w-3.5" /> Reject</Button>
                      <Button size="sm"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="font-display text-base font-bold">Recent activity</div>
            <Button size="sm" variant="ghost">View all</Button>
          </div>
          <ol className="mt-4 space-y-4">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${a.tone}`}>
                  <a.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-snug">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  ),
});
