import z from "zod";

const applyJobSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.email({ message: "Valid email required" }), 
  resume: z.string().min(1, "Resume is required"),
  coverLetter: z.string().optional(),
});

export type ApplyJobSchemaType = z.infer<typeof applyJobSchema>;
export default applyJobSchema;
