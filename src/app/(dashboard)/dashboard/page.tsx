import StockLevel from "@/features/dashboard/dashboard/components/stock-level";
import OrdersPending from "@/features/dashboard/dashboard/components/orders-pending";
import ActiveRecipes from "@/features/dashboard/dashboard/components/active-recipes";
import ProductionHistoryChart from "@/features/dashboard/dashboard/components/production-history-chart";
import CurrentWorkflow from "@/features/dashboard/dashboard/components/current-workflow";
import OrdersToPrepareTable from "@/features/dashboard/dashboard/components/orders-to-prepare-table";

const chartData = [
  { date: "Mon", qty: 120 },
  { date: "Tue", qty: 180 },
  { date: "Wed", qty: 160 },
  { date: "Thu", qty: 220 },
  { date: "Fri", qty: 190 },
  { date: "Sat", qty: 240 },
  { date: "Sun", qty: 200 },
];

const orders = [
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

export default function DashboardPage() {
  return (
    <div className="grid gap-6 w-full overflow-hidden">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <StockLevel stockUtilization={50} />
        <OrdersPending totalOpenOrders={10} />
        <ActiveRecipes totalActiveRecipes={20} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 w-full">
        <ProductionHistoryChart chartData={chartData} />
        <CurrentWorkflow inStock={55} processing={28} delivered={17} />
      </div>

      <OrdersToPrepareTable orders={orders} />
    </div>
  );
}
