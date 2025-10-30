"use client";

import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import StockLevel from "./stock-level";
import OrdersPending from "./orders-pending";
import ActiveRecipes from "./active-recipes";
import ProductionHistoryChart from "./production-history-chart";
import CurrentWorkflow from "./current-workflow";
import OrdersToPrepareTable from "./orders-to-prepare-table";
import {
  MOCK_ORDERS,
  MOCK_DASHBOARD_STATS,
  MOCK_PRODUCTION_HISTORY_WEEKLY,
  MOCK_WORKFLOW_STATS,
} from "@/mocks";

export function DashboardView() {
  // Initialize without date filter (show all data by default)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter orders based on date range and other filters
  // TODO: Replace with API call that accepts date range, search, and status filters
  const filteredOrders = useMemo(() => {
    let filtered = MOCK_ORDERS;

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      filtered = filtered.filter((order) => {
        if (!order.deliveryDate) return false;
        const orderDate = new Date(order.deliveryDate);
        return orderDate >= dateRange.from! && orderDate <= dateRange.to!;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerName?.toLowerCase().includes(query) ||
          order.customerEmail?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status.toLowerCase() === statusFilter);
    }

    return filtered;
  }, [dateRange, searchQuery, statusFilter]);

  // Filter chart data based on date range
  // TODO: Replace with API call that accepts date range
  // Note: Mock data uses day names (Mon, Tue, etc.) which can't be filtered by date
  // In production, this will filter by actual dates from the API
  const filteredChartData = useMemo(() => {
    // For mock data, always show all data (day names can't be parsed as dates)
    // In production with real dates, implement date filtering here
    return MOCK_PRODUCTION_HISTORY_WEEKLY;
  }, [dateRange]);

  // Calculate dynamic stats based on filtered data
  // TODO: Replace with API call
  const dashboardStats = useMemo(() => {
    const pendingOrders = filteredOrders.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length;

    return {
      stockUtilization: MOCK_DASHBOARD_STATS.stockUtilization,
      totalOpenOrders: pendingOrders > 0 ? pendingOrders : MOCK_DASHBOARD_STATS.totalOpenOrders,
      activeRecipes: MOCK_DASHBOARD_STATS.activeRecipes,
    };
  }, [filteredOrders]);

  return (
    <div className="grid w-full gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome to the dashboard. Here you can see the current status of your orders, recipes, and
          stock.
        </p>
      </div>
      {/* Stat Cards */}
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StockLevel stockUtilization={dashboardStats.stockUtilization} />
        <OrdersPending totalOpenOrders={dashboardStats.totalOpenOrders} />
        <ActiveRecipes totalActiveRecipes={dashboardStats.activeRecipes} />
      </div>

      {/* Charts and Workflow */}
      <div className="grid w-full gap-4 lg:grid-cols-3">
        <ProductionHistoryChart chartData={filteredChartData} />
        <CurrentWorkflow
          inStock={MOCK_WORKFLOW_STATS.inStock}
          processing={MOCK_WORKFLOW_STATS.processing}
          delivered={MOCK_WORKFLOW_STATS.delivered}
        />
      </div>

      {/* Orders Table */}
      <OrdersToPrepareTable orders={filteredOrders} />
    </div>
  );
}
