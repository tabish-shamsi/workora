import mongoose from "mongoose";

export type Job = {
  _id: string;
  employer: mongoose.Types.ObjectId;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  status: "open" | "filled" | "expired";
  lastDate: Date;
  createdAt: Date;
  salary: string;
  applications?: mongoose.Types.ObjectId[];
};

const jobSchema = new mongoose.Schema<Job>(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    status: {
      type: String,
      enum: ["open", "filled", "expired"],
      default: "open",
    },
    lastDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true },
);

jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default JobModel;
