import { Link } from "@tanstack/react-router";
import { Menu, Search, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/find-doctors", label: "Find Doctor" },
  { to: "/articles", label: "Blog" },
  { to: "/ai-assistant", label: "AI Assistant" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Determine dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.role === "PATIENT") return "/patient";
    if (user.role === "DOCTOR") return "/doctor";
    if (user.role === "ADMIN") return "/admin";
    return "/";
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 px-2 py-1.5 shadow-sm backdrop-blur lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              inactiveProps={{ className: "text-foreground/80 hover:text-primary hover:bg-muted" }}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="search"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/70 text-foreground/80 backdrop-blur transition hover:border-primary hover:text-primary md:grid"
          >
            <Search className="h-4 w-4" />
          </button>
          
          {/* Show Dashboard button if user is authenticated, otherwise show Sign in / Get started */}
          {isAuthenticated && user ? (
            <Button
              asChild
              className="hidden rounded-full px-5 font-semibold shadow-md shadow-primary/20 md:inline-flex"
            >
              <Link to={getDashboardRoute()}>
                <LayoutDashboard className="mr-1.5 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden rounded-full px-5 font-semibold text-foreground hover:text-primary md:inline-flex"
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="hidden rounded-full px-5 font-semibold shadow-md shadow-primary/20 md:inline-flex"
              >
                <Link to="/register">
                  Get started
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
          
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur hover:bg-muted lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {isAuthenticated && user ? (
                <Button asChild className="flex-1 rounded-full">
                  <Link to={getDashboardRoute()}>
                    <LayoutDashboard className="mr-1.5 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1 rounded-full">
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild className="flex-1 rounded-full">
                    <Link to="/register">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
