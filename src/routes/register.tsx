import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicNav } from "@/components/public-nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, BadgeCheck, Stethoscope, HeartPulse, ShieldCheck, Sparkles, GraduationCap, Calendar, MapPin, Loader2, Building2, Languages, DollarSign, Briefcase } from "lucide-react";
import { useState } from "react";
import { authAPI, RegisterPatientData, RegisterDoctorData } from "@/lib/api/auth.api";
import { getErrorMessage, getErrorDetails } from "@/lib/api-client";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — CareNova" }] }),
  component: Register,
});

interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  dateOfBirth: string;
  city: string;
  acceptTerms: boolean;
}

interface DoctorFormData extends PatientFormData {
  qualification: string;
  specialization: string;
  yearsOfExperience: string;
  pmdcLicenseNumber: string;
  consultationFee: string;
  hospitalName: string;
  languages: string;
  bio: string;
}

function Register() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");
  const [isLoading, setIsLoading] = useState(false);

  // Patient form state
  const [patientForm, setPatientForm] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    acceptTerms: false,
  });

  // Doctor form state
  const [doctorForm, setDoctorForm] = useState<DoctorFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    qualification: "",
    specialization: "",
    yearsOfExperience: "",
    pmdcLicenseNumber: "",
    consultationFee: "",
    hospitalName: "",
    languages: "",
    bio: "",
    acceptTerms: false,
  });

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!patientForm.firstName || !patientForm.lastName || !patientForm.email || 
        !patientForm.phoneNumber || !patientForm.password || !patientForm.gender ||
        !patientForm.dateOfBirth || !patientForm.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!patientForm.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const data: RegisterPatientData = {
        firstName: patientForm.firstName,
        lastName: patientForm.lastName,
        email: patientForm.email,
        phoneNumber: patientForm.phoneNumber,
        password: patientForm.password,
        gender: patientForm.gender as "MALE" | "FEMALE" | "OTHER",
        dateOfBirth: patientForm.dateOfBirth,
        city: patientForm.city,
        acceptTerms: patientForm.acceptTerms,
      };

      const response = await authAPI.registerPatient(data);
      
      if (response.success) {
        toast.success("Registration successful! Please check your email to verify your account.");
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 2000);
      }
    } catch (error: any) {
      const message = getErrorMessage(error);
      const details = getErrorDetails(error);
      
      if (details.length > 0) {
        details.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!doctorForm.firstName || !doctorForm.lastName || !doctorForm.email || 
        !doctorForm.phoneNumber || !doctorForm.password || !doctorForm.gender ||
        !doctorForm.dateOfBirth || !doctorForm.city || !doctorForm.qualification ||
        !doctorForm.specialization || !doctorForm.yearsOfExperience || 
        !doctorForm.pmdcLicenseNumber || !doctorForm.consultationFee || 
        !doctorForm.hospitalName || !doctorForm.languages) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!doctorForm.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const data: RegisterDoctorData = {
        firstName: doctorForm.firstName,
        lastName: doctorForm.lastName,
        email: doctorForm.email,
        phoneNumber: doctorForm.phoneNumber,
        password: doctorForm.password,
        gender: doctorForm.gender as "MALE" | "FEMALE" | "OTHER",
        dateOfBirth: doctorForm.dateOfBirth,
        city: doctorForm.city,
        qualification: doctorForm.qualification,
        specialization: doctorForm.specialization,
        yearsOfExperience: parseInt(doctorForm.yearsOfExperience),
        pmdcLicenseNumber: doctorForm.pmdcLicenseNumber,
        consultationFee: parseFloat(doctorForm.consultationFee),
        hospitalName: doctorForm.hospitalName,
        languages: doctorForm.languages.split(",").map(l => l.trim()),
        bio: doctorForm.bio || undefined,
        acceptTerms: doctorForm.acceptTerms,
      };

      const response = await authAPI.registerDoctor(data);
      
      if (response.success) {
        toast.success("Registration submitted! Please check your email and wait for admin approval.");
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 2000);
      }
    } catch (error: any) {
      const message = getErrorMessage(error);
      const details = getErrorDetails(error);
      
      if (details.length > 0) {
        details.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      <PublicNav />
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full hero-blob opacity-60" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — value story */}
        <div className="hidden flex-col justify-between lg:flex">
          <div>
            <div className="chip"><Sparkles className="h-3 w-3" /> Get started free</div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Join Pakistan's <span className="text-primary">smartest care network.</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Create an account in under a minute — book verified doctors, chat with our AI health assistant and keep every report in one secure vault.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { k: "1,248", v: "Verified doctors" },
                { k: "42k+", v: "Active patients" },
                { k: "4.9★", v: "Avg. doctor rating" },
                { k: "24/7", v: "AI health support" },
              ].map((s) => (
                <div key={s.k} className="card-elevated rounded-2xl p-4">
                  <div className="font-display text-2xl font-extrabold text-primary">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                { icon: BadgeCheck, t: "Every doctor credential-verified by our team" },
                { icon: ShieldCheck, t: "Records encrypted end-to-end, always" },
                { icon: HeartPulse, t: "AI-guided triage before you book" },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-foreground/90">{f.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex items-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="card-elevated rounded-3xl p-8 sm:p-10">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">Create your account</h2>
                <p className="mt-1 text-sm text-muted-foreground">Choose the account type that fits you.</p>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "patient" | "doctor")}>
                <TabsList className="grid grid-cols-2 w-full rounded-full bg-muted p-1 h-12">
                  <TabsTrigger value="patient" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <HeartPulse className="mr-1.5 h-4 w-4" /> Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Stethoscope className="mr-1.5 h-4 w-4" /> Doctor
                  </TabsTrigger>
                </TabsList>

                {/* PATIENT FORM */}
                <TabsContent value="patient" className="mt-6">
                  <form onSubmit={handlePatientSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">First Name *</Label>
                        <div className="relative mt-1.5">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Ahmed"
                            value={patientForm.firstName}
                            onChange={(e) => setPatientForm({ ...patientForm, firstName: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last Name *</Label>
                        <div className="relative mt-1.5">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Ali"
                            value={patientForm.lastName}
                            onChange={(e) => setPatientForm({ ...patientForm, lastName: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email *</Label>
                      <div className="relative mt-1.5">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type="email"
                          className="h-12 rounded-xl pl-10" 
                          placeholder="you@example.com"
                          value={patientForm.email}
                          onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number *</Label>
                      <div className="relative mt-1.5">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          className="h-12 rounded-xl pl-10" 
                          placeholder="+923001234567"
                          value={patientForm.phoneNumber}
                          onChange={(e) => setPatientForm({ ...patientForm, phoneNumber: e.target.value })}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Format: +92XXXXXXXXXX</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gender *</Label>
                        <Select 
                          value={patientForm.gender} 
                          onValueChange={(v) => setPatientForm({ ...patientForm, gender: v as any })}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="h-12 rounded-xl mt-1.5">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date of Birth *</Label>
                        <div className="relative mt-1.5">
                          <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            type="date"
                            className="h-12 rounded-xl pl-10" 
                            value={patientForm.dateOfBirth}
                            onChange={(e) => setPatientForm({ ...patientForm, dateOfBirth: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City *</Label>
                      <div className="relative mt-1.5">
                        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          className="h-12 rounded-xl pl-10" 
                          placeholder="Lahore"
                          value={patientForm.city}
                          onChange={(e) => setPatientForm({ ...patientForm, city: e.target.value })}
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <PasswordField 
                      value={patientForm.password}
                      onChange={(v) => setPatientForm({ ...patientForm, password: v })}
                      disabled={isLoading}
                    />

                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Checkbox 
                        id="patient-terms" 
                        className="mt-0.5"
                        checked={patientForm.acceptTerms}
                        onCheckedChange={(checked) => setPatientForm({ ...patientForm, acceptTerms: !!checked })}
                        disabled={isLoading}
                      />
                      <span>
                        I agree to CareNova's{" "}
                        <Link to="/terms" className="font-medium text-primary hover:underline">Terms</Link> and{" "}
                        <Link to="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>. *
                      </span>
                    </label>

                    <Button 
                      type="submit"
                      className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/25"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create patient account <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* DOCTOR FORM */}
                <TabsContent value="doctor" className="mt-6">
                  <form onSubmit={handleDoctorSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">First Name *</Label>
                        <div className="relative mt-1.5">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Dr. Ayesha"
                            value={doctorForm.firstName}
                            onChange={(e) => setDoctorForm({ ...doctorForm, firstName: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last Name *</Label>
                        <div className="relative mt-1.5">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Khan"
                            value={doctorForm.lastName}
                            onChange={(e) => setDoctorForm({ ...doctorForm, lastName: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email *</Label>
                        <div className="relative mt-1.5">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            type="email"
                            className="h-12 rounded-xl pl-10" 
                            placeholder="doctor@example.com"
                            value={doctorForm.email}
                            onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number *</Label>
                        <div className="relative mt-1.5">
                          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="+923001234567"
                            value={doctorForm.phoneNumber}
                            onChange={(e) => setDoctorForm({ ...doctorForm, phoneNumber: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">PMDC License No. *</Label>
                        <div className="relative mt-1.5">
                          <BadgeCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="PMD-12345"
                            value={doctorForm.pmdcLicenseNumber}
                            onChange={(e) => setDoctorForm({ ...doctorForm, pmdcLicenseNumber: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Specialization *</Label>
                        <div className="relative mt-1.5">
                          <Stethoscope className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Cardiology"
                            value={doctorForm.specialization}
                            onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Qualification *</Label>
                        <div className="relative mt-1.5">
                          <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="MBBS, FCPS"
                            value={doctorForm.qualification}
                            onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Years of Experience *</Label>
                        <div className="relative mt-1.5">
                          <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            type="number"
                            min="0"
                            className="h-12 rounded-xl pl-10" 
                            placeholder="5"
                            value={doctorForm.yearsOfExperience}
                            onChange={(e) => setDoctorForm({ ...doctorForm, yearsOfExperience: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hospital Name *</Label>
                        <div className="relative mt-1.5">
                          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Shaukat Khanum Hospital"
                            value={doctorForm.hospitalName}
                            onChange={(e) => setDoctorForm({ ...doctorForm, hospitalName: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Consultation Fee (PKR) *</Label>
                        <div className="relative mt-1.5">
                          <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            type="number"
                            min="0"
                            className="h-12 rounded-xl pl-10" 
                            placeholder="2000"
                            value={doctorForm.consultationFee}
                            onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Languages *</Label>
                        <div className="relative mt-1.5">
                          <Languages className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="English, Urdu"
                            value={doctorForm.languages}
                            onChange={(e) => setDoctorForm({ ...doctorForm, languages: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Separate with commas</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gender *</Label>
                        <Select 
                          value={doctorForm.gender} 
                          onValueChange={(v) => setDoctorForm({ ...doctorForm, gender: v as any })}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="h-12 rounded-xl mt-1.5">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date of Birth *</Label>
                        <div className="relative mt-1.5">
                          <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            type="date"
                            className="h-12 rounded-xl pl-10" 
                            value={doctorForm.dateOfBirth}
                            onChange={(e) => setDoctorForm({ ...doctorForm, dateOfBirth: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City *</Label>
                        <div className="relative mt-1.5">
                          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            className="h-12 rounded-xl pl-10" 
                            placeholder="Lahore"
                            value={doctorForm.city}
                            onChange={(e) => setDoctorForm({ ...doctorForm, city: e.target.value })}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <PasswordField 
                      value={doctorForm.password}
                      onChange={(v) => setDoctorForm({ ...doctorForm, password: v })}
                      disabled={isLoading}
                    />

                    <div className="rounded-xl border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                      <div className="font-semibold text-foreground">Verification required</div>
                      Doctor accounts activate after our team verifies your PMC credentials — usually within 24 hours.
                    </div>

                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Checkbox 
                        id="doctor-terms" 
                        className="mt-0.5"
                        checked={doctorForm.acceptTerms}
                        onCheckedChange={(checked) => setDoctorForm({ ...doctorForm, acceptTerms: !!checked })}
                        disabled={isLoading}
                      />
                      <span>
                        I agree to CareNova's{" "}
                        <Link to="/terms" className="font-medium text-primary hover:underline">Terms</Link> and{" "}
                        <Link to="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>. *
                      </span>
                    </label>

                    <Button 
                      type="submit"
                      className="h-12 w-full rounded-xl text-base font-semibold shadow-md shadow-primary/25"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit for verification <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordField({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password *</Label>
      <div className="relative mt-1.5">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          type={show ? "text" : "password"} 
          placeholder="At least 8 characters" 
          className="h-12 rounded-xl pl-10 pr-10" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Must contain uppercase, lowercase, number and special character</p>
    </div>
  );
}
