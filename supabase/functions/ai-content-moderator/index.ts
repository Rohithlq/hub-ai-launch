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
    const { content, contentType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Moderating content, type:', contentType);

    const prompt = `You are a content moderation AI. Analyze the following ${contentType} for:

1. Inappropriate content (hate speech, violence, explicit content)
2. Spam or commercial solicitation
3. Personal information that should be redacted
4. Professional appropriateness for a career platform
5. Potential legal issues

Content to moderate:
${content}

Provide a JSON response with:
{
  "isAppropriate": true/false,
  "confidenceScore": 0-100,
  "flags": [
    {
      "category": "Category name",
      "severity": "High/Medium/Low",
      "reason": "Explanation"
    }
  ],
  "suggestedAction": "approve/review/reject",
  "redactions": ["sensitive info to redact"],
  "explanation": "Overall assessment"
}

Be strict but fair. Professional career content should be approved even if informal.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a content moderation expert focused on maintaining safe, professional platforms.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
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
    let responseContent = data.choices[0].message.content;

    // Extract JSON from markdown code blocks if present
    const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/) || responseContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseContent = jsonMatch[1] || jsonMatch[0];
    }

    const moderation = JSON.parse(responseContent);

    console.log('Moderation complete:', moderation.suggestedAction);

    return new Response(
      JSON.stringify({ moderation }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-content-moderator:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
