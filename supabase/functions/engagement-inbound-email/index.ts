import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

/**
 * Handle Inbound Webhook from Email Providers (e.g., Resend Inbound Parse)
 * 
 * Logic:
 * 1. Parse 'To' address to extract Engagement ID (Format: eng+UUID@yourdomain.com)
 * 2. Identify the sender by their 'From' email address
 * 3. Extract the clean text body (stripping out the previous reply history if possible)
 * 4. Record as a 'comment_added' activity in the engagement timeline
 */
serve(async (req) => {
  try {
    const payload = await req.json();
    console.log("[INBOUND] Received webhook payload");

    // Note: Payload structure varies by provider. Adjust accordingly.
    // This example assumes Resend Inbound Webhook format (https://resend.com/docs/api-reference/webhooks)
    const toField = payload.data?.to?.[0] || payload.to || "";
    const fromField = payload.data?.from || payload.from || "";
    const textBody = payload.data?.text || payload.text || "";

    if (!toField || !fromField || !textBody) {
      console.error("[INBOUND] Missing required fields", { to: toField, from: fromField });
      throw new Error("Missing required email fields (to, from, text)");
    }

    // Extract Engagement UUID (eng+xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@domain.com)
    const match = toField.match(/eng\+([a-f0-9-]{36})@/i);
    if (!match) {
      console.error("[INBOUND] Could not extract engagement ID from address:", toField);
      throw new Error("Invalid 'To' address format. Expected eng+UUID@domain.com");
    }

    const engagementId = match[1];
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // 1. Identify the user by their email address in the profiles table
    const { data: profile, error: profError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("email", fromField)
      .maybeSingle();

    if (profError || !profile) {
      console.error("[INBOUND] User not found for email:", fromField);
      throw new Error(`Permission denied: Email ${fromField} is not a registered user.`);
    }

    // 2. Verify the user has access to this engagement
    const { data: access, error: accError } = await supabase
      .from("engagements")
      .select("id")
      .eq("id", engagementId)
      .or(`client_user_id.eq.${profile.id},provider_id.eq.${profile.id},partner_id.eq.${profile.id}`)
      .maybeSingle();

    if (accError || !access) {
      console.error("[INBOUND] User does not have access to engagement:", { userId: profile.id, engagementId });
      throw new Error("Permission denied: You are not a party to this engagement.");
    }

    // 3. Basic reply stripping (removes everything below common reply markers)
    const cleanText = textBody.split(/\r?\n\s*On.*at.*wrote:/i)[0]
                              .split(/\r?\n\s*---Original Message---/i)[0]
                              .split(/\r?\n\s*>+.*/i)[0] // Strip quotes
                              .trim();

    // 4. Record as activity
    const { error: insError } = await supabase
      .from("activities")
      .insert({
        engagement_id: engagementId,
        user_id: profile.id,
        activity_type: 'comment_added',
        title: 'Email Reply Recorded',
        description: cleanText,
        metadata: { 
          source: 'email', 
          original_to: toField,
          received_at: new Date().toISOString()
        }
      });

    if (insError) {
      console.error("[INBOUND] Insert error:", insError);
      throw new Error("System error: Failed to record activity in database.");
    }

    console.log(`[INBOUND] Successfully recorded reply from ${fromField} for engagement ${engagementId}`);

    return new Response(JSON.stringify({ success: true, message: "Reply processed" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[INBOUND] Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
