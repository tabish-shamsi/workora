// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Route categories
const PUBLIC_ROUTES = ["/", /^\/jobs\/[^/]+$/];
const AUTH_ROUTES = ["/login", "/register", "/verify-email"];
const CANDIDATE_ROUTES = [
  /^\/jobs\/[^/]+\/apply$/,
  /^\/dashboard\/applications\/[^/]+$/,
  "/api/resume",
  "/api/resume/upload",
  /^\/api\/jobs\/[^/]+\/apply$/,
];
const EMPLOYER_ROUTES = [
  "/employer/post-job",
  /^\/jobs\/[^/]+\/applications$/,
  /^\/dashboard\/applications\/[^/]+$/,
  /^\/jobs\/[^/]+\/edit$/,
  "/api/jobs/post",
];

const dashboardRoute = "/dashboard";

function matchRoute(path: string, routes: (string | RegExp)[]) {
  return routes.some((route) =>
    route instanceof RegExp ? route.test(path) : route === path,
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isPublic = matchRoute(pathname, PUBLIC_ROUTES);
  const isAuthRoute = matchRoute(pathname, AUTH_ROUTES);
  const isCandidateRoute = matchRoute(pathname, CANDIDATE_ROUTES);
  const isEmployerRoute = matchRoute(pathname, EMPLOYER_ROUTES);
  const isDashboardRoute = pathname.startsWith(dashboardRoute);

  // PUBLIC ROUTES
  if (isPublic) return NextResponse.next();

  // AUTH ROUTES
  if (isAuthRoute) {
    // /verify-email
    if (pathname === "/verify-email") {
      if (!token) return NextResponse.redirect(new URL("/login", req.url));
      if (token.isVerified) return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.next();
    }

    // /login or /register
    if (token) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // DASHBOARD ROUTES
  if (isDashboardRoute) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (!token.isVerified && pathname !== "/verify-email") {
      return NextResponse.redirect(new URL("/verify-email", req.url));
    }
    return NextResponse.next();
  }

  // CANDIDATE ROUTES
  if (isCandidateRoute) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (!token.isVerified && pathname !== "/verify-email") {
      return NextResponse.redirect(new URL("/verify-email", req.url));
    }
    if (token.accountType !== "candidate")
      return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // EMPLOYER ROUTES
  if (isEmployerRoute) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (!token.isVerified && pathname !== "/verify-email") {
      return NextResponse.redirect(new URL("/verify-email", req.url));
    }
    if (token.accountType !== "employer")
      return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // Other API routes are public
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
