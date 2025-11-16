import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ResumeData {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  certifications?: string;
  summary?: string;
}

export const useAIResumeBuilder = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);

  const generateResume = async (userData: ResumeData) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-builder', {
        body: { userData }
      });

      if (error) throw error;

      setGeneratedResume(data.resume);
      toast.success('Resume generated successfully!');
      return data.resume;
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume. Please try again.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateResume,
    isGenerating,
    generatedResume,
    setGeneratedResume
  };
};
