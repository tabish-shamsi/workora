import { getSession } from "@/app/api/auth/[...nextauth]/options";
import ApplicationCard from "@/components/application-card";
import ApplyJobForm from "@/components/applyjob-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";

const getApplication = async (jobId: string, userId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?job=${jobId}&candidate=${userId}`,
  );

  return data.applications[0];
};

const getJob = async (jobId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${jobId}`,
  );

  return data;
};

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || session.user?.accountType !== "candidate") return notFound()

  const { id } = await params; // JobId from params
  const application = await getApplication(id, session.user.id);
  const job = await getJob(id);

  if (!job) return notFound();
  const isAppliedCandidate = session.user.id === application.candidate;
  const isOwner = session.user.id === application.job._id;

  if (!isAppliedCandidate && !isOwner) {
    return (
      <section className="container py-10">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You are not authorized to view this page.
        </p>
      </section>
    );
  }

  if (!application) return notFound();

  return (
    <section className="container py-10">
      {/* Job Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">
          {job.location} · {job.jobType} · Posted{" "}
          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </p>
      </div>

      {/* Application Form */}
      {application ? (
        <ApplicationCard application={application} />
      ) : (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Apply for this job</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplyJobForm jobId={id} user={session.user} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}
