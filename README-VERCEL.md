# Deploying to Vercel (serverless)

This project contains a Vite React client in `client/` and an Express-based API under `server/`.
The repository has been adapted so the server runs as Vercel Serverless Functions (under `api/`).

What I changed for Vercel
- Added `server/app.ts` which builds and exports the Express `app`.
- Added `api/index.ts` — a `serverless-http` adapter that exposes the Express app as a Vercel function.
- Added `serverless-http` to `dependencies`.
- Added `vercel.json` with builds and routes to serve the client static files and the serverless function.
- Adjusted the `build` script in `package.json` to run `vite build` (Vercel will run `npm run build`).

How Vercel will build
- Vercel runs `npm install` then `npm run build` (this runs `vite build` and produces `dist/public`).
- Vercel will deploy `api/*.ts` files as serverless functions using `@vercel/node`.

Environment variables
- Configure environment variables in the Vercel Dashboard (Project Settings → Environment Variables). Important variables likely needed:
  - `DATABASE_URL` (or Neon/Planetscale URL)
  - `SESSION_SECRET` (if using sessions; see notes)
  - `VERCEL_ENV` (optional) — Vercel provides this automatically; useful for conditional behavior.

Session secret example
Use a strong random value for `SESSION_SECRET`. In PowerShell you can generate one locally:

```powershell
$secret = [System.Convert]::ToBase64String((New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes(32)); Write-Output $secret
```

Copy the generated string into Vercel's Environment Variables as `SESSION_SECRET` (set for Production and Preview as needed).
  - Any API keys used by the app

Sessions & DB notes
- Serverless functions are ephemeral — in-memory session stores will not work. Use a remote session store (Redis/Upstash) or switch to stateless authentication (JWT).
- The project includes `@neondatabase/serverless` which is serverless-friendly; ensure you use that for DB connections.

Deploy steps (quick)
1. Push this repo to GitHub.
2. In Vercel, create a new project and import the repo.
3. Set Environment Variables in the Vercel dashboard.
4. Set Build Command (optional) — Vercel will use `npm run build` by default.
5. Set Output Directory to `dist/public` (the `vercel.json` already configures this, but you can set it in the UI).

Testing locally
- Run `npm install` then `npm run build` to produce `dist/public`.
- Use `vercel dev` (if you have the Vercel CLI) to emulate the serverless functions and static site locally.

Using `vercel dev` locally
1. Install Vercel CLI: `npm i -g vercel` (or use `npx vercel`).
2. Login: `vercel login`.
3. Run `vercel dev` in the project root. It will:
  - Serve `client/` static files from `dist/public` after building.
  - Emulate `api/` serverless functions (including `api/index.ts` and `api/ping.ts`).

Note: `vercel dev` respects `.env` files; you can create a `.env.local` with `SESSION_SECRET` for local testing.

Example native endpoints
- `GET /api/ping` — health check (`api/ping.ts`)
- `GET /api/users?id=<id>` — fetch user by id (example native handler in `api/users.ts`)
- `POST /api/users` — create a user with `{ "username": "...", "password": "..." }` (example native handler)

These native endpoints demonstrate how to migrate routes from Express to Vercel native functions incrementally. You can keep `api/index.ts` (serverless-http adapter) for compatibility while migrating routes one-by-one.

Limitations
- File uploads or local filesystem writes are not supported in serverless; use object storage (S3 / Cloud Storage).
- Long-running background jobs should be moved to a worker or external service.

If you want, I can:
- Convert the session handling to use Upstash Redis and add example env vars.
- Convert specific routes to native serverless handlers if you prefer not to use `serverless-http`.
