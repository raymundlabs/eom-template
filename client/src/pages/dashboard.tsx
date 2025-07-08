import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KpiForm } from "@/components/forms/kpi-form";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { WeeklyPerformanceModern } from "@/components/dashboard/weekly-performance-modern";
import { ExperienceSatisfaction } from "@/components/dashboard/experience-satisfaction";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { BarChart3, FileText, Download as DownloadIcon } from "lucide-react";
import type { KpiData } from "@shared/schema";
import html2canvas from "html2canvas";
import DashboardV2 from "@/pages/dashboard-v2";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"form" | "dashboard">("form");
  const [dashboardData, setDashboardData] = useState<KpiData | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const handleDataUpdate = (data: KpiData) => {
    setDashboardData(data);
    setActiveView("dashboard");
  };

  const handleMetricChange = (field: string, value: string | number) => {
    if (!dashboardData) return;
    
    let numericValue: number | string = value;
    
    // Handle different metric types
    if (typeof value === 'string') {
      // Remove any non-numeric characters except decimal point and minus
      const cleanValue = value.replace(/[^0-9.-]/g, '');
      numericValue = cleanValue === '' ? 0 : parseFloat(cleanValue);
      
      // Ensure percentage values are between 0 and 100
      if (['attendance', 'shrinkage', 'adherence'].includes(field)) {
        numericValue = Math.min(100, Math.max(0, numericValue as number));
      }
    }
    
    setDashboardData(prevData => ({
      ...prevData!,
      [field]: numericValue
    }));
  };

  return (
    <div className="h-screen bg-background text-foreground text-sm p-4 flex flex-col items-center justify-center">
      {/* Button to Dashboard V2 */}
      <div className="w-full max-w-[1600px] flex justify-end mb-4">
        <a href="/dashboard-v2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2 rounded-lg shadow">
            Try Dashboard V2
          </Button>
        </a>
      </div>
      <div id="dashboard-container" className="w-full max-w-[1600px] mx-auto">
        <div className="relative w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {/* Clean Header */}
          <header className="bg-primary text-primary-foreground px-8 py-4 h-16 flex items-center shadow-md">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-accent" />
                <h1 className="text-2xl font-bold tracking-tight">
                  {dashboardData?.brandName || 'Performance Dashboard'}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant={activeView === "form" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("form")}
                  className="h-9 px-5 text-base font-medium"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Data Input
                </Button>
                {activeView === "dashboard" && dashboardData && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const element = document.getElementById('dashboard-container');
                      if (element) {
                        try {
                          const canvas = await html2canvas(element, {
                            scale: 2,
                            useCORS: true,
                            logging: false,
                            backgroundColor: 'var(--card)',
                            scrollX: 0,
                            scrollY: 0
                          });
                          const link = document.createElement('a');
                          link.download = `performance-dashboard-${new Date().toISOString().split('T')[0]}.png`;
                          link.href = canvas.toDataURL('image/png');
                          link.click();
                        } catch (error) {
                          console.error('Error capturing dashboard:', error);
                        }
                      }
                    }}
                    className="h-9 px-5 text-base font-medium border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                )}
                <Button
                  variant={activeView === "dashboard" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("dashboard")}
                  className="h-9 px-5 text-base font-medium"
                  disabled={!dashboardData}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </div>
          </header>
          {/* Main content */}
          <div id="dashboard-content" className="h-[calc(100%-4rem)] p-8 overflow-auto bg-background">
            {activeView === "form" ? (
              <div className="h-full flex items-center justify-center">
                <Card className="border border-border h-full bg-card w-full max-w-2xl mx-auto shadow-md">
                  <CardContent className="p-8 h-full">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                        Comprehensive KPI Data Input
                      </h2>
                      <p className="text-base text-muted-foreground">
                        Enter your call center performance metrics, satisfaction scores, and weekly trends
                      </p>
                    </div>
                    <KpiForm onDataUpdate={handleDataUpdate} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              dashboardData && (
                <div className="h-full grid gap-6">
                  {/* Row 2: Main KPI Grid */}
                  <div className="row-span-1">
                    <MetricsGrid 
                      data={dashboardData} 
                      onDataChange={handleMetricChange} 
                    />
                  </div>
                  {/* Row 3-6: Experience and Weekly Performance Side by Side */}
                  <div className="row-span-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Experience Satisfaction */}
                    <div className="col-span-1">
                      <div className="bg-card rounded-xl shadow border border-border p-4 h-full overflow-hidden">
                        <ExperienceSatisfaction 
                          data={dashboardData} 
                          onUpdate={(field, value) => {
                            setDashboardData(prev => ({
                              ...prev!,
                              [field]: value
                            }));
                          }}
                        />
                      </div>
                    </div>
                    {/* Right: Weekly Performance with Additional Metrics on Top */}
                    <div className="col-span-1 flex flex-col gap-4">
                      {/* Additional Metrics - Small tiles on top */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-2">
                        <Card className="shadow border border-accent bg-gradient-to-br from-accent to-card">
                          <CardContent className="p-2">
                            <div className="text-[11px] font-bold text-accent-foreground mb-1 border-b border-accent pb-1">
                              PRESENTED
                            </div>
                            <div 
                              className="text-lg font-bold text-foreground cursor-pointer hover:bg-accent/20 rounded px-1 -mx-1"
                              onClick={() => {
                                setEditingField('callsPresented');
                                setEditingValue(dashboardData?.callsPresented?.toString() || '3841');
                              }}
                            >
                              {dashboardData?.callsPresented?.toLocaleString() || "3,841"}
                            </div>
                            {editingField === 'callsPresented' && (
                              <div className="mt-1">
                                <input
                                  type="number"
                                  className="w-full p-1 text-sm border rounded"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue !== '') {
                                      handleMetricChange('callsPresented', parseInt(editingValue) || 0);
                                    }
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.currentTarget.blur();
                                    } else if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card className="shadow border border-primary bg-gradient-to-br from-primary/10 to-card">
                          <CardContent className="p-2">
                            <div className="text-[11px] font-bold text-primary mb-1 border-b border-primary pb-1">
                              ACCEPTED
                            </div>
                            <div 
                              className="text-lg font-bold text-foreground cursor-pointer hover:bg-accent/20 rounded px-1 -mx-1"
                              onClick={() => setEditingField('callsAccepted')}
                            >
                              {dashboardData?.callsAccepted?.toLocaleString() || "29,132"}
                            </div>
                            {editingField === 'callsAccepted' && (
                              <div className="mt-1">
                                <input
                                  type="number"
                                  className="w-full p-1 text-sm border rounded"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue !== '') {
                                      handleMetricChange('callsAccepted', parseInt(editingValue) || 0);
                                    }
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.currentTarget.blur();
                                    } else if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card className="shadow border border-muted bg-gradient-to-br from-muted to-card">
                          <CardContent className="p-2">
                            <div className="text-[11px] font-bold text-muted-foreground mb-1 border-b border-muted pb-1">
                              ADHERENCE
                            </div>
                            <div 
                              className="text-lg font-bold text-foreground cursor-pointer hover:bg-muted/20 rounded px-1 -mx-1"
                              onClick={() => {
                                setEditingField('adherence');
                                setEditingValue(dashboardData?.adherence?.toString() || '0');
                              }}
                            >
                              {dashboardData?.adherence ? `${dashboardData.adherence}%` : "-"}
                            </div>
                            {editingField === 'adherence' && (
                              <div className="mt-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                  className="w-full p-1 text-sm border rounded"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue !== '') {
                                      handleMetricChange('adherence', parseFloat(editingValue) || 0);
                                    }
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.currentTarget.blur();
                                    } else if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card className="shadow border border-green-500 bg-gradient-to-br from-green-100 to-card">
                          <CardContent className="p-2">
                            <div className="text-[11px] font-bold text-green-700 mb-1 border-b border-green-300 pb-1">
                              ATTENDANCE
                            </div>
                            <div 
                              className="text-lg font-bold text-foreground cursor-pointer hover:bg-green-100/50 rounded px-1 -mx-1"
                              onClick={() => {
                                setEditingField('attendance');
                                setEditingValue(dashboardData?.attendance?.toString() || '89.07');
                              }}
                            >
                              {dashboardData?.attendance ? `${dashboardData.attendance}%` : "89.07%"}
                            </div>
                            {editingField === 'attendance' && (
                              <div className="mt-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                  className="w-full p-1 text-sm border rounded"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue !== '') {
                                      handleMetricChange('attendance', parseFloat(editingValue) || 0);
                                    }
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.currentTarget.blur();
                                    } else if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card className="shadow border border-orange-400 bg-gradient-to-br from-orange-100 to-card">
                          <CardContent className="p-2">
                            <div className="text-[11px] font-bold text-orange-700 mb-1 border-b border-orange-300 pb-1">
                              SHRINKAGE
                            </div>
                            <div 
                              className="text-lg font-bold text-foreground cursor-pointer hover:bg-orange-100/50 rounded px-1 -mx-1"
                              onClick={() => {
                                setEditingField('shrinkage');
                                setEditingValue(dashboardData?.shrinkage?.toString() || '14.58');
                              }}
                            >
                              {dashboardData?.shrinkage ? `${dashboardData.shrinkage}%` : "14.58%"}
                            </div>
                            {editingField === 'shrinkage' && (
                              <div className="mt-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                  className="w-full p-1 text-sm border rounded"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onBlur={() => {
                                    if (editingValue !== '') {
                                      handleMetricChange('shrinkage', parseFloat(editingValue) || 0);
                                    }
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.currentTarget.blur();
                                    } else if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                      {/* Weekly Performance Table */}
                      <div className="bg-card rounded-xl shadow border border-border p-4 h-[calc(100%-60px)] overflow-hidden">
                        <WeeklyPerformanceModern data={dashboardData} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
