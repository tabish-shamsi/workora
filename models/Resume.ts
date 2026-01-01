import mongoose from "mongoose";

export type Resume = {
  candidate: mongoose.Types.ObjectId;
  url: string;
  fileName: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
};

const resumeSchema = new mongoose.Schema<Resume>({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cadidate",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true
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
