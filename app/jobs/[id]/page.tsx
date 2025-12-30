import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import { mockJobs } from "@/temporary/mock-jobs";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const {id} = await params
  const job = mockJobs.find((job) => job.id === id);

  if (!job) return notFound();

  const isExpired =
    new Date(job.createdAt).getTime() <
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  const status = isExpired ? "expired" : job.status;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-gray-600">{job.company}</p>
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

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>📍 {job.location}</span>
            <span>🕒 {job.type}</span>
            <span>
              Posted{" "}
              {formatDistanceToNow(new Date(job.createdAt))} ago
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Job Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Apply Section */}
          <div className="flex items-center justify-between border-t pt-6">
            <p className="text-sm text-gray-500">
              Apply before:{" "}
              {format(
                new Date(
                  new Date(job.createdAt).getTime() +
                    30 * 24 * 60 * 60 * 1000
                ),
                "PPP"
              )}
            </p>

            <Button disabled={status !== "open"}>
              {status === "open"
                ? "Apply Now"
                : "Applications Closed"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
