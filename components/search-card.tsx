"use client";

import { Card, CardContent } from "@/components/ui/card";
import Form from "./Form";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import SubmitButton from "./submit-button";
import searchJobSchema from "@/schemas/search-job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobTypeOptions } from "@/lib/constants";

export default function SearchCard() {
  const handleSearch = () => {
    console.log("Searching...");
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

          <SubmitButton pending={false} className="w-full md:w-auto">
            Search Jobs
          </SubmitButton>
        </Form>
      </CardContent>
    </Card>
  );
}
