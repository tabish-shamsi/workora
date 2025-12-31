import mongoose from "mongoose";

export type Application = {
  _id: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
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
