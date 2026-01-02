import { NextRequest } from "next/server";
import { getSession } from "../auth/[...nextauth]/options";
import Resume from "@/models/Resume";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
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
        error: "Only candidates can see their resume",
      },
      { status: 401 },
    );
  }

  await db();
  const resumes = await Resume.find({ candidate: user.id }).sort({
    createdAt: -1,
  });
  return Response.json(resumes);
}
