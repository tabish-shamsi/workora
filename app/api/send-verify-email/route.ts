import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User";
import { createTransporter } from "@/lib/nodemailer";
import verificationEmail from "@/emails/verification";
import { render } from "@react-email/components";
import { getSession } from "../auth/[...nextauth]/options";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const email = session.user?.email;
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    // const verificationExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    const verificationToken = jwt.sign(
      { verificationCode },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    await db();
    const user = await UserModel.findOneAndUpdate(
      { email },
      { verificationToken },
    );
    if (!user)
      return Response.json(
        {
          error: "User not found",
          success: false,
        },
        { status: 404 },
      );

    // console.log("VERIFICATION CODE: ", verificationCode);

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Workora" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your Workora account",
      html: await render(
        verificationEmail({
          username: user.name.split(" ")[0],
          code: verificationCode.toString(),
        }),
      ),
    });

    return Response.json(
      {
        success: true,
        message: "Verification code sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
