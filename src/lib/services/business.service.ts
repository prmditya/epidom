import { Business } from "@prisma/client";
import { businessRepository, BusinessRepository } from "@/lib/repositories/business.repository";
import { storeRepository, StoreRepository } from "@/lib/repositories/store.repository";
import { CreateBusinessInput, UpdateBusinessInput, CreateStoreInput } from "@/lib/validation/business.schemas";
import { BusinessDto, BusinessWithStoresDto, StoreDto } from "@/types/dto";

/**
 * Business Service
 *
 * Handles business and store management business logic:
 * - Business CRUD operations
 * - Store management
 * - Multi-store operations
 *
 * Implements business rules and validation
 */
export class BusinessService {
  constructor(
    private readonly businessRepo: BusinessRepository = businessRepository,
    private readonly storeRepo: StoreRepository = storeRepository
  ) {}

  /**
   * Create a new business for a user
   *
   * @throws Error if user already has a business
   */
  async createBusiness(
    userId: string,
    input: CreateBusinessInput
  ): Promise<Business> {
    // Check if user already has a business
    const existingBusiness = await this.businessRepo.findByUserId(userId);
    if (existingBusiness) {
      throw new Error("User already has a business");
    }

    // Create business
    return this.businessRepo.create({
      userId,
      ...input,
    });
  }

  /**
   * Get business by ID
   */
  async getBusinessById(businessId: string): Promise<Business> {
    const business = await this.businessRepo.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }
    return business;
  }

  /**
   * Get business by user ID
   */
  async getBusinessByUserId(userId: string): Promise<Business | null> {
    return this.businessRepo.findByUserId(userId);
  }

  /**
   * Get business with all stores
   */
  async getBusinessWithStores(businessId: string): Promise<BusinessWithStoresDto> {
    const business = await this.businessRepo.getWithStores(businessId);
    if (!business) {
      throw new Error("Business not found");
    }
    return business;
  }

  /**
   * Update business
   */
  async updateBusiness(
    businessId: string,
    userId: string,
    input: UpdateBusinessInput
  ): Promise<Business> {
    // Verify business exists and belongs to user
    const business = await this.businessRepo.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }
    if (business.userId !== userId) {
      throw new Error("Unauthorized to update this business");
    }

    // Update business
    return this.businessRepo.update(businessId, input);
  }

  /**
   * Upsert business (create or update)
   */
  async upsertBusiness(
    userId: string,
    input: CreateBusinessInput | UpdateBusinessInput
  ): Promise<Business> {
    return this.businessRepo.upsert(userId, input as any);
  }

  /**
   * Delete business (and all associated stores)
   */
  async deleteBusiness(businessId: string, userId: string): Promise<void> {
    // Verify business belongs to user
    const business = await this.businessRepo.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }
    if (business.userId !== userId) {
      throw new Error("Unauthorized to delete this business");
    }

    await this.businessRepo.delete(businessId);
  }

  /**
   * Create a store for a business
   */
  async createStore(
    businessId: string,
    userId: string,
    input: CreateStoreInput
  ): Promise<StoreDto> {
    // Verify business exists and belongs to user
    const business = await this.businessRepo.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }
    if (business.userId !== userId) {
      throw new Error("Unauthorized to create store for this business");
    }

    // Create store
    return this.storeRepo.create({
      businessId,
      ...input,
    }) as unknown as StoreDto;
  }

  /**
   * Get all stores for a business
   */
  async getStoresByBusinessId(businessId: string): Promise<StoreDto[]> {
    return this.storeRepo.findByBusinessId(businessId) as unknown as StoreDto[];
  }

  /**
   * Get store by ID
   */
  async getStoreById(storeId: string): Promise<StoreDto> {
    const store = await this.storeRepo.findById(storeId);
    if (!store) {
      throw new Error("Store not found");
    }
    return store as unknown as StoreDto;
  }

  /**
   * Update store
   */
  async updateStore(
    storeId: string,
    businessId: string,
    userId: string,
    input: UpdateBusinessInput
  ): Promise<StoreDto> {
    // Verify store belongs to business
    const belongsToBusiness = await this.storeRepo.belongsToBusiness(
      storeId,
      businessId
    );
    if (!belongsToBusiness) {
      throw new Error("Store does not belong to this business");
    }

    // Verify business belongs to user
    const business = await this.businessRepo.findById(businessId);
    if (!business || business.userId !== userId) {
      throw new Error("Unauthorized to update this store");
    }

    // Update store
    return this.storeRepo.update(storeId, input) as unknown as StoreDto;
  }

  /**
   * Deactivate store (soft delete)
   */
  async deactivateStore(
    storeId: string,
    businessId: string,
    userId: string
  ): Promise<void> {
    // Verify ownership
    const belongsToBusiness = await this.storeRepo.belongsToBusiness(
      storeId,
      businessId
    );
    if (!belongsToBusiness) {
      throw new Error("Store does not belong to this business");
    }

    const business = await this.businessRepo.findById(businessId);
    if (!business || business.userId !== userId) {
      throw new Error("Unauthorized to deactivate this store");
    }

    await this.storeRepo.softDelete(storeId);
  }

  /**
   * Activate store
   */
  async activateStore(
    storeId: string,
    businessId: string,
    userId: string
  ): Promise<void> {
    // Verify ownership
    const belongsToBusiness = await this.storeRepo.belongsToBusiness(
      storeId,
      businessId
    );
    if (!belongsToBusiness) {
      throw new Error("Store does not belong to this business");
    }

    const business = await this.businessRepo.findById(businessId);
    if (!business || business.userId !== userId) {
      throw new Error("Unauthorized to activate this store");
    }

    await this.storeRepo.activate(storeId);
  }

  /**
   * Get business statistics
   */
  async getBusinessStats(businessId: string): Promise<{
    totalStores: number;
    activeStores: number;
  }> {
    const stores = await this.storeRepo.findByBusinessId(businessId);
    return {
      totalStores: stores.length,
      activeStores: stores.filter((s) => s.isActive).length,
    };
  }
}

// Export singleton instance
export const businessService = new BusinessService();
