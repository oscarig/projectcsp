import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  try {
    // Solo permitimos POST
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Obtenemos el payload del webhook de Supabase
    const payload = await req.json();
    
    // Verificamos que sea un insert en la tabla profiles
    if (payload.type !== "INSERT" || payload.table !== "profiles") {
      return new Response("Not a profile insert", { status: 200 });
    }

    const { email, full_name, role } = payload.record;
    
    if (!email) {
      return new Response("No email provided", { status: 200 });
    }

    // Aquí definimos el contenido del email según el rol
    let subject = "Welcome to our platform!";
    let htmlContent = `<h1>Welcome ${full_name || ''}!</h1><p>We're glad to have you here.</p>`;

    switch (role) {
      case 'provider':
        subject = "Welcome Provider! Start offering your services";
        htmlContent = `
          <h1>Welcome to the Provider Network, ${full_name || ''}!</h1>
          <p>You can now log in to your provider dashboard and start managing your services, clients, and billing.</p>
          <a href="https://your-domain.com/dashboard/provider">Go to Provider Dashboard</a>
        `;
        break;
      case 'partner':
        subject = "Welcome Partner! Let's grow together";
        htmlContent = `
          <h1>Welcome to the Partner Program, ${full_name || ''}!</h1>
          <p>Access your partner dashboard to view your directory, earnings, and engagement requests.</p>
          <a href="https://your-domain.com/dashboard/partner">Go to Partner Dashboard</a>
        `;
        break;
      case 'client':
        subject = "Welcome! Find the perfect Corporate Service Provider";
        htmlContent = `
          <h1>Welcome ${full_name || ''}!</h1>
          <p>Thank you for joining. You can now access your client dashboard to request services, track engagements, and manage your documents.</p>
          <a href="https://your-domain.com/dashboard/client">Go to Client Dashboard</a>
        `;
        break;
      case 'admin':
        subject = "Admin Access Granted";
        htmlContent = `<h1>Admin access granted.</h1><p>Please log in securely to access the admin portal.</p>`;
        break;
    }

    console.log(`Sending ${role} welcome email to ${email}`);

    // Si tenemos RESEND_API_KEY, enviamos el email real
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Welcome <onboarding@your-domain.com>",
          to: [email],
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error sending email: ${await res.text()}`);
      }
    }

    return new Response(JSON.stringify({ success: true, message: `Email triggered for ${role}` }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});