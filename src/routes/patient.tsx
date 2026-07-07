import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import {
  LayoutDashboard, Sparkles, Search, CalendarDays, FolderHeart, Pill, FileText, Bookmark, BookOpen, User, Settings,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/patient", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/patient/ai", label: "AI Health Assistant", icon: Sparkles, group: "Overview" },
  { to: "/patient/doctors", label: "Find Doctors", icon: Search, group: "Care" },
  { to: "/patient/appointments", label: "Appointments", icon: CalendarDays, group: "Care" },
  { to: "/patient/saved", label: "Saved Doctors", icon: Bookmark, group: "Care" },
  { to: "/patient/records", label: "Medical Records", icon: FolderHeart, group: "Health Data" },
  { to: "/patient/prescriptions", label: "Prescriptions", icon: Pill, group: "Health Data" },
  { to: "/patient/reports", label: "Reports", icon: FileText, group: "Health Data" },
  { to: "/patient/articles", label: "Articles", icon: BookOpen, group: "Discover" },
  { to: "/patient/profile", label: "Profile", icon: User, group: "Account" },
  { to: "/patient/settings", label: "Settings", icon: Settings, group: "Account" },
];

export const Route = createFileRoute("/patient")({
  head: () => ({ meta: [{ title: "Patient Portal — CareNova" }] }),
  component: () => (
    <PortalShell
      role="Patient"
      items={items}
      user={{ name: "Ali Raza", sub: "Patient · Karachi", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ali%20Raza" }}
    />
  ),
});
