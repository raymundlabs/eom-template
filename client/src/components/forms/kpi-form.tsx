import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WeeklyEntry } from "./weekly-entry";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertKpiDataSchema, type InsertKpiData, type KpiData, type WeeklyEntry as WeeklyEntryType } from "@shared/schema";

interface KpiFormProps {
  onDataUpdate: (data: KpiData) => void;
}

export function KpiForm({ onDataUpdate }: KpiFormProps) {
  const { toast } = useToast();
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntryType[]>([
    { week: 1, presented: 0, accepted: 0, aht: "0:10:48", hold: "0:02:18", quality: "", csat: 4.33, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 2, presented: 0, accepted: 0, aht: "0:10:04", hold: "0:02:19", quality: "", csat: 4.41, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 3, presented: 0, accepted: 0, aht: "0:10:30", hold: "0:02:13", quality: "", csat: 4.30, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" },
    { week: 4, presented: 0, accepted: 0, aht: "0:10:20", hold: "0:02:18", quality: "", csat: 4.35, comm: 0.00, knowledge: 0.00, acx: 0.00, adherence: "" }
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
    const formData = { ...data, weeklyData: weeklyEntries };
    createKpiMutation.mutate(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Brand Information Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                id="brandName"
                {...form.register("brandName")}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Metrics Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Time Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="avgHandleTime">Average Handle Time</Label>
              <Input
                id="avgHandleTime"
                {...form.register("avgHandleTime")}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="avgHoldTime">Average Hold Time</Label>
              <Input
                id="avgHoldTime"
                {...form.register("avgHoldTime")}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Experience & Satisfaction Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Experience & Satisfaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="acxScore">ACX Score (%) *</Label>
              <Input
                id="acxScore"
                type="number"
                {...form.register("acxScore", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="acxResponses">ACX Responses</Label>
              <Input
                id="acxResponses"
                type="number"
                {...form.register("acxResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="csatScore">CSAT Score (%) *</Label>
              <Input
                id="csatScore"
                type="number"
                step="0.01"
                {...form.register("csatScore", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="csatResponses">CSAT Responses</Label>
              <Input
                id="csatResponses"
                type="number"
                {...form.register("csatResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="cesScore">CES Score (%)</Label>
              <Input
                id="cesScore"
                type="number"
                {...form.register("cesScore", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="cesResponses">CES Responses</Label>
              <Input
                id="cesResponses"
                type="number"
                {...form.register("cesResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="fcrScore">FCR Score (%)</Label>
              <Input
                id="fcrScore"
                type="number"
                {...form.register("fcrScore", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="perfectScores">Perfect Scores (%)</Label>
              <Input
                id="perfectScores"
                type="number"
                {...form.register("perfectScores", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Attributes Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Attributes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentFriendly">Agent Friendly (%)</Label>
              <Input
                id="agentFriendly"
                type="number"
                {...form.register("agentFriendly", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="friendlyResponses">Friendly Responses</Label>
              <Input
                id="friendlyResponses"
                type="number"
                {...form.register("friendlyResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="agentCommunicated">Agent Communicated (%)</Label>
              <Input
                id="agentCommunicated"
                type="number"
                {...form.register("agentCommunicated", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="communicationResponses">Communication Responses</Label>
              <Input
                id="communicationResponses"
                type="number"
                {...form.register("communicationResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="agentKnowledgeable">Agent Knowledgeable (%)</Label>
              <Input
                id="agentKnowledgeable"
                type="number"
                {...form.register("agentKnowledgeable", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="knowledgeResponses">Knowledge Responses</Label>
              <Input
                id="knowledgeResponses"
                type="number"
                {...form.register("knowledgeResponses", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Weekly Performance Data</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addWeeklyEntry}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Week</span>
            </Button>
          </div>

          <div className="space-y-4">
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
      </Card>

      {/* Operational Metrics Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Operational Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="callsPresented">Calls Presented</Label>
              <Input
                id="callsPresented"
                type="number"
                {...form.register("callsPresented", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="callsAccepted">Calls Accepted</Label>
              <Input
                id="callsAccepted"
                type="number"
                {...form.register("callsAccepted", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="attendance">Attendance (%)</Label>
              <Input
                id="attendance"
                type="number"
                step="0.01"
                {...form.register("attendance", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="shrinkage">Shrinkage (%)</Label>
              <Input
                id="shrinkage"
                type="number"
                step="0.01"
                {...form.register("shrinkage", { valueAsNumber: true })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analysis</h3>
          <div>
            <Label htmlFor="analysisText">Wins & Analysis Text</Label>
            <Textarea
              id="analysisText"
              rows={6}
              {...form.register("analysisText")}
              className="mt-2 resize-none"
              placeholder="Enter your performance analysis, wins, and insights..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={createKpiMutation.isPending}
          className="bg-gray-900 hover:bg-gray-800"
        >
          {createKpiMutation.isPending ? "Generating..." : "Generate Dashboard"}
        </Button>
      </div>
    </form>
  );
}
