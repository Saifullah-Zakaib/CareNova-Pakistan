import { Link } from "@tanstack/react-router";
import { Star, MapPin, BadgeCheck, Video, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  doctor: any; // Doctor type from backend API
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  // Safety check - return early if doctor or user is missing
  if (!doctor || !doctor.user) {
    console.warn('DoctorCard: Invalid doctor data', doctor);
    return null;
  }

  // Extract data from backend structure with safe fallbacks
  const doctorName = `Dr. ${doctor.user.firstName || ''} ${doctor.user.lastName || ''}`.trim();
  const specialty = doctor.specialization?.name || 'General Physician';
  const qualification = doctor.qualification || 'MBBS';
  const experience = doctor.yearsOfExperience || 0;
  const city = doctor.hospital?.city?.name || doctor.user.city || 'Pakistan';
  const rating = doctor.rating || 0;
  const reviewsCount = doctor.reviewsCount || 0;
  const fee = doctor.consultationFee || 0;
  const isOnline = doctor.consultationType === 'ONLINE' || doctor.consultationType === 'BOTH';
  const isVerified = doctor.status === 'APPROVED';
  const hospitalName = doctor.hospital?.name || doctor.hospitalName || 'Hospital';
  
  // Generate avatar if no profile image
  const image = doctor.user.profileImage || `https://api.dicebear.com/9.x/avataaars/svg?seed=${doctor.user.email || doctor.id}`;

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition hover:shadow-lg hover:border-primary/30">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <img 
            src={image} 
            alt={doctorName} 
            className="h-20 w-20 rounded-2xl bg-primary-soft object-cover" 
            onError={(e) => {
              e.currentTarget.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${doctor.user.email}`;
            }}
          />
          {isOnline && (
            <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-success px-1.5 py-0.5 text-[10px] font-medium text-success-foreground">
              <Video className="h-2.5 w-2.5" /> Online
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold text-foreground">{doctorName}</h3>
            {isVerified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <p className="text-sm text-primary font-medium">{specialty}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{qualification}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3 w-3" />{experience} yrs
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />{city}
            </span>
            <span className="inline-flex items-center gap-1 text-warning">
              <Star className="h-3 w-3 fill-warning" />
              {rating.toFixed(1)} ({reviewsCount})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] text-foreground">
          {hospitalName}
        </span>
        {doctor.languages?.slice(0, 2).map((lang: string) => (
          <span key={lang} className="rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] text-foreground">
            {lang}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <div className="text-xs text-muted-foreground">Consultation fee</div>
          <div className="font-semibold">Rs. {fee.toLocaleString()}</div>
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
