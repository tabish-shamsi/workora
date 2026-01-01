import { z } from "zod";

const searchJobSchema = z.object({
  query: z.string().trim().optional(),
  location: z.string().trim().optional(),
  jobType: z.string().trim().optional(),
});

export type SearchJobTypes = z.infer<typeof searchJobSchema>;

export default searchJobSchema;
