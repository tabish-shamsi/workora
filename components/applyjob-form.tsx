"use client";

import Form from "@/components/Form";
import { Input } from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import ResumeInput from "@/components/resume-input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import applyJobSchema, { ApplyJobSchemaType } from "@/schemas/apply-job-schema";
import { ErrorToast, SuccessToast } from "./ui/sonner";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Application } from "@/models/Application";

export default function ApplyJobForm({
  application,
}: {
  application?: Application;
}) {
  const [loading, setLoading] = useState(false);
  const { user, isCandidate, isAuthenticated } = useAuth();
  const router = useRouter();
  const { id: jobId } = useParams();

  const form = useForm<ApplyJobSchemaType>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      coverLetter: application?.coverLetter || "",
      email: application?.email || "",
      name: application?.name || "",
      resume: "",
    },
  });

  const handleSubmit = async (data: ApplyJobSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/jobs/${jobId}/apply`, data);
      form.reset();
      SuccessToast("Application submitted successfully");
      router.push(`/jobs/${jobId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        ErrorToast(error.response?.data.error);
      } else {
        console.error(error);
        throw new Error("Something went wrong, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isCandidate) {
      ErrorToast("You must be a candidate to apply for a job");
      router.push("/dashboard");
    }
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
    }
  }, [user]);

  return (
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
      <ResumeInput form={form} />

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
  );
}
