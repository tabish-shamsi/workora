import ApplicationModel from "@/models/Application";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const { applicationId } = await params;
  if (!applicationId) return Response.json(null);

  const application = await ApplicationModel.findById(applicationId)
    .populate({
      path: "job",
      select: "title company location jobType createdAt",
    })
    .populate({ path: "resume", select: "fileName url" })
    .sort({ createdAt: -1 })
    .lean();

  if (!application) return Response.json(null);

  return Response.json(application);
}
