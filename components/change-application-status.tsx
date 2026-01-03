"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "./ui/sonner";

export default function ChangeApplicationStatus({
  status,
  applicationId,
}: {
  status: string;
  applicationId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function changeStatus(status: string) {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/applications/${applicationId}`, {
        status,
      });
      SuccessToast(res.data.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={status}
        onValueChange={(value) => changeStatus(value)}
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
      {loading && <Loader2 className="animate-spin" />}
    </div>
  );
}
