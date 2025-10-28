/**
 * API Client Layer
 *
 * Provides type-safe methods for making API calls from the frontend.
 *
 * Benefits:
 * - Type safety for API calls
 * - Centralized API logic
 * - Easy to mock for testing
 * - Consistent error handling
 * - Automatic request/response transformation
 *
 * Usage:
 * ```ts
 * import { userApi } from '@/lib/api';
 *
 * const profile = await userApi.getProfile();
 * ```
 */

export * from "./client";
export * from "./auth.api";
export * from "./user.api";
export * from "./business.api";
