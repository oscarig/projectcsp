# Environment Variables Validation Guide

## 📋 Overview

Este proyecto usa `@t3-oss/env-nextjs` y `zod` para validar variables de entorno en **build time**, previniendo errores en runtime por variables faltantes o inválidas.

## ✅ Ventajas de la Validación

### 1. **Type Safety**
```typescript
// ❌ Antes (sin validación)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL; // string | undefined

// ✅ Ahora (con validación)
import { env } from "@/env.mjs";
const url = env.NEXT_PUBLIC_SUPABASE_URL; // string (garantizado)
```

### 2. **Build-Time Errors**
```bash
# Si falta una variable requerida, el build falla inmediatamente
❌ Missing environment variables:
  - NEXT_PUBLIC_SUPABASE_URL: Supabase URL is required
```

### 3. **Validación de Formato**
```typescript
// URLs son validadas automáticamente
NEXT_PUBLIC_SUPABASE_URL: z.string().url() 
// ✅ https://xyz.supabase.co
// ❌ invalid-url
```

### 4. **Documentación Centralizada**
Todas las variables están documentadas en un solo archivo: `src/env.mjs`

## 🔧 Configuración Actual

### Archivo: `src/env.mjs`

```javascript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Variables del servidor (nunca expuestas al cliente)
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  // Variables del cliente (expuestas al navegador)
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1, "Supabase URL is required"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required"),
    NEXT_PUBLIC_SITE_URL: z.string().url().min(1, "Site URL is required"),
  },

  // Mapeo de process.env
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Opciones
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

## 📝 Variables Requeridas

### Cliente (NEXT_PUBLIC_*)
Estas variables se exponen al navegador:

| Variable | Tipo | Validación | Descripción |
|----------|------|------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | string (URL) | ✅ Requerida | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | string | ✅ Requerida | Anon key de Supabase |
| `NEXT_PUBLIC_SITE_URL` | string (URL) | ✅ Requerida | URL del sitio (para redirects) |

### Servidor
Estas variables solo están disponibles en el servidor:

| Variable | Tipo | Validación | Descripción |
|----------|------|------------|-------------|
| `NODE_ENV` | enum | ✅ Default: "development" | Entorno de ejecución |

## 🚀 Uso en el Código

### ❌ Antes (Sin Validación)
```typescript
// Problema: No hay garantía de que exista
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error("Missing Supabase URL"); // Error en runtime 💥
}
```

### ✅ Ahora (Con Validación)
```typescript
import { env } from "@/env.mjs";

// Garantizado que existe y es válido
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL; // ✅ string
```

### Ejemplos Reales

**En Supabase Client:**
```typescript
// src/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env.mjs";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**En Auth Service:**
```typescript
// src/services/authService.ts
import { env } from "@/env.mjs";

const redirectURL = `${env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
```

**En Componentes:**
```typescript
import { env } from "@/env.mjs";

export function Footer() {
  const isDev = env.NODE_ENV === "development";
  
  return (
    <footer>
      {isDev && <div>Development Mode</div>}
    </footer>
  );
}
```

## 🛠️ Agregar Nuevas Variables

### 1. Actualizar `.env.local`
```bash
NEXT_PUBLIC_NEW_API_KEY=abc123
```

### 2. Agregar a `src/env.mjs`

**Variable del Cliente:**
```javascript
client: {
  // ... variables existentes ...
  NEXT_PUBLIC_NEW_API_KEY: z.string().min(1, "API Key is required"),
}
```

**Variable del Servidor:**
```javascript
server: {
  // ... variables existentes ...
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(32, "Secret must be at least 32 characters"),
}
```

### 3. Agregar al Runtime Mapping
```javascript
runtimeEnv: {
  // ... variables existentes ...
  NEXT_PUBLIC_NEW_API_KEY: process.env.NEXT_PUBLIC_NEW_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL, // Solo servidor
}
```

## 🔍 Validaciones Disponibles

### Tipos Básicos
```typescript
z.string()           // Cualquier string
z.string().min(10)   // Mínimo 10 caracteres
z.string().max(100)  // Máximo 100 caracteres
z.string().url()     // URL válida
z.string().email()   // Email válido
z.number()           // Número
z.boolean()          // Booleano
```

### Enums
```typescript
z.enum(["development", "staging", "production"])
```

### Valores por Defecto
```typescript
z.string().default("default-value")
z.number().default(3000)
```

### Opcionales
```typescript
z.string().optional()  // Puede ser undefined
z.string().nullable()  // Puede ser null
```

### Transformaciones
```typescript
z.string().transform((val) => val.toUpperCase())
z.string().transform((val) => parseInt(val, 10))
```

### Validaciones Personalizadas
```typescript
z.string().refine(
  (val) => val.startsWith("sk_"),
  "Stripe key must start with sk_"
)
```

## ⚠️ Problemas Comunes

### 1. Variable Faltante en Build
```bash
❌ Error: Missing environment variables:
  - NEXT_PUBLIC_SUPABASE_URL: Supabase URL is required
```
**Solución:** Agrega la variable a `.env.local`

### 2. Formato Inválido
```bash
❌ Error: Invalid environment variables:
  - NEXT_PUBLIC_SUPABASE_URL: Invalid url
```
**Solución:** Verifica que sea una URL válida (https://...)

### 3. Variable de Servidor en Cliente
```typescript
// ❌ ERROR: No puedes usar variables del servidor en el cliente
import { env } from "@/env.mjs";
console.log(env.DATABASE_URL); // undefined en el cliente
```
**Solución:** Solo usa `NEXT_PUBLIC_*` en el cliente

### 4. Skip Validation en CI/CD
Si necesitas skip la validación durante builds de Docker:
```bash
SKIP_ENV_VALIDATION=true npm run build
```

## 📚 Mejores Prácticas

### 1. **Nunca Hardcodea Valores**
```typescript
// ❌ Mal
const apiUrl = "https://api.example.com";

// ✅ Bien
import { env } from "@/env.mjs";
const apiUrl = env.NEXT_PUBLIC_API_URL;
```

### 2. **Usa Variables por Entorno**
```bash
# .env.local (desarrollo)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production (producción)
NEXT_PUBLIC_SITE_URL=https://myapp.com
```

### 3. **Documenta Cada Variable**
```typescript
client: {
  // Google Maps API Key para el selector de ubicación
  NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().min(1),
}
```

### 4. **Agrupa Variables Relacionadas**
```typescript
server: {
  // Supabase
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  
  // Email
  SENDGRID_API_KEY: z.string(),
}
```

## 🎯 Checklist de Implementación

- [x] Instalado `@t3-oss/env-nextjs` y `zod`
- [x] Creado `src/env.mjs` con validaciones
- [x] Validadas variables existentes en `.env.local`
- [ ] Actualizar imports en todo el proyecto:
  - [ ] `src/integrations/supabase/client.ts`
  - [ ] `src/services/authService.ts`
  - [ ] Otros archivos que usen `process.env`
- [ ] Testing en desarrollo
- [ ] Testing en producción (Vercel)
- [ ] Documentar variables adicionales si se agregan

## 🔗 Referencias

- [T3 Env Documentation](https://env.t3.gg/)
- [Zod Documentation](https://zod.dev/)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

---

**Última actualización:** 2026-03-07  
**Estado:** ✅ Implementado y listo para usar