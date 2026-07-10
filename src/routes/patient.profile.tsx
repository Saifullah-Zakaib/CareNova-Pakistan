import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { usePatientProfile } from "@/hooks/use-patient-data";
import { useCities, useAreas } from "@/hooks/use-master-data";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientApi } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/profile")({
  component: PatientProfilePage,
});

function PatientProfilePage() {
  const { data: patient, isLoading } = usePatientProfile();
  const { data: cities } = useCities();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<any>({});
  const [selectedCityId, setSelectedCityId] = useState("");

  const { data: areas } = useAreas(selectedCityId);

  // Initialize form when patient data loads
  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.user.firstName || "",
        lastName: patient.user.lastName || "",
        phoneNumber: patient.user.phoneNumber || "",
        gender: patient.user.gender || "",
        dateOfBirth: patient.user.dateOfBirth ? new Date(patient.user.dateOfBirth).toISOString().split('T')[0] : "",
        city: patient.user.city || "",
        bloodGroup: patient.bloodGroup || "",
        height: patient.height || "",
        weight: patient.weight || "",
        smoking: patient.smoking || false,
        alcohol: patient.alcohol || false,
        allergies: patient.allergies?.join(", ") || "",
        chronicDiseases: patient.chronicDiseases?.join(", ") || "",
        currentMedications: patient.currentMedications?.join(", ") || "",
        medicalHistory: patient.medicalHistory || "",
        emergencyContactName: patient.emergencyContactName || "",
        emergencyContactPhone: patient.emergencyContactPhone || "",
        emergencyContactRelation: patient.emergencyContactRelation || "",
        address: patient.address || "",
        areaId: patient.areaId || "",
        postalCode: patient.postalCode || "",
      });
      if (patient.area?.city?.id) {
        setSelectedCityId(patient.area.city.id);
      }
    }
  }, [patient]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => patientApi.updateMyProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ['patient', 'profile'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData = {
      ...formData,
      allergies: formData.allergies ? formData.allergies.split(",").map((s: string) => s.trim()) : [],
      chronicDiseases: formData.chronicDiseases ? formData.chronicDiseases.split(",").map((s: string) => s.trim()) : [],
      currentMedications: formData.currentMedications ? formData.currentMedications.split(",").map((s: string) => s.trim()) : [],
      height: formData.height ? parseFloat(formData.height) : undefined,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
    };

    updateMutation.mutate(updateData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!patient) {
    return <div>Profile not found</div>;
  }

  const profileImage = patient.user.profileImage || `https://api.dicebear.com/9.x/avataaars/svg?seed=${patient.user.email}`;

  return (
    <div>
      <PageHeader title="Profile" description="Keep your details up to date for better care." />
      
      <form onSubmit={handleSubmit}>
        <div className="card-elevated max-w-3xl rounded-2xl p-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <img 
              src={profileImage} 
              className="h-20 w-20 rounded-2xl bg-muted object-cover" 
              alt="Profile"
            />
            <div>
              <div className="font-semibold text-lg">
                {patient.user.firstName} {patient.user.lastName}
              </div>
              <div className="text-sm text-muted-foreground">{patient.user.email}</div>
            </div>
            <Button type="button" variant="outline" className="ml-auto">Change photo</Button>
          </div>

          {/* Basic Information */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-4">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>First Name</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="+92XXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                  <SelectTrigger className="mt-1.5">
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
                <Label>Date of Birth</Label>
                <Input 
                  type="date" 
                  className="mt-1.5" 
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-4">Medical Information</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(v) => setFormData({...formData, bloodGroup: v})}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A_POSITIVE">A+</SelectItem>
                    <SelectItem value="A_NEGATIVE">A-</SelectItem>
                    <SelectItem value="B_POSITIVE">B+</SelectItem>
                    <SelectItem value="B_NEGATIVE">B-</SelectItem>
                    <SelectItem value="AB_POSITIVE">AB+</SelectItem>
                    <SelectItem value="AB_NEGATIVE">AB-</SelectItem>
                    <SelectItem value="O_POSITIVE">O+</SelectItem>
                    <SelectItem value="O_NEGATIVE">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Height (cm)</Label>
                <Input 
                  type="number" 
                  className="mt-1.5" 
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  className="mt-1.5" 
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Allergies (comma-separated)</Label>
              <Input 
                className="mt-1.5" 
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                placeholder="e.g., Penicillin, Pollen"
              />
            </div>

            <div className="mt-4">
              <Label>Chronic Diseases (comma-separated)</Label>
              <Input 
                className="mt-1.5" 
                value={formData.chronicDiseases}
                onChange={(e) => setFormData({...formData, chronicDiseases: e.target.value})}
                placeholder="e.g., Diabetes, Hypertension"
              />
            </div>

            <div className="mt-4">
              <Label>Current Medications (comma-separated)</Label>
              <Input 
                className="mt-1.5" 
                value={formData.currentMedications}
                onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                placeholder="e.g., Metformin 500mg, Aspirin"
              />
            </div>

            <div className="mt-4">
              <Label>Medical History</Label>
              <Textarea 
                className="mt-1.5" 
                value={formData.medicalHistory}
                onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                placeholder="Brief medical history"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-4">Emergency Contact</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Name</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                  placeholder="+92XXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Relation</Label>
                <Input 
                  className="mt-1.5" 
                  value={formData.emergencyContactRelation}
                  onChange={(e) => setFormData({...formData, emergencyContactRelation: e.target.value})}
                  placeholder="e.g., Spouse, Parent"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
