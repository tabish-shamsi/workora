import ApplicationModel from "@/models/Application";
import { NextRequest } from "next/server";
import "@/models/Resume";
import "@/models/Job";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const { applicationId } = await params;
  if (!applicationId) return Response.json(null);

  await db();
  const application = await ApplicationModel.findById(applicationId)
    .populate({
      path: "job",
      select: "title company location jobType createdAt employer",
    })
    .populate({ path: "resume", select: "fileName url" })
    .sort({ createdAt: -1 })
    .lean();

  if (!application) return Response.json(null);

  return Response.json(application);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const { applicationId } = await params;
  if (!applicationId) return Response.json(null);

  console.log({ applicationId });

  try {
    const { status } = await req.json();
    await db();
    const application = await ApplicationModel.findById(applicationId);
    if (!application)
      return Response.json(
        { error: "Application not found", success: false },
        { status: 400 },
      );

    application.status = status;
    await application.save();

    revalidatePath(`/jobs/${application.job.toString()}/applications`);
    return Response.json({ message: "Application updated!", success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> },
) {
  const { applicationId } = await params;
  if (!applicationId) return Response.json(null);

  try {
    await db();
    const application = await ApplicationModel.findById(applicationId);
    if (!application)
      return Response.json(
        { error: "Application not found", success: false },
        { status: 400 },
      );

    await ApplicationModel.findByIdAndDelete(applicationId);

    return Response.json({ message: "Application deleted!", success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
