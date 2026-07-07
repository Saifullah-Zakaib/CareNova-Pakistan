import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { articles } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/doctor/articles")({
  component: () => (
    <div>
      <PageHeader title="Your articles" description="Publish evidence-based health content."
        actions={
          <Dialog>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New article</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Create article</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input className="mt-1.5" placeholder="Article title" /></div>
                <div><Label>Category</Label><Input className="mt-1.5" placeholder="e.g. Cardiology" /></div>
                <div><Label>Cover image URL</Label><Input className="mt-1.5" placeholder="https://..." /></div>
                <div><Label>Content</Label><Textarea className="mt-1.5 min-h-40" placeholder="Write your article…" /></div>
                <div className="flex justify-end gap-2"><Button variant="outline">Save draft</Button><Button>Publish</Button></div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.slice(0, 4).map(a => (
          <div key={a.id} className="card-elevated overflow-hidden rounded-2xl">
            <img src={a.cover} className="aspect-video w-full object-cover" alt="" />
            <div className="p-4">
              <span className="chip">{a.category}</span>
              <div className="mt-2 font-semibold">{a.title}</div>
              <div className="mt-3 flex gap-2"><Button size="sm" variant="outline"><Edit className="mr-1 h-3.5 w-3.5" /> Edit</Button><Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="mr-1 h-3.5 w-3.5" /> Delete</Button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
