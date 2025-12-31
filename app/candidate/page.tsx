"use client";

import { useState } from "react";
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

/* ---------------- Mock Data ---------------- */

type CandidateApplicationStatus =
  | "Pending"
  | "Reviewed"
  | "Shortlisted"
  | "Rejected";

type CandidateApplication = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  type: string;
  status: CandidateApplicationStatus;
  appliedAt: string;
};

const applications: CandidateApplication[] = [
  {
    id: "1",
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    status: "Pending",
    appliedAt: "2 days ago",
  },
  {
    id: "2",
    jobTitle: "Backend Engineer",
    company: "Appverse",
    location: "Lahore",
    type: "Onsite",
    status: "Reviewed",
    appliedAt: "1 week ago",
  },
  {
    id: "3",
    jobTitle: "UI/UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    status: "Shortlisted",
    appliedAt: "3 weeks ago",
  },
  {
    id: "4",
    jobTitle: "DevOps Engineer",
    company: "CloudOps",
    location: "Karachi",
    type: "Full-time",
    status: "Rejected",
    appliedAt: "5 days ago",
  },
];

/* ---------------- Page ---------------- */

export default function CandidateDashboardPage() {
  const [apps, setApps] = useState(applications);

  return (
    <section className="container py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">
          Track all the jobs you’ve applied to
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{apps.length}</p>
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
              {apps.filter((a) => a.status === "Pending").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Shortlisted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {apps.filter((a) => a.status === "Shortlisted").length}
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
              {apps.filter((a) => a.status === "Rejected").length}
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
              {apps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <Link
                      href={`/jobs/${app.id}`}
                      className="font-medium underline"
                    >
                      {app.jobTitle}
                    </Link>
                  </TableCell>

                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.location}</TableCell>
                  <TableCell>{app.type}</TableCell>

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

                  <TableCell>{app.appliedAt}</TableCell>

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
