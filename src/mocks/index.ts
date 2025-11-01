/**
 * Central export for all mock data
 * Provides easy access to mock data across the application
 */

// Inventory exports
export {
  // Enhanced types
  // type Material,
  // type Recipe,
  // type Product,
  // type Supplier,
  // type StockMovement,
  // type ProductionBatch,
  // type RecipeIngredient,
  // type ProductVariant,
  // Enhanced mock data
  MOCK_MATERIALS,
  MOCK_RECIPES,
  MOCK_RECIPE_INGREDIENTS,
  MOCK_PRODUCTS,
  MOCK_PRODUCT_VARIANTS,
  MOCK_SUPPLIERS,
  MOCK_STOCK_MOVEMENTS,
  MOCK_PRODUCTION_BATCHES,
  // Simple types (backward compatibility)
  type Item,
  type StockRow,
  type ChartDataPoint,
  // Simple mock data (backward compatibility)
  MOCK_MATERIAL_ITEMS,
  MOCK_RECIPE_ITEMS,
  MOCK_PRODUCT_ITEMS,
  MOCK_SUPPLIER_ITEMS,
  MOCK_STOCK_ROWS,
  MOCK_CHART_DATA,
} from "./inventory.mock";

// Order exports
export {
  // Enhanced types
  type Order,
  // type OrderItem,
  // type OrderStatus,
  // type PaymentStatus,
  // type OrderStatusHistory,
  // Enhanced mock data
  MOCK_ORDERS,
  // Simple types (backward compatibility)
  type OrderSupplier,
  // Simple mock data (backward compatibility)
  MOCK_MANAGEMENT_ORDERS,
  ORDERS_SUPPLIERS,
} from "./orders.mock";

// Alert exports
export {
  // Enhanced types
  // type Alert,
  // type AlertType,
  // type AlertPriority,
  // type AlertStatus,
  // Enhanced mock data
  MOCK_ALERTS_FULL,
  // Simple types (backward compatibility)
  type AlertItem,
  type AlertItemDetailed,
  type AlertSupplier,
  // Simple mock data (backward compatibility)
  MOCK_ALERTS,
  ALERT_SUPPLIERS,
} from "./alerts.mock";

// User exports
export {
  // Types
  // type User,
  // type TeamMember,
  // type UserRole,
  type UserActivity,
  type Permission,
  // Mock data
  MOCK_USERS,
  MOCK_TEAM_MEMBERS,
  MOCK_USER_ACTIVITY,
  MOCK_PERMISSIONS,
} from "./users.mock";

// Store exports
export {
  // Types
  type Store,
  // Mock data
  MOCK_STORES,
} from "./stores.mock";

// Analytics exports
export {
  // Types
  // type DashboardStats,
  // type ProductionHistoryData,
  // type WorkflowStats,
  type CategoryStock,
  type TopProduct,
  type WasteData,
  type SupplierPerformance,
  type CostBreakdown,
  type ProductionEfficiency,
  type DateRangePreset,
  // Mock data
  MOCK_DASHBOARD_STATS,
  MOCK_PRODUCTION_HISTORY_WEEKLY,
  MOCK_PRODUCTION_HISTORY_MONTHLY,
  MOCK_PRODUCTION_HISTORY_QUARTERLY,
  MOCK_WORKFLOW_STATS,
  MOCK_CATEGORY_STOCK,
  MOCK_TOP_PRODUCTS,
  MOCK_WASTE_DATA,
  MOCK_SUPPLIER_PERFORMANCE,
  MOCK_COST_BREAKDOWN,
  MOCK_PRODUCTION_EFFICIENCY,
  MOCK_DATE_RANGE_PRESETS,
} from "./analytics.mock";

// Supplier Delivery exports
export {
  // Types
  type SupplierDelivery,
  type SupplierDeliveryItem,
  type SupplierDeliveryStatusHistory,
  // Mock data
  MOCK_SUPPLIER_DELIVERIES,
} from "./supplier-deliveries.mock";
