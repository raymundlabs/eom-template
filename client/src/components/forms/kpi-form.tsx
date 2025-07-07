import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyEntry } from "./weekly-entry";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertKpiDataSchema, type InsertKpiData, type KpiData, type WeeklyEntry as WeeklyEntryType } from "@shared/schema";

// Memoized form section component to prevent unnecessary re-renders
const FormSection = memo(({ title, children, isOpen = true, onToggle }: { 
  title: string; 
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) => (
  <Card className="mb-4">
    <CardHeader 
      className="p-3 cursor-pointer hover:bg-gray-50 flex flex-row items-center justify-between" 
      onClick={onToggle}
    >
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {onToggle && (isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
    </CardHeader>
    {isOpen && <CardContent className="p-3 pt-0">{children}</CardContent>}
  </Card>
));

interface KpiFormProps {
  onDataUpdate: (data: KpiData) => void;
}

export function KpiForm({ onDataUpdate }: KpiFormProps) {
  const { toast } = useToast();
  // State for collapsible sections
  const [sections, setSections] = useState({
    basicInfo: true,
    experience: true,
    agentAttributes: true,
    operations: true,
    analysis: true,
    weeklyData: true
  });

  // Toggle section visibility
  const toggleSection = useCallback((section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Initialize with 4 weeks by default
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntryType[]>([
    { week: 1, presented: 0, accepted: 0, aht: "0:10:48", hold: "0:02:18", quality: "", csat: 4.33, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 2, presented: 0, accepted: 0, aht: "0:10:48", hold: "0:02:18", quality: "", csat: 4.33, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 3, presented: 0, accepted: 0, aht: "0:10:48", hold: "0:02:18", quality: "", csat: 4.33, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 4, presented: 0, accepted: 0, aht: "0:10:48", hold: "0:02:18", quality: "", csat: 4.33, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" }
  ]);

  const form = useForm<InsertKpiData>({
    resolver: zodResolver(insertKpiDataSchema),
    defaultValues: {
      brandName: "COLIBRI",
      avgHandleTime: "7:14",
      avgHoldTime: "1:41",
      acxScore: 82,
      acxResponses: 1638,
      csatScore: 4.18,
      csatResponses: 1770,
      cesScore: 76,
      cesResponses: 1637,
      fcrScore: 78,
      perfectScores: 68,
      agentFriendly: 85,
      friendlyResponses: 1614,
      agentCommunicated: 81,
      overallExperience: "",
      communicationResponses: 1623,
      agentKnowledgeable: 79,
      knowledgeResponses: 1630,
      callsPresented: 3841,
      callsAccepted: 29132,
      attendance: 89.07,
      shrinkage: 14.58,
      analysisText: "Outstanding Agent Friendliness: Agents scored an impressive 85% for friendliness, the highest of all attributes, showcasing a strong ability to build rapport with customers.\n\nStrong ACX Performance: Achieving an overall ACX of 82% highlights the team's consistent delivery of a high-quality customer experience.\n\nEffective Resolution: With FCR at 78% and CES at 76%, the team proved to be both efficient at resolving issues on the first try and making the process easy for the customer.\n\nClear Communication: 81% of customers felt the agent communicated effectively, a key driver of the positive overall experience.",
      weeklyData: weeklyEntries,
    },
  });

  const createKpiMutation = useMutation({
    mutationFn: async (data: InsertKpiData) => {
      const response = await apiRequest("POST", "/api/kpi", data);
      return response.json();
    },
    onSuccess: (data: KpiData) => {
      toast({
        title: "Success",
        description: "Dashboard data has been generated successfully.",
      });
      onDataUpdate(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate dashboard. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating KPI data:", error);
    },
  });

  const addWeeklyEntry = () => {
    const newWeek: WeeklyEntryType = {
      week: weeklyEntries.length + 1,
      presented: 0,
      accepted: 0,
      aht: "0:10:20",
      hold: "0:02:18",
      quality: "",
      csat: 4.35,
      comm: 0.00,
      knowledge: 0.00,
      acx: 0.00,
      adherence: "",
    };
    setWeeklyEntries([...weeklyEntries, newWeek]);
  };

  const removeWeeklyEntry = (index: number) => {
    const updated = weeklyEntries.filter((_, i) => i !== index);
    setWeeklyEntries(updated);
  };

  const updateWeeklyEntry = (index: number, data: WeeklyEntryType) => {
    const updated = [...weeklyEntries];
    updated[index] = data;
    setWeeklyEntries(updated);
  };

  const onSubmit = (data: InsertKpiData) => {
    const formData = { 
      ...data, 
      weeklyData: weeklyEntries,
      overallExperience: data.overallExperience || "" // Ensure it's always defined
    };
    createKpiMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex-1 overflow-y-auto pr-2 space-y-2 text-[12px] p-4"
        id="kpi-form"
      >
        {/* Basic Information Section */}
        <FormSection 
          title="Basic Information" 
          isOpen={sections.basicInfo}
          onToggle={() => toggleSection('basicInfo')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <div className="space-y-1">
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input id="brandName" {...form.register("brandName")}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="avgHandleTime">Avg Handle Time</Label>
              <Input id="avgHandleTime" {...form.register("avgHandleTime")}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="avgHoldTime">Avg Hold Time</Label>
              <Input id="avgHoldTime" {...form.register("avgHoldTime")}/>
            </div>
          </div>
        </FormSection>

        {/* Experience & Satisfaction Section */}
        <FormSection 
          title="Experience & Satisfaction" 
          isOpen={sections.experience}
          onToggle={() => toggleSection('experience')}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
            <div className="space-y-0.5">
              <Label htmlFor="acxScore" className="text-xs font-medium">ACX Score (%) *</Label>
              <Input 
                id="acxScore" 
                type="number" 
                step="0.01"
                className="h-8 text-xs px-2 py-1"
                {...form.register("acxScore", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="acxResponses" className="text-xs font-medium">ACX Resp</Label>
              <Input 
                id="acxResponses" 
                type="number" 
                className="h-8 text-xs px-2 py-1"
                {...form.register("acxResponses", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="csatScore" className="text-xs font-medium">CSAT Score (%) *</Label>
              <Input 
                id="csatScore" 
                type="number" 
                step="0.01" 
                className="h-8 text-xs px-2 py-1"
                {...form.register("csatScore", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="csatResponses" className="text-xs font-medium">CSAT Resp</Label>
              <Input 
                id="csatResponses" 
                type="number" 
                className="h-8 text-xs px-2 py-1"
                {...form.register("csatResponses", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="cesScore" className="text-xs font-medium">CES Score (%)</Label>
              <Input 
                id="cesScore" 
                type="number" 
                step="0.01"
                className="h-8 text-xs px-2 py-1"
                {...form.register("cesScore", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="fcrScore" className="text-xs font-medium">FCR (%)</Label>
              <Input 
                id="fcrScore" 
                type="number" 
                step="0.01"
                className="h-8 text-xs px-2 py-1"
                {...form.register("fcrScore", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-0.5">
              <Label htmlFor="perfectScores" className="text-xs font-medium">Perfect (%)</Label>
              <Input 
                id="perfectScores" 
                type="number" 
                step="0.01"
                className="h-8 text-xs px-2 py-1"
                {...form.register("perfectScores", { valueAsNumber: true })}
              />
            </div>
          </div>
        </FormSection>

        {/* Overall Experience & Satisfaction Text */}
        <FormSection 
          title="Overall Experience & Satisfaction Analysis" 
          isOpen={sections.experience}
          onToggle={() => toggleSection('experience')}
        >
          <div className="space-y-2">
            <Textarea
              id="overallExperience"
              placeholder="Enter your analysis of the overall experience and satisfaction metrics..."
              className="min-h-[100px] text-sm"
              {...form.register("overallExperience")}
            />
          </div>
        </FormSection>

        {/* Agent Attributes Section */}
        <FormSection 
          title="Agent Attributes" 
          isOpen={sections.agentAttributes}
          onToggle={() => toggleSection('agentAttributes')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div className="space-y-1">
              <Label htmlFor="agentFriendly">Agent Friendly (%)</Label>
              <Input id="agentFriendly" type="number" {...form.register("agentFriendly", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="friendlyResponses">Friendly Responses</Label>
              <Input id="friendlyResponses" type="number" {...form.register("friendlyResponses", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="agentCommunicated">Agent Communicated (%)</Label>
              <Input id="agentCommunicated" type="number" {...form.register("agentCommunicated", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="communicationResponses">Communication Responses</Label>
              <Input id="communicationResponses" type="number" {...form.register("communicationResponses", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="agentKnowledgeable">Agent Knowledgeable (%)</Label>
              <Input id="agentKnowledgeable" type="number" {...form.register("agentKnowledgeable", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="knowledgeResponses">Knowledge Responses</Label>
              <Input id="knowledgeResponses" type="number" {...form.register("knowledgeResponses", { valueAsNumber: true })}/>
            </div>
          </div>
        </FormSection>

        {/* Operational Metrics Section */}
        <FormSection 
          title="Operational Metrics" 
          isOpen={sections.operations}
          onToggle={() => toggleSection('operations')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div className="space-y-1">
              <Label htmlFor="callsPresented">Calls Presented</Label>
              <Input id="callsPresented" type="number" {...form.register("callsPresented", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="callsAccepted">Calls Accepted</Label>
              <Input id="callsAccepted" type="number" {...form.register("callsAccepted", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input id="attendance" type="number" step="0.01" {...form.register("attendance", { valueAsNumber: true })}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="shrinkage">Shrinkage (%)</Label>
              <Input id="shrinkage" type="number" step="0.01" {...form.register("shrinkage", { valueAsNumber: true })}/>
            </div>
          </div>
        </FormSection>

        {/* Analysis Section */}
        <FormSection 
          title="Performance Analysis" 
          isOpen={sections.analysis}
          onToggle={() => toggleSection('analysis')}
        >
          <div className="space-y-1">
            <Label htmlFor="analysisText">Wins & Analysis Text</Label>
            <Textarea
              id="analysisText"
              rows={4}
              {...form.register("analysisText")}
              className="w-full min-h-[100px] resize-y"
              placeholder="Enter your performance analysis, wins, and insights..."
            />
          </div>
        </FormSection>

        {/* Weekly Data Section */}
        <Card className="mb-4">
          <CardHeader 
            className="p-3 cursor-pointer hover:bg-gray-50 flex flex-row items-center justify-between" 
            onClick={() => toggleSection('weeklyData')}
          >
            <div className="flex justify-between items-center w-full">
              <CardTitle className="text-sm font-medium">Weekly Performance Data</CardTitle>
              <div className="flex items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    addWeeklyEntry();
                  }} 
                  className="h-7 mr-2"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Week
                </Button>
                {sections.weeklyData ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
          </CardHeader>
          {sections.weeklyData && (
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                {weeklyEntries.map((entry, index) => (
                  <WeeklyEntry
                    key={index}
                    data={entry}
                    onUpdate={(data) => updateWeeklyEntry(index, data)}
                    onRemove={() => removeWeeklyEntry(index)}
                  />
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </form>
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-3 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              form="kpi-form"
              disabled={createKpiMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {createKpiMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <span>Generate Dashboard</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
