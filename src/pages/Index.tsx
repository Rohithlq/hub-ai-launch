import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Building2, TrendingUp, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-30 blur-3xl" />
        
        <nav className="relative border-b border-border/50 backdrop-blur-sm bg-card/30">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI CareerHub
              </h1>
              <p className="text-xs text-muted-foreground">A Product of BMEZ Business Solutions</p>
            </div>
            <Button onClick={() => navigate("/auth")} variant="outline">
              Get Started
            </Button>
          </div>
        </nav>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Career Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Transform Your Career Journey with AI
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect students, startups, and institutions in one powerful platform. 
              AI-generated portfolios, smart job matching, and seamless hiring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="text-lg px-8 animate-glow"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Three Powerful Portals, One Platform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to succeed in your career journey or hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Student Hub</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI-generated portfolio websites</li>
                <li>• Smart resume builder</li>
                <li>• Job recommendations</li>
                <li>• Skill gap analysis</li>
                <li>• Course suggestions</li>
              </ul>
            </Card>

            <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Building2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Startup Hub</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI company websites</li>
                <li>• Job posting & management</li>
                <li>• Smart candidate matching</li>
                <li>• Resume database access</li>
                <li>• Hiring analytics</li>
              </ul>
            </Card>

            <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Admin Control</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• White-label branding</li>
                <li>• User management</li>
                <li>• Analytics dashboard</li>
                <li>• Multi-tenant support</li>
                <li>• Revenue tracking</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose AI CareerHub?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Everything</h3>
                  <p className="text-muted-foreground">
                    From portfolio generation to job matching, our AI handles the heavy lifting
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <TrendingUp className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Freemium Model</h3>
                  <p className="text-muted-foreground">
                    Start free, upgrade when you need more power. Flexible pricing for all
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Tenant Ready</h3>
                  <p className="text-muted-foreground">
                    Perfect for colleges, incubators, and enterprise organizations
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade security with AI moderation and audit logs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 backdrop-blur-sm bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students and startups already using AI CareerHub
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="text-lg px-12"
              >
                Start Your Free Trial
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AI CareerHub - A Product of BMEZ Business Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
