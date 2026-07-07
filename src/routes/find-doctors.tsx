import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { DoctorCard } from "@/components/doctor-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { doctors, specialties, cities } from "@/lib/mock-data";
import { Filter, Search, Stethoscope } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/find-doctors")({
  head: () => ({
    meta: [
      { title: "Find Doctors — CareNova Pakistan" },
      { name: "description", content: "Search verified doctors by specialty, city, rating and fee across Pakistan." },
    ],
  }),
  component: FindDoctors,
});

function FindDoctors() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [fee, setFee] = useState([5000]);
  const [gender, setGender] = useState("any");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = doctors.filter((d) => {
    if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (spec !== "all" && d.specialty !== spec) return false;
    if (city !== "all" && d.city !== city) return false;
    if (d.fee > fee[0]) return false;
    if (gender !== "any" && d.gender !== gender) return false;
    if (onlineOnly && !d.online) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Doctor Directory"
        eyebrowIcon={Stethoscope}
        crumbs={[{ label: "Home", to: "/" }, { label: "Find Doctor" }]}
        title="Find the right"
        highlight="doctor for you."
        description={`${filtered.length} verified consultants available across Pakistan — filter by specialty, city, gender and fee.`}
      />
      <div className="relative z-10 -mt-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="card-elevated grid gap-2 rounded-2xl p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Doctor name" className="pl-9 border-transparent bg-muted/50" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={spec} onValueChange={setSpec}>
            <SelectTrigger className="border-transparent bg-muted/50"><SelectValue placeholder="Specialty" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All specialties</SelectItem>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="border-transparent bg-muted/50"><SelectValue placeholder="City" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All cities</SelectItem>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Button className="rounded-lg"><Search className="h-4 w-4" /></Button>
        </div>
      </div>


      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="card-elevated rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4" /> Filters</div>
            <div className="space-y-6 text-sm">
              <div>
                <div className="mb-2 font-medium">Gender</div>
                <RadioGroup value={gender} onValueChange={setGender}>
                  {["any", "Male", "Female"].map(g => (
                    <div key={g} className="flex items-center gap-2"><RadioGroupItem id={g} value={g} /><Label htmlFor={g} className="capitalize">{g}</Label></div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between font-medium">Max fee <span className="text-muted-foreground">Rs. {fee[0].toLocaleString()}</span></div>
                <Slider min={500} max={5000} step={500} value={fee} onValueChange={setFee} />
              </div>
              <div>
                <div className="mb-2 font-medium">Availability</div>
                <label className="flex items-center gap-2">
                  <Checkbox checked={onlineOnly} onCheckedChange={(v) => setOnlineOnly(Boolean(v))} />
                  Online consultation
                </label>
              </div>
              <div>
                <div className="mb-2 font-medium">Rating</div>
                {[4.5, 4.0, 3.5].map(r => (
                  <label key={r} className="flex items-center gap-2 py-1"><Checkbox /> {r}+ stars</label>
                ))}
              </div>
              <div>
                <div className="mb-2 font-medium">Experience</div>
                {["1-5 yrs", "5-10 yrs", "10+ yrs"].map(r => (
                  <label key={r} className="flex items-center gap-2 py-1"><Checkbox /> {r}</label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {filtered.length === 0 ? (
            <div className="card-elevated rounded-2xl p-12 text-center">
              <div className="text-lg font-semibold">No doctors match your filters</div>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your search or clearing some filters.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}
            </div>
          )}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
