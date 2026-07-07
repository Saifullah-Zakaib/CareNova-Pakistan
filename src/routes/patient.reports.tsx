import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, TestTube2, Info, MessageCircleQuestion } from "lucide-react";

export const Route = createFileRoute("/patient/reports")({
  component: () => (
    <div>
      <PageHeader title="Report Explanation" description="Upload a lab report and let CareNova AI explain it in plain language." actions={<Button><Upload className="mr-2 h-4 w-4" /> Upload report</Button>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="card-elevated rounded-2xl border-dashed border-2 border-border p-10 text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <div className="mt-3 font-medium">Drop your lab report here</div>
          <div className="text-xs text-muted-foreground">We support CBC, LFT, Lipid Profile, Thyroid & more</div>
          <Button className="mt-4">Browse files</Button>
        </div>

        <div className="space-y-4">
          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Summary</div>
            <p className="mt-2 text-sm text-muted-foreground">Your Complete Blood Count is largely within normal limits. Slightly low hemoglobin suggests mild iron-deficiency anemia — usually manageable with diet and follow-up.</p>
          </div>
          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 font-semibold"><TestTube2 className="h-4 w-4 text-primary" /> Important values</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              {[
                { k: "Hemoglobin", v: "11.8 g/dL", flag: "Low", tone: "warning" },
                { k: "WBC", v: "7.2 x10⁹/L", flag: "Normal", tone: "success" },
                { k: "Platelets", v: "245 x10⁹/L", flag: "Normal", tone: "success" },
                { k: "MCV", v: "78 fL", flag: "Slightly low", tone: "warning" },
              ].map(v => (
                <div key={v.k} className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground">{v.k}</div>
                  <div className="font-semibold">{v.v}</div>
                  <span className={`chip mt-1 ${v.tone === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"}`}>{v.flag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 font-semibold"><Info className="h-4 w-4 text-primary" /> Simple explanation</div>
            <p className="mt-2 text-sm text-muted-foreground">Think of hemoglobin as the delivery trucks in your bloodstream — they carry oxygen. Yours are slightly low, so you may feel tired or lightheaded. Iron-rich foods and a targeted supplement usually help.</p>
          </div>
          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-center gap-2 font-semibold"><MessageCircleQuestion className="h-4 w-4 text-primary" /> Questions to ask your doctor</div>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              <li>Do I need an iron supplement — and for how long?</li>
              <li>Should I test ferritin and vitamin B12 too?</li>
              <li>Any dietary changes you recommend?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
});
