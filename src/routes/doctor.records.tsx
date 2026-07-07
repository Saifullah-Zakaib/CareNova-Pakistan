import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { records, prescriptions } from "@/lib/mock-data";
import { FileText, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctor/records")({
  component: () => (
    <div>
      <PageHeader title="Medical records" description="Access shared patient records securely." />
      <div className="grid gap-3">
        {records.map(r => (
          <div key={r.id} className="card-elevated flex items-center gap-4 rounded-2xl p-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><FileText className="h-5 w-5" /></div>
            <div className="flex-1 min-w-0"><div className="truncate font-medium">{r.name}</div><div className="text-xs text-muted-foreground">Patient · {r.date}</div></div>
            <span className="chip">{r.category}</span>
            <Button size="sm">Open</Button>
          </div>
        ))}
      </div>
    </div>
  ),
});

export const _p = prescriptions; export const _pi = Pill;
