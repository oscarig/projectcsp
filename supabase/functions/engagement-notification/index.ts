import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { record: activity, type } = payload;

    // We only care about new comments
    if (type !== "INSERT" || activity.activity_type !== "comment_added") {
      return new Response(JSON.stringify({ message: "Not a relevant activity" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch engagement details and involved profiles
    const { data: engagement, error: engError } = await supabase
      .from("engagements")
      .select(`
        id,
        title,
        client:profiles!engagements_client_user_id_fkey(id, full_name, email),
        provider:profiles!engagements_provider_id_fkey(id, full_name, email)
      `)
      .eq("id", activity.engagement_id)
      .single();

    if (engError || !engagement) {
      console.error("Engagement fetch error:", engError);
      throw new Error("Engagement details not found");
    }

    // Identify sender and recipient
    const sender = activity.user_id === engagement.client.id ? engagement.client : engagement.provider;
    const recipient = activity.user_id === engagement.client.id ? engagement.provider : engagement.client;

    console.log(`[ENGAGEMENT] Sending notification from ${sender.full_name} to ${recipient.email}`);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; }
    .header { border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px; }
    .title { color: #065f46; font-size: 20px; font-weight: bold; margin: 0; }
    .message-box { background-color: #f9fafb; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin: 24px 0; white-space: pre-wrap; }
    .footer { font-size: 12px; color: #6b7280; margin-top: 32px; border-top: 1px solid #e5e7eb; pt: 16px; }
    .btn { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; color: #6b7280; margin: 0 0 4px 0; letter-spacing: 0.1em;">New Update</p>
      <h1 class="title">${engagement.title}</h1>
    </div>
    
    <p><strong>${sender.full_name}</strong> posted a new message in the engagement timeline:</p>
    
    <div class="message-box">
${activity.description}
    </div>
    
    <p>You can reply directly to this email to post a response, or view the full history in your dashboard.</p>
    
    <a href="https://digiledg.com/dashboard/engagements/${engagement.id}" class="btn">View in Dashboard</a>
    
    <div class="footer">
      <p>This is an automated notification from DigiLedg. All communications are recorded for transparency and compliance.</p>
    </div>
  </div>
</body>
</html>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DigiLedg Engagements <updates@digiledg.com>", // Replace with verified domain
        to: [recipient.email],
        reply_to: `eng+${engagement.id}@digiledg.com`, // Replace with your inbound domain
        subject: `[Engagement Update] ${engagement.title}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const errorText = await resendRes.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Critical error in engagement-notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
