import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { prescriptions } from "@/lib/mock-data";
import { Plus, Pill } from "lucide-react";

export const Route = createFileRoute("/doctor/prescriptions")({
  component: () => (
    <div>
      <PageHeader title="Prescriptions" description="Create and manage prescriptions." actions={<Button><Plus className="mr-2 h-4 w-4" /> New prescription</Button>} />
      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.map(p => (
          <div key={p.id} className="card-elevated rounded-2xl p-5">
            <div className="flex items-center justify-between"><div><div className="font-semibold">Patient · Ali Raza</div><div className="text-xs text-muted-foreground">{p.date}</div></div><span className="chip"><Pill className="h-3 w-3" /> Active</span></div>
            <div className="mt-3 space-y-2">{p.medicines.map(m => <div key={m.name} className="rounded-lg bg-muted/40 p-2 text-sm"><b>{m.name}</b> · <span className="text-muted-foreground">{m.dose}</span></div>)}</div>
          </div>
        ))}
      </div>
    </div>
  ),
});
