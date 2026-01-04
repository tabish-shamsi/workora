import { Skeleton } from "@/components/ui/skeleton";
import JobTitleSkeleton from "./job-title-skeleton";

export default function ApplicationsSkeleton() {
  return (
    <div className="container py-10 space-y-8">
      {/* Job Title */}
      <JobTitleSkeleton />

      {/* Stats Card  */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* applications Table */}
      <div className="rounded-xl border bg-card p-6 space-y-6">
        <Skeleton className="h-6 w-48" />

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4">
          <Skeleton className="h-4 w-24 col-span-2" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24 justify-self-end" />
        </div>

        {/* Table Rows */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4 items-center">
            <Skeleton className="h-4 w-full col-span-2" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
