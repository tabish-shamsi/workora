"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const user = session?.user;

  const isEmployer = user?.accountType === "employer";
  const isCandidate = user?.accountType === "candidate";

  return {
    user,
    status,
    isEmployer,
    isCandidate,
    isAuthenticated: status === "authenticated",
  };
}
