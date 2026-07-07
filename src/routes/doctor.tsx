import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { LayoutDashboard, CalendarDays, Users, FolderHeart, Pill, BookOpen, Star, Clock, User, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/doctor", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/doctor/appointments", label: "Appointments", icon: CalendarDays, group: "Practice" },
  { to: "/doctor/patients", label: "Patients", icon: Users, group: "Practice" },
  { to: "/doctor/availability", label: "Availability", icon: Clock, group: "Practice" },
  { to: "/doctor/records", label: "Medical Records", icon: FolderHeart, group: "Clinical" },
  { to: "/doctor/prescriptions", label: "Prescriptions", icon: Pill, group: "Clinical" },
  { to: "/doctor/articles", label: "Articles", icon: BookOpen, group: "Content" },
  { to: "/doctor/reviews", label: "Reviews", icon: Star, group: "Content" },
  { to: "/doctor/profile", label: "Profile", icon: User, group: "Account" },
  { to: "/doctor/settings", label: "Settings", icon: Settings, group: "Account" },
];

export const Route = createFileRoute("/doctor")({
  head: () => ({ meta: [{ title: "Doctor Portal — CareNova" }] }),
  component: () => (
    <PortalShell role="Doctor" items={items} user={{ name: "Dr. Ayesha Khan", sub: "Cardiologist · AKUH", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha%20Khan" }} />
  ),
});
