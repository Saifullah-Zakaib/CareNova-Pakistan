import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/articles/")({
  head: () => ({ meta: [{ title: "Health Articles — CareNova" }, { name: "description", content: "Doctor-written health articles from verified specialists." }] }),
  component: ArticlesList,
});

function ArticlesList() {
  const [q, setQ] = useState("");
  const cats = ["All", ...Array.from(new Set(articles.map(a => a.category)))];
  const [cat, setCat] = useState("All");
  const filtered = articles.filter(a =>
    (cat === "All" || a.category === cat) &&
    (q === "" || a.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Health Blog"
        eyebrowIcon={BookOpen}
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        title="Health articles from"
        highlight="Pakistan's top doctors."
        description="Evidence-based guidance on nutrition, mental health, chronic disease and more — written by verified specialists."
      />
      <div className="relative z-10 -mt-8 mx-auto max-w-md px-4 sm:px-6">
        <div className="card-elevated relative rounded-full p-1.5">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles" className="border-transparent bg-transparent pl-10 focus-visible:ring-0" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(a => (
            <Link key={a.id} to="/articles/$id" params={{ id: a.id }} className="group card-elevated rounded-2xl overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={a.cover} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="chip">{a.category}</span>
                  <span className="text-muted-foreground">{a.readTime} min read</span>
                </div>
                <h3 className="mt-3 font-semibold leading-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <img src={a.authorImage} className="h-6 w-6 rounded-full bg-muted" />
                  <span>{a.author} · {a.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
