import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const patients = Array.from({ length: 8 }).map((_, i) => ({
  id: i, name: ["Ali Raza", "Sana Malik", "Zara Ahmed", "Omar Sheikh", "Hina Butt", "Rehan Khan", "Faisal Iqbal", "Ayesha Bibi"][i],
  city: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Karachi", "Peshawar", "Lahore"][i],
  age: [32, 27, 45, 51, 38, 24, 60, 29][i], appts: [3, 1, 6, 2, 4, 1, 8, 2][i],
}));

export const Route = createFileRoute("/admin/patients")({
  component: () => (
    <div>
      <PageHeader title="Patients" description="All registered patients on the platform." />
      <div className="card-elevated rounded-2xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>City</TableHead><TableHead>Age</TableHead><TableHead>Appointments</TableHead></TableRow></TableHeader>
          <TableBody>
            {patients.map(p => (
              <TableRow key={p.id}>
                <TableCell><div className="flex items-center gap-3"><img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(p.name)}`} className="h-9 w-9 rounded-full bg-muted" /><div className="font-medium">{p.name}</div></div></TableCell>
                <TableCell>{p.city}</TableCell><TableCell>{p.age}</TableCell><TableCell>{p.appts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
});
