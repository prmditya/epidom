"use client";

import { MovementDetailsDialog } from "./movement-details-dialog";
import { BulkRestockDialog } from "./bulk-restock-dialog";
import type { StockMovement } from "@/types/entities";
import type { StockRow } from "@/mocks/inventory.mock";

interface TrackingDialogsProps {
  // Movement Details Dialog
  isDetailsDialogOpen: boolean;
  onDetailsDialogChange: (open: boolean) => void;
  selectedMovement: StockMovement | null;

  // Bulk Restock Dialog
  isBulkRestockOpen: boolean;
  onBulkRestockChange: (open: boolean) => void;
  selectedStockRows: StockRow[];
  onBulkRestockClose: () => void;
}

export function TrackingDialogs({
  isDetailsDialogOpen,
  onDetailsDialogChange,
  selectedMovement,
  isBulkRestockOpen,
  onBulkRestockChange,
  selectedStockRows,
  onBulkRestockClose,
}: TrackingDialogsProps) {
  return (
    <>
      {/* Movement Details Dialog */}
      <MovementDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={onDetailsDialogChange}
        movement={selectedMovement}
      />

      {/* Bulk Restock Dialog */}
      <BulkRestockDialog
        selectedItems={selectedStockRows}
        open={isBulkRestockOpen}
        onOpenChange={(open) => {
          onBulkRestockChange(open);
          // Clear selection after dialog closes
          if (!open) {
            onBulkRestockClose();
          }
        }}
      />
    </>
  );
}
