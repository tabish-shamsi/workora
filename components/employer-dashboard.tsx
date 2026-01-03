import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import JobModel, { Job } from "@/models/Job";
import ApplicationModel from "@/models/Application";
import { User } from "next-auth";
import { formatDistanceToNow } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Eye, FileText, Pencil, Trash } from "lucide-react";
import DeleteJobButton from "./delete-job-button";

const getJobs = async (employerId: string) => {
  const jobs = (await JobModel.find({ employer: employerId })) as Job[];
  const jobIds = jobs.map((job) => job._id);

  const totalApplications = await ApplicationModel.countDocuments({
    job: { $in: jobIds },
  });

  return { jobs, totalApplications };
};

export default async function EmployerDashboard({ user }: { user: User }) {
  const { jobs, totalApplications } = await getJobs(user.id ?? "");

  const stats = [
    { title: "Total Jobs", value: jobs.length },
    {
      title: "Active Jobs",
      value: jobs.filter((j) => j.status === "open").length,
    },
    { title: "Applications", value: totalApplications },
    {
      title: "Filled Jobs",
      value: jobs.filter((j) => j.status === "filled").length,
    },
  ];
  return (
    <section className="max-w-3/4 mx-auto space-y-8 mt-16">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground">
                Track your Jobs and stay updated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Job Listings</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id.toString()}>
                  <TableCell className="font-medium">{job.title}</TableCell>

                  <TableCell>{job.location}</TableCell>

                  <TableCell className="capitalize">
                    {job.jobType.split("-").join(" ")}
                  </TableCell>

                  <TableCell className="capitalize">
                    <Badge
                      variant={
                        job.status === "open"
                          ? "default"
                          : job.status === "filled"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {/* View Job */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" asChild>
                            <Link href={`/jobs/${job._id.toString()}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View job details</TooltipContent>
                      </Tooltip>

                      {/* View Applications */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" asChild>
                            <Link
                              href={`/jobs/${job._id.toString()}/applications`}
                            >
                              <FileText className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View applications</TooltipContent>
                      </Tooltip>

                      {/* Edit Job */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" asChild>
                            <Link href={`/jobs/${job._id.toString()}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit job</TooltipContent>
                      </Tooltip>
                      {/* Delete Job */}
                      <DeleteJobButton jobId={job._id.toString()} />
                    </div>
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
