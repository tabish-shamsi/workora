import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import JobTitleSkeleton from "./job-title-skeleton";

export function JobFormSkeleton() {
  return (
    <section className="container py-10">
      {/* Job Header Skeleton */}
      <JobTitleSkeleton />

      {/* Form Skeleton */}
      <div className="max-w-3xl mx-auto py-10">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-40 rounded-md" />
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Job Title */}
            <Skeleton className="h-10 w-full rounded-md" />
            {/* Company Name */}
            <Skeleton className="h-10 w-full rounded-md" />
            {/* Location */}
            <Skeleton className="h-10 w-full rounded-md" />
            {/* Job Type */}
            <Skeleton className="h-10 w-1/2 rounded-md" />
            {/* Salary */}
            <Skeleton className="h-10 w-1/2 rounded-md" />
            {/* Job Status */}
            <Skeleton className="h-10 w-1/3 rounded-md" />
            {/* Last Date */}
            <Skeleton className="h-10 w-1/3 rounded-md" />
            {/* Description */}
            <Skeleton className="h-32 w-full rounded-md" />
            {/* Submit Button */}
            <Skeleton className="h-10 w-32 rounded-full mx-auto" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
