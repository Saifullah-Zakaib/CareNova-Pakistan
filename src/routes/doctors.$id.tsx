import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PageHero } from "@/components/page-hero";
import { doctors, articles } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Star, MapPin, GraduationCap, Briefcase, Languages, CalendarDays, UserRound } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/doctors/$id")({
  loader: ({ params }) => {
    const doctor = doctors.find(d => d.id === params.id);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.doctor.name} — CareNova` : "Doctor" },
      { name: "description", content: loaderData?.doctor.about ?? "" },
    ],
  }),
  component: DoctorProfile,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">Doctor not found.</div>
  ),
});

const reviews = [
  { name: "Aisha M.", rating: 5, text: "Extremely thorough and kind. Explained everything clearly.", date: "2 weeks ago" },
  { name: "Bilal K.", rating: 5, text: "Best consultant I've seen. Highly recommend.", date: "1 month ago" },
  { name: "Sana R.", rating: 4, text: "Great experience overall, slight wait time.", date: "2 months ago" },
];

function DoctorProfile() {
  const { doctor } = Route.useLoaderData();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Doctor Profile"
        eyebrowIcon={UserRound}
        crumbs={[{ label: "Home", to: "/" }, { label: "Find Doctor", to: "/find-doctors" }, { label: doctor.name }]}
        title={doctor.name}
        size="sm"
        description={`${doctor.specialty} · ${doctor.qualification}`}
      />
      <div className="relative z-10 -mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card-elevated grid gap-6 rounded-3xl p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <img src={doctor.image} className="h-28 w-28 rounded-2xl bg-primary-soft object-cover" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              {doctor.verified && <span className="chip bg-primary text-primary-foreground"><BadgeCheck className="h-3 w-3" /> Verified</span>}
            </div>
            <div className="text-primary font-medium">{doctor.specialty}</div>
            <div className="text-sm text-muted-foreground">{doctor.qualification}</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-warning"><Star className="h-4 w-4 fill-warning" /> {doctor.rating} ({doctor.reviews} reviews)</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {doctor.hospital}, {doctor.city}</span>
              <span className="inline-flex items-center gap-1"><Briefcase className="h-4 w-4" /> {doctor.experience} years</span>
            </div>
          </div>
          <div className="rounded-2xl bg-primary-soft p-5">
            <div className="text-xs text-muted-foreground">Consultation fee</div>
            <div className="text-2xl font-black text-primary">Rs. {doctor.fee.toLocaleString()}</div>
            <Button asChild className="mt-3 w-full rounded-full">
              <Link to="/patient/book" search={{ doctor: doctor.id }}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      </div>


      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <Tabs defaultValue="about">
          <TabsList className="w-full flex-wrap justify-start">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 space-y-6">
            <div className="card-elevated rounded-2xl p-6">
              <h3 className="font-semibold">About the doctor</h3>
              <p className="mt-2 text-sm text-muted-foreground">{doctor.about}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={GraduationCap} title="Qualification" value={doctor.qualification} />
              <InfoBlock icon={Briefcase} title="Experience" value={`${doctor.experience} years`} />
              <InfoBlock icon={MapPin} title="Hospital" value={`${doctor.hospital}, ${doctor.area}`} />
              <InfoBlock icon={Languages} title="Languages" value={doctor.languages.join(", ")} />
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="card-elevated rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <div className="flex text-warning">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-warning" />)}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                <div className="mt-2 text-xs text-muted-foreground">{r.date}</div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="articles" className="mt-6 grid gap-4 sm:grid-cols-2">
            {articles.filter(a => a.author === doctor.name).concat(articles.slice(0, 2)).slice(0, 4).map(a => (
              <Link key={a.id} to="/articles/$id" params={{ id: a.id }} className="card-elevated rounded-2xl overflow-hidden">
                <img src={a.cover} className="aspect-video w-full object-cover" alt="" />
                <div className="p-4">
                  <span className="chip">{a.category}</span>
                  <div className="mt-2 font-semibold">{a.title}</div>
                </div>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <div className="card-elevated rounded-2xl p-6">
              <div className="font-semibold">Next available slots</div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {doctor.slots.map((s: string) => (
                  <button key={s} onClick={() => setSelected(s)} className={`rounded-lg border px-3 py-2 text-sm transition ${selected === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <aside className="card-elevated h-fit rounded-2xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold"><CalendarDays className="h-4 w-4 text-primary" /> Book an appointment</div>
          <div className="grid grid-cols-2 gap-2">
            {doctor.slots.map((s: string) => (
              <button key={s} onClick={() => setSelected(s)} className={`rounded-lg border px-3 py-2 text-sm transition ${selected === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{s}</button>
            ))}
          </div>
          <Button asChild className="mt-4 w-full">
            <Link to="/patient/book" search={{ doctor: doctor.id }}>Confirm booking</Link>
          </Button>
          <div className="mt-3 text-xs text-muted-foreground">Free rescheduling up to 2 hours before appointment.</div>
        </aside>
      </div>

      <PublicFooter />
    </div>
  );
}

function InfoBlock({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" /> {title}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
