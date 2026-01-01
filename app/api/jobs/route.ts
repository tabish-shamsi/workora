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

  const query: any = {
    status: "open",
  };

  // 🔍 TEXT SEARCH (handles spaces, relevance, typos better)
  if (search) {
    query.$text = { $search: search };
  }

  // 📍 Filters
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (type) {
    query.jobType = type; // normalized enum (full-time, contract, etc.)
  }

  const jobs = await Job.find(
    query,
    search ? { score: { $meta: "textScore" } } : {},
  )
    .sort(
      search
        ? { score: { $meta: "textScore" }, createdAt: -1 }
        : { createdAt: -1 },
    )
    .skip(skip)
    .limit(limit)
    .lean();

  const totalJobs = await Job.countDocuments(query);

  return NextResponse.json({
    data: jobs,
    pagination: {
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
    },
  });
}
