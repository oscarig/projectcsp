import { z } from "zod";

/**
 * Input validation and sanitization utilities
 * Uses Zod for schema validation
 */

// Email validation
export const emailSchema = z.string().email("Invalid email address");

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

// Password validation (min 8 chars, uppercase, lowercase, number, special char)
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const result = passwordSchema.safeParse(password);
  return {
    isValid: result.success,
    errors: result.success ? [] : result.error.errors.map((e) => e.message),
  };
}

// Sanitize user input (prevent XSS)
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Validate URL
export const urlSchema = z.string().url("Invalid URL");

export function validateUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

// Phone number validation (international format)
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export function validatePhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

// Company registration number validation
export function validateRegistrationNumber(
  number: string,
  jurisdiction: string
): boolean {
  // TODO: Implement jurisdiction-specific validation
  // UK: Company House number format
  // US: EIN format
  // EU: VAT number format
  return number.length >= 5 && /^[A-Z0-9]+$/.test(number);
}

// File upload validation
export const fileUploadSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.enum([
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ], {
    errorMap: () => ({ message: "Invalid file type" }),
  }),
});

export function validateFileUpload(file: {
  name: string;
  size: number;
  type: string;
}): { isValid: boolean; error?: string } {
  const result = fileUploadSchema.safeParse(file);
  return {
    isValid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}

// SQL injection prevention (basic check)
export function containsSqlInjection(input: string): boolean {
  const sqlKeywords = [
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "UNION",
    "EXEC",
    "SCRIPT",
  ];
  const upperInput = input.toUpperCase();
  return sqlKeywords.some((keyword) => upperInput.includes(keyword));
}

// Rate limiting check (in-memory, replace with Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}