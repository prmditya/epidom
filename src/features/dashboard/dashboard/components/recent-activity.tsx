"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Activity {
  id: string;
  type: "order" | "stock" | "delivery" | "alert";
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error";
}

const activities: Activity[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Created",
    description: "Order #ORD-1205 for 90x Baguette",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    type: "stock",
    title: "Stock Updated",
    description: "Flour stock increased by 500kg",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: "3",
    type: "delivery",
    title: "Delivery Completed",
    description: "Order #ORD-1198 delivered to Café Mozart",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "4",
    type: "alert",
    title: "Low Stock Alert",
    description: "Butter stock below minimum level",
    timestamp: "2 hours ago",
    status: "warning",
  },
  {
    id: "5",
    type: "order",
    title: "Order Completed",
    description: "Order #ORD-1195 marked as complete",
    timestamp: "3 hours ago",
    status: "success",
  },
  {
    id: "6",
    type: "stock",
    title: "Stock Adjustment",
    description: "Sugar stock reduced by 20kg",
    timestamp: "4 hours ago",
  },
];

export default function RecentActivity() {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "stock":
        return <Package className="h-4 w-4" />;
      case "delivery":
        return <CheckCircle className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: Activity["status"]) => {
    switch (status) {
      case "success":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950";
      case "warning":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950";
      case "error":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950";
      default:
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950";
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription className="text-xs">Latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[350px] overflow-y-auto pr-2">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="hover:bg-muted/50 flex gap-3 rounded-lg border p-3 transition-colors"
              >
                <div className={`rounded-full p-2 ${getStatusColor(activity.status)}`}>
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-none font-medium">{activity.title}</p>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
