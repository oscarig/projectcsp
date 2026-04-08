# Welcome Email Setup Guide

## Overview
The platform automatically sends personalized welcome emails and password reset emails to users.

## Email Types

### 1. Welcome Emails
Sent automatically when a new user registers with a role-specific template.

### 2. Password Reset Emails
Sent automatically when a user requests to reset their password.

## Setup Instructions

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create a new API key in your dashboard
3. Copy the API key (starts with `re_`)

### 2. Update the Secret

Run this command in Supabase SQL Editor or use the Softgen tools:

```sql
SELECT vault.update_secret(
  (SELECT id FROM vault.secrets WHERE name = 'RESEND_API_KEY'),
  'your_actual_resend_api_key_here'
);
```

Or via Softgen, ask:
"Update the RESEND_API_KEY secret to [your-key]"

### 3. Verify Email Domain

In Resend dashboard:
1. Go to "Domains"
2. Add your domain (e.g., yourdomain.com)
3. Add the DNS records provided
4. Wait for verification (usually 5-15 minutes)

### 4. Update "From" Email

In `supabase/functions/welcome-email/index.ts`, update:

```typescript
from: "onboarding@yourdomain.com",
```

### 5. Test the System

1. Register a new user with any role
2. Check the email inbox for the welcome email
3. Check Supabase logs for any errors:
   - Go to Database Console → Logs section
   - Filter for "welcome-email" function

## Password Reset Email Configuration

### How It Works
1. User clicks "Forgot password?" on login page
2. User enters their email address
3. System sends password reset link via Supabase Auth
4. Edge Function `password-reset-email` can be used for custom branded emails
5. User clicks link in email and sets new password

### Default Behavior
By default, Supabase Auth handles password reset emails automatically using the `redirectTo` parameter in `authService.resetPassword()`.

The reset link redirects to: `https://your-domain.com/auth/reset-password`

### Custom Branded Emails (Optional)
If you want custom branded password reset emails:

1. **Configure Resend API Key** (same as welcome emails)
2. **Update Auth Settings in Supabase Dashboard:**
   - Go to Authentication → Email Templates
   - Customize "Reset Password" template
   - Use your brand colors and logo

3. **Or use the Edge Function:**
   - The `password-reset-email` function is already deployed
   - Integrate it with Supabase Auth webhooks for custom emails
   - Template includes branded design with reset button

## Email Templates

### Welcome Email Templates

### Admin Welcome Email
- Subject: "Welcome to the Admin Team!"
- Highlights: Full platform access, user management capabilities

### Provider Welcome Email
- Subject: "Welcome to Our Provider Network!"
- Highlights: Client management, engagement tracking, billing

### Partner Welcome Email
- Subject: "Welcome to Our Partner Program!"
- Highlights: Referral opportunities, commission tracking, directory access

### Client Welcome Email
- Subject: "Welcome! Let's Get Started"
- Highlights: Service access, engagement creation, support resources

### Password Reset Email Template
**Subject:** Reset Your Vetto Password

**Content:**
- Branded header with Vetto logo
- Clear instructions
- Prominent "Reset Password" button
- Security notice (link expires in 1 hour)
- Support contact information

## Customization

### Update Email Content

Edit `supabase/functions/welcome-email/index.ts`:

```typescript
const emailTemplates = {
  admin: {
    subject: "Your Custom Subject",
    html: `<p>Your custom HTML</p>`
  },
};
```

### Disable Welcome Emails

To temporarily disable:

```sql
ALTER TABLE profiles DISABLE TRIGGER send_welcome_email_trigger;

ALTER TABLE profiles ENABLE TRIGGER send_welcome_email_trigger;
```

### Delete the trigger completely
```sql
DROP TRIGGER IF EXISTS send_welcome_email_trigger ON profiles;
DROP FUNCTION IF EXISTS send_welcome_email();
```

## Troubleshooting

### Email Not Sending

1. **Check Edge Function Logs**:
   - Database Console → Logs → Filter by "welcome-email"
   
2. **Verify API Key**:
   ```sql
   SELECT name FROM vault.secrets WHERE name = 'RESEND_API_KEY';
   ```

3. **Test Edge Function Manually**:
   ```bash
   curl -X POST https://[your-project-ref].supabase.co/functions/v1/welcome-email \
     -H "Content-Type: application/json" \
     -d '{"userId": "test-user-id", "email": "test@example.com", "role": "client"}'
   ```

### Password Reset Issues
**Problem:** Password reset email not received
**Solution:** 
1. Check spam/junk folder
2. Verify email address is correct
3. Wait 2-3 minutes (some email providers have delays)
4. Request new reset link if expired (1 hour expiration)

**Problem:** Reset link shows "Invalid or expired"
**Solution:**
1. Request a new password reset link
2. Ensure you're using the latest email
3. Don't use the same link twice

### Common Errors

- **"Invalid API key"**: Update RESEND_API_KEY secret
- **"Email domain not verified"**: Verify your domain in Resend
- **"Rate limit exceeded"**: Resend free tier: 100 emails/day

## Alternative Email Services

To use a different email service (SendGrid, Mailgun, etc.):

1. Update the Edge Function code in `welcome-email/index.ts`
2. Replace Resend API calls with your service's API
3. Update the secret name and value accordingly

## Monitoring

Track email delivery:
- Resend Dashboard → Emails → View delivery status
- Supabase Logs → Filter by function name
- Set up alerts for failed deliveries in Resend

## Support

For issues:
1. Check Supabase Edge Function logs
2. Verify Resend API key is correct
3. Ensure domain is verified in Resend
4. Contact support if issues persist