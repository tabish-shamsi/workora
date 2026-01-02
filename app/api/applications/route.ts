import db from "@/lib/db";
import ApplicationModel from "@/models/Application";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const candidate = searchParams.get("candidate");
  const job = searchParams.get("job");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;
  const skip = (page - 1) * limit;


  let query;

  if (candidate) {
    query = { candidate };
  }

  if (job) {
    query = { ...query, job };
  }

  await db();  
  const applications = await ApplicationModel.find(query)
    .populate({
      path: "job",
      select: "title company location jobType createdAt",
    })
    .populate({ path: "resume", select: "fileName url" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalApplications = await ApplicationModel.countDocuments({
    candidate,
    job,
  })  

  return Response.json({
    applications,
    pagination: {
      totalApplications,
      totalPages: Math.ceil(totalApplications / limit),
      currentPage: page, 
    },
  });
}
