import { withAuth } from "next-auth/middleware";

/**
 * Authentication Middleware
 *
 * Protects routes defined in matcher configuration.
 * Redirects unauthenticated users to /login.
 *
 * Protected routes are configured below in the matcher array.
 */
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

/**
 * Middleware matcher configuration
 *
 * List all protected routes that require authentication.
 * To add a new protected route, add it to this array.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/management/:path*",
    "/tracking/:path*",
    "/data/:path*",
    "/alerts/:path*",
    "/stores/:path*",
  ],
};
