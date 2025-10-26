import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Clock,
  CheckCheck,
  Minimize2,
  Maximize2,
  Paperclip,
  Smile,
  Phone,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "support";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

interface ChatWidgetProps {
  userType: "customer" | "admin";
}

export function ChatWidget({ userType }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock initial messages based on user type
  useEffect(() => {
    const initialMessages: Message[] = userType === "customer" ? [
      {
        id: "1",
        content: "👋 Hello! Welcome to Resty. How can I help you today?",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000),
        status: "read"
      }
    ] : [
      {
        id: "1",
        content: "Admin Dashboard Chat - Monitor customer conversations and team communications here.",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000),
        status: "read"
      }
    ];
    setMessages(initialMessages);
  }, [userType]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock quick responses based on user type
  const quickResponses = userType === "customer" ? [
    "View Menu",
    "Make Reservation", 
    "Track My Order",
    "Contact Support"
  ] : [
    "Customer Issues",
    "Order Updates",
    "Staff Messages",
    "System Status"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: userType === "customer" ? "bot" : "support",
        timestamp: new Date(),
        status: "delivered"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (userType === "customer") {
      if (message.includes("menu")) {
        return "I can help you browse our menu! We have delicious appetizers, main courses, and desserts. Would you like me to show you our featured items?";
      } else if (message.includes("reservation")) {
        return "I'd be happy to help with your reservation. What date and time would you prefer? For how many people?";
      } else if (message.includes("order")) {
        return "Let me check your order status. Could you please provide your order number?";
      } else {
        return "Thank you for your message! Our support team will assist you shortly. Is there anything specific I can help you with right now?";
      }
    } else {
      return "Admin query received. Processing request and routing to appropriate department.";
    }
  };

  const handleQuickResponse = (response: string) => {
    setInputValue(response);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={toggleChat}
              className="w-14 h-14 rounded-full bg-gradient-teal-orange shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              size="icon"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-orange text-white text-xs min-w-[20px] h-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className={`w-80 md:w-96 shadow-2xl neumorphic border-2 border-primary/20 ${
              isMinimized ? 'h-16' : 'h-[500px]'
            } transition-all duration-300`}>
              {/* Chat Header */}
              <CardHeader className="pb-2 bg-gradient-teal-orange text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>
                      {userType === "customer" ? "Customer Support" : "Admin Chat"}
                    </span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="w-6 h-6 text-white hover:bg-white/20"
                    >
                      {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChat}
                      className="w-6 h-6 text-white hover:bg-white/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {!isMinimized && (
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online - Average response time: 2 min</span>
                  </div>
                )}
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[420px]">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                              message.sender === "user" 
                                ? "bg-primary" 
                                : message.sender === "bot" 
                                ? "bg-orange" 
                                : "bg-teal"
                            }`}>
                              {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className="space-y-1">
                              <div className={`p-3 rounded-2xl ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                {message.sender === "user" && message.status && (
                                  <CheckCheck className={`w-3 h-3 ${
                                    message.status === "read" ? "text-primary" : "text-muted-foreground"
                                  }`} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white text-sm">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-muted p-3 rounded-2xl">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick Responses */}
                  <div className="p-3 border-t bg-muted/50">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickResponses.map((response) => (
                        <Button
                          key={response}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickResponse(response)}
                          className="text-xs h-7"
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-card">
                    <div className="flex items-end space-x-2">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <div className="flex space-x-1">
                        {userType === "admin" && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Video className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          className="bg-gradient-teal-orange hover:opacity-90 px-3 h-8"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}