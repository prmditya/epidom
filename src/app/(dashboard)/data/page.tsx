"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataManageView } from "@/features/dashboard/data/components/data-manage";
import { Section } from "@/features/dashboard/data/components/section";
import { useI18n } from "@/components/lang/i18n-provider";

type Item = { id: string; name: string; note?: string };

const materials: Item[] = [
  { id: "MAT-01", name: "Flour T55" },
  { id: "MAT-02", name: "Butter AOP" },
  { id: "MAT-03", name: "Sugar" },
  { id: "MAT-04", name: "Almonds" },
  { id: "MAT-05", name: "Yeast" },
  { id: "MAT-06", name: "Eggs" },
];
const recipes: Item[] = [
  { id: "REC-01", name: "Baguette Tradition" },
  { id: "REC-02", name: "Croissant" },
  { id: "REC-03", name: "Brioche" },
];
const products: Item[] = [
  { id: "PRO-01", name: "Baguette" },
  { id: "PRO-02", name: "Croissant" },
  { id: "PRO-03", name: "Pain au chocolat" },
];
const suppliers: Item[] = [
  { id: "SUP-01", name: "Grain&Co", note: "Flour supplier" },
  { id: "SUP-02", name: "DairyFresh", note: "Butter" },
];

export default function DataPage() {
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
        <Section items={materials} label={t("data.materials")} />
      </TabsContent>
      <TabsContent value="recipes">
        <Section items={recipes} label={t("data.recipes")} />
      </TabsContent>
      <TabsContent value="products">
        <Section items={products} label={t("data.products")} />
      </TabsContent>
      <TabsContent value="suppliers">
        <Section items={suppliers} label={t("data.suppliers")} />
      </TabsContent>
      <TabsContent value="manage">
        <DataManageView />
      </TabsContent>
    </Tabs>
  );
}
