import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { StartupDashboard } from "@/components/dashboard/StartupDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userRole = user?.user_metadata?.role || "student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Welcome back, {user?.user_metadata?.full_name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {userRole === "student" && "Student AI Hub"}
              {userRole === "startup" && "Startup Hub"}
              {userRole === "admin" && "Admin Control Panel"}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {userRole === "student" && <StudentDashboard />}
        {userRole === "startup" && <StartupDashboard />}
        {userRole === "admin" && <AdminDashboard />}

        <footer className="mt-12 text-center text-sm text-muted-foreground border-t border-border/50 pt-6">
          <p>AI CareerHub — A Product of BMEZ Business Solutions</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
