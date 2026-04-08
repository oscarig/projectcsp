import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate Limiting Service
 * Previene ataques de fuerza bruta y spam mediante límites de solicitudes
 * 
 * IMPORTANTE: Requiere variables de entorno en .env.local:
 * UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
 * UPSTASH_REDIS_REST_TOKEN=your-token-here
 * 
 * Obtener credenciales gratuitas en: https://console.upstash.com/
 */

// Configuración de Redis
let redis: Redis | null = null;

const getRedis = (): Redis => {
  if (!redis) {
    const url = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
    const token = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      console.warn(
        "⚠️ Upstash Redis no configurado. Rate limiting deshabilitado en desarrollo.\n" +
        "Para producción, configura NEXT_PUBLIC_UPSTASH_REDIS_REST_URL y NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN"
      );
      // En desarrollo sin Redis, usar mock que siempre permite
      throw new Error("Redis not configured");
    }

    redis = new Redis({
      url,
      token,
    });
  }
  return redis;
};

/**
 * Configuraciones de Rate Limiting por tipo de operación
 */
const rateLimitConfigs = {
  // Login: 5 intentos cada 15 minutos por email
  login: {
    requests: 5,
    window: "15 m",
  },
  // Registro: 3 cuentas por hora por IP
  register: {
    requests: 3,
    window: "1 h",
  },
  // Reset Password: 3 solicitudes cada hora por email
  resetPassword: {
    requests: 3,
    window: "1 h",
  },
} as const;

type RateLimitType = keyof typeof rateLimitConfigs;

/**
 * Crea un rate limiter para un tipo específico de operación
 */
const createRateLimiter = (type: RateLimitType) => {
  try {
    const redisClient = getRedis();
    const config = rateLimitConfigs[type];

    return new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(config.requests, config.window),
      analytics: true,
      prefix: `ratelimit:${type}`,
    });
  } catch (error) {
    // Si Redis no está configurado, retornar null (modo desarrollo)
    return null;
  }
};

/**
 * Verifica si una operación está permitida según rate limiting
 * 
 * @param type - Tipo de operación (login, register, resetPassword)
 * @param identifier - Identificador único (email, IP, etc.)
 * @returns success: true si permitido, false si bloqueado
 */
export const checkRateLimit = async (
  type: RateLimitType,
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> => {
  const rateLimiter = createRateLimiter(type);

  // Si no hay Redis configurado (desarrollo), permitir todas las operaciones
  if (!rateLimiter) {
    const config = rateLimitConfigs[type];
    return {
      success: true,
      limit: config.requests,
      remaining: config.requests,
      reset: Date.now() + 60000, // 1 minuto en el futuro
    };
  }

  try {
    const result = await rateLimiter.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.success ? undefined : Math.ceil((result.reset - Date.now()) / 1000),
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // En caso de error, permitir la operación (fail-open para no bloquear usuarios legítimos)
    const config = rateLimitConfigs[type];
    return {
      success: true,
      limit: config.requests,
      remaining: config.requests,
      reset: Date.now() + 60000,
    };
  }
};

/**
 * Formatea el tiempo de espera en un mensaje legible
 */
export const formatRetryAfter = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
};

/**
 * Obtiene la configuración de límites para un tipo específico
 */
export const getRateLimitConfig = (type: RateLimitType) => {
  return rateLimitConfigs[type];
};