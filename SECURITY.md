# Iron Ledger Security Notes

## Current model

- No frontend API keys.
- The app still works in local-only mode with browser storage.
- Optional account sync uses Cloudflare Pages Functions and a Cloudflare D1 database.
- Workout data stays in each user's browser storage unless they import/export files, sync to a local vault folder, or sign in and save to D1.
- The hosted build blocks outbound network calls except to itself. Local AI should be used only in the local PC version, and no local endpoint is prefilled in the hosted HTML.
- On Cloudflare Workers Static Assets, `worker.js` blocks source/config paths before serving assets.

## Hosted protections

The `_headers` file is intended for Cloudflare Pages or Netlify-style static hosting and sets:

- Content Security Policy
- Frame blocking
- MIME sniffing protection
- Referrer policy
- Restrictive browser permissions
- Microphone permission limited to this app origin

## Data safety

- Saved sessions are marked pending until successfully appended to `Workout_Log.md`.
- Pending sessions remain in browser local storage.
- If direct vault sync is unavailable, users can download a markdown sync bundle.
- Signed-in sessions are stored per user in D1 and filtered by the authenticated user ID on every request.
- Session deletion removes account sessions from D1 and removes local sessions from browser storage.
- Deleting imported/vault sessions hides them in the app without silently rewriting markdown files.
- Imported file text is escaped before rendering.
- Imported files are limited to 20 files and 2MB per file.

## Account security

- Passwords are hashed inside the Cloudflare Function with PBKDF2-SHA-256.
- Each password gets a unique random salt.
- Session cookies are `HttpOnly`, `Secure`, and `SameSite=Lax`.
- Session tokens are stored in D1 as SHA-256 hashes, not as raw bearer tokens.
- Login attempts are rate-limited by email/IP pair.
- Unsafe API methods require a matching same-origin `Origin` header.
- The D1 binding name is `IRON_LEDGER_DB`; it is configured in Cloudflare, not in frontend JavaScript.
- If deploying to `workers.dev`, use `run_worker_first = true` so `worker.js` can block `schema.sql`, `functions/`, tests, and config files from being served as static files.

## Do not do

- Do not put API keys in `app.js`, `index.html`, or any file served to browsers.
- Do not add a cloud AI parser directly from the frontend.
- Do not trust imported markdown as HTML.
- Do not assume local browser storage is a permanent backup; export important pending sessions.
- Do not weaken cookies by removing `HttpOnly`, `Secure`, or `SameSite`.
