import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Eye, 
  TrendingUp,
  Globe,
  Plus,
  Edit,
  Download,
  MessageSquare
} from "lucide-react";

export const StartupDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Applications</p>
              <h3 className="text-2xl font-bold">127</h3>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profile Views</p>
              <h3 className="text-2xl font-bold">1.2K</h3>
            </div>
            <Eye className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hire Rate</p>
              <h3 className="text-2xl font-bold">12%</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company Website</h3>
                <p className="text-sm text-muted-foreground">AI-powered company presence</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Build your company website with AI. Showcase your mission, services, careers, and attract top talent.
          </p>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit Website
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Job Postings</h3>
                <p className="text-sm text-muted-foreground">Manage your openings</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Post jobs and internships. Reach thousands of talented students and professionals.
          </p>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Candidate Suggestions</h3>
              <p className="text-sm text-muted-foreground">Top matches for your openings</p>
            </div>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "Priya Sharma",
              role: "Frontend Developer",
              skills: ["React", "TypeScript", "Tailwind"],
              experience: "2 years",
              match: 95,
              location: "Bangalore"
            },
            {
              name: "Rahul Kumar",
              role: "Full Stack Developer",
              skills: ["Node.js", "React", "MongoDB"],
              experience: "3 years",
              match: 90,
              location: "Remote"
            },
            {
              name: "Anita Patel",
              role: "UI/UX Designer",
              skills: ["Figma", "Adobe XD", "Design Systems"],
              experience: "1.5 years",
              match: 88,
              location: "Mumbai"
            },
          ].map((candidate, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{candidate.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {candidate.match}% Match
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{candidate.role}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{candidate.experience}</span>
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 rounded bg-secondary text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-3 w-3" />
                    Resume
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-2 h-3 w-3" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Active Job Postings</h3>
            <p className="text-sm text-muted-foreground">Manage your current openings</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { 
              title: "Senior React Developer", 
              applications: 45, 
              views: 320, 
              posted: "5 days ago",
              status: "Active"
            },
            { 
              title: "Product Designer", 
              applications: 32, 
              views: 280, 
              posted: "1 week ago",
              status: "Active"
            },
            { 
              title: "Backend Developer Intern", 
              applications: 50, 
              views: 420, 
              posted: "3 days ago",
              status: "Active"
            },
          ].map((job, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{job.title}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                    <span>{job.applications} applications</span>
                    <span>{job.views} views</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm">View Applications</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
