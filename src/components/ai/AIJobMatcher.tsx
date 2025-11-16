import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Briefcase, TrendingUp } from 'lucide-react';
import { useAIJobMatcher } from '@/hooks/useAIJobMatcher';
import { Badge } from '@/components/ui/badge';

export const AIJobMatcher = () => {
  const { findJobMatches, isMatching, jobMatches } = useAIJobMatcher();
  const [formData, setFormData] = useState({
    skills: '',
    experience: 'Entry level',
    location: 'Remote',
    preferences: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await findJobMatches({
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: formData.experience,
      location: formData.location,
      preferences: formData.preferences
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Job Matcher</CardTitle>
          <CardDescription>
            Get AI-powered job recommendations based on your skills and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills (comma-separated) *</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Python, Data Analysis, etc."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., Entry level, 2-3 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Remote, New York"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences">Additional Preferences</Label>
              <Input
                id="preferences"
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                placeholder="Industry, company size, work style, etc."
              />
            </div>

            <Button type="submit" disabled={isMatching} className="w-full">
              {isMatching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Find Matching Jobs
            </Button>
          </form>
        </CardContent>
      </Card>

      {jobMatches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Job Matches</h3>
          {jobMatches.map((job, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      {job.title}
                    </CardTitle>
                    <CardDescription>{job.salaryRange}</CardDescription>
                  </div>
                  <Badge variant={job.matchPercentage >= 80 ? 'default' : 'secondary'} className="text-lg">
                    {job.matchPercentage}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Why This Matches</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {job.reasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, i) => (
                      <Badge key={i} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">Growth Potential:</span>
                  <span className="text-muted-foreground">{job.growthPotential}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
