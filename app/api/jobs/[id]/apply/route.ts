import db from "@/lib/db";
import ApplicationModel from "@/models/Application";
import { NextRequest } from "next/server";
import { getSession } from "../../../auth/[...nextauth]/options";
import JobModel from "@/models/Job";
import { revalidatePath } from "next/cache";
import { createTransporter } from "@/lib/nodemailer";
import { render } from "@react-email/components";
import ApplicationSubmittedEmail from "@/emails/application";
import Resume from "@/models/Resume";
import mongoose from "mongoose";

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

    const job = await JobModel.findById(jobId).populate({
      path: "employer",
      select: "name email",
    });

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

    const application = await ApplicationModel.create({
      candidate: new mongoose.Types.ObjectId(user.id),
      job: new mongoose.Types.ObjectId(jobId),
      coverLetter,
      email,
      name,
      resume,
    });

    if (!application) {
      return Response.json(
        {
          success: false,
          error: "Something went wrong, please try again later.",
        },
        { status: 500 },
      );
    }

    const candidateResume = await Resume.findById(resume).select("url");

    const transporter = createTransporter();
    const emailHtml = await render(
      ApplicationSubmittedEmail({
        applicantName: name,
        applicantEmail: email,
        employerName: job.employer.name,
        jobTitle: job.title,
        companyName: job.company,
        appliedDate: new Date().toLocaleDateString(),
        dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashbaord/applications/${application._id}`,
        resumeUrl: candidateResume.url,
        coverLetter: coverLetter,
      }),
    );

    await transporter.sendMail({
      from: `"Workora" <${process.env.EMAIL}>`,
      to: job.employer.email,
      subject: `New application for ${job.title}`,
      html: emailHtml,
    });

    revalidatePath(`/jobs/${jobId}`);

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
