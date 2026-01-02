import { getSession } from "@/app/api/auth/[...nextauth]/options";
import ApplyJobForm from "@/components/applyjob-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import { Clock, FileText, Mail, User } from "lucide-react";

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
  if (!session || session.user?.accountType !== "candidate") {
    return (
      <section className="container py-10">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You are not authorized to view this page.
        </p>
      </section>
    );
  }

  const { id } = await params; // JobId from params
  const application = await getApplication(id, session.user.id);
  const job = await getJob(id);

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
        <Card className="max-w-xl rounded-2xl shadow-sm mx-auto">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                {application.name}
              </CardTitle>
              <Badge
                variant={
                  application.status === "pending"
                    ? "secondary"
                    : application.status === "accepted"
                      ? "default"
                      : "destructive"
                }
              >
                {application.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {application.email}
            </p>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Job Title</span>
              <span className="font-mono">{application.job.title}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" /> Resume
              </span>
              <a
                href={application.resume.url}
                className="font-mono  hover:underline"
                target="_blank"
                title="Download Resume"
              >
                {application.resume.fileName}
              </a>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Applied On
              </span>
              <span>
                {format(new Date(application.createdAt), "dd MMM yyyy")} ·{" "}
                {format(new Date(application.createdAt), "hh:mm a")}
              </span>
            </div>

            {application.coverLetter && (
              <div className="space-y-1 rounded-lg border bg-muted/40 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="h-4 w-4" />
                  Cover Letter
                </div>

                <p className="whitespace-pre-line text-muted-foreground">
                  {application.coverLetter}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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
