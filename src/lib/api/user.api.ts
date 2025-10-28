import { apiClient } from "./client";
import { UpdateProfileInput, ChangePasswordInput } from "@/lib/validation";
import { UserProfileDto, UserDto } from "@/types/dto";

/**
 * User API Client
 *
 * Type-safe methods for user operations
 */
export class UserApi {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfileDto> {
    return apiClient.get("/user/profile");
  }

  /**
   * Update user profile
   */
  async updateProfile(input: UpdateProfileInput): Promise<UserDto> {
    return apiClient.patch("/user/profile", input);
  }

  /**
   * Change password
   */
  async changePassword(input: ChangePasswordInput): Promise<{ message: string }> {
    return apiClient.post("/user/password", input);
  }

  /**
   * Delete account
   */
  async deleteAccount(): Promise<{ message: string }> {
    return apiClient.delete("/user/account");
  }

  /**
   * Get user statistics
   */
  async getStats(): Promise<{
    hasBusiness: boolean;
    storeCount: number;
    accountAge: number;
  }> {
    return apiClient.get("/user/stats");
  }
}

// Export singleton instance
export const userApi = new UserApi();
