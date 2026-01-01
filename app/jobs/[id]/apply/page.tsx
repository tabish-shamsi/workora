"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import applyJobSchema, { ApplyJobSchemaType } from "@/schemas/apply-job-schema";
import Form from "@/components/Form";
import { Input } from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import FileInput from "@/components/file-input";

export default function ApplyJobPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ApplyJobSchemaType>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      coverLetter: "",
      email: "",
      name: "",
      resume: undefined,
    },
  });

  const handleSubmit = async (data: ApplyJobSchemaType) => {
    console.log("Application submitted:", data);
  };

  return (
    <section className="container py-10">
      {/* Job Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Frontend Developer</h1>
        <p className="text-muted-foreground">
          Remote · Full-time · Posted 2 days ago
        </p>
      </div>

      {/* Application Form */}
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Apply for this job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form form={form} className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <Input
              placeholder="John Doe"
              control={form.control}
              name="name"
              label="Full Name"
            />

            {/* Email */}
            <Input
              placeholder="you@company.com"
              control={form.control}
              name="email"
              label="Email"
            />

            {/* Resume */}
            <FileInput form={form} label="Resume" name="resume" />

            {/* Cover Letter */}
            <Input
              placeholder="Write a short cover letter..."
              control={form.control}
              name="coverLetter"
              label="Cover Letter (optional)"
              type="textarea"
            />

            <SubmitButton pending={loading} className="w-full">
              Submit Application
            </SubmitButton>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
