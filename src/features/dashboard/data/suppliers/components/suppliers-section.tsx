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
import { useI18n } from "@/components/lang/i18n-provider";
import SupplierDetailsDialog from "./supplier-details-dialog";
import EditSupplierDialog from "./edit-supplier-dialog";
import AddSupplierDialog from "./add-supplier-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ExportButton } from "@/components/ui/export-button";
import type { Supplier } from "@/types/entities";
import { PaymentTerms } from "@/types/entities";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  X,
  CheckSquare,
  Store,
  Star,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface SuppliersSectionProps {
  suppliers: Supplier[];
}

type SortField = "name" | "rating" | "deliveryRate" | "city";
type SortOrder = "asc" | "desc";
type RatingFilter = "all" | "excellent" | "good" | "average" | "poor";

export function SuppliersSection({ suppliers }: SuppliersSectionProps) {
  const { t } = useI18n();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentTermsFilter, setPaymentTermsFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Helper function to determine rating category
  const getRatingCategory = (rating?: number): RatingFilter => {
    if (!rating) return "average";
    if (rating >= 4.5) return "excellent";
    if (rating >= 4.0) return "good";
    if (rating >= 3.0) return "average";
    return "poor";
  };

  // Filtered and sorted suppliers
  const processedSuppliers = useMemo(() => {
    let filtered = [...suppliers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.contactPerson?.toLowerCase().includes(query) ||
          s.email?.toLowerCase().includes(query) ||
          s.city?.toLowerCase().includes(query) ||
          s.country?.toLowerCase().includes(query)
      );
    }

    // Payment terms filter
    if (paymentTermsFilter !== "all") {
      filtered = filtered.filter((s) => s.paymentTerms === paymentTermsFilter);
    }

    // Rating filter
    if (ratingFilter !== "all") {
      filtered = filtered.filter((s) => getRatingCategory(s.rating) === ratingFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "rating":
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case "deliveryRate":
          comparison = (a.onTimeDeliveryRate || 0) - (b.onTimeDeliveryRate || 0);
          break;
        case "city":
          comparison = (a.city || "").localeCompare(b.city || "");
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [suppliers, searchQuery, paymentTermsFilter, ratingFilter, sortField, sortOrder]);

  // Bulk selection handlers
  const toggleBulkSelect = () => {
    setBulkSelectMode(!bulkSelectMode);
    setSelectedIds(new Set());
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === processedSuppliers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(processedSuppliers.map((s) => s.id)));
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

  // Action handlers
  const handleView = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setViewDialogOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: API call to delete supplier
    toast({
      title: "Supplier Deleted",
      description: `${selectedSupplier?.name} has been deleted successfully.`,
    });
    setDeleteDialogOpen(false);
    setSelectedSupplier(null);
  };

  const handleBulkDelete = () => {
    // TODO: API call to bulk delete suppliers
    toast({
      title: "Suppliers Deleted",
      description: `${selectedIds.size} suppliers have been deleted successfully.`,
    });
    setSelectedIds(new Set());
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPaymentTermsFilter("all");
    setRatingFilter("all");
    setSortField("name");
    setSortOrder("asc");
  };

  const hasActiveFilters = searchQuery || paymentTermsFilter !== "all" || ratingFilter !== "all";

  // Export columns configuration
  const exportColumns = [
    { key: "name" as const, header: "Name" },
    { key: "contactPerson" as const, header: "Contact Person" },
    { key: "email" as const, header: "Email" },
    { key: "phone" as const, header: "Phone" },
    { key: "city" as const, header: "City" },
    { key: "country" as const, header: "Country" },
    { key: "paymentTerms" as const, header: "Payment Terms" },
    { key: "rating" as const, header: "Rating" },
    { key: "onTimeDeliveryRate" as const, header: "On-Time Delivery %" },
  ];

  return (
    <>
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">Suppliers</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <ExportButton
                data={processedSuppliers}
                filename="suppliers"
                columns={exportColumns}
                title="Suppliers"
              />
              <AddSupplierDialog />
              {bulkSelectMode && selectedIds.size > 0 && (
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({selectedIds.size})
                </Button>
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

        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by name, contact, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Payment Terms Filter */}
              <Select value={paymentTermsFilter} onValueChange={setPaymentTermsFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Payment Terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Terms</SelectItem>
                  <SelectItem value={PaymentTerms.COD}>COD</SelectItem>
                  <SelectItem value={PaymentTerms.NET15}>Net 15</SelectItem>
                  <SelectItem value={PaymentTerms.NET30}>Net 30</SelectItem>
                  <SelectItem value={PaymentTerms.NET60}>Net 60</SelectItem>
                  <SelectItem value={PaymentTerms.NET90}>Net 90</SelectItem>
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select
                value={ratingFilter}
                onValueChange={(v) => setRatingFilter(v as RatingFilter)}
              >
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="excellent">Excellent (4.5+)</SelectItem>
                  <SelectItem value="good">Good (4.0+)</SelectItem>
                  <SelectItem value="average">Average (3.0+)</SelectItem>
                  <SelectItem value="poor">Poor (&lt;3.0)</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={`${sortField}-${sortOrder}`}
                onValueChange={(v) => {
                  const [field, order] = v.split("-") as [SortField, SortOrder];
                  setSortField(field);
                  setSortOrder(order);
                }}
              >
                <SelectTrigger>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="rating-asc">Rating (Low-High)</SelectItem>
                  <SelectItem value="rating-desc">Rating (High-Low)</SelectItem>
                  <SelectItem value="deliveryRate-asc">Delivery (Low-High)</SelectItem>
                  <SelectItem value="deliveryRate-desc">Delivery (High-Low)</SelectItem>
                  <SelectItem value="city-asc">City (A-Z)</SelectItem>
                  <SelectItem value="city-desc">City (Z-A)</SelectItem>
                </SelectContent>
              </Select>

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
                  checked={
                    selectedIds.size === processedSuppliers.length && processedSuppliers.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm font-medium">
                  Select All ({selectedIds.size} of {processedSuppliers.length} selected)
                </span>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground text-sm">
              Showing {processedSuppliers.length} of {suppliers.length} suppliers
            </p>
          </div>

          {/* Suppliers Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {processedSuppliers.map((supplier) => {
              const isSelected = selectedIds.has(supplier.id);

              return (
                <div
                  key={supplier.id}
                  className={`group bg-card relative rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
                    isSelected ? "ring-primary ring-2" : ""
                  }`}
                >
                  {/* Bulk Select Checkbox */}
                  {bulkSelectMode && (
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectItem(supplier.id)}
                      />
                    </div>
                  )}

                  {/* Supplier Content */}
                  <div className={bulkSelectMode ? "pl-6" : ""}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm leading-tight font-semibold">{supplier.name}</h3>
                        {supplier.contactPerson && (
                          <p className="text-muted-foreground text-xs">{supplier.contactPerson}</p>
                        )}
                      </div>

                      {/* Rating Badge */}
                      {supplier.rating && (
                        <Badge
                          variant={
                            supplier.rating >= 4.5
                              ? "default"
                              : supplier.rating >= 3.0
                                ? "secondary"
                                : "destructive"
                          }
                          className="ml-2 flex items-center gap-1 text-xs"
                        >
                          <Star className="h-3 w-3 fill-current" />
                          {supplier.rating.toFixed(1)}
                        </Badge>
                      )}
                    </div>

                    <Separator className="my-2" />

                    {/* Supplier Info */}
                    <div className="text-muted-foreground space-y-1 text-xs">
                      {supplier.email && (
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="text-foreground truncate font-medium">
                            {supplier.email.split("@")[0]}...
                          </span>
                        </div>
                      )}
                      {supplier.phone && (
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="text-foreground font-medium">{supplier.phone}</span>
                        </div>
                      )}
                      {(supplier.city || supplier.country) && (
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span className="text-foreground font-medium">
                            {[supplier.city, supplier.country].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      )}
                      {supplier.paymentTerms && (
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="text-foreground font-medium">
                            {supplier.paymentTerms}
                          </span>
                        </div>
                      )}
                      {supplier.onTimeDeliveryRate !== undefined && (
                        <div className="flex justify-between">
                          <span>Delivery:</span>
                          <span
                            className={`font-medium ${
                              supplier.onTimeDeliveryRate >= 95
                                ? "text-green-600"
                                : supplier.onTimeDeliveryRate >= 85
                                  ? "text-blue-600"
                                  : "text-orange-600"
                            }`}
                          >
                            <TrendingUp className="mr-0.5 inline h-3 w-3" />
                            {supplier.onTimeDeliveryRate}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Hover Actions */}
                    {!bulkSelectMode && (
                      <div className="mt-2 grid grid-cols-3 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-full text-xs"
                              onClick={() => handleView(supplier)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Supplier</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-full flex-1 text-xs"
                              onClick={() => handleEdit(supplier)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Supplier</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive bg-destructive/10 hover:bg-destructive/30 h-8 w-full flex-1 text-xs"
                              onClick={() => handleDeleteClick(supplier)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Supplier</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {processedSuppliers.length === 0 && (
              <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <Store className="text-muted-foreground/50 mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">No suppliers found</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search query"
                    : "Get started by adding your first supplier"}
                </p>
                {hasActiveFilters ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  <AddSupplierDialog />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedSupplier && (
        <>
          <SupplierDetailsDialog
            supplier={selectedSupplier}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
            onEdit={() => {
              setViewDialogOpen(false);
              setEditDialogOpen(true);
            }}
            onDelete={() => {
              setViewDialogOpen(false);
              setDeleteDialogOpen(true);
            }}
          />
          <EditSupplierDialog
            supplier={selectedSupplier}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
          <ConfirmationDialog
            title="Delete Supplier"
            description={`Are you sure you want to delete "${selectedSupplier.name}"? This action cannot be undone.`}
            confirmText="Delete Supplier"
            onConfirm={handleDeleteConfirm}
            variant="destructive"
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      )}
    </>
  );
}
