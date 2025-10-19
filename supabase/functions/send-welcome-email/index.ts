import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
  role: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, role }: WelcomeEmailRequest = await req.json();

    console.log("Sending welcome email to:", email, "with role:", role);

    const roleMessages = {
      student: "Start building your AI-powered portfolio, generate professional resumes, and discover personalized job opportunities!",
      startup: "Begin posting jobs, discover talented candidates, and build your company's online presence with AI!",
      admin: "Manage your institution's ecosystem, monitor analytics, and support your community's growth!"
    };

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "AI CareerHub <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to AI CareerHub - Your Journey Starts Now! 🚀",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to AI CareerHub! 🎉</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">A Product of BMEZ Business Solutions</p>
              </div>
              
              <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #667eea; margin-top: 0;">Hello, ${name}! 👋</h2>
                
                <p style="font-size: 16px; color: #555;">
                  Thank you for joining AI CareerHub as a <strong>${role.charAt(0).toUpperCase() + role.slice(1)}</strong>!
                </p>
                
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <p style="margin: 0; color: #333; font-size: 15px;">
                    ${roleMessages[role as keyof typeof roleMessages]}
                  </p>
                </div>
                
                <h3 style="color: #667eea; margin-top: 30px;">🚀 Get Started:</h3>
                <ul style="color: #555; line-height: 2;">
                  ${role === 'student' ? `
                    <li>Build your AI-powered portfolio website</li>
                    <li>Generate professional resumes with AI</li>
                    <li>Get personalized job recommendations</li>
                    <li>Track your skills and growth</li>
                  ` : role === 'startup' ? `
                    <li>Create your company profile</li>
                    <li>Post job openings and internships</li>
                    <li>Discover AI-matched candidates</li>
                    <li>Build your employer brand</li>
                  ` : `
                    <li>Manage students and startups</li>
                    <li>Monitor platform analytics</li>
                    <li>Customize your white-label portal</li>
                    <li>Support your community</li>
                  `}
                </ul>
                
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${Deno.env.get('VITE_SUPABASE_URL') || 'https://aicareer.lovable.app'}/dashboard" 
                     style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                    Go to Dashboard
                  </a>
                </div>
                
                <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px; font-size: 13px; color: #777;">
                  <p>Need help? Reply to this email or visit our support center.</p>
                  <p style="margin-top: 20px;">
                    <strong>AI CareerHub</strong><br>
                    A Product of BMEZ Business Solutions<br>
                    Empowering Careers with AI
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
