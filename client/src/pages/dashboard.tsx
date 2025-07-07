import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KpiForm } from "@/components/forms/kpi-form";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { WeeklyPerformanceModern } from "@/components/dashboard/weekly-performance-modern";
import { ExperienceSatisfaction } from "@/components/dashboard/experience-satisfaction";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { BarChart3, FileText, Download } from "lucide-react";
import type { KpiData } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"form" | "dashboard">("form");
  const [dashboardData, setDashboardData] = useState<KpiData | null>(null);

  const handleDataUpdate = (data: KpiData) => {
    setDashboardData(data);
    setActiveView("dashboard");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-[14px] p-3 flex items-center justify-center">
      {/* Compact 16:9 Container - No Scroll */}
      <div className="w-[1400px] mx-auto">
        <div className="relative w-full bg-white rounded-xl shadow-2xl border-3 border-blue-300 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {/* Compact Header */}
          <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-2 h-10 flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg font-bold">
                  Call Center Operations Dashboard
                </h1>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={activeView === "form" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("form")}
                  className="flex items-center space-x-1 text-xs px-3 py-1 h-6"
                >
                  <FileText className="w-3 h-3" />
                  <span>Data Input</span>
                </Button>
                <Button
                  variant={activeView === "dashboard" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("dashboard")}
                  className="flex items-center space-x-1 text-xs px-3 py-1 h-6"
                  disabled={!dashboardData}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Dashboard</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main content - Compact layout */}
          <main className="p-3 h-[calc(100%-40px)]">
            {activeView === "form" ? (
              <div className="h-full">
                <Card className="shadow-lg border border-blue-200 h-full bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-4 h-full">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Comprehensive KPI Data Input
                      </h2>
                      <p className="text-sm text-gray-600">
                        Enter your call center performance metrics, satisfaction
                        scores, and weekly trends
                      </p>
                    </div>
                    <KpiForm onDataUpdate={handleDataUpdate} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              dashboardData && (
                <div className="h-full grid gap-2">
                  {/* Row 1: Brand Header */}
              

                  {/* Row 2: Main KPI Grid */}
                  <div className="row-span-1">
                    <MetricsGrid data={dashboardData} />
                  </div>

                  {/* Row 3-6: Experience and Weekly Performance Side by Side */}
                  <div className="row-span-4 grid grid-cols-2 gap-2">
                    {/* Left: Experience Satisfaction */}
                    <div className="col-span-1">
                      <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 h-full overflow-hidden">
                        <ExperienceSatisfaction data={dashboardData} />
                      </div>
                    </div>

                    {/* Right: Weekly Performance with Additional Metrics on Top */}
                    <div className="col-span-1">
                      {/* Additional Metrics - Small tiles on top */}
                      <div className="grid grid-cols-5 gap-1 mb-2">
                        <Card className="shadow-sm border border-purple-300 bg-gradient-to-br from-purple-50 to-white">
                          <CardContent className="p-1">
                            <div className="text-[10px] font-bold text-purple-800 mb-0.5 border-b border-purple-400 pb-0.5">
                              PRESENTED
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {dashboardData.callsPresented?.toLocaleString() || "3,841"}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-blue-300 bg-gradient-to-br from-blue-50 to-white">
                          <CardContent className="p-1">
                            <div className="text-[10px] font-bold text-blue-800 mb-0.5 border-b border-blue-400 pb-0.5">
                              ACCEPTED
                            </div>
                            <div className="text-xs font-bold text-gray-900">
                              {dashboardData.callsAccepted?.toLocaleString() || "29,132"}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-teal-300 bg-gradient-to-br from-teal-50 to-white">
                          <CardContent className="p-1">
                            <div className="text-[10px] font-bold text-teal-800 mb-0.5 border-b border-teal-400 pb-0.5">
                              ADHERENCE
                            </div>
                            <div className="text-sm font-bold text-gray-900">-</div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-green-300 bg-gradient-to-br from-green-50 to-white">
                          <CardContent className="p-1">
                            <div className="text-[10px] font-bold text-green-800 mb-0.5 border-b border-green-400 pb-0.5">
                              ATTENDANCE
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {dashboardData.attendance ? `${dashboardData.attendance}%` : "89.07%"}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-orange-300 bg-gradient-to-br from-orange-50 to-white">
                          <CardContent className="p-1">
                            <div className="text-[10px] font-bold text-orange-800 mb-0.5 border-b border-orange-400 pb-0.5">
                              SHRINKAGE
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {dashboardData.shrinkage ? `${dashboardData.shrinkage}%` : "14.58%"}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Weekly Performance Table */}
                      <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-2 h-[calc(100%-60px)] overflow-hidden">
                        <WeeklyPerformanceModern data={dashboardData} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
