"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang/i18n-provider";
import { MovementType } from "@/types/entities";
import type { DateRange } from "react-day-picker";

export interface MovementFilters {
  search: string;
  types: MovementType[];
  dateRange: DateRange | undefined;
}

interface MovementFiltersProps {
  filters: MovementFilters;
  onFiltersChange: (filters: MovementFilters) => void;
  onApplyFilters: () => void; // Trigger API call with current filters
}

export function MovementFiltersComponent({
  filters,
  onFiltersChange,
  onApplyFilters,
}: MovementFiltersProps) {
  const { t } = useI18n();

  // Movement type options for multi-select
  const movementTypeOptions = [
    { value: MovementType.IN, label: t("tracking.movements.in") },
    { value: MovementType.OUT, label: t("tracking.movements.out") },
    { value: MovementType.ADJUSTMENT, label: t("tracking.movements.adjustment") },
    { value: MovementType.PRODUCTION, label: t("tracking.movements.production") },
    { value: MovementType.WASTE, label: t("tracking.movements.waste") },
    { value: MovementType.RETURN, label: t("tracking.movements.return") },
  ];

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleTypesChange = (types: string[]) => {
    onFiltersChange({ ...filters, types: types as MovementType[] });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: "",
      types: [],
      dateRange: undefined,
    });
    // Auto-apply after clearing
    setTimeout(() => onApplyFilters(), 100);
  };

  // Count active filters
  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.types.length > 0 ? 1 : 0) +
    (filters.dateRange?.from || filters.dateRange?.to ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Primary Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
        {/* Search Input */}
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={t("tracking.searchMovements")}
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onApplyFilters();
              }
            }}
            className="pl-9"
          />
        </div>

        {/* Date Range Picker */}
        <div className="w-full sm:w-fit">
          <DateRangePicker value={filters.dateRange} onChange={handleDateRangeChange} />
        </div>

        {/* Filter Actions */}
        <div className="ml-auto flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-9">
              <X className="mr-2 h-4 w-4" />
              {t("tracking.clearFilters")}
            </Button>
          )}
          <Button onClick={onApplyFilters} size="sm" className="h-9">
            {t("actions.filter")}
          </Button>
        </div>
      </div>

      {/* Advanced Filters Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Movement Type Filter */}
        <div className="w-full sm:w-64">
          <MultiSelect
            options={movementTypeOptions}
            selected={filters.types}
            onChange={handleTypesChange}
            placeholder={t("tracking.filterByType")}
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {activeFiltersCount === 1
              ? `1 ${t("tracking.filterActive")}`
              : `${activeFiltersCount} ${t("tracking.filtersActive")}`}
            :
          </span>

          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              <span className="text-xs">
                {t("actions.searchPlaceholder")}: {filters.search}
              </span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleSearchChange("")} />
            </Badge>
          )}

          {filters.types.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <span className="text-xs">
                {filters.types.length} {t("tracking.type")}
                {filters.types.length > 1 ? "s" : ""}
              </span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleTypesChange([])} />
            </Badge>
          )}

          {(filters.dateRange?.from || filters.dateRange?.to) && (
            <Badge variant="secondary" className="gap-1">
              <span className="text-xs">{t("tracking.filterByDate")}</span>
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDateRangeChange(undefined)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
