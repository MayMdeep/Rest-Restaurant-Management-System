import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Badge } from "../ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [partySize, setPartySize] = useState<string>("");
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const availableSlots = [
    { time: "5:00 PM", available: true },
    { time: "5:30 PM", available: false },
    { time: "6:00 PM", available: true },
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: false },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true },
    { time: "9:00 PM", available: true },
    { time: "9:30 PM", available: false }
  ];

  const tableLayouts = [
    { id: 1, name: "Window Table", seats: 2, description: "Perfect for intimate dining with city views" },
    { id: 2, name: "Chef's Counter", seats: 4, description: "Interactive dining experience" },
    { id: 3, name: "Private Booth", seats: 6, description: "Semi-private seating for special occasions" },
    { id: 4, name: "Garden Terrace", seats: 8, description: "Outdoor dining with garden ambiance" }
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation submission
    alert("Reservation confirmed! You will receive a confirmation email shortly.");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return selectedDate && selectedTime && partySize;
      case 2:
        return true; // Table selection is optional
      case 3:
        return customerInfo.name && customerInfo.email && customerInfo.phone;
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">Make a Reservation</h1>
        <p className="text-muted-foreground">
          Book your perfect dining experience at Resty
        </p>
        
        {/* Step Indicator */}
        <div className="flex justify-center space-x-4 mt-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step > stepNumber ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="neumorphic">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {step === 1 && <><CalendarIcon className="w-5 h-5" /><span>Date & Time</span></>}
            {step === 2 && <><MapPin className="w-5 h-5" /><span>Table Preference</span></>}
            {step === 3 && <><Users className="w-5 h-5" /><span>Your Information</span></>}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="rounded-md border"
                />
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Party Size</Label>
                  <Select value={partySize} onValueChange={setPartySize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size} {size === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Available Times</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        className="justify-center"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Grayed out times are not available
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Table Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Choose your preferred seating area (optional)
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {tableLayouts.map((table) => (
                  <Card key={table.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{table.name}</h3>
                        <Badge variant="outline">{table.seats} seats</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{table.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requests">Special Requests</Label>
                <Input
                  id="requests"
                  placeholder="Allergies, celebrations, accessibility needs..."
                  value={customerInfo.specialRequests}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </div>

              {/* Reservation Summary */}
              <Card className="bg-muted/50 p-4 space-y-2">
                <h4 className="font-medium">Reservation Summary</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Party Size:</strong> {partySize} guests</p>
                </div>
              </Card>
            </form>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-gradient-teal-orange"
              >
                Confirm Reservation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}