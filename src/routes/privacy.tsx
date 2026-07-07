import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — CareNova" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Legal"
        eyebrowIcon={Shield}
        size="sm"
        crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
        title="Privacy"
        highlight="Policy"
        description="Your health information is sensitive. We treat it that way."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 prose prose-slate">
        <h2>What we collect</h2>
        <p>Account details, appointment history, uploaded records and chat with our AI — all used only to deliver care. Data is encrypted in transit and at rest, and never sold to third parties.</p>
        <h2>Your rights</h2>
        <p>You can export or permanently delete your data at any time from Settings.</p>
        <h2>Contact</h2>
        <p>For any privacy concerns, email privacy@carenova.pk.</p>
      </div>
      <PublicFooter />
    </div>
  ),
});
