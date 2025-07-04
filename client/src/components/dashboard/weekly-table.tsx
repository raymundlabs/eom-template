import { Card, CardContent } from "@/components/ui/card";
import type { KpiData } from "@shared/schema";

interface WeeklyTableProps {
  data: KpiData;
}

export function WeeklyTable({ data }: WeeklyTableProps) {
  const weeklyData = data.weeklyData || [];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Performance Trends
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Track performance metrics across weeks
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Presented</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Accepted</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">AHT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hold</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Quality</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">CSAT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">COMM</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Knowledge</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ACX</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Adherence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {weeklyData.length > 0 ? (
                weeklyData.map((week, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 font-medium">Week {week.week}</td>
                    <td className="py-3 px-4">{week.presented}</td>
                    <td className="py-3 px-4">{week.accepted}</td>
                    <td className="py-3 px-4">{week.aht}</td>
                    <td className="py-3 px-4">{week.hold}</td>
                    <td className="py-3 px-4">{week.quality || "-"}</td>
                    <td className="py-3 px-4">{week.csat}</td>
                    <td className="py-3 px-4">{week.comm}</td>
                    <td className="py-3 px-4">{week.knowledge}</td>
                    <td className="py-3 px-4">{week.acx}</td>
                    <td className="py-3 px-4">{week.adherence || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    No weekly data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
