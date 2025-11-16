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
    const { skills, experience, location, preferences } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Matching jobs for:', { skills: skills?.length, experience, location });

    const prompt = `You are an expert career advisor. Analyze the following candidate profile and suggest the top 10 job roles that would be the best match:

Skills: ${skills?.join(', ') || 'General skills'}
Experience Level: ${experience || 'Entry level'}
Location: ${location || 'Remote/Flexible'}
Preferences: ${preferences || 'Open to opportunities'}

For each job role, provide:
1. Job Title
2. Match Percentage (0-100%)
3. Key Reasons for Match (2-3 bullet points)
4. Required Skills (list 3-5)
5. Typical Salary Range
6. Career Growth Potential

Format as JSON array with this structure:
[{
  "title": "Job Title",
  "matchPercentage": 95,
  "reasons": ["reason 1", "reason 2"],
  "requiredSkills": ["skill 1", "skill 2"],
  "salaryRange": "$XX,XXX - $XX,XXX",
  "growthPotential": "High/Medium/Low with explanation"
}]

Provide realistic, current market job roles.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert career advisor with deep knowledge of the job market.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
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

    const jobMatches = JSON.parse(content);

    console.log('Job matches generated:', jobMatches.length);

    return new Response(
      JSON.stringify({ matches: jobMatches }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-job-matcher:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
