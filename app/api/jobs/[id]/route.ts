import db from "@/lib/db";
import JobModel from "@/models/Job";
import { NextRequest } from "next/server";
import { getSession } from "../../auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import ApplicationModel from "@/models/Application";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const session = await getSession();

    await db();
    const job = await JobModel.findById(id);

    if (!job) {
      return Response.json(
        { success: false, message: "Job not found" },
        { status: 404 },
      );
    }

    const isOwner = job.employer.toString() === session?.user.id;
    if (!isOwner) {
      return Response.json(
        {
          success: false,
          message: "Only the owner of the job can edit it's content",
        },
        { status: 403 },
      );
    }

    await JobModel.findByIdAndUpdate(id, { ...body, jobType: body.type });

    revalidatePath(`/dashboard`);
    return Response.json({ success: true, message: "Job updated" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();

    await db();
    const job = await JobModel.findById(id);

    if (!job) {
      return Response.json(
        { success: false, message: "Job not found" },
        { status: 404 },
      );
    }

    const isOwner = job.employer.toString() === session?.user.id;
    if (!isOwner) {
      return Response.json(
        {
          success: false,
          message: "Only the owner of the job can delete the job",
        },
        { status: 403 },
      );
    }

    await ApplicationModel.deleteMany({ job: id });
    await JobModel.findByIdAndDelete(id);
    revalidatePath(`/dashboard`);
    return Response.json({ success: true, message: "Job Deleted" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
