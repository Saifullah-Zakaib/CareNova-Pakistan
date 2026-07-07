import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { AiChat } from "@/components/ai-chat";

export const Route = createFileRoute("/patient/ai")({
  component: () => (
    <div>
      <PageHeader title="AI Health Assistant" description="Ask about symptoms, medications or your reports — anytime." />
      <AiChat />
    </div>
  ),
});
