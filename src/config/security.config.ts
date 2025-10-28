/**
 * Security Configuration
 *
 * Centralized security settings for the application.
 */

/**
 * Rate limiting configuration
 */
export const rateLimits = {
  // Authentication endpoints
  auth: {
    login: {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    signup: {
      maxAttempts: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    passwordReset: {
      maxAttempts: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
  },

  // API endpoints
  api: {
    default: {
      maxAttempts: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
  },

  // Waitlist form
  waitlist: {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
} as const;

/**
 * Password requirements
 */
export const passwordRequirements = {
  minLength: 8,
  maxLength: 100,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false, // Set to true if needed
} as const;

/**
 * Session configuration
 */
export const sessionConfig = {
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  updateAge: 24 * 60 * 60, // Update session every 24 hours
} as const;

/**
 * CORS configuration
 */
export const corsConfig = {
  allowedOrigins:
    process.env.NODE_ENV === "production"
      ? [process.env.NEXT_PUBLIC_APP_URL].filter(Boolean)
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
  allowedMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
} as const;

/**
 * Protected routes (require authentication)
 */
export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/management",
  "/tracking",
  "/data",
  "/alerts",
  "/stores",
] as const;

/**
 * Public routes (accessible without authentication)
 */
export const publicRoutes = [
  "/",
  "/services",
  "/pricing",
  "/contact",
  "/login",
  "/register",
] as const;

/**
 * Check if a route is protected
 */
export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Check if a route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
