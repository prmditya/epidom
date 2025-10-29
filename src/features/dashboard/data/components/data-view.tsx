"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataManageView } from "./data-manage";
import { Section } from "./section";
import { MaterialsSection } from "./materials-section";
import { RecipesSection } from "../recipes/components/recipes-section";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_MATERIALS, MOCK_RECIPES, MOCK_PRODUCTS, MOCK_SUPPLIERS } from "@/mocks";

export function DataView() {
  const { t } = useI18n();

  return (
    <Tabs defaultValue="materials" className="grid w-full gap-6 overflow-hidden">
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
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="manage"
        >
          {t("pages.manageData")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="materials">
        <MaterialsSection materials={MOCK_MATERIALS} />
      </TabsContent>
      <TabsContent value="recipes">
        <RecipesSection recipes={MOCK_RECIPES} />
      </TabsContent>
      <TabsContent value="products">
        <Section items={MOCK_PRODUCTS} label={t("data.products")} />
      </TabsContent>
      <TabsContent value="suppliers">
        <Section items={MOCK_SUPPLIERS} label={t("data.suppliers")} />
      </TabsContent>
      <TabsContent value="manage">
        <DataManageView />
      </TabsContent>
    </Tabs>
  );
}
