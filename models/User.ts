import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  accountType: "candidate" | "employer";
  verificationToken: string | null;
  isVerified: boolean;
  jobs?: mongoose.Types.ObjectId[];
  applications?: mongoose.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },

    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
