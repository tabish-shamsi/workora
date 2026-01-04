import db from "@/lib/db";
import JobModel from "@/models/Job"; 
import { NextRequest } from "next/server";
import { getSession } from "../../auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { title, company, location, type, description, lastDate, salary } =
    await req.json();
  if (
    !title ||
    !company ||
    !location ||
    !type ||
    !description ||
    !lastDate ||
    !salary
  ) {
    return Response.json(
      { error: "Missing required fields", success: false },
      { status: 400 },
    );
  }

  try {
    const session = await getSession();
    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user?.accountType !== "employer")
      return Response.json(
        { error: "Only employer can post a job." },
        { status: 401 },
      );

    await db();

    await JobModel.create({
      title,
      company,
      location,
      jobType: type,
      description,
      lastDate,
      employer: session.user.id,
      salary: salary,
    });

    revalidatePath("/")

    return Response.json(
      { success: true, message: "Job has been posted!" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
