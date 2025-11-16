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
    const { currentSkills, targetRole, experienceLevel } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Analyzing skill gaps for:', targetRole);

    const prompt = `You are a career development expert. Analyze the skill gap between current skills and target role requirements.

Current Profile:
- Current Skills: ${currentSkills?.join(', ') || 'No skills listed'}
- Target Role: ${targetRole}
- Experience Level: ${experienceLevel || 'Entry level'}

Provide a comprehensive skill gap analysis with:

1. Matching Skills (skills they already have that are relevant)
2. Critical Skill Gaps (must-have skills they're missing)
3. Nice-to-Have Skills (would strengthen their profile)
4. Learning Path (step-by-step plan to bridge gaps)
5. Resource Recommendations (courses, certifications, projects)
6. Timeline Estimate (realistic timeframe to be job-ready)
7. Profile Strength Score (0-100)

Format as JSON:
{
  "profileScore": 75,
  "matchingSkills": [{"skill": "Name", "relevance": "High/Medium/Low", "note": "explanation"}],
  "criticalGaps": [{"skill": "Name", "priority": "Critical/High/Medium", "reason": "why important"}],
  "niceToHave": ["skill 1", "skill 2"],
  "learningPath": [
    {
      "phase": "Phase 1: Foundation",
      "duration": "2-3 months",
      "skills": ["skill 1", "skill 2"],
      "actions": ["action 1", "action 2"]
    }
  ],
  "resources": [
    {
      "skill": "Skill name",
      "type": "Course/Book/Project/Certification",
      "name": "Resource name",
      "url": "URL or description",
      "priority": "High/Medium/Low"
    }
  ],
  "timelineEstimate": "3-6 months to job-ready",
  "recommendations": ["rec 1", "rec 2"]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert career development advisor.' },
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
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[1] || jsonMatch[0];
    }

    const analysis = JSON.parse(content);

    console.log('Skill gap analysis complete, score:', analysis.profileScore);

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-skill-analyzer:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
