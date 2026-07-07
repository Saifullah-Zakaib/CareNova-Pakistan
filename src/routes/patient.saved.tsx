import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { DoctorCard } from "@/components/doctor-card";
import { doctors } from "@/lib/mock-data";

export const Route = createFileRoute("/patient/saved")({
  component: () => (
    <div>
      <PageHeader title="Saved doctors" description="Quick access to doctors you've bookmarked." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {doctors.slice(0, 5).map(d => <DoctorCard key={d.id} doctor={d} />)}
      </div>
    </div>
  ),
});
