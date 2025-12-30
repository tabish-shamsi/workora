import JobList from "@/components/job-list";
import Pagination from "@/components/pagination";
import SearchCard from "@/components/search-card";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/temporary/mock-jobs";
import Job from "@/types/Job";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function Home() {
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
      <div className="container max-w-3/4 mx-auto space-y-8">
        <SearchCard />

        <section className="space-y-8">
          <JobList jobs={mockJobs} />

          <Pagination
            totalItems={mockJobs.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </section>
      </div>
    </main>
  );
}
