import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

export function MenuManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-xl font-semibold">Menu Management</h3>
            <p className="text-muted-foreground">
              Full menu management functionality coming soon. You'll be able to add, edit, and remove menu items, 
              update prices, and manage categories.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" disabled>
                <Edit className="w-4 h-4 mr-2" />
                Edit Items
              </Button>
              <Button variant="outline" disabled>
                <Trash2 className="w-4 h-4 mr-2" />
                Manage Categories
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}