import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { PublicNav } from "./public-nav";
import type { ReactNode } from "react";

type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  highlight,
  description,
  crumbs,
  align = "center",
  size = "md",
  children,
}: {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: ReactNode;
  highlight?: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}) {
  const padY =
    size === "lg" ? "pt-32 pb-24 sm:pt-40 sm:pb-32" :
    size === "sm" ? "pt-28 pb-14 sm:pt-32 sm:pb-16" :
                    "pt-28 pb-20 sm:pt-32 sm:pb-24";
  const titleSize =
    size === "lg" ? "text-5xl sm:text-6xl lg:text-7xl" :
    size === "sm" ? "text-3xl sm:text-4xl" :
                    "text-4xl sm:text-5xl lg:text-6xl";

  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[500px] w-[500px] rounded-full hero-blob" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full hero-blob opacity-60" />
      <PublicNav />
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${padY}`}>
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {crumbs && (
            <nav className={`mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground ${align === "center" ? "justify-center" : ""}`}>
              {crumbs.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span className="text-foreground/80">{c.label}</span>}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && (
            <span className="chip">
              {EyebrowIcon && <EyebrowIcon className="h-3.5 w-3.5" />}
              {eyebrow}
            </span>
          )}
          <h1 className={`mt-5 font-black leading-[1.05] tracking-tight text-foreground ${titleSize}`}>
            {title}{highlight && <> <span className="text-primary">{highlight}</span></>}
          </h1>
          {description && (
            <p className={`mt-5 text-lg text-muted-foreground ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
              {description}
            </p>
          )}
          {children && <div className={`mt-8 ${align === "center" ? "flex flex-wrap justify-center gap-3" : "flex flex-wrap gap-3"}`}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
