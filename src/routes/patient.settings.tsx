import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/patient/settings")({
  component: () => (
    <div>
      <PageHeader title="Settings" description="Notifications, security and preferences." />
      <div className="card-elevated max-w-3xl rounded-2xl p-6 space-y-6">
        {[
          { t: "Email notifications", d: "Appointment reminders, prescriptions and reports.", on: true },
          { t: "SMS reminders", d: "Text message the day of your appointment.", on: true },
          { t: "AI insights", d: "Personalised weekly health recommendations.", on: true },
          { t: "Share data with my doctor", d: "Grant your booked doctor read-access to relevant records.", on: false },
        ].map((s, i) => (
          <div key={i} className="flex items-start justify-between gap-4 border-b border-border pb-6 last:border-0 last:pb-0">
            <div><Label className="font-medium">{s.t}</Label><p className="text-sm text-muted-foreground">{s.d}</p></div>
            <Switch defaultChecked={s.on} />
          </div>
        ))}
        <div className="pt-2">
          <Button variant="destructive">Delete account</Button>
        </div>
      </div>
    </div>
  ),
});
