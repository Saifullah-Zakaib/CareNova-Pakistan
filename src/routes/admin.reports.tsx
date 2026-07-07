import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { StatCard } from "@/components/stat-card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const monthly = [
  { m: "Jan", bookings: 1120, revenue: 220 }, { m: "Feb", bookings: 1420, revenue: 270 },
  { m: "Mar", bookings: 1780, revenue: 340 }, { m: "Apr", bookings: 2100, revenue: 400 },
  { m: "May", bookings: 2560, revenue: 490 }, { m: "Jun", bookings: 3040, revenue: 590 },
  { m: "Jul", bookings: 3620, revenue: 720 },
];

export const Route = createFileRoute("/admin/reports")({
  component: () => (
    <div>
      <PageHeader title="Reports" description="Business KPIs and downloadable exports." actions={<Button><Download className="mr-2 h-4 w-4" /> Export CSV</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Revenue (YTD)" value="Rs. 3.03 Cr" icon={Download} tone="success" />
        <StatCard label="Avg. rating" value="4.82" icon={Download} tone="warning" />
        <StatCard label="Churn" value="1.9%" icon={Download} tone="info" />
      </div>
      <div className="mt-6 card-elevated rounded-2xl p-5">
        <div className="text-sm font-semibold">Bookings & revenue</div>
        <div className="mt-2 h-72">
          <ResponsiveContainer>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="var(--primary)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  ),
});
