import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tracking/:path*",
    "/data/:path*",
    "/management/:path*",
    "/alerts/:path*",
    "/profile/:path*",
  ],
};
