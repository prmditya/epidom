/**
 * Mock data for supplier deliveries
 * TODO: Replace with real API calls to /api/supplier-deliveries
 */

import {
  SupplierDelivery,
  SupplierDeliveryItem,
  SupplierDeliveryStatusHistory,
  DeliveryType,
  SupplierDeliveryStatus,
} from "@/types/entities";
import { MOCK_SUPPLIERS, MOCK_MATERIALS } from "./inventory.mock";

// ============================================================================
// SUPPLIER DELIVERY ITEMS
// ============================================================================

const DELIVERY_ITEMS: SupplierDeliveryItem[] = [
  // Delivery DEL-001 items
  {
    id: "DI-001",
    deliveryId: "DEL-001",
    materialId: "MAT-001", // Flour T55
    quantity: 100,
    unit: "kg",
    notes: "Premium grade flour",
  },
  {
    id: "DI-002",
    deliveryId: "DEL-001",
    materialId: "MAT-003", // Sugar
    quantity: 50,
    unit: "kg",
  },
  {
    id: "DI-003",
    deliveryId: "DEL-001",
    materialId: "MAT-005", // Yeast
    quantity: 2000,
    unit: "g",
    notes: "Check expiry date upon delivery",
  },
  // Delivery DEL-002 items
  {
    id: "DI-004",
    deliveryId: "DEL-002",
    materialId: "MAT-002", // Butter AOP
    quantity: 30,
    unit: "kg",
    notes: "Store in cold storage immediately",
  },
  {
    id: "DI-005",
    deliveryId: "DEL-002",
    materialId: "MAT-006", // Eggs
    quantity: 180,
    unit: "units",
  },
  // Delivery DEL-003 items
  {
    id: "DI-006",
    deliveryId: "DEL-003",
    materialId: "MAT-007", // Dark Chocolate 70%
    quantity: 20,
    unit: "kg",
  },
  // Delivery DEL-004 items
  {
    id: "DI-007",
    deliveryId: "DEL-004",
    materialId: "MAT-001", // Flour T55
    quantity: 150,
    unit: "kg",
  },
  {
    id: "DI-008",
    deliveryId: "DEL-004",
    materialId: "MAT-003", // Sugar
    quantity: 75,
    unit: "kg",
  },
  {
    id: "DI-009",
    deliveryId: "DEL-004",
    materialId: "MAT-005", // Yeast
    quantity: 3000,
    unit: "g",
  },
  {
    id: "DI-010",
    deliveryId: "DEL-004",
    materialId: "MAT-008", // Salt
    quantity: 10,
    unit: "kg",
  },
  // Delivery DEL-005 items
  {
    id: "DI-011",
    deliveryId: "DEL-005",
    materialId: "MAT-004", // Almonds
    quantity: 15,
    unit: "kg",
  },
  {
    id: "DI-012",
    deliveryId: "DEL-005",
    materialId: "MAT-008", // Salt
    quantity: 5,
    unit: "kg",
  },
  // Delivery DEL-006 items
  {
    id: "DI-013",
    deliveryId: "DEL-006",
    materialId: "MAT-002", // Butter AOP
    quantity: 40,
    unit: "kg",
  },
  {
    id: "DI-014",
    deliveryId: "DEL-006",
    materialId: "MAT-006", // Eggs
    quantity: 240,
    unit: "units",
  },
];

// ============================================================================
// SUPPLIER DELIVERY STATUS HISTORY
// ============================================================================

const DELIVERY_STATUS_HISTORY: SupplierDeliveryStatusHistory[] = [
  // DEL-001 history
  {
    id: "DSH-001",
    deliveryId: "DEL-001",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Delivery scheduled",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-10-28T10:00:00"),
  },
  {
    id: "DSH-002",
    deliveryId: "DEL-001",
    status: SupplierDeliveryStatus.IN_TRANSIT,
    notes: "Shipment departed from supplier warehouse",
    userId: "USER-002",
    userName: "Jean Dupont",
    createdAt: new Date("2025-10-30T08:00:00"),
  },
  {
    id: "DSH-003",
    deliveryId: "DEL-001",
    status: SupplierDeliveryStatus.RECEIVED,
    notes: "All items received in good condition",
    userId: "USER-003",
    userName: "Marie Laurent",
    createdAt: new Date("2025-10-31T09:30:00"),
  },
  // DEL-002 history
  {
    id: "DSH-004",
    deliveryId: "DEL-002",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Delivery scheduled",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-10-29T14:00:00"),
  },
  {
    id: "DSH-005",
    deliveryId: "DEL-002",
    status: SupplierDeliveryStatus.IN_TRANSIT,
    notes: "Out for delivery",
    userId: "USER-002",
    userName: "Delivery Team",
    createdAt: new Date("2025-10-31T06:00:00"),
  },
  // DEL-003 history
  {
    id: "DSH-006",
    deliveryId: "DEL-003",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Order placed, awaiting confirmation",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-10-30T16:00:00"),
  },
  // DEL-004 history
  {
    id: "DSH-007",
    deliveryId: "DEL-004",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Weekly bulk order scheduled",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-11-01T09:00:00"),
  },
  // DEL-005 history
  {
    id: "DSH-008",
    deliveryId: "DEL-005",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Special order for specialty items",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-11-01T11:00:00"),
  },
  // DEL-006 history
  {
    id: "DSH-009",
    deliveryId: "DEL-006",
    status: SupplierDeliveryStatus.PENDING,
    notes: "Regular dairy delivery",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-11-02T08:00:00"),
  },
];

// ============================================================================
// SUPPLIER DELIVERIES
// ============================================================================

export const MOCK_SUPPLIER_DELIVERIES: SupplierDelivery[] = [
  {
    id: "DEL-001",
    deliveryReference: "DEL-2025-001",
    supplierId: "SUP-001",
    supplier: MOCK_SUPPLIERS[0], // Grain & Co
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.RECEIVED,
    expectedDate: new Date("2025-10-31T08:00:00"),
    receivedDate: new Date("2025-10-31T09:30:00"),
    notes: "Regular weekly delivery - all items inspected and stored properly",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-001").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-001"),
    createdAt: new Date("2025-10-28T10:00:00"),
    updatedAt: new Date("2025-10-31T09:30:00"),
  },
  {
    id: "DEL-002",
    deliveryReference: "DEL-2025-002",
    supplierId: "SUP-002",
    supplier: MOCK_SUPPLIERS[1], // DairyFresh
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.IN_TRANSIT,
    expectedDate: new Date("2025-10-31T14:00:00"),
    notes: "Dairy products - ensure refrigeration upon arrival",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-002").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-002"),
    createdAt: new Date("2025-10-29T14:00:00"),
    updatedAt: new Date("2025-10-31T06:00:00"),
  },
  {
    id: "DEL-003",
    deliveryReference: "DEL-2025-003",
    supplierId: "SUP-004",
    supplier: MOCK_SUPPLIERS[3], // Chocolate Masters
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.PENDING,
    expectedDate: new Date("2025-11-02T10:00:00"),
    notes: "Premium chocolate order - handle with care, store in cool room",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-003").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-003"),
    createdAt: new Date("2025-10-30T16:00:00"),
    updatedAt: new Date("2025-10-30T16:00:00"),
  },
  {
    id: "DEL-004",
    deliveryReference: "DEL-2025-004",
    supplierId: "SUP-001",
    supplier: MOCK_SUPPLIERS[0], // Grain & Co
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.PENDING,
    expectedDate: new Date("2025-11-04T08:00:00"),
    notes: "Large bulk order for the week - prepare storage space in advance",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-004").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-004"),
    createdAt: new Date("2025-11-01T09:00:00"),
    updatedAt: new Date("2025-11-01T09:00:00"),
  },
  {
    id: "DEL-005",
    deliveryReference: "DEL-2025-005",
    supplierId: "SUP-003",
    supplier: MOCK_SUPPLIERS[2], // Global Ingredients Ltd
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.PENDING,
    expectedDate: new Date("2025-11-04T13:00:00"),
    notes: "Specialty items for new product line",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-005").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-005"),
    createdAt: new Date("2025-11-01T11:00:00"),
    updatedAt: new Date("2025-11-01T11:00:00"),
  },
  {
    id: "DEL-006",
    deliveryReference: "DEL-2025-006",
    supplierId: "SUP-002",
    supplier: MOCK_SUPPLIERS[1], // DairyFresh
    deliveryType: DeliveryType.INCOMING,
    status: SupplierDeliveryStatus.PENDING,
    expectedDate: new Date("2025-11-05T07:00:00"),
    notes: "Regular bi-weekly dairy delivery",
    storeId: "STORE-001",
    items: DELIVERY_ITEMS.filter((item) => item.deliveryId === "DEL-006").map((item) => ({
      ...item,
      material: MOCK_MATERIALS.find((m) => m.id === item.materialId),
    })),
    statusHistory: DELIVERY_STATUS_HISTORY.filter((h) => h.deliveryId === "DEL-006"),
    createdAt: new Date("2025-11-02T08:00:00"),
    updatedAt: new Date("2025-11-02T08:00:00"),
  },
];

// Export types for convenience
export type { SupplierDelivery, SupplierDeliveryItem, SupplierDeliveryStatusHistory };
