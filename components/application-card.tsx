import { Application } from "@/models/Application";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Clock, FileText, Mail, User } from "lucide-react";
import { Job } from "@/models/Job";
import { Resume } from "@/models/Resume";
import Link from "next/link";
import { Button } from "./ui/button";

type ApplicationType = Application & {
  job: Job;
  resume: Resume;
};

export default function ApplicationCard({
  application,
}: {
  application: ApplicationType;
}) {
  return (
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

          <Link href={`/jobs/${application.job._id}`}>
            <Button variant="link" className="font-mono hover:underline px-0">
              {application.job.title}
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" /> Resume
          </span>
          <Link target="_blank" href={application.resume.url}>
            <Button variant="link" className="font-mono hover:underline px-0">
              {application.resume.fileName}
            </Button>
          </Link>
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
  );
}
