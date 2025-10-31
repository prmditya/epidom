"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialsSection } from "@/features/dashboard/data/materials/components/materials-section";
import { RecipesSection } from "../recipes/components/recipes-section";
import { ProductsSection } from "../products/components/products-section";
import { SuppliersSection } from "../suppliers/components/suppliers-section";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_MATERIALS, MOCK_RECIPES, MOCK_PRODUCTS, MOCK_SUPPLIERS } from "@/mocks";

export function DataView() {
  const { t } = useI18n();

  return (
    <Tabs defaultValue="materials" className="grid w-full gap-6">
      <TabsList className="bg-muted/50 -mx-4 w-full justify-start overflow-x-auto rounded-lg p-1.5 px-4 whitespace-nowrap shadow-sm backdrop-blur-sm sm:mx-0 sm:px-1.5">
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="materials"
        >
          {t("pages.materialsList")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="recipes"
        >
          {t("pages.recipesList")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="products"
        >
          {t("pages.productsList")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="suppliers"
        >
          {t("pages.suppliersList")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="materials">
        <MaterialsSection materials={MOCK_MATERIALS} />
      </TabsContent>
      <TabsContent value="recipes">
        <RecipesSection recipes={MOCK_RECIPES} />
      </TabsContent>
      <TabsContent value="products">
        <ProductsSection products={MOCK_PRODUCTS} />
      </TabsContent>
      <TabsContent value="suppliers">
        <SuppliersSection suppliers={MOCK_SUPPLIERS} />
      </TabsContent>
    </Tabs>
  );
}
