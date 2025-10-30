"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_RECIPES,
  MOCK_PRODUCTION_BATCHES,
  MOCK_MATERIALS,
  MOCK_RECIPE_INGREDIENTS,
} from "@/mocks";
import {
  Search,
  PlayCircle,
  Clock,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChefHat,
} from "lucide-react";
import { ProductionBatch, Recipe } from "@/types/entities";
import { StartProductionDialog } from "./start-production-dialog";
import { ProductionBatchCard } from "./production-batch-card";
import { MaterialAvailabilityCheck } from "./material-availability-check";
import { formatCurrency } from "@/lib/utils/formatting";

export function RecipeProductionCard() {
  const { t } = useI18n();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);

  // Filter recipes based on search
  const filteredRecipes = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return MOCK_RECIPES.filter(
      (recipe: Recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Get active batches for selected recipe
  const activeBatches = useMemo(() => {
    if (!selectedRecipe) return [];
    return MOCK_PRODUCTION_BATCHES.filter(
      (batch) =>
        batch.recipeId === selectedRecipe.id &&
        (batch.status === "pending" ||
          batch.status === "in_progress" ||
          batch.status === "quality_check")
    );
  }, [selectedRecipe]);

  // Get recipe ingredients with current stock availability
  const recipeIngredients = useMemo(() => {
    if (!selectedRecipe) return [];

    const ingredients = MOCK_RECIPE_INGREDIENTS.filter((ri) => ri.recipeId === selectedRecipe.id);

    return ingredients
      .map((ingredient) => {
        const material = MOCK_MATERIALS.find((m) => m.id === ingredient.materialId);
        if (!material) return null;

        const required = ingredient.quantity;
        const available = material.currentStock;
        const status: "sufficient" | "low" | "insufficient" =
          available >= required
            ? "sufficient"
            : available >= required * 0.5
              ? "low"
              : "insufficient";

        return {
          materialId: material.id,
          materialName: material.name,
          required,
          available,
          unit: material.unit,
          status,
        };
      })
      .filter(Boolean);
  }, [selectedRecipe]);

  // Check if production can start (all materials sufficient)
  const canStartProduction = useMemo(() => {
    if (!selectedRecipe || recipeIngredients.length === 0) return false;
    return recipeIngredients.every((ing) => ing!.status !== "insufficient");
  }, [selectedRecipe, recipeIngredients]);

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Bread: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      Pastry: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
      Cake: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("tabs.recipeProduction")}
        </h2>
        <p className="text-muted-foreground">{t("management.recipeProduction.description")}</p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">
        {/* Left Column: Recipe List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t("management.recipeProduction.availableRecipes")}
            </CardTitle>
            <CardDescription>
              {t("management.recipeProduction.selectRecipeToStart")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={t("management.recipeProduction.searchRecipes")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Recipe List */}
            <div className="max-h-[600px] space-y-2 overflow-y-auto pr-2">
              {filteredRecipes.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  {t("management.recipeProduction.noRecipesFound")}
                </p>
              ) : (
                filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedRecipe?.id === recipe.id
                        ? "bg-primary/5 border-primary"
                        : "bg-card hover:bg-muted/50 border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <ChefHat className="text-muted-foreground h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{recipe.name}</p>
                        <p className="text-muted-foreground truncate text-sm">
                          {recipe.description}
                        </p>
                        <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {recipe.yieldQuantity} {recipe.yieldUnit}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.productionTimeMinutes} min
                          </span>
                        </div>
                        <Badge className={`mt-2 ${getCategoryColor(recipe.category)}`}>
                          {recipe.category}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Recipe Details */}
        {selectedRecipe ? (
          <div className="space-y-4">
            {/* Recipe Information */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedRecipe.name}</CardTitle>
                    <CardDescription>{selectedRecipe.description}</CardDescription>
                  </div>
                  <Badge className={getCategoryColor(selectedRecipe.category)}>
                    {selectedRecipe.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {t("management.recipeProduction.yield")}
                    </p>
                    <p className="text-2xl font-bold">{selectedRecipe.yieldQuantity}</p>
                    <p className="text-muted-foreground text-sm">{selectedRecipe.yieldUnit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {t("management.recipeProduction.productionTime")}
                    </p>
                    <p className="text-2xl font-bold">{selectedRecipe.productionTimeMinutes}</p>
                    <p className="text-muted-foreground text-sm">
                      {t("management.recipeProduction.minutes")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {t("management.recipeProduction.costPerBatch")}
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(selectedRecipe.costPerBatch)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {t("management.recipeProduction.costPerUnit")}
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(selectedRecipe.costPerUnit)}
                    </p>
                  </div>
                </div>

                {/* Start Production Button */}
                <div className="mt-6">
                  <Button
                    onClick={() => setIsStartDialogOpen(true)}
                    disabled={!canStartProduction}
                    className="w-full"
                    size="lg"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    {t("management.recipeProduction.startProduction")}
                  </Button>
                  {!canStartProduction && (
                    <p className="text-destructive mt-2 flex items-center gap-1 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {t("management.recipeProduction.insufficientMaterials")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Material Availability Check */}
            <MaterialAvailabilityCheck
              ingredients={recipeIngredients}
              recipeName={selectedRecipe.name}
            />

            {/* Active Batches */}
            {activeBatches.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("management.recipeProduction.activeBatches")}
                  </CardTitle>
                  <CardDescription>
                    {t("management.recipeProduction.activeBatchesDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeBatches.map((batch) => (
                    <ProductionBatchCard key={batch.id} batch={batch} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="flex h-[400px] items-center justify-center">
            <CardContent>
              <div className="text-muted-foreground text-center">
                <ChefHat className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p className="text-lg font-medium">
                  {t("management.recipeProduction.selectRecipe")}
                </p>
                <p className="mt-2 text-sm">{t("management.recipeProduction.selectRecipeHint")}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Start Production Dialog */}
      {selectedRecipe && (
        <StartProductionDialog
          open={isStartDialogOpen}
          onOpenChange={setIsStartDialogOpen}
          recipe={selectedRecipe}
          availableIngredients={recipeIngredients}
        />
      )}
    </div>
  );
}
