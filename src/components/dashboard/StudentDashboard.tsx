import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Globe, 
  Download,
  Eye,
  Edit
} from "lucide-react";

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profile Views</p>
              <h3 className="text-2xl font-bold">245</h3>
            </div>
            <Eye className="h-8 w-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Job Matches</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Skills</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <Award className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Match Rate</p>
              <h3 className="text-2xl font-bold">87%</h3>
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
                <h3 className="text-lg font-semibold">AI Portfolio Website</h3>
                <p className="text-sm text-muted-foreground">Build your professional presence</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create a stunning portfolio website with AI. Showcase your projects, skills, and achievements with drag-and-drop builder.
          </p>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Build Portfolio
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
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Resume Generator</h3>
                <p className="text-sm text-muted-foreground">GPT-powered resume creation</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate professional resumes and cover letters with AI. Optimize for ATS and impress recruiters.
          </p>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Generate Resume
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Job Recommendations</h3>
            <p className="text-sm text-muted-foreground">Personalized job matches based on your skills</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Frontend Developer",
              company: "TechCorp India",
              location: "Bangalore",
              salary: "₹8-12 LPA",
              match: 95,
            },
            {
              title: "React Developer Intern",
              company: "Startup Hub",
              location: "Remote",
              salary: "₹3-5 LPA",
              match: 88,
            },
            {
              title: "Full Stack Developer",
              company: "Digital Solutions",
              location: "Hyderabad",
              salary: "₹10-15 LPA",
              match: 82,
            },
          ].map((job, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{job.location}</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {job.match}% Match
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4" variant="outline">
          View All Jobs
        </Button>
      </Card>

      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Skill Gap Analysis</h3>
            <p className="text-sm text-muted-foreground">AI-powered recommendations to boost your career</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { skill: "React.js", level: 85, recommended: false },
            { skill: "TypeScript", level: 70, recommended: false },
            { skill: "Node.js", level: 45, recommended: true },
            { skill: "Docker", level: 30, recommended: true },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.skill}</span>
                <span className="text-muted-foreground">{item.level}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                  style={{ width: `${item.level}%` }}
                />
              </div>
              {item.recommended && (
                <p className="text-xs text-muted-foreground">
                  💡 Recommended: Complete courses to improve job matches
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
