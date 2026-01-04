import db from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await db();
        const user = await UserModel.findOne({
          email: credentials.email,
        }).select("name email password _id isVerified accountType company");

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          accountType: user.accountType,
          company: user.company,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isVerified = user.isVerified;
        token.accountType = user.accountType;
        token.company = user.company;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isVerified = token.isVerified;
        session.user.accountType = token.accountType;
        session.user.company = token.company;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export default authOptions;
