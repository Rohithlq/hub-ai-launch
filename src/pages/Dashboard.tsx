import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const userRole = user?.user_metadata?.role || "student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-card/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI CareerHub
            </h1>
            <p className="text-xs text-muted-foreground">A Product of BMEZ Business Solutions</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {user?.user_metadata?.full_name || user?.email}!
          </h2>
          <p className="text-muted-foreground">
            Role: <span className="capitalize font-medium text-foreground">{userRole}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userRole === "student" && (
            <>
              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">My Portfolio</h3>
                <p className="text-muted-foreground mb-4">
                  Create and customize your AI-generated portfolio website
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-2">AI Resume Builder</h3>
                <p className="text-muted-foreground mb-4">
                  Generate professional resumes with AI assistance
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2">Job Recommendations</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered job matching based on your skills
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>
            </>
          )}

          {userRole === "startup" && (
            <>
              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">Company Website</h3>
                <p className="text-muted-foreground mb-4">
                  AI-generated website for your startup
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl mb-4">📢</div>
                <h3 className="text-xl font-semibold mb-2">Post Jobs</h3>
                <p className="text-muted-foreground mb-4">
                  Create job listings and find candidates
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI Candidate Match</h3>
                <p className="text-muted-foreground mb-4">
                  Smart candidate recommendations
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>
            </>
          )}

          {userRole === "admin" && (
            <>
              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage students and startups in your tenant
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  View platform usage and statistics
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Branding</h3>
                <p className="text-muted-foreground mb-4">
                  Customize your tenant's appearance
                </p>
                <Button variant="outline" className="w-full">Coming Soon</Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
