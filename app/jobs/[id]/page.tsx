import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import ApplicationModel from "@/models/Application";
import { JobDetailsSkeleton } from "@/components/skeletons/job-detail-card-skeleton";
import { Suspense } from "react";
import "@/models/Resume";
import "@/models/Job";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getApplications = async (jobId: string) => {
  const applications = await ApplicationModel.find({
    job: jobId,
  })
    .populate("job")
    .populate("resume");
  return applications;
};

export default function JobDetailPage({ params }: JobDetailsPageProps) {
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <RenderJobDetailsPage params={params} />
    </Suspense>
  );
}

async function RenderJobDetailsPage({ params }: JobDetailsPageProps) {
  const session = await getSession();
  const { id } = await params;
  const { data: job } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`,
  );

  let alreadyApplied = false;
  let application: any;

  if (session) {
    const applications = await getApplications(id);
    application = applications.find(
      (application: any) =>
        application.candidate.toString() === session.user.id,
    );

    if (application) {
      alreadyApplied = true;
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
