import { clerkMiddleware, authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/api/webhooks(.*)", "/",
    "/api/uploadthing"
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};