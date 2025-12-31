import { Badge } from "@/components/ui/badge";
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

/* ---------------- Mock Data ---------------- */

const job = {
  title: "Frontend Developer",
  location: "Remote",
  type: "Full-time",
};

const applications = [
  {
    id: "1",
    name: "Ali Raza",
    email: "ali@example.com",
    appliedAt: "2 days ago",
    resumeUrl: "#",
    status: "Pending",
  },
  {
    id: "2",
    name: "Sara Khan",
    email: "sara@example.com",
    appliedAt: "4 days ago",
    resumeUrl: "#",
    status: "Reviewed",
  },
  {
    id: "3",
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    appliedAt: "1 week ago",
    resumeUrl: "#",
    status: "Shortlisted",
  },
  {
    id: "4",
    name: "Fatima Noor",
    email: "fatima@example.com",
    appliedAt: "10 days ago",
    resumeUrl: "#",
    status: "Rejected",
  },
] as const;

/* ---------------- Page ---------------- */

export default function ApplicationsPage() {
  return (
    <section className="container mt-16">
      {/* Job Header */}
      <div>
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">
          {job.location} · {job.type}
        </p>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="py-6">
          <p className="text-lg font-semibold">
            Total Applications:{" "}
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
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>

                  <TableCell>{app.email}</TableCell>

                  <TableCell>{app.appliedAt}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        app.status === "Pending"
                          ? "secondary"
                          : app.status === "Reviewed"
                            ? "default"
                            : app.status === "Shortlisted"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {app.status}
                    </Badge>
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
