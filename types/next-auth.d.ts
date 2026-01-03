import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name?: string;
    email?: string;
    id?: string;
    isVerified?: boolean;
    accountType: "candidate" | "employer";
    company: string;
  }

  interface Session {
    user: {
      name?: string;
      email?: string;
      id?: string;
      isVerified?: boolean;
      accountType: "candidate" | "employer";
      company: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string;
      email?: string;
      id?: string;
      isVerified?: boolean;
      accountType: "candidate" | "employer";
      company: string;
    };
  }
}
