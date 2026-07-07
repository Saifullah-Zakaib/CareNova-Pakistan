import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { DoctorCard } from "@/components/doctor-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors, specialties, cities } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/patient/doctors")({
  component: FindDoctorsPatient,
});

function FindDoctorsPatient() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("all");
  const [city, setCity] = useState("all");
  const filtered = doctors.filter(d =>
    (!q || d.name.toLowerCase().includes(q.toLowerCase())) &&
    (spec === "all" || d.specialty === spec) &&
    (city === "all" || d.city === city)
  );
  return (
    <div>
      <PageHeader title="Find doctors" description="Search verified specialists near you." />
      <div className="card-elevated grid gap-2 rounded-2xl p-3 sm:grid-cols-[1fr_1fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Doctor name" className="pl-9 border-transparent bg-muted/40" />
        </div>
        <Select value={spec} onValueChange={setSpec}><SelectTrigger className="border-transparent bg-muted/40"><SelectValue placeholder="Specialty" /></SelectTrigger><SelectContent><SelectItem value="all">All specialties</SelectItem>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        <Select value={city} onValueChange={setCity}><SelectTrigger className="border-transparent bg-muted/40"><SelectValue placeholder="City" /></SelectTrigger><SelectContent><SelectItem value="all">All cities</SelectItem>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}
      </div>
    </div>
  );
}
