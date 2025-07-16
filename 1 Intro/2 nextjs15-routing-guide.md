# Next.js 15 App Router Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [File System Based Routing](#file-system-based-routing)
3. [Basic Routing](#basic-routing)
4. [Pages and Layouts](#pages-and-layouts)
5. [Dynamic Routing](#dynamic-routing)
6. [Route Groups](#route-groups)
7. [Nested Routes](#nested-routes)
8. [Loading UI](#loading-ui)
9. [Error Handling](#error-handling)
10. [Not Found Pages](#not-found-pages)
11. [Parallel Routes](#parallel-routes)
12. [Intercepting Routes](#intercepting-routes)
13. [Route Handlers (API Routes)](#route-handlers-api-routes)
14. [Middleware](#middleware)
15. [Navigation](#navigation)
16. [Advanced Routing Patterns](#advanced-routing-patterns)

## Introduction

Next.js 15 uses the App Router, which is built on React Server Components and supports shared layouts, nested routing, loading states, error handling, and more. The App Router works in a new directory called `app` and coexists with the `pages` directory.

## File System Based Routing

Next.js uses a file-system based router where folders define routes. The structure in your `app` directory directly maps to URL paths.

### Basic Structure
```
app/
├── page.tsx          # / route
├── about/
│   └── page.tsx      # /about route
├── blog/
│   ├── page.tsx      # /blog route
│   └── [slug]/
│       └── page.tsx  # /blog/[slug] dynamic route
└── layout.tsx        # Root layout
```

## Basic Routing

### Creating Your First Route

To create a route, add a `page.tsx` file inside a folder:

```typescript
// app/page.tsx (Homepage - /)
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 15!</h1>
      <p>This is the homepage</p>
    </div>
  )
}
```

```typescript
// app/about/page.tsx (/about)
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company</p>
    </div>
  )
}
```

### Special File Names

Next.js uses special file names for different purposes:

- `page.tsx` - Creates a route segment
- `layout.tsx` - Creates shared UI for a segment and its children
- `loading.tsx` - Creates loading UI
- `error.tsx` - Creates error UI
- `not-found.tsx` - Creates not found UI
- `route.tsx` - Creates API endpoints

## Pages and Layouts

### Root Layout

Every app must have a root layout. This is the top-level layout that applies to all routes:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>
        <main>{children}</main>
        <footer>© 2024 My App</footer>
      </body>
    </html>
  )
}
```

### Nested Layouts

You can create nested layouts for specific route segments:

```typescript
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>
        <h2>Blog Categories</h2>
        <ul>
          <li><a href="/blog/tech">Technology</a></li>
          <li><a href="/blog/design">Design</a></li>
        </ul>
      </aside>
      <div>{children}</div>
    </div>
  )
}
```

## Dynamic Routing

### Single Dynamic Segment

Create dynamic routes using square brackets:

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
      <p>This is the blog post for {params.slug}</p>
    </div>
  )
}
```

### Multiple Dynamic Segments

```typescript
// app/blog/[category]/[slug]/page.tsx
export default function CategoryPost({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Post: {params.slug}</h2>
    </div>
  )
}
```

### Catch-All Routes

Use `[...segments]` to catch all subsequent segments:

```typescript
// app/docs/[...slug]/page.tsx
export default function DocsPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  return (
    <div>
      <h1>Documentation</h1>
      <p>Segments: {params.slug.join(' / ')}</p>
    </div>
  )
}
```

### Optional Catch-All Routes

Use `[[...segments]]` to make catch-all routes optional:

```typescript
// app/shop/[[...slug]]/page.tsx
export default function ShopPage({ 
  params 
}: { 
  params: { slug?: string[] } 
}) {
  const segments = params.slug || []
  
  return (
    <div>
      <h1>Shop</h1>
      {segments.length > 0 && (
        <p>Current path: {segments.join(' / ')}</p>
      )}
    </div>
  )
}
```

## Route Groups

Route groups allow you to organize routes without affecting the URL structure. Create a route group by wrapping a folder name in parentheses:

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx     # /about
│   └── contact/
│       └── page.tsx     # /contact
├── (shop)/
│   ├── products/
│   │   └── page.tsx     # /products
│   └── cart/
│       └── page.tsx     # /cart
└── page.tsx             # /
```

### Route Group Layouts

Each route group can have its own layout:

```typescript
// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>Marketing Header</header>
      {children}
    </div>
  )
}
```

```typescript
// app/(shop)/layout.tsx
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>Shop Header</header>
      {children}
    </div>
  )
}
```

## Nested Routes

Nested routes are created by nesting folders. Each folder can have its own layout:

```
app/
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx         # /dashboard
│   ├── settings/
│   │   ├── layout.tsx
│   │   ├── page.tsx     # /dashboard/settings
│   │   ├── profile/
│   │   │   └── page.tsx # /dashboard/settings/profile
│   │   └── billing/
│   │       └── page.tsx # /dashboard/settings/billing
│   └── analytics/
│       └── page.tsx     # /dashboard/analytics
```

## Loading UI

Create instant loading states with `loading.tsx`:

```typescript
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div>
      <h2>Loading blog posts...</h2>
      <div className="spinner">Loading...</div>
    </div>
  )
}
```

### Nested Loading States

```typescript
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <div>Loading dashboard...</div>
}

// app/dashboard/analytics/loading.tsx
export default function AnalyticsLoading() {
  return <div>Loading analytics...</div>
}
```

## Error Handling

Handle errors with `error.tsx` files:

```typescript
// app/blog/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Global Error Handling

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
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  )
}
```

## Not Found Pages

Create custom 404 pages with `not-found.tsx`:

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
```

### Programmatic Not Found

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <div>{/* render post */}</div>
}
```

## Parallel Routes

Parallel routes allow you to render multiple pages simultaneously in the same layout:

```
app/
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @analytics/
│   │   └── page.tsx
│   └── @team/
│       └── page.tsx
```

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div>{analytics}</div>
      <div>{team}</div>
    </div>
  )
}
```

### Conditional Parallel Routes

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  const showAnalytics = true // Some condition
  
  return (
    <div>
      <div>{children}</div>
      {showAnalytics && <div>{analytics}</div>}
      <div>{team}</div>
    </div>
  )
}
```

## Intercepting Routes

Intercept routes to show a route in another context while keeping the URL:

```
app/
├── feed/
│   └── page.tsx
├── photo/
│   └── [id]/
│       └── page.tsx
└── @modal/
    └── (..)photo/
        └── [id]/
            └── page.tsx
```

### Intercepting Route Conventions

- `(..)` - matches segments one level above
- `(...)` - matches segments from the root app directory
- `(.)` - matches segments on the same level

```typescript
// app/@modal/(..)photo/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="modal">
      <h2>Photo {params.id}</h2>
      {/* Modal content */}
    </div>
  )
}
```

## Route Handlers (API Routes)

Create API endpoints using `route.tsx` files:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]
  
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process the data
  
  return NextResponse.json({ message: 'User created' }, { status: 201 })
}
```

### Dynamic Route Handlers

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getUserById(params.id)
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  
  return NextResponse.json(user)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const updatedUser = updateUser(params.id, body)
  
  return NextResponse.json(updatedUser)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  deleteUser(params.id)
  
  return NextResponse.json({ message: 'User deleted' }, { status: 200 })
}
```

## Middleware

Middleware runs before a request is completed and can modify the response:

```typescript
// middleware.ts (in the root directory)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('auth-token')
  
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'custom-value')
  
  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ]
}
```

### Advanced Middleware Examples

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Geo-based routing
  const country = request.geo?.country || 'US'
  
  if (country !== 'US' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/global', request.url))
  }
  
  // A/B testing
  const bucket = Math.random() < 0.5 ? 'a' : 'b'
  const response = NextResponse.next()
  response.cookies.set('bucket', bucket)
  
  // Rate limiting
  const ip = request.ip || 'unknown'
  // Implement rate limiting logic
  
  return response
}
```

## Navigation

### Link Component

```typescript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/dashboard" prefetch={false}>
        Dashboard
      </Link>
    </nav>
  )
}
```

### Programmatic Navigation

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/dashboard')
    // router.replace('/dashboard') // Replace current entry
    // router.back() // Go back
    // router.forward() // Go forward
    // router.refresh() // Refresh the page
  }
  
  return <button onClick={handleClick}>Go to Dashboard</button>
}
```

### usePathname and useSearchParams

```typescript
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function MyComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const search = searchParams.get('search')
  const page = searchParams.get('page')
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Search: {search}</p>
      <p>Page: {page}</p>
    </div>
  )
}
```

## Advanced Routing Patterns

### Route Handlers with Streaming

```typescript
// app/api/stream/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        const chunk = encoder.encode(`data: ${JSON.stringify({ count: i })}\n\n`)
        controller.enqueue(chunk)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      controller.close()
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    }
  })
}
```

### Server Actions

```typescript
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Process the data
  
  return { success: true, message: 'User created' }
}
```

```typescript
// app/form/page.tsx
import { createUser } from '../actions'

export default function FormPage() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>
  )
}
```

### Route Segments Config

```typescript
// app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic' // 'auto' | 'force-dynamic' | 'force-static'
export const dynamicParams = true // true | false
export const revalidate = 60 // false | 'force-cache' | 0 | number
export const fetchCache = 'auto' // 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'
export const runtime = 'nodejs' // 'nodejs' | 'edge'
export const preferredRegion = 'auto' // 'auto' | 'global' | 'home' | ['iad1', 'sfo1']

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Blog post: {params.slug}</div>
}
```

### Metadata API

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Blog post content</div>
}
```

### generateStaticParams

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Blog post: {params.slug}</div>
}
```

## Summary

Next.js 15 App Router provides a powerful and flexible routing system with:

- File-system based routing with special files
- Support for layouts, loading states, and error handling
- Dynamic routing with catch-all routes
- Route groups for organization
- Parallel and intercepting routes for advanced UI patterns
- Built-in API routes with full HTTP method support
- Powerful middleware capabilities
- Server-side rendering and static generation
- Metadata API for SEO optimization

This routing system allows you to build complex applications with clean, maintainable code while providing excellent user experience and performance.