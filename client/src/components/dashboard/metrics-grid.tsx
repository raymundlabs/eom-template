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
      {/* Key Metrics Grid - PPT Compatible Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* Handle Time Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <div className="text-xs font-medium text-gray-700">
                AVG HANDLE TIME
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.avgHandleTime}
            </div>
          </CardContent>
        </Card>

        {/* Hold Time Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-success rounded-lg flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <div className="text-xs font-medium text-gray-700">
                AVG HOLD TIME
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.avgHoldTime}
            </div>
          </CardContent>
        </Card>

        {/* CSAT Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  CSAT (%)
                </div>
              </div>
              <CircularProgress
                value={data.csatScore}
                maxValue={5}
                color="var(--primary)"
                label={`${((data.csatScore / 5) * 100).toFixed(1)}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  Knowledge (%)
                </div>
              </div>
              <CircularProgress
                value={data.agentKnowledgeable || 0}
                maxValue={100}
                color="var(--success)"
                label={`${data.agentKnowledgeable || 0}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>

        {/* ACX Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  ACX (%)
                </div>
              </div>
              <CircularProgress
                value={data.acxScore}
                maxValue={100}
                color="var(--danger)"
                label={`${data.acxScore}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>

        {/* COMM Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  COMM (%)
                </div>
              </div>
              <CircularProgress
                value={data.agentCommunicated || 0}
                maxValue={100}
                color="var(--warning)"
                label={`${data.agentCommunicated || 0}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>

        {/* Friendliness Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  Friendliness (%)
                </div>
              </div>
              <CircularProgress
                value={data.agentFriendly || 0}
                maxValue={100}
                color="var(--purple)"
                label={`${data.agentFriendly || 0}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>

        {/* FCR Score */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  FCR (%)
                </div>
              </div>
              <CircularProgress
                value={data.fcrScore || 0}
                maxValue={100}
                color="var(--orange)"
                label={`${data.fcrScore || 0}%`}
                size={60}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics - PPT Compatible */}
      <div
        className="grid grid-cols-2 md:grid-cols-8
        gap-4"
      >
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-purple pb-2">
              PRESENTED
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.callsPresented?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-blue pb-2">
              ACCEPTED
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.callsAccepted?.toLocaleString() || "0"}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-teal pb-2">
              ADHERENCE
            </div>
            <div className="text-xl font-bold text-gray-900">-</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-success pb-2">
              ATTENDANCE
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.attendance ? `${data.attendance}%` : "-"}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="text-xs font-medium text-gray-600 mb-2 border-b-2 border-pink pb-2">
              SHRINKAGE
            </div>
            <div className="text-xl font-bold text-gray-900">
              {data.shrinkage ? `${data.shrinkage}%` : "-"}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
