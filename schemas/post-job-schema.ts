import z from "zod";

export const postJobSchema = z.object({
  title: z.string().min(3, {
    message: "Job title must be at least 3 characters long",
  }),

  description: z.string().min(20, {
    message: "Job description must be at least 20 characters long",
  }),

  location: z.string().min(2, {
    message: "Please enter a valid job location",
  }),

  company: z.string().min(2, {
    message: "Company name must be at least 2 characters long",
  }),

  type: z.string().min(1, {
    message: "Please select a job type",
  }),

  salary: z.string().min(1, {
    message: "Please specify a salary range",
  }),

  lastDate: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate > today;
    },
    {
      message: "Application deadline must be a future date",
    },
  ),
  status: z.enum(["open", "filled", "expired"]).default("open").optional(),
});

export type PostJobSchemaType = z.infer<typeof postJobSchema>;
export default postJobSchema;
