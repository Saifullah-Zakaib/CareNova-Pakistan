import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { doctors, appointments } from "@/lib/mock-data";
import { Video, MapPin } from "lucide-react";

export const Route = createFileRoute("/patient/appointments")({
  component: PatientAppointments,
});

function StatusBadge({ s }: { s: string }) {
  const tone =
    s === "Upcoming" ? "bg-info/15 text-info" :
    s === "Completed" ? "bg-success/15 text-success" :
    s === "Cancelled" ? "bg-destructive/15 text-destructive" :
    "bg-warning/15 text-warning-foreground";
  return <span className={`chip ${tone}`}>{s}</span>;
}

function PatientAppointments() {
  const groups = {
    upcoming: appointments.filter(a => a.status === "Upcoming" || a.status === "Pending"),
    past: appointments.filter(a => a.status === "Completed" || a.status === "Cancelled"),
  };
  return (
    <div>
      <PageHeader title="Appointments" description="Manage your upcoming and past appointments." />
      <Tabs defaultValue="upcoming">
        <TabsList><TabsTrigger value="upcoming">Upcoming ({groups.upcoming.length})</TabsTrigger><TabsTrigger value="past">Past ({groups.past.length})</TabsTrigger></TabsList>
        {(["upcoming", "past"] as const).map(k => (
          <TabsContent key={k} value={k} className="mt-4">
            <div className="card-elevated rounded-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Doctor</TableHead><TableHead>Date & Time</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {groups[k].map(a => {
                    const d = doctors.find(x => x.id === a.doctorId)!;
                    return (
                      <TableRow key={a.id}>
                        <TableCell><div className="flex items-center gap-3"><img src={d.image} className="h-9 w-9 rounded-full bg-muted" /><div><div className="font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.specialty}</div></div></div></TableCell>
                        <TableCell>{a.date}<div className="text-xs text-muted-foreground">{a.time}</div></TableCell>
                        <TableCell><span className="inline-flex items-center gap-1 text-sm">{a.type === "Online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}{a.type}</span></TableCell>
                        <TableCell><StatusBadge s={a.status} /></TableCell>
                        <TableCell className="text-right"><Button size="sm" variant="outline">Details</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {groups[k].length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">No appointments to show.</div>}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
