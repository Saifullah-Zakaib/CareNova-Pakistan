import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/patient/profile")({
  component: () => (
    <div>
      <PageHeader title="Profile" description="Keep your details up to date for better care." />
      <div className="card-elevated max-w-3xl rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Ali%20Raza" className="h-20 w-20 rounded-2xl bg-muted" />
          <div><div className="font-semibold text-lg">Ali Raza</div><div className="text-sm text-muted-foreground">ali.raza@example.com</div></div>
          <Button variant="outline" className="ml-auto">Change photo</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <F label="Full name" value="Ali Raza" />
          <F label="Date of birth" value="1994-06-12" type="date" />
          <F label="Phone" value="+92 300 1234567" />
          <F label="City" value="Karachi" />
          <F label="Blood group" value="B+" />
          <F label="Emergency contact" value="+92 301 7654321" />
        </div>
        <div className="mt-4">
          <Label>Known allergies / conditions</Label>
          <Textarea className="mt-1.5" defaultValue="No known drug allergies. Mild seasonal allergies." />
        </div>
        <div className="mt-6 flex gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  ),
});
function F({ label, ...rest }: { label: string } & React.ComponentProps<typeof Input>) {
  return <div><Label>{label}</Label><Input className="mt-1.5" defaultValue={rest.value as string} {...rest} /></div>;
}
