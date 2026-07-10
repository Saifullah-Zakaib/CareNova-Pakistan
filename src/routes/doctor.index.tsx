import { createFileRoute } from "@tanstack/react-router";
import { WelcomeBanner } from "@/components/portal-shell";
import { CalendarDays, Users, Star, Banknote, Video, MapPin, TrendingUp, Clock, ChevronRight, MessageSquare, Stethoscope, ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/mock-data";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { useDoctorProfile } from "@/hooks/use-doctor-data";

const revenue = [
  { m: "Jan", v: 180 }, { m: "Feb", v: 220 }, { m: "Mar", v: 260 }, { m: "Apr", v: 240 },
  { m: "May", v: 310 }, { m: "Jun", v: 340 }, { m: "Jul", v: 385 },
];
const patientMix = [
  { name: "New", value: 34, fill: "var(--primary)" },
  { name: "Returning", value: 58, fill: "var(--info)" },
  { name: "Follow-up", value: 22, fill: "var(--success)" },
];

const today = [
  { t: "09:00", name: "Hassan Ali", type: "In-clinic", note: "Follow-up · Hypertension" },
  { t: "10:30", name: "Sana Rehman", type: "Online", note: "New patient" },
  { t: "12:00", name: "Bilal Khan", type: "In-clinic", note: "Cardiac review" },
  { t: "14:00", name: "Ayesha Malik", type: "In-clinic", note: "ECG results" },
  { t: "16:30", name: "Usman Tariq", type: "Online", note: "Prescription refill" },
];

export const Route = createFileRoute("/doctor/")({
  component: DoctorDashboard,
});

function DoctorDashboard() {
  return (
    <div>
      <WelcomeBanner
        greeting="Good morning 🩺"
        name="Dr. Ayesha Khan"
        subtitle="You have 8 appointments today and 3 patient messages awaiting reply."
        actions={
          <>
            <Button size="lg" variant="secondary" className="rounded-full"><MessageSquare className="mr-2 h-4 w-4" /> Patient inbox</Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">Open schedule</Button>
          </>
        }
        stats={[
          { label: "Today", value: "8 appts", icon: CalendarDays, tone: "primary" },
          { label: "Patients", value: "1,248", icon: Users, tone: "info" },
          { label: "Rating", value: "4.9 ★", icon: Star, tone: "warning" },
          { label: "Earnings", value: "Rs. 385k", icon: Banknote, tone: "success" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Earnings chart */}
        <div className="card-elevated rounded-2xl p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold">Earnings overview</div>
              <div className="text-xs text-muted-foreground">Last 7 months · Rs. thousands</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-primary">Rs. 1.94M</div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-success"><TrendingUp className="h-3 w-3" /> +13% vs last period</div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={revenue}>
                <defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={3} fill="url(#dg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient mix */}
        <div className="card-elevated rounded-2xl p-5">
          <div className="text-sm font-bold">Patient mix</div>
          <div className="text-xs text-muted-foreground">This month</div>
          <div className="mt-2 h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={patientMix} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={4}>
                  {patientMix.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
            {patientMix.map(p => (
              <div key={p.name} className="rounded-lg bg-muted/40 p-2"><div className="font-black">{p.value}</div><div className="text-muted-foreground">{p.name}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule + upcoming */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold"><Clock className="h-4 w-4 text-primary" /> Today's schedule</div>
          <div className="space-y-2">
            {today.map(s => (
              <div key={s.t} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-3">
                <div className="grid h-11 w-14 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary text-sm font-black">{s.t}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{s.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.note}</div>
                </div>
                <span className={`chip ${s.type === "Online" ? "bg-info/15 text-info" : ""}`}>
                  {s.type === "Online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                  {s.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated overflow-hidden rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-2 text-sm font-bold"><Stethoscope className="h-4 w-4 text-primary" /> Upcoming appointments</div>
            <Button variant="ghost" size="sm" className="text-primary">View all <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Patient</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.slice(0, 6).map(a => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={a.patientImage} className="h-9 w-9 rounded-full bg-muted" />
                      <div><div className="font-semibold">{a.patient}</div><div className="text-xs text-muted-foreground">MRN #{a.id.toUpperCase()}</div></div>
                    </div>
                  </TableCell>
                  <TableCell><div className="font-medium">{a.date}</div><div className="text-xs text-muted-foreground">{a.time}</div></TableCell>
                  <TableCell><span className="inline-flex items-center gap-1 text-sm">{a.type === "Online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}{a.type}</span></TableCell>
                  <TableCell><span className={`chip ${a.status === "Upcoming" ? "" : a.status === "Completed" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{a.status}</span></TableCell>
                  <TableCell className="text-right"><Button size="sm" className="rounded-full">Open</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
