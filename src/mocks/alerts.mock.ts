/**
 * Enhanced mock data for alerts and stock warnings
 * TODO: Replace with real API calls to /api/alerts
 */

import {
  Alert,
  AlertType,
  AlertPriority,
  AlertStatus,
} from "@/types/entities";

// ============================================================================
// SIMPLE TYPES (for backward compatibility)
// ============================================================================

export interface AlertItem {
  product: string;
  pct: number;
  qty: string;
  date: string;
}

export interface AlertItemDetailed {
  product: string;
  stockPercentage: number;
  current: string;
  recommended: string;
}

export interface AlertSupplier {
  name: string;
  contactHref: string;
  contactLabel: string;
  status: string;
  date: string;
  items: AlertItemDetailed[];
}

// ============================================================================
// ALERTS
// ============================================================================

export const MOCK_ALERTS_FULL: Alert[] = [
  {
    id: "ALT-001",
    type: AlertType.LOW_STOCK,
    priority: AlertPriority.HIGH,
    status: AlertStatus.ACTIVE,
    title: "Low Stock: Dark Chocolate 70%",
    message: "Stock level at 37.5% of minimum threshold. Reorder immediately.",
    materialId: "MAT-007",
    metadata: {
      currentStock: 15,
      minStock: 40,
      unit: "kg",
      stockPercentage: 37.5,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-27T09:00:00"),
    updatedAt: new Date("2024-10-27T09:00:00"),
  },
  {
    id: "ALT-002",
    type: AlertType.LOW_STOCK,
    priority: AlertPriority.CRITICAL,
    status: AlertStatus.ACTIVE,
    title: "Critical Stock: Butter AOP",
    message: "Stock level at 45% of minimum threshold. Urgent reorder required.",
    materialId: "MAT-002",
    supplierId: "SUP-002",
    metadata: {
      currentStock: 45,
      minStock: 100,
      unit: "kg",
      stockPercentage: 45,
      recommendedOrderQty: 75,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-26T14:30:00"),
    updatedAt: new Date("2024-10-26T14:30:00"),
  },
  {
    id: "ALT-003",
    type: AlertType.LOW_STOCK,
    priority: AlertPriority.MEDIUM,
    status: AlertStatus.ACTIVE,
    title: "Low Stock: Almonds",
    message: "Stock approaching minimum level. Consider reordering soon.",
    materialId: "MAT-004",
    supplierId: "SUP-003",
    metadata: {
      currentStock: 25,
      minStock: 50,
      unit: "kg",
      stockPercentage: 50,
      recommendedOrderQty: 30,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-25T11:00:00"),
    updatedAt: new Date("2024-10-25T11:00:00"),
  },
  {
    id: "ALT-004",
    type: AlertType.EXPIRY_WARNING,
    priority: AlertPriority.MEDIUM,
    status: AlertStatus.ACTIVE,
    title: "Expiry Warning: Eggs",
    message: "120 units of eggs will expire in 3 days",
    materialId: "MAT-006",
    metadata: {
      quantity: 120,
      unit: "units",
      expiryDate: new Date("2024-10-31"),
      daysUntilExpiry: 3,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-28T08:00:00"),
    updatedAt: new Date("2024-10-28T08:00:00"),
  },
  {
    id: "ALT-005",
    type: AlertType.SUPPLIER_DELAY,
    priority: AlertPriority.HIGH,
    status: AlertStatus.ACTIVE,
    title: "Supplier Delay: Global Ingredients Ltd",
    message: "Expected delivery delayed by 2 days. PO-2024-1005 rescheduled.",
    supplierId: "SUP-003",
    metadata: {
      purchaseOrderId: "PO-2024-1005",
      originalDeliveryDate: new Date("2024-10-28"),
      newDeliveryDate: new Date("2024-10-30"),
      delayDays: 2,
      affectedMaterials: ["Almonds", "Salt"],
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-27T16:00:00"),
    updatedAt: new Date("2024-10-27T16:00:00"),
  },
  {
    id: "ALT-006",
    type: AlertType.QUALITY_ISSUE,
    priority: AlertPriority.CRITICAL,
    status: AlertStatus.RESOLVED,
    title: "Quality Issue: Dark Chocolate",
    message: "0.5kg of dark chocolate found melted due to improper storage temperature",
    materialId: "MAT-007",
    resolvedAt: new Date("2024-10-27T16:00:00"),
    resolvedBy: "USER-003",
    resolutionNotes: "Discarded damaged stock, adjusted cold room temperature, training scheduled for team",
    metadata: {
      quantity: 0.5,
      unit: "kg",
      issueType: "temperature_damage",
      estimatedLoss: 9.00,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-27T14:20:00"),
    updatedAt: new Date("2024-10-27T16:00:00"),
  },
  {
    id: "ALT-007",
    type: AlertType.OVERSTOCK,
    priority: AlertPriority.LOW,
    status: AlertStatus.ACTIVE,
    title: "Overstock: Flour T55",
    message: "Stock level at 50% over maximum threshold. Consider reducing next order.",
    materialId: "MAT-001",
    metadata: {
      currentStock: 250,
      maxStock: 500,
      unit: "kg",
      stockPercentage: 50,
      excessQty: 0,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-26T10:00:00"),
    updatedAt: new Date("2024-10-26T10:00:00"),
  },
  {
    id: "ALT-008",
    type: AlertType.LOW_STOCK,
    priority: AlertPriority.MEDIUM,
    status: AlertStatus.SNOOZED,
    title: "Low Stock: Salt",
    message: "Stock at 80% of minimum level",
    materialId: "MAT-008",
    snoozedUntil: new Date("2024-10-30T08:00:00"),
    metadata: {
      currentStock: 40,
      minStock: 50,
      unit: "kg",
      stockPercentage: 80,
    },
    storeId: "STORE-001",
    createdAt: new Date("2024-10-25T09:00:00"),
    updatedAt: new Date("2024-10-27T15:00:00"),
  },
];

// ============================================================================
// SIMPLE ALERTS (for backward compatibility)
// ============================================================================

export const MOCK_ALERTS: AlertItem[] = [
  { product: "Butter", pct: 0.8, qty: "10.22 Kg", date: "10.08.24" },
  { product: "Dark chocolate", pct: 0.6, qty: "9.15 Kg", date: "08.08.24" },
  { product: "White chocolate", pct: 0.55, qty: "7.85 Kg", date: "25.07.24" },
];

// ============================================================================
// ALERT SUPPLIERS (for alerts page supplier view)
// ============================================================================

export const ALERT_SUPPLIERS: AlertSupplier[] = [
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Low Stock",
    date: "10.08.24",
    items: [
      {
        product: "Butter",
        stockPercentage: 0.8,
        current: "10.22 Kg",
        recommended: "20.05 Kg",
      },
      {
        product: "Dark chocolate",
        stockPercentage: 0.6,
        current: "9.15 Kg",
        recommended: "15.30 Kg",
      },
    ],
  },
  {
    name: "Lactalis",
    contactHref: "#0456789123",
    contactLabel: "0456789123",
    status: "Critical",
    date: "08.08.24",
    items: [
      {
        product: "White chocolate",
        stockPercentage: 0.55,
        current: "7.85 Kg",
        recommended: "17.45 Kg",
      },
      {
        product: "Milk",
        stockPercentage: 0.9,
        current: "3.20 L",
        recommended: "32.00 L",
      },
    ],
  },
  {
    name: "Barry Callebaut",
    contactHref: "#0423456789",
    contactLabel: "0423456789",
    status: "Low Stock",
    date: "25.07.24",
    items: [
      {
        product: "Cocoa powder",
        stockPercentage: 0.75,
        current: "5.50 Kg",
        recommended: "22.00 Kg",
      },
    ],
  },
];
