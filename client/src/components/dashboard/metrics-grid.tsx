import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "./circular-progress";
import { Clock, Phone } from "lucide-react";
import type { KpiData } from "@shared/schema";

interface MetricsGridProps {
  data: KpiData;
}

export function MetricsGrid({ data }: MetricsGridProps) {
  return (
    <>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Handle Time Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm text-gray-600">AVG HANDLE TIME</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.avgHandleTime}</div>
          </CardContent>
        </Card>

        {/* Hold Time Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-success" />
              </div>
              <div className="text-sm text-gray-600">AVG HOLD TIME</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.avgHoldTime}</div>
          </CardContent>
        </Card>

        {/* CSAT Score */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">CSAT</div>
                <div className="text-xs text-gray-500">KNWL</div>
              </div>
              <CircularProgress 
                value={data.csatScore} 
                maxValue={5} 
                color="hsl(221, 83%, 53%)"
                label={`${data.csatScore}%`}
              />
            </div>
          </CardContent>
        </Card>

        {/* ACX Score */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">ACX</div>
              </div>
              <CircularProgress 
                value={data.acxScore} 
                maxValue={100} 
                color="hsl(0, 84%, 60%)"
                label={`${data.acxScore}%`}
              />
            </div>
          </CardContent>
        </Card>

        {/* COMM Score */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">COMM</div>
              </div>
              <CircularProgress 
                value={0} 
                maxValue={100} 
                color="hsl(38, 92%, 50%)"
                label="0.00%"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quality Score */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">QUALITY</div>
              </div>
              <CircularProgress 
                value={0} 
                maxValue={100} 
                color="hsl(156, 39%, 54%)"
                label="0.00%"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2 border-b-2 border-purple-500 pb-2">
              PRESENTED
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.callsPresented?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2 border-b-2 border-blue-500 pb-2">
              ACCEPTED
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.callsAccepted?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2 border-b-2 border-cyan-500 pb-2">
              ADHERENCE
            </div>
            <div className="text-2xl font-bold text-gray-900">-</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2 border-b-2 border-green-500 pb-2">
              ATTENDANCE
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.attendance ? `${data.attendance}%` : "-"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-2 border-b-2 border-pink-500 pb-2">
              SHRINKAGE
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.shrinkage ? `${data.shrinkage}%` : "-"}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
