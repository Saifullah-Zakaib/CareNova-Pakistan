import { Link } from "@tanstack/react-router";
import { Star, MapPin, BadgeCheck, Video, Briefcase } from "lucide-react";
import type { Doctor } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition hover:shadow-lg hover:border-primary/30">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <img src={doctor.image} alt={doctor.name} className="h-20 w-20 rounded-2xl bg-primary-soft object-cover" />
          {doctor.online && (
            <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-success px-1.5 py-0.5 text-[10px] font-medium text-success-foreground">
              <Video className="h-2.5 w-2.5" /> Online
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold text-foreground">{doctor.name}</h3>
            {doctor.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{doctor.qualification}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{doctor.experience} yrs</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{doctor.city}</span>
            <span className="inline-flex items-center gap-1 text-warning"><Star className="h-3 w-3 fill-warning" />{doctor.rating} ({doctor.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {doctor.slots.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] text-foreground">{s}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <div className="text-xs text-muted-foreground">Consultation fee</div>
          <div className="font-semibold">Rs. {doctor.fee.toLocaleString()}</div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/doctors/$id" params={{ id: doctor.id }}>View</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/patient/book" search={{ doctor: doctor.id }}>Book</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
