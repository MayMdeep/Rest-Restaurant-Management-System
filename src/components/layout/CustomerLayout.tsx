import { Button } from "../ui/button";
import { 
  Home, 
  Menu, 
  Calendar, 
  Package, 
  ShoppingCart, 
  User,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import { ChatWidget } from "../chat/ChatWidget";

interface CustomerLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function CustomerLayout({ children, currentPage, onNavigate }: CustomerLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Mock cart count

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'orders', label: 'Orders', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-teal-orange rounded-lg flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-xl font-semibold text-primary">Resty</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t bg-card/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onNavigate(item.id)}
                    className="flex flex-col items-center space-y-1 h-auto py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Chat Widget */}
      <ChatWidget userType="customer" />
    </div>
  );
}