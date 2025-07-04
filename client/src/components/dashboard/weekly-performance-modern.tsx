import { Card, CardContent } from "@/components/ui/card";
import type { KpiData } from "@shared/schema";

interface WeeklyPerformanceModernProps {
  data: KpiData;
}

export function WeeklyPerformanceModern({ data }: WeeklyPerformanceModernProps) {
  const weeklyData = data.weeklyData || [];
  
  const metrics = [
    { key: 'presented', label: 'Presented', color: 'bg-purple text-white' },
    { key: 'accepted', label: 'Accepted', color: 'bg-blue text-white' },
    { key: 'aht', label: 'AHT', color: 'bg-teal text-white' },
    { key: 'hold', label: 'Hold', color: 'bg-orange text-white' },
    { key: 'quality', label: 'Quality (%)', color: 'bg-success text-white' },
    { key: 'csat', label: 'CSAT (%)', color: 'bg-info text-white' },
    { key: 'comm', label: 'COMM (%)', color: 'bg-warning text-white' },
    { key: 'knowledge', label: 'Knowledge (%)', color: 'bg-indigo text-white' },
    { key: 'acx', label: 'ACX (%)', color: 'bg-danger text-white' },
    { key: 'adherence', label: 'Adherence', color: 'bg-pink text-white' },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Weekly Performance Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Track performance metrics across weeks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {weeklyData.length > 0 ? (
            weeklyData.map((week, weekIndex) => (
              <Card key={weekIndex} className="bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-lg font-bold mb-2">
                      {week.week}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Week {week.week}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {metrics.map((metric) => {
                      const value = week[metric.key as keyof typeof week];
                      const displayValue = value === 0 || value === '' || value === null || value === undefined 
                        ? '-' 
                        : typeof value === 'number' && metric.key !== 'presented' && metric.key !== 'accepted'
                        ? `${value}%`
                        : value?.toString() || '-';
                      
                      return (
                        <div key={metric.key} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{displayValue}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No weekly data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}