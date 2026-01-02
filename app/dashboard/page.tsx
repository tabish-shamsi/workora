import { User } from "next-auth";
import { getSession } from "../api/auth/[...nextauth]/options";
import CandidateDashboard from "@/components/candidate-dashboard";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return <div>Not logged in</div>;

  const user = session.user as User;

  const isCandidate = user.accountType === "candidate";
  const isEmployer = user.accountType === "employer";

  if (isCandidate) {
    return <CandidateDashboard candidateId={user.id ?? ""} />;
  }

  return <div>DashboardPage</div>;
}
