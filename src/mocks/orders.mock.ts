/**
 * Mock data for orders and order management
 * TODO: Replace with real API calls to /api/orders
 */

export interface Order {
  id: string;
  name: string;
  date: string;
  status: "Pending" | "Processing" | "Delivered" | "In stock";
}

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

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-1201",
    name: "Baguette x120",
    date: "2025-10-15",
    status: "Processing",
  },
  {
    id: "ORD-1202",
    name: "Croissant x80",
    date: "2025-10-15",
    status: "In stock",
  },
  {
    id: "ORD-1203",
    name: "Pain de mie x60",
    date: "2025-10-16",
    status: "Pending",
  },
];

export const MOCK_MANAGEMENT_ORDERS: Order[] = [
  { id: "O-1001", name: "Baguette x50", date: "2025-10-15", status: "Pending" },
  {
    id: "O-1002",
    name: "Croissant x80",
    date: "2025-10-15",
    status: "Processing",
  },
  {
    id: "O-1003",
    name: "Pain au chocolat x60",
    date: "2025-10-16",
    status: "Pending",
  },
  {
    id: "O-1004",
    name: "Brioche x20",
    date: "2025-10-16",
    status: "Delivered",
  },
];

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
