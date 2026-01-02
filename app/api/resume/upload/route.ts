import db from "@/lib/db";
import imagekit from "@/lib/imagekit";
import Resume from "@/models/Resume"; 
import { NextRequest } from "next/server";
import { getSession } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const formdata = await req.formData();
  const file = formdata.get("file") as File;

  if (!file) {
    return Response.json(
      { error: "Resume file is required", success: false },
      { status: 400 },
    );
  }

  try {
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

    const buffer = Buffer.from(await file.arrayBuffer());

    const res = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "workora/resumes",
    });

    if (!res.url) {
      return Response.json(
        { error: "Something went wrong while uploading resume" },
        { status: 400 },
      );
    }

    await db();

    const resume = await Resume.create({
      candidate: user.id,
      url: res.url,
      fileName: file.name,
      fileId: res.fileId,
    });

    return Response.json({ message: "Resume uploaded Successfully!", resume });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong, please try again later." },
      { status: 500 },
    );
  }
}
