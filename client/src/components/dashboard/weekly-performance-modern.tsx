import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import type { KpiData } from "@shared/schema";
import { EditableCell } from "./editable-cell";

interface WeeklyPerformanceModernProps {
  data: KpiData;
}

export function WeeklyPerformanceModern({ data }: WeeklyPerformanceModernProps) {
  const [weeklyData, setWeeklyData] = useState(data.weeklyData || []);
  const [mtdData, setMtdData] = useState({
    callsPresented: data.callsPresented?.toString() || '1858',
    callsAccepted: data.callsAccepted?.toString() || '1857',
    avgHandleTime: data.avgHandleTime || '0:09:57',
    avgHoldTime: data.avgHoldTime || '0:01:45',
    quality: '90.34',
    csatScore: data.csatScore?.toString() || '4.18',
    agentCommunicated: data.agentCommunicated?.toString() || '77',
    agentKnowledgeable: data.agentKnowledgeable?.toString() || '77',
    acxScore: data.acxScore?.toString() || '78',
    adherence: data.adherence?.toString() || '0'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleUpdateCell = (weekIndex: number | 'mtd', field: string, value: string | number) => {
    if (weekIndex === 'mtd') {
      setMtdData(prev => {
        const newData = { ...prev, [field]: value };
        setHasChanges(true);
        return newData;
      });
    } else {
      setWeeklyData(prevData => {
        const newData = [...prevData];
        newData[weekIndex] = { ...newData[weekIndex], [field]: value };
        setHasChanges(true);
        return newData;
      });
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    const dataToSave = {
      weeklyData,
      mtdData: {
        callsPresented: parseInt(mtdData.callsPresented) || 0,
        callsAccepted: parseInt(mtdData.callsAccepted) || 0,
        avgHandleTime: mtdData.avgHandleTime,
        avgHoldTime: mtdData.avgHoldTime,
        csatScore: parseFloat(mtdData.csatScore) || 0,
        agentCommunicated: parseFloat(mtdData.agentCommunicated) || 0,
        agentKnowledgeable: parseFloat(mtdData.agentKnowledgeable) || 0,
        acxScore: parseFloat(mtdData.acxScore) || 0
      }
    };
    console.log('Saving data:', dataToSave);
    setHasChanges(false);
    setIsEditing(false);
    // TODO: Add error handling and success feedback
  };

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const card = document.querySelector('.cursor-pointer');
      if (card && !card.contains(event.target as Node)) {
        if (isEditing && hasChanges) {
          if (confirm('You have unsaved changes. Discard changes?')) {
            setWeeklyData(data.weeklyData || []);
            setMtdData({
              callsPresented: data.callsPresented?.toString() || '1858',
              callsAccepted: data.callsAccepted?.toString() || '1857',
              avgHandleTime: data.avgHandleTime || '0:09:57',
              avgHoldTime: data.avgHoldTime || '0:01:45',
              quality: '90.34',
              csatScore: data.csatScore?.toString() || '4.18',
              agentCommunicated: data.agentCommunicated?.toString() || '77',
              agentKnowledgeable: data.agentKnowledgeable?.toString() || '77',
              acxScore: data.acxScore?.toString() || '78',
              adherence: data.adherence?.toString() || '0'
            });
            setHasChanges(false);
            setIsEditing(false);
          }
        } else if (isEditing) {
          setIsEditing(false);
        }
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, hasChanges, data]);

  // Auto-save changes when not in edit mode and there are changes
  useEffect(() => {
    if (!isEditing && hasChanges) {
      handleSave();
    }
  }, [isEditing, hasChanges]);

  const formatDate = (weekNumber: number) => {
    const dates = [
      { from: "06/01/25", to: "06/07/25" },
      { from: "06/08/25", to: "06/14/25" },
      { from: "06/15/25", to: "06/21/25" },
      { from: "06/22/25", to: "06/30/25" }
    ];
    return dates[weekNumber - 1] || { from: "TBD", to: "TBD" };
  };

  return (
    <Card 
      className={`w-full cursor-pointer transition-all ${isEditing ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'}`}
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true);
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Weekly Performance
            {isEditing && (
              <span className="ml-2 text-sm text-blue-600 font-normal">
                (Editing - click outside to cancel)
              </span>
            )}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-1 px-1 font-semibold text-gray-700">Data From</th>
                {weeklyData.map((week) => {
                  const dateRange = formatDate(week.week);
                  return (
                    <th key={week.week} className="text-center py-1 px-2 font-semibold text-gray-700">
                      {dateRange.from}
                    </th>
                  );
                })}
                <th className="text-center py-1 px-1 font-semibold text-gray-700">06/01/25</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1 px-1 font-semibold text-gray-700">Data To</th>
                {weeklyData.map((week) => {
                  const dateRange = formatDate(week.week);
                  return (
                    <th key={week.week} className="text-center py-1 px-1 font-semibold text-gray-700">
                      {dateRange.to}
                    </th>
                  );
                })}
                <th className="text-center py-1 px-1 font-semibold text-gray-700">06/30/25</th>
              </tr>
              <tr className="bg-blue-600 text-white">
                <th className="text-left py-1 px-1 font-bold">KPI</th>
                {weeklyData.map((week, index) => (
                  <th key={week.week} className="text-center py-1 px-1 font-bold">
                    Week {week.week}
                  </th>
                ))}
                <th className="text-left py-1 px-1 font-bold">MTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 ">
              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">Presented</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.presented?.toLocaleString() || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'presented', Number(value) || 0)}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.callsPresented}
                    onUpdate={(value) => handleUpdateCell('mtd', 'callsPresented', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">Accepted</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.accepted?.toLocaleString() || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'accepted', Number(value) || 0)}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.callsAccepted}
                    onUpdate={(value) => handleUpdateCell('mtd', 'callsAccepted', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">AHT</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.aht || '0:09:41'}
                    onUpdate={(value) => handleUpdateCell(index, 'aht', String(value))}
                    className="text-center py-1 px-1"
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.avgHandleTime}
                    onUpdate={(value) => handleUpdateCell('mtd', 'avgHandleTime', String(value))}
                    className="font-semibold text-center"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">HOLD</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.hold || '0:01:32'}
                    onUpdate={(value) => handleUpdateCell(index, 'hold', String(value))}
                    className="text-center py-1 px-1"
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.avgHoldTime}
                    onUpdate={(value) => handleUpdateCell('mtd', 'avgHoldTime', String(value))}
                    className="font-semibold text-center"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">QUALITY</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.quality || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'quality', String(value))}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                    isPercentage={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.quality}
                    onUpdate={(value) => handleUpdateCell('mtd', 'quality', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                    isPercentage={true}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">ACX</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.acx || '0.00'}
                    onUpdate={(value) => handleUpdateCell(index, 'acx', String(value))}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.acxScore}
                    onUpdate={(value) => handleUpdateCell('mtd', 'acxScore', String(value))}
                    className="font-semibold  text-center"
                    isNumeric={true}
                    isPercentage={true}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">FCR</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.comm || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'comm', String(value))}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                    isPercentage={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.agentCommunicated}
                    onUpdate={(value) => handleUpdateCell('mtd', 'agentCommunicated', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                    isPercentage={true}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">Count</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.count?.toLocaleString() || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'count', Number(value) || 0)}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                  />
                ))}
             <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.agentCommunicated}
                    onUpdate={(value) => handleUpdateCell('mtd', 'agentCommunicated', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                    isPercentage={false}
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-1 px-1 font-medium text-gray-900">Adherence</td>
                {weeklyData.map((week, index) => (
                  <EditableCell
                    key={week.week}
                    value={week.adherence || '0'}
                    onUpdate={(value) => handleUpdateCell(index, 'adherence', String(value))}
                    className="text-center py-1 px-1"
                    isNumeric={true}
                    isPercentage={true}
                  />
                ))}
                <td className="text-center py-1 px-1">
                  <EditableCell
                    value={mtdData.adherence}
                    onUpdate={(value) => handleUpdateCell('mtd', 'adherence', String(value))}
                    className="font-semibold text-center"
                    isNumeric={true}
                    isPercentage={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}