# Hermione - AI Agent & Developer Reference Guide

## 1. Project Overview
Hermione is a community events and donation platform for organizing and discovering grassroots relief initiatives in Bangladesh. The frontend is built with the Next.js App Router, TypeScript, Tailwind CSS v4, and Better Auth with a MongoDB adapter. Data persistence for community events and user profiles is handled by an external Express REST API server.

## 2. Tech Stack & Exact Versions
Verified from `package.json`:
- **Framework**: Next.js `16.4.3` (React Compiler enabled, Turbopack)
- **Core Library**: React `19.3.0`, React DOM `19.3.0`
- **Language & Types**: TypeScript `^5`, `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19`
- **Styling**: Tailwind CSS `^4`, `@tailwindcss/turbopack` `^4`, DaisyUI `^5.7.50` (`themes: false`)
- **Authentication**: Better Auth `^1.7.14`, `@better-auth/mongo-adapter` `^1.7.14`, `mongodb` `^7.8.0`
- **Theme**: `next-themes` `^0.4.6`
- **Notifications**: `react-hot-toast` `^2.6.1`
- **Icons**: `react-icons` `^5.7.0` (mostly Bootstrap Icons `bs`)
- **Compiler / Tooling**: `babel-plugin-react-compiler` `1.0.0`, ESLint `^9`, `eslint-config-next` `16.4.3`

## 3. Commands
From `package.json` scripts:
- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles production build and runs TypeScript checking.
- `npm run start`: Starts the compiled production server.
- `npm run lint`: Runs ESLint across the codebase.

## 4. Project Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx               # Login page (credentials & Google OAuth)
│   │   └── registration/page.tsx        # Registration page with password rules
│   ├── api/
│   │   ├── auth/[...all]/route.ts       # Better Auth Next.js API handler
│   │   └── jwt-token/route.ts           # Token verification endpoint
│   ├── create-event/page.tsx            # Protected: create event form page
│   ├── events/
│   │   ├── [id]/
│   │   │   ├── edit/page.tsx            # Protected: organizer edit form page
│   │   │   ├── loading.tsx              # Skeleton loader for event detail view
│   │   │   └── page.tsx                 # Event details, rules, join/leave
│   │   ├── manage/
│   │   │   ├── loading.tsx              # Skeleton loader for manage page
│   │   │   └── page.tsx                 # Protected: events created by current user
│   │   ├── actions.tsx                  # Server actions: create, update, delete, join, leave
│   │   ├── loading.tsx                  # Skeleton loader for all events list
│   │   └── page.tsx                     # All events listing with search and filters
│   ├── joined-events/
│   │   ├── loading.tsx                  # Skeleton loader for joined events
│   │   └── page.tsx                     # Protected: events joined by current user
│   ├── profile/
│   │   └── actions.ts                   # Server action: update user profile
│   ├── globals.css                      # Tailwind v4 theme, CSS variables, base styles
│   ├── layout.tsx                       # Root layout with fonts, theme, header, footer, toaster
│   ├── not-found.tsx                    # Custom 404 page
│   └── page.tsx                         # Landing page (hero, features, upcoming, showcase, newsletter)
├── components/
│   ├── auth/                            # AuthLayout, FormInput, AuthTransition, TransitionLink
│   ├── banner/                          # Hero banner section and Bangladesh SVG map
│   ├── container/                       # Reusable max-width page container
│   ├── events/                          # Event cards, filters, forms, owner controls, join context
│   ├── feature/                         # Platform features showcase grid
│   ├── footer/                          # Footer with contact details and links
│   ├── header/                          # Navigation header, logo, theme toggle, user menu
│   ├── newsletter/                      # Newsletter subscription component
│   ├── profile/                         # User profile modal dialog
│   ├── showcase/                        # Impact showcase carousels
│   ├── theme/                           # Next-themes provider wrapper
│   ├── ui/                              # ButtonLink (with link status), Spinner, Skeleton
│   └── UpcomingEvents/                  # Home page upcoming initiatives section & skeleton
├── lib/
│   ├── auth.ts                          # Server-side Better Auth initialization & MongoDB adapter
│   ├── auth-client.ts                   # Client-side Better Auth instance (signIn, signUp, signOut)
│   ├── auth-headers.ts                  # Server helper to fetch JWT token from Better Auth
│   └── events.ts                        # Data fetching functions for backend REST API
└── proxy.ts                             # Next.js 16 proxy/middleware route protector
```

## 5. Route Map
| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page with hero banner, map, platform features, upcoming events (first 3), showcase carousel, and newsletter. |
| `/events` | Public | Full event catalog with client-side category chip filtering and title/location search. |
| `/events/[id]` | Public / Auth to Join | Event detail page showing schedule, location, rules, participant count, and join/leave button (or edit/delete for owner). |
| `/create-event` | Authenticated | Form to publish a new event. Redirects unauthenticated visitors to `/login`. |
| `/events/[id]/edit` | Authenticated (Owner only) | Edit form for event creators. Redirects non-owners back to `/events/[id]`. |
| `/events/manage` | Authenticated | Organizer dashboard displaying only the events created by the logged-in user. |
| `/joined-events` | Authenticated | Participant dashboard showing all events the logged-in user has joined. |
| `/login` | Public (Guest) | Login with email/password or Google OAuth. Features sliding wave auth transition. |
| `/registration` | Public (Guest) | User registration with password rule validation and avatar URL input. |
| `/api/auth/[...all]` | Public API | Better Auth endpoint handling authentication, sessions, and OAuth flows. |
| `/api/jwt-token` | Internal API | Endpoint for inspecting bearer token received in authorization header. |

## 6. Auth and Data Flow
- **Authentication**: Better Auth with MongoDB adapter (`src/lib/auth.ts`) using the `b14-a08-cat-hermione` database. Handles email/password and Google OAuth providers, plus JWT plugin.
- **Client Auth**: `src/lib/auth-client.ts` exposes `signIn`, `signUp`, `signOut`, and `useSession` from `better-auth/react`.
- **External REST API**: Events and user profiles are stored in an external Express REST API configured via `API_URL` or `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`).
- **Authorization Headers**: `src/lib/auth-headers.ts` retrieves the session JWT via `auth.api.getToken({ headers: await headers() })` and attaches `Authorization: Bearer <token>` to outbound backend requests.
- **Server Actions**:
  - `src/app/events/actions.tsx`: `createEvent`, `updateEvent`, `deleteEvent`, `joinEvent`, `leaveEvent`. Each verifies active session email and triggers `revalidatePath` on completion.
  - `src/app/profile/actions.ts`: `updateUserProfile` sends updated name and image to backend `/users/profile`.
- **Data Fetching**: `src/lib/events.ts` defines `getEvents()`, `getMyEvents(email)`, `getJoinedEvents(email)`, and `getEventById(id, userEmail)`. All use `{ cache: "no-store" }` and pass auth headers.
- **Route Guarding**:
  - Edge proxy (`src/proxy.ts`): Configured with matcher `["/create-event", "/events/:path/edit"]`.
  - In-page checks: Server pages (`/create-event`, `/events/manage`, `/joined-events`, `/events/[id]/edit`) check `auth.api.getSession()` and call `redirect("/login")` when unauthenticated.

## 7. Styling and UI Conventions
- **Tailwind CSS v4 Configuration**: Defined in `src/app/globals.css` with `@theme inline`.
- **Design Tokens**:
  - `--color-brand`: `#ff692a` (primary orange accent)
  - `--color-textColor`: `#ffffff`
  - `--color-redBtn`: `#F95959` (danger and leave/delete actions)
  - `--color-background`: `#ffffff` (light), `#090d16` (dark)
  - `--color-headingColor`: `#090d16` (light), `#ffffff` (dark)
  - `--color-bodyText`: `#090d16` (light), `#d1d5db` (dark)
  - `--color-borderSoft`: `#e5e7eb` (light), `#1f2937` (dark)
  - `--background-image-gradient-color`: Applied via utility class `bg-gradient-color`.
- **Typography**:
  - Headings: DM Serif Display via `var(--font-dm-serif)` (`font-headingFont`).
  - Body: Quicksand via `var(--font-quicksand)` (`font-textFont`).
- **Layout & Structure**:
  - Standard container: `<Container>` (`max-w-7xl mx-auto w-full px-4`).
  - Standard section vertical spacing: `py-12`, `py-14`, or `py-20`.
  - Cards: `rounded-2xl` or `rounded-3xl`, `border border-borderSoft bg-background`.
- **Component Reuse**:
  - `ButtonLink`: Link wrapped with `useLinkStatus` to show a `Spinner` during route transitions.
  - `EmptyCard`: Empty state wrapper with icon, title, description, and action button.
  - `FormInput` / `FormField`: Consistent input fields with labels and validation error display.

## 8. Code Conventions
- **Server vs Client Components**: Keep pages and layouts as Server Components for data fetching. Add `"use client"` only for components requiring browser APIs, state (`useState`), transitions (`useTransition`), or event listeners.
- **Naming Conventions**: PascalCase for components (`EventsCard.tsx`, `Header.tsx`), camelCase for utility functions and actions (`events.ts`, `actions.tsx`).
- **Import Aliases**: Always use `@/` alias for root-relative imports from `src/`.
- **TypeScript**: Define explicit interfaces for payloads and action responses (`EventItem`, `ActionResult`, `CreateEventData`).

## 9. Environment Variables
List of variable names in `.env`:
- `BETTER_AUTH_SECRET`: Secret key used by Better Auth to encrypt sessions and sign tokens.
- `BETTER_AUTH_DB_URL`: MongoDB connection URI for Better Auth persistence.
- `BETTER_AUTH_URL`: Canonical base URL of the Next.js frontend (e.g. `http://localhost:3000` or production URL).
- `API_URL`: Server-side base URL for the external backend REST API.
- `NEXT_PUBLIC_API_URL`: Client-side base URL for the external backend REST API.
- `GOOGLE_CLIENT_ID`: Google OAuth client ID for social sign-in.
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret for social sign-in.

## 10. Gotchas and "Do Not Break" Notes
- **Fixed Header Offset**: Header is sticky with height `h-20` (80px). Global `scroll-behavior: smooth` is set on `html, body`. Hash navigation targets (such as `#campaigns`) must maintain scroll margin (`scroll-mt-20`) so section titles are not obscured by the header. The `<Toaster>` in `layout.tsx` is offset using `containerStyle={{ top: 88 }}`.
- **Scroll Behavior on Route Changes**: Global `scroll-behavior: smooth` combined with `data-scroll-behavior="smooth"` on `<html>` can affect Next.js route navigation scroll resets. LogoLink explicitly calls `window.scrollTo({ top: 0, behavior: "smooth" })` with `scroll={false}` on Next Link.
- **Auth Page Transitions**: `AuthTransition.tsx` animates a sliding wave curtain between `/login` and `/registration`. It finds the card via `[data-auth-card]` or element geometry (`width > 500` and `borderRadius > 8`). Do not modify card wrappers in `AuthLayout` without preserving these attributes.
- **Dynamic Route Rendering**: `/events` and `/` cannot be statically pre-rendered because data fetching in `src/lib/events.ts` uses `{ cache: "no-store" }` and inspects request headers via `getAuthHeaders()`. They are intentionally dynamic server-rendered routes.
- **Footer Link Notice**: `src/components/footer/Footer.tsx` has a link to `/events/create`. The actual route implemented in the application is `/create-event`.

## 11. Pre-Finish Checklist
Before completing any task:
1. Run `npm run build` to confirm compilation and route bundling succeed.
2. Check `npm run lint` output to ensure no new errors were added.
3. Verify that `"use client"` directives are applied only where necessary.
4. Use design tokens (`bg-brand`, `text-headingColor`, `text-bodyText`, `font-headingFont`, `font-textFont`) instead of hardcoded colors or fonts.
5. Confirm all imports use the `@/` alias.
