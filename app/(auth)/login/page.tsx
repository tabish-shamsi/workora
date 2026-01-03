"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitButton from "@/components/submit-button";
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schemas/auth-schema";
import { ErrorToast, SuccessToast } from "@/components/ui/sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: loginSchemaType) => {
    setLoading(true);

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          ErrorToast(callback.error);
          setLoading(false);
        }

        if (callback?.ok) {
          SuccessToast("Logged in successfully");
          setLoading(false);
          router.push("/dashboard");
          // router.refresh()
        }
      })
      .catch((error) => {
        ErrorToast(error);
        setLoading(false);
      });
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Sign in to manage your jobs</CardDescription>
        </CardHeader>

        <CardContent>
          <Form form={form} onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <Input
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@company.com"
            />

            {/* Password */}
            <Input
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
            />

            {/* Submit */}
            <SubmitButton pending={loading} className="w-full">
              Sign in
            </SubmitButton>

            {/* Footer links */}
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
