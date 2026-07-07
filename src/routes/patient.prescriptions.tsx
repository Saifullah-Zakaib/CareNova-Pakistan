import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { prescriptions } from "@/lib/mock-data";
import { Pill, Sparkles, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/patient/prescriptions")({
  component: () => (
    <div>
      <PageHeader title="Prescriptions" description="All your prescriptions in one place, with AI explanations." />
      <div className="grid gap-6 lg:grid-cols-2">
        {prescriptions.map(p => (
          <div key={p.id} className="card-elevated rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.doctor}</div>
                <div className="text-xs text-muted-foreground">Prescribed on {p.date}</div>
              </div>
              <span className="chip"><Pill className="h-3 w-3" /> Rx</span>
            </div>
            <div className="mt-4 space-y-3">
              {p.medicines.map(m => (
                <div key={m.name} className="rounded-xl bg-muted/40 p-3">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.dose} · {m.duration}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3 text-sm">
              <div className="font-medium">Instructions</div>
              <div className="text-muted-foreground">{p.instructions}</div>
            </div>
            <div className="mt-4 rounded-xl bg-primary-soft p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-primary"><Sparkles className="h-4 w-4" /> AI explanation</div>
              <ul className="space-y-1 text-foreground/85">
                <li>• <b>Purpose:</b> Lowering cholesterol and reducing cardiovascular risk.</li>
                <li>• <b>Take with:</b> Food, ideally at the same time each day.</li>
                <li>• <b>Watch for:</b> Muscle pain, jaundice — report to your doctor immediately.</li>
              </ul>
              <div className="mt-3 flex items-start gap-2 text-xs text-warning-foreground bg-warning/20 rounded-lg p-2">
                <ShieldAlert className="h-3.5 w-3.5 mt-0.5" /> Always follow your doctor's instructions — AI explanations are for education only.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
