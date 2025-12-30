import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Logo from "@/assets/workora-logo.png";


export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo} // Your Workora icon in /public
                alt="Workora Logo"
                width={32}
                height={32}
              />
              <span className="font-semibold text-xl text-gray-900">
                Workora
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-sm">
              Workora is a lightweight job board that helps candidates find jobs
              quickly and employers post opportunities with ease.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Job Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Employer Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Employer */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-3">
              Employers
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/employer/post-job"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/jobs"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Workora. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js & Shadcn UI</p>
        </div>
      </div>
    </footer>
  );
}
