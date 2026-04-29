# Donor360 AI

Production-oriented **donor intelligence platform**: React + Vite + Tailwind frontend, Node.js + Express + MongoDB API, deterministic recommendation engine, simulated donation modelling, JWT auth (with optional Firebase sync), and investor-grade transparency pages.

## Architecture

| Layer | Stack |
|--------|--------|
| Frontend | React 18, Vite 6, Tailwind 4, React Router 7 |
| Backend | Express 4, Mongoose 8, `firebase-admin` (optional) |
| Data | MongoDB + seed from `public/data/projects.json` |
| Auth | Email/password (bcrypt + JWT) + optional Google via Firebase |

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
│   │   ├── seedProjects.js
│   │   └── firebaseAuth.js
│   ├── middleware/
│   └── utils/
├── src/
│   ├── app/RoutesApp.tsx
│   ├── app/layout/AppShell.tsx
│   ├── app/components/…
│   ├── pages/
│   ├── context/AuthContext.tsx
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
JWT_SECRET=use-a-long-random-string

# Optional Google sign-in bridge:
# FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

**Frontend (`.env` at repo root, optional)** — copy from `.env.example`:

```
# Leave empty locally to use Vite proxy → http://127.0.0.1:3001
VITE_API_URL=

# Optional Firebase client (enables Google button):
# VITE_FIREBASE_API_KEY=
# VITE_FIREBASE_AUTH_DOMAIN=
# VITE_FIREBASE_PROJECT_ID=
# VITE_FIREBASE_APP_ID=
# VITE_FIREBASE_MESSAGING_SENDER_ID=
```

For **Vercel + Render/Railway**, set `VITE_API_URL` to your public API origin (e.g. `https://api.yourdomain.com`) and `FRONTEND_URL` on the API to your Vercel URL.

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
| `POST` | `/api/donate` | Simulated impact; optional `Authorization: Bearer` |
| `GET` | `/api/dashboard` | Requires JWT |
| `POST` | `/api/auth/register` / `login` | Email + password |
| `POST` | `/api/auth/firebase` | Requires `FIREBASE_SERVICE_ACCOUNT_JSON` on server |
| `POST` | `/api/user/saved` | Toggle saved project (auth) |

## Deployment notes

- **Frontend (Vercel)**: `npm run build`, output `dist/`, use `vercel.json` rewrites for SPA routes (`/dashboard`, `/research`, …).
- **Backend (Render/Railway/Fly)**: set `PORT`, `MONGODB_URI`, `FRONTEND_URL`, `JWT_SECRET`. Run `node server/app.js` from repo root **or** set working directory to repo root so `public/data/projects.json` resolves for seeding.

## Product surfaces

- `/` — Live recommendation flow + ecosystem + trust narrative  
- `/dashboard` — Authenticated totals, donation history, AI query log  
- `/research` — Methodology & diligence narrative  
- `/resilience360` — Resilience360 placeholder (linked from ecosystem)  
- `/login`, `/signup` — Auth (Google only appears when Firebase client env is set)

## Ecosystem links

- **She360 (live)**: https://ai-platform-for-women-empowerment.vercel.app  
- **Resilience360**: in-app placeholder at `/resilience360`

---

Original UI exploration reference: Figma bundle `QhooZm7D4jeWcAvkyTHrUr`.
