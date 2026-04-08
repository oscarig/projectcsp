# 🔐 Role-Based Access Control (RBAC) - Implementation Guide

## ✅ **Implementation Status: 100% Complete**

---

## 📋 **Overview**

This document describes the complete Role-Based Access Control (RBAC) system implemented in the Vetto platform, including automatic role assignment during registration and strict dashboard access restrictions.

---

## 🎯 **Key Features**

### **1. Automatic Role Assignment** 🏷️
- ✅ All new users are automatically assigned the **"provider"** role upon registration
- ✅ Role is set in Supabase Auth metadata during signup
- ✅ Database trigger creates profile with provider role automatically
- ✅ No manual intervention required

### **2. Strict Dashboard Access Control** 🔒
- ✅ Each user can ONLY access their designated dashboard
- ✅ Automatic redirection if trying to access wrong dashboard
- ✅ Real-time role verification on every route change
- ✅ Prevents unauthorized access attempts

### **3. Session-Based Role Detection** 🎭
- ✅ Role is fetched from user profile in real-time
- ✅ Cached in useAuth hook for performance
- ✅ Updates automatically on auth state changes
- ✅ Synchronized with Supabase session

---

## 👥 **User Roles & Dashboard Mapping**

| Role | Dashboard Path | Description |
|------|---------------|-------------|
| **admin** 🔴 | `/dashboard/admin` | Platform administrators with full system access |
| **provider** 🟢 | `/dashboard/provider` | Primary CSPs (Cross-border Service Providers) |
| **partner** 🟡 | `/dashboard/partner` | Partner firms collaborating on engagements |
| **client** 🔵 | `/dashboard/client` | End clients requesting services |

---

## 🔄 **Registration Flow**

### **Step-by-Step Process:**

```
1. User visits /auth/register
   ↓
2. Fills out registration form (name, email, password)
   ↓
3. Submits form
   ↓
4. System creates Supabase Auth user with metadata:
   {
     full_name: "John Doe",
     role: "provider"  // ← Automatically assigned
   }
   ↓
5. Database trigger fires on auth.users insert
   ↓
6. Trigger creates profile in profiles table:
   - Extracts role from metadata
   - Sets email_verified = false
   - Creates profile record
   ↓
7. Email verification sent automatically
   ↓
8. User redirected to /auth/confirm-email
   ↓
9. After email verification → Redirected to /dashboard/provider
```

---

## 🛡️ **Access Control Logic**

### **GlobalAuthGuard Implementation:**

The `GlobalAuthGuard` component in `_app.tsx` enforces these rules:

#### **Rule 1: Public Routes (No Auth Required)**
```typescript
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/confirm-email",
  "/404",
  "/500",
];
```

#### **Rule 2: Authenticated Users on Auth Pages**
```typescript
// If user is logged in and tries to access /auth/* pages
// → Redirect to their dashboard based on role
if (isAuthenticated && currentPath.startsWith("/auth/")) {
  router.push(ROLE_DASHBOARD_MAP[role]);
}
```

#### **Rule 3: Dashboard Access Restrictions**
```typescript
// If user is on a dashboard route
if (currentPath.startsWith("/dashboard/")) {
  const userDashboard = ROLE_DASHBOARD_MAP[role];
  
  // If trying to access wrong dashboard → Redirect to correct one
  if (!currentPath.startsWith(userDashboard)) {
    router.push(userDashboard);
  }
}
```

#### **Rule 4: Unauthenticated Users on Private Routes**
```typescript
// If not authenticated and trying to access private route
if (!isAuthenticated && !isPublicRoute) {
  router.push(`/auth/login?redirectTo=${encodeURIComponent(router.asPath)}`);
}
```

---

## 🧪 **Test Scenarios**

### **Scenario 1: New User Registration** ✅
```
Action: Register new account
Email: testuser@example.com
Password: Test123!@#

Expected Result:
1. ✅ User created in auth.users
2. ✅ Profile created with role = "provider"
3. ✅ Verification email sent
4. ✅ Redirected to /auth/confirm-email
5. ✅ After verification → /dashboard/provider
```

### **Scenario 2: Provider Tries to Access Admin Dashboard** 🚫
```
Current Role: provider
Action: Navigate to /dashboard/admin

Expected Result:
1. ✅ GlobalAuthGuard detects wrong dashboard
2. ✅ Automatic redirect to /dashboard/provider
3. ✅ No error, seamless UX
4. ✅ User never sees admin content
```

### **Scenario 3: Client Tries to Access Partner Dashboard** 🚫
```
Current Role: client
Action: Navigate to /dashboard/partner

Expected Result:
1. ✅ GlobalAuthGuard detects wrong dashboard
2. ✅ Automatic redirect to /dashboard/client
3. ✅ No access to partner features
```

### **Scenario 4: Admin Accessing Different Dashboards** ✅
```
Current Role: admin
Action: Navigate to /dashboard/provider

Expected Result:
1. ✅ GlobalAuthGuard detects wrong dashboard
2. ✅ Automatic redirect to /dashboard/admin
3. ✅ Admins stay on admin dashboard
```

### **Scenario 5: Unauthenticated User** 🚫
```
Current State: Not logged in
Action: Navigate to /dashboard/provider

Expected Result:
1. ✅ GlobalAuthGuard detects no authentication
2. ✅ Redirect to /auth/login?redirectTo=/dashboard/provider
3. ✅ After login → Redirected back to /dashboard/provider
```

---

## 🔧 **Database Trigger Details**

### **Function: `handle_new_user()`**

This PostgreSQL function automatically creates a profile when a new user registers:

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Extract role from metadata, default to 'provider'
  user_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::TEXT,
    'provider'
  );

  -- Create profile with extracted role
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    email_verified,
    email_verified_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    user_role,
    false,
    NULL
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Key Points:**
- ✅ Extracts role from `raw_user_meta_data`
- ✅ Defaults to "provider" if no role specified
- ✅ Creates profile atomically with user creation
- ✅ Sets email_verified to false initially
- ✅ Security definer ensures proper permissions

---

## 📊 **Role Distribution Check**

### **Query to See All Users and Roles:**
```sql
SELECT 
  au.email,
  p.full_name,
  p.role,
  p.email_verified,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
ORDER BY 
  CASE p.role
    WHEN 'admin' THEN 1
    WHEN 'provider' THEN 2
    WHEN 'partner' THEN 3
    WHEN 'client' THEN 4
  END,
  au.created_at;
```

### **Count Users by Role:**
```sql
SELECT 
  role,
  COUNT(*) as total
FROM profiles
GROUP BY role
ORDER BY total DESC;
```

**Expected Output After Initial Setup:**
```
 role     | total
----------|-------
 provider |  2     (navarrapete@gmail.com changed to admin, provider@vetto.com)
 admin    |  1     (navarrapete@gmail.com)
 partner  |  1     (partner@vetto.com)
 client   |  1     (client@vetto.com)
```

---

## 🔐 **Security Features**

### **1. Role Immutability (From Frontend)**
- ✅ Users cannot change their own role via frontend
- ✅ Role changes require admin access to database
- ✅ Protected by RLS policies

### **2. Dashboard Isolation**
- ✅ Each dashboard is completely isolated
- ✅ No cross-role data leakage
- ✅ Real-time verification on route changes

### **3. Session Validation**
- ✅ Role fetched from database, not client-side storage
- ✅ Synchronized with Supabase auth session
- ✅ Updates on auth state changes

### **4. Redirect Protection**
- ✅ Preserves intended destination in URL params
- ✅ Post-login redirect to original requested page
- ✅ Prevents redirect loops

---

## 🎯 **useAuth Hook Enhancements**

The `useAuth` hook now provides:

```typescript
{
  user: AuthUser | null,           // Current authenticated user
  profile: UserProfile | null,     // User profile with role
  session: Session | null,         // Supabase session
  loading: boolean,                // Loading state
  isAuthenticated: boolean,        // Quick auth check
  role: UserRole | undefined,      // Current user role
  
  // Methods
  signOut: () => Promise<void>,
  hasRole: (role: UserRole) => boolean,
  hasAnyRole: (roles: UserRole[]) => boolean
}
```

**Usage Examples:**

```typescript
const { role, hasRole } = useAuth();

// Check if user is admin
if (hasRole('admin')) {
  // Show admin-only features
}

// Check if user is provider or partner
if (hasAnyRole(['provider', 'partner'])) {
  // Show shared features
}

// Get current role
console.log(role); // 'provider' | 'admin' | 'partner' | 'client'
```

---

## 🚀 **Testing Guide**

### **Test 1: Register New Provider**
```bash
1. Logout (if logged in)
2. Go to /auth/register
3. Fill form:
   - Name: Test Provider
   - Email: testprovider@example.com
   - Password: Test123!@#
4. Submit

✅ Expected:
- Profile created with role = "provider"
- Verification email sent
- Redirected to /auth/confirm-email
```

### **Test 2: Role-Based Dashboard Access**
```bash
1. Login as provider@vetto.com
2. Try to navigate to /dashboard/admin

✅ Expected:
- Immediately redirected to /dashboard/provider
- No error message, seamless redirect
```

### **Test 3: Login Redirect**
```bash
1. Logout
2. Navigate to /dashboard/provider (while logged out)
3. Login as provider@vetto.com

✅ Expected:
- Redirected to /auth/login?redirectTo=/dashboard/provider
- After login → Back to /dashboard/provider
```

### **Test 4: Cross-Role Access Prevention**
```bash
Test with each role trying to access other dashboards:

Provider → Admin Dashboard ❌ → Redirects to Provider
Partner → Client Dashboard ❌ → Redirects to Partner
Client → Provider Dashboard ❌ → Redirects to Client
Admin → Partner Dashboard ❌ → Redirects to Admin
```

---

## 📝 **Migration Notes**

### **For Existing Users:**
- ✅ All existing users remain with their current roles
- ✅ Database trigger only affects NEW registrations
- ✅ Admins can manually update roles via SQL if needed

### **Manual Role Change (Admin Only):**
```sql
-- Change user role (execute in Supabase SQL editor)
UPDATE profiles 
SET 
  role = 'admin',  -- or 'provider', 'partner', 'client'
  updated_at = NOW()
WHERE email = 'user@example.com';
```

---

## ✅ **Implementation Checklist**

- [x] Database trigger created for auto role assignment
- [x] Registration form updated to include role metadata
- [x] GlobalAuthGuard implements strict access control
- [x] useAuth hook provides role information
- [x] Dashboard layouts include role verification
- [x] Redirect logic preserves intended destination
- [x] All test scenarios validated
- [x] Documentation completed

---

## 🎉 **Summary**

The RBAC system is now **fully implemented** with:

1. ✅ **Automatic "provider" role assignment** for new registrations
2. ✅ **Strict dashboard access control** - Users can only access their own dashboard
3. ✅ **Seamless redirects** - No error messages, just automatic routing
4. ✅ **Real-time role verification** - Updates on auth state changes
5. ✅ **Secure implementation** - Role stored in database, not client-side

**Default Registration Behavior:**
- New users → Automatically assigned "provider" role
- Redirected to `/dashboard/provider` after verification
- Cannot access admin, partner, or client dashboards

**Access Control:**
- Each role has ONE designated dashboard
- Attempting to access other dashboards → Automatic redirect
- No manual role selection during registration

---

**Last Updated:** 2026-03-21  
**Version:** 1.0.0  
**Status:** ✅ Production Ready