"use client";
import { TrackingToggle } from "@/features/dashboard/tracking/components/tracking-toggle";

type Line = {
  id: string;
  product: string;
  current: string;
  min: string;
  recommended: string;
  toOrder: string;
};
type Supplier = {
  id: string;
  name: string;
  orderRef: string;
  status: "Official order" | "Draft";
  at: string;
  lines: Line[];
};

const suppliers: Supplier[] = [
  {
    id: "S1",
    name: "Seflora",
    orderRef: "PO-2025-001",
    status: "Official order",
    at: "10:05 AM",
    lines: [
      {
        id: "l1",
        product: "Butter",
        current: "10.22 Kg",
        min: "20.0 Kg",
        recommended: "20.5 Kg",
        toOrder: "10.3 Kg",
      },
      {
        id: "l2",
        product: "Chocolate",
        current: "9.15 Kg",
        min: "20.0 Kg",
        recommended: "20.3 Kg",
        toOrder: "11.2 Kg",
      },
    ],
  },
  {
    id: "S2",
    name: "DairyFresh",
    orderRef: "PO-2025-002",
    status: "Draft",
    at: "10:52 AM",
    lines: [
      {
        id: "l1",
        product: "Milk",
        current: "3.50 L",
        min: "10.0 L",
        recommended: "11.0 L",
        toOrder: "7.5 L",
      },
    ],
  },
];

function Qty({ v, critical }: { v: string; critical?: boolean }) {
  return <span className={critical ? "font-medium text-red-600" : "text-foreground"}>{v}</span>;
}

export default function TrackingPage() {
  return <TrackingToggle />;
}
