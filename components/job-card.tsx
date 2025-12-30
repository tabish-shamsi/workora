import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Job from "@/types/Job";

export default function JobCard({ job }: { job: Job }) {
  const isExpired =
    new Date(job.createdAt).getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000;

  const status = isExpired ? "expired" : job.status;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>

          <Badge
            variant={
              status === "open"
                ? "default"
                : status === "filled"
                  ? "secondary"
                  : "destructive"
            }
          >
            {status}
          </Badge>
        </div>

        <p className="text-sm text-gray-500">{job.location}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center text-sm text-gray-500">
        <span>Posted {formatDistanceToNow(new Date(job.createdAt))} ago</span>

        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm" disabled={status !== "open"}>
            {status === "open" ? "View Details" : "Closed"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
