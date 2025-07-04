import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { KpiData } from "@shared/schema";

interface PerformanceChartProps {
  data: KpiData;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = [
    { month: "Jan", performance: 85 },
    { month: "Feb", performance: 82 },
    { month: "Mar", performance: 78 },
    { month: "Apr", performance: 75 },
    { month: "May", performance: 72 },
    { month: "Jun", performance: 70 },
    { month: "Jul", performance: 68 },
    { month: "Aug", performance: 70 },
    { month: "Sep", performance: 72 },
    { month: "Oct", performance: 68 },
    { month: "Nov", performance: 65 },
    { month: "Dec", performance: 62 },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Performancwe Trend
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Monthly performance tracking
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="hsl(221, 83%, 53%)"
                strokeWidth={2}
                dot={{ fill: "hsl(221, 83%, 53%)", strokeWidth: 0, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "hsl(221, 83%, 53%)",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
