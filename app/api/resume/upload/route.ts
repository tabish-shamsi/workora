import db from "@/lib/db";
import imagekit from "@/lib/imagekit";
import Resume from "@/models/Resume";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formdata = await req.formData();
  const file = formdata.get("file") as File;
  const userId = formdata.get("userId") as string;

  if (!file) {
    return Response.json(
      { error: "Resume file is required", success: false },
      { status: 400 },
    );
  }

  try {
    await db()
    const user = await UserModel.findById(userId).select("accountType");

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.accountType !== "candidate") {
      return Response.json(
        { error: "Only candidate can upload resumes" },
        { status: 400 },
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

    await Resume.create({
      candidate: userId,
      url: res.url,
      fileName: file.name,
      fileId: res.fileId,
    });

    return Response.json({ message: "Resume uploaded Successfully!" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong, please try again later." },
      { status: 500 },
    );
  }
}
