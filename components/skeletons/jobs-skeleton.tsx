import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function JobSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-32 rounded-md" /> {/* Job title */}
                  <Skeleton className="h-4 w-24 rounded-md" /> {/* Company */}
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />{" "}
                {/* Status badge */}
              </div>
              <Skeleton className="h-4 w-20 rounded-md" /> {/* Location */}
              <Skeleton className="h-5 w-16 rounded-md" /> {/* Salary badge */}
            </CardHeader>

            <CardContent>
              <Skeleton className="h-16 w-full rounded-md" />{" "}
              {/* Description */}
            </CardContent>

            <CardFooter className="flex justify-between items-center text-sm text-gray-500">
              <Skeleton className="h-3 w-24 rounded-md" /> {/* Posted time */}
              <Skeleton className="h-8 w-24 rounded-full" /> {/* Button */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
