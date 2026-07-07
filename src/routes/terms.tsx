import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — CareNova" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Legal"
        eyebrowIcon={FileText}
        size="sm"
        crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
        title="Terms of"
        highlight="Service"
        description="Please read carefully before using the CareNova platform."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 prose prose-slate">
        <p>By using CareNova you agree to these terms. CareNova AI provides guidance only — it is not a substitute for professional medical advice. Always consult a qualified doctor for diagnosis and treatment.</p>
      </div>
      <PublicFooter />
    </div>
  ),
});
