import { Skeleton } from "../ui/skeleton";

export default function JobTitleSkeleton() {
  return (
    <div className="space-y-2 rounded-lg p-4">
      <Skeleton className="h-6 w-1/2 bg-card" />
      <Skeleton className="h-4 w-1/4 bg-card" />
    </div>
  );
}
