import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart3, Download, Filter } from "lucide-react";

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="max-w-md mx-auto space-y-4">
            <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">Reports & Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive reporting system coming soon. Generate sales reports, view customer analytics, 
              track performance metrics, and export data for further analysis.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" disabled>
                Sales Reports
              </Button>
              <Button variant="outline" disabled>
                Customer Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}