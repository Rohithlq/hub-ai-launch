import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Building, 
  TrendingUp,
  DollarSign,
  Activity,
  Settings,
  Shield,
  BarChart3,
  Eye
} from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h3 className="text-2xl font-bold">1,247</h3>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">↑ 12% from last month</p>
        </Card>
        
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Startups</p>
              <h3 className="text-2xl font-bold">89</h3>
            </div>
            <Building className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">↑ 8% from last month</p>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Job Postings</p>
              <h3 className="text-2xl font-bold">342</h3>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">↑ 23% from last month</p>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">₹2.4L</h3>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">↑ 15% from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage students and startups</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            View, edit, and manage all users in your ecosystem. Monitor activity and ensure compliance.
          </p>
          <Button className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Detailed insights and reports</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Track engagement, growth metrics, and platform performance with comprehensive analytics.
          </p>
          <Button className="w-full">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest platform actions and updates</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              action: "New student registration",
              user: "Rohit Kumar",
              time: "2 minutes ago",
              type: "user"
            },
            {
              action: "Job posted",
              user: "TechCorp Solutions",
              time: "15 minutes ago",
              type: "job"
            },
            {
              action: "Application submitted",
              user: "Priya Sharma → Frontend Developer",
              time: "1 hour ago",
              type: "application"
            },
            {
              action: "New startup registration",
              user: "Digital Innovations Pvt Ltd",
              time: "2 hours ago",
              type: "user"
            },
            {
              action: "Profile updated",
              user: "Anita Patel",
              time: "3 hours ago",
              type: "profile"
            },
          ].map((activity, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4" variant="outline">
          View All Activity
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Content Moderation</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            AI-powered content moderation. Review and approve user-generated content.
          </p>
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Review Content
          </Button>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Platform Settings</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Configure platform settings, branding, and customize your white-label portal.
          </p>
          <Button className="w-full" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Growth Metrics</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Monitor user acquisition, engagement rates, and platform growth trends.
          </p>
          <Button className="w-full" variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Metrics
          </Button>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Subscription Overview</h3>
            <p className="text-sm text-muted-foreground">Active subscriptions and revenue</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
            <p className="text-sm text-muted-foreground">Student Pro</p>
            <h4 className="text-2xl font-bold mt-1">287</h4>
            <p className="text-xs text-muted-foreground mt-1">Active subscribers</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
            <p className="text-sm text-muted-foreground">Startup Plans</p>
            <h4 className="text-2xl font-bold mt-1">42</h4>
            <p className="text-xs text-muted-foreground mt-1">Active subscribers</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <h4 className="text-2xl font-bold mt-1">₹2.4L</h4>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
