import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChatConversations } from "../chat/ChatConversations";
import { ChatWidget } from "../chat/ChatWidget";
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Headphones,
  Settings
} from "lucide-react";

export function ChatManagementPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");

  // Mock analytics data
  const chatStats = {
    totalConversations: 45,
    activeConversations: 8,
    avgResponseTime: "2.3 min",
    satisfactionScore: 4.8,
    todayMessages: 156,
    resolvedToday: 23
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    trend?: "up" | "down" | "stable";
  }) => (
    <Card className="neumorphic">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-teal-orange rounded-lg flex items-center justify-center text-white">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <div className={`flex items-center space-x-1 text-sm ${
                  trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{trend === "up" ? "+12%" : trend === "down" ? "-5%" : "0%"}</span>
                </div>
              )}
            </div>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat Management</h1>
          <p className="text-muted-foreground">Monitor and manage customer conversations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-gradient-teal-orange">
            <Headphones className="w-4 h-4 mr-2" />
            Go Live
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Conversations"
          value={chatStats.totalConversations}
          icon={MessageCircle}
          trend="up"
        />
        <StatCard
          title="Active Now"
          value={chatStats.activeConversations}
          icon={Users}
          trend="stable"
        />
        <StatCard
          title="Avg Response Time"
          value={chatStats.avgResponseTime}
          icon={Clock}
          trend="up"
        />
        <StatCard
          title="Satisfaction"
          value={`${chatStats.satisfactionScore}/5`}
          icon={CheckCircle}
          trend="up"
        />
        <StatCard
          title="Messages Today"
          value={chatStats.todayMessages}
          icon={MessageSquare}
          trend="up"
        />
        <StatCard
          title="Resolved Today"
          value={chatStats.resolvedToday}
          icon={CheckCircle}
          trend="up"
        />
      </div>

      {/* Main Chat Interface */}
      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[600px]">
            {/* Conversations List */}
            <div className="lg:col-span-2">
              <ChatConversations 
                onSelectConversation={setSelectedConversation}
                selectedConversationId={selectedConversation}
              />
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Active Conversation</span>
                    <Badge className="bg-green-500">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[500px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Select a conversation</h3>
                      <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neumorphic">
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                    <p>Response time analytics</p>
                    <p className="text-sm">Coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorphic">
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>Satisfaction metrics</p>
                    <p className="text-sm">Coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="neumorphic">
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                  <p>Quick response templates</p>
                  <p className="text-sm">Coming soon...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="neumorphic">
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <p>Chat configuration</p>
                  <p className="text-sm">Coming soon...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}