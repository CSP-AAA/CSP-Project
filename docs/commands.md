# Commands

End-to-end Google login (Atlas, schema, Cloud Console, Express, Next.js): [google-oauth.md](./google-oauth.md).

## Empty listings / budgets

The UI is empty when `GET /api/tors` fails or the DB was never synced. Do not send `.env` (it has secrets).

**Docker (usual case)**

1. Pull latest (needs `docker-compose.yml`, `backend/src/utils/smeGp.js`, `frontend/src/lib/api.ts`).
2. In `backend/.env`: `MONGO_URI=mongodb://mongo:27017/Torrent` and `FETCH_ON_STARTUP=true`.
3. Recreate and wait for sync:

```bash
docker compose up -d --force-recreate backend
docker compose logs -f backend
```

Look for `Server running`, then `FETCH_ON_STARTUP`, then `Procurement sync complete`. Check with `curl http://localhost:5175/api/tors` — should be a JSON array, not empty / connection reset.

**Host `npm run dev`:** use `MONGO_URI=mongodb://127.0.0.1:27017/Torrent` (hostname `mongo` only works inside Compose). Do not run host backend and Docker on 5175 at the same time.

**Frontend:** `NEXT_PUBLIC_API_URL=http://localhost:5175/api` in `frontend/.env.local`.

SME-GP rows often have budget `0`; only BMA e-GP2 usually has amounts. That is separate from this outage.

## Setup & auth

### Log in to Vercel CLI

From `frontend/`. Run this if `npx vercel --prod` says `Not authorized`.

```bash
cd frontend
npx vercel login
```

Opens a browser. Use the same Vercel account that owns **wafers-projects / torrent**.

## Deploy

### Deploy frontend to Vercel

From `frontend/`. Uploads local files — no GitHub push.

```bash
cd frontend
npx vercel --prod
```

Updates the live site: https://torrent-ten.vercel.app

Preview only (does not update production):

```bash
cd frontend
npx vercel
```
