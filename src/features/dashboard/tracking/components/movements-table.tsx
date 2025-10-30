"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang/i18n-provider";
import { formatDateTime } from "@/lib/utils/formatting";
import { MovementType, type StockMovement } from "@/types/entities";

type SortField = "createdAt" | "type" | "quantity" | "reason";
type SortOrder = "asc" | "desc";

interface MovementsTableProps {
  movements: StockMovement[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (field: SortField, order: SortOrder) => void; // Triggers backend API call
  onRowClick: (movement: StockMovement) => void;
  isLoading?: boolean;
}

// Helper function to get movement type color
function getMovementTypeColor(type: MovementType): string {
  switch (type) {
    case MovementType.IN:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case MovementType.OUT:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case MovementType.ADJUSTMENT:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case MovementType.PRODUCTION:
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case MovementType.WASTE:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case MovementType.RETURN:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

export function MovementsTable({
  movements,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  onRowClick,
  isLoading = false,
}: MovementsTableProps) {
  const { t } = useI18n();
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    // Trigger backend API call with new sort params
    onSortChange(field, newOrder);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("createdAt")}
                  className="h-8 px-2 hover:bg-transparent"
                >
                  {t("tracking.dateTime")}
                  <SortIcon field="createdAt" />
                </Button>
              </TableHead>
              <TableHead>{t("tracking.material")}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("type")}
                  className="h-8 px-2 hover:bg-transparent"
                >
                  {t("tracking.type")}
                  <SortIcon field="type" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("quantity")}
                  className="h-8 px-2 hover:bg-transparent"
                >
                  {t("tracking.quantity")}
                  <SortIcon field="quantity" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("reason")}
                  className="h-8 px-2 hover:bg-transparent"
                >
                  {t("tracking.reason")}
                  <SortIcon field="reason" />
                </Button>
              </TableHead>
              <TableHead>{t("tracking.user")}</TableHead>
              <TableHead>{t("tracking.reference")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="text-muted-foreground">{t("messages.loggingIn")}...</div>
                </TableCell>
              </TableRow>
            ) : movements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">
                      {t("tracking.emptyStates.noMovements.title")}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {t("tracking.emptyStates.noMovements.description")}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              movements.map((movement) => (
                <TableRow
                  key={movement.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => onRowClick(movement)}
                >
                  <TableCell className="font-medium">
                    {formatDateTime(movement.createdAt)}
                  </TableCell>
                  <TableCell>{movement.materialId || movement.productId || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getMovementTypeColor(movement.type)}>
                      {t(`tracking.movements.${movement.type.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        movement.type === MovementType.IN
                          ? "text-green-600 dark:text-green-400"
                          : movement.type === MovementType.OUT ||
                              movement.type === MovementType.WASTE
                            ? "text-red-600 dark:text-red-400"
                            : ""
                      }
                    >
                      {movement.type === MovementType.IN ? "+" : "-"}
                      {movement.quantity} {movement.unit}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{movement.reason}</TableCell>
                  <TableCell>{movement.userName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {movement.referenceId || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && movements.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm">{t("tracking.rowsPerPage")}:</p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
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

          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {startIndex}-{endIndex} {t("tracking.of")} {totalCount}
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {t("tracking.previous")}
              </Button>
              <div className="flex items-center gap-1 px-2">
                <span className="text-sm">
                  {t("tracking.page")} {currentPage} {t("tracking.of")} {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                {t("tracking.next")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
