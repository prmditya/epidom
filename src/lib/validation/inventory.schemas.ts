import { z } from "zod";
import { cuidSchema, priceSchema, decimalSchema, urlSchema } from "./common.schemas";

/**
 * Inventory management validation schemas (Products & Ingredients)
 */

// Product schemas
const baseProductSchema = z.object({
  storeId: cuidSchema,
  sku: z.string().min(1, "SKU is required").max(50, "SKU is too long"),
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  description: z.string().max(1000, "Description is too long").optional(),
  category: z.string().max(100, "Category name is too long").optional(),
  image: urlSchema,
  costPrice: priceSchema,
  sellingPrice: priceSchema,
  currentStock: decimalSchema.default(0),
  unit: z.string().min(1, "Unit is required").max(20, "Unit is too long").default("piece"),
  minStockLevel: decimalSchema.default(0),
  criticalLevel: decimalSchema.optional(),
  productionTime: z.number().int().nonnegative("Production time must be non-negative").optional(),
  shelfLife: z.number().int().positive("Shelf life must be positive").optional(),
  isActive: z.boolean().default(true),
});

export const createProductSchema = baseProductSchema.refine(
  (data) => data.sellingPrice >= data.costPrice,
  {
    message: "Selling price must be greater than or equal to cost price",
    path: ["sellingPrice"],
  }
);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = baseProductSchema.partial().omit({ storeId: true });

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// Ingredient schemas
export const createIngredientSchema = z.object({
  storeId: cuidSchema,
  sku: z.string().min(1, "SKU is required").max(50, "SKU is too long"),
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  description: z.string().max(1000, "Description is too long").optional(),
  category: z.string().max(100, "Category name is too long").optional(),
  image: urlSchema,
  unit: z.string().min(1, "Unit is required").max(20, "Unit is too long").default("kg"),
  unitCost: priceSchema,
  currentStock: decimalSchema.default(0),
  minStockLevel: decimalSchema.default(0),
  criticalLevel: decimalSchema.optional(),
  supplierId: cuidSchema.optional(),
  isActive: z.boolean().default(true),
});

export type CreateIngredientInput = z.infer<typeof createIngredientSchema>;

export const updateIngredientSchema = createIngredientSchema.partial().omit({ storeId: true });

export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>;

// Recipe schemas
export const createRecipeSchema = z.object({
  storeId: cuidSchema,
  productId: cuidSchema,
  batchSize: decimalSchema.positive("Batch size must be positive"),
  batchUnit: z.string().min(1, "Batch unit is required").max(20, "Batch unit is too long").default("piece"),
  instructions: z.string().max(5000, "Instructions are too long").optional(),
  ingredients: z.array(
    z.object({
      ingredientId: cuidSchema,
      quantity: decimalSchema.positive("Quantity must be positive"),
      unit: z.string().min(1, "Unit is required").max(20, "Unit is too long"),
    })
  ).min(1, "Recipe must have at least one ingredient"),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;

export const updateRecipeSchema = createRecipeSchema.partial().omit({ storeId: true, productId: true });

export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;

// Stock movement schemas
export const movementTypeSchema = z.enum([
  "PURCHASE",
  "PRODUCTION_IN",
  "PRODUCTION_OUT",
  "SALE",
  "ADJUSTMENT",
  "WASTE",
]);

export const createStockMovementSchema = z.object({
  productId: cuidSchema.optional(),
  ingredientId: cuidSchema.optional(),
  type: movementTypeSchema,
  quantity: decimalSchema.positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required").max(20, "Unit is too long"),
  orderId: cuidSchema.optional(),
  productionBatchId: cuidSchema.optional(),
  notes: z.string().max(500, "Notes are too long").optional(),
}).refine((data) => data.productId || data.ingredientId, {
  message: "Either productId or ingredientId must be provided",
  path: ["productId"],
});

export type CreateStockMovementInput = z.infer<typeof createStockMovementSchema>;

// Supplier schemas
export const createSupplierSchema = z.object({
  storeId: cuidSchema,
  name: z.string().min(1, "Name is required").max(200, "Name is too long"),
  contactPerson: z.string().max(100, "Contact person name is too long").optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional().or(z.literal("")),
  address: z.string().max(200, "Address is too long").optional(),
  city: z.string().max(100, "City name is too long").optional(),
  country: z.string().max(100, "Country name is too long").optional(),
  notes: z.string().max(1000, "Notes are too long").optional(),
  isActive: z.boolean().default(true),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;

export const updateSupplierSchema = createSupplierSchema.partial().omit({ storeId: true });

export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;