import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, password, accountType, company } = await req.json();

  if (
    !name ||
    !email ||
    !password ||
    !accountType ||
    (accountType === "employer" && !company)
  ) {
    return Response.json(
      { error: "Missing required fields", success: false },
      { status: 400 },
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db();

    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return Response.json(
        { error: "Entered email is already registered" },
        { status: 400 },
      );

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      accountType,
      company,
    });

    return Response.json(
      { message: "Account Created!", success: true },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
