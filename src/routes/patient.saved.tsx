import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { DoctorCard } from "@/components/doctor-card";
import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useFavoriteDoctors } from "@/hooks/use-patient-data";
import { useState } from "react";

export const Route = createFileRoute("/patient/saved")({
  component: SavedDoctorsPage,
});

function SavedDoctorsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFavoriteDoctors({ page, limit: 12 });

  const favorites = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <div>
      <PageHeader 
        title="Saved doctors" 
        description="Quick access to doctors you've bookmarked." 
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : favorites.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((fav: any) => (
              <DoctorCard key={fav.id} doctor={fav.doctor} />
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
        <div className="rounded-2xl border border-dashed border-border/60 p-12 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 font-semibold">No saved doctors yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Save your favorite doctors for quick access
          </p>
          <Button asChild className="mt-4 rounded-full">
            <Link to="/patient/doctors">Find Doctors</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
