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
    setEditingText(currentText);
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
    {
      key: "acx",
      title: "ACX",
      percentage: data.acxScore,
      responses: data.acxResponses,
      text: `We achieved ${data.acxScore}% based on ${data.acxResponses} responses, showing that customers strongly agree that agents are knowledgeable, friendly, and communicate effectively.`,
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      key: "csat",
      title: "CSAT",
      percentage: data.csatScore,
      responses: data.csatResponses,
      text: `Our score stands at ${data.csatScore}% based on ${data.csatResponses} responses, indicating a vast majority of customers left satisfied or very satisfied.`,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      key: "ces",
      title: "CES",
      percentage: data.cesScore || 80,
      responses: data.cesResponses || 716,
      text: `We scored ${data.cesScore || 80}% based on ${data.cesResponses || 716} responses, reflecting that customers found it easy to resolve their matter.`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      key: "fcr",
      title: "FCR",
      percentage: data.fcrScore || 83,
      responses: 776,
      text: `At ${data.fcrScore || 83}% (based on 776 responses), more than 8 out of 10 issues were successfully resolved on the first contact.`,
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      key: "perfect",
      title: "Perfect Scores",
      percentage: data.perfectScores || 71,
      responses: null,
      text: `${data.perfectScores || 71}% of interactions received a perfect ACX score, demonstrating a high level of excellence in service delivery.`,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
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
    <div className="space-y-6">
      {/* Overall Experience & Satisfaction */}
      <Card className="shadow-lg border-0 bg-cyan-50">
        <CardContent className="p-4">
          <h3 className="text-base font-bold text-gray-900 mb-4 border-b-2 border-cyan-400 pb-1">
            Overall Experience & Satisfaction:
          </h3>

          <div className="space-y-3">
            {experienceMetrics.map((metric) => {
              const Icon = metric.icon;
              const isEditing = editingField === `experience_${metric.key}`;
              
              return (
                <div key={metric.key} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="min-h-[60px] text-sm"
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
                    ) : (
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-gray-700 leading-relaxed flex-1">{metric.text}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(`experience_${metric.key}`, metric.text)}
                          className="h-6 w-6 p-0 ml-2 flex-shrink-0"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>



      {/* Wins Section */}
      <Card className="shadow-lg border-0 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900 border-b-2 border-blue-400 pb-1">Wins</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit('wins', winsText)}
              className="flex items-center space-x-1"
            >
              <Edit3 className="w-3 h-3" />
              <span className="text-xs">Edit</span>
            </Button>
          </div>

          {editingField === 'wins' ? (
            <div className="space-y-3">
              <Textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                rows={8}
                className="resize-none text-sm"
                placeholder="Enter your performance analysis, wins, and insights..."
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
          ) : (
            <div className="space-y-3">
              {winsText.split('\n\n').map((paragraph, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{paragraph.trim()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}