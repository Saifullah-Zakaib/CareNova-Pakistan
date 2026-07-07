import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Ban } from "lucide-react";
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Route = createFileRoute("/doctor/availability")({
  component: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div>
        <PageHeader title="Availability" description="Set your working hours and block time off." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="card-elevated rounded-2xl p-6">
            <div className="mb-4 font-semibold">Weekly hours</div>
            <div className="space-y-2">
              {days.map((d, i) => (
                <div key={d} className="flex items-center justify-between rounded-lg bg-muted/40 p-3 text-sm">
                  <div className="w-12 font-medium">{d}</div>
                  <div className="flex-1 text-muted-foreground">{i < 5 ? "9:00 AM — 6:00 PM" : "Closed"}</div>
                  <Switch defaultChecked={i < 5} />
                </div>
              ))}
            </div>
          </div>
          <div className="card-elevated rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between"><div className="font-semibold">Block a date</div><Button size="sm" variant="outline"><Ban className="mr-1 h-4 w-4" /> Block selected</Button></div>
            <div className="flex justify-center"><Calendar mode="single" selected={date} onSelect={setDate} className="pointer-events-auto" /></div>
          </div>
        </div>
      </div>
    );
  },
});
