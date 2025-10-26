import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Calendar, 
  AlertTriangle,
  DollarSign,
  Clock,
  Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export function DashboardPage() {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$2,847",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Orders",
      value: "23",
      change: "+3",
      icon: ShoppingBag,
      color: "text-blue-600"
    },
    {
      title: "Reservations",
      value: "45",
      change: "+8",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Avg Rating",
      value: "4.9",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  const revenueData = [
    { name: 'Mon', revenue: 2400 },
    { name: 'Tue', revenue: 1398 },
    { name: 'Wed', revenue: 9800 },
    { name: 'Thu', revenue: 3908 },
    { name: 'Fri', revenue: 4800 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4300 }
  ];

  const orderData = [
    { name: '9AM', orders: 12 },
    { name: '12PM', orders: 25 },
    { name: '3PM', orders: 18 },
    { name: '6PM', orders: 42 },
    { name: '9PM', orders: 35 }
  ];

  const categoryData = [
    { name: 'Main Courses', value: 45, color: '#008080' },
    { name: 'Appetizers', value: 25, color: '#FFA500' },
    { name: 'Desserts', value: 20, color: '#20c997' },
    { name: 'Beverages', value: 10, color: '#6f42c1' }
  ];

  const recentOrders = [
    { id: "ORD-001", table: 12, items: 3, total: 67.50, status: "ready", time: "2 min ago" },
    { id: "ORD-002", table: 8, items: 2, total: 45.99, status: "preparing", time: "5 min ago" },
    { id: "ORD-003", table: 15, items: 4, total: 89.75, status: "pending", time: "8 min ago" },
    { id: "ORD-004", table: 3, items: 1, total: 28.99, status: "served", time: "12 min ago" }
  ];

  const lowStockItems = [
    { name: "Truffle Oil", current: 2, minimum: 5, urgency: "high" },
    { name: "Wagyu Beef", current: 3, minimum: 8, urgency: "medium" },
    { name: "Fresh Basil", current: 1, minimum: 3, urgency: "high" },
    { name: "Parmesan Cheese", current: 4, minimum: 6, urgency: "low" }
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="neumorphic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-teal-orange`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Weekly Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#008080" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">Table {order.table} • {order.items} items</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
            <Button variant="outline" size="sm">Manage Inventory</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{item.name}</p>
                  <Badge variant="outline" className={getUrgencyColor(item.urgency)}>
                    {item.urgency} priority
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {item.current}</span>
                    <span>Minimum: {item.minimum}</span>
                  </div>
                  <Progress 
                    value={(item.current / item.minimum) * 100} 
                    className={`h-2 ${item.urgency === 'high' ? 'bg-red-100' : item.urgency === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Today's Order Pattern</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#FFA500" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}