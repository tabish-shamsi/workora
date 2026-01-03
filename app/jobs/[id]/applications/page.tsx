import ChangeApplicationStatus from "@/components/change-application-status"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import axios from "axios";
import { Download, FileSearch, Share } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type ApplicationType = Application & {
  job: Job;
};

const getApplications = async (jobId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?job=${jobId}`,
  );
  return res.data.applications as ApplicationType[];
};

export default function ApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderApplicationsPage params={params} />
    </Suspense>
  );
}

async function RenderApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;
  const applications = await getApplications(id);
  if (applications.length === 0) return noApplications();

  const isOwner = applications[0].job.employer === session?.user.id;
  if (!isOwner) redirect(`/jobs/${id}`);

  return (
    <section className="container mt-16">
      {/* Job Header */}
      <div>
        <h1 className="text-3xl font-bold">{applications[0].job.title}</h1>
        <p className="text-muted-foreground">
          {applications[0].job.location} · {applications[0].job.jobType}
        </p>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="py-6">
          <p className="text-lg font-semibold">
            Total Applications:
            <span className="text-primary">{applications.length}</span>
          </p>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Resume</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id.toString()}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/dashboard/applications/${app._id.toString()}`}
                      className="flex items-center gap-2"
                    >
                      {app.name} <Share className="w-4 h-4" />
                    </Link>
                  </TableCell>

                  <TableCell>{app.email}</TableCell>

                  <TableCell>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(app.createdAt))}
                  </TableCell>

                  <TableCell>
                    <ChangeApplicationStatus
                      status={app.status}
                      applicationId={app._id.toString()}
                    />
                  </TableCell>

                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

function noApplications() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileSearch className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold">No applications found</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Looks Like there are no applications for this job yet.
      </p>

      <Button asChild className="mt-6">
        <Link href="/">Browse Jobs</Link>
      </Button>
    </div>
  );
}
