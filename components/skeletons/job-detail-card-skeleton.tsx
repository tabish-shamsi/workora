import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobDetailsSkeleton() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-pulse">
      <Card>
        {/* Header Skeleton */}
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 rounded-md" /> {/* Job title */}
              <Skeleton className="h-4 w-32 rounded-md" /> {/* Company */}
            </div>
            <Skeleton className="h-6 w-20 rounded-full" /> {/* Status badge */}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        </CardHeader>

        {/* Content Skeleton */}
        <CardContent className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 rounded-md" /> {/* Description header */}
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
          </div>

          {/* Apply Section */}
          <div className="flex items-center justify-between border-t pt-6">
            <Skeleton className="h-3 w-40 rounded-md" /> {/* Apply before text */}
            <Skeleton className="h-10 w-32 rounded-full" /> {/* Apply button */}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
