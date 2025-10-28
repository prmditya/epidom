import StockLevel from "./stock-level";
import OrdersPending from "./orders-pending";
import ActiveRecipes from "./active-recipes";
import ProductionHistoryChart from "./production-history-chart";
import CurrentWorkflow from "./current-workflow";
import OrdersToPrepareTable from "./orders-to-prepare-table";
import { MOCK_CHART_DATA, MOCK_ORDERS } from "@/mocks";

export function DashboardView() {
  return (
    <div className="grid w-full gap-6 overflow-hidden">
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StockLevel stockUtilization={50} />
        <OrdersPending totalOpenOrders={10} />
        <ActiveRecipes totalActiveRecipes={20} />
      </div>

      <div className="grid w-full gap-4 lg:grid-cols-3">
        <ProductionHistoryChart chartData={MOCK_CHART_DATA} />
        <CurrentWorkflow inStock={55} processing={28} delivered={17} />
      </div>

      <OrdersToPrepareTable orders={MOCK_ORDERS} />
    </div>
  );
}
