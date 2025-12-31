import mongoose from "mongoose";

export type Resume = {
  cadidate: mongoose.Types.ObjectId;
  resume: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
};

const resumeSchema = new mongoose.Schema<Resume>({
  cadidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cadidate",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
