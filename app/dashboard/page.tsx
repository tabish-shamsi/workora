import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/* ---------------- Types ---------------- */

type JobStatus = "Active" | "Filled" | "Expired";

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  status: JobStatus;
  postedAt: string;
  applications: number;
};

/* ---------------- Mock Jobs ---------------- */

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    postedAt: "2 days ago",
    applications: 18,
  },
  {
    id: "2",
    title: "Backend Engineer",
    location: "Lahore",
    type: "Onsite",
    status: "Filled",
    postedAt: "1 week ago",
    applications: 42,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    status: "Expired",
    postedAt: "3 weeks ago",
    applications: 7,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    location: "Karachi",
    type: "Full-time",
    status: "Active",
    postedAt: "5 days ago",
    applications: 11,
  },
];

/* ---------------- Stats ---------------- */

const totalApplications = jobs.reduce(
  (sum, job) => sum + job.applications,
  0
);

const stats = [
  { title: "Total Jobs", value: jobs.length },
  {
    title: "Active Jobs",
    value: jobs.filter((j) => j.status === "Active").length,
  },
  { title: "Applications", value: totalApplications },
  {
    title: "Filled Jobs",
    value: jobs.filter((j) => j.status === "Filled").length,
  },
];

/* ---------------- Page ---------------- */

export default function DashboardPage() {
  return (
    <section className="max-w-3/4 mx-auto space-y-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Button asChild>
          <Link href="/post-job">Post New Job</Link>
        </Button>
      </div>

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
                <TableHead>Applications</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job.title}
                  </TableCell>

                  <TableCell>{job.location}</TableCell>

                  <TableCell>{job.type}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        job.status === "Active"
                          ? "default"
                          : job.status === "Filled"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {job.applications === 0 ? (
                      <span className="text-muted-foreground">
                        No applications
                      </span>
                    ) : (
                      <span className="font-semibold">
                        {job.applications}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>{job.postedAt}</TableCell>

                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      View
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
