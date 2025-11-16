import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle, skills, experienceLevel } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating interview questions for:', jobTitle);

    const prompt = `You are an expert interview coach. Generate a comprehensive interview preparation guide for a ${jobTitle} position.

Candidate Profile:
- Target Role: ${jobTitle}
- Key Skills: ${skills?.join(', ') || 'General skills'}
- Experience Level: ${experienceLevel || 'Entry level'}

Create 15 interview questions covering:
- 5 Technical Questions (role-specific)
- 5 Behavioral Questions (STAR method)
- 3 Situational Questions
- 2 Company/Role Fit Questions

For each question, provide:
1. The Question
2. Why Interviewers Ask This
3. Model Answer (detailed, 2-3 paragraphs)
4. Key Points to Cover
5. Common Mistakes to Avoid

Format as JSON array:
[{
  "category": "Technical/Behavioral/Situational/Fit",
  "question": "Question text",
  "why": "Why this question is asked",
  "modelAnswer": "Detailed model answer",
  "keyPoints": ["point 1", "point 2"],
  "mistakesToAvoid": ["mistake 1", "mistake 2"]
}]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert interview coach with extensive hiring experience.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      content = jsonMatch[1] || jsonMatch[0];
    }

    const questions = JSON.parse(content);

    console.log('Interview questions generated:', questions.length);

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-interview-prep:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
