import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  accountType: "candidate" | "employer";
  company?: string;
  verificationToken: string | null;
  isVerified: boolean; 
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
    company: {
      type: String,
    },

    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
