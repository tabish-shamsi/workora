import { getSession } from "@/app/api/auth/[...nextauth]/options";
import PostJobForm from "@/components/postjob-form";
import { JobFormSkeleton } from "@/components/skeletons/post-job-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<JobFormSkeleton />}>
      <RenderEditPage params={params} />
    </Suspense>
  );
}

async function RenderEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const { data: job } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`,
  );
  const isOwner = session.user.id === job.employer;
  if (!isOwner) redirect(`/jobs/${id}`);

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
      <div className="max-w-3xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Post a Job</CardTitle>
          </CardHeader>

          <CardContent>
            <PostJobForm job={job} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
