import { getSession } from "@/app/api/auth/[...nextauth]/options";
import ApplicationCard from "@/components/application-card";
import ApplicationSkeleton from "@/components/skeletons/application-skeleton";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

const getApplication = async (applicationId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications/${applicationId}`,
  );
  return data;
};

export default function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string; applicationId: string }>;
}) {
  return (
    <Suspense fallback={<ApplicationSkeleton />}>
      <RenderApplicationPage params={params} />
    </Suspense>
  );
}

async function RenderApplicationPage({
  params,
}: {
  params: Promise<{ id: string; applicationId: string }>;
}) {
  const session = await getSession();
  if (!session) return notFound();

  const { applicationId } = await params;
  const application = await getApplication(applicationId);
  const isAppliedCandidate = session.user.id === application.candidate;
  const isOwner = session.user.id === application.job.employer;

  if (!isAppliedCandidate && !isOwner) redirect("/dashboard");

  if (!application) return notFound();

  return (
    <section className="container py-10">
      {/* Job Header */}
      <div className="mb-8">
        <Link href={`/jobs/${application.job._id}`}>
          <h1 className="text-3xl font-bold">{application.job.title}</h1>
        </Link>
        <p className="text-muted-foreground">
          {application.job.location} · {application.job.jobType} · Posted{" "}
          {formatDistanceToNowStrict(new Date(application.job.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <ApplicationCard application={application} />
    </section>
  );
}
