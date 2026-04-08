# Vetto Platform Architecture (UI Layer)

## Overview

Vetto is **The Cross Border App for Corporate Service Providers** — a workflow + partner network platform for managing client engagements across jurisdictions.

**Key principle**: This is NOT a marketplace. It's a private partner network with optional discovery.

---

## Tech Stack

- **Framework**: Next.js 15.5 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **State Management**: React hooks (no external state library)
- **Authentication**: Not yet implemented (UI-only build)
- **Database**: Not yet implemented (mock data layer in place)

---

## User Roles

### 1. Provider (Primary CSP)
**Who**: Corporate Service Provider firms (formation agents, accountants, lawyers, etc.)

**Subscription**: Paid monthly subscription

**Access**: Full provider dashboard

**Capabilities**:
- Manage client engagements
- Create and assign partner tasks
- Track partner due diligence
- View white-label portal status (read-only)
- Manage team members and settings
- Access analytics and reports
- Handle billing and subscriptions

**Dashboard Route**: `/dashboard/provider`

---

### 2. Partner (Subcontractor CSP)
**Who**: Subcontractors who fulfill work for Primary CSPs

**Subscription**: Free (invited by providers)

**Access**: Partner dashboard

**Capabilities**:
- View assigned engagement tasks
- Submit partner due diligence packs
- Upload documents and evidence
- Track earnings and payments
- Browse provider directory
- Manage profile and compliance

**Dashboard Route**: `/dashboard/partner`

---

### 3. Client (End Client)
**Who**: Businesses receiving services from Primary CSPs

**Subscription**: Free

**Access**: Client dashboard

**Capabilities**:
- View engagement progress
- Upload documents
- Track requests
- Access help and support
- Manage profile

**Dashboard Route**: `/dashboard/client`

---

### 4. Admin (Platform Operators)
**Who**: Vetto platform administrators

**Access**: Full admin dashboard

**Capabilities**:
- Manage all users (providers, partners, clients)
- KYB/KYC verification workflows
- White-label provisioning and configuration
- Platform settings and configuration
- Subscription and payment management
- Analytics and reporting
- Compliance and audit logs

**Dashboard Route**: `/dashboard/admin`

---

## Core Business Model Rules (Enforced in UI)

### 1. Engagement-Centric Model
✅ **DO**: Use "engagements" as the main workflow object

✅ **DO**: Use "engagement tasks" or "partner assignments" for work items

❌ **DON'T**: Use "projects" or "work orders"

**Terminology**:
- **Engagement**: A service relationship with a client
- **Engagement Task**: A specific deliverable within an engagement
- **Partner Assignment**: Work outsourced to a partner
- **Client**: End business receiving services
- **Provider**: Primary CSP managing the engagement

---

### 2. No Messaging Module
✅ **DO**: Use notifications + activity timelines

✅ **DO**: Show recent activity and status updates

❌ **DON'T**: Build chat/messaging features

❌ **DON'T**: Store message history

**Communication Approach**:
- Real-time notifications for key events
- Activity timeline showing engagement history
- Email notifications for important updates
- External communication via email/external tools

**Removed Components**:
- `MessagesView.tsx` (deleted)
- `messages.tsx` page (deleted)
- Message sections in engagement details (replaced with activity timeline)

---

### 3. KYC/Documents Handling
✅ **DO**: Allow upload of company/formation documents

✅ **DO**: Allow secure URL sharing for identity documents

❌ **DON'T**: Store passport/KYC files permanently by default

❌ **DON'T**: Imply persistent storage of identity documents

**Document Types**:
- **Company Documents**: Articles of incorporation, registration certificates, etc.
- **Engagement Documents**: Contracts, invoices, deliverables
- **Identity Documents**: Shared via secure URL/email (not stored)
- **Partner Due Diligence**: Evidence packs from partners

**UI Approach**:
- Upload widget for company/engagement docs
- Secure link sharing for identity verification
- Clear labeling of what's stored vs. linked

---

### 4. White-Label Ownership
✅ **Admin**: Full control over white-label configuration

✅ **Provider**: Read-only status/preview access

❌ **Provider**: Cannot edit branding, domain, or email settings

**Admin Controls**:
- Subdomain configuration (e.g., `londoncsp.vetto.com`)
- Branding (colors, logos, company name)
- Email settings (sender name, reply-to)
- Portal features (document upload, engagement tracking, etc.)
- SSL and DNS management

**Provider Access**:
- View portal status (active/pending/suspended)
- Preview white-label portal
- Request changes (via support)

**Files**:
- Admin: `/src/components/dashboard/admin/WhiteLabelView.tsx`
- Provider: `/src/components/dashboard/provider/WhiteLabelPortalView.tsx` (read-only)

---

### 5. Compliance Wording
✅ **DO**: Use "Partner Due Diligence Pack"

✅ **DO**: Use "Evidence Complete" or "Consistent with registry response"

❌ **DON'T**: Use "Evidence Pack"

❌ **DON'T**: Use "verified" (implies legal guarantee)

**Approved Terminology**:
- "Partner Due Diligence Pack" (not "Evidence Pack")
- "Evidence Complete" (status indicator)
- "Consistent with registry response" (validation wording)
- "Compliance documentation" (general term)
- "Due diligence materials" (general term)

**Avoid**:
- "Verified" (too strong, implies legal liability)
- "Certified" (same issue)
- "Approved" (use "Evidence Complete" instead)

---

## File Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── admin/           # Admin dashboard components
│   │   │   ├── Layout.tsx
│   │   │   ├── HomeView.tsx
│   │   │   ├── WhiteLabelView.tsx
│   │   │   ├── configuration/   # Broken down config components
│   │   │   │   ├── types.ts
│   │   │   │   ├── EmailTemplatesCard.tsx
│   │   │   │   ├── ServiceCategoriesCard.tsx
│   │   │   │   └── PlatformFeesCard.tsx
│   │   │   └── ...
│   │   ├── provider/        # Provider dashboard components
│   │   │   ├── Layout.tsx
│   │   │   ├── HomeView.tsx
│   │   │   ├── EngagementsView.tsx  # Renamed from QuotesView
│   │   │   ├── WhiteLabelPortalView.tsx  # Read-only
│   │   │   ├── settings/    # Broken down settings components
│   │   │   │   ├── types.ts
│   │   │   │   ├── TeamMembersCard.tsx
│   │   │   │   ├── NotificationPreferencesCard.tsx
│   │   │   │   ├── ComplianceSettingsCard.tsx
│   │   │   │   └── ApiAccessCard.tsx
│   │   │   └── ...
│   │   ├── partner/         # Partner dashboard components
│   │   │   ├── Layout.tsx
│   │   │   ├── HomeView.tsx
│   │   │   └── ...
│   │   └── client/          # Client dashboard components
│   │       ├── Layout.tsx
│   │       ├── HomeView.tsx
│   │       ├── EngagementDetailView.tsx  # Activity timeline instead of messages
│   │       └── ...
│   ├── ui/                  # shadcn/ui components
│   ├── SEO.tsx
│   ├── ThemeSwitch.tsx
│   └── ...
├── contexts/
│   └── ThemeProvider.tsx    # Wired in _app.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── utils.ts
│   ├── permissions.ts
│   └── mocks/               # Centralized mock data
│       ├── providers.ts
│       ├── partners.ts
│       ├── clients.ts
│       ├── engagements.ts
│       ├── notifications.ts
│       ├── documents.ts
│       ├── activities.ts
│       └── requests.ts
├── pages/
│   ├── _app.tsx             # ThemeProvider wired here
│   ├── _document.tsx
│   ├── index.tsx            # Landing page
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── index.tsx
│   │   │   ├── whitelabel.tsx  # Admin white-label provisioning
│   │   │   └── ...
│   │   ├── provider/
│   │   │   ├── index.tsx
│   │   │   ├── engagements.tsx  # Renamed from quotes.tsx
│   │   │   └── whitelabel/
│   │   │       └── portal.tsx   # Read-only status page
│   │   ├── partner/
│   │   │   └── ...
│   │   └── client/
│   │       └── ...           # No messages.tsx (deleted)
│   └── ...
├── styles/
│   └── globals.css
└── types/
    └── index.ts             # Centralized TypeScript types
```

---

## Shared Types Layer

All TypeScript interfaces are centralized in `/src/types/index.ts`:

**Core Types**:
- `UserRole`: "provider" | "partner" | "client" | "admin"
- `Provider`: Primary CSP entity
- `Partner`: Subcontractor CSP entity
- `Client`: End client entity
- `Engagement`: Main workflow object
- `EngagementTask`: Specific deliverable within engagement
- `PartnerAssignment`: Work assigned to partner
- `Document`: File/document entity
- `Notification`: User notification
- `Activity`: Engagement activity log entry
- `Request`: Pending action request
- `PartnerDueDiligencePack`: Compliance documentation
- `AuditLog`: System audit entry

**Benefits**:
- Single source of truth for data models
- Easy to extend/modify
- Type-safe across components
- Preparation for backend integration

---

## Mock Data Layer

All mock data is centralized in `/src/lib/mocks/`:

**Files**:
- `providers.ts`: Mock provider data + helper functions
- `partners.ts`: Mock partner data + helper functions
- `clients.ts`: Mock client data + helper functions
- `engagements.ts`: Mock engagement data + helper functions
- `notifications.ts`: Mock notification data + helper functions
- `documents.ts`: Mock document data + helper functions
- `activities.ts`: Mock activity timeline data + helper functions
- `requests.ts`: Mock request data + helper functions

**Helper Functions**:
- `getProviderById(id: string)`
- `getPartnerById(id: string)`
- `getClientById(id: string)`
- `getEngagementById(id: string)`
- `getEngagementsByClient(clientId: string)`
- `getEngagementsByPartner(partnerId: string)`
- `getActivitiesByEngagement(engagementId: string)`
- `getUnreadNotifications(userId: string)`

**Benefits**:
- Components import from central location
- Easy to swap for API calls later
- Consistent data across views
- Realistic demo data

---

## Component Naming Conventions

### Format: `{Role}{Feature}View.tsx`

**Examples**:
- `ProviderEngagementsView.tsx` (not `QuotesView.tsx`)
- `PartnerEngagementsView.tsx`
- `ClientEngagementDetailView.tsx`
- `AdminWhiteLabelView.tsx`

### Nested Components: `{feature}/{ComponentCard}.tsx`

**Examples**:
- `settings/TeamMembersCard.tsx`
- `settings/NotificationPreferencesCard.tsx`
- `configuration/EmailTemplatesCard.tsx`
- `configuration/ServiceCategoriesCard.tsx`

**Benefits**:
- Clear role context
- Easy to find related components
- Explicit naming prevents confusion
- Matches file names exactly

---

## Large Component Refactoring

### When to Break Down Components

**Triggers**:
- File exceeds 350 lines
- Multiple distinct UI sections
- Complex state management
- Reusable sub-components

**Refactoring Pattern**:

```
OriginalView.tsx (500 lines)
↓
feature/
  ├── types.ts              # TypeScript interfaces
  ├── FeatureCard1.tsx      # Sub-component 1
  ├── FeatureCard2.tsx      # Sub-component 2
  └── FeatureCard3.tsx      # Sub-component 3
FeatureView.tsx (50 lines)  # Container importing cards
```

**Examples**:

1. **SettingsView.tsx** → Split into:
   - `settings/TeamMembersCard.tsx`
   - `settings/NotificationPreferencesCard.tsx`
   - `settings/ComplianceSettingsCard.tsx`
   - `settings/ApiAccessCard.tsx`
   - `settings/types.ts`

2. **ConfigurationView.tsx** → Split into:
   - `configuration/EmailTemplatesCard.tsx`
   - `configuration/ServiceCategoriesCard.tsx`
   - `configuration/PlatformFeesCard.tsx`
   - `configuration/types.ts`

**Benefits**:
- Easier to maintain
- Better code organization
- Reusable components
- Clearer responsibilities

---

## Theme Support

### Implementation

**ThemeProvider** is wired in `_app.tsx`:

```tsx
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
```

**ThemeSwitch** component allows users to toggle between:
- Light mode
- Dark mode
- System preference

**CSS Variables**:
- Defined in `globals.css`
- Support both light and dark themes
- Used by Tailwind via `var(--variable-name)`

---

## Navigation Structure

### Provider Dashboard
```
Dashboard → /dashboard/provider
Clients → /dashboard/provider/clients
Engagements → /dashboard/provider/engagements  # Renamed from quotes
Analytics → /dashboard/provider/analytics
Requests → /dashboard/provider/requests
Billing → /dashboard/provider/billing
Partners → /dashboard/provider/partners
Documents → /dashboard/provider/documents
Reports → /dashboard/provider/reports
White Label → /dashboard/provider/whitelabel/portal  # Read-only
Profile → /dashboard/provider/profile
Roles & Permissions → /dashboard/provider/roles
Audit Log → /dashboard/provider/audit-log
Settings → /dashboard/provider/settings
```

### Partner Dashboard
```
Dashboard → /dashboard/partner
Engagements → /dashboard/partner/engagements
Documents → /dashboard/partner/documents
Earnings → /dashboard/partner/earnings
Profile → /dashboard/partner/profile
CSP Directory → /dashboard/partner/directory
```

### Client Dashboard
```
Dashboard → /dashboard/client
Engagements → /dashboard/client/engagements
Documents → /dashboard/client/documents
Profile → /dashboard/client/profile
Help & Support → /dashboard/client/help
# Messages page REMOVED
```

### Admin Dashboard
```
Dashboard → /dashboard/admin
Users → /dashboard/admin/users
  ├── Primary CSPs → /dashboard/admin/users/primary-csps
  ├── Partners → /dashboard/admin/users/partners
  └── Clients → /dashboard/admin/users/clients
Providers → /dashboard/admin/providers
  └── KYB Queue → /dashboard/admin/providers/kyb-queue
Subscriptions → /dashboard/admin/subscriptions
Payments → /dashboard/admin/payments
Categories → /dashboard/admin/categories
Configuration → /dashboard/admin/configuration
Analytics → /dashboard/admin/analytics
White Label → /dashboard/admin/whitelabel  # Full admin control
Stripe → /dashboard/admin/stripe
... (and more)
```

---

## Removed Features

### 1. Messaging System
**Removed Files**:
- `src/pages/dashboard/client/messages.tsx`
- `src/components/dashboard/client/MessagesView.tsx`

**Removed Components**:
- Message sections in engagement detail views
- Chat interfaces
- Message threads
- Conversation history

**Replaced With**:
- Notification center
- Activity timeline
- Recent notifications widgets
- Email notifications (external)

### 2. Provider White-Label Editing
**Removed Files**:
- `src/components/dashboard/provider/WhiteLabelBrandView.tsx`
- `src/components/dashboard/provider/WhiteLabelEmailView.tsx`
- `src/components/dashboard/provider/WhiteLabelDomainView.tsx`
- `src/components/dashboard/provider/WhiteLabelFeaturesView.tsx`
- `src/pages/dashboard/provider/whitelabel/branding.tsx`
- `src/pages/dashboard/provider/whitelabel/emails.tsx`
- `src/pages/dashboard/provider/whitelabel/domain.tsx`
- `src/pages/dashboard/provider/whitelabel/features.tsx`
- `src/pages/dashboard/provider/whitelabel/analytics.tsx`
- `src/pages/dashboard/provider/whitelabel/security.tsx`

**Replaced With**:
- Read-only portal status page: `WhiteLabelPortalView.tsx`
- Admin white-label provisioning: `admin/WhiteLabelView.tsx`

---

## Future Backend Integration

### Authentication (To Be Implemented)
- Role-based access control (RBAC)
- Session management
- JWT tokens
- OAuth providers (optional)

### Database Schema (To Be Implemented)
- User tables (providers, partners, clients, admins)
- Engagement tables
- Document storage references
- Notification queue
- Audit logs
- Subscription/billing data

### API Integration (To Be Implemented)
- Replace mock data with API calls
- Real-time notifications (WebSockets/Server-Sent Events)
- File upload/download
- Payment processing (Stripe)
- KYB/KYC verification workflows

### Preparation in Current Codebase
✅ Centralized types in `/src/types/index.ts`
✅ Mock data layer in `/src/lib/mocks/` (easy to swap for API calls)
✅ Component structure ready for data fetching
✅ Role-based navigation already in place
✅ Form validation patterns established

**Migration Path**:
1. Create API client (`/src/lib/api.ts`)
2. Replace mock imports with API calls
3. Add loading states and error handling
4. Implement authentication
5. Wire up real-time features

---

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- Type definitions
- Utility functions
- Form validation

### Integration Tests
- User flows
- Role-based access
- Navigation
- Form submissions

### E2E Tests
- Full user journeys
- Multi-role interactions
- Critical paths (engagement creation, partner assignments, etc.)

---

## Performance Considerations

### Current Optimizations
✅ Next.js automatic code splitting
✅ Lazy loading with dynamic imports
✅ Image optimization (Next.js Image component)
✅ CSS purging (Tailwind)

### Future Optimizations
- React Query for data caching
- Virtualized lists for large datasets
- Optimistic UI updates
- Service worker for offline support

---

## Accessibility (a11y)

### Current Implementation
✅ Semantic HTML
✅ ARIA labels where needed
✅ Keyboard navigation support (shadcn/ui components)
✅ Focus management
✅ Color contrast (WCAG AA compliant)

### Future Improvements
- Screen reader testing
- ARIA live regions for notifications
- Skip navigation links
- High contrast mode
- Reduced motion support

---

## Security Considerations

### Current Implementation
✅ No hardcoded credentials
✅ Environment variables for sensitive data
✅ XSS protection (React escaping)
✅ CSRF protection (Next.js)

### Future Implementation
- Rate limiting
- Input sanitization
- SQL injection prevention (Prisma/ORM)
- File upload validation
- Secure session management
- Role-based permissions enforcement

---

## Deployment

### Current Setup
- Vercel-ready configuration
- Next.js build optimization
- Environment variable management
- Static asset optimization

### Production Checklist
- [ ] Environment variables configured
- [ ] Analytics setup
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring
- [ ] CDN configuration
- [ ] SSL certificates
- [ ] Domain configuration
- [ ] Backup strategy

---

## Contributing Guidelines

### Code Style
- Follow TypeScript strict mode
- Use functional components + hooks
- Prefer named exports over default exports
- Use explicit typing (avoid `any`)
- Follow Prettier configuration
- Use ESLint rules

### Component Guidelines
- Keep components focused (single responsibility)
- Extract reusable logic to custom hooks
- Break down large components (>350 lines)
- Use proper TypeScript interfaces
- Add JSDoc comments for complex logic

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Types: `types.ts` or `index.ts` (for barrel exports)
- Pages: `kebab-case.tsx` (Next.js convention)

### Git Workflow
- Feature branches from `main`
- Descriptive commit messages
- Pull request for all changes
- Code review required
- Squash merge preferred

---

## Glossary

**Engagement**: A service relationship between a provider and a client. The main workflow object in Vetto.

**Engagement Task**: A specific deliverable or milestone within an engagement.

**Partner Assignment**: Work within an engagement that has been outsourced to a partner (subcontractor).

**Provider**: Primary Corporate Service Provider. Pays subscription, manages clients and engagements.

**Partner**: Subcontractor CSP. Invited by providers to fulfill specific engagement tasks.

**Client**: End business receiving services from a provider.

**Admin**: Vetto platform operator. Manages all users, configurations, and compliance.

**Partner Due Diligence Pack**: Compliance documentation submitted by partners to prove their credentials and legitimacy.

**White-Label Portal**: Customized client-facing portal with provider's branding, domain, and email configuration.

**Activity Timeline**: Chronological log of events and actions within an engagement (replaces messaging).

**Notification**: Real-time alert about important events (replaces chat messages).

**KYB**: Know Your Business - verification of business entities.

**KYC**: Know Your Customer - verification of individual identities.

---

## Support & Documentation

### Internal Documentation
- This file: `README-ARCHITECTURE.md`
- Component storybook (future)
- API documentation (future)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## Changelog

### v1.0.0 - UI Refactor (Current)
- ✅ Centralized types layer (`/src/types/index.ts`)
- ✅ Centralized mock data layer (`/src/lib/mocks/`)
- ✅ Removed messaging system
- ✅ Implemented white-label admin ownership
- ✅ Renamed `QuotesView` → `EngagementsView`
- ✅ Fixed component naming conventions
- ✅ Wired ThemeProvider in `_app.tsx`
- ✅ Refactored large components into focused sub-components
- ✅ Updated all terminology (engagements, not projects/work orders)
- ✅ Documented architecture and business rules

### Future Releases
- v1.1.0: Authentication system
- v1.2.0: Backend API integration
- v2.0.0: Real-time features
- v3.0.0: Mobile responsive optimization

---

**Last Updated**: 2026-02-22

**Maintained By**: Vetto Development Team