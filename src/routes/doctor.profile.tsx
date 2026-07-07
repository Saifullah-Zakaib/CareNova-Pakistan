import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctor/profile")({
  component: () => (
    <div>
      <PageHeader title="Doctor Profile" description="This is what patients see when they view your profile." />
      <div className="card-elevated max-w-4xl rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha%20Khan" className="h-20 w-20 rounded-2xl bg-muted" />
          <div><div className="font-semibold text-lg">Dr. Ayesha Khan</div><div className="text-sm text-muted-foreground">Cardiologist · AKUH</div></div>
          <Button variant="outline" className="ml-auto">Change photo</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <F label="Full name" v="Dr. Ayesha Khan" />
          <F label="Specialty" v="Cardiologist" />
          <F label="PMC registration" v="PMC-98123" />
          <F label="Experience (years)" v="12" />
          <F label="Hospital" v="Aga Khan University Hospital" />
          <F label="City" v="Karachi" />
          <F label="Consultation fee (Rs.)" v="3500" />
          <F label="Languages" v="English, Urdu, Sindhi" />
        </div>
        <div className="mt-4"><Label>About</Label><Textarea className="mt-1.5 min-h-32" defaultValue="Consultant cardiologist with over a decade of experience in complex cardiovascular conditions." /></div>
        <div className="mt-6 flex justify-end gap-2"><Button variant="outline">Cancel</Button><Button>Save changes</Button></div>
      </div>
    </div>
  ),
});
function F({ label, v }: { label: string; v: string }) { return <div><Label>{label}</Label><Input className="mt-1.5" defaultValue={v} /></div>; }
