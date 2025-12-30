import { z } from "zod";

const searchJobSchema = z.object({
  query: z.string().min(1, "Keyword is required").trim(),
  location: z.string().min(1, "Location is required").trim(),
  jobType: z.string().min(1, "Job type is required").trim(),
});

export type SearchJobSchema = z.infer<typeof searchJobSchema>;

export default searchJobSchema;
