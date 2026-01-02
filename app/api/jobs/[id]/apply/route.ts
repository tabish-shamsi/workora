import db from "@/lib/db";
import ApplicationModel from "@/models/Application";
import { NextRequest } from "next/server";
import { getSession } from "../../../auth/[...nextauth]/options";
import JobModel from "@/models/Job";
import { revalidatePath } from "next/cache";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { coverLetter, email, name, resume } = await req.json();
  const { id: jobId } = await params;

  if (!email || !name || !resume || !jobId) {
    return Response.json(
      { error: "Missing required fields", success: false },
      { status: 400 },
    );
  }

  try {
    await db();
    const session = await getSession();
    if (!session) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { user } = session;
    if (user.accountType !== "candidate") {
      return Response.json(
        {
          success: false,
          error: "Only candidates can apply for this job",
        },
        { status: 401 },
      );
    }

    const job = await JobModel.findById(jobId).select("_id");
    if (!job) {
      return Response.json(
        {
          success: false,
          error: "Job not found",
        },
        { status: 404 },
      );
    }

    const alreadyApplied = await ApplicationModel.findOne({
      candidate: user.id,
      job: jobId,
    });
    if (alreadyApplied) {
      return Response.json(
        {
          success: false,
          error: "You have already applied for this job.",
        },
        { status: 400 },
      );
    }

    await ApplicationModel.create({
      candidate: user.id,
      job: jobId,
      coverLetter,
      email,
      name,
      resume,
    });

    revalidatePath(`/jobs/${jobId}`)

    return Response.json(
      { message: "Application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong, please try again later." },
      { status: 500 },
    );
  }
}
