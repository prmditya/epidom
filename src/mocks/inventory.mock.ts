/**
 * Mock data for inventory management (materials, recipes, products, suppliers, stock tracking)
 * TODO: Replace with real API calls to /api/inventory
 */

export interface Item {
  id: string;
  name: string;
  note?: string;
}

export interface StockRow {
  product: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
}

export interface ChartDataPoint {
  date: string;
  qty: number;
}

// Materials
export const MOCK_MATERIALS: Item[] = [
  { id: "MAT-01", name: "Flour T55" },
  { id: "MAT-02", name: "Butter AOP" },
  { id: "MAT-03", name: "Sugar" },
  { id: "MAT-04", name: "Almonds" },
  { id: "MAT-05", name: "Yeast" },
  { id: "MAT-06", name: "Eggs" },
];

// Recipes
export const MOCK_RECIPES: Item[] = [
  { id: "REC-01", name: "Baguette Tradition" },
  { id: "REC-02", name: "Croissant" },
  { id: "REC-03", name: "Brioche" },
];

// Products
export const MOCK_PRODUCTS: Item[] = [
  { id: "PRO-01", name: "Baguette" },
  { id: "PRO-02", name: "Croissant" },
  { id: "PRO-03", name: "Pain au chocolat" },
];

// Suppliers
export const MOCK_SUPPLIERS: Item[] = [
  { id: "SUP-01", name: "Grain&Co", note: "Flour supplier" },
  { id: "SUP-02", name: "DairyFresh", note: "Butter" },
];

// Stock Tracking Data
export const MOCK_STOCK_ROWS: StockRow[] = [
  { product: "Butter", currentStock: 25.01, minStock: 5, maxStock: 20, unit: "Kg" },
  { product: "Dark chocolate", currentStock: 23.05, minStock: 5, maxStock: 25, unit: "Kg" },
  { product: "White chocolate", currentStock: 15, minStock: 5, maxStock: 25, unit: "Kg" },
  { product: "Peanuts", currentStock: 12, minStock: 5, maxStock: 20, unit: "Kg" },
  { product: "Strawberry", currentStock: 8, minStock: 5, maxStock: 20, unit: "Units" },
  { product: "Pecans", currentStock: 6, minStock: 5, maxStock: 20, unit: "Kg" },
  { product: "Flour", currentStock: 4, minStock: 5, maxStock: 20, unit: "Kg" },
  { product: "Eggs", currentStock: 3, minStock: 5, maxStock: 20, unit: "Units" },
  { product: "Lime", currentStock: 2, minStock: 5, maxStock: 20, unit: "Units" },
];

// Production History Chart Data
export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: "Mon", qty: 120 },
  { date: "Tue", qty: 180 },
  { date: "Wed", qty: 160 },
  { date: "Thu", qty: 220 },
  { date: "Fri", qty: 190 },
  { date: "Sat", qty: 240 },
  { date: "Sun", qty: 200 },
];
