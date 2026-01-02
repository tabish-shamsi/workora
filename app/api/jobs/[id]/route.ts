import db from "@/lib/db";
import JobModel from "@/models/Job";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db();

  const job = await JobModel.findById(id);

  if (!job) {
    return Response.json(
      { success: false, message: "Job not found" },
      { status: 404 },
    );
  }

  return Response.json(job);
}
