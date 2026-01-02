import { getSession } from "@/app/api/auth/[...nextauth]/options";
import ApplicationCard from "@/components/application-card";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

const getApplication = async (applicationId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications/${applicationId}`,
  );
  return data;
};

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string; applicationId: string }>;
}) {
  const session = await getSession();
  if (!session) return notFound();

  const { applicationId } = await params;
  const application = await getApplication(applicationId);
  const isAppliedCandidate = session.user.id === application.candidate;
  const isOwner = session.user.id === application.job._id;

  if (!isAppliedCandidate && !isOwner) return notFound();

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
