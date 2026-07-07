import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { records } from "@/lib/mock-data";
import { Upload, FileText, Download, Eye } from "lucide-react";

export const Route = createFileRoute("/patient/records")({
  component: () => (
    <div>
      <PageHeader
        title="Medical Records"
        description="Upload and manage your lab reports, prescriptions and files — all encrypted."
        actions={<Button><Upload className="mr-2 h-4 w-4" /> Upload document</Button>}
      />
      <div className="card-elevated rounded-2xl border-dashed border-2 border-border p-10 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <div className="mt-3 font-medium">Drag & drop a file, or click to browse</div>
        <div className="text-xs text-muted-foreground">PDF, JPG, PNG · Max 20MB</div>
      </div>
      <div className="mt-6 grid gap-3">
        {records.map(r => (
          <div key={r.id} className="card-elevated flex flex-wrap items-center gap-4 rounded-2xl p-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><FileText className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.doctor} · {r.date}</div>
            </div>
            <span className="chip">{r.category}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline"><Eye className="mr-1 h-4 w-4" /> View</Button>
              <Button size="sm" variant="outline"><Download className="mr-1 h-4 w-4" /> Download</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
