/**
 * Central export point for all Data Transfer Objects (DTOs)
 *
 * DTOs represent data structures that move between layers:
 * - Database → Service Layer
 * - Service Layer → API Routes
 * - API Routes → Client
 */

export * from "./user.dto";
export * from "./inventory.dto";
export * from "./order.dto";
