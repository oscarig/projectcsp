import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

// Disable Next.js default body parser so we can get the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
    return res.status(500).send("Webhook secret not configured");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId;

    if (userId) {
      console.log(`Processing upgrade for user: ${userId}`);

      // Initialize Supabase Admin Client to bypass RLS and update the profile
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

      if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Missing Supabase Admin credentials in webhook");
        return res.status(500).json({ error: "Server misconfiguration" });
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Update the user's role to 'provider'
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ 
          role: "provider",
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (error) {
        console.error(`Failed to update role for user ${userId}:`, error.message);
        return res.status(500).json({ error: "Failed to update profile in database" });
      }

      console.log(`Successfully upgraded user ${userId} to provider role`);
    } else {
      console.warn("No userId found in session metadata");
    }
  }

  res.status(200).json({ received: true });
}
