import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SkillAnalysis {
  profileScore: number;
  matchingSkills: Array<{ skill: string; relevance: string; note: string }>;
  criticalGaps: Array<{ skill: string; priority: string; reason: string }>;
  niceToHave: string[];
  learningPath: Array<{
    phase: string;
    duration: string;
    skills: string[];
    actions: string[];
  }>;
  resources: Array<{
    skill: string;
    type: string;
    name: string;
    url: string;
    priority: string;
  }>;
  timelineEstimate: string;
  recommendations: string[];
}

export const useAISkillAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);

  const analyzeSkills = async (params: {
    currentSkills: string[];
    targetRole: string;
    experienceLevel: string;
  }) => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-skill-analyzer', {
        body: params
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success('Skill gap analysis complete!');
      return data.analysis;
    } catch (error) {
      console.error('Error analyzing skills:', error);
      toast.error('Failed to analyze skills. Please try again.');
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeSkills,
    isAnalyzing,
    analysis,
    setAnalysis
  };
};
