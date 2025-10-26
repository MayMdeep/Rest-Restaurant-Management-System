import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, MapPin } from "lucide-react";

export function TableManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Table Management</h1>
        <Button>
          <Table className="w-4 h-4 mr-2" />
          Add Table
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Layout</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="max-w-md mx-auto space-y-4">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">Table Management</h3>
            <p className="text-muted-foreground">
              Table layout and management system coming soon. You'll be able to configure table arrangements, 
              manage capacities, and track table status in real-time.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" disabled>
                Configure Layout
              </Button>
              <Button variant="outline" disabled>
                View Availability
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}