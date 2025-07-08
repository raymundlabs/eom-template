import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Phone, Star, BookOpen, MessageSquare, Smile, CheckCircle, Zap } from "lucide-react";
import type { KpiData } from "@shared/schema";

interface MetricsGridProps {
  data: KpiData;
  onDataChange?: (field: string, value: string | number) => void;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  field: string;
  icon: React.ReactNode;
  bgColor: string;
  onValueChange: (field: string, value: string) => void;
}

const MetricCard = ({ title, value, field, icon, bgColor, onValueChange }: MetricCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue !== String(value)) {
      onValueChange(field, inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <Card className={`border-0 shadow-sm ${bgColor} hover:shadow-md transition-shadow`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-xs font-medium text-gray-700">{title}</span>
          </div>
        </div>
        {isEditing ? (
          <Input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="h-8 text-sm p-1 bg-white/50 border border-gray-300"
          />
        ) : (
          <div 
            className="text-xl font-semibold text-gray-900 cursor-text py-1 px-1 -mx-1 rounded hover:bg-white/30"
            onClick={() => setIsEditing(true)}
          >
            {value}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export function MetricsGrid({ data, onDataChange }: MetricsGridProps) {
  const [localData, setLocalData] = useState(data);

  const handleValueChange = (field: string, value: string) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    if (onDataChange) {
      onDataChange(field, value);
    }
  };

  const metrics = [
    {
      title: 'AHT',
      value: localData.avgHandleTime || '0:00',
      field: 'avgHandleTime',
      icon: <Clock className="w-3 h-3 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'AVG HOLD TIME',
      value: localData.avgHoldTime || '0:00',
      field: 'avgHoldTime',
      icon: <Phone className="w-3 h-3 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'CSAT (%)',
      value: localData.csatScore ? `${localData.csatScore}%` : '0%',
      field: 'csatScore',
      icon: <Star className="w-3 h-3 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Knowledge (%)',
      value: localData.agentKnowledgeable ? `${localData.agentKnowledgeable}%` : '0%',
      field: 'agentKnowledgeable',
      icon: <BookOpen className="w-3 h-3 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'ACX (%)',
      value: localData.acxScore ? `${localData.acxScore}%` : '0%',
      field: 'acxScore',
      icon: <Zap className="w-3 h-3 text-red-600" />,
      bgColor: 'bg-red-50',
    },
    {
      title: 'COMM (%)',
      value: localData.agentCommunicated ? `${localData.agentCommunicated}%` : '0%',
      field: 'agentCommunicated',
      icon: <MessageSquare className="w-3 h-3 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Friendliness (%)',
      value: localData.agentFriendly ? `${localData.agentFriendly}%` : '0%',
      field: 'agentFriendly',
      icon: <Smile className="w-3 h-3 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'FCR (%)',
      value: localData.fcrScore ? `${localData.fcrScore}%` : '0%',
      field: 'fcrScore',
      icon: <CheckCircle className="w-3 h-3 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          field={metric.field}
          icon={metric.icon}
          bgColor={metric.bgColor}
          onValueChange={handleValueChange}
        />
      ))}
    </div>
  );
}
