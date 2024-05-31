import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/calendar(.*)",
  "/dashboard(.*)",
  "/kanban(.*)",
  "/store(.*)",
  "/team(.*)",
  "/setup(.*)",
  "/api/rooms(.*)",
  "/api/rooms/(.*)",
  "/api/teams(.*)",
  "/api/teams/(.*)",
  "/api/team(.*)",
  "/api/team/(.*)",
  "/api/auth/create-github-profile"
]);

export default clerkMiddleware((auth, req) => {
  const currentEnv = process.env.NODE_ENV as string;
  if (currentEnv === 'production' &&
    req.headers.get("x-forwarded-proto") !== "https") {
    return NextResponse.redirect(
      `https://${req.headers.get('host')}${req.nextUrl.pathname}`,
      301
    );
  }

  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
