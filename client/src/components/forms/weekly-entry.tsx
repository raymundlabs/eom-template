import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { WeeklyEntry as WeeklyEntryType } from "@shared/schema";

interface WeeklyEntryProps {
  data: WeeklyEntryType;
  onUpdate: (data: WeeklyEntryType) => void;
  onRemove: () => void;
}

export function WeeklyEntry({ data, onUpdate, onRemove }: WeeklyEntryProps) {
  const handleChange = (field: keyof WeeklyEntryType, value: string | number) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">Week {data.week}</h4>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div>
            <Label className="text-xs font-medium text-gray-700">Presented</Label>
            <Input
              type="number"
              value={data.presented}
              onChange={(e) => handleChange("presented", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Accepted</Label>
            <Input
              type="number"
              value={data.accepted}
              onChange={(e) => handleChange("accepted", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">AHT</Label>
            <Input
              type="text"
              value={data.aht}
              onChange={(e) => handleChange("aht", e.target.value)}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Hold</Label>
            <Input
              type="text"
              value={data.hold}
              onChange={(e) => handleChange("hold", e.target.value)}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Quality</Label>
            <Input
              type="text"
              value={data.quality || ""}
              onChange={(e) => handleChange("quality", e.target.value)}
              className="mt-1 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <Label className="text-xs font-medium text-gray-700">CSAT</Label>
            <Input
              type="number"
              step="0.01"
              value={data.csat}
              onChange={(e) => handleChange("csat", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">COMM</Label>
            <Input
              type="number"
              step="0.01"
              value={data.comm}
              onChange={(e) => handleChange("comm", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Knowledge</Label>
            <Input
              type="number"
              step="0.01"
              value={data.knowledge}
              onChange={(e) => handleChange("knowledge", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">ACX</Label>
            <Input
              type="number"
              step="0.01"
              value={data.acx}
              onChange={(e) => handleChange("acx", Number(e.target.value))}
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Adherence</Label>
            <Input
              type="text"
              value={data.adherence || ""}
              onChange={(e) => handleChange("adherence", e.target.value)}
              className="mt-1 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
