import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import type { KpiData } from "@shared/schema";

interface ExperienceSatisfactionProps {
  data: KpiData;
  onUpdate?: (field: string, value: string) => void;
}

export function ExperienceSatisfaction({ data, onUpdate }: ExperienceSatisfactionProps) {
  // Separate states for each section
  const [editingWins, setEditingWins] = useState(false);
  const [winsText, setWinsText] = useState("");
  const [editingExperience, setEditingExperience] = useState(false);
  const [experienceText, setExperienceText] = useState("");

  // Handle editing for Wins section
  const handleEditWins = () => {
    setWinsText(data.analysisText || '');
    setEditingWins(true);
  };

  // Handle editing for Experience section
  const handleEditExperience = () => {
    setExperienceText(data.overallExperience || '');
    setEditingExperience(true);
  };

  // Handle save for both sections
  const handleSave = (field: 'analysisText' | 'overallExperience', text: string) => {
    if (onUpdate) {
      onUpdate(field, text);
    }
    setEditingWins(false);
    setEditingExperience(false);
  };

  // Handle cancel for both sections
  const handleCancel = () => {
    setEditingWins(false);
    setEditingExperience(false);
  };



  const defaultWinsText = `Exceptional Agent Friendliness: Agents scored an impressive 88% for friendliness, showing a strong ability to build rapport and create positive interactions.

Strong Overall Experience (ACX): The team achieved a high 85% ACX score, indicating consistent, high-quality service across key agent attributes.

Effective First Contact Resolution (FCR): An 83% FCR rate demonstrates the team's efficiency and knowledge in resolving customer inquiries on the first attempt.

High Customer Satisfaction: CSAT remains strong at 82%, reflecting the team's success in meeting and exceeding customer expectations.

Seamless Customer Effort: With an 80% CES, customers overwhelmingly found the resolution process easy and straightforward.`;

  const defaultExperienceText = `Outstanding Agent Friendliness: Agents scored an impressive 85% for friendliness, the highest of all attributes, showcasing a strong ability to build rapport with customers.

Strong ACX Performance: Achieving an overall ACX of 82% highlights the team's consistent delivery of a high-quality customer experience.

Effective Resolution: With FCR at 78% and CES at 76%, the team proved to be both efficient at resolving issues on the first try and making the process easy for the customer.

Clear Communication: 81% of customers felt the agent communicated effectively, a key driver of the positive overall experience.`;

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-1">


      


      {/* Wins Section */}

      <Card 
        className="border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => !editingExperience && onUpdate && handleEditExperience()}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900 border-b border-blue-400 pb-1">Overall Experience & Satisfaction Analysis</h3>
          </div>
          
          {editingExperience ? (
            <div className="space-y-2">
              <Textarea
                value={experienceText}
                onChange={(e) => setExperienceText(e.target.value)}
                rows={6}
                className="text-sm border-gray-300 focus-visible:ring-1 focus-visible:ring-blue-500 w-full"
                placeholder="Enter your experience analysis..."
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleSave('overallExperience', experienceText)}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel}
                  className="border-gray-300 hover:bg-gray-50 h-7 px-3 text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {data.overallExperience ? (
                data.overallExperience.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="flex items-start space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700 leading-tight">{paragraph.trim()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No experience analysis provided. Click Edit to add your analysis.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>


      <Card 
        className="shadow-sm border-0 bg-blue-50 cursor-pointer hover:bg-blue-100/30 transition-colors"
        onClick={() => !editingWins && onUpdate && handleEditWins()}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900 border-b border-blue-400 pb-1">Wins</h3>
          </div>
          
          {editingWins ? (
            <div className="space-y-2">
              <Textarea
                value={winsText}
                onChange={(e) => setWinsText(e.target.value)}
                rows={6}
                className="text-sm border-gray-300 focus-visible:ring-1 focus-visible:ring-blue-500 w-full"
                placeholder="Enter your wins, one per line..."
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleSave('analysisText', winsText)}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancel}
                  className="border-gray-300 hover:bg-gray-50 h-7 px-3 text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {data.analysisText ? (
                data.analysisText.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="flex items-start space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700 leading-tight">{paragraph.trim()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No wins recorded yet. Click Edit to add wins.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>


      
    </div>
  );
}