import z from "zod";

const applyJobSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.email({ message: "Valid email required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  resume: z.any().refine((file) => file?.length > 0, "Resume is required"),
  coverLetter: z.string().optional(),
});

export type ApplyJobSchemaType = z.infer<typeof applyJobSchema>;
export default applyJobSchema;
