import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div>
      <PageHeader title="Platform settings" />
      <div className="card-elevated max-w-3xl rounded-2xl p-6 space-y-6">
        {[
          { t: "Auto-verify hospitals", d: "Trust hospital-registered doctors automatically.", on: false },
          { t: "AI chat available", d: "Enable AI assistant for all patients.", on: true },
          { t: "Onboarding emails", d: "Send welcome sequence to new users.", on: true },
          { t: "Maintenance mode", d: "Show maintenance banner to all users.", on: false },
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
