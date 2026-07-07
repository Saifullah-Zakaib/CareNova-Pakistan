import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/doctor/settings")({
  component: () => (
    <div>
      <PageHeader title="Settings" />
      <div className="card-elevated max-w-3xl rounded-2xl p-6 space-y-6">
        {[
          { t: "Accepting new patients", d: "Show 'Book' button on your public profile.", on: true },
          { t: "Online consultations", d: "Allow video consultations.", on: true },
          { t: "Auto-confirm bookings", d: "Confirm compatible slots automatically.", on: false },
          { t: "Weekly summary email", d: "Get a Monday morning digest.", on: true },
        ].map((s, i) => (
          <div key={i} className="flex items-start justify-between gap-4 border-b border-border pb-6 last:border-0 last:pb-0">
            <div><Label className="font-medium">{s.t}</Label><p className="text-sm text-muted-foreground">{s.d}</p></div>
            <Switch defaultChecked={s.on} />
          </div>
        ))}
      </div>
    </div>
  ),
});
