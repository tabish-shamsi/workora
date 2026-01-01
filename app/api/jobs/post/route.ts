import db from "@/lib/db";
import JobModel from "@/models/Job";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    title,
    company,
    location,
    type,
    description,
    lastDate,
    employerId,
    salary,
  } = await req.json();

  if (
    !title ||
    !company ||
    !location ||
    !type ||
    !description ||
    !lastDate ||
    !employerId ||
    !salary
  ) {
    return Response.json(
      { error: "Missing required fields", success: false },
      { status: 400 },
    );
  }

  try {
    await db();
    const user = await UserModel.findById(employerId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.accountType !== "employer") {
      return Response.json(
        { error: "Only employer can post a job" },
        { status: 400 },
      );
    }

    await JobModel.create({
      title,
      company,
      location,
      jobType: type,
      description,
      lastDate,
      employer: employerId,
      salary: salary,
    });

    return Response.json({ success: true, message: "Job has been posted!" }, {status: 201});
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
