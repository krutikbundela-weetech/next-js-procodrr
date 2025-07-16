# Next.js 15 Reserved File Naming Conventions Guide

## Table of Contents
1. [Introduction](#introduction)
2. [File Extensions](#file-extensions)
3. [Core Reserved Files](#core-reserved-files)
4. [Special UI Files](#special-ui-files)
5. [Route Handler Files](#route-handler-files)
6. [Metadata Files](#metadata-files)
7. [Configuration Files](#configuration-files)
8. [Template Files](#template-files)
9. [Parallel Route Files](#parallel-route-files)
10. [Intercepting Route Files](#intercepting-route-files)
11. [Private Folders](#private-folders)
12. [Best Practices](#best-practices)
13. [File Priority Order](#file-priority-order)

## Introduction

Next.js 15 App Router uses a convention-based file system where specific file names have special meanings. Understanding these reserved file names is crucial for building applications effectively. This guide covers all reserved file naming conventions and their purposes.

## File Extensions

Next.js supports multiple file extensions for reserved files:

- `.js` - JavaScript files
- `.jsx` - JavaScript files with JSX
- `.ts` - TypeScript files
- `.tsx` - TypeScript files with JSX

All examples in this guide use `.tsx` but can be adapted to any supported extension.

## Core Reserved Files

### page.tsx
**Purpose**: Defines a route segment and makes it publicly accessible.

**Required**: Yes (for routes)

**Location**: Any folder in the app directory

```typescript
// app/page.tsx - Root route (/)
export default function HomePage() {
  return <h1>Welcome to the homepage</h1>
}

// app/about/page.tsx - About route (/about)
export default function AboutPage() {
  return <h1>About us</h1>
}

// app/blog/[slug]/page.tsx - Dynamic route (/blog/[slug])
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog post: {params.slug}</h1>
}
```

**Key Points**:
- Only folders with `page.tsx` become accessible routes
- Must be a default export
- Can receive `params` and `searchParams` as props

### layout.tsx
**Purpose**: Creates shared UI that wraps pages and nested layouts.

**Required**: Yes (root layout only)

**Location**: Any folder in the app directory

```typescript
// app/layout.tsx - Root layout (required)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>Global Header</header>
        <main>{children}</main>
        <footer>Global Footer</footer>
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx - Dashboard layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <nav>Dashboard Navigation</nav>
      <div>{children}</div>
    </div>
  )
}
```

**Key Points**:
- Root layout must include `<html>` and `<body>` tags
- Layouts persist across route changes
- Can be nested infinitely

### route.tsx
**Purpose**: Creates API route handlers for HTTP methods.

**Required**: No

**Location**: Any folder in the app directory

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ message: 'User created' })
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: 'User updated' })
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: 'User deleted' })
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({ message: 'User patched' })
}

export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 })
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
    },
  })
}
```

**Key Points**:
- Supports all HTTP methods
- Cannot coexist with `page.tsx` in the same folder
- Must export named functions for HTTP methods

## Special UI Files

### loading.tsx
**Purpose**: Creates loading UI that shows while a page is loading.

**Required**: No

**Location**: Any folder in the app directory

```typescript
// app/loading.tsx - Global loading
export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

// app/dashboard/loading.tsx - Dashboard loading
export default function DashboardLoading() {
  return (
    <div className="dashboard-loading">
      <h2>Loading Dashboard...</h2>
      <div className="progress-bar"></div>
    </div>
  )
}

// app/blog/[slug]/loading.tsx - Blog post loading
export default function BlogPostLoading() {
  return (
    <div className="blog-post-loading">
      <div className="skeleton-title"></div>
      <div className="skeleton-content"></div>
    </div>
  )
}
```

**Key Points**:
- Automatically wraps the page in a Suspense boundary
- Shows immediately while the page is loading
- Can be nested for granular loading states

### error.tsx
**Purpose**: Creates error UI for when an error occurs in a route segment.

**Required**: No

**Location**: Any folder in the app directory

```typescript
// app/error.tsx - Global error boundary
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// app/dashboard/error.tsx - Dashboard error boundary
'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="dashboard-error">
      <h2>Dashboard Error</h2>
      <p>Failed to load dashboard: {error.message}</p>
      <button onClick={reset}>Reload Dashboard</button>
    </div>
  )
}
```

**Key Points**:
- Must be a Client Component (`'use client'`)
- Receives `error` and `reset` props
- Automatically wraps the segment in an error boundary

### global-error.tsx
**Purpose**: Creates a global error boundary for the entire application.

**Required**: No

**Location**: Only in the root `app` directory

```typescript
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="global-error">
          <h2>Something went wrong!</h2>
          <p>A critical error occurred: {error.message}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  )
}
```

**Key Points**:
- Must include `<html>` and `<body>` tags
- Only works in the root app directory
- Fallback for when root layout fails

### not-found.tsx
**Purpose**: Creates UI for 404 Not Found errors.

**Required**: No

**Location**: Any folder in the app directory

```typescript
// app/not-found.tsx - Global 404 page
export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <a href="/">Return Home</a>
    </div>
  )
}

// app/blog/not-found.tsx - Blog section 404
export default function BlogNotFound() {
  return (
    <div className="blog-not-found">
      <h2>Blog Post Not Found</h2>
      <p>The blog post you're looking for doesn't exist.</p>
      <a href="/blog">View all posts</a>
    </div>
  )
}
```

**Key Points**:
- Triggered by `notFound()` function or unmatched routes
- Can be customized per route segment
- Inherits the layout of its segment

## Route Handler Files

### Dynamic Route Handlers

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ user: { id: params.id } })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  return NextResponse.json({ user: { id: params.id, ...body } })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `User ${params.id} deleted` })
}
```

### Catch-all Route Handlers

```typescript
// app/api/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return NextResponse.json({ 
    message: `Catch-all route: ${params.slug.join('/')}` 
  })
}
```

## Metadata Files

### favicon.ico
**Purpose**: Defines the favicon for the application.

**Location**: `app/favicon.ico`

```
app/
├── favicon.ico          # Favicon
├── icon.png             # App icon
├── apple-icon.png       # Apple touch icon
└── page.tsx
```

### icon.png / icon.ico
**Purpose**: Defines app icons for various platforms.

**Supported names**:
- `icon.ico`
- `icon.png`
- `icon.jpg`
- `icon.jpeg`
- `icon.gif`
- `icon.bmp`
- `icon.svg`

```
app/
├── icon.png             # Default icon
├── icon-32x32.png       # 32x32 icon
├── icon-192x192.png     # 192x192 icon
└── page.tsx
```

### apple-icon.png
**Purpose**: Apple touch icons for iOS devices.

**Supported names**:
- `apple-icon.png`
- `apple-icon.jpg`
- `apple-icon.jpeg`

```
app/
├── apple-icon.png       # Default Apple icon
├── apple-icon-180x180.png # 180x180 Apple icon
└── page.tsx
```

### manifest.json
**Purpose**: Web app manifest for PWA functionality.

**Location**: `app/manifest.json` or `app/manifest.ts`

```json
// app/manifest.json
{
  "name": "My Next.js App",
  "short_name": "NextApp",
  "description": "A Next.js application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

```typescript
// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My Next.js App',
    short_name: 'NextApp',
    description: 'A Next.js application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
```

### robots.txt
**Purpose**: Defines robots.txt for search engine crawlers.

**Location**: `app/robots.txt` or `app/robots.ts`

```
# app/robots.txt
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
```

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

### sitemap.xml
**Purpose**: Generates XML sitemap for search engines.

**Location**: `app/sitemap.xml` or `app/sitemap.ts`

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```

### opengraph-image.png
**Purpose**: Open Graph images for social media sharing.

**Supported names**:
- `opengraph-image.png`
- `opengraph-image.jpg`
- `opengraph-image.jpeg`
- `opengraph-image.gif`

```
app/
├── opengraph-image.png    # Default OG image
├── blog/
│   └── opengraph-image.png # Blog OG image
└── page.tsx
```

### twitter-image.png
**Purpose**: Twitter card images for Twitter sharing.

**Supported names**:
- `twitter-image.png`
- `twitter-image.jpg`
- `twitter-image.jpeg`
- `twitter-image.gif`

```
app/
├── twitter-image.png      # Default Twitter image
├── blog/
│   └── twitter-image.png  # Blog Twitter image
└── page.tsx
```

## Configuration Files

### middleware.ts
**Purpose**: Middleware that runs before requests are completed.

**Location**: Root of the project (same level as `app` directory)

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Authentication check
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
```

### instrumentation.ts
**Purpose**: Application instrumentation and monitoring setup.

**Location**: Root of the project or `src` directory

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize server-side monitoring
    await import('./server-monitoring')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Initialize edge runtime monitoring
    await import('./edge-monitoring')
  }
}
```

## Template Files

### template.tsx
**Purpose**: Similar to layout but creates a new instance for each route.

**Required**: No

**Location**: Any folder in the app directory

```typescript
// app/template.tsx
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="template">
      {/* This div is re-created on each route change */}
      <div className="animation-container">
        {children}
      </div>
    </div>
  )
}

// app/dashboard/template.tsx
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-template">
      <div className="fade-in">
        {children}
      </div>
    </div>
  )
}
```

**Key Points**:
- Unlike layouts, templates create new instances on navigation
- Useful for animations and resetting state
- Can be combined with layouts

## Parallel Route Files

### @folder Convention
**Purpose**: Creates parallel routes that can be rendered simultaneously.

**Location**: Folders starting with `@` symbol

```
app/
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @analytics/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── @team/
│   │   ├── page.tsx
│   │   └── error.tsx
│   └── @notifications/
│       └── page.tsx
```

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
  notifications: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <div className="main-content">{children}</div>
      <div className="sidebar">
        <div className="analytics-panel">{analytics}</div>
        <div className="team-panel">{team}</div>
        <div className="notifications-panel">{notifications}</div>
      </div>
    </div>
  )
}
```

### default.tsx
**Purpose**: Fallback for parallel routes when a specific route doesn't exist.

**Location**: Inside parallel route folders

```typescript
// app/dashboard/@analytics/default.tsx
export default function DefaultAnalytics() {
  return (
    <div className="default-analytics">
      <p>Default analytics view</p>
    </div>
  )
}

// app/dashboard/@team/default.tsx
export default function DefaultTeam() {
  return (
    <div className="default-team">
      <p>Default team view</p>
    </div>
  )
}
```

**Key Points**:
- Provides fallback content for parallel routes
- Prevents 404 errors when parallel routes don't match
- Optional but recommended for parallel routes

## Intercepting Route Files

### Intercepting Conventions
**Purpose**: Intercept routes to show different content while preserving URL.

**Conventions**:
- `(.)folder` - Same level
- `(..)folder` - One level up
- `(..)(..)folder` - Two levels up
- `(...)folder` - From root

```
app/
├── feed/
│   └── page.tsx
├── photo/
│   └── [id]/
│       └── page.tsx
└── @modal/
    └── (.)photo/
        └── [id]/
            └── page.tsx
```

```typescript
// app/@modal/(.)photo/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Photo {params.id} (Modal)</h2>
        {/* Modal implementation */}
      </div>
    </div>
  )
}
```

**Key Points**:
- Useful for modals, drawers, and overlays
- Maintains URL while showing different UI
- Works with parallel routes

## Private Folders

### _folder Convention
**Purpose**: Create private folders that are ignored by the router.

**Location**: Any folder starting with `_`

```
app/
├── _components/
│   ├── Header.tsx
│   └── Footer.tsx
├── _utils/
│   └── helpers.ts
├── _lib/
│   └── database.ts
├── page.tsx
└── about/
    └── page.tsx
```

```typescript
// app/_components/Header.tsx
export default function Header() {
  return (
    <header>
      <nav>Navigation</nav>
    </header>
  )
}
```

**Key Points**:
- Folders starting with `_` are not included in routing
- Useful for organizing components, utilities, and libraries
- Can be nested infinitely

## Best Practices

### File Organization
```
app/
├── _components/           # Private components
│   ├── ui/
│   └── forms/
├── _lib/                 # Private utilities
│   ├── auth.ts
│   └── database.ts
├── _types/               # Private type definitions
│   └── index.ts
├── (auth)/               # Route group
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/          # Route group
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── @analytics/
│   │       └── page.tsx
│   └── profile/
│       └── page.tsx
├── api/                  # API routes
│   ├── auth/
│   │   └── route.ts
│   └── users/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
├── globals.css
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
└── template.tsx
```

### Naming Conventions
- Use kebab-case for folder names: `user-profile`, `blog-posts`
- Use PascalCase for component file names: `UserProfile.tsx`
- Use camelCase for utility file names: `userHelpers.ts`
- Use lowercase for route folders: `blog`, `users`, `about`

### File Structure Tips
- Group related routes using route groups `(name)`
- Use private folders `_name` for non-route code
- Keep layouts close to their relevant routes
- Use consistent error and loading patterns

## File Priority Order

When multiple files exist, Next.js follows this priority order:

1. **layout.tsx** - Always processed first
2. **template.tsx** - Wraps the page if exists
3. **error.tsx** - Error boundary for the segment
4. **loading.tsx** - Loading UI for the segment
5. **not-found.tsx** - 404 UI for the segment
6. **page.tsx** - The actual page component
7. **route.tsx** - API route handler

### Coexistence Rules
- `page.tsx` and `route.tsx` cannot exist in the same folder
- `layout.tsx` and `template.tsx` can coexist
- Error boundaries work from the nearest `error.tsx`
- Loading states work from the nearest `loading.tsx`

## Summary

Next.js 15 reserved file names provide a powerful convention-based system for building applications:

**Core Files**: `page.tsx`, `layout.tsx`, `route.tsx` for basic functionality
**UI States**: `loading.tsx`, `error.tsx`, `not-found.tsx` for user experience
**Metadata**: `favicon.ico`, `robots.txt`, `sitemap.xml` for SEO and PWA
**Configuration**: `middleware.ts`, `instrumentation.ts` for app behavior
**Advanced**: `template.tsx`, `@folder`, `(.)folder` for complex UI patterns
**Organization**: `_folder`, `(folder)` for code organization

Understanding these conventions is essential for effective Next.js development and helps create maintainable, scalable applications.