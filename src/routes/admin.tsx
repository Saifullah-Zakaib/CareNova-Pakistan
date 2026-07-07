import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { LayoutDashboard, Stethoscope, Users, Building2, CalendarDays, FileText, BarChart3, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/hospitals", label: "Hospitals", icon: Building2 },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/reports", label: "Reports", icon: FileText },
  { to: "/admin/ai-analytics", label: "AI Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Portal — CareNova" }] }),
  component: () => (
    <PortalShell role="Admin" items={items} user={{ name: "Nadia Iqbal", sub: "Platform Admin", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nadia" }} />
  ),
});
