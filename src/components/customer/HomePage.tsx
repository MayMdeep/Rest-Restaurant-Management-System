import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight,
  Utensils,
  Users,
  Award
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredDishes = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs",
      price: 28.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 2,
      name: "Truffle Pasta",
      description: "Handmade pasta with black truffle",
      price: 32.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 3,
      name: "Wagyu Steak",
      description: "Premium wagyu with seasonal vegetables",
      price: 65.99,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1723744895523-75a5b52de0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NTg2NDc1MjN8MA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  const stats = [
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Users, label: "Happy Customers", value: "10K+" },
    { icon: Utensils, label: "Dishes Served", value: "50K+" },
    { icon: Star, label: "Average Rating", value: "4.9" }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-3xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NjEzMDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6 max-w-2xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Welcome to <span className="text-orange">Resty</span>
            </h1>
            <p className="text-xl opacity-90">
              Experience culinary excellence with our chef-curated dishes and exceptional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-teal-orange hover:opacity-90 transition-opacity"
                onClick={() => onNavigate('menu')}
              >
                View Menu
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => onNavigate('reservations')}
              >
                Make Reservation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-12">
        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="neumorphic p-6 text-center">
                <CardContent className="p-0 space-y-3">
                  <div className="w-12 h-12 bg-gradient-teal-orange rounded-lg flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Featured Dishes */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Featured Dishes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our chef's signature creations, made with the finest ingredients and passion for culinary excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange">
                    <Star className="w-3 h-3 mr-1" />
                    {dish.rating}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{dish.name}</h3>
                    <span className="text-lg font-bold text-primary">${dish.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{dish.description}</p>
                  <Button className="w-full" variant="outline">
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('menu')}
            >
              View Full Menu
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Restaurant Info */}
        <section className="bg-gradient-to-r from-teal/10 to-orange/10 rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About Resty</h2>
              <p className="text-muted-foreground">
                Founded in 2020, Resty has been serving exceptional cuisine that combines traditional flavors 
                with modern culinary techniques. Our commitment to quality and innovation has earned us 
                recognition as one of the city's premier dining destinations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Mon-Sun: 11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>123 Culinary Street, Food District</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-RESTY</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gradient-teal-orange"
                onClick={() => onNavigate('reservations')}
              >
                Reserve a Table
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('menu')}
              >
                Order Online
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}