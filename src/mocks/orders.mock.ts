/**
 * Enhanced mock data for orders and order management
 * TODO: Replace with real API calls to /api/orders
 */

import {
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  OrderStatusHistory,
  Supplier,
} from "@/types/entities";
import { MOCK_SUPPLIERS } from "./inventory.mock";

// ============================================================================
// SIMPLE TYPES (for backward compatibility)
// ============================================================================

export interface OrderSupplier {
  name: string;
  contactHref: string;
  contactLabel: string;
  status: string;
  date: string;
  items: {
    product: string;
    current: string;
    required: string;
    toOrder: string;
  }[];
}

// ============================================================================
// ORDER ITEMS
// ============================================================================

const ORDER_ITEMS: OrderItem[] = [
  {
    id: "OI-001",
    orderId: "ORD-001",
    productId: "PRO-001",
    quantity: 120,
    unitPrice: 1.8,
    discount: 0,
    total: 216.0,
  },
  {
    id: "OI-002",
    orderId: "ORD-002",
    productId: "PRO-002",
    quantity: 80,
    unitPrice: 1.2,
    discount: 5.0,
    total: 91.0,
  },
  {
    id: "OI-003",
    orderId: "ORD-003",
    productId: "PRO-004",
    quantity: 60,
    unitPrice: 4.5,
    discount: 0,
    total: 270.0,
  },
  {
    id: "OI-004",
    orderId: "ORD-004",
    productId: "PRO-002",
    quantity: 50,
    unitPrice: 1.2,
    discount: 0,
    total: 60.0,
  },
  {
    id: "OI-005",
    orderId: "ORD-004",
    productId: "PRO-003",
    quantity: 30,
    unitPrice: 1.5,
    discount: 0,
    total: 45.0,
  },
  {
    id: "OI-006",
    orderId: "ORD-005",
    productId: "PRO-001",
    quantity: 200,
    unitPrice: 1.8,
    discount: 20.0,
    total: 340.0,
  },
  {
    id: "OI-007",
    orderId: "ORD-006",
    productId: "PRO-003",
    quantity: 100,
    unitPrice: 1.5,
    discount: 0,
    total: 150.0,
  },
];

// ============================================================================
// ORDER STATUS HISTORY
// ============================================================================

const ORDER_STATUS_HISTORY: OrderStatusHistory[] = [
  {
    id: "OSH-001",
    orderId: "ORD-001",
    status: OrderStatus.PENDING,
    notes: "Order received",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-10-30T10:00:00"),
  },
  {
    id: "OSH-002",
    orderId: "ORD-001",
    status: OrderStatus.PROCESSING,
    notes: "Started production",
    userId: "USER-002",
    userName: "Baker Jean",
    createdAt: new Date("2025-10-31T06:00:00"),
  },
  {
    id: "OSH-003",
    orderId: "ORD-002",
    status: OrderStatus.PENDING,
    notes: "Order received",
    userId: "USER-001",
    userName: "System",
    createdAt: new Date("2025-10-30T11:30:00"),
  },
  {
    id: "OSH-004",
    orderId: "ORD-002",
    status: OrderStatus.PROCESSING,
    notes: "Production started",
    userId: "USER-002",
    userName: "Baker Jean",
    createdAt: new Date("2025-10-31T07:00:00"),
  },
  {
    id: "OSH-005",
    orderId: "ORD-002",
    status: OrderStatus.IN_STOCK,
    notes: "Production completed, ready for delivery",
    userId: "USER-002",
    userName: "Baker Jean",
    createdAt: new Date("2025-10-31T12:00:00"),
  },
];

// ============================================================================
// ORDERS
// ============================================================================

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "ORD-1201",
    customerName: "Café du Coin",
    customerEmail: "contact@cafeducoin.fr",
    customerPhone: "+33 1 23 45 67 89",
    deliveryAddress: "12 Rue de la République",
    deliveryCity: "Paris",
    deliveryPostalCode: "75002",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-10-31T07:00:00"),
    dueDate: new Date("2025-10-31T07:00:00"),
    orderDate: new Date("2025-10-30T10:00:00"),
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: "Credit Card",
    supplierId: "SUP-001",
    supplier: MOCK_SUPPLIERS[0], // Grain & Co
    subtotal: 216.0,
    tax: 21.6,
    discount: 0,
    total: 237.6,
    totalAmount: 237.6,
    notes: "Deliver before 7 AM",
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-001"),
    statusHistory: ORDER_STATUS_HISTORY.filter((h) => h.orderId === "ORD-001"),
    createdAt: new Date("2025-10-30T10:00:00"),
    updatedAt: new Date("2025-10-31T06:00:00"),
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-1202",
    customerName: "Boulangerie Martin",
    customerEmail: "martin@boulangerie.fr",
    customerPhone: "+33 1 98 76 54 32",
    deliveryAddress: "45 Avenue des Champs",
    deliveryCity: "Lyon",
    deliveryPostalCode: "69001",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-10-31T08:00:00"),
    dueDate: new Date("2025-10-31T08:00:00"),
    orderDate: new Date("2025-10-30T11:30:00"),
    status: OrderStatus.IN_STOCK,
    paymentStatus: PaymentStatus.PAID,
    paymentMethod: "Bank Transfer",
    supplierId: "SUP-002",
    supplier: MOCK_SUPPLIERS[1], // DairyFresh
    subtotal: 96.0,
    tax: 9.6,
    discount: 5.0,
    total: 100.6,
    totalAmount: 100.6,
    notes: "Regular customer, weekly order",
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-002"),
    statusHistory: ORDER_STATUS_HISTORY.filter((h) => h.orderId === "ORD-002"),
    createdAt: new Date("2025-10-30T11:30:00"),
    updatedAt: new Date("2025-10-31T12:00:00"),
  },
  {
    id: "ORD-003",
    orderNumber: "ORD-1203",
    customerName: "Hotel Le Grand",
    customerEmail: "orders@hotellegrand.fr",
    customerPhone: "+33 4 56 78 90 12",
    deliveryAddress: "88 Boulevard Saint-Germain",
    deliveryCity: "Paris",
    deliveryPostalCode: "75006",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-11-01T06:30:00"),
    dueDate: new Date("2025-11-01T06:30:00"),
    orderDate: new Date("2025-10-31T14:00:00"),
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: "Invoice",
    supplierId: "SUP-001",
    supplier: MOCK_SUPPLIERS[0], // Grain & Co
    subtotal: 270.0,
    tax: 27.0,
    discount: 0,
    total: 297.0,
    totalAmount: 297.0,
    notes: "VIP customer - handle with care",
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-003"),
    createdAt: new Date("2025-10-31T14:00:00"),
    updatedAt: new Date("2025-10-31T14:00:00"),
  },
  {
    id: "ORD-004",
    orderNumber: "ORD-1204",
    customerName: "Restaurant Chez Pierre",
    customerEmail: "pierre@chezpierre.fr",
    customerPhone: "+33 2 34 56 78 90",
    deliveryAddress: "15 Rue du Commerce",
    deliveryCity: "Marseille",
    deliveryPostalCode: "13001",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-11-01T07:00:00"),
    dueDate: new Date("2025-11-01T07:00:00"),
    orderDate: new Date("2025-10-31T15:30:00"),
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: "Credit Card",
    supplierId: "SUP-002",
    supplier: MOCK_SUPPLIERS[1], // DairyFresh
    subtotal: 105.0,
    tax: 10.5,
    discount: 0,
    total: 115.5,
    totalAmount: 115.5,
    notes: "Call before delivery",
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-004"),
    createdAt: new Date("2025-10-31T15:30:00"),
    updatedAt: new Date("2025-10-31T15:30:00"),
  },
  {
    id: "ORD-005",
    orderNumber: "ORD-1205",
    customerName: "Supermarché Bio Plus",
    customerEmail: "orders@bioplus.fr",
    customerPhone: "+33 3 45 67 89 01",
    deliveryAddress: "30 Avenue de la Liberté",
    deliveryCity: "Bordeaux",
    deliveryPostalCode: "33000",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-11-02T09:00:00"),
    dueDate: new Date("2025-11-02T09:00:00"),
    orderDate: new Date("2025-11-01T09:00:00"),
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PARTIAL,
    paymentMethod: "Bank Transfer",
    supplierId: "SUP-001",
    supplier: MOCK_SUPPLIERS[0], // Grain & Co
    subtotal: 360.0,
    tax: 36.0,
    discount: 20.0,
    total: 376.0,
    totalAmount: 376.0,
    notes: "Large order - may need two deliveries",
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-005"),
    createdAt: new Date("2025-11-01T09:00:00"),
    updatedAt: new Date("2025-11-01T09:00:00"),
  },
  {
    id: "ORD-006",
    orderNumber: "ORD-1206",
    customerName: "Café de la Gare",
    customerEmail: "contact@cafegare.fr",
    customerPhone: "+33 5 67 89 01 23",
    deliveryAddress: "2 Place de la Gare",
    deliveryCity: "Lyon",
    deliveryPostalCode: "69002",
    deliveryCountry: "France",
    deliveryDate: new Date("2025-11-02T07:30:00"),
    dueDate: new Date("2025-11-02T07:30:00"),
    orderDate: new Date("2025-11-01T16:00:00"),
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: "Cash",
    supplierId: "SUP-002",
    supplier: MOCK_SUPPLIERS[1], // DairyFresh
    subtotal: 150.0,
    tax: 15.0,
    discount: 0,
    total: 165.0,
    totalAmount: 165.0,
    storeId: "STORE-001",
    items: ORDER_ITEMS.filter((item) => item.orderId === "ORD-006"),
    createdAt: new Date("2025-11-01T16:00:00"),
    updatedAt: new Date("2025-11-01T16:00:00"),
  },
];

// ============================================================================
// MANAGEMENT ORDERS (simplified for management page)
// ============================================================================

export const MOCK_MANAGEMENT_ORDERS = [
  {
    id: "O-1001",
    name: "Baguette x50",
    date: "2025-10-15",
    status: "Pending" as const,
  },
  {
    id: "O-1002",
    name: "Croissant x80",
    date: "2025-10-15",
    status: "Processing" as const,
  },
  {
    id: "O-1003",
    name: "Pain au chocolat x60",
    date: "2025-10-16",
    status: "Pending" as const,
  },
  {
    id: "O-1004",
    name: "Brioche x20",
    date: "2025-10-16",
    status: "Delivered" as const,
  },
];

// ============================================================================
// ORDERS SUPPLIERS (for alerts page)
// ============================================================================

export const ORDERS_SUPPLIERS: OrderSupplier[] = [
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      {
        product: "Butter",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "9.83 Kg",
      },
      {
        product: "Dark chocolate",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "15.87 Kg",
      },
      {
        product: "Butter",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "12.16 Kg",
      },
    ],
  },
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      {
        product: "Butter",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "9.83 Kg",
      },
      {
        product: "Dark chocolate",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "15.87 Kg",
      },
      {
        product: "Butter",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "12.16 Kg",
      },
    ],
  },
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      {
        product: "Butter",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "9.83 Kg",
      },
      {
        product: "Milk chocolate",
        current: "10.22 Kg",
        required: "20.05 Kg",
        toOrder: "15.87 Kg",
      },
    ],
  },
];

// Export type for backward compatibility
export type { Order };
