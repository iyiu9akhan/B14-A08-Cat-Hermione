# Hermione

A community donation and relief event management web application for organizing, discovering, and joining local social initiatives across Bangladesh.

## Links

- **Live Site**: https://b14-a08-cat-hermione.vercel.app/
- **Client Repository**: https://github.com/iyiu9akhan/B14-A08-Cat-Hermione
- **Server Repository**: https://github.com/iyiu9akhan/B14-A08-Cat-Hermione-Server

## About

Hermione helps volunteers and community leaders organize and join relief efforts such as food distributions, winter clothing drives, and cleanups. It gives organizers a way to post events with capacity limits, while volunteers can locate nearby initiatives and register. The frontend is built with Next.js and communicates with a separate Express REST API and a MongoDB database for authentication and event records.

## Features

- Browse all community donation events sorted chronologically by date.
- Search events by title, location, or type, with category filter chips.
- View detailed event information including schedule, location, rules, and participant capacity.
- Create new events with future-date validation, participant limits, and preset or custom cover images.
- Join and leave events directly from the event details page with participant seat tracking.
- Manage, update, and delete self-created events from a private organizer dashboard.
- View all joined events in a dedicated participant activity list.
- Register and log in using email and password with uppercase, lowercase, and minimum 6-character rules.
- Sign in with Google OAuth.
- View profile and update display name and avatar URL via a modal dialog.
- Toggle between light and dark themes with system preference support.
- Skeleton loading screens for pages and active link transitions.
- Toast notifications for form submissions, state changes, and errors.
- Animated wave transitions between login and registration views.

## Tech Stack

- Next.js 16.4.3 (App Router, Turbopack, React Compiler enabled)
- React 19.3.0 and React DOM 19.3.0
- TypeScript 5
- Tailwind CSS 4 and DaisyUI 5.7.50
- Better Auth 1.7.14 with @better-auth/mongo-adapter 1.7.14
- MongoDB 7.8.0
- Express REST API (separate backend server)
- next-themes 0.4.6, react-hot-toast 2.6.1, react-icons 5.7.0
- Vercel (deployment platform)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm
- MongoDB database instance (local or Atlas)
- Running Hermione backend server instance (see server repository)

### Local Setup

1. Set up the backend server first by following the instructions in the [Server Repository](https://github.com/iyiu9akhan/B14-A08-Cat-Hermione-Server).
2. Clone the client repository:
   ```bash
   git clone https://github.com/iyiu9akhan/B14-A08-Cat-Hermione.git
   cd B14-A08-Cat-Hermione
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root:
   ```env
   BETTER_AUTH_SECRET=secret_for_session_encryption
   BETTER_AUTH_DB_URL=mongodb_connection_uri_for_auth
   BETTER_AUTH_URL=http://localhost:3000
   API_URL=http://localhost:5000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   GOOGLE_CLIENT_ID=google_oauth_client_id
   GOOGLE_CLIENT_SECRET=google_oauth_client_secret
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.
6. For production builds:
   ```bash
   npm run build
   npm start
   ```

## Author

Muhammad Sameer Khan - [Portfolio](https://iyiu9akhan.vercel.app/)
