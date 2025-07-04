import { Card, CardContent } from "@/components/ui/card";
import type { KpiData } from "@shared/schema";

interface WeeklyPerformanceModernProps {
  data: KpiData;
}

export function WeeklyPerformanceModern({ data }: WeeklyPerformanceModernProps) {
  const weeklyData = data.weeklyData || [];

  const formatDate = (weekNumber: number) => {
    const dates = [
      { from: "03/01/25", to: "06/11/25" },
      { from: "06/11/25", to: "06/18/25" },
      { from: "06/18/25", to: "06/25/25" },
      { from: "06/25/25", to: "06/30/25" }
    ];
    return dates[weekNumber - 1] || { from: "TBD", to: "TBD" };
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Data From</th>
                {weeklyData.map((week) => {
                  const dateRange = formatDate(week.week);
                  return (
                    <th key={week.week} className="text-center py-2 px-3 font-semibold text-gray-700">
                      {dateRange.from}
                    </th>
                  );
                })}
                <th className="text-center py-2 px-3 font-semibold text-gray-700">MTD</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Data To</th>
                {weeklyData.map((week) => {
                  const dateRange = formatDate(week.week);
                  return (
                    <th key={week.week} className="text-center py-2 px-3 font-semibold text-gray-700">
                      {dateRange.to}
                    </th>
                  );
                })}
                <th className="text-center py-2 px-3 font-semibold text-gray-700">06/30/25</th>
              </tr>
              <tr className="bg-blue-600 text-white">
                <th className="text-left py-2 px-3 font-bold">KPI</th>
                {weeklyData.map((week) => (
                  <th key={week.week} className="text-center py-2 px-3 font-bold">
                    Week {week.week}
                  </th>
                ))}
                <th className="text-center py-2 px-3 font-bold">MTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">Presented</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.presented?.toLocaleString() || '0'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">
                  {data.callsPresented?.toLocaleString() || '1,858'}
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">Accepted</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.accepted?.toLocaleString() || '0'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">
                  {data.callsAccepted?.toLocaleString() || '1,857'}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">AHT</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.aht || '0:09:41'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">
                  {data.avgHandleTime || '0:09:57'}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">HOLD</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.hold || '0:01:32'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">
                  {data.avgHoldTime || '0:01:45'}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">QUALITY</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.quality || '-'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">90.34%</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">CSAT</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.csat || '4.35'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold text-blue-600">
                  {data.csatScore || '4.18'}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">COMM</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.comm || '0.00'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold text-orange-600">
                  {data.agentCommunicated || '77'}%
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">Knowledge</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.knowledge || '0.00'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold text-green-600">
                  {data.agentKnowledgeable || '77'}%
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">ACX</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.acx || '0.00'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold text-red-600">
                  {data.acxScore || '78'}%
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-2 px-3 font-medium text-gray-900">Adherence</td>
                {weeklyData.map((week) => (
                  <td key={week.week} className="text-center py-2 px-3">
                    {week.adherence || '-'}
                  </td>
                ))}
                <td className="text-center py-2 px-3 font-semibold">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}