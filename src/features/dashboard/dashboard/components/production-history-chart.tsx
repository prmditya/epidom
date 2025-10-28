"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ProductionHistoryChartProps {
  chartData: { date: string; qty: number }[];
}

function getMaxYValue(data: { date: string; qty: number }[]): number {
  return Math.max(...data.map((d) => d.qty));
}

export default function ProductionHistoryChart({ chartData }: ProductionHistoryChartProps) {
  const { t } = useI18n();

  // Get max value from chart data and add 10
  const maxQty = getMaxYValue(chartData);
  const yAxisDomain = [0, maxQty + 10];
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.prodHistory")}</CardTitle>
        <CardDescription className="text-xs">{t("pages.prodHistoryDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="-mx-2 h-64 sm:mx-0 sm:h-72">
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
              dot={{
                r: 5,
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                stroke: "hsl(var(--card))",
              }}
              activeDot={{ r: 7, fill: "hsl(var(--primary))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
