import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  MessageCircle, 
  Clock, 
  User, 
  Filter,
  MoreVertical,
  Check,
  AlertCircle,
  Star
} from "lucide-react";

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  status: "active" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  unreadCount: number;
  tags: string[];
}

interface ChatConversationsProps {
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId?: string;
}

export function ChatConversations({ onSelectConversation, selectedConversationId }: ChatConversationsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "resolved">("all");

  // Mock conversation data
  const conversations: Conversation[] = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      lastMessage: "Thank you for the quick response! I'll try that.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "active",
      priority: "medium",
      unreadCount: 0,
      tags: ["reservation", "vip"]
    },
    {
      id: "2", 
      customerName: "Mike Chen",
      lastMessage: "Is my order ready for pickup?",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "pending",
      priority: "high",
      unreadCount: 2,
      tags: ["order", "pickup"]
    },
    {
      id: "3",
      customerName: "Emily Rodriguez",
      lastMessage: "The food was absolutely delicious! Thank you.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "resolved",
      priority: "low",
      unreadCount: 0,
      tags: ["feedback", "positive"]
    },
    {
      id: "4",
      customerName: "David Wilson",
      lastMessage: "Can I modify my reservation for tonight?",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "pending",
      priority: "medium",
      unreadCount: 1,
      tags: ["reservation", "modification"]
    },
    {
      id: "5",
      customerName: "Lisa Thompson",
      lastMessage: "What are your vegetarian options?",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: "active",
      priority: "low",
      unreadCount: 0,
      tags: ["menu", "dietary"]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-orange-500";
      case "resolved": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-orange-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Customer Conversations</span>
          </CardTitle>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            {["all", "active", "pending", "resolved"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status as any)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-3">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversationId === conversation.id ? "bg-primary/10 border border-primary/20" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.customerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(conversation.status)}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{conversation.customerName}</h4>
                      <div className="flex items-center space-x-1">
                        {conversation.priority === "high" && (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {conversation.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {conversation.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {conversation.status === "resolved" && (
                          <Check className="w-3 h-3 text-green-500" />
                        )}
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-orange text-white text-xs min-w-[20px] h-5 p-0 flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />
        
        {/* Quick Stats */}
        <div className="p-3 bg-muted/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold text-primary">
                {conversations.filter(c => c.status === "active").length}
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div>
              <div className="font-semibold text-orange">
                {conversations.filter(c => c.status === "pending").length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="font-semibold text-green-600">
                {conversations.filter(c => c.status === "resolved").length}
              </div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}