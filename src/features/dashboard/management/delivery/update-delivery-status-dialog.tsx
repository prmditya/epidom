"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang/i18n-provider";
import { SupplierDelivery, SupplierDeliveryStatus } from "@/types/entities";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/utils/formatting";
import { CalendarIcon } from "lucide-react";

interface UpdateDeliveryStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: SupplierDelivery | null;
}

export default function UpdateDeliveryStatusDialog({
  open,
  onOpenChange,
  delivery,
}: UpdateDeliveryStatusDialogProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [receivedDate, setReceivedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (delivery) {
      setNewStatus("");
      setNotes("");
      setReceivedDate(undefined);
    }
  }, [delivery]);

  const getAvailableStatuses = () => {
    if (!delivery) return [];

    const currentStatus = delivery.status;
    const statuses = [];

    // Define valid status transitions
    if (currentStatus === SupplierDeliveryStatus.PENDING) {
      statuses.push(
        { value: SupplierDeliveryStatus.IN_TRANSIT, label: "In Transit" },
        { value: SupplierDeliveryStatus.RECEIVED, label: "Received" },
        { value: SupplierDeliveryStatus.CANCELLED, label: "Cancelled" }
      );
    } else if (currentStatus === SupplierDeliveryStatus.IN_TRANSIT) {
      statuses.push(
        { value: SupplierDeliveryStatus.RECEIVED, label: "Received" },
        { value: SupplierDeliveryStatus.CANCELLED, label: "Cancelled" }
      );
    }

    return statuses;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newStatus) {
      toast({
        title: "Validation Error",
        description: "Please select a new status",
        variant: "destructive",
      });
      return;
    }

    if (newStatus === SupplierDeliveryStatus.RECEIVED && !receivedDate) {
      toast({
        title: "Validation Error",
        description: "Please select a received date",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // TODO: API call to update delivery status
    // await updateDeliveryStatus(delivery.id, { status: newStatus, notes, receivedDate });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Status Updated",
        description: `Delivery status has been updated to ${newStatus}`,
      });
      onOpenChange(false);
    }, 1000);
  };

  const availableStatuses = getAvailableStatuses();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Delivery Status</DialogTitle>
          <DialogDescription>
            Change the status of delivery {delivery?.deliveryReference}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Status */}
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div>
              <Badge variant="secondary">{delivery?.status}</Badge>
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <Label htmlFor="status">New Status *</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Received Date (only if status is RECEIVED) */}
          {newStatus === SupplierDeliveryStatus.RECEIVED && (
            <div className="space-y-2">
              <Label htmlFor="receivedDate">Received Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="receivedDate"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {receivedDate ? formatDate(receivedDate) : "Select received date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={receivedDate}
                    onSelect={setReceivedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || availableStatuses.length === 0}>
              {isSubmitting ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
