"use client";

import { Card, CardContent } from "@/components/ui/card";
import Form from "./Form";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import SubmitButton from "./submit-button";
import searchJobSchema, { SearchJobTypes } from "@/schemas/search-job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobTypeOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchCard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (data: SearchJobTypes) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", data.query ?? "");
    params.set("location", data.location ?? "");
    params.set("type", data.jobType ?? "");
    params.set("page", "1"); // reset page on new search
    router.push(`/?${params.toString()}`);
    setLoading(false);
  };

  const form = useForm({
    defaultValues: {
      query: "",
      location: "",
      jobType: "",
    },
    resolver: zodResolver(searchJobSchema),
  });

  const { control } = form;

  return (
    <Card className="w-full">
      <CardContent>
        <Form
          onSubmit={handleSearch}
          form={form}
          className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center"
        >
          <Input
            className="w-full gap-0"
            control={control}
            placeholder="Keywords"
            name="query"
          />
          <Input
            className="w-full gap-0"
            control={control}
            placeholder="Location"
            name="location"
          />

          <Input
            className="w-full gap-0 select:w-full"
            control={control}
            placeholder="Job Type"
            name="jobType"
            type="select"
            options={jobTypeOptions}
          />

          <SubmitButton pending={loading} className="w-full md:w-auto">
            Search Jobs
          </SubmitButton>
        </Form>
      </CardContent>
    </Card>
  );
}
