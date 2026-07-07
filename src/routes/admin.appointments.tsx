import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments, doctors } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/appointments")({
  component: () => (
    <div>
      <PageHeader title="Appointments" description="All bookings across the platform." />
      <div className="card-elevated rounded-2xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Doctor</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {appointments.map(a => {
              const d = doctors.find(x => x.id === a.doctorId);
              return (
                <TableRow key={a.id}>
                  <TableCell><div className="flex items-center gap-3"><img src={a.patientImage} className="h-8 w-8 rounded-full bg-muted" />{a.patient}</div></TableCell>
                  <TableCell>{d?.name}</TableCell><TableCell>{a.date} · {a.time}</TableCell>
                  <TableCell><span className="chip">{a.status}</span></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
