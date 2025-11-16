import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CoverLetterParams {
  jobTitle: string;
  companyName: string;
  jobDescription?: string;
  userProfile: {
    name: string;
    skills: string[];
    experience: string;
    education: string;
  };
}

export const useAICoverLetter = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  const generateCoverLetter = async (params: CoverLetterParams) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-cover-letter', {
        body: params
      });

      if (error) throw error;

      setCoverLetter(data.coverLetter);
      toast.success('Cover letter generated successfully!');
      return data.coverLetter;
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast.error('Failed to generate cover letter. Please try again.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateCoverLetter,
    isGenerating,
    coverLetter,
    setCoverLetter
  };
};
