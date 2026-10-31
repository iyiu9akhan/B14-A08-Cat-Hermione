# Header Design - Theme UI Summary

## Design Theme (from globals.css)
- **Brand color**: `#facc15` (amber/yellow) — `--color-brand`
- **Secondary text**: `#090d16` (dark gray) -- `--color-secondaryText`
- **Fonts**: 
  - `--font-headingStyle`: DM Serif Display
  - `--font-textStyle`: Quicksand

## Layout Structure

### Desktop View (sm:visible)
- **Left**: "Hermione" brand name (DM Serif Display font)
- **Center**: Navigation links (Home, Events, About) - centered using flex-1
- **Right**: Login button

### Mobile View (sm:hidden)
- **Left**: "Hermione" brand name
- **Center**: Hidden (NavLinks collapse)
- **Right**: Hamburger menu button

## Components

### Header.tsx
- Sticky header with subtle bottom border
- Fixed height (`h-20`), white background
- Brand name with `mr-8` margin for spacing
- Centered navigation using `flex-1` on `<nav>` element
- Right-side area for login button / hamburger menu

### NavLinks.tsx
- `hidden sm:flex` - hidden on mobile, flex on desktop
- Links: Home, Events, About
- Quicksand font (`font-textStyle`)
- Hover transitions to brand color `#facc15`

### NavBtn.tsx
- **Desktop** (`sm:inline-flex`): Login button with brand background `#facc15`
- **Mobile** (`sm:hidden`): Hamburger menu icon
- Both states in single component with screen-size conditional classes

## Design Token Usage
- `#facc15` used for login button background and hover states
- `#090d16` used for non-brand text color
- DM Serif Display font for brand name
- Quicksand font for navigation links
- Clean hierarchy: brand | navigation | CTA