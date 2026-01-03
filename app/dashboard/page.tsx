import { User } from "next-auth";
import { getSession } from "../api/auth/[...nextauth]/options";
import CandidateDashboard from "@/components/candidate-dashboard";
import EmployerDashboard from "@/components/employer-dashboard";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderDashboard />
    </Suspense>
  );
}

async function RenderDashboard() {
  const session = await getSession();
  const user = session.user as User;
  const isCandidate = user.accountType === "candidate";
  const isEmployer = user.accountType === "employer";

  if (isCandidate) {
    return <CandidateDashboard user={user} />;
  }

  if (isEmployer) {
    return <EmployerDashboard user={user} />;
  }
}
