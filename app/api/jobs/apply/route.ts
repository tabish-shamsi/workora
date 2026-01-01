import db from "@/lib/db";
import ApplicationModel from "@/models/Application";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { coverLetter, email, name, jobId, candidateId, resumeId } =
    await req.json();
  console.log({candidateId, name, email, jobId, resumeId});

  if (!email || !name || !resumeId || !jobId || !candidateId) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await db();
    const user = await UserModel.findById(candidateId).select("accountType");

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.accountType !== "candidate") {
      return Response.json(
        { error: "Only candidate can apply for a job" },
        { status: 400 },
      );
    }

    await ApplicationModel.create({
      candidate: candidateId,
      job: jobId,
      coverLetter,
      email,
      name,
      resume: resumeId,
    });

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
