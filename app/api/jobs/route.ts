import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";

  const skip = (page - 1) * limit;

  // 🔍 Build dynamic filter
  const query: any = { status: "open" };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (location) query.location = location;
  if (type) query.type = type;

  const [jobs, totalJobs] = await Promise.all([
    Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Job.countDocuments(query),
  ]);

  return NextResponse.json({
    data: jobs,
    pagination: {
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
    },
  });
}
