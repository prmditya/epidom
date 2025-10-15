"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataManageView } from "@/components/epidom/data-manage"
import { useI18n } from "@/components/epidom/i18n-provider"

type Item = { id: string; name: string; note?: string }

const materials: Item[] = [
  { id: "MAT-01", name: "Flour T55" },
  { id: "MAT-02", name: "Butter AOP" },
  { id: "MAT-03", name: "Sugar" },
  { id: "MAT-04", name: "Almonds" },
  { id: "MAT-05", name: "Yeast" },
  { id: "MAT-06", name: "Eggs" },
]
const recipes: Item[] = [
  { id: "REC-01", name: "Baguette Tradition" },
  { id: "REC-02", name: "Croissant" },
  { id: "REC-03", name: "Brioche" },
]
const products: Item[] = [
  { id: "PRO-01", name: "Baguette" },
  { id: "PRO-02", name: "Croissant" },
  { id: "PRO-03", name: "Pain au chocolat" },
]
const suppliers: Item[] = [
  { id: "SUP-01", name: "Grain&Co", note: "Flour supplier" },
  { id: "SUP-02", name: "DairyFresh", note: "Butter" },
]

function PillsList({
  items,
  onSelect,
  selectedId,
}: {
  items: Item[]
  onSelect: (id: string) => void
  selectedId?: string
}) {
  const { t } = useI18n()
  const [query, setQuery] = useState("")
  const filtered = useMemo(
    () => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={t("actions.searchByName")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-56"
        />
        <div className="flex items-center gap-2">
          <Button variant="secondary">{t("actions.note")}</Button>
          <Button>{t("actions.addMaterial")}</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((i) => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm text-left transition-all shadow-sm hover:shadow-md ${
              selectedId === i.id
                ? "bg-primary/10 border-primary/50 font-semibold ring-2 ring-primary/20"
                : "bg-card hover:bg-muted/60 hover:border-muted-foreground/30"
            }`}
          >
            {i.name}
          </button>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-sm text-muted-foreground text-center py-4">{t("messages.noResults")}</p>}
      </div>
    </div>
  )
}

function DetailsPanel({ item }: { item?: Item }) {
  const { t } = useI18n()
  return (
    <Card className="lg:sticky lg:top-[5rem] shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{item?.name ?? t("pages.ingredient")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent">
          <div className="size-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0" aria-hidden>
            <span className="text-lg font-bold text-primary">{item?.name?.[0] ?? "?"}</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase">{t("pages.productSheet")}</div>
            <div className="text-sm font-medium mt-1">{t("data.productDesignation")}: {item?.name ?? "—"}</div>
          </div>
        </div>
        <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 space-y-2">
          <div className="text-sm font-bold text-foreground">{t("pages.supplier")}</div>
          <div className="text-sm text-muted-foreground"><span className="font-medium">{t("data.supplierName")}:</span> {item?.note ?? "Example Supplier"}</div>
          <div className="text-sm text-muted-foreground"><span className="font-medium">{t("data.supplierEmail")}:</span> supplier@example.com</div>
          <div className="text-sm text-muted-foreground"><span className="font-medium">{t("data.supplierPhone")}:</span> +33 01 23 45 67 89</div>
        </div>
        <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 space-y-2">
          <div className="text-sm font-bold text-foreground">{t("pages.stockSheet")}</div>
          <div className="text-sm text-muted-foreground"><span className="font-medium">{t("pages.inStock")}:</span> 120.0 Kg</div>
          <div className="text-sm text-muted-foreground"><span className="font-medium">{t("pages.avgPrice")}:</span> €3.60</div>
        </div>
        <div className="text-sm font-semibold text-muted-foreground">{t("pages.history")}</div>
      </CardContent>
    </Card>
  )
}

function Section({ items, label }: { items: Item[]; label: string }) {
  const [selected, setSelected] = useState<string | undefined>(items[0]?.id)
  const selectedItem = items.find((i) => i.id === selected)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px] w-full">
      <Card className="shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <PillsList items={items} onSelect={setSelected} selectedId={selected} />
        </CardContent>
      </Card>
      <DetailsPanel item={selectedItem} />
    </div>
  )
}

export default function DataPage() {
  const { t } = useI18n()
  return (
    <div className="grid gap-6 w-full overflow-hidden">
      <Tabs defaultValue="materials">
        <TabsList className="w-full justify-start overflow-x-auto whitespace-nowrap rounded-lg p-1.5 bg-muted/50 backdrop-blur-sm shadow-sm -mx-4 px-4 sm:mx-0 sm:px-1.5">
          <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="materials">
            {t("pages.materialsList")}
          </TabsTrigger>
          <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="recipes">
            {t("pages.recipesList")}
          </TabsTrigger>
          <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="products">
            {t("pages.productsList")}
          </TabsTrigger>
          <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="suppliers">
            {t("pages.suppliersList")}
          </TabsTrigger>
          <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="manage">
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
    </div>
  )
}
