import { BrandProductionDashboard } from "@/components/dashboard/brand-production-dashboard";

export default function BrandProductionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Brand Production & Attrition</h1>
      <div className="max-w-4xl mx-auto">
        <BrandProductionDashboard />
      </div>
    </div>
  );
}
