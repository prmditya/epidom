/**
 * Mock data for alerts and stock warnings
 * TODO: Replace with real API calls to /api/alerts
 */

// Simple alert item (for alerts count)
export interface AlertItem {
  product: string;
  pct: number;
  qty: string;
  date: string;
}

// Detailed alert item (for supplier alerts with stock levels)
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

export const MOCK_ALERTS: AlertItem[] = [
  { product: "Butter", pct: 0.8, qty: "10.22 Kg", date: "10.08.24" },
  { product: "Dark chocolate", pct: 0.6, qty: "9.15 Kg", date: "08.08.24" },
  { product: "White chocolate", pct: 0.55, qty: "7.85 Kg", date: "25.07.24" },
];

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
