import { Card, CardContent } from "@/components/ui/card";

interface BrandData {
  id: string;
  brand: string;
  production: string;
  attrition: string;
}

const dummyData: BrandData[] = [
  { id: '1', brand: 'Brand 1', production: '100', attrition: '5' },
  { id: '2', brand: 'Brand 2', production: '150', attrition: '8' },
  { id: '3', brand: 'Brand 3', production: '200', attrition: '12' },
  { id: '4', brand: 'Brand 4', production: '180', attrition: '7' },
  { id: '5', brand: 'Brand 5', production: '220', attrition: '15' },
  { id: '6', brand: 'Brand 6', production: '90', attrition: '3' },
  { id: '7', brand: 'Brand 7', production: '130', attrition: '9' },
  { id: '8', brand: 'Brand 8', production: '170', attrition: '11' },
  { id: '9', brand: 'Brand 9', production: '110', attrition: '6' },
  { id: '10', brand: 'Brand 10', production: '140', attrition: '8' },
];

export function BrandProductionDashboard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Brand Production & Attrition</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-3 border">Brand</th>
                <th className="text-center py-2 px-3 border">Production</th>
                <th className="text-center py-2 px-3 border">Attrition</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border">{item.brand}</td>
                  <td className="py-2 px-3 border text-center">{item.production}</td>
                  <td className="py-2 px-3 border text-center">{item.attrition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
