# Iron Ledger Security Notes

## Current model

- Static frontend only.
- No shared database.
- No frontend API keys.
- Workout data stays in each user's browser storage unless they import/export files or sync to a local vault folder.
- Local AI requests are restricted to `localhost`, `127.0.0.1`, or `[::1]`.

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
- Imported file text is escaped before rendering.
- Imported files are limited to 20 files and 2MB per file.

## Do not do

- Do not put API keys in `app.js`, `index.html`, or any file served to browsers.
- Do not add a cloud AI parser directly from the frontend.
- Do not trust imported markdown as HTML.
- Do not assume local browser storage is a permanent backup; export important pending sessions.
