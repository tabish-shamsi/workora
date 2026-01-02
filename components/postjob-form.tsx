"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import Form from "@/components/Form";
import { jobTypeOptions } from "@/lib/constants";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import postJobSchema, { PostJobSchemaType } from "@/schemas/post-job-schema";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/components/ui/sonner";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";

export default function PostJobForm({ company }: { company: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: PostJobSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/jobs/post", data);
      SuccessToast(res.data.message);
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      company: company || "",
      location: "",
      type: "",
      description: "",
      salary: "",
      lastDate: undefined,
    },
  });

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Post a Job</CardTitle>
        </CardHeader>

        <CardContent>
          <Form onSubmit={handleSubmit} form={form} className="space-y-8">
            {/* Job Title */}
            <Input
              name="title"
              label="Job Title"
              placeholder="Frontend Developer"
              control={form.control}
            />

            {/* Company */}
            <Input
              name="company"
              label="Company Name"
              placeholder="TechNova"
              control={form.control}
            />

            {/* Location */}
            <Input
              name="location"
              label="Location"
              placeholder="Remote / Karachi, Pakistan"
              control={form.control}
            />

            {/* Job Type */}
            <Input
              name="type"
              label="Job Type"
              placeholder="Select Job Type"
              control={form.control}
              type="select"
              options={jobTypeOptions}
              className="select:w-full"
            />

            <Input
              name="salary"
              label="Salary Range"
              placeholder="Rs 60,000 - Rs 80,000"
              control={form.control}
            />

            {/* Last Date */}
            <Input
              name="lastDate"
              label="Last Date to apply"
              placeholder="Pick Date"
              control={form.control}
              type="date"
            />

            {/* Description */}
            <Input
              name="description"
              label="Job Description"
              placeholder="Describe the role, responsibilities, and requirements for this job."
              control={form.control}
              type="textarea"
            />
            {/* Submit */}
            <SubmitButton pending={loading}>Post Job</SubmitButton>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
