import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/calendar(.*)",
  "/dashboard(.*)",
  "/kanban(.*)",
  "/store(.*)",
  "/team(.*)",
  "/setup(.*)",
  "/api/rooms(.*)",
  "/api/rooms/(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
