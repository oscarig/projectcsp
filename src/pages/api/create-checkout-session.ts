import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, userId, email } = req.body;

    if (!priceId || !userId) {
      return res.status(400).json({ error: "Missing priceId or userId" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Stripe is not configured in this environment" });
    }

    // Determine the base URL for success and cancel URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // Use 'payment' if it's a one-time fee
      customer_email: email, // Optionally pre-fill the customer's email
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard/partner?upgrade=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/dashboard/partner/upgrade?upgrade=cancelled`,
      metadata: {
        userId: userId, // We store the userId here to know who to upgrade later in the webhook
        planId: priceId,
      },
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
