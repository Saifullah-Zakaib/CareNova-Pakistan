import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/mock-data";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";

export const Route = createFileRoute("/articles/$id")({
  loader: ({ params }) => {
    const article = articles.find(a => a.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.article.title} — CareNova` : "Article" },
      { name: "description", content: loaderData?.article.excerpt ?? "" },
      ...(loaderData ? [{ property: "og:image", content: loaderData.article.cover }] : []),
    ],
  }),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article } = Route.useLoaderData();
  const related = articles.filter(a => a.id !== article.id).slice(0, 3);
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow={article.category}
        eyebrowIcon={BookOpen}
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/articles" }, { label: article.title.slice(0, 40) + "…" }]}
        title={article.title}
        size="sm"
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/articles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to articles</Link>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <img src={article.authorImage} className="h-10 w-10 rounded-full bg-muted" />
          <div>
            <div className="font-medium text-foreground">{article.author}</div>
            <div className="inline-flex items-center gap-2">{article.date} · <Clock className="h-3 w-3" /> {article.readTime} min read</div>
          </div>
        </div>
        <img src={article.cover} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" alt="" />
        <div className="prose prose-slate mt-8 max-w-none text-foreground/90">
          <p className="text-lg leading-relaxed">{article.content}</p>
          <p className="mt-4 leading-relaxed">Regular check-ins with your doctor and understanding your family history are two of the most powerful things you can do. Stay curious, ask questions, and remember that small habits compound into decades of health.</p>
          <h2 className="mt-8 text-xl font-semibold">Key takeaways</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Consistency beats intensity — build habits you can sustain.</li>
            <li>Screen early, screen often. Prevention is cheaper than cure.</li>
            <li>Talk to a qualified specialist if symptoms persist.</li>
          </ul>
        </div>
      </article>


      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">Related articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map(a => (
            <Link key={a.id} to="/articles/$id" params={{ id: a.id }} className="group card-elevated rounded-2xl overflow-hidden">
              <img src={a.cover} className="aspect-video w-full object-cover" alt="" />
              <div className="p-4">
                <span className="chip">{a.category}</span>
                <div className="mt-2 font-semibold leading-tight">{a.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
