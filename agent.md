# Hermione Project - Agent Summary

## Project Overview
**Hermione** is a Next.js 16-based web platform for community events and relief initiatives, particularly focused on Bangladesh. The platform enables citizens to organize, discover, and participate in community-driven initiatives like donation drives, cleanups, and social services.

**Key Features**:
- Home page with featured content (banner, features, showcase gallery, newsletter)
- Event creation and management
- User registration and login
- Upcoming events discovery
- Contact and quick links

**Technology Stack**:
- **Framework**: Next.js 16.4.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **Fonts**: DM Serif Display (heading), Quicksand (body) via next/font
- **Theming**: next-themes (system default)
- **Icons**: React Icons (bs variant)
- **Notifications**: react-hot-toast
- **Compiler**: React Compiler (experimental)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts, ThemeProvider, Header, Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles, Tailwind + DaisyUI config, design tokens
│   ├── create-event/page.tsx  # Create event form
│   ├── registration/page.tsx   # User registration
│   └── login/page.tsx              # User login
│
├── components/             # Reusable React components
│   ├── header/             # Header/navigation component
│   │   ├── Header.tsx      # Sticky header with brand, nav, theme toggle, CTA
│   │   ├── NavLinks.tsx    # Desktop navigation links (Home, Events, About)
│   │   ├── NavBtn.tsx      # Login button (desktop) / hamburger (mobile)
│   │   └── ThemeToggle.tsx # Theme switcher
│   ├── banner/             # Hero banner with map of Bangladesh
│   ├── feature/            # Platform features grid (4 cards)
│   ├── showcase/           # Gallery carousel with cards
│   ├── newsletter/         # Subscription form
│   ├── footer/             # Footer with contact info and quick links
│   ├── theme/              # ThemeProvider wrapper
│   ├── auth/               # Auth form components (FormInput, AuthLayout)
│   ├── container/          # Max-width container wrapper
│   └── events/             # Event creation form
│
├── app/events/             # Dynamic event routes (if needed)
└── public/                 # Static assets (images, logos)
```

## Design Summary (from DESIGN_SUMMARY.md)

### Color Theme
- **Brand color**: `#facc15` (amber/yellow) -- originally specified, but `globals.css` uses `#ff692a` (orange) for `--color-brand`
- **Secondary text**: `#090d16` (dark gray)
- **Background**: `#ffffff` (light) / `#090d16` (dark mode)
- **Gradient accents**: `from-brand/10`, `to-brand` variants

### Typography
- **Heading font**: DM Serif Display (`--font-dm-serif`)
- **Body font**: Quicksand (`--font-quicksand`)

### Layout Structure
- **Desktop (sm:visible)**: Left: "Hermione" brand name | Center: Navigation links (Home, Events, About) centered using flex-1 | Right: Login/button
- **Mobile (sm:hidden)**: Left: Brand name | Center: Hidden (nav collapses) | Right: Hamburger menu button

### Components
- **Header.tsx**: Sticky header, height h-20, white background, brand name with mr-8 margin, centered navigation, right-side login/hamburger
- **NavLinks**: `hidden sm:flex`, Quicksand font, hover transitions to brand color
- **NavBtn**: Desktop (`sm:inline-flex`): Login button with brand background; Mobile (`sm:hidden`): Hamburger menu icon
- **Banner**: Gradient background, large heading, description, CTA buttons, embedded map of Bangladesh
- **Feature**: 4 feature cards with interactive hover states, icon badges, descriptions, images
- **Showcase/ShowcaseCard**: Image carousel with navigation arrows, tag/label/title/text content
- **Newsletter**: Form with name, email, topic selection, subscribe button
- **Footer**: Contact info (address, phone, email), social links, brand logo (rotated), quick links, copyright

### Design Tokens (globals.css)
```css
:root {
  --background: #ffffff;
  --heading: #090d16;
  --body-text: #090d16;
  --border-soft: #e5e7eb;
  --color-brand: #ff692a;        /* Orange - overrides design summary #facc15 */
  --color-textColor: #ffffff;
  --color-background: var(--background);
  --color-headingColor: var(--heading);
  --color-bodyText: var(--body-text);
  --color-borderSoft: var(--border-soft);
  --font-headingFont: var(--font-dm-serif);
  --font-textFont: var(--font-quicksand);
}
```

## Key Development Patterns

### 1. App Router & Layout
- Uses Next.js 16 App Router (`app/` directory)
- `layout.tsx` provides root HTML structure with Google fonts, ThemeProvider, Header, Footer, and Toaster
- Metadata is defined per-page (title, description)

### 2. Theming
- `ThemeProvider` wraps the app using `next-themes` with `defaultTheme="system"` and `enableSystem`
- Theme class is toggled on `<html>` element (`attribute="class"`)
- Global styles in `globals.css` define light/dark mode variables

### 3. Component Architecture
- **Client Components**: Marked with `"use client"` directive where interactivity is needed (forms, carousels, features)
- **Server Components**: Default for page content, data fetching
- Components use Tailwind CSS v4 utility-first classes
- DaisyUI is configured but `themes: false` in globals.css, custom theme tokens defined

### 4. Form Handling
- Custom `FormInput` component with password toggle, validation, error display
- `FormField` wrapper for consistent form layout with labels and error handling
- Registration and login pages use `AuthLayout` wrapper
- `CreateEventForm` has custom validation, preset photo URLs, event type selector
- Uses `react-hot-toast` for submit feedback

### 5. Navigation & Routing
- Next.js `<Link>` component for client-side navigation
- Header links navigate to `#campaigns`, `/registration`, `/create-event`, `/events/create`
- Footer has quick links to Home, Upcoming Events, Plan Your Event, Registration

### 6. Responsive Design
- Mobile-first Tailwind classes (`sm:visible`, `sm:hidden`, `sm:grid-cols-2`)
- Header nav collapses to hamburger on mobile
- Showcase grid adapts from 1 column (mobile) to 2 columns (lg)
- Features grid adapts from 1 column to 4 columns

## Pages & Their Purpose

### Home (`app/page.tsx`)
Main landing page combining:
- `Banner` - Hero section with value proposition and map
- `Feature` - Platform capabilities grid
- `UpcomingEvents` - (component) upcoming initiative cards
- `Showcase` - Gallery of impact stories
- `Newsletter` - Email subscription form

### Create Event (`app/create-event/page.tsx`)
Form for creating new community events with fields:
- Event title, type (Donation/Food/Clothing/Education/Cleanup/Plantation), date (must be future), location, thumbnail image URL, description
- Organizer email pre-filled and displayed
- Publication success toast

### Registration (`app/registration/page.tsx`)
User registration form with:
- Name, email, photo URL (optional), password
- Password strength validation rules
- Success/error toasts
- Redirect link to login

### Login (`app/login/page.tsx`)
User login form with:
- Email and password fields
- Google OAuth continuation option
- "Don't have an account?" link to registration

### Layout (`app/layout.tsx`)
Root layout containing:
- Google fonts (DM Serif Display, Quicksand)
- `ThemeProvider` for system theme detection
- `Header` component (sticky nav)
- `Footer` component
- `Toaster` for notifications

## Components Detail

### Header (`src/components/header/Header.tsx`)
- Sticky `top-0`, `z-20`, background from `bg-brand` (via `bg-background`)
- Container-based flex layout: brand link left, nav centered, theme toggle + NavBtn right
- Toggling between light/dark brand logos (`/brand-logo-light.png` / `/brand-logo-dark.png`)
- Smooth scroll to top on link click

### NavLinks (`src/components/header/NavLinks.tsx`)
- Hidden on mobile (`hidden`), flex on desktop (`sm:flex`)
- Links: "Upcoming Events" with hover text transition to secondary color
- Uses `text-headingColor` font color, `font-textFont`, `font-semibold`

### NavBtn (`src/components/header/NavBtn.tsx`)
- Desktop: Registration button with brand background (`bg-brand`), white text
- Mobile: Hamburger menu icon (hidden on desktop)
- Single component with screen-size conditional classes

### Banner (`src/components/banner/Banner.tsx`)
- Gradient background (`bg-gradient-color`)
- Large DM Serif Display heading with brand text color
- Description paragraph with Quicksand
- Two CTA buttons: "Upcoming Events" (brand bg, text color) and "Plan Your Event" (bordered)
- Embedded interactive map of Bangladesh

### Feature (`src/components/feature/Feature.tsx`)
- 4 feature cards with interactive hover states
- Active card has brand background with white text
- Cards have tag badge, title, description, and image
- Mouse-enter controlled active state (auto-reset on leave)
- Image fill with responsive sizes

### Showcase/ShowcaseCard (`src/components/showcase/ShowcaseCard.tsx`)
- Carousel with manual prev/next navigation
- Notch mask effect on images using radial/linear gradient layers
- Dark/lite mode variants
- 3-image carousel with center-active slide

### Newsletter (`src/components/newsletter/Newsletter.tsx`)
- Dual-column layout (text left, form right)
- Fields: name, email, topic selection (All updates/Upcoming events/Impact stories)
- Success state thank-you message on submit
- One-email-per-month promise

### Footer (`src/components/footer/Footer.tsx`)
- Top section with rounded corners and gradient background
- Three-column layout: Contact, Brand info, Quick Links
- Social media links (Facebook, Instagram, LinkedIn)
- Bottom bar with copyright and privacy links
- Brand logo rotated 90deg in footer

### Container (`src/components/container/Container.tsx`)
- Simple wrapper: `max-w-7xl mx-auto w-full`
- Used consistently across all pages for max-width centering

### Auth Layout (`src/components/auth/AuthLayout.tsx`)
- Section with gradient background and decorative SVG shape
- Left side: map image (from Banner component)
- Right side: children content (form layouts)
- Copyright notice at bottom

### FormInput (`src/components/auth/FormInput.tsx`)
- Labeled input with icon prefix
- Password toggle show/hide functionality
- Error state with ring border
- Placeholder text styling

### FormField (`src/components/events/FormField.tsx`)
- Label with required asterisk
- Input with consistent styling and focus states
- Optional hint display
- Error text in red

## Event Types Supported
- Donation
- Food
- Clothing
- Education
- Cleanup
- Plantation

## Known/TODO Items
- TODO in `CreateEventPage`: "logged in user er email auth theke niye ashbe" (organizer email should come from auth)
- TODO in `CreateEventForm`: "ekhane API call korbe, body te organizerEmail pathabe" (needs API integration)
- Photo presets in CreateEventForm have empty URLs ("")
- Google OAuth handler in login page currently just shows toast (no actual auth)
- Image URLs are mostly placeholder (Unsplash, local project images)

## Development Commands
```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Notes for Future Agent Use
- All components are TypeScript with proper typing
- Tailwind CSS v4 configuration in `next.config.ts` with custom rules for `.css` files
- React Compiler enabled (`reactCompiler: true`) - may affect how components are transpiled
- DaisyUI v5 configured with custom theme tokens in globals.css
- The project uses Next.js 16.4.3 which may have different APIs than older versions
- `experimental.agentFeedback: true` enabled in next.config.ts
- Component structure follows consistent patterns: useState for local state, useEffect for side effects, "use client" where needed
- The brand color appears inconsistent: DESIGN_SUMMARY.md says `#facc15` but globals.css uses `#ff692a` - may need reconciliation