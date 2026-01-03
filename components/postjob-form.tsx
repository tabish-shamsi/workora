"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import Form from "@/components/Form";
import { jobTypeOptions } from "@/lib/constants";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import postJobSchema, { PostJobSchemaType } from "@/schemas/post-job-schema";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/components/ui/sonner";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Job } from "@/models/Job";

export default function PostJobForm({ job }: { job?: Job }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isEmployer, isAuthenticated } = useAuth();

  const form = useForm<PostJobSchemaType>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: job?.title || "",
      company: job?.company || "",
      location: job?.location || "",
      type: job?.jobType || "",
      description: job?.description || "",
      salary: job?.salary || "",
      lastDate: job?.lastDate ? new Date(job.lastDate) : new Date(),
      status: job?.status,
    },
  });

  useEffect(() => {
    if (isAuthenticated && !isEmployer) {
      ErrorToast("You are not authorized to post a job");
      router.push("/");
    }
    if (user && !job) {
      form.setValue("company", user.company);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (data: PostJobSchemaType) => {
    try {
      setLoading(true);
      const url = job ? `/api/jobs/${job._id}` : "/api/jobs/post";
      let res;

      if (job) {
        const editPost = await axios.patch(url, data);
        res = editPost;
        router.push("/dashboard");
      } else {
        const newPost = await axios.post(url, data);
        res = newPost;
        router.push("/");
      }

      SuccessToast(res.data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
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

      {job && (
        <Input
          name="status"
          label="Job Status"
          control={form.control}
          type="select"
          options={["open", "filled", "expired"]}
          placeholder="Select Job Status"
          className="select:w-full"
        />
      )}

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
      <SubmitButton pending={loading}>
        {job ? "Save Changes" : "Post Job"}
      </SubmitButton>
    </Form>
  );
}
