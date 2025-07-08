import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BarChart3 } from "lucide-react";
import Dashboard from "@/pages/dashboard";
import { BrandProductionDashboard } from "@/components/dashboard/brand-production-dashboard";

function BrandProductionPage() {
  return (
    <div className="h-screen bg-background text-foreground text-sm p-4 flex flex-col items-center justify-center">
      <div id="dashboard-container" className="w-full max-w-[1600px] mx-auto">
        <div className="relative w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden" style={{ minHeight: '90vh' }}>
          {/* Header */}
          <header className="bg-primary text-primary-foreground px-8 py-4 h-16 flex items-center shadow-md">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-accent" />
                <h1 className="text-2xl font-bold tracking-tight">
                  Brand Production & Attrition
                </h1>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="p-6">
            <BrandProductionDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/brand-production" component={BrandProductionPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
