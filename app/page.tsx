import JobList from "@/components/job-list";
import Pagination from "@/components/pagination";
import SearchCard from "@/components/search-card";
import { Button } from "@/components/ui/button";
import Job from "@/types/Job";
import Link from "next/link";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full-time",
    status: "open",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "We are looking for a Frontend Developer with strong experience in React and Next.js to build modern, responsive web applications.",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "CloudCore",
    location: "Karachi, Pakistan",
    type: "Full-time",
    status: "open",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Join our backend team to design and develop scalable REST APIs using Node.js, Express, and MongoDB.",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    status: "filled",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "We are seeking a creative UI/UX Designer to improve user experience across our web and mobile products.",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "InfraWorks",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    status: "open",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Looking for a DevOps Engineer to manage CI/CD pipelines, cloud infrastructure, and deployment workflows.",
  },
  {
    id: "5",
    title: "Junior Web Developer",
    company: "StartupX",
    location: "Lahore, Pakistan",
    type: "Internship",
    status: "expired",
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "An entry-level opportunity for aspiring web developers to gain hands-on experience with modern web technologies.",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Buildify",
    location: "Remote",
    type: "Full-time",
    status: "open",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "We are looking for a Product Manager to define product vision, work with engineering teams, and drive execution.",
  },
  // {
  //   id: "7",
  //   title: "Junior Web Developer",
  //   company: "StartupX",
  //   location: "Lahore, Pakistan",
  //   type: "Internship",
  //   status: "expired",
  //   createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  //   description:
  //     "An entry-level opportunity for aspiring web developers to gain hands-on experience with modern web technologies.",
  // },
  // {
  //   id: "8",
  //   title: "Product Manager",
  //   company: "Buildify",
  //   location: "Remote",
  //   type: "Full-time",
  //   status: "open",
  //   createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  //   description:
  //     "We are looking for a Product Manager to define product vision, work with engineering teams, and drive execution.",
  // },
];

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
