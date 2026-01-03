import ApplyJobForm from "@/components/applyjob-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const getJob = async (jobId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${jobId}`,
  );

  return data;
};

export default function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <section className="container py-10">
      {/* Job Header */}
      <Suspense fallback={<div>Loading...</div>}>
        <RenderJobHeader params={params} />
      </Suspense>

      {/* Application Form */}
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Apply for this job</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplyJobForm />
        </CardContent>
      </Card>
    </section>
  );
}

async function RenderJobHeader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if(!job) return notFound() 

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground">
        {job.location} · {job.jobType} · Posted{" "}
        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}
