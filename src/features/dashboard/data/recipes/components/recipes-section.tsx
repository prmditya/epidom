"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/components/lang/i18n-provider";
import RecipeDetailsDialog from "./recipe-details-dialog";
import EditRecipeDialog from "./edit-recipe-dialog";
import DuplicateRecipeDialog from "./duplicate-recipe-dialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ExportButton } from "@/components/ui/export-button";
import AddRecipeDialog from "./add-recipe-dialog";
import type { Recipe } from "@/types/entities";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  X,
  CheckSquare,
  ChefHat,
  Clock,
  DollarSign,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDuration } from "@/lib/utils/formatting";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RecipesSectionProps {
  recipes: Recipe[];
}

type SortField = "name" | "time" | "cost" | "yield" | "category";
type SortOrder = "asc" | "desc";

const RECIPE_CATEGORIES = [
  "Bread & Pastries",
  "Cakes & Desserts",
  "Confectionery",
  "Dairy Products",
  "Beverages",
  "Sauces & Condiments",
  "Other",
];

export function RecipesSection({ recipes }: RecipesSectionProps) {
  const { t } = useI18n();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filtered and sorted recipes
  const processedRecipes = useMemo(() => {
    let filtered = recipes;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query) ||
          r.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "time":
          comparison = a.productionTimeMinutes - b.productionTimeMinutes;
          break;
        case "cost":
          comparison = a.costPerBatch - b.costPerBatch;
          break;
        case "yield":
          comparison = a.yieldQuantity - b.yieldQuantity;
          break;
        case "category":
          comparison = (a.category || "").localeCompare(b.category || "");
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [recipes, searchQuery, categoryFilter, sortField, sortOrder]);

  // Bulk selection handlers
  const toggleBulkSelect = () => {
    setBulkSelectMode(!bulkSelectMode);
    setSelectedIds(new Set());
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === processedRecipes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(processedRecipes.map((r) => r.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Action handlers
  const handleView = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setViewDialogOpen(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setEditDialogOpen(true);
  };

  const handleDuplicate = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDuplicateDialogOpen(true);
  };

  const handleDeleteClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: API call to delete recipe
    toast({
      title: "Recipe Deleted",
      description: `${selectedRecipe?.name} has been deleted successfully.`,
    });
    setDeleteDialogOpen(false);
    setSelectedRecipe(null);
  };

  const handleBulkDelete = () => {
    // TODO: API call to bulk delete recipes
    toast({
      title: "Recipes Deleted",
      description: `${selectedIds.size} recipes have been deleted successfully.`,
    });
    setSelectedIds(new Set());
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSortField("name");
    setSortOrder("asc");
  };

  const hasActiveFilters = searchQuery || categoryFilter !== "all";

  // Export columns configuration
  const exportColumns = [
    { key: "name" as const, header: "Name" },
    { key: "category" as const, header: "Category" },
    { key: "yieldQuantity" as const, header: "Yield Quantity" },
    { key: "yieldUnit" as const, header: "Yield Unit" },
    { key: "productionTimeMinutes" as const, header: "Production Time (min)" },
    { key: "costPerBatch" as const, header: "Cost Per Batch" },
  ];

  return (
    <>
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">Recipes</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <ExportButton
                data={processedRecipes}
                filename="recipes"
                columns={exportColumns}
                title="Recipes"
              />
              <AddRecipeDialog />
              {bulkSelectMode && selectedIds.size > 0 && (
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({selectedIds.size})
                </Button>
              )}
              <Button
                variant={bulkSelectMode ? "default" : "outline"}
                size="sm"
                onClick={toggleBulkSelect}
              >
                {bulkSelectMode ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Select
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {RECIPE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={`${sortField}-${sortOrder}`}
                onValueChange={(v) => {
                  const [field, order] = v.split("-") as [SortField, SortOrder];
                  setSortField(field);
                  setSortOrder(order);
                }}
              >
                <SelectTrigger>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="time-asc">Time (Shortest)</SelectItem>
                  <SelectItem value="time-desc">Time (Longest)</SelectItem>
                  <SelectItem value="cost-asc">Cost (Low-High)</SelectItem>
                  <SelectItem value="cost-desc">Cost (High-Low)</SelectItem>
                  <SelectItem value="yield-asc">Yield (Low-High)</SelectItem>
                  <SelectItem value="yield-desc">Yield (High-Low)</SelectItem>
                  <SelectItem value="category-asc">Category (A-Z)</SelectItem>
                  <SelectItem value="category-desc">Category (Z-A)</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Bulk Select All */}
            {bulkSelectMode && (
              <div className="bg-muted/50 flex items-center gap-2 rounded-lg border p-3">
                <Checkbox
                  checked={
                    selectedIds.size === processedRecipes.length && processedRecipes.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm font-medium">
                  Select All ({selectedIds.size} of {processedRecipes.length} selected)
                </span>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground text-sm">
              Showing {processedRecipes.length} of {recipes.length} recipes
            </p>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {processedRecipes.map((recipe) => {
              const isSelected = selectedIds.has(recipe.id);
              const costPerUnit = recipe.costPerBatch / recipe.yieldQuantity;

              return (
                <div
                  key={recipe.id}
                  className={`group bg-card relative rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
                    isSelected ? "ring-primary ring-2" : ""
                  }`}
                >
                  {/* Bulk Select Checkbox */}
                  {bulkSelectMode && (
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectItem(recipe.id)}
                      />
                    </div>
                  )}

                  {/* Recipe Content */}
                  <div className={bulkSelectMode ? "pl-6" : ""}>
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="line-clamp-2 text-sm leading-tight font-semibold">
                          {recipe.name}
                        </h3>
                        {recipe.category && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {recipe.category}
                          </Badge>
                        )}
                      </div>
                      <div className="bg-primary/10 ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <ChefHat className="text-primary h-5 w-5" />
                      </div>
                    </div>

                    {recipe.description && (
                      <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                        {recipe.description}
                      </p>
                    )}

                    {/* Recipe Metrics */}
                    <div className="space-y-2">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <ChefHat className="h-3 w-3" />
                        <span>
                          Yield: {recipe.yieldQuantity} {recipe.yieldUnit}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{formatDuration(recipe.productionTimeMinutes)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <div className="flex-1">
                          <span className="text-foreground font-medium">
                            {formatCurrency(recipe.costPerBatch)}
                          </span>
                          <span className="text-muted-foreground"> per batch</span>
                        </div>
                      </div>
                      <div className="bg-muted rounded px-2 py-1 text-xs">
                        <span className="text-muted-foreground">Per unit: </span>
                        <span className="text-foreground font-semibold">
                          {formatCurrency(costPerUnit)}
                        </span>
                      </div>
                    </div>

                    {/* Ingredients Count */}
                    <div className="text-muted-foreground mt-3 text-xs">
                      {recipe.ingredients.length} ingredient
                      {recipe.ingredients.length !== 1 ? "s" : ""}
                    </div>

                    {/* Hover Actions */}
                    {!bulkSelectMode && (
                      <div className="mt-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-full text-xs"
                              onClick={() => handleView(recipe)}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Recipe</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-full flex-1 text-xs"
                              onClick={() => handleEdit(recipe)}
                            >
                              <Pencil className="mr-1 h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Recipe</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-full flex-1 text-xs"
                              onClick={() => handleDuplicate(recipe)}
                            >
                              <Copy className="mr-1 h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Duplicate Recipe</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive bg-destructive/10 hover:bg-destructive/30 h-8 w-full flex-1 text-xs"
                              onClick={() => handleDeleteClick(recipe)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Recipe</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {processedRecipes.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <ChefHat className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <p className="text-muted-foreground">
                  {hasActiveFilters ? "No recipes match your filters" : "No recipes found"}
                </p>
                {hasActiveFilters && (
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedRecipe && (
        <>
          <RecipeDetailsDialog
            recipe={selectedRecipe}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
            onEdit={(recipe) => {
              setViewDialogOpen(false);
              handleEdit(recipe);
            }}
            onDelete={(recipeId) => {
              setViewDialogOpen(false);
              handleDeleteClick(selectedRecipe);
            }}
          />
          <EditRecipeDialog
            recipe={selectedRecipe}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
          <DuplicateRecipeDialog
            recipe={selectedRecipe}
            open={duplicateDialogOpen}
            onOpenChange={setDuplicateDialogOpen}
          />
        </>
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Recipe"
        description={`Are you sure you want to delete "${selectedRecipe?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
