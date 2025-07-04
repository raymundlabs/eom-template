import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KpiForm } from "@/components/forms/kpi-form";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { WeeklyTable } from "@/components/dashboard/weekly-table";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { BarChart3, FileText } from "lucide-react";
import type { KpiData } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"form" | "dashboard">("form");
  const [dashboardData, setDashboardData] = useState<KpiData | null>(null);

  const handleDataUpdate = (data: KpiData) => {
    setDashboardData(data);
    setActiveView("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Call Center Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant={activeView === "form" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("form")}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Data Input</span>
            </Button>
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("dashboard")}
              className="flex items-center space-x-2"
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
            <div className="space-y-8">
              {/* Brand Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary">
                        {dashboardData.brandName}
                      </h2>
                      <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                        <span>{dashboardData.brandName} TARGET 007:19 105.00%</span>
                        <span>{dashboardData.brandName} AHT {dashboardData.avgHandleTime} 103.78%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <MetricsGrid data={dashboardData} />

              <WeeklyTable data={dashboardData} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Experience Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Overall Experience & Satisfaction
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">ACX Achievement</div>
                          <div className="text-sm text-gray-600">
                            We achieved {dashboardData.acxScore}% based on {dashboardData.acxResponses} responses, demonstrating overall agent customer experience.
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-danger">
                            {dashboardData.acxScore}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">CSAT Performance</div>
                          <div className="text-sm text-gray-600">
                            Our score is {dashboardData.csatScore}% from over {dashboardData.csatResponses} responses, indicating customer satisfaction with their interaction.
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-success">
                            {dashboardData.csatScore}%
                          </div>
                        </div>
                      </div>

                      {dashboardData.cesScore && (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">CES Score</div>
                            <div className="text-sm text-gray-600">
                              We scored {dashboardData.cesScore}% based on {dashboardData.cesResponses} responses, showing that customers generally found it easy to get their issues resolved.
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-warning">
                              {dashboardData.cesScore}%
                            </div>
                          </div>
                        </div>
                      )}

                      {dashboardData.fcrScore && (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">FCR Rate</div>
                            <div className="text-sm text-gray-600">
                              At {dashboardData.fcrScore}%, our first contact resolution rate shows that nearly {Math.round(dashboardData.fcrScore / 10)} out of 10 customer inquiries were resolved without needing a follow-up.
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-warning">
                              {dashboardData.fcrScore}%
                            </div>
                          </div>
                        </div>
                      )}

                      {dashboardData.perfectScores && (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Perfect Scores</div>
                            <div className="text-sm text-gray-600">
                              {dashboardData.perfectScores}% of interactions received a perfect ACX score, a strong result indicating consistent high-quality service.
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-warning">
                              {dashboardData.perfectScores}%
                            </div>
                          </div>
                        </div>
                      )}

                      {(dashboardData.agentFriendly || dashboardData.agentCommunicated || dashboardData.agentKnowledgeable) && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="font-medium text-gray-900 mb-3">Agent Attributes:</div>
                          <div className="space-y-2 text-sm">
                            {dashboardData.agentFriendly && (
                              <div className="flex justify-between">
                                <span>• Agent was Friendly</span>
                                <span className="font-medium">
                                  {dashboardData.agentFriendly}% ({dashboardData.friendlyResponses} responses)
                                </span>
                              </div>
                            )}
                            {dashboardData.agentCommunicated && (
                              <div className="flex justify-between">
                                <span>• Agent Communicated Effectively</span>
                                <span className="font-medium">
                                  {dashboardData.agentCommunicated}% ({dashboardData.communicationResponses} responses)
                                </span>
                              </div>
                            )}
                            {dashboardData.agentKnowledgeable && (
                              <div className="flex justify-between">
                                <span>• Agent was Knowledgeable</span>
                                <span className="font-medium">
                                  {dashboardData.agentKnowledgeable}% ({dashboardData.knowledgeResponses} responses)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {dashboardData.analysisText && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="font-medium text-gray-900 mb-3">Wins & Analysis:</div>
                          <div className="text-sm text-gray-600 space-y-2">
                            {dashboardData.analysisText.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <PerformanceChart data={dashboardData} />
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
