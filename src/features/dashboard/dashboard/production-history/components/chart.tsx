import { ProductionHistoryData } from "@/types/entities";
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
} from "recharts";

interface Chart {
  chartData: ProductionHistoryData[];
}

function getMaxYValue(data: ProductionHistoryData[]): number {
  return Math.max(...data.map((d) => d.quantity));
}

export default function Chart({ chartData }: Chart) {
  const maxQty = getMaxYValue(chartData);
  const yAxisDomain = [0, maxQty + 10];

  return (
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
          width={30}
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
          dataKey="quantity"
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
  );
}
