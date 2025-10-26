import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Package, AlertTriangle } from "lucide-react";

export function InventoryManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button>
          <Package className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="max-w-md mx-auto space-y-4">
            <Package className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">Inventory Management</h3>
            <p className="text-muted-foreground">
              Complete inventory tracking system coming soon. Track stock levels, receive low stock alerts, 
              manage suppliers, and generate purchase orders.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" disabled>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Low Stock Alerts
              </Button>
              <Button variant="outline" disabled>
                Supplier Management
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}