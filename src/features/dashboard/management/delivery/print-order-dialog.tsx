"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Printer, Download, FileText, Package, Truck } from "lucide-react";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { OrderStatus, PaymentStatus } from "@/types/entities";
import { MOCK_PRODUCTS } from "@/mocks";
import { formatDate, formatCurrency } from "@/lib/utils/formatting";

type PrintTemplate = "invoice" | "delivery_note" | "packing_slip";

interface PrintOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  trigger?: React.ReactNode;
}

export default function PrintOrderDialog({
  open,
  onOpenChange,
  order,
  trigger,
}: PrintOrderDialogProps) {
  const [template, setTemplate] = useState<PrintTemplate>("invoice");
  const printRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Order - ${order?.orderNumber}</title>
              <style>
                @media print {
                  @page { margin: 1cm; }
                  body { margin: 0; }
                }
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  line-height: 1.6;
                  color: #000;
                  max-width: 210mm;
                  margin: 0 auto;
                  padding: 20px;
                }
                h1, h2, h3 { margin: 0 0 10px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f5f5f5; font-weight: 600; }
                .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .company-info { flex: 1; }
                .order-info { text-align: right; }
                .badge {
                  display: inline-block;
                  padding: 4px 12px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: 500;
                }
                .badge-pending { background: #fef3c7; color: #92400e; }
                .badge-processing { background: #fef3c7; color: #92400e; }
                .badge-ready { background: #d1fae5; color: #065f46; }
                .badge-delivered { background: #e5e7eb; color: #374151; }
                .badge-cancelled { background: #fee2e2; color: #991b1b; }
                .summary {
                  margin-top: 20px;
                  text-align: right;
                  font-size: 14px;
                }
                .summary-row {
                  display: flex;
                  justify-content: flex-end;
                  margin: 8px 0;
                }
                .summary-label {
                  margin-right: 40px;
                  font-weight: 500;
                }
                .total {
                  font-size: 18px;
                  font-weight: 700;
                  border-top: 2px solid #000;
                  padding-top: 10px;
                  margin-top: 10px;
                }
                .footer {
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #ddd;
                  text-align: center;
                  color: #666;
                  font-size: 12px;
                }
                .info-section { margin: 20px 0; }
                .info-section h3 { font-size: 14px; margin-bottom: 8px; }
                .info-section p { margin: 4px 0; font-size: 14px; }
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

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    // This would typically use a library like jsPDF or pdfmake
    console.log("Download PDF for order:", order?.orderNumber);
    alert("PDF download functionality will be implemented with a PDF library");
  };

  if (!order) return null;

  // Calculate totals
  const subtotal = order.items?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
  const tax = subtotal * 0.11; // 11% tax (Indonesian PPN)
  const total = order.totalAmount || subtotal + tax;

  // Get status badge class
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "badge-pending";
      case OrderStatus.PROCESSING:
        return "badge-processing";
      case OrderStatus.IN_STOCK:
        return "badge-ready";
      case OrderStatus.DELIVERED:
        return "badge-delivered";
      case OrderStatus.CANCELLED:
        return "badge-cancelled";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Print Order
          </DialogTitle>
          <DialogDescription>
            Select a template and print or download order {order.orderNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template Selection */}
          <div className="flex items-center gap-4">
            <Label htmlFor="template" className="min-w-[100px]">
              Template:
            </Label>
            <Select value={template} onValueChange={(value) => setTemplate(value as PrintTemplate)}>
              <SelectTrigger id="template" className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Invoice
                  </div>
                </SelectItem>
                <SelectItem value="delivery_note">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Note
                  </div>
                </SelectItem>
                <SelectItem value="packing_slip">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Packing Slip
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Print Preview */}
          <div
            ref={printRef}
            className="bg-card rounded-lg border p-8"
            style={{ minHeight: "600px" }}
          >
            {/* Header */}
            <div className="header mb-8 flex justify-between">
              <div className="company-info">
                <h1 className="text-2xl font-bold">Epidom Foods</h1>
                <p className="text-muted-foreground text-sm">
                  Jl. Industri No. 123, Jakarta 12345
                  <br />
                  Phone: +62 21 1234 5678
                  <br />
                  Email: info@epidom.com
                </p>
              </div>
              <div className="order-info text-right">
                <h2 className="text-xl font-bold">
                  {template === "invoice" && "INVOICE"}
                  {template === "delivery_note" && "DELIVERY NOTE"}
                  {template === "packing_slip" && "PACKING SLIP"}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  <strong>Order #:</strong> {order.orderNumber}
                  <br />
                  <strong>Date:</strong> {formatDate(order.orderDate)}
                  <br />
                  {order.deliveryDate && (
                    <>
                      <strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}
                      <br />
                    </>
                  )}
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Customer & Delivery Information */}
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div className="info-section">
                <h3 className="font-semibold">Bill To:</h3>
                <p>
                  <strong>{order.customerName}</strong>
                  <br />
                  {order.customerEmail && (
                    <>
                      {order.customerEmail}
                      <br />
                    </>
                  )}
                  {order.customerPhone}
                </p>
              </div>
              <div className="info-section">
                <h3 className="font-semibold">Deliver To:</h3>
                <p>
                  {order.deliveryAddress && (
                    <>
                      {order.deliveryAddress}
                      <br />
                    </>
                  )}
                  {order.deliveryCity && order.deliveryPostalCode && (
                    <>
                      {order.deliveryCity}, {order.deliveryPostalCode}
                      <br />
                    </>
                  )}
                  {order.deliveryCountry || "Indonesia"}
                </p>
              </div>
            </div>

            {/* Order Items Table */}
            <table>
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Product</th>
                  {template !== "packing_slip" && <th className="text-right">Unit Price</th>}
                  <th className="text-center">Quantity</th>
                  {template !== "packing_slip" && <th className="text-right">Subtotal</th>}
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => {
                  const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{product?.name || "Unknown Product"}</strong>
                        {product?.sku && (
                          <div className="text-muted-foreground text-xs">SKU: {product.sku}</div>
                        )}
                      </td>
                      {template !== "packing_slip" && (
                        <td className="text-right">{formatCurrency(item.unitPrice)}</td>
                      )}
                      <td className="text-center">
                        {item.quantity} {product?.unit || "pcs"}
                      </td>
                      {template !== "packing_slip" && (
                        <td className="text-right">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Summary (only for invoice) */}
            {template === "invoice" && (
              <div className="summary">
                <div className="summary-row">
                  <span className="summary-label">Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax (11%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="summary-row total">
                  <span className="summary-label">Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                {order.paymentStatus && (
                  <div className="summary-row mt-4">
                    <span className="summary-label">Payment Status:</span>
                    <Badge
                      variant={order.paymentStatus === PaymentStatus.PAID ? "default" : "secondary"}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            {order.notes && (
              <div className="info-section mt-8">
                <h3 className="font-semibold">Notes:</h3>
                <p className="text-muted-foreground text-sm">{order.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="footer">
              <p>
                Thank you for your business!
                <br />
                For questions about this {template.replace("_", " ")}, please contact us at
                info@epidom.com
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
