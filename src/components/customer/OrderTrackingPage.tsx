import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { 
  Search, 
  Clock, 
  CheckCircle, 
  Truck, 
  ChefHat,
  Bell,
  MapPin,
  Phone
} from "lucide-react";

export function OrderTrackingPage() {
  const [searchOrderId, setSearchOrderId] = useState("");
  
  const orders = [
    {
      id: "ORD-001",
      status: "served",
      orderTime: "2024-01-24 18:30",
      estimatedTime: "19:15",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 28.99 },
        { name: "Truffle Pasta", quantity: 1, price: 32.99 },
        { name: "Craft Coffee", quantity: 2, price: 4.99 }
      ],
      total: 71.96,
      tableNumber: 12,
      progress: 100
    },
    {
      id: "ORD-002",
      status: "ready",
      orderTime: "2024-01-24 19:15",
      estimatedTime: "20:00",
      items: [
        { name: "Wagyu Steak", quantity: 1, price: 65.99 },
        { name: "Chocolate Lava Cake", quantity: 1, price: 12.99 }
      ],
      total: 78.98,
      tableNumber: 8,
      progress: 85
    },
    {
      id: "ORD-003",
      status: "preparing",
      orderTime: "2024-01-24 19:45",
      estimatedTime: "20:30",
      items: [
        { name: "Spicy Tuna Tartare", quantity: 1, price: 18.99 },
        { name: "Truffle Pasta", quantity: 2, price: 32.99 }
      ],
      total: 84.97,
      tableNumber: 15,
      progress: 45
    },
    {
      id: "ORD-004",
      status: "pending",
      orderTime: "2024-01-24 20:00",
      estimatedTime: "20:45",
      items: [
        { name: "Grilled Salmon", quantity: 2, price: 28.99 },
        { name: "Craft Coffee", quantity: 2, price: 4.99 }
      ],
      total: 67.96,
      tableNumber: 5,
      progress: 15
    }
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

  const getProgressColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "preparing": return "bg-blue-500";
      case "ready": return "bg-orange-500";
      case "served": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchOrderId.toLowerCase())
  );

  const getOrderSteps = (status: string) => {
    const steps = [
      { label: "Order Received", status: "pending" },
      { label: "Preparing", status: "preparing" },
      { label: "Ready", status: "ready" },
      { label: "Served", status: "served" }
    ];

    const currentIndex = steps.findIndex(step => step.status === status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Order Tracking</h1>
        <p className="text-muted-foreground">
          Track your orders in real-time and get notified when they're ready
        </p>
      </div>

      {/* Search */}
      <Card className="neumorphic">
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by Order ID..."
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Orders */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Live Orders</h2>
        
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <span>Order {order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </CardTitle>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Table {order.tableNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>

                  {/* Order Steps */}
                  <div className="flex items-center justify-between">
                    {getOrderSteps(order.status).map((step, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : step.active
                            ? 'border-primary text-primary'
                            : 'border-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            getStatusIcon(step.status)
                          )}
                        </div>
                        <span className={`text-xs text-center ${
                          step.active ? 'text-primary font-medium' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </span>
                        {index < 3 && (
                          <div className={`absolute w-16 h-0.5 mt-4 ${
                            step.completed ? 'bg-primary' : 'bg-muted'
                          }`} style={{ left: `${25 + index * 25}%` }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Order Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Order Time:</span>
                          <span>{order.orderTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Ready:</span>
                          <span>{order.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Table Number:</span>
                          <span>{order.tableNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    {order.status === "ready" && (
                      <Button className="bg-gradient-teal-orange">
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Staff
                      </Button>
                    )}
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Restaurant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-teal/10 to-orange/10">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-lg font-semibold">Need Help?</h3>
          <p className="text-muted-foreground">
            If you have any questions about your order, don't hesitate to contact our staff
          </p>
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call (555) 123-RESTY
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}