"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailSchema,
  verifyEmailSchemaType,
} from "@/schemas/auth-schema";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/components/ui/sonner";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";

export default function VerifyOtpPage() {
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  console.log(session);

  const router = useRouter();

  const resendEmail = async () => {
    try {
      const res = await axios.post("/api/send-verify-email");
      SuccessToast(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    }
  };

  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp: "" },
  });

  const handleSubmit = async (data: verifyEmailSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/verify-email", {
        code: data.otp,
      });
      SuccessToast(res.data.message);
      await update({ ...session, user: { ...session?.user, isVerified: true } });
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof AxiosError) ErrorToast(error?.response?.data.error);
      else ErrorToast("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            Verify Email Address {session?.user.email}
          </CardTitle>
          <CardDescription>
            We have sent a verification code to your provided email, please
            enter the 6-digit code sent to your email.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form form={form} onSubmit={handleSubmit} className="space-y-6">
            <Input
              control={form.control}
              name="otp"
              label="Enter OTP"
              className="flex items-center justify-center flex-col gap-2"
              type="otp"
            />

            <SubmitButton pending={loading} className="w-full">
              Verify
            </SubmitButton>

            <p className="text-xs text-muted-foreground">
              Didn’t receive the code?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => resendEmail()}
              >
                Resend OTP
              </span>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
