/**
 * Environment Variables Validation
 * This file validates all environment variables at build time
 * Prevents runtime errors from missing or invalid env vars
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side Environment Variables
   * These are only available on the server and never sent to the client
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side Environment Variables
   * These are exposed to the browser (must start with NEXT_PUBLIC_)
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1, "Supabase URL is required"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required"),
    NEXT_PUBLIC_SITE_URL: z.string().url().min(1, "Site URL is required"),
  },

  /**
   * Runtime Environment Variables
   * Maps process.env to validated values
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  /**
   * Skip validation during build (optional)
   * Set to true if you want to skip validation during Docker builds
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so empty strings are treated as undefined
   * Pass `true` to treat empty strings as undefined
   */
  emptyStringAsUndefined: true,
});