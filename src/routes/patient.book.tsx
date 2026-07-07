import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { doctors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Check, MapPin, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const search = z.object({ doctor: z.string().optional() });

export const Route = createFileRoute("/patient/book")({
  validateSearch: search,
  component: Booking,
});

function Booking() {
  const { doctor: doctorId } = Route.useSearch();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctorId ?? doctors[0].id);
  const doctor = doctors.find(d => d.id === selectedDoctorId)!;
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 10));
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState(doctorId ? 2 : 1);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      <PageHeader title="Book an appointment" description="Four quick steps." />
      <div className="mb-6 grid grid-cols-4 gap-2">
        {["Select doctor", "Select date", "Select time", "Confirm"].map((label, i) => (
          <div key={label} className={`rounded-xl border p-3 text-center text-xs sm:text-sm ${step > i ? "border-primary bg-primary-soft text-primary" : "border-border bg-card text-muted-foreground"}`}>
            <div className="font-semibold">Step {i + 1}</div><div>{label}</div>
          </div>
        ))}
      </div>

      {confirmed ? (
        <div className="card-elevated mx-auto max-w-xl rounded-2xl p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success"><Check className="h-7 w-7" /></div>
          <h2 className="mt-4 text-xl font-bold">Appointment confirmed</h2>
          <div className="mt-6 rounded-2xl bg-muted/40 p-5 text-left">
            <div className="flex items-center gap-3">
              <img src={doctor.image} className="h-12 w-12 rounded-xl bg-background" />
              <div><div className="font-semibold">{doctor.name}</div><div className="text-xs text-muted-foreground">{doctor.specialty}</div></div>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <Row k="Date" v={date?.toDateString() ?? "—"} />
              <Row k="Time" v={time ?? "—"} />
              <Row k="Location" v={`${doctor.hospital}, ${doctor.city}`} />
              <Row k="Status" v="Confirmed" />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Button asChild variant="outline"><Link to="/patient/appointments">View appointments</Link></Button>
            <Button asChild><Link to="/patient">Back to dashboard</Link></Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-elevated rounded-2xl p-6">
            {step === 1 && (
              <div>
                <h3 className="font-semibold">Choose a doctor</h3>
                <div className="mt-4 grid gap-3">
                  {doctors.slice(0, 4).map(d => (
                    <button key={d.id} onClick={() => { setSelectedDoctorId(d.id); setStep(2); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${selectedDoctorId === d.id ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}>
                      <img src={d.image} className="h-10 w-10 rounded-full bg-muted" />
                      <div className="flex-1 min-w-0"><div className="font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.specialty} · {d.city}</div></div>
                      <div className="text-sm">Rs. {d.fee.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="font-semibold">Pick a date</h3>
                <div className="mt-4 flex justify-center">
                  <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setStep(3); }} className="pointer-events-auto" />
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="font-semibold">Choose a time</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {doctor.slots.map((s: string) => (
                    <button key={s} onClick={() => { setTime(s); setStep(4); }} className={`rounded-lg border px-3 py-2 text-sm ${time === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h3 className="font-semibold">Confirm your booking</h3>
                <p className="mt-1 text-sm text-muted-foreground">Please review before confirming.</p>
                <div className="mt-4 space-y-2 text-sm">
                  <Row k="Doctor" v={doctor.name} />
                  <Row k="Date" v={date?.toDateString() ?? "—"} />
                  <Row k="Time" v={time ?? "—"} />
                  <Row k="Fee" v={`Rs. ${doctor.fee.toLocaleString()}`} />
                </div>
                <div className="mt-6 flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                  <Button onClick={() => setConfirmed(true)}>Confirm booking</Button>
                </div>
              </div>
            )}
          </div>

          <aside className="card-elevated h-fit rounded-2xl p-5">
            <div className="text-sm font-semibold mb-3">Summary</div>
            <div className="flex items-center gap-3">
              <img src={doctor.image} className="h-12 w-12 rounded-xl bg-muted" />
              <div><div className="font-semibold">{doctor.name}</div><div className="text-xs text-muted-foreground">{doctor.specialty}</div></div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row k="Date" v={date?.toDateString() ?? "—"} icon={<CalendarCheck className="h-3.5 w-3.5" />} />
              <Row k="Time" v={time ?? "Not selected"} />
              <Row k="Location" v={`${doctor.hospital}, ${doctor.city}`} icon={<MapPin className="h-3.5 w-3.5" />} />
              <Row k="Fee" v={`Rs. ${doctor.fee.toLocaleString()}`} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, icon }: { k: string; v: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2">
      <span className="text-muted-foreground inline-flex items-center gap-1">{icon}{k}</span>
      <span className="font-medium text-right">{v}</span>
    </div>
  );
}
