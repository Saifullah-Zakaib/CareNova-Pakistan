import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth.context";
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

function DoctorPortal() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <PortalShell 
        role="Doctor" 
        items={items} 
        user={{ 
          name: user ? `Dr. ${user.firstName} ${user.lastName}` : "Doctor", 
          sub: `${user?.doctorProfile?.specialization || 'Doctor'} · ${user?.city || 'Pakistan'}`, 
          image: user?.profileImage || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email}` 
        }} 
      />
    </ProtectedRoute>
  );
}

export const Route = createFileRoute("/doctor")({
  head: () => ({ meta: [{ title: "Doctor Portal — CareNova" }] }),
  component: DoctorPortal,
});
