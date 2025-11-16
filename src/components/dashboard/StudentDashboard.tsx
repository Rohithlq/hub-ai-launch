import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Eye,
  MessageSquare,
  Target
} from "lucide-react";
import { AIResumeBuilder } from "@/components/ai/AIResumeBuilder";
import { AIJobMatcher } from "@/components/ai/AIJobMatcher";
import { AIInterviewPrep } from "@/components/ai/AIInterviewPrep";

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profile Score</p>
              <h3 className="text-2xl font-bold">87%</h3>
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
              <p className="text-sm text-muted-foreground">Interview Prep</p>
              <h3 className="text-2xl font-bold">5 Sets</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* AI Tools */}
      <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume Builder</span>
              <span className="sm:hidden">Resume</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Job Matcher</span>
              <span className="sm:hidden">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Interview Prep</span>
              <span className="sm:hidden">Interview</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Skill Analysis</span>
              <span className="sm:hidden">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="cover" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Cover Letter</span>
              <span className="sm:hidden">Cover</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume" className="mt-6">
            <AIResumeBuilder />
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <AIJobMatcher />
          </TabsContent>

          <TabsContent value="interview" className="mt-6">
            <AIInterviewPrep />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card className="p-6">
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">AI Skill Gap Analyzer</h3>
                <p className="text-sm text-muted-foreground">
                  Coming soon! Analyze your skill gaps and get personalized learning paths.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cover" className="mt-6">
            <Card className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">AI Cover Letter Generator</h3>
                <p className="text-sm text-muted-foreground">
                  Coming soon! Generate personalized cover letters for job applications.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <h3 className="text-lg font-semibold mb-4">Resume Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Profile Completion</span>
              <span className="font-semibold">75%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <h3 className="text-lg font-semibold mb-4">AI Usage Today</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Requests Used</span>
              <span className="font-semibold">7 / 10</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Complete your profile</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Generate your resume</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>Apply to 5 jobs</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
