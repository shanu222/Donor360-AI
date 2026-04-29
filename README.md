# Donor360 AI

**Donor intelligence platform** (demo-ready, open access): React + Vite + Tailwind frontend, Node.js + Express + MongoDB API, deterministic recommendation engine, simulated donation modelling, and a **public** impact dashboard (no login).

## Architecture

| Layer | Stack |
|--------|--------|
| Frontend | React 18, Vite 6, Tailwind 4, React Router 7 |
| Backend | Express 4, Mongoose 8 |
| Data | MongoDB + seed from `public/data/projects.json` |
| Access | Open demo — banner + “Live demo” badge; `/login` explains open access |

### Folder structure

```
├── public/data/projects.json   # Canonical catalog (seeded into MongoDB)
├── server/
│   ├── app.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   │   ├── recommendationEngine.js
│   │   └── seedProjects.js
│   └── utils/
├── src/
│   ├── app/RoutesApp.tsx
│   ├── app/layout/AppShell.tsx
│   ├── app/components/…
│   ├── pages/
│   └── lib/api.ts
└── vercel.json                   # SPA routing for Vercel
```

## Prerequisites

- Node.js 20+
- MongoDB 6+ (local or Atlas)

## Step-by-step setup

### 1. Install dependencies

```bash
npm install
```

This installs the **root workspace** (frontend) and the **`server` workspace** (API).

### 2. Configure environment

**API (`server/.env`)** — copy from `server/.env.example`:

```
MONGODB_URI=mongodb://127.0.0.1:27017/donor360
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Frontend (`.env` at repo root, optional)** — copy from `.env.example`:

```
VITE_API_URL=
```

Leave `VITE_API_URL` empty locally so Vite proxies `/api` → `http://127.0.0.1:3001`.

For **Vercel + Render/Railway**, set `VITE_API_URL` to your public API origin and `FRONTEND_URL` on the API to your Vercel URL.

### 3. Run MongoDB

Example with Docker:

```bash
docker run -d -p 27017:27017 --name donor360-mongo mongo:7
```

### 4. Start the API

```bash
npm run dev:server
```

On boot, the API connects to MongoDB and **upserts** all rows from `public/data/projects.json`.

### 5. Start the frontend

```bash
npm run dev
```

Vite proxies `/api/*` to `http://127.0.0.1:3001` (see `vite.config.ts`).

### 6. Smoke-test

- `GET http://localhost:3001/health`
- `GET http://localhost:3001/api/projects`
- From the UI: **Generate AI Recommendations** → should call `POST /api/recommendations`

## Key HTTP routes

| Method | Path | Notes |
|--------|------|--------|
| `POST` | `/api/recommendations` | Body: `{ cause, budget, location, priority }` |
| `GET` | `/api/projects` | Full catalog |
| `POST` | `/api/donate` | Simulated impact model (no persistence) |
| `GET` | `/api/dashboard` | Public aggregates + recent AI logs (illustrative baseline if DB empty) |

## Deployment notes

- **Frontend (Vercel)**: `npm run build`, output `dist/`, use `vercel.json` rewrites for SPA routes (`/dashboard`, `/research`, …).
- **Backend (Render/Railway/Fly)**: set `PORT`, `MONGODB_URI`, `FRONTEND_URL`. Run `node server/app.js` from repo root **or** set working directory to repo root so `public/data/projects.json` resolves for seeding.

## Product surfaces

- `/` — Live recommendation flow + ecosystem + trust narrative  
- `/dashboard` — Public impact metrics, donation chart (sample or real), AI query log  
- `/research` — Methodology & diligence narrative  
- `/resilience360` — Resilience360 placeholder (linked from ecosystem)  
- `/login` — Short “platform access enabled” note (optional for bookmarks); `/signup` redirects here  

## Ecosystem links

- **She360 (live)**: https://ai-platform-for-women-empowerment.vercel.app  
- **Resilience360**: in-app placeholder at `/resilience360`

---

Original UI exploration reference: Figma bundle `QhooZm7D4jeWcAvkyTHrUr`.
