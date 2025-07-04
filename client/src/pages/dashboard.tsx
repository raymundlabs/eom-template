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
    <div className="min-h-screen bg-white">
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
                    Enter your call center performance metrics, satisfaction scores, and weekly trends
                  </p>
                </div>
                <KpiForm onDataUpdate={handleDataUpdate} />
              </CardContent>
            </Card>
          </div>
        ) : (
          dashboardData && (
            <div className="max-w-full mx-auto space-y-6" style={{ width: "1400px" }}>
              {/* Brand Header */}
              <div className="text-left mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{dashboardData.brandName}</h1>
                <div className="flex items-center space-x-6 text-xs text-gray-600">
                  <span>COLIBRI TARGET: 0:10:05 105.00%</span>
                  <span>COLIBRI AHT: 0:09:56 103.52%</span>
                </div>
              </div>

              {/* Top Metrics Grid */}
              <MetricsGrid data={dashboardData} />

              {/* Main Content Grid - Side by side layout */}
              <div className="grid grid-cols-3 gap-6">
                {/* Left Column - Experience & Satisfaction */}
                <div className="col-span-1">
                  <ExperienceSatisfaction data={dashboardData} />
                </div>

                {/* Right Columns - Weekly Performance Table */}
                <div className="col-span-2">
                  <WeeklyPerformanceModern data={dashboardData} />
                  
                  {/* Agent Attributes Card - Now under the weekly table */}
                  <div className="mt-6">
                    <Card className="shadow-lg border-0">
                      <CardContent className="p-4">
                        <h3 className="text-base font-bold text-gray-900 mb-4">Agent Attributes:</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <span className="text-sm font-medium text-gray-700">Agent was Friendly:</span>
                            </div>
                            <span className="text-sm font-bold text-blue-600">
                              {dashboardData.agentFriendly || 85}% ({dashboardData.friendlyResponses || 1614} responses)
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-600"></div>
                              <span className="text-sm font-medium text-gray-700">Agent Communicated Effectively:</span>
                            </div>
                            <span className="text-sm font-bold text-green-600">
                              {dashboardData.agentCommunicated || 81}% ({dashboardData.communicationResponses || 1623} responses)
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                              <span className="text-sm font-medium text-gray-700">Agent was Knowledgeable:</span>
                            </div>
                            <span className="text-sm font-bold text-purple-600">
                              {dashboardData.agentKnowledgeable || 79}% ({dashboardData.knowledgeResponses || 1630} responses)
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
