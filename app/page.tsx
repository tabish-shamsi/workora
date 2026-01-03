import JobList from "@/components/job-list";
import Pagination from "@/components/pagination";
import SearchCard from "@/components/search-card";
import JobSkeleton from "@/components/skeletons/jobs-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

async function getJobs(params: {
  page?: string;
  search?: string;
  location?: string;
  type?: string;
}) {
  const query = new URLSearchParams({
    page: params.page || "1",
    search: params.search || "",
    location: params.location || "",
    type: params.type || "",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${query}`,
    { cache: "no-store" },
  );

  return res.json();
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    location?: string;
    type?: string;
  }>;
}) {
  return (
    <main className="space-y-8 ">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next Job Fast
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Workora makes it easy to discover and apply to the best jobs.
            Employers can post jobs in minutes.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/">
              <Button variant="default" size="lg">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/employer/post-job">
              <Button variant="outline" size="lg">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Container wrapper */}
      <section className="container">
        <SearchCard />

        <Suspense fallback={<JobSkeleton />}>
          <RenderJobsList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}

async function RenderJobsList({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    location?: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;
  const data = await getJobs(params);

  if (data.data.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <JobList jobs={data.data} />
      <Pagination totalItems={data.pagination.totalJobs} />
    </div>
  );
}
