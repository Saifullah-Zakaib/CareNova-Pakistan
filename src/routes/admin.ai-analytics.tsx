import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { StatCard } from "@/components/stat-card";
import { Sparkles, MessageCircle, Zap, Brain } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const daily = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`, requests: 200 + Math.round(Math.sin(i) * 60 + i * 15),
}));
const topSymptoms = [
  { s: "Fever", n: 428 }, { s: "Headache", n: 371 }, { s: "Cough", n: 290 },
  { s: "Body pain", n: 244 }, { s: "Stomach ache", n: 198 },
];

export const Route = createFileRoute("/admin/ai-analytics")({
  component: () => (
    <div>
      <PageHeader title="AI Analytics" description="How patients are using CareNova AI." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total AI chats" value="204,318" icon={Sparkles} tone="primary" trend={{ value: "+38% MoM", direction: "up" }} />
        <StatCard label="Avg. response time" value="1.4s" icon={Zap} tone="success" />
        <StatCard label="Redirected to doctor" value="34%" icon={MessageCircle} tone="info" />
        <StatCard label="Satisfaction" value="4.7/5" icon={Brain} tone="accent" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated lg:col-span-2 rounded-2xl p-5">
          <div className="text-sm font-semibold">Daily AI requests</div>
          <div className="mt-2 h-64">
            <ResponsiveContainer>
              <BarChart data={daily}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="d" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="requests" fill="var(--primary)" radius={[6, 6, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-elevated rounded-2xl p-5">
          <div className="text-sm font-semibold">Top reported symptoms</div>
          <div className="mt-4 space-y-3">
            {topSymptoms.map(t => (
              <div key={t.s}>
                <div className="flex justify-between text-sm"><span>{t.s}</span><span className="text-muted-foreground">{t.n}</span></div>
                <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(t.n / 428) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});
