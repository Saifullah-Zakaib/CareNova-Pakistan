import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { AiChat } from "@/components/ai-chat";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({ meta: [{ title: "AI Health Assistant — CareNova" }, { name: "description", content: "Chat with CareNova AI for personalised, safe health guidance and specialist recommendations." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="AI Health Assistant"
        eyebrowIcon={Sparkles}
        crumbs={[{ label: "Home", to: "/" }, { label: "AI Assistant" }]}
        title="Describe symptoms."
        highlight="Get smart guidance."
        description="Ask any health question — CareNova AI assesses severity and recommends the right specialist. Not a replacement for a doctor."
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="card-elevated rounded-3xl p-2 sm:p-4">
          <AiChat compact />
        </div>
      </div>
      <PublicFooter />
    </div>
  ),
});
