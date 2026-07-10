import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { DoctorCard } from "@/components/doctor-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { doctorApi, masterDataApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/patient/doctors")({
  component: FindDoctorsPatient,
});

function FindDoctorsPatient() {
  const [search, setSearch] = useState("");
  const [specializationId, setSpecializationId] = useState("all");
  const [cityId, setCityId] = useState("all");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating:desc");

  // Fetch filter options
  const { data: specializations } = useQuery({
    queryKey: ['specializations'],
    queryFn: () => masterDataApi.getAllSpecializations(),
  });

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: () => masterDataApi.getAllCities(),
  });

  // Build search params
  const searchParams: any = {
    page,
    limit: 12,
    sortBy,
  };

  if (search) searchParams.search = search;
  if (specializationId !== "all") searchParams.specializationId = specializationId;
  if (cityId !== "all") searchParams.cityId = cityId;

  // Fetch doctors with filters
  const { data: doctorsData, isLoading, error } = useQuery({
    queryKey: ['doctors', 'search', searchParams],
    queryFn: () => doctorApi.searchDoctors(searchParams),
  });

  const doctors = doctorsData?.data || [];
  const meta = doctorsData?.meta;

  // Debug log for development
  if (process.env.NODE_ENV === 'development' && doctors.length > 0) {
    console.log('Doctor data sample:', doctors[0]);
  }

  return (
    <div>
      <PageHeader 
        title="Find doctors" 
        description="Search verified specialists near you."
      />
      
      {/* Filters */}
      <div className="card-elevated grid gap-2 rounded-2xl p-3 sm:grid-cols-[1fr_1fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name or specialty" 
            className="pl-9 border-transparent bg-muted/40" 
          />
        </div>
        
        <Select value={specializationId} onValueChange={setSpecializationId}>
          <SelectTrigger className="border-transparent bg-muted/40">
            <SelectValue placeholder="All specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialties</SelectItem>
            {specializations?.map(s => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={cityId} onValueChange={setCityId}>
          <SelectTrigger className="border-transparent bg-muted/40">
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities?.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Options */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {meta && `Showing ${doctors.length} of ${meta.total} doctors`}
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating:desc">Highest Rated</SelectItem>
            <SelectItem value="yearsOfExperience:desc">Most Experienced</SelectItem>
            <SelectItem value="consultationFee:asc">Lowest Fee</SelectItem>
            <SelectItem value="consultationFee:desc">Highest Fee</SelectItem>
            <SelectItem value="createdAt:desc">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="mt-6 flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-destructive/50 bg-destructive/10 p-12 text-center">
          <p className="font-semibold text-destructive">Error loading doctors</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Please try again later'}
          </p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      ) : doctors.length > 0 ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={!meta.hasPrevPage}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={!meta.hasNextPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border/60 p-12 text-center">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 font-semibold">No doctors found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
  );
}
