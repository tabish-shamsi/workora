import { ReactNode } from "react";
import authOptions from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) return "/dashboard";
  return children;
}
