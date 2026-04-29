# Donor360 AI

Full-stack **donor intelligence** demo: **Vite + React** frontend and a **Node + Express** API in `server/`, designed to run on **EC2** (frontend static or dev server + API on **port 5000**).

## Quick start (local)

```bash
npm install
```

**Terminal 1 — API (port 5000)**

```bash
npm run dev:server
```

- Root URL: `GET http://localhost:5000/` → `Donor360 API running 🚀`
- Recommendations: `POST http://localhost:5000/api/recommend` with JSON body `{ causes, budget, location, priority }`

**Terminal 2 — frontend**

```bash
npm run dev
```

With `VITE_API_URL` **empty**, Vite proxies `/api/*` to `http://127.0.0.1:5000` (see `vite.config.ts`).

## EC2 / production

1. Build the UI: `npm run build` and serve `dist/` (nginx, `vite preview`, or your stack).
2. Run the API on the instance (same repo or copy `server/` + `src/data/mockData.js`):

   ```bash
   cd server
   npm install
   PORT=5000 node server.js
   ```

3. Open **port 5000** in the security group for your API IP (or put nginx in front).
4. Set the frontend env at build time:

   ```env
   VITE_API_URL=http://YOUR_EC2_PUBLIC_IP:5000
   ```

   Then rebuild the frontend so `fetch` calls hit the public API.

## Environment

| File | Purpose |
|------|--------|
| `server/.env` | `PORT=5000`, optional `MONGODB_URI`, `FRONTEND_URL` for CORS |
| `.env` (repo root) | `VITE_API_URL` for production API base URL |

## Mock data (She360 + Resilience360)

- `src/data/mockData.js` — mock program lists.
- `server/recommendLogic.js` — merges and ranks them for `POST /api/recommend`.

## Key API routes (`server/server.js`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Plain-text health line |
| `GET` | `/api/health` | JSON health |
| `POST` | `/api/recommend` | `{ causes, budget, location, priority }` → `{ success, data: [...] }` |
| `POST` | `/api/donate` | Simulated gift (demo) |
| `GET` | `/api/dashboard` | Static demo dashboard payload |

`mongoose` connects only if `MONGODB_URI` is set (optional, for future persistence).

## Product routes (React)

- `/` — AI matching + results + impact chart  
- `/dashboard` — Public metrics (no login)  
- `/research`, `/resilience360`, `/login` (info page)

---

Original UI reference: Figma bundle `QhooZm7D4jeWcAvkyTHrUr`.
