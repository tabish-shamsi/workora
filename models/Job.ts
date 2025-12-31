import mongoose from "mongoose";

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  status: "open" | "filled" | "expired";
  lastDate: Date;
  createdAt: Date;
  salary: string;
  applications?: mongoose.Types.ObjectId[]; // | Application[]
};

const jobSchema = new mongoose.Schema<Job>(
  {
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
    jobType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default JobModel;
