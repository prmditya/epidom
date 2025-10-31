/**
 * Mock data for analytics and dashboard statistics
 * TODO: Replace with real API calls to /api/analytics
 */

import {
  DashboardStats,
  ProductionHistoryData,
  WorkflowStats,
} from "@/types/entities";

// ============================================================================
// DASHBOARD STATISTICS
// ============================================================================

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  stockUtilization: 68.5,
  totalOpenOrders: 10,
  activeRecipes: 20,
  lowStockItems: 5,
  criticalAlerts: 3,
  productionBatchesInProgress: 2,
  revenueToday: 1245.80,
  revenueThisMonth: 45678.90,
};

// ============================================================================
// PRODUCTION HISTORY (for charts)
// ============================================================================

export const MOCK_PRODUCTION_HISTORY_WEEKLY: ProductionHistoryData[] = [
  { date: "Mon", quantity: 120, revenue: 2150.00 },
  { date: "Tue", quantity: 180, revenue: 3240.00 },
  { date: "Wed", quantity: 160, revenue: 2880.00 },
  { date: "Thu", quantity: 220, revenue: 3960.00 },
  { date: "Fri", quantity: 190, revenue: 3420.00 },
  { date: "Sat", quantity: 240, revenue: 4320.00 },
  { date: "Sun", quantity: 200, revenue: 3600.00 },
];

export const MOCK_PRODUCTION_HISTORY_MONTHLY: ProductionHistoryData[] = [
  { date: "Week 1", quantity: 850, revenue: 15300.00 },
  { date: "Week 2", quantity: 920, revenue: 16560.00 },
  { date: "Week 3", quantity: 780, revenue: 14040.00 },
  { date: "Week 4", quantity: 1050, revenue: 18900.00 },
];

export const MOCK_PRODUCTION_HISTORY_QUARTERLY: ProductionHistoryData[] = [
  { date: "Jan", quantity: 3200, revenue: 57600.00 },
  { date: "Feb", quantity: 3450, revenue: 62100.00 },
  { date: "Mar", quantity: 3750, revenue: 67500.00 },
  { date: "Apr", quantity: 3600, revenue: 64800.00 },
  { date: "May", quantity: 3900, revenue: 70200.00 },
  { date: "Jun", quantity: 4100, revenue: 73800.00 },
  { date: "Jul", quantity: 4250, revenue: 76500.00 },
  { date: "Aug", quantity: 3950, revenue: 71100.00 },
  { date: "Sep", quantity: 4200, revenue: 75600.00 },
];

// ============================================================================
// WORKFLOW STATISTICS
// ============================================================================

export const MOCK_WORKFLOW_STATS: WorkflowStats = {
  inStock: 55,
  processing: 28,
  delivered: 17,
};

// ============================================================================
// CATEGORY-WISE STOCK DISTRIBUTION
// ============================================================================

export interface CategoryStock {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

export const MOCK_CATEGORY_STOCK: CategoryStock[] = [
  { category: "Grains & Flour", value: 250, percentage: 32, color: "#f59e0b" },
  { category: "Dairy Products", value: 185, percentage: 24, color: "#3b82f6" },
  { category: "Raw Materials", value: 180, percentage: 23, color: "#10b981" },
  { category: "Spices", value: 40, percentage: 5, color: "#ef4444" },
  { category: "Other", value: 125, percentage: 16, color: "#8b5cf6" },
];

// ============================================================================
// TOP PRODUCTS BY REVENUE
// ============================================================================

export interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
  growth: number; // percentage
}

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
  {
    id: "PRO-001",
    name: "Baguette Tradition",
    revenue: 15240.00,
    quantity: 6096,
    growth: 12.5,
  },
  {
    id: "PRO-002",
    name: "Croissant",
    revenue: 12960.00,
    quantity: 7200,
    growth: 8.3,
  },
  {
    id: "PRO-003",
    name: "Pain au Chocolat",
    revenue: 11880.00,
    quantity: 5400,
    growth: 15.7,
  },
  {
    id: "PRO-004",
    name: "Brioche Loaf",
    revenue: 8775.00,
    quantity: 1350,
    growth: -2.1,
  },
];

// ============================================================================
// WASTE TRACKING
// ============================================================================

export interface WasteData {
  date: string;
  quantity: number;
  cost: number;
  reason: string;
}

export const MOCK_WASTE_DATA: WasteData[] = [
  {
    date: "2024-10-27",
    quantity: 0.5,
    cost: 9.00,
    reason: "Temperature damage - Dark chocolate",
  },
  {
    date: "2024-10-25",
    quantity: 2.5,
    cost: 3.00,
    reason: "Expired flour discarded",
  },
  {
    date: "2024-10-23",
    quantity: 12,
    cost: 3.00,
    reason: "Eggs - quality check failed",
  },
  {
    date: "2024-10-20",
    quantity: 1.2,
    cost: 10.20,
    reason: "Butter - packaging damaged",
  },
];

// ============================================================================
// SUPPLIER PERFORMANCE
// ============================================================================

export interface SupplierPerformance {
  supplierId: string;
  supplierName: string;
  onTimeDelivery: number; // percentage
  qualityScore: number; // out of 10
  totalOrders: number;
  totalSpent: number;
}

export const MOCK_SUPPLIER_PERFORMANCE: SupplierPerformance[] = [
  {
    supplierId: "SUP-001",
    supplierName: "Grain & Co",
    onTimeDelivery: 95,
    qualityScore: 9.2,
    totalOrders: 24,
    totalSpent: 15840.00,
  },
  {
    supplierId: "SUP-002",
    supplierName: "DairyFresh",
    onTimeDelivery: 98,
    qualityScore: 9.5,
    totalOrders: 32,
    totalSpent: 12560.00,
  },
  {
    supplierId: "SUP-003",
    supplierName: "Global Ingredients Ltd",
    onTimeDelivery: 89,
    qualityScore: 8.5,
    totalOrders: 18,
    totalSpent: 8920.00,
  },
  {
    supplierId: "SUP-004",
    supplierName: "Chocolate Masters",
    onTimeDelivery: 100,
    qualityScore: 9.8,
    totalOrders: 12,
    totalSpent: 6480.00,
  },
];

// ============================================================================
// COST ANALYSIS
// ============================================================================

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export const MOCK_COST_BREAKDOWN: CostBreakdown[] = [
  { category: "Raw Materials", amount: 28450.00, percentage: 45 },
  { category: "Labor", amount: 22760.00, percentage: 36 },
  { category: "Packaging", amount: 6340.00, percentage: 10 },
  { category: "Utilities", amount: 3804.00, percentage: 6 },
  { category: "Other", amount: 1902.00, percentage: 3 },
];

// ============================================================================
// PRODUCTION EFFICIENCY
// ============================================================================

export interface ProductionEfficiency {
  recipeId: string;
  recipeName: string;
  plannedQuantity: number;
  producedQuantity: number;
  efficiency: number; // percentage
  averageQualityScore: number;
}

export const MOCK_PRODUCTION_EFFICIENCY: ProductionEfficiency[] = [
  {
    recipeId: "REC-001",
    recipeName: "Baguette Tradition",
    plannedQuantity: 600,
    producedQuantity: 589,
    efficiency: 98.2,
    averageQualityScore: 9.1,
  },
  {
    recipeId: "REC-002",
    recipeName: "Croissant",
    plannedQuantity: 480,
    producedQuantity: 480,
    efficiency: 100,
    averageQualityScore: 9.4,
  },
  {
    recipeId: "REC-003",
    recipeName: "Brioche",
    plannedQuantity: 80,
    producedQuantity: 78,
    efficiency: 97.5,
    averageQualityScore: 9.0,
  },
  {
    recipeId: "REC-004",
    recipeName: "Pain au Chocolat",
    plannedQuantity: 360,
    producedQuantity: 354,
    efficiency: 98.3,
    averageQualityScore: 9.3,
  },
];

// ============================================================================
// DATE RANGE PRESETS
// ============================================================================

export interface DateRangePreset {
  label: string;
  value: string;
  days: number;
}

export const MOCK_DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: "Today", value: "today", days: 0 },
  { label: "Last 7 days", value: "7d", days: 7 },
  { label: "Last 30 days", value: "30d", days: 30 },
  { label: "Last 90 days", value: "90d", days: 90 },
  { label: "This year", value: "year", days: 365 },
  { label: "Custom", value: "custom", days: -1 },
];

