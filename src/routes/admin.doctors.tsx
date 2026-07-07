import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/mock-data";
import { Check, X, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/doctors")({
  component: () => (
    <div>
      <PageHeader title="Doctors" description="Manage all doctors on the platform." />
      <div className="card-elevated rounded-2xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Doctor</TableHead><TableHead>Specialty</TableHead><TableHead>City</TableHead><TableHead>Rating</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {doctors.map(d => (
              <TableRow key={d.id}>
                <TableCell><div className="flex items-center gap-3"><img src={d.image} className="h-9 w-9 rounded-full bg-muted" /><div><div className="font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.qualification}</div></div></div></TableCell>
                <TableCell>{d.specialty}</TableCell>
                <TableCell>{d.city}</TableCell>
                <TableCell>{d.rating} ★</TableCell>
                <TableCell><span className={`chip ${d.verified ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"}`}>{d.verified ? "Verified" : "Pending"}</span></TableCell>
                <TableCell className="text-right"><div className="flex justify-end gap-2"><Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" /></Button><Button size="sm" variant="outline"><Check className="h-3.5 w-3.5" /></Button><Button size="sm" variant="ghost" className="text-destructive"><X className="h-3.5 w-3.5" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
