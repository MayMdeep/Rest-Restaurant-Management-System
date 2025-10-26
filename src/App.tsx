import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { CustomerLayout } from "./components/layout/CustomerLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./components/customer/HomePage";
import { MenuPage } from "./components/customer/MenuPage";
import { ReservationsPage } from "./components/customer/ReservationsPage";
import { OrderTrackingPage } from "./components/customer/OrderTrackingPage";
import { DashboardPage } from "./components/admin/DashboardPage";
import { OrdersManagementPage } from "./components/admin/OrdersManagementPage";
import { ChatManagementPage } from "./components/admin/ChatManagementPage";
import { MenuManagementPage } from "./components/admin/MenuManagementPage";
import { TableManagementPage } from "./components/admin/TableManagementPage";
import { InventoryManagementPage } from "./components/admin/InventoryManagementPage";
import { ReportsPage } from "./components/admin/ReportsPage";
import { StaffManagementPage } from "./components/admin/StaffManagementPage";
import { 
  User, 
  Shield, 
  ArrowRight,
  Utensils,
  Settings,
  BarChart3
} from "lucide-react";

type Interface = "selection" | "customer" | "admin";
type CustomerPage = "home" | "menu" | "reservations" | "orders" | "cart";
type AdminPage = "dashboard" | "orders" | "chat" | "menu-management" | "tables" | "inventory" | "reports" | "staff";

export default function App() {
  const [currentInterface, setCurrentInterface] = useState<Interface>("selection");
  const [customerPage, setCustomerPage] = useState<CustomerPage>("home");
  const [adminPage, setAdminPage] = useState<AdminPage>("dashboard");

  const handleCustomerNavigate = (page: string) => {
    setCustomerPage(page as CustomerPage);
  };

  const handleAdminNavigate = (page: string) => {
    setAdminPage(page as AdminPage);
  };

  // Interface Selection Screen
  if (currentInterface === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-teal-orange rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                R
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Welcome to <span className="text-primary">Resty</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive restaurant management system. Choose your interface to get started.
            </p>
          </div>

          {/* Interface Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Customer Interface */}
            <Card className="neumorphic hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setCurrentInterface("customer")}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Customer Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Browse menu, make reservations, track orders, and enjoy your dining experience.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Utensils className="w-4 h-4 mr-2" />
                    <span>Browse Menu & Order Food</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    <span>Make Table Reservations</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>Track Order Status</span>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Enter Customer Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Admin Interface */}
            <Card className="neumorphic hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setCurrentInterface("admin")}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Manage orders, menu, staff, inventory, and restaurant operations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>Analytics & Reports</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Order & Menu Management</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    <span>Staff & Inventory Control</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-teal-orange group-hover:opacity-90 transition-opacity">
                  Enter Admin Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Back to Selection Button */}
          <div className="text-center">
            <Button variant="outline" size="sm">
              Need help choosing? Contact support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Customer Interface
  if (currentInterface === "customer") {
    const renderCustomerPage = () => {
      switch (customerPage) {
        case "home":
          return <HomePage onNavigate={handleCustomerNavigate} />;
        case "menu":
          return <MenuPage />;
        case "reservations":
          return <ReservationsPage />;
        case "orders":
          return <OrderTrackingPage />;
        case "cart":
          return (
            <div className="container mx-auto px-6 py-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                  <p className="text-muted-foreground">Cart functionality coming soon...</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => handleCustomerNavigate("menu")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        default:
          return <HomePage onNavigate={handleCustomerNavigate} />;
      }
    };

    return (
      <CustomerLayout 
        currentPage={customerPage} 
        onNavigate={handleCustomerNavigate}
      >
        <div className="relative">
          {/* Back to Interface Selection */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-4 left-4 z-10"
            onClick={() => setCurrentInterface("selection")}
          >
            ← Back to Interface Selection
          </Button>
          {renderCustomerPage()}
        </div>
      </CustomerLayout>
    );
  }

  // Admin Interface
  if (currentInterface === "admin") {
  const renderAdminPage = () => {
  switch (adminPage) {
    case "dashboard":
      return <DashboardPage />;
    case "orders":
      return <OrdersManagementPage />;
    case "chat":
      return <ChatManagementPage />;
    case "menu-management":
      return <MenuManagementPage />;
    case "tables":
      return <TableManagementPage />;
    case "inventory":
      return <InventoryManagementPage />;
    case "reports":
      return <ReportsPage />;
    case "staff":
      return <StaffManagementPage />;
    default:
      return <DashboardPage />;
  }
};

    return (
      <AdminLayout 
        currentPage={adminPage} 
        onNavigate={handleAdminNavigate}
      >
        <div className="relative">
          {/* Back to Interface Selection */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-0 right-0 z-10"
            onClick={() => setCurrentInterface("selection")}
          >
            ← Back to Interface Selection
          </Button>
          {renderAdminPage()}
        </div>
      </AdminLayout>
    );
  }

  return null;
}