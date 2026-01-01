import db from "@/lib/db";
import UserModel from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return Response.json(
      { error: "Missing required fields", success: false },
      { status: 400 },
    );
  }

  try {
    await db();
    const user = await UserModel.findOne({ email }).select("verificationToken");

    if (!user?.verificationToken) {
      return Response.json(
        { error: "User not found or no verification token", success: false },
        { status: 404 },
      );
    }

    const verify = jwt.verify(
      user.verificationToken,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload & { verificationCode: string };

    if (verify.verificationCode.toString() !== code) {
      return Response.json(
        { error: "Invalid code", success: false },
        { status: 400 },
      );
    }

    user.verificationToken = null;
    user.isVerified = true;

    await user.save();

    return Response.json({ success: true, message: "Email has been verified!" }, { status: 200 });
  } catch (error) {
    console.error(error);

    // Handle JWT specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.name === "TokenExpiredError") {
        return Response.json(
          { error: "Verification code has expired", success: false },
          { status: 401 },
        );
      } else if (error.name === "JsonWebTokenError") {
        return Response.json(
          { error: "Invalid verification token", success: false },
          { status: 401 },
        );
      }
    }

    return Response.json(
      { error: "Something went wrong", success: false },
      { status: 500 },
    );
  }
}
