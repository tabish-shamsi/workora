"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerSchema, registerSchemaType } from "@/schemas/auth-schema";
import Form from "@/components/Form";
import { Input } from "@/components/Input";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      accountType: "",
    },
  });

  const handleSubmit = async (data: registerSchemaType) => {
    console.log("Register data:", data);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Register your account to start using the platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form form={form} onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <Input
              placeholder="John Doe"
              control={form.control}
              name="name"
              label="Full Name"
            />

            {/* Company */}
            <Input
              placeholder="TechNova"
              control={form.control}
              name="company"
              label="Company Name"
            />

            {/* Email */}
            <Input
              placeholder="you@company.com"
              control={form.control}
              name="email"
              label="Email"
            />

            {/* Password */}
            <Input
              placeholder="••••••••"
              control={form.control}
              name="password"
              label="Password"
            />

            <Input
              placeholder="Select Account Type"
              control={form.control}
              name="accountType"
              label="Account Type"
              type="select"
              options={["cadidate", "employer"]}
              className="select:w-full"
            />

            <SubmitButton pending={loading} className="w-full">
              Create Account
            </SubmitButton>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
