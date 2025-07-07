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
      {/* Key Metrics Grid - Compact Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {/* Handle Time Card */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-2">
            <div className="flex items-center space-x-1 mb-1">
              <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                <Clock className="w-2 h-2 text-white" />
              </div>
              <div className="text-base font-medium text-gray-700">
                AHT              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.avgHandleTime}
            </div>
          </CardContent>
        </Card>

        {/* Hold Time Card */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-2">
            <div className="flex items-center space-x-1 mb-1">
              <div className="w-4 h-4 bg-success rounded flex items-center justify-center">
                <Phone className="w-2 h-2 text-white" />
              </div>
              <div className="text-base font-medium text-gray-700">
                AVG HOLD TIME
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {data.avgHoldTime}
            </div>
          </CardContent>
        </Card>

        {/* CSAT Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  CSAT (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--primary)' }}>
                {`${((data.csatScore / 5) * 100).toFixed(1)}%`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  Knowledge (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--success)' }}>
                {`${data.agentKnowledgeable || 0}%`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACX Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  ACX (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--danger)' }}>
                {`${data.acxScore}%`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COMM Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  COMM (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--warning)' }}>
                {`${data.agentCommunicated || 0}%`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Friendliness Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  Friendliness (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--purple)' }}>
                {`${data.agentFriendly || 0}%`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FCR Score */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-gray-700 mb-1">
                  FCR (%)
                </div>
              </div>
              <div className="w-full text-center font-extrabold text-3xl" style={{ color: 'var(--orange)' }}>
                {`${data.fcrScore || 0}%`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics - Compact */}
    </>
  );
}
