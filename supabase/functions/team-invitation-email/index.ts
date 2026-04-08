import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface InvitationEmailRequest {
  email: string;
  invitationUrl: string;
  inviterName: string;
  providerName: string;
  role: string;
}

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, invitationUrl, inviterName, providerName, role }: InvitationEmailRequest =
      await req.json();

    console.log("[TEAM INVITATION] Sending to:", email);
    console.log("[TEAM INVITATION] Inviter:", inviterName);
    console.log("[TEAM INVITATION] Role:", role);

    if (!RESEND_API_KEY) {
      console.error("[TEAM INVITATION] RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!email || !invitationUrl || !inviterName || !providerName || !role) {
      console.error("[TEAM INVITATION] Missing required fields");
      throw new Error("Missing required fields");
    }

    // Role display names
    const roleDisplayNames: Record<string, string> = {
      admin: "Administrator",
      partner_manager: "Partner Manager",
      engagement_manager: "Engagement Manager",
      viewer: "Viewer",
    };

    const roleDescription: Record<string, string> = {
      admin: "Full control over all provider operations and settings",
      partner_manager: "Manage partners, invitations, and partner relationships",
      engagement_manager: "Manage client engagements, documents, and client relationships",
      viewer: "View-only access to provider information",
    };

    const roleName = roleDisplayNames[role] || role;
    const roleDesc = roleDescription[role] || "Team member access";

    // Email HTML template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                👥 Team Invitation
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                Join ${providerName}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Welcome message -->
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 16px; color: #1a202c; font-size: 24px; font-weight: 600;">
                  You've Been Invited! 🎉
                </h2>
                <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                  <strong>${inviterName}</strong> has invited you to join the <strong>${providerName}</strong> team as a <strong>${roleName}</strong>.
                </p>
              </div>

              <!-- Role info box -->
              <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-left: 4px solid #667eea; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <div style="margin-bottom: 8px;">
                  <span style="display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${roleName}
                  </span>
                </div>
                <p style="margin: 8px 0 0; color: #4a5568; font-size: 14px; line-height: 1.5;">
                  ${roleDesc}
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="${invitationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                  Accept Invitation & Join Team
                </a>
              </div>

              <!-- Alternative link -->
              <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px; color: #718096; font-size: 13px; text-align: center;">
                  Or copy this link:
                </p>
                <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; word-break: break-all; text-align: center;">
                  <a href="${invitationUrl}" style="color: #667eea; text-decoration: none; font-size: 13px; font-family: monospace;">
                    ${invitationUrl}
                  </a>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">
                🔒 This invitation link is for single use only and will expire in 7 days.
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: `👥 You've been invited to join ${providerName} as ${roleName}`,
        html: emailHtml,
      }),
    });

    const responseText = await resendResponse.text();
    console.log("[TEAM INVITATION] Resend response status:", resendResponse.status);
    console.log("[TEAM INVITATION] Resend response:", responseText);

    if (!resendResponse.ok) {
      console.error("[TEAM INVITATION] Resend error:", responseText);
      throw new Error(`Failed to send email: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log("[TEAM INVITATION] Email sent successfully:", data);

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("[TEAM INVITATION] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send team invitation email";
    console.error("[TEAM INVITATION] Error message:", errorMessage);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});