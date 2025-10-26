import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Minus,
  ShoppingCart,
  Leaf,
  Flame
} from "lucide-react";

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const categories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "mains", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
      price: 28.99,
      category: "mains",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: true,
      dietary: ["healthy"],
      spicy: false
    },
    {
      id: 2,
      name: "Truffle Pasta",
      description: "Handmade fettuccine with black truffle and parmesan",
      price: 32.99,
      category: "mains",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: true,
      dietary: ["vegetarian"],
      spicy: false
    },
    {
      id: 3,
      name: "Spicy Tuna Tartare",
      description: "Fresh tuna with avocado, sesame, and spicy mayo",
      price: 18.99,
      category: "appetizers",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: true,
      dietary: ["healthy"],
      spicy: true
    },
    {
      id: 4,
      name: "Wagyu Steak",
      description: "Premium wagyu beef with seasonal vegetables",
      price: 65.99,
      category: "mains",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: false,
      dietary: [],
      spicy: false
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 12.99,
      category: "desserts",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: true,
      dietary: ["vegetarian"],
      spicy: false
    },
    {
      id: 6,
      name: "Craft Coffee",
      description: "Single origin coffee beans, expertly roasted",
      price: 4.99,
      category: "beverages",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      available: true,
      dietary: ["vegan"],
      spicy: false
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully crafted dishes made with the finest ingredients
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`group ${!item.available ? 'opacity-60' : ''}`}>
            <div className="relative overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {item.dietary.includes("vegetarian") && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Leaf className="w-3 h-3 mr-1" />
                    Vegetarian
                  </Badge>
                )}
                {item.spicy && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <Flame className="w-3 h-3 mr-1" />
                    Spicy
                  </Badge>
                )}
              </div>
              <Badge className="absolute top-3 right-3 bg-orange">
                <Star className="w-3 h-3 mr-1" />
                {item.rating}
              </Badge>
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Sold Out</Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-lg font-bold text-primary">${item.price}</span>
              </div>
              
              <p className="text-muted-foreground text-sm">{item.description}</p>
              
              {item.available ? (
                cart[item.id] ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-medium">{cart[item.id]}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(item.id)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${(item.price * cart[item.id]).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Order
                  </Button>
                )
              ) : (
                <Button className="w-full" disabled>
                  Currently Unavailable
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Cart Summary */}
      {getTotalCartItems() > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-gradient-teal-orange text-white p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <ShoppingCart className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <span className="font-medium">{getTotalCartItems()} items</span>
                <span>•</span>
                <span className="font-bold">${getCartTotal().toFixed(2)}</span>
              </div>
              <Button variant="secondary" size="sm">
                View Cart
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}