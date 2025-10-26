import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Truck, 
  ChefHat,
  Bell,
  User,
  MapPin,
  DollarSign,
  RefreshCw
} from "lucide-react";

export function OrdersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      tableNumber: 12,
      status: "pending",
      orderTime: "2024-01-24 19:30",
      estimatedTime: "20:15",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 28.99, notes: "Medium rare" },
        { name: "Truffle Pasta", quantity: 1, price: 32.99, notes: "Extra cheese" },
        { name: "Craft Coffee", quantity: 2, price: 4.99, notes: "" }
      ],
      total: 71.96,
      specialRequests: "Customer has nut allergy",
      assignedStaff: null
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      tableNumber: 8,
      status: "preparing",
      orderTime: "2024-01-24 19:15",
      estimatedTime: "20:00",
      items: [
        { name: "Wagyu Steak", quantity: 1, price: 65.99, notes: "Well done" },
        { name: "Chocolate Lava Cake", quantity: 1, price: 12.99, notes: "Extra sauce" }
      ],
      total: 78.98,
      specialRequests: "",
      assignedStaff: "Chef Maria"
    },
    {
      id: "ORD-003",
      customerName: "Bob Johnson",
      tableNumber: 15,
      status: "ready",
      orderTime: "2024-01-24 18:45",
      estimatedTime: "19:30",
      items: [
        { name: "Spicy Tuna Tartare", quantity: 1, price: 18.99, notes: "" },
        { name: "Truffle Pasta", quantity: 2, price: 32.99, notes: "One vegetarian" }
      ],
      total: 84.97,
      specialRequests: "Birthday celebration",
      assignedStaff: "Server Tom"
    },
    {
      id: "ORD-004",
      customerName: "Alice Wilson",
      tableNumber: 5,
      status: "served",
      orderTime: "2024-01-24 18:30",
      estimatedTime: "19:15",
      items: [
        { name: "Grilled Salmon", quantity: 2, price: 28.99, notes: "Lemon on side" },
        { name: "Craft Coffee", quantity: 2, price: 4.99, notes: "Decaf" }
      ],
      total: 67.96,
      specialRequests: "",
      assignedStaff: "Server Emma"
    }
  ];

  const staff = [
    { id: "chef1", name: "Chef Maria", role: "Chef" },
    { id: "chef2", name: "Chef David", role: "Chef" },
    { id: "server1", name: "Server Tom", role: "Server" },
    { id: "server2", name: "Server Emma", role: "Server" },
    { id: "server3", name: "Server Lisa", role: "Server" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";
      case "ready": return "bg-orange-100 text-orange-800";
      case "served": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "preparing": return <ChefHat className="w-4 h-4" />;
      case "ready": return <Bell className="w-4 h-4" />;
      case "served": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending": return "preparing";
      case "preparing": return "ready";
      case "ready": return "served";
      default: return currentStatus;
    }
  };

  const getNextStatusLabel = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending": return "Start Preparing";
      case "preparing": return "Mark Ready";
      case "ready": return "Mark Served";
      default: return "Complete";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.tableNumber.toString().includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    pending: orders.filter(o => o.status === "pending"),
    preparing: orders.filter(o => o.status === "preparing"),
    ready: orders.filter(o => o.status === "ready"),
    served: orders.filter(o => o.status === "served")
  };

  const updateOrderStatus = (orderId: string) => {
    // Mock function to update order status
    console.log(`Updating order ${orderId} status`);
  };

  const assignStaffToOrder = (orderId: string, staffName: string) => {
    // Mock function to assign staff
    console.log(`Assigning ${staffName} to order ${orderId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <Button className="bg-gradient-teal-orange">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Orders
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders, customers, or table numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="served">Served</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({ordersByStatus.pending.length})</TabsTrigger>
          <TabsTrigger value="preparing">Preparing ({ordersByStatus.preparing.length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({ordersByStatus.ready.length})</TabsTrigger>
          <TabsTrigger value="served">Served ({ordersByStatus.served.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>Table {order.tableNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Ordered: {order.orderTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {order.specialRequests && (
                      <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-sm font-medium text-yellow-800">Special Request:</p>
                        <p className="text-sm text-yellow-700">{order.specialRequests}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start p-2 rounded border">
                          <div>
                            <span className="font-medium">{item.quantity}x {item.name}</span>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground italic">Note: {item.notes}</p>
                            )}
                          </div>
                          <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Assigned Staff</h4>
                      <Select 
                        value={order.assignedStaff || ""} 
                        onValueChange={(value) => assignStaffToOrder(order.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Assign staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          {staff.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name} ({member.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {order.status !== "served" && (
                      <Button 
                        className="w-full bg-gradient-teal-orange"
                        onClick={() => updateOrderStatus(order.id)}
                      >
                        {getNextStatusLabel(order.status)}
                      </Button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Print Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Individual status tabs */}
        {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {statusOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Same content as above but filtered by status */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>Table {order.tableNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Ordered: {order.orderTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start p-2 rounded border">
                            <div>
                              <span className="font-medium">{item.quantity}x {item.name}</span>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground italic">Note: {item.notes}</p>
                              )}
                            </div>
                            <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.status !== "served" && (
                        <Button 
                          className="w-full bg-gradient-teal-orange"
                          onClick={() => updateOrderStatus(order.id)}
                        >
                          {getNextStatusLabel(order.status)}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}