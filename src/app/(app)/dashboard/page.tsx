"use client"

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useI18n } from "@/components/epidom/i18n-provider"

const chartData = [
  { date: "Mon", qty: 120 },
  { date: "Tue", qty: 180 },
  { date: "Wed", qty: 160 },
  { date: "Thu", qty: 220 },
  { date: "Fri", qty: 190 },
  { date: "Sat", qty: 240 },
  { date: "Sun", qty: 200 },
]

// Get max value from chart data and add 10
const maxQty = Math.max(...chartData.map((d) => d.qty))
const yAxisDomain = [0, maxQty + 10]

const orders = [
  { id: "ORD-1201", name: "Baguette x120", date: "2025-10-15", status: "Processing" },
  { id: "ORD-1202", name: "Croissant x80", date: "2025-10-15", status: "In stock" },
  { id: "ORD-1203", name: "Pain de mie x60", date: "2025-10-16", status: "Pending" },
]

export default function DashboardPage() {
  const { t } = useI18n()

  return (
    <div className="grid gap-6 w-full overflow-hidden">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("pages.stockLevel")}</CardTitle>
            <CardDescription className="text-xs">{t("pages.stockUtil")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Progress value={72} aria-label={`${t("chart.stockUtilization")} 72%`} className="h-2" />
              <p className="text-sm font-medium text-muted-foreground">72% {t("chart.percentUsed")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("pages.ordersPending")}</CardTitle>
            <CardDescription className="text-xs">{t("chart.openOrders")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">8</div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">{t("chart.plusToday")}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("pages.activeRecipes")}</CardTitle>
            <CardDescription className="text-xs">{t("chart.recipesUsedWeek")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">34</div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">{t("chart.upFromLastWeek")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 w-full">
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("pages.prodHistory")}</CardTitle>
            <CardDescription className="text-xs">{t("pages.prodHistoryDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="h-64 sm:h-72 -mx-2 sm:mx-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                <defs>
                  <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="gray"
                  strokeWidth={1}
                  opacity={0.5}
                  strokeDasharray="5"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  stroke="gray"
                />
                <YAxis
                  domain={yAxisDomain}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  stroke="gray"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="qty"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorQty)"
                  dot={{ r: 5, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--card))" }}
                  activeDot={{ r: 7, fill: "hsl(var(--primary))" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("pages.trackingStatus")}</CardTitle>
            <CardDescription className="text-xs">{t("chart.currentWorkflow")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-emerald-700 dark:text-emerald-400">{t("pages.inStock")}</span>
                <span className="text-emerald-700 dark:text-emerald-400">55%</span>
              </div>
              <Progress value={55} className="h-2 [&>div]:bg-emerald-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-amber-700 dark:text-amber-400">{t("pages.processing")}</span>
                <span className="text-amber-700 dark:text-amber-400">28%</span>
              </div>
              <Progress value={28} className="h-2 [&>div]:bg-amber-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-blue-700 dark:text-blue-400">{t("pages.delivered")}</span>
                <span className="text-blue-700 dark:text-blue-400">17%</span>
              </div>
              <Progress value={17} className="h-2 [&>div]:bg-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("pages.ordersToPrepare")}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[600px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">{t("tables.order")}</TableHead>
                  <TableHead className="font-semibold">{t("tables.date")}</TableHead>
                  <TableHead className="font-semibold">{t("tables.status")}</TableHead>
                  <TableHead className="text-right font-semibold">{t("tables.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell className="text-muted-foreground">{o.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium">{t("actions.view")}</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
