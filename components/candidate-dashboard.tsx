import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { FileSearch, Share, SquarePen, Trash } from "lucide-react";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import { formatDistanceToNow } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { User } from "next-auth";
import WithdrawApplicationButton from "./withdraw-application-button";

type ApplicationType = Application & {
  job: Job;
};

const getApplications = async (candidateId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications?candidate=${candidateId}`,
  );
  return {
    applications: res.data.applications as ApplicationType[],
    pagination: res.data.pagination,
  };
};

export default async function CandidateDashboard({ user }: { user: User }) {
  const { applications } = await getApplications(user.id ?? "");
  if (applications.length == 0) return noApplications();

  return (
    <section className="container py-10 space-y-8">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground">
                Track your applications and stay updated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{applications.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {applications.filter((a) => a.status === "pending").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {applications.filter((a) => a.status === "accepted").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {applications.filter((a) => a.status === "rejected").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map(
                (app) =>
                  app.job && (
                    <TableRow key={app._id.toString()}>
                      <TableCell>
                        <Link
                          href={`/jobs/${app._id.toString()}`}
                          className="font-medium underline"
                        >
                          {app.job.title}
                        </Link>
                      </TableCell>

                      <TableCell>{app.job.company}</TableCell>
                      <TableCell className="capitalize">
                        {app.job.location}
                      </TableCell>
                      <TableCell className="capitalize">
                        {app.job.jobType.split("-").join(" ")}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            app.status === "pending"
                              ? "secondary"
                              : app.status === "Reviewed"
                                ? "default"
                                : app.status === "accepted"
                                  ? "outline"
                                  : "destructive"
                          }
                          className="capitalize"
                        >
                          {app.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {formatDistanceToNow(app.createdAt, {
                          addSuffix: true,
                        })}
                      </TableCell>

                      <TableCell className="text-right">
                        {renderActions(
                          app._id.toString(),
                          app.job._id.toString(),
                        )}
                      </TableCell>
                    </TableRow>
                  ),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

function renderActions(applicationId: string, jobId: string) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/dashboard/applications/${applicationId}`}>
            <Button size="sm">
              <Share />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>View Application</TooltipContent>
      </Tooltip>

      <WithdrawApplicationButton applicationId={applicationId} />
    </div>
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
        You haven’t applied to any jobs yet. Once you start applying, your
        applications will appear here so you can track their status.
      </p>

      <Button asChild className="mt-6">
        <Link href="/">Browse Jobs</Link>
      </Button>
    </div>
  );
}
