import z from "zod";

// Login form validation
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

// Register form validation
export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  company: z.string().min(2, {
    message: "Company name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  accountType: z.startsWith("Select Account Type", {
    message: "Please select an account type",
  })
});

export type registerSchemaType = z.infer<typeof registerSchema>;

// Verify email form validation
export const verifyEmailSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 characters",
  }),
});

export type verifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
