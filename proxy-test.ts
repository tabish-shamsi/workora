import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // if (pathname.startsWith("/api")) {
  //   return NextResponse.next();
  // }

  // const token = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // const isAuth = !!token;
  // const isVerified = token?.emailVerified;
  // const authRoutes = ["/login", "/register"];
  // const verifyEmailRoute = "/verify-email";

  // if (authRoutes.includes(pathname) && isAuth) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // if (!isVerified && pathname !== verifyEmailRoute) {
  //   return NextResponse.redirect(new URL(verifyEmailRoute, req.url));
  // }

  // if (verifyEmailRoute === pathname && isVerified) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // const employerRoutes = [
  //   /^\/employer\/post-job$/,
  //   /^\/dashboard$/,
  //   /^\/jobs\/[^/]+\/applications$/,
  // ];

  // const isEmployerRoute = employerRoutes.some((regex) => regex.test(pathname));
  // const isEmployer = token.accountType === "employer";

  // if (isEmployerRoute && !isEmployer) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // const candidateRoutes = [
  //   /^\/dashboard$/, // candidate dashboard
  //   /^\/jobs\/[^/]+\/apply$/, // apply page
  // ];

  // const isCandidateRoute = candidateRoutes.some((regex) =>
  //   regex.test(pathname),
  // );
  // const isCandidate = token.accountType === "candidate";

  // if (isCandidateRoute && !isCandidate) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
