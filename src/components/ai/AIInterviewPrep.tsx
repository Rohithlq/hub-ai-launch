import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, HelpCircle } from 'lucide-react';
import { useAIInterviewPrep } from '@/hooks/useAIInterviewPrep';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const AIInterviewPrep = () => {
  const { generateQuestions, isGenerating, questions } = useAIInterviewPrep();
  const [formData, setFormData] = useState({
    jobTitle: '',
    skills: '',
    experienceLevel: 'Entry level'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateQuestions({
      jobTitle: formData.jobTitle,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experienceLevel: formData.experienceLevel
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Technical': 'bg-blue-500',
      'Behavioral': 'bg-green-500',
      'Situational': 'bg-yellow-500',
      'Fit': 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Interview Preparation</CardTitle>
          <CardDescription>
            Generate targeted interview questions with expert answers for your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Target Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g., Frontend Developer, Data Analyst"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Relevant Skills (comma-separated) *</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Problem Solving, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Input
                id="experienceLevel"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                placeholder="e.g., Entry level, Mid-level, Senior"
              />
            </div>

            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Interview Questions
            </Button>
          </form>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Interview Questions</CardTitle>
            <CardDescription>
              {questions.length} questions with detailed answers and tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((q, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3 text-left">
                      <Badge className={getCategoryColor(q.category)}>
                        {q.category}
                      </Badge>
                      <span className="font-medium">{q.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Why Interviewers Ask This
                      </h4>
                      <p className="text-sm text-muted-foreground">{q.why}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Model Answer</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {q.modelAnswer}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Points to Cover</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {q.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-destructive">
                        Common Mistakes to Avoid
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {q.mistakesToAvoid.map((mistake, i) => (
                          <li key={i}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
