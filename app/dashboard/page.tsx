import { User } from "next-auth";
import { getSession } from "../api/auth/[...nextauth]/options";
import CandidateDashboard from "@/components/candidate-dashboard";
import EmployerDashboard from "@/components/employer-dashboard";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return <div>Not logged in</div>;

  const user = session.user as User;

  const isCandidate = user.accountType === "candidate";
  const isEmployer = user.accountType === "employer";

  if (isCandidate) {
    return <CandidateDashboard candidateId={user.id ?? ""} />;
  }

  if (isEmployer) {
    return <EmployerDashboard user={user} />;
  }

  return notFound();
}
