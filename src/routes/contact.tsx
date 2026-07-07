import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — CareNova" }, { name: "description", content: "Reach the CareNova team for support, partnerships and press." }] }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: "hello@carenova.pk" },
    { icon: Phone, label: "Phone", value: "+92 21 111 222 333" },
    { icon: MapPin, label: "Office", value: "Shahrah-e-Faisal, Karachi" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Get in touch"
        eyebrowIcon={MessageSquare}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="We'd love to"
        highlight="hear from you."
        description="Whether you're a patient, doctor or partner — our team responds within one business day."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.label} className="card-elevated flex items-center gap-4 rounded-2xl p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary"><i.icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">{i.label}</div>
                  <div className="font-semibold">{i.value}</div>
                </div>
              </div>
            ))}
          </div>
          <form className="card-elevated rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Full name</Label><Input className="mt-1.5" placeholder="Ali Raza" /></div>
              <div><Label>Email</Label><Input className="mt-1.5" type="email" placeholder="you@example.com" /></div>
            </div>
            <div className="mt-4"><Label>Subject</Label><Input className="mt-1.5" placeholder="How can we help?" /></div>
            <div className="mt-4"><Label>Message</Label><Textarea className="mt-1.5 min-h-32" placeholder="Tell us more..." /></div>
            <Button className="mt-5 rounded-full px-7">Send message</Button>
          </form>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
