import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/doctor/appointments")({
  component: () => (
    <div>
      <PageHeader title="Appointments" description="Manage all your patient bookings." />
      <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="today">Today</TabsTrigger><TabsTrigger value="pending">Pending</TabsTrigger></TabsList></Tabs>
      <div className="card-elevated mt-4 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
          <TableBody>
            {appointments.map(a => (
              <TableRow key={a.id}>
                <TableCell><div className="flex items-center gap-3"><img src={a.patientImage} className="h-9 w-9 rounded-full bg-muted" /><span className="font-medium">{a.patient}</span></div></TableCell>
                <TableCell>{a.date}</TableCell>
                <TableCell>{a.time}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell><span className="chip">{a.status}</span></TableCell>
                <TableCell className="text-right"><div className="flex justify-end gap-2"><Button size="sm" variant="outline">View</Button><Button size="sm">Start</Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
