import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Building2, MapPin } from "lucide-react";

const hospitals = [
  { name: "Aga Khan University Hospital", city: "Karachi", doctors: 214 },
  { name: "Shifa International Hospital", city: "Islamabad", doctors: 178 },
  { name: "Liaquat National Hospital", city: "Karachi", doctors: 156 },
  { name: "Children's Hospital Lahore", city: "Lahore", doctors: 142 },
  { name: "Hameed Latif Hospital", city: "Lahore", doctors: 98 },
  { name: "PIMS Islamabad", city: "Islamabad", doctors: 205 },
];

export const Route = createFileRoute("/admin/hospitals")({
  component: () => (
    <div>
      <PageHeader title="Hospitals" description="Hospitals partnered with CareNova." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hospitals.map(h => (
          <div key={h.name} className="card-elevated rounded-2xl p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><Building2 className="h-5 w-5" /></div>
            <div className="mt-4 font-semibold">{h.name}</div>
            <div className="text-sm text-muted-foreground inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {h.city}</div>
            <div className="mt-3 text-sm">{h.doctors} doctors listed</div>
          </div>
        ))}
      </div>
    </div>
  ),
});
