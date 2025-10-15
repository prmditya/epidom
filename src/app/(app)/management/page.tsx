"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RecipeProductionCard } from "@/components/epidom/management/recipe-production"
import { ProductionHistoryCard } from "@/components/epidom/management/production-history"
import { EditStockCard } from "@/components/epidom/management/edit-stock"
import { useI18n } from "@/components/epidom/i18n-provider"

type Order = { id: string; name: string; date: string; status: "Pending" | "Processing" | "Delivered" }
type UserRow = { id: string; email: string; role: "Admin" | "Manager" | "Viewer" }

const orders: Order[] = [
  { id: "O-1001", name: "Baguette x50", date: "2025-10-15", status: "Pending" },
  { id: "O-1002", name: "Croissant x80", date: "2025-10-15", status: "Processing" },
  { id: "O-1003", name: "Pain au chocolat x60", date: "2025-10-16", status: "Pending" },
  { id: "O-1004", name: "Brioche x20", date: "2025-10-16", status: "Delivered" },
]

const users: UserRow[] = [
  { id: "U-1", email: "addressemail@gmail.com", role: "Admin" },
  { id: "U-2", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-3", email: "addressemail@gmail.com", role: "Manager" },
  { id: "U-4", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-5", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-6", email: "addressemail@gmail.com", role: "Viewer" },
]

export default function ManagementPage() {
  const [selected, setSelected] = useState<Order | null>(orders[0])
  const [query, setQuery] = useState("")
  const { t } = useI18n()

  const filteredUsers = users.filter((u) => u.email.toLowerCase().includes(query.toLowerCase()))

  return (
    <Tabs defaultValue="delivery" className="grid gap-6 w-full overflow-hidden">
      <TabsList className="w-full justify-start overflow-x-auto whitespace-nowrap rounded-lg p-1.5 bg-muted/50 backdrop-blur-sm shadow-sm -mx-4 px-4 sm:mx-0 sm:px-1.5">
        <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="delivery">
          {t("tabs.delivery")}
        </TabsTrigger>
        <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="recipe">
          {t("tabs.recipeProduction")}
        </TabsTrigger>
        <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="history">
          {t("tabs.productionHistory")}
        </TabsTrigger>
        <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="stock">
          {t("tabs.editStock")}
        </TabsTrigger>
        <TabsTrigger className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all" value="permissions">
          {t("tabs.managePermissions")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="delivery" className="grid gap-4 lg:grid-cols-3 w-full">
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{t("pages.ordersSectionTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input placeholder={t("actions.searchPlaceholder")} className="w-full sm:max-w-sm" />
              <Button variant="secondary">{t("actions.filter")}</Button>
            </div>
            <div className="overflow-x-auto rounded-md -mx-4 sm:mx-0">
              <div className="min-w-[560px] px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("tables.name")}</TableHead>
                      <TableHead>{t("tables.date")}</TableHead>
                      <TableHead>{t("tables.status")}</TableHead>
                      <TableHead className="text-right">{t("tables.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id} onClick={() => setSelected(o)} className="cursor-pointer">
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell>{o.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{o.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-sm text-primary underline underline-offset-4">
                          {t("actions.details")}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{t("pages.orderDetails")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selected ? (
              <>
                <div className="grid gap-1">
                  <p className="text-sm text-muted-foreground">{t("labels.orderId")}</p>
                  <p className="font-medium">{selected.id}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-muted-foreground">{t("tables.name")}</p>
                  <p className="font-medium">{selected.name}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-muted-foreground">{t("tables.date")}</p>
                  <p className="font-medium">{selected.date}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm text-muted-foreground">{t("tables.status")}</p>
                  <p className="font-medium">{selected.status}</p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button size="sm">{t("actions.markProcessing")}</Button>
                  <Button size="sm" variant="secondary">
                    {t("actions.markDelivered")}
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("messages.selectOrder")}</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recipe">
        <RecipeProductionCard />
      </TabsContent>

      <TabsContent value="history">
        <ProductionHistoryCard />
      </TabsContent>

      <TabsContent value="stock">
        <EditStockCard />
      </TabsContent>

      <TabsContent value="permissions" className="w-full">
        <Card className="shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{t("pages.usersList")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("actions.searchByEmail")}
                className="w-full sm:max-w-xs"
              />
              <Button variant="secondary">{t("actions.invite")}</Button>
            </div>
            <div className="overflow-x-auto rounded-md -mx-4 sm:mx-0">
              <div className="min-w-[520px] px-4 sm:px-0">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("tables.email")}</TableHead>
                    <TableHead>{t("tables.role")}</TableHead>
                    <TableHead className="text-right">{t("tables.action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="secondary">
                          {t("actions.manage")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
