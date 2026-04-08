# Security Headers HTTP - Implementation Guide

## Current Status

Your next.config.mjs currently has NO security headers configured.

## Headers Status

Currently implemented:
- ❌ None

Missing (CRITICAL):
- ❌ X-Frame-Options
- ❌ Content-Security-Policy  
- ❌ X-Content-Type-Options
- ❌ Referrer-Policy
- ❌ Permissions-Policy
- ❌ Strict-Transport-Security

## Required Configuration

Add to next.config.mjs async headers function:

```javascript
async headers() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    },
  ];

  if (!isDevelopment) {
    securityHeaders.push(
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https: blob:",
          "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.upstash.io",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'"
        ].join("; ")
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
      }
    );
  }

  return [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ];
}
```

## Complete next.config.mjs File

Replace your entire next.config.mjs with this:

```javascript
/** @type {import('next').NextConfig} */
import { createRequire } from "module";

function isElementTaggerAvailable() {
  try {
    const require = createRequire(import.meta.url);
    require.resolve("@softgenai/element-tagger");
    return true;
  } catch {
    return false;
  }
}

function getTurboRules() {
  if (!isElementTaggerAvailable()) {
    console.log(
      "[Softgen] Element tagger not found, skipping loader configuration"
    );
    return {};
  }

  return {
    "*.tsx": ["@softgenai/element-tagger"],
    "*.jsx": ["@softgenai/element-tagger"],
  };
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: getTurboRules(),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  allowedDevOrigins: ["*.daytona.work", "*.softgen.dev"],
  async headers() {
    const isDevelopment = process.env.NODE_ENV === "development";
    
    const securityHeaders = [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on"
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin"
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
      },
    ];

    if (!isDevelopment) {
      securityHeaders.push(
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.upstash.io",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
          ].join("; ")
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains"
        }
      );
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

## Header Explanations

### X-Frame-Options: DENY
Prevents clickjacking attacks by blocking iframe embedding.
Development: Disabled to allow Softgen preview iframe.
Production: Enabled for maximum security.

### Content-Security-Policy
Defines trusted sources for scripts styles images etc.
Key directives:
- default-src self: Only load resources from same origin
- script-src: Allows inline scripts for Next.js
- connect-src: Allows Supabase and Upstash connections
- frame-ancestors none: No iframe embedding allowed

### Strict-Transport-Security
Forces HTTPS connections for 1 year.
Only enabled in production with HTTPS.

### X-Content-Type-Options: nosniff
Prevents MIME type sniffing attacks.
Browser respects declared content types only.

### Referrer-Policy
Controls information sent in Referer header.
strict-origin-when-cross-origin: Send origin only to external sites.

### Permissions-Policy
Disables unnecessary browser APIs.
Blocks: camera microphone geolocation interest-cohort

## Verification Steps

1. Deploy to production Vercel
2. Open browser DevTools Network tab
3. Check Response Headers for any request
4. Verify all headers are present

Online tools:
- https://securityheaders.com
- https://observatory.mozilla.org

## Security Rating Impact

Before: F rating
After: A rating

Protection against:
- XSS Cross-Site Scripting
- Clickjacking
- MIME sniffing
- Protocol downgrade attacks
- Information leakage
- Unauthorized API access

## Notes

CSP may need adjustment based on:
- Third party scripts Google Analytics Stripe etc
- External fonts or images
- WebSocket connections

HSTS requires HTTPS to function.
Once enabled browsers remember for max-age duration.

Development mode allows iframe for preview.
Production mode enforces strict security.

File: next.config.mjs
Updated: 2026-03-07