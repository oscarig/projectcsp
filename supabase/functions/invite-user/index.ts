import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Default to production domain, but can be overridden by env var
const APP_URL = Deno.env.get("APP_URL") || "https://digiledg.com";

interface InvitationRequest {
  email: string;
  name: string;
  role: 'client' | 'partner';
  inviterName: string;
  companyName?: string;
  jurisdiction?: string;
  message?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      name, 
      role, 
      inviterName, 
      companyName, 
      jurisdiction, 
      message 
    }: InvitationRequest = await req.json();

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get the inviter's ID from the JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userError || !user) throw new Error("Unauthorized");

    // 1. Generate unique token
    const token = crypto.randomUUID();

    // 2. Persistent Record based on Role
    if (role === 'client') {
      const { error: inviteError } = await supabase
        .from("client_invitations")
        .insert({
          token,
          provider_id: user.id,
          client_email: email,
          client_name: name,
          company_name: companyName,
          status: 'pending'
        });
      if (inviteError) throw inviteError;
    } else {
      const { error: inviteError } = await supabase
        .from("partner_invitations")
        .insert({
          token,
          provider_id: user.id,
          partner_email: email,
          partner_name: name,
          jurisdiction: jurisdiction,
          message: message,
          status: 'pending'
        });
      if (inviteError) throw inviteError;
    }

    // 3. Build and Send Email
    const invitationUrl = `${APP_URL}/auth/register?token=${token}&role=${role}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
    .container { max-width: 600px; margin: 40px auto; padding: 0; background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 48px 32px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .body { padding: 40px 32px; }
    .message-box { background: #f8fafc; border-left: 4px solid #10b981; padding: 24px; border-radius: 12px; margin: 32px 0; }
    .btn { display: inline-block; background-color: #10b981; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 8px 0; }
    .footer { padding: 32px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f9fafb; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Welcome to DigiLedg</h1>
    </div>
    <div class="body">
      <p style="font-size: 18px; font-weight: 600; color: #111827;">Hello ${name},</p>
      <p style="color: #4b5563; font-size: 16px;"><strong>${inviterName}</strong> has invited you to join the DigiLedg platform as a <strong>${role === 'client' ? 'Client' : 'Partner'}</strong>.</p>
      
      <div class="message-box">
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #065f46; text-transform: uppercase; letter-spacing: 0.1em;">Invitation Note</p>
        <p style="margin: 12px 0 0; color: #475569; font-size: 15px; line-height: 1.6;">
          ${message || `Start collaborating with us on your corporate services. Click the button below to register your account and access your ${role} dashboard.`}
        </p>
      </div>

      <div style="text-align: center;">
        <a href="${invitationUrl}" class="btn">Accept Invitation & Register</a>
      </div>

      <p style="font-size: 13px; color: #94a3b8; margin-top: 32px; text-align: center;">
        This invitation link is valid for 7 days.
      </p>
    </div>
    <div class="footer">
      <p><strong>DigiLedg Technologies</strong><br/>Global Corporate Service Infrastructure</p>
      <p style="margin-top: 16px;">If you didn't expect this invitation, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DigiLedg <onboarding@digiledg.com>", // Update with verified domain
        to: [email],
        subject: `🤝 Welcome to DigiLedg: You've been invited as a ${role === 'client' ? 'Client' : 'Partner'}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      throw new Error(`Email provider error: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[INVITE-USER] Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
