import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, X, CheckCircle, Users, TrendingUp, Star, Target } from "lucide-react";
import type { KpiData } from "@shared/schema";

interface ExperienceSatisfactionProps {
  data: KpiData;
  onUpdate?: (field: string, value: string) => void;
}

export function ExperienceSatisfaction({ data, onUpdate }: ExperienceSatisfactionProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleEdit = (field: string, currentText: string) => {
    setEditingField(field);
    // If the field is overallExperience and it's empty, use a default template
    const defaultTemplate = field === 'overallExperience' && !currentText.trim() 
      ? '• Key achievement 1\n• Key achievement 2\n• Area for improvement' 
      : currentText;
    setEditingText(defaultTemplate);
  };

  const handleSave = () => {
    if (editingField && onUpdate) {
      onUpdate(editingField, editingText);
    }
    setEditingField(null);
    setEditingText("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditingText("");
  };

  const experienceMetrics = [
   

  ];

  const agentAttributes = [
    {
      title: "Agent was Friendly",
      percentage: data.agentFriendly || 88,
      responses: data.friendlyResponses || 708,
      color: "text-pink-600"
    },
    {
      title: "Agent Communicated Effectively",
      percentage: data.agentCommunicated || 85,
      responses: data.communicationResponses || 713,
      color: "text-blue-600"
    },
    {
      title: "Agent was Knowledgeable",
      percentage: data.agentKnowledgeable || 82,
      responses: data.knowledgeResponses || 717,
      color: "text-purple-600"
    }
  ];

  const winsText = data.analysisText || `Exceptional Agent Friendliness: Agents scored an impressive 88% for friendliness, showing a strong ability to build rapport and create positive interactions.

Strong Overall Experience (ACX): The team achieved a high 85% ACX score, indicating consistent, high-quality service across key agent attributes.

Effective First Contact Resolution (FCR): An 83% FCR rate demonstrates the team's efficiency and knowledge in resolving customer inquiries on the first attempt.

High Customer Satisfaction: CSAT remains strong at 82%, reflecting the team's success in meeting and exceeding customer expectations.

Seamless Customer Effort: With an 80% CES, customers overwhelmingly found the resolution process easy and straightforward.`;

  return (
    <div className="space-y-2 h-full overflow-y-auto pr-1">
      {/* Overall Experience & Satisfaction */}
      <Card className="shadow-sm border-0 bg-cyan-50">
        <CardContent className="p-2">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-900 border-b border-cyan-400 pb-1">
              Overall Experience & Satisfaction Analysis
            </h3>
          </div>

          {editingField === 'overallExperience' ? (
            <div className="space-y-3">
              <Textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                rows={6}
                className="text-sm"
                placeholder="Enter your analysis of the overall experience and satisfaction metrics...\n• Start each point with a bullet (•) for better formatting\n• Use new lines to separate bullet points"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : data.overallExperience ? (
            <div className="space-y-1">
              {data.overallExperience.split('\n').filter(line => line.trim()).map((line, index) => (
                <div key={index} className="flex items-start space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{line.trim()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No analysis provided. Click Edit to add your analysis.</p>
          )}

          <div className="mt-4 space-y-1">
            {experienceMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.key} className="flex items-start space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{metric.text}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Wins Section */}
      <Card className="shadow-sm border-0 bg-blue-50">
        <CardContent className="p-2">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-900 border-b border-blue-400 pb-1">Wins</h3>
          </div>
          <div className="space-y-1">
            {winsText.split('\n\n').map((paragraph, index) => (
              <div key={index} className="flex items-start space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 leading-tight">{paragraph.trim()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}