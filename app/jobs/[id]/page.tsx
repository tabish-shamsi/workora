import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { getSession } from "@/app/api/auth/[...nextauth]/options";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const session = await getSession();
  const { id } = await params;
  const { data: job } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`,
  );

  let alreadyApplied = false;
  let application: any;

  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?job=${id}&candidate=${session.user.id}`,
    );

    if (res.data.applications.length > 0) {
      alreadyApplied = true;
      application = res.data.applications[0];
    }
  }

  if (!job) return notFound();

  const isOwner = session?.user.id === job.employer;
  const isEmployer = session?.user.accountType === "employer";
  const isExpired = job.lastDate < new Date().getTime() / 1000;
  const status = isExpired ? "expired" : job.status;

  const renderActionButton = () => {
    if (isOwner) {
      return (
        <Button asChild>
          <Link href={`/jobs/${id}/applications`}>View Job Applications</Link>
        </Button>
      );
    }

    if (alreadyApplied) {
      return (
        <Button variant="secondary">
          <Link href={`/dashboard/applications/${application._id}`}>
            View Application
          </Link>
        </Button>
      );
    }

    if (!isEmployer) {
      const isClosed = status !== "open";
      return (
        <Link href={`/jobs/${id}/apply`}>
          <Button
            variant={isClosed ? "secondary" : "default"}
            disabled={isClosed}
          >
            {isClosed ? "Applications Closed" : "Apply Now"}
          </Button>
        </Link>
      );
    }

    return null;
  };

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

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 capitalize">
            <span>📍 {job.location}</span>
            <span>🕒 {job.jobType.split("-").join(" ")}</span>
            <span>💵 {job.salary}</span>
            <span>
              Posted {formatDistanceToNow(new Date(job.createdAt))} ago
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
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
                  new Date(job.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000,
                ),
                "PPP",
              )}
            </p>

            {renderActionButton()}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
