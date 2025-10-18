"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrackingViewActive } from "./tracking-view-active";
import { TrackingViewOrders } from "./tracking-view-orders";

type View = "active" | "orders";

export function TrackingToggle() {
  const [view, setView] = useState<View>("active");

  // Allow deep-linking with ?view=orders
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.get("view") === "orders") setView("orders");
  }, []);

  const switchTo = (v: View) => {
    setView(v);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (v === "orders") url.searchParams.set("view", "orders");
      else url.searchParams.delete("view");
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        {view === "active" ? (
          <Button onClick={() => switchTo("orders")} className="rounded-full">
            Orders to place
          </Button>
        ) : (
          <Button
            onClick={() => switchTo("active")}
            variant="secondary"
            className="rounded-full"
          >
            Back to tracking
          </Button>
        )}
      </div>
      {view === "active" ? <TrackingViewActive /> : <TrackingViewOrders />}
    </div>
  );
}

export default TrackingToggle;
