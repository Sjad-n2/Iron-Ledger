# Iron Ledger

A no-cost local gym dashboard for your Obsidian markdown workout vault.

## Run

```powershell
node server.js
```

Then open `http://localhost:4173`.

## What it does

- Shows a dashboard from `Sets_Reps_RIR.md`, `Workout_Log.md`, `Notes_For_Next_Session.md`, and `Workout_Statistics.md`.
- Opens fresh for new users until they import files, link a vault, or start tracking.
- Lets you link your Obsidian gym folder in Chromium/Edge with the folder picker.
- Parses rushed gym notes offline into clean session rows.
- Exports parsed sessions as copied markdown, `.md`, or `.txt`.
- Lets you pick a session date before exporting, so you can add old sessions too.
- Saves parsed sessions into local browser history for the dashboard/history views.
- Queues saved sessions for vault sync until they are appended to `Workout_Log.md` or exported as a sync bundle.
- Adds Voice Transcribe in Log Session, with built-in browser transcription where supported and a phone dictation fallback where it is not.
- Adds a dedicated Stats view with filters for date range, muscle, exercise, graph metric, and cable-excluded lifts.
- Adds a History view for quickly scanning old sessions and opening session details.
- Copies clean markdown for pasting back into Obsidian.
- Optionally calls a local model endpoint such as Ollama when you run the local PC version.

## Free hosting

Recommended: Cloudflare Pages.

Why:
- It can host this as a free static site.
- It supports the `_headers` file in this repo, which applies the security headers.
- The app does not need a database, server, or frontend API key.

Deploy settings:
- Build command: leave blank
- Build output directory: `/`
- Root directory: this repository folder

Friends can then open the public URL, import their own `.md` or `.txt` files, and their data stays in their own browser storage.

Step-by-step:
1. Create a GitHub repository.
2. Upload or push this folder to the repository.
3. In Cloudflare, open Workers & Pages.
4. Choose Pages, then connect the GitHub repository.
5. Set build command to blank.
6. Set output directory to `/`.
7. Deploy.
8. Share the `pages.dev` URL with friends.

Voice Transcribe requires HTTPS and microphone permission when the browser supports the Web Speech API. Hosted Cloudflare Pages URLs use HTTPS, so the browser can ask for microphone access. Chrome/Edge are the best targets for in-page transcription.

iPhone Safari does not reliably support in-page speech recognition. On iPhone, tap `Use Dictation`; the app focuses Raw Notes, then you can tap the microphone on the iOS keyboard, dictate your sets, and tap `Parse Notes`. This keeps the feature free and avoids putting transcription API keys in the frontend.

## Sync workflow

- `Save to History` saves the parsed session locally and marks it as pending.
- Pending sessions survive refreshes because they are stored in browser local storage.
- `Sync Pending to Vault` appends pending sessions to `Workout_Log.md` when the browser supports folder write access.
- `Download Sync Bundle` exports all pending sessions as markdown if folder write access is unavailable.
- Sessions are marked synced only after a successful append to `Workout_Log.md`.

For direct vault writing, use Chrome or Edge on desktop and choose the Obsidian vault folder when prompted. Phones and some browsers may not support folder write access, so use the sync bundle fallback there.

## URL without your name

The free `workers.dev` URL includes your Cloudflare account/subdomain name. To avoid that, use one of these:

- Rename/create a Cloudflare Pages project with a cleaner `*.pages.dev` project name.
- Add a custom domain or subdomain, such as `ironledger.yourdomain.com`.

Cloudflare Pages supports adding custom domains from Workers & Pages > your Pages project > Custom domains. Cloudflare Workers also supports Custom Domains, but for this static app Pages is still the cleaner fit.

## Security model

- No API keys are stored in the frontend.
- No cloud backend receives workout notes.
- Imported `.md` and `.txt` content is rendered with HTML escaping to reduce script-injection risk.
- Imported files are limited to 20 files and 2MB per file to reduce browser denial-of-service risk.
- The `_headers` file sets CSP, frame protection, referrer policy, nosniff, and restrictive browser permissions on hosts that support custom headers.
- Microphone permission is allowed only for this app's own origin.
- The hosted build blocks outbound network calls except to itself. Local AI should be used only in the local PC version.
- The hosted static app has no shared database. Many users can use the same URL at once because each user's data stays in that user's own browser storage.

Do not add OpenAI, Anthropic, Cloudflare, Firebase, Supabase, or other provider keys into `app.js`, `index.html`, or any other frontend file. If AI parsing is ever made cloud-based, it should go through a serverless function with secrets stored in provider environment variables.

## Cost

Free. It is static HTML/CSS/JS plus a tiny local Node server. No cloud database, no paid API, and no npm install.
