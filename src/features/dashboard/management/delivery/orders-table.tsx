"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useI18n } from "@/components/lang/i18n-provider";
import { Order, OrderStatus, PaymentStatus } from "@/types/entities";
import { formatCurrency, formatDate } from "@/lib/utils/formatting";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  X,
  CheckSquare,
  Calendar,
  Printer,
  FileDown,
  Truck,
  ArrowUp,
  ArrowDown,
  Package,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface OrdersTableProps {
  orders: Order[];
  selectedOrder: Order | null;
  onOrderSelect: (order: Order) => void;
  onEditOrder?: (order: Order) => void;
  onScheduleDelivery?: (order: Order) => void;
  onUpdateStatus?: (order: Order) => void;
  onPrintOrder?: (order: Order) => void;
  onDeleteOrder?: (orderId: string) => void;
}

type SortField = "orderNumber" | "customerName" | "orderDate" | "deliveryDate" | "total" | "status";
type SortOrder = "asc" | "desc";

export function OrdersTable({
  orders,
  selectedOrder,
  onOrderSelect,
  onEditOrder,
  onScheduleDelivery,
  onUpdateStatus,
  onPrintOrder,
  onDeleteOrder,
}: OrdersTableProps) {
  const { t } = useI18n();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Get status badge variant
  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "secondary";
      case OrderStatus.PROCESSING:
        return "default";
      case OrderStatus.IN_STOCK:
        return "default";
      case OrderStatus.DELIVERED:
        return "default";
      case OrderStatus.CANCELLED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return Clock;
      case OrderStatus.PROCESSING:
        return Package;
      case OrderStatus.IN_STOCK:
        return CheckCircle2;
      case OrderStatus.DELIVERED:
        return CheckCircle2;
      case OrderStatus.CANCELLED:
        return XCircle;
      default:
        return Clock;
    }
  };

  // Get payment status variant
  const getPaymentVariant = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "secondary";
      case PaymentStatus.PARTIAL:
        return "default";
      case PaymentStatus.PAID:
        return "default";
      case PaymentStatus.REFUNDED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Get payment status icon
  const getPaymentIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return Clock;
      case PaymentStatus.PARTIAL:
        return CreditCard;
      case PaymentStatus.PAID:
        return CheckCircle2;
      case PaymentStatus.REFUNDED:
        return XCircle;
      default:
        return Clock;
    }
  };

  // Filtered and sorted orders
  const processedOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(query) ||
          o.customerName?.toLowerCase().includes(query) ||
          o.deliveryAddress?.toLowerCase().includes(query) ||
          o.deliveryCity?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter((o) => o.paymentStatus === paymentFilter);
    }

    // Date range filter (by delivery date)
    if (dateRange) {
      filtered = filtered.filter((o) => {
        if (!o.deliveryDate) return false;
        const deliveryDate = new Date(o.deliveryDate);
        if (dateRange.from && deliveryDate < dateRange.from) return false;
        if (dateRange.to && deliveryDate > dateRange.to) return false;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "orderNumber":
          comparison = a.orderNumber.localeCompare(b.orderNumber);
          break;
        case "customerName":
          comparison = a.customerName?.localeCompare(b.customerName || "") || 0;
          break;
        case "orderDate":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "deliveryDate":
          comparison =
            new Date(a.deliveryDate || new Date()).getTime() -
            new Date(b.deliveryDate || new Date()).getTime();
          break;
        case "total":
          comparison = a.total - b.total;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [orders, searchQuery, statusFilter, paymentFilter, dateRange, sortField, sortOrder]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedOrders.slice(start, start + pageSize);
  }, [processedOrders, currentPage, pageSize]);

  const totalPages = Math.ceil(processedOrders.length / pageSize);

  // Bulk selection handlers
  const toggleBulkSelect = () => {
    setBulkSelectMode(!bulkSelectMode);
    setSelectedIds(new Set());
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedOrders.map((o) => o.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Bulk actions
  const handleBulkMarkProcessing = () => {
    // TODO: API call to bulk update status
    toast({
      title: "Orders Updated",
      description: `${selectedIds.size} orders marked as Processing.`,
    });
    setSelectedIds(new Set());
  };

  const handleBulkMarkReady = () => {
    // TODO: API call to bulk update status
    toast({
      title: "Orders Updated",
      description: `${selectedIds.size} orders marked as Ready.`,
    });
    setSelectedIds(new Set());
  };

  const handleBulkExport = () => {
    // TODO: Export selected orders
    toast({
      title: "Export Started",
      description: `Exporting ${selectedIds.size} orders...`,
    });
  };

  const handleBulkDelete = () => {
    // TODO: API call to bulk delete
    toast({
      title: "Orders Deleted",
      description: `${selectedIds.size} orders have been deleted.`,
      variant: "destructive",
    });
    setSelectedIds(new Set());
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setDateRange(undefined);
    setSortField("orderDate");
    setSortOrder("desc");
  };

  // Handle date range change
  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
    } else {
      setDateRange(undefined);
    }
  };

  const hasActiveFilters =
    searchQuery || statusFilter !== "all" || paymentFilter !== "all" || dateRange !== undefined;

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };

  // Toggle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg lg:col-span-2">
      <CardHeader className="border-b pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg">
            {t("pages.ordersSectionTitle") || "Orders"} ({processedOrders.length})
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            {bulkSelectMode && selectedIds.size > 0 && (
              <>
                <Button variant="default" size="sm" onClick={handleBulkMarkProcessing}>
                  <Package className="mr-2 h-4 w-4" />
                  Mark Processing ({selectedIds.size})
                </Button>
                <Button variant="default" size="sm" onClick={handleBulkMarkReady}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Ready ({selectedIds.size})
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkExport}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
            <Button
              variant={bulkSelectMode ? "default" : "outline"}
              size="sm"
              onClick={toggleBulkSelect}
            >
              {bulkSelectMode ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Select
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Filters */}
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by order number, customer, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="IN_STOCK">Ready</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Filter */}
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[180px]">
                <CreditCard className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PARTIAL">Partial</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Bulk Select All */}
          {bulkSelectMode && (
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg border p-3">
              <Checkbox
                checked={selectedIds.size === paginatedOrders.length && paginatedOrders.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm font-medium">
                Select All ({selectedIds.size} of {paginatedOrders.length} selected)
              </span>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="-mx-4 overflow-x-auto rounded-md border sm:mx-0">
          <Table>
            <TableHeader>
              <TableRow>
                {bulkSelectMode && <TableHead className="w-[50px]">Select</TableHead>}
                <TableHead className="cursor-pointer" onClick={() => handleSort("orderNumber")}>
                  <div className="flex items-center">
                    Order #
                    <SortIcon field="orderNumber" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("customerName")}>
                  <div className="flex items-center">
                    Customer
                    <SortIcon field="customerName" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("deliveryDate")}>
                  <div className="flex items-center">
                    Delivery
                    <SortIcon field="deliveryDate" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  <div className="flex items-center">
                    Status
                    <SortIcon field="status" />
                  </div>
                </TableHead>
                <TableHead>Payment</TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("total")}
                >
                  <div className="flex items-center justify-end">
                    Total
                    <SortIcon field="total" />
                  </div>
                </TableHead>
                {!bulkSelectMode && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={bulkSelectMode ? 8 : 7}
                    className="text-muted-foreground h-24 text-center"
                  >
                    {hasActiveFilters ? "No orders match your filters" : "No orders found"}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => {
                  const isSelected = selectedIds.has(order.id);
                  const StatusIcon = getStatusIcon(order.status);
                  const PaymentIcon = getPaymentIcon(order.paymentStatus);

                  return (
                    <TableRow
                      key={order.id}
                      className={`cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? "bg-muted/50" : ""
                      } ${isSelected ? "bg-primary/5" : ""}`}
                      onClick={() => !bulkSelectMode && onOrderSelect(order)}
                    >
                      {bulkSelectMode && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelectItem(order.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-muted-foreground text-xs">{order.deliveryCity}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="text-muted-foreground h-3 w-3" />
                          <span className="text-sm">{formatDate(order.deliveryDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPaymentVariant(order.paymentStatus)} className="gap-1">
                          <PaymentIcon className="h-3 w-3" />
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(order.total)}
                      </TableCell>
                      {!bulkSelectMode && (
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => onOrderSelect(order)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Order</TooltipContent>
                            </Tooltip>
                            {onEditOrder && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => onEditOrder(order)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Order</TooltipContent>
                              </Tooltip>
                            )}
                            {onScheduleDelivery && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => onScheduleDelivery(order)}
                                  >
                                    <Truck className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Schedule Delivery</TooltipContent>
                              </Tooltip>
                            )}
                            {onPrintOrder && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => onPrintOrder(order)}
                                  >
                                    <Printer className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Print Order</TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Rows per page:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
