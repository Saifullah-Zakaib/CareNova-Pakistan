import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Search, Menu, X, ChevronDown, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Brand } from "./brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type NavItem = { to: string; label: string; icon: LucideIcon; group?: string };

export function PortalShell({
  items,
  role,
  user,
}: {
  items: NavItem[];
  role: "Patient" | "Doctor" | "Admin";
  user: { name: string; sub: string; image: string };
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openMobile, setOpenMobile] = useState(false);

  // group items
  const groups = items.reduce<Record<string, NavItem[]>>((acc, it) => {
    const g = it.group ?? "Main";
    (acc[g] ||= []).push(it);
    return acc;
  }, {});
  const groupOrder = Array.from(new Set(items.map((i) => i.group ?? "Main")));

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {groupOrder.map((g) => (
        <div key={g} className="mb-6">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">{g}</div>
          <nav className="space-y-1">
            {groups[g].map((item) => {
              const Icon = item.icon;
              const first = items[0].to;
              const active = pathname === item.to || (item.to !== first && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClick}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-foreground/70 hover:bg-primary-soft hover:text-primary"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg transition ${active ? "bg-white/20" : "bg-muted/60 group-hover:bg-white"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );

  const SidebarInner = ({ onNav }: { onNav?: () => void }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center px-6">
        <Brand />
      </div>
      <NavLinks onClick={onNav} />
      <div className="m-3 rounded-2xl bg-primary-soft/70 p-3">
        <div className="flex items-center gap-3">
          <img src={user.image} alt="" className="h-10 w-10 rounded-xl bg-white ring-2 ring-white" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-foreground">{user.name}</div>
            <div className="truncate text-xs text-muted-foreground">{user.sub}</div>
          </div>
          <Link to="/login" className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white hover:text-destructive" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-[oklch(0.97_0.015_235)]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-background lg:block">
        <SidebarInner />
      </aside>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpenMobile(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-border bg-background">
            <SidebarInner onNav={() => setOpenMobile(false)} />
            <button
              onClick={() => setOpenMobile(false)}
              className="absolute right-3 top-5 rounded-md p-2 hover:bg-muted"
              aria-label="close"
            >
              <X className="h-4 w-4" />
            </button>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-border/60 bg-background/85 px-4 backdrop-blur-md sm:px-8">
          <button onClick={() => setOpenMobile(true)} className="lg:hidden rounded-md p-2 hover:bg-muted" aria-label="menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={`Search in ${role} portal…`} className="rounded-full border-transparent bg-muted/60 pl-11 h-11" />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden chip sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {role}
            </span>
            <Button size="icon" variant="ghost" className="relative h-11 w-11 rounded-full bg-muted/60 hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </Button>
            <div className="hidden items-center gap-2 rounded-full bg-muted/60 p-1 pr-3 md:flex">
              <img src={user.image} alt="" className="h-8 w-8 rounded-full bg-background" />
              <div className="text-left leading-tight">
                <div className="text-xs font-bold">{user.name}</div>
                <div className="text-[10px] text-muted-foreground">{user.sub}</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="shrink-0 flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

/** Big gradient welcome banner for dashboard homes. */
export function WelcomeBanner({
  greeting,
  name,
  subtitle,
  actions,
  illustration,
  stats,
}: {
  greeting: string;
  name: string;
  subtitle: string;
  actions?: ReactNode;
  illustration?: ReactNode;
  stats?: { label: string; value: string; icon: LucideIcon; tone?: "primary" | "success" | "info" | "warning" | "accent" }[];
}) {
  const tones = {
    primary: "bg-white/20 text-white",
    success: "bg-success/25 text-white",
    info: "bg-info/25 text-white",
    warning: "bg-warning/30 text-white",
    accent: "bg-accent/25 text-white",
  } as const;
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl gradient-primary p-6 text-primary-foreground sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-24 right-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div>
          <div className="text-sm/6 text-primary-foreground/85">{greeting}</div>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{name}</h1>
          <p className="mt-2 max-w-xl text-primary-foreground/90">{subtitle}</p>
          {actions && <div className="mt-5 flex flex-wrap gap-2">{actions}</div>}
        </div>
        {illustration && <div className="hidden lg:block">{illustration}</div>}
      </div>
      {stats && (
        <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[s.tone ?? "primary"]}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">{s.label}</div>
                  <div className="text-lg font-black">{s.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
