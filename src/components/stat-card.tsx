import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "primary",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; direction: "up" | "down" };
  tone?: "primary" | "accent" | "success" | "info" | "warning";
}) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent/15 text-accent",
    success: "bg-success/15 text-success",
    info: "bg-info/15 text-info",
    warning: "bg-warning/20 text-warning-foreground",
  } as const;
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
          <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
          {trend && (
            <div className={`mt-1 inline-flex items-center gap-1 text-xs ${trend.direction === "up" ? "text-success" : "text-destructive"}`}>
              {trend.direction === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.value}
            </div>
          )}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
