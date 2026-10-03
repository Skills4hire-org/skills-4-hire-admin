# Skills-4-Hire Admin Dashboard

A modern, high-performance administrative portal for the **Skills-4-Hire** service marketplace platform. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and React Router v7.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Environment Configuration](#environment-configuration)
- [Authentication & API Architecture](#authentication--api-architecture)
  - [Sign-In API & HTTP Method](#sign-in-api--http-method)
  - [Token Management](#token-management)
  - [Route Protection (`ProtectedRoute` & `PublicRoute`)](#route-protection-protectedroute--publicroute)
  - [Session Termination / Sign Out](#session-termination--sign-out)
- [Router File Structure (`src/App.tsx`)](#router-file-structure-srcapptsx)
  - [Route Hierarchy](#route-hierarchy)
  - [Admin Child Pages](#admin-child-pages)
- [API Proxy & CORS Handling](#api-proxy--cors-handling)
- [Frequently Asked Questions & Troubleshooting](#frequently-asked-questions--troubleshooting)
  - [Why did changing the `navigate` value in `App.tsx` show a blank screen?](#why-did-changing-the-navigate-value-in-apptsx-show-a-blank-screen)
  - [How do I test the admin dashboard without logging in each time?](#how-do-i-test-the-admin-dashboard-without-logging-in-each-time)

---

## Overview

The Skills-4-Hire Admin Dashboard enables administrators to oversee platform operations, manage service providers and customers, review service listings and job requests, track bookings and transactions, monitor disputes, and analyze platform performance.

---

## Key Features

- **Dashboard & Analytics**: Real-time platform KPI metrics, booking distribution pie charts, monthly performance trend lines, and top service rankings.
- **User Management**: View, filter, and inspect service providers and customers, including KYC verification documents.
- **Services & Jobs Catalog**: Monitor published service offerings and customer job postings with moderation capabilities.
- **Transactions & Financial Oversight**: Track platform revenues, escrow accounts, booking payouts, and refund processing.
- **Support & Dispute Resolution**: Manage customer inquiries and escalation tickets with built-in chat messaging.
- **Content Moderation**: Review user content, reviews, and flagged platform activity.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Component Architecture |
| **TypeScript (v5/6)** | Type Safety & Developer Experience |
| **Vite** | Lightning-fast Build Tool & HMR |
| **Tailwind CSS v4** | Modern Utility-First Responsive Styling |
| **React Router DOM (v7)** | Declarative Client-Side Routing & Layout Outlets |
| **Axios** | HTTP Client with Request/Response Interceptors |
| **Redux Toolkit** | Global Application State Management |
| **TanStack React Query** | Asynchronous Server State & Data Caching |
| **Recharts** | Visual Charts & Metric Graphs |
| **Lucide React** | Consistent Iconography |
| **Sonner** | Clean Toast Notifications |
| **Zod** | Schema Validation for Forms |

---

## Project Architecture

```
Skills-4-Hire/
├── public/                 # Static public assets
├── src/
│   ├── api/                # API client functions (admin, auth, etc.)
│   ├── assets/             # Images, SVGs, and branding assets
│   ├── components/
│   │   ├── form/           # Form components (SignInForm, etc.)
│   │   ├── form-fields/    # Reusable input fields
│   │   ├── global/         # Global shared components (Logo, etc.)
│   │   ├── layouts/        # Layout wrappers (AdminLayout.tsx)
│   │   ├── routes/         # Route guards (ProtectedRoute.tsx, PublicRoute.tsx)
│   │   └── ui/             # Radix UI and reusable design primitives
│   ├── features/           # Redux slices (user, booking, registration)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Shared utilities (e.g., cn helper)
│   ├── pages/
│   │   ├── admin/          # Admin subpages (Overview, Users, Jobs, Finance, etc.)
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPasswordConfirm.tsx
│   │   └── Signin.tsx      # Admin authentication portal
│   ├── types/              # TypeScript interface and type declarations
│   ├── utils/              # Helper utilities (auth, axiosConfig, formatters)
│   ├── App.tsx             # Root router configuration
│   ├── main.tsx            # React application entrypoint
│   └── store.ts            # Redux store definition
├── vercel.json             # Vercel deployment & API rewrite configuration
├── vite.config.ts          # Vite build, aliases, and dev server proxy settings
└── package.json            # Project dependencies and npm scripts
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Skills4hire-org/skills-4-hire-admin.git
   cd skills-4-hire-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start Vite in local development mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Compile TypeScript and build the optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Environment Configuration

Configure environment variables in a `.env` file at the root of the project:

```env
# Optional: Set custom base URL for the backend API.
# In local development, leaving this empty routes requests to the Vite proxy (/api).
VITE_API_BASE_URL=
```

---

## Authentication & API Architecture

### Sign-In API & HTTP Method

- **HTTP Method**: **`POST`**
- **Endpoint**: `/api/admin/login/` (configured in `src/api/auth.ts`)
- **Payload Schema**:
  ```json
  {
    "email": "admin@theskills4hire.com",
    "password": "your-secure-password"
  }
  ```
- **Response**:
  ```json
  {
    "access": "eyJhbGciOi...",
    "refresh": "eyJhbGciOi..."
  }
  ```

> **Why `POST`?**
> Authentication credentials must never be exposed via URL query parameters (as in `GET`). The `POST` method securely encapsulates credentials inside the HTTP request body and complies with standard REST API specifications.

### Token Management

Token handling is centralized in `src/utils/auth.ts`:
- **Storage**: Upon successful login, the JWT access token is stored in `localStorage` under the key `'admin_token'`.
- **Validation**: On each route transition and API request, the token is verified for expiration using `isTokenExpired()` (`jwt-decode`).
- **Automatic Injection**: `src/utils/axiosConfig.ts` injects the active token into the `Authorization: Bearer <token>` header for all outgoing API requests.
- **Refresh Flow**: If an API returns a `401 Unauthorized`, the Axios interceptor attempts to refresh the access token using the stored refresh token.

### Route Protection (`ProtectedRoute` & `PublicRoute`)

1. **`ProtectedRoute` (`src/components/routes/ProtectedRoute.tsx`)**:
   - Guards all `/admin` routes.
   - Verifies that a valid, non-expired token exists via `isAuthenticated()`.
   - If no valid token exists, it safely redirects the user to `/sign-in` while preserving the intended destination in `location.state.from`.
   
2. **`PublicRoute` (`src/components/routes/PublicRoute.tsx`)**:
   - Wraps public authentication pages (`/sign-in`, `/forgot-password`, `/password/reset-confirm`).
   - If an authenticated administrator visits `/sign-in`, they are automatically redirected to `/admin` to avoid duplicate logins.

### Session Termination / Sign Out

Administrators can sign out at any time via:
- The **Sign Out** button at the bottom of the sidebar.
- The **Sign Out** option in the header profile dropdown.

When triggered, `clearAuthTokens()` removes all stored tokens from `localStorage` and `sessionStorage`, resets the Redux state, and routes back to `/sign-in`.

---

## Router File Structure (`src/App.tsx`)

The application routing is configured declaratively using React Router v7's `createBrowserRouter`:

```tsx
const router = createBrowserRouter([
  // 1. Root redirect: visiting '/' automatically sends user to '/admin'
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },

  // 2. Public auth routes (Guarded by PublicRoute)
  {
    element: <PublicRoute />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'password/reset-confirm', element: <ResetPasswordConfirm /> },
    ],
  },

  // 3. Protected Admin routes (Guarded by ProtectedRoute)
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Overview /> },
          { path: 'user-management', element: <UserManagement /> },
          { path: 'services', element: <AdminServices /> },
          { path: 'jobs', element: <Jobs /> },
          { path: 'support', element: <SupportDisputes /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'financial', element: <Finance /> },
          { path: 'content-moderation', element: <ContentModeration /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'providers/:id', element: <ProviderDetails /> },
        ],
      },
    ],
  },

  // 4. Wildcard fallback: any unmatched path redirects to '/admin'
  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
])
```

### Route Hierarchy

```
/ (Root) ──► Redirects to /admin
│
├── Public Routes (wrapped by PublicRoute)
│   ├── /sign-in
│   ├── /forgot-password
│   └── /password/reset-confirm
│
├── Protected Routes (wrapped by ProtectedRoute)
│   └── /admin (AdminLayout)
│       ├── /admin (Overview / Dashboard)
│       ├── /admin/user-management
│       ├── /admin/services
│       ├── /admin/jobs
│       ├── /admin/support
│       ├── /admin/transactions
│       ├── /admin/financial
│       ├── /admin/content-moderation
│       ├── /admin/analytics
│       └── /admin/providers/:id
│
└── * (Wildcard) ──► Redirects to /admin
```

---

## API Proxy & CORS Handling

To prevent Cross-Origin Resource Sharing (CORS) errors and method restrictions (such as 405 Method Not Allowed) during local development and on production hosting:

1. **Development Proxy (`vite.config.ts`)**:
   ```ts
   server: {
     proxy: {
       '/api': {
         target: 'https://api.theskills4hire.com',
         changeOrigin: true,
         secure: false,
       },
     },
   }
   ```
2. **Production Rewrites (`vercel.json`)**:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://api.theskills4hire.com/api/$1"
       }
     ]
   }
   ```

---

## Frequently Asked Questions & Troubleshooting

### Why did changing the `navigate` value in `App.tsx` show a blank screen?

**Problem**:
If you changed the unauthorized redirect target inside the route guard from:
```tsx
if (!token) return <Navigate to="/sign-in" replace />
```
to:
```tsx
if (!token) return <Navigate to="/admin" replace /> // ❌ CAUSES INFINITE LOOP
```

**What happened**:
1. When navigating to `/admin` without an authentication token, the route guard detects `!token`.
2. It executes `<Navigate to="/admin" replace />`.
3. The browser attempts to load `/admin` again.
4. The route guard detects `!token` once more and repeats the redirect.
5. This creates an **infinite recursive navigation loop**. React detects maximum update depth or the browser halts execution, leaving the screen completely blank ("not seeing anything").

**Solution**:
- Always leave the unauthenticated redirect destination pointing to `/sign-in`.
- To view the admin pages, log in through `/sign-in` or provide a valid token in `localStorage`.

### How do I test the admin dashboard without logging in each time?

If you are developing locally and want to test the admin layout directly in your browser:
1. Open the Developer Tools console (`F12` or `Ctrl+Shift+I`).
2. Run the following command to set a valid mock admin token:
   ```javascript
   localStorage.setItem('admin_token', 'mock_token_for_preview');
   ```
3. Refresh the page or navigate to `/admin`.
4. When finished testing, click **Sign Out** or run:
   ```javascript
   localStorage.removeItem('admin_token');
   ```

---

## Changelog — Recent Updates

### `2026-10-03` — Admin Login Improvements

#### 1. Admin Credentials Pre-filled on Sign-In Form
**File**: `src/components/form/SignInForm.tsx`

The sign-in form now automatically pre-populates the **email** and **password** fields with the designated admin credentials, so the administrator only needs to click **Sign in**.

- Two constants `ADMIN_EMAIL` and `ADMIN_PASSWORD` are defined at the top of the file.
- The form state defaults to these values on mount.
- Authentication still goes through the real backend API — no bypass.

```ts
const ADMIN_EMAIL = 'ogennaisrael98@gmail.com'
const ADMIN_PASSWORD = '0987poiu'
```

> **Note:** For stricter environments, move to `.env` as `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` and reference via `import.meta.env`.

---

#### 2. Fixed Response Double-Unwrapping Bug
**File**: `src/components/form/SignInForm.tsx`

`adminLogin()` already returns `response.data` internally. The form was then doing `response?.data ?? response`, looking for `.data.data.access` — a path that never exists — causing a *"Admin login did not return an access token"* error even on a successful login.

```ts
// Before (broken) ❌
const response = await adminLogin(validatedData)
const authData = response?.data ?? response   // double-unwrap

// After (fixed) ✅
const authData = await adminLogin(validatedData)
```

---

#### 3. Improved API Error Surfacing
**File**: `src/api/error.ts`

The error handler now reads the **actual server error detail** from the response body and shows it in the toast notification, instead of falling back to a generic string.

Handles all Django REST Framework error shapes:

| Shape | Example |
|---|---|
| `{ detail: "..." }` | `No active account found with the given credentials` |
| `{ message: "..." }` | Custom API messages |
| `{ email: ["..."] }` | Field-level validation errors |
| Plain string body | Fallback string responses |

The full raw response is also logged to the browser console under `[API Error Response]` for developer inspection.

---

#### Sign-In API Reference

| Property | Value |
|---|---|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/admin/login/` |
| **Base URL** | `https://api.theskills4hire.com` |
| **Request Body** | `{ "email": "...", "password": "..." }` |
| **Success Response** | `{ "access": "<JWT>", "refresh": "<JWT>" }` |
| **Token Storage** | `localStorage` → key `admin_token` |

> **Why `POST`?** Credentials must never travel via URL query parameters (as in `GET`). `POST` places them securely in the request body, which is the industry-standard approach for authentication endpoints.
