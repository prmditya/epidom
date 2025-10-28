"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Truck } from "lucide-react";

export default function ScheduleDeliveryDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orderId: "",
    deliveryDate: "",
    deliveryTime: "",
    carrier: "",
    trackingNumber: "",
    driverName: "",
    vehicleNumber: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Delivery Scheduled",
      description: `Delivery for order ${formData.orderId} has been scheduled for ${formData.deliveryDate}.`,
    });

    setFormData({
      orderId: "",
      deliveryDate: "",
      deliveryTime: "",
      carrier: "",
      trackingNumber: "",
      driverName: "",
      vehicleNumber: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Truck className="h-4 w-4" />
          Schedule Delivery
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Delivery</DialogTitle>
          <DialogDescription>Schedule a delivery for an order.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="orderId">Order ID *</Label>
              <Select
                value={formData.orderId}
                onValueChange={(value) => setFormData({ ...formData, orderId: value })}
                required
              >
                <SelectTrigger id="orderId">
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="O-1001">O-1001 - Baguette x50</SelectItem>
                  <SelectItem value="O-1002">O-1002 - Croissant x80</SelectItem>
                  <SelectItem value="O-1003">O-1003 - Pain au chocolat x60</SelectItem>
                  <SelectItem value="O-1004">O-1004 - Brioche x20</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deliveryTime">Delivery Time *</Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="carrier">Carrier/Shipping Company *</Label>
              <Select
                value={formData.carrier}
                onValueChange={(value) => setFormData({ ...formData, carrier: value })}
                required
              >
                <SelectTrigger id="carrier">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="local">Local Delivery</SelectItem>
                  <SelectItem value="own">Own Fleet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
              <Input
                id="trackingNumber"
                placeholder="TRACK123456789"
                value={formData.trackingNumber}
                onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="driverName">Driver Name (Optional)</Label>
                <Input
                  id="driverName"
                  placeholder="John Doe"
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vehicleNumber">Vehicle Number (Optional)</Label>
                <Input
                  id="vehicleNumber"
                  placeholder="VAN-001"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Delivery Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Special delivery instructions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Delivery</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


