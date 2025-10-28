"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, Calendar } from "lucide-react";

export default function DashboardFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("week");
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateRange("week");
  };

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || dateRange !== "week";

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders, materials, recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleClearFilters}
                  disabled={!hasActiveFilters}
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                  <span className="font-medium">Search:</span>
                  <span className="text-muted-foreground">{searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 rounded-full hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {statusFilter !== "all" && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                  <span className="font-medium">Status:</span>
                  <span className="text-muted-foreground capitalize">{statusFilter}</span>
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="ml-1 rounded-full hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {dateRange !== "week" && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  <span className="text-muted-foreground capitalize">{dateRange}</span>
                  <button
                    onClick={() => setDateRange("week")}
                    className="ml-1 rounded-full hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

