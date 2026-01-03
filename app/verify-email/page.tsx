import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyEmailForm from "@/components/verify-email-form";
import { getSession } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function VerifyOtpPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session && session.user?.isVerified) redirect("/login");

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Email Address</CardTitle>
          <CardDescription>
            We have sent a verification code to your provided email, please
            enter the 6-digit code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </section>
  );
}
