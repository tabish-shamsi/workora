import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import JobTitleSkeleton from "./job-title-skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function ApplicationSkeleton() {
  return (
    <div className="container py-10 space-y-8">
      {/* Job Title */}
      <JobTitleSkeleton />

      <Card className="max-w-xl rounded-2xl shadow-sm mx-auto animate-pulse">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </CardTitle>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="text-sm flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-3 pt-4">
          {/* Job Title */}
          <div className="flex items-center justify-between text-sm">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>

          {/* Resume */}
          <div className="flex items-center justify-between text-sm">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>

          {/* Applied On */}
          <div className="flex items-center justify-between text-sm">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>

          {/* Cover Letter */}
          <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
