import { Skeleton } from "../ui/skeleton";

export default function ResumeInputSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
      <div className="flex items-center justify-center gap-4 w-full">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-10" />
      </div>
      <Skeleton className="w-full h-5" />
    </div>
  );
}
