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
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-5">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800">
            Performance Trend
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Monthly performance tracking and analysis
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "Inter, system-ui, sans-serif" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "Inter, system-ui, sans-serif" }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "0.875rem",
                  padding: "0.5rem 0.75rem"
                }}
                labelStyle={{ fontWeight: 500, color: "#1f2937" }}
                itemStyle={{ color: "#4b5563" }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{
                  fill: "#2563eb",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 4,
                  fillOpacity: 1
                }}
                activeDot={{
                  r: 6,
                  stroke: "#2563eb",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
