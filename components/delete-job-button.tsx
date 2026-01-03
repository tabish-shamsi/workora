"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "./ui/sonner";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const deleteJob = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/jobs/${jobId}`);
      SuccessToast(res.data.message);
      router.refresh()
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={deleteJob} size="icon">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete job</TooltipContent>
    </Tooltip>
  );
}
