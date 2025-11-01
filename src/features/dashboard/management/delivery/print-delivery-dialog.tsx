"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";
import { SupplierDelivery } from "@/types/entities";
import { formatDate } from "@/lib/utils/formatting";
import { Printer, Download } from "lucide-react";

interface PrintDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: SupplierDelivery | null;
}

export default function PrintDeliveryDialog({
  open,
  onOpenChange,
  delivery,
}: PrintDeliveryDialogProps) {
  const { t } = useI18n();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Delivery ${delivery?.deliveryReference}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  color: #333;
                }
                h1 {
                  font-size: 24px;
                  margin-bottom: 10px;
                }
                h2 {
                  font-size: 18px;
                  margin-top: 20px;
                  margin-bottom: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f4f4f4;
                  font-weight: bold;
                }
                .header-section {
                  margin-bottom: 20px;
                  padding: 10px;
                  background-color: #f9f9f9;
                  border-radius: 4px;
                }
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                .label {
                  font-weight: bold;
                  margin-right: 10px;
                }
                @media print {
                  button {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    alert("PDF export functionality will be implemented with a PDF library");
  };

  if (!delivery) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Print Delivery</DialogTitle>
          <DialogDescription>
            Preview and print delivery {delivery.deliveryReference}
          </DialogDescription>
        </DialogHeader>

        {/* Print Content */}
        <div ref={printRef} className="space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Supplier Delivery</h1>
            <p className="text-muted-foreground text-sm">
              Reference: {delivery.deliveryReference}
            </p>
          </div>

          {/* Delivery Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Delivery Information</h2>
              <div className="flex gap-2">
                <Badge variant="secondary">{delivery.deliveryType}</Badge>
                <Badge>{delivery.status}</Badge>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Expected Date:</span>
                <span>{formatDate(delivery.expectedDate)}</span>
              </div>
              {delivery.receivedDate && (
                <div className="flex justify-between">
                  <span className="font-medium">Received Date:</span>
                  <span>{formatDate(delivery.receivedDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h2 className="mb-2 text-lg font-semibold">Supplier Details</h2>
            <Separator className="my-2" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{delivery.supplier?.name}</span>
              </div>
              {delivery.supplier?.contactPerson && (
                <div className="flex justify-between">
                  <span className="font-medium">Contact Person:</span>
                  <span>{delivery.supplier.contactPerson}</span>
                </div>
              )}
              {delivery.supplier?.phone && (
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{delivery.supplier.phone}</span>
                </div>
              )}
              {delivery.supplier?.email && (
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{delivery.supplier.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Items</h2>
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Material</th>
                  <th className="border p-2 text-left">SKU</th>
                  <th className="border p-2 text-right">Quantity</th>
                  <th className="border p-2 text-left">Unit</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {delivery.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.material?.name || "Unknown"}</td>
                    <td className="border p-2">{item.material?.sku || "-"}</td>
                    <td className="border p-2 text-right">{item.quantity}</td>
                    <td className="border p-2">{item.unit}</td>
                    <td className="border p-2">{item.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {delivery.notes && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h2 className="mb-2 text-lg font-semibold">Notes</h2>
              <Separator className="my-2" />
              <p className="text-sm">{delivery.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-muted-foreground mt-6 text-xs">
            <p>Printed on: {formatDate(new Date())}</p>
            <p>Generated by: EPIDOM Management System</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="button" variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button type="button" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
