import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Users, UserPlus, Clock } from "lucide-react";

export function StaffManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <div className="max-w-md mx-auto space-y-4">
            <Users className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">Staff Management</h3>
            <p className="text-muted-foreground">
              Complete staff management system coming soon. Manage employee profiles, create schedules, 
              track attendance, and assign roles and permissions.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" disabled>
                <Clock className="w-4 h-4 mr-2" />
                Schedule Management
              </Button>
              <Button variant="outline" disabled>
                Role Management
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}