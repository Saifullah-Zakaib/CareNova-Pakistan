import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { articles } from "@/lib/mock-data";

export const Route = createFileRoute("/patient/articles")({
  component: () => (
    <div>
      <PageHeader title="Health articles" description="Curated for you by our doctors." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map(a => (
          <Link key={a.id} to="/articles/$id" params={{ id: a.id }} className="card-elevated overflow-hidden rounded-2xl">
            <img src={a.cover} className="aspect-video w-full object-cover" alt="" />
            <div className="p-4">
              <span className="chip">{a.category}</span>
              <div className="mt-2 font-semibold leading-tight">{a.title}</div>
              <div className="mt-2 text-xs text-muted-foreground">{a.author} · {a.readTime} min</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});
