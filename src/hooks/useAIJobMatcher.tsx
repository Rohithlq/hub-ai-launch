import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JobMatch {
  title: string;
  matchPercentage: number;
  reasons: string[];
  requiredSkills: string[];
  salaryRange: string;
  growthPotential: string;
}

export const useAIJobMatcher = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);

  const findJobMatches = async (params: {
    skills: string[];
    experience: string;
    location: string;
    preferences?: string;
  }) => {
    setIsMatching(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-job-matcher', {
        body: params
      });

      if (error) throw error;

      setJobMatches(data.matches);
      toast.success(`Found ${data.matches.length} matching jobs!`);
      return data.matches;
    } catch (error) {
      console.error('Error finding job matches:', error);
      toast.error('Failed to find job matches. Please try again.');
      throw error;
    } finally {
      setIsMatching(false);
    }
  };

  return {
    findJobMatches,
    isMatching,
    jobMatches,
    setJobMatches
  };
};
