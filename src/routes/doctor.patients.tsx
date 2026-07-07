import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, FileText, CalendarDays } from "lucide-react";
import { appointments, records } from "@/lib/mock-data";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const patients = [
  { name: "Ali Raza", age: 32, gender: "M", city: "Karachi", lastVisit: "Jun 28, 2026", condition: "Hypertension" },
  { name: "Zara Ahmed", age: 28, gender: "F", city: "Lahore", lastVisit: "Jun 15, 2026", condition: "Migraine" },
  { name: "Omar Sheikh", age: 45, gender: "M", city: "Islamabad", lastVisit: "May 30, 2026", condition: "Diabetes T2" },
  { name: "Hina Butt", age: 39, gender: "F", city: "Karachi", lastVisit: "May 10, 2026", condition: "Anxiety" },
];

export const Route = createFileRoute("/doctor/patients")({
  component: () => {
    const [selected, setSelected] = useState(patients[0]);
    return (
      <div>
        <PageHeader title="Patients" description="Search and manage your patient records." />
        <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
          <div className="card-elevated rounded-2xl p-3">
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search patients" className="pl-9" /></div>
            <div className="mt-3 space-y-1">
              {patients.map(p => (
                <button key={p.name} onClick={() => setSelected(p)} className={`w-full text-left rounded-lg p-3 transition ${selected.name === p.name ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <div className="font-medium">{p.name}</div>
                  <div className={`text-xs ${selected.name === p.name ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.age}yr · {p.gender} · {p.city}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="card-elevated rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(selected.name)}`} className="h-16 w-16 rounded-2xl bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold">{selected.name}</div>
                <div className="text-sm text-muted-foreground">{selected.age} years · {selected.gender === "M" ? "Male" : "Female"} · {selected.city}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="chip"><Phone className="h-3 w-3" /> +92 300 000 0000</span>
                  <span className="chip"><Mail className="h-3 w-3" /> patient@example.com</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="history">History</TabsTrigger><TabsTrigger value="reports">Reports</TabsTrigger></TabsList>
              <TabsContent value="overview" className="mt-4 grid gap-3 sm:grid-cols-2">
                <Info k="Last visit" v={selected.lastVisit} />
                <Info k="Condition" v={selected.condition} />
                <Info k="Blood group" v="B+" />
                <Info k="Allergies" v="None recorded" />
              </TabsContent>
              <TabsContent value="history" className="mt-4 space-y-2">
                {appointments.slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-sm">
                    <CalendarDays className="h-4 w-4 text-primary" /> {a.date} · {a.time}
                    <span className="ml-auto chip">{a.status}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="reports" className="mt-4 space-y-2">
                {records.map(r => (
                  <div key={r.id} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-sm">
                    <FileText className="h-4 w-4 text-primary" /> {r.name} <span className="text-muted-foreground">· {r.date}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  },
});

function Info({ k, v }: { k: string; v: string }) {
  return <div className="rounded-lg border border-border p-3"><div className="text-xs text-muted-foreground">{k}</div><div className="font-medium">{v}</div></div>;
}
