import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Star } from "lucide-react";

const reviews = [
  { name: "Ali R.", rating: 5, text: "Very kind and thorough. Explained everything clearly.", date: "2 weeks ago" },
  { name: "Sana M.", rating: 5, text: "Best cardiologist I've been to. Highly recommended.", date: "1 month ago" },
  { name: "Zara K.", rating: 4, text: "Great experience overall. Slight wait time.", date: "1 month ago" },
  { name: "Hamza F.", rating: 5, text: "Patient, knowledgeable, and gentle. Trustworthy doctor.", date: "2 months ago" },
];

export const Route = createFileRoute("/doctor/reviews")({
  component: () => (
    <div>
      <PageHeader title="Reviews" description="What your patients are saying." />
      <div className="card-elevated mb-4 flex flex-wrap items-center gap-6 rounded-2xl p-6">
        <div className="text-5xl font-bold text-primary">4.9</div>
        <div><div className="flex text-warning">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-warning" />)}</div><div className="text-sm text-muted-foreground">Based on 342 reviews</div></div>
      </div>
      <div className="grid gap-3">
        {reviews.map((r, i) => (
          <div key={i} className="card-elevated rounded-2xl p-5">
            <div className="flex items-center justify-between"><div className="font-medium">{r.name}</div><div className="flex text-warning">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-warning" />)}</div></div>
            <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            <div className="mt-1 text-xs text-muted-foreground">{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  ),
});
