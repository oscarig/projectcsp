# Security Headers Configuration

## 🔒 Implementación de Security Headers

Este documento contiene las **security headers recomendadas** para proteger la aplicación contra vulnerabilidades comunes (XSS, clickjacking, MIME sniffing, etc.).

## 📋 Headers a Implementar

### 1. Content Security Policy (CSP)
Previene ataques XSS limitando las fuentes de contenido permitidas.

### 2. X-Frame-Options
Protege contra clickjacking impidiendo que el sitio se cargue en iframes.

### 3. X-Content-Type-Options
Previene MIME sniffing attacks.

### 4. Referrer-Policy
Controla cuánta información del referrer se envía.

### 5. Permissions-Policy
Controla qué features del navegador pueden usarse.

## 🛠️ Configuración para next.config.mjs

**IMPORTANTE:** Estas headers solo deben aplicarse en **producción**, NO en desarrollo (para permitir el preview iframe de Softgen).

Agrega esta configuración a tu `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones existentes ...

  async headers() {
    // Solo aplicar security headers en producción
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
            ].join(", "),
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## 🔍 Explicación de Cada Header

### Content-Security-Policy (CSP)
```
default-src 'self'
```
- Solo permite recursos del mismo origen por defecto

```
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com
```
- Scripts: mismo origen + Stripe + Google Maps
- `unsafe-eval` y `unsafe-inline` para Next.js (necesario para desarrollo)

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```
- Estilos: mismo origen + Google Fonts
- `unsafe-inline` para Tailwind CSS

```
img-src 'self' data: https: blob:
```
- Imágenes: mismo origen + data URIs + cualquier HTTPS + blob URLs

```
font-src 'self' data: https://fonts.gstatic.com
```
- Fuentes: mismo origen + data URIs + Google Fonts

```
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com
```
- APIs: mismo origen + Supabase + Stripe

```
frame-src 'self' https://js.stripe.com https://hooks.stripe.com
```
- iframes: mismo origen + Stripe

```
object-src 'none'
```
- Bloquea plugins antiguos (Flash, Java, etc.)

```
base-uri 'self'
```
- Previene inyección de tags `<base>`

```
form-action 'self'
```
- Formularios solo pueden enviar al mismo origen

```
frame-ancestors 'self'
```
- Solo puede ser embebido en mismo origen

```
upgrade-insecure-requests
```
- Convierte HTTP a HTTPS automáticamente

### Strict-Transport-Security (HSTS)
```
max-age=63072000; includeSubDomains; preload
```
- Fuerza HTTPS por 2 años
- Aplica a subdominios
- Elegible para preload list del navegador

### X-Frame-Options
```
SAMEORIGIN
```
- Permite iframes solo del mismo origen
- Protege contra clickjacking

### X-Content-Type-Options
```
nosniff
```
- Previene MIME type sniffing
- Fuerza al navegador a respetar Content-Type

### Referrer-Policy
```
origin-when-cross-origin
```
- Envía URL completa en mismo origen
- Solo envía origen en requests cross-origin

### Permissions-Policy
```
camera=(), microphone=(), geolocation=(), interest-cohort=()
```
- Deshabilita cámara, micrófono, geolocalización
- Bloquea FLoC (privacy)

## ⚠️ Consideraciones Importantes

### 1. Preview de Desarrollo
**Las headers están deshabilitadas en desarrollo** (`NODE_ENV !== "production"`) para permitir:
- Preview iframe de Softgen
- Hot Module Replacement (HMR)
- DevTools y debugging

### 2. Personalización por Proyecto
Ajusta las directivas CSP según tus necesidades:

**Si usas más servicios externos:**
```javascript
"connect-src 'self' https://*.supabase.co https://api.openai.com https://api.sendgrid.com"
```

**Si usas Cloudinary o AWS S3:**
```javascript
"img-src 'self' data: https: blob: https://res.cloudinary.com https://*.amazonaws.com"
```

**Si usas analytics:**
```javascript
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com"
"connect-src 'self' https://*.google-analytics.com"
```

### 3. Testing en Producción
Después de implementar las headers:

1. **Verifica en DevTools**
   - Abre Network tab
   - Inspecciona Response Headers
   - Confirma que todas las headers aparecen

2. **Usa herramientas online**
   - [SecurityHeaders.com](https://securityheaders.com)
   - [Mozilla Observatory](https://observatory.mozilla.org)

3. **Revisa la consola del navegador**
   - CSP violations aparecen en Console
   - Ajusta las directivas según sea necesario

### 4. Solución de Problemas Comunes

**Problema: Recursos bloqueados por CSP**
```
Refused to load... because it violates the following Content Security Policy directive
```
**Solución:** Agrega el dominio a la directiva correspondiente

**Problema: Google Fonts no cargan**
```javascript
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com"
"font-src 'self' data: https://fonts.gstatic.com"
```

**Problema: Stripe no funciona**
```javascript
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com"
"frame-src 'self' https://js.stripe.com https://hooks.stripe.com"
"connect-src 'self' https://api.stripe.com"
```

## 🎯 Checklist de Implementación

- [ ] Copiar configuración a `next.config.mjs`
- [ ] Verificar que `NODE_ENV !== "production"` está presente
- [ ] Hacer deploy a Vercel/producción
- [ ] Verificar headers en DevTools
- [ ] Probar con [SecurityHeaders.com](https://securityheaders.com)
- [ ] Confirmar que no hay CSP violations en Console
- [ ] Verificar que todos los recursos externos cargan correctamente
- [ ] Actualizar `.env.local` con `NEXT_PUBLIC_SITE_URL` correcto

## 📚 Referencias

- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Última actualización:** 2026-03-07  
**Estado:** ✅ Listo para implementar