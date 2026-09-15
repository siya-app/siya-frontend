# Siya Frontend

Siya helps people discover and book the best terraces in Barcelona: find a spot, check availability, and reserve it in a few clicks. This repo is the frontend: a fast, modern React 19 + TypeScript app built with Vite.

Backend repo: [siya-backend](https://github.com/siya-app/siya-backend)

Figma wireframe: [SiyaAppWireframe](https://www.figma.com/design/G304yiAIEXMgrx4mtccl7c/SiyaAppWireframe?node-id=0-1&p=f&t=HWQxk9M4dLf9xMRc-0)

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build tool
- **Tailwind CSS 4** + **daisyUI** — styling
- **React Router 7** — routing
- **TanStack Query** — data fetching/caching
- **Axios** — HTTP client
- **Zod** — schema validation
- **Mapbox GL** + **Supercluster** — map and marker clustering
- **FullCalendar** — booking calendar
- **ESLint** — linting

## Prerequisites

- Node.js (v18, matching the Docker build image)
- npm (project ships a `package-lock.json`; a `yarn.lock` is also present)

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with the environment variables listed below, then start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default (configured in [vite.config.ts](vite.config.ts)).

## Environment variables

These are read via `import.meta.env` throughout the codebase and must be prefixed with `VITE_` to be exposed to the client:

| Variable | Used for |
|---|---|
| `VITE_API_URL` | Base URL for the main API (`apiTerraces`, `apiUser`, `apiCatastro`, booking service) |
| `VITE_API_ALL_TERRACES` | Terraces endpoint |
| `VITE_API_ALL_USERS` | Users endpoint |
| `VITE_API_ALL_REVIEWS` | Reviews endpoint |
| `VITE_API_FAVS` | Favorites endpoint |
| `VITE_API_USER_BOOKINGS` | User bookings endpoint |
| `VITE_BACKEND_URL` | Backend base URL (used for favorites fetch) |
| `VITE_MAPBOX_ACCESS_TOKEN` | Mapbox GL access token for the map features |

There is no `.env.example` in the repo — check with the team for actual values, or the [Dockerfile](Dockerfile) for the build args accepted (`VITE_MAPBOX_ACCESS_TOKEN`, `VITE_API_URL`).

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
  assets/       Static assets (images, blobs)
  components/   Shared/reusable UI components
  config/       App configuration
  context/      React context providers (e.g. filtered terraces/users, reviews)
  features/     Feature-scoped modules (login, signup, map, bookings, reviews,
                terraces, favorites, owner actions, weather, etc.)
  hooks/        Custom React hooks
  interfaces/   TypeScript interfaces
  layout/       Layout components
  pages/        Route-level page components
  routes/       Route definitions (AppRoutes.tsx)
  services/     API service modules (axios instances, booking/terrace services)
  types/        TypeScript types, including Zod schemas
  utils/        Utility functions
```

## Routes

Defined in [src/routes/AppRoutes.tsx](src/routes/AppRoutes.tsx):

| Path | Page |
|---|---|
| `/` | Home |
| `/perfil` | User profile |
| `/buscar-terrassa` | Terrace search/filter |
| `/reservar/:restaurantId` | Booking calendar |
| `/meva-terrassa/:id` | Owner's terrace management |
| `/nosaltres` | About us |
| `/login` | Log in |
| `/sign-up` | Sign up |
| `/partners` | Partners |
| `/contacte` | Contact us |
| `/terrassa/:id` | Terrace details |
| `/politica-privacitat` | Privacy policy |
| `*` | 404 Not Found |

## Deployment

The app is containerized and deployed to [Fly.io](https://fly.io/) (see [fly.toml](fly.toml)):

- [Dockerfile](Dockerfile) builds the app in a `node:18-alpine` stage (`npm ci` + `npm run build`, with `VITE_MAPBOX_ACCESS_TOKEN` and `VITE_API_URL` passed as build args), then serves the static build from `nginx:alpine` using [nginx.conf](nginx.conf), which serves `index.html` for all routes (SPA fallback).
- The Fly app is named `siya-frontend`, built from the image `docker.io/roro833/siya-frontend:latest`, listening on internal port 80.

## Linting

ESLint is configured in [eslint.config.js](eslint.config.js). Run with:

```bash
npm run lint
```
