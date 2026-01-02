"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Resume } from "@/models/Resume";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { FileUp, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ResumeInputSkeleton from "./skeletons/resume-input-skeleton";

export default function ResumeInput({ form }: { form: UseFormReturn<any> }) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { watch, setValue } = form;
  const resumeId = watch("resume");

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await axios.get<Resume[]>("/api/resume");

      if (!res.data.length) return;

      const sorted = [...res.data].sort(
        (a, b) =>
          new Date(b.createdAt ?? "").getTime() -
          new Date(a.createdAt ?? "").getTime(),
      );

      setResumes(sorted);
      setSelectedResume(sorted[0]);
      setValue("resume", sorted[0]._id);
      setLoading(false);
    };

    fetchResumes();
  }, [setValue]);

  if (loading) return <ResumeInputSkeleton />;

  return (
    <div className="space-y-3">
      <Label>Resume</Label>

      <div className="w-full items-center justify-center flex gap-4">
        {/* Select existing resume */}
        <Select
          disabled={loading}
          value={resumeId}
          onValueChange={(value) => {
            setValue("resume", value);
            setSelectedResume(
              resumes.find((r) => r._id.toString() === value) || null,
            );
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem
                key={resume._id.toString()}
                value={resume._id.toString()}
              >
                {resume.fileName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;
            setUploading(true);
            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            const res = await axios.post("/api/resume/upload", formData);

            setResumes((prev) => [res.data.resume, ...prev]);
            setSelectedResume(res.data.resume);
            setValue("resume", res.data.resume._id);
            setUploading(false);
          }}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => inputRef.current?.click()}
              className="inline-flex cursor-pointer items-center rounded-md border px-3 py-2 text-sm hover:bg-muted"
              type="button"
            >
              <FileUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload new resume</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Upload new resume */}

      {selectedResume && (
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          Selected:{" "}
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <span className="font-medium">{selectedResume.fileName}</span>
          )}
        </p>
      )}
    </div>
  );
}
