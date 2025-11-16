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
    const { jobTitle, companyName, jobDescription, userProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating cover letter for:', jobTitle, 'at', companyName);

    const prompt = `You are an expert cover letter writer. Create a compelling, personalized cover letter for the following job application:

Job Details:
- Position: ${jobTitle}
- Company: ${companyName}
- Job Description: ${jobDescription || 'Not provided'}

Candidate Profile:
- Name: ${userProfile.name}
- Skills: ${userProfile.skills?.join(', ') || 'Various skills'}
- Experience: ${userProfile.experience || 'Entry level'}
- Education: ${userProfile.education || 'Not specified'}

Create a professional cover letter that:
1. Opens with a strong hook showing enthusiasm for the role
2. Highlights 2-3 specific achievements that match job requirements
3. Shows knowledge of the company and why they want to work there
4. Demonstrates cultural fit and soft skills
5. Closes with a clear call to action
6. Is 3-4 paragraphs, approximately 300-400 words
7. Uses professional yet personable tone
8. Avoids clichés and generic statements

Make it specific, genuine, and compelling. Format it as a proper business letter.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert cover letter writer who creates compelling application materials.' },
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
    const coverLetter = data.choices[0].message.content;

    console.log('Cover letter generated successfully');

    return new Response(
      JSON.stringify({ coverLetter }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-cover-letter:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
