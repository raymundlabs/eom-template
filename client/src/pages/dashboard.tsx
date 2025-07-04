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
    <div className="min-h-screen bg-white text-[12px]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Call Center Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={activeView === "form" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("form")}
              className="flex items-center space-x-2 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Data Input</span>
            </Button>
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("dashboard")}
              className="flex items-center space-x-2 shadow-sm"
              disabled={!dashboardData}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeView === "form" ? (
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Comprehensive KPI Data Input
                  </h2>
                  <p className="text-gray-600 mt-1">
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
            <div className="max-w-full mx-auto space-y-6">
              {/* Brand Header */}
              <div className="text-left mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {dashboardData.brandName}
                </h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>COLIBRI TARGET: 0:10:05 105.00%</span>
                  <span>COLIBRI AHT: 0:09:56 103.52%</span>
                </div>
              </div>

              {/* Top Metrics Grid */}
              <MetricsGrid data={dashboardData} />

              {/* Middle Section - Experience Left, Metrics Right */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Left Column - Text Content */}
                <div className="col-span-1">
                  <ExperienceSatisfaction data={dashboardData} />
                </div>

                {/* Right Columns - Additional Metrics */}
                <div className="col-span-2">
                  <div className="grid grid-cols-5 gap-4">
                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-purple-300 pb-2">
                          PRESENTED
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {dashboardData.callsPresented?.toLocaleString() ||
                            "3,841"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-blue-300 pb-2">
                          ACCEPTED
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {dashboardData.callsAccepted?.toLocaleString() ||
                            "29,132"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-teal-300 pb-2">
                          ADHERENCE
                        </div>
                        <div className="text-xl font-bold text-gray-900">-</div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-green-300 pb-2">
                          ATTENDANCE
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {dashboardData.attendance
                            ? `${dashboardData.attendance}%`
                            : "89.07%"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-orange-300 pb-2">
                          SHRINKAGE
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {dashboardData.shrinkage
                            ? `${dashboardData.shrinkage}%`
                            : "14.58%"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Weekly Performance Table - Full Width */}
              <WeeklyPerformanceModern data={dashboardData} />
            </div>
          )
        )}
      </main>
    </div>
  );
}
