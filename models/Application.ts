import mongoose from "mongoose";

export type Application = {
  _id: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  name: string;
  email: string;
  resume: mongoose.Types.ObjectId;
  status: string;
  createdAt: Date;
};

const applicationSchema = new mongoose.Schema<Application>({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model<Application>("Application", applicationSchema);
export default ApplicationModel;
