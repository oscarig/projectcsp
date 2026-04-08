import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface InvitationEmailRequest {
  email: string;
  invitationUrl: string;
  inviterName: string;
  jurisdiction?: string;
  message?: string;
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
    const { email, invitationUrl, inviterName, jurisdiction, message }: InvitationEmailRequest =
      await req.json();

    console.log("[INVITATION EMAIL] Sending to:", email);
    console.log("[INVITATION EMAIL] Inviter:", inviterName);
    console.log("[INVITATION EMAIL] URL:", invitationUrl);

    if (!RESEND_API_KEY) {
      console.error("[INVITATION EMAIL] RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!email || !invitationUrl || !inviterName) {
      console.error("[INVITATION EMAIL] Missing required fields:", { email, invitationUrl, inviterName });
      throw new Error("Missing required fields: email, invitationUrl, or inviterName");
    }

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Partner Invitation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 20px;
      line-height: 1.8;
    }
    .invitation-box {
      background-color: #f9fafb;
      border-left: 4px solid #10b981;
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .invitation-box h3 {
      margin: 0 0 10px 0;
      color: #111827;
      font-size: 16px;
    }
    .invitation-box p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .info-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #eff6ff;
      border-radius: 6px;
    }
    .info-section h4 {
      margin: 0 0 10px 0;
      color: #1e40af;
      font-size: 14px;
      font-weight: 600;
    }
    .info-section p {
      margin: 0;
      color: #1e3a8a;
      font-size: 14px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #10b981;
      text-decoration: none;
    }
    .link-box {
      background-color: #f3f4f6;
      border: 1px dashed #d1d5db;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      word-break: break-all;
    }
    .link-box p {
      margin: 0;
      color: #6b7280;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .link-box a {
      color: #10b981;
      font-size: 14px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🤝 Partner Invitation</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">You've Been Invited!</div>

      <div class="message">
        <strong>${inviterName}</strong> has invited you to join as a partner.
        ${jurisdiction ? `They are looking to collaborate in <strong>${jurisdiction}</strong>.` : ""}
      </div>

      ${
        message
          ? `
      <div class="invitation-box">
        <h3>📝 Personal Message:</h3>
        <p>${message}</p>
      </div>
      `
          : ""
      }

      <div class="message">
        Click the button below to complete your registration and start collaborating:
      </div>

      <div style="text-align: center;">
        <a href="${invitationUrl}" class="cta-button">
          Accept Invitation & Register
        </a>
      </div>

      <div class="info-section">
        <h4>🔒 Important:</h4>
        <p>This invitation link is for single use only and will expire in 7 days. Your role will be automatically set to Partner.</p>
      </div>

      <div class="link-box">
        <p>Or copy and paste this link in your browser:</p>
        <a href="${invitationUrl}">${invitationUrl}</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>CSP Cross Border Platform</strong></p>
      <p>Connecting providers, partners, and clients worldwide</p>
      <p style="margin-top: 20px;">
        <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a> · <a href="#">Contact Support</a>
      </p>
      <p style="margin-top: 10px; font-size: 12px; color: #9ca3af;">
        If you didn't expect this invitation, you can safely ignore this email.
      </p>
    </div>
  </div>
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
        subject: `🤝 You've been invited to join as a Partner by ${inviterName}`,
        html: emailHtml,
      }),
    });

    const responseText = await resendResponse.text();
    console.log("[INVITATION EMAIL] Resend response status:", resendResponse.status);
    console.log("[INVITATION EMAIL] Resend response:", responseText);

    if (!resendResponse.ok) {
      console.error("[INVITATION EMAIL] Resend error:", responseText);
      throw new Error(`Failed to send email: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log("[INVITATION EMAIL] Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[INVITATION EMAIL] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send invitation email";
    console.error("[INVITATION EMAIL] Error message:", errorMessage);
    
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