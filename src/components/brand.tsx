import { Link } from "@tanstack/react-router";

export function Brand({
  to = "/",
  className = "",
  variant = "default",
}: {
  to?: string;
  className?: string;
  variant?: "default" | "compact";
}) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 font-display font-extrabold ${className}`}>
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-md ring-1 ring-primary/20 transition-transform group-hover:-rotate-3">
        {/* Medical mark: cross + pulse line */}
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          {/* Plus */}
          <path
            d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z"
            fill="currentColor"
            fillOpacity="0.22"
          />
          {/* Pulse */}
          <path
            d="M3 13h4l2-4 3 8 3-6 2 2h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none tracking-tight">
        <span className="text-lg">
          Care<span className="text-primary">Nova</span>
        </span>
        {variant === "default" && (
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Pakistan Health
          </span>
        )}
      </span>
    </Link>
  );
}
