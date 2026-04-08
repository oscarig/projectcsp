import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailVerificationRequest {
  email: string;
  full_name: string;
  verification_url: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, full_name, verification_url }: EmailVerificationRequest = await req.json();

    if (!email || !verification_url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email or verification_url" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Vetto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f9fc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 0; text-align: center;">
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                🎉 Welcome to Vetto!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px 40px;">
              <p style="margin: 0 0 16px; color: #4a5568; font-size: 16px; line-height: 24px;">
                Hi ${full_name || "there"},
              </p>
              <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 24px;">
                Thank you for signing up! We're excited to have you on board. To complete your registration and access all features, please verify your email address.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 24px 0;">
                    <a href="${verification_url}" 
                       style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #718096; font-size: 14px; line-height: 20px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0; word-break: break-all;">
                <a href="${verification_url}" style="color: #2563eb; text-decoration: none; font-size: 14px;">
                  ${verification_url}
                </a>
              </p>

              <!-- Security Notice -->
              <div style="margin-top: 32px; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 20px;">
                  <strong>⚠️ Security Notice:</strong> This link will expire in 24 hours. If you didn't create an account with Vetto, please ignore this email.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; color: #718096; font-size: 14px; line-height: 20px;">
                Best regards,<br>
                <strong>The Vetto Team</strong>
              </p>
              <p style="margin: 16px 0 0; color: #a0aec0; font-size: 12px; line-height: 18px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </td>
          </tr>

        </table>

        <!-- Copyright -->
        <p style="margin: 24px 0 0; color: #a0aec0; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} Vetto. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const emailText = `
Welcome to Vetto!

Hi ${full_name || "there"},

Thank you for signing up! Please verify your email address by clicking the link below:

${verification_url}

This link will expire in 24 hours.

If you didn't create an account with Vetto, please ignore this email.

Best regards,
The Vetto Team

© ${new Date().getFullYear()} Vetto. All rights reserved.
    `.trim();

    // Send email using Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vetto <noreply@vetto.com>",
        to: [email],
        subject: "Verify Your Email - Vetto",
        html: emailHtml,
        text: emailText,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send verification email",
          details: resendData 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email sent successfully",
        email_id: resendData.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in email-verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});