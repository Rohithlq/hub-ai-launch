import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface InterviewQuestion {
  category: string;
  question: string;
  why: string;
  modelAnswer: string;
  keyPoints: string[];
  mistakesToAvoid: string[];
}

export const useAIInterviewPrep = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);

  const generateQuestions = async (params: {
    jobTitle: string;
    skills: string[];
    experienceLevel: string;
  }) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-interview-prep', {
        body: params
      });

      if (error) throw error;

      setQuestions(data.questions);
      toast.success(`Generated ${data.questions.length} interview questions!`);
      return data.questions;
    } catch (error) {
      console.error('Error generating interview questions:', error);
      toast.error('Failed to generate questions. Please try again.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateQuestions,
    isGenerating,
    questions,
    setQuestions
  };
};
