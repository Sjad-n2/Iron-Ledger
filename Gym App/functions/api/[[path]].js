const DB_BINDING = "IRON_LEDGER_DB";
const SESSION_COOKIE = "iron_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 210000;
const MAX_JSON_BYTES = 260000;
const MAX_MARKDOWN_CHARS = 200000;
const MAX_ROWS = 300;

const encoder = new TextEncoder();

export async function onRequest(context) {
  try {
    if (!context.env[DB_BINDING]) {
      return json({ error: "Database binding IRON_LEDGER_DB is not configured." }, 503);
    }

    const unsafe = !["GET", "HEAD", "OPTIONS"].includes(context.request.method);
    if (unsafe && !isSameOrigin(context.request)) {
      return json({ error: "Request origin was rejected." }, 403);
    }

    const url = new URL(context.request.url);
    const path = url.pathname.replace(/^\/api\/?/, "");

    if (context.request.method === "OPTIONS") return new Response(null, { status: 204 });
    if (context.request.method === "GET" && path === "me") return handleMe(context);
    if (context.request.method === "POST" && path === "auth/register") return handleRegister(context);
    if (context.request.method === "POST" && path === "auth/login") return handleLogin(context);
    if (context.request.method === "POST" && path === "auth/logout") return handleLogout(context);
    if (context.request.method === "GET" && path === "sessions") return handleListSessions(context);
    if (context.request.method === "POST" && path === "sessions") return handleSaveSession(context);
    if (context.request.method === "DELETE" && path.startsWith("sessions/")) {
      return handleDeleteSession(context, decodeURIComponent(path.slice("sessions/".length)));
    }

    return json({ error: "Not found." }, 404);
  } catch (error) {
    return json({ error: error.publicMessage || "Server error." }, error.status || 500);
  }
}

function json(data, status = 200, extraHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}

function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}

async function readJson(request) {
  const text = await request.text();
  if (text.length > MAX_JSON_BYTES) throw publicError("Request is too large.", 413);
  try {
    return JSON.parse(text || "{}");
  } catch {
    throw publicError("Invalid JSON.", 400);
  }
}

function publicError(message, status = 400) {
  const error = new Error(message);
  error.publicMessage = message;
  error.status = status;
  return error;
}

function normaliseEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function validatePassword(password) {
  return typeof password === "string" && password.length >= 10 && password.length <= 256;
}

function toBase64Url(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return toBase64Url(new Uint8Array(digest));
}

async function passwordHash(password, salt, iterations = PASSWORD_ITERATIONS) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    256
  );
  return toBase64Url(new Uint8Array(bits));
}

async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    salt: toBase64Url(salt),
    hash: await passwordHash(password, salt),
    iterations: PASSWORD_ITERATIONS
  };
}

async function verifyPassword(password, user) {
  const salt = fromBase64Url(user.password_salt);
  const hash = await passwordHash(password, salt, user.password_iterations || PASSWORD_ITERATIONS);
  return timingSafeEqual(hash, user.password_hash);
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  let diff = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    diff |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0);
  }
  return diff === 0;
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.get("Cookie") || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function sessionCookie(token) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function expiredSessionCookie() {
  return `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function publicUser(user) {
  return { id: user.id, email: user.email };
}

async function createSession(env, user, request) {
  const token = toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
  const tokenHash = await sha256(token);
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
  await env[DB_BINDING]
    .prepare(
      `INSERT INTO auth_sessions (id, user_id, token_hash, user_agent_hash, created_at, expires_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    )
    .bind(
      crypto.randomUUID(),
      user.id,
      tokenHash,
      await sha256(request.headers.get("User-Agent") || ""),
      now.toISOString(),
      expires.toISOString()
    )
    .run();
  return token;
}

async function currentUser(context) {
  const token = parseCookies(context.request)[SESSION_COOKIE];
  if (!token) return null;
  const tokenHash = await sha256(token);
  const record = await context.env[DB_BINDING]
    .prepare(
      `SELECT users.id, users.email
       FROM auth_sessions
       JOIN users ON users.id = auth_sessions.user_id
       WHERE auth_sessions.token_hash = ?1 AND auth_sessions.expires_at > ?2`
    )
    .bind(tokenHash, new Date().toISOString())
    .first();
  return record || null;
}

async function requireUser(context) {
  const user = await currentUser(context);
  if (!user) throw publicError("Sign in required.", 401);
  return user;
}

function rateLimitKey(context, email) {
  const ip = context.request.headers.get("CF-Connecting-IP") || "unknown";
  return `login:${email}:${ip}`;
}

async function registerAttempt(context, email) {
  const key = rateLimitKey(context, email);
  const now = Date.now();
  const resetAt = now + 15 * 60 * 1000;
  const existing = await context.env[DB_BINDING].prepare("SELECT count, reset_at FROM auth_attempts WHERE id = ?1").bind(key).first();
  if (!existing || existing.reset_at <= now) {
    await context.env[DB_BINDING]
      .prepare("INSERT OR REPLACE INTO auth_attempts (id, count, reset_at) VALUES (?1, 1, ?2)")
      .bind(key, resetAt)
      .run();
    return;
  }
  if (existing.count >= 8) throw publicError("Too many attempts. Try again later.", 429);
  await context.env[DB_BINDING].prepare("UPDATE auth_attempts SET count = count + 1 WHERE id = ?1").bind(key).run();
}

async function clearAttempts(context, email) {
  await context.env[DB_BINDING].prepare("DELETE FROM auth_attempts WHERE id = ?1").bind(rateLimitKey(context, email)).run();
}

async function handleMe(context) {
  return json({ user: await currentUser(context) });
}

async function handleRegister(context) {
  const body = await readJson(context.request);
  const email = normaliseEmail(body.email);
  const password = String(body.password || "");
  if (!validateEmail(email)) throw publicError("Enter a valid email address.");
  if (!validatePassword(password)) throw publicError("Use a password with at least 10 characters.");

  const existing = await context.env[DB_BINDING].prepare("SELECT id FROM users WHERE email = ?1").bind(email).first();
  if (existing) throw publicError("An account already exists for that email.", 409);

  const passwordRecord = await createPasswordRecord(password);
  const user = { id: crypto.randomUUID(), email };
  const now = new Date().toISOString();
  await context.env[DB_BINDING]
    .prepare(
      `INSERT INTO users (id, email, password_hash, password_salt, password_iterations, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)`
    )
    .bind(user.id, email, passwordRecord.hash, passwordRecord.salt, passwordRecord.iterations, now)
    .run();
  const token = await createSession(context.env, user, context.request);
  return json({ user: publicUser(user) }, 201, { "Set-Cookie": sessionCookie(token) });
}

async function handleLogin(context) {
  const body = await readJson(context.request);
  const email = normaliseEmail(body.email);
  const password = String(body.password || "");
  if (!validateEmail(email) || !password) throw publicError("Email or password is incorrect.", 401);
  await registerAttempt(context, email);

  const user = await context.env[DB_BINDING].prepare("SELECT * FROM users WHERE email = ?1").bind(email).first();
  if (!user || !(await verifyPassword(password, user))) {
    throw publicError("Email or password is incorrect.", 401);
  }

  await clearAttempts(context, email);
  const token = await createSession(context.env, user, context.request);
  return json({ user: publicUser(user) }, 200, { "Set-Cookie": sessionCookie(token) });
}

async function handleLogout(context) {
  const token = parseCookies(context.request)[SESSION_COOKIE];
  if (token) {
    await context.env[DB_BINDING].prepare("DELETE FROM auth_sessions WHERE token_hash = ?1").bind(await sha256(token)).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": expiredSessionCookie() });
}

async function handleListSessions(context) {
  const user = await requireUser(context);
  const result = await context.env[DB_BINDING]
    .prepare(
      `SELECT id, client_id, session_date, name, markdown, rows_json, created_at, updated_at
       FROM workout_sessions
       WHERE user_id = ?1
       ORDER BY session_date DESC, updated_at DESC`
    )
    .bind(user.id)
    .all();
  return json({ sessions: result.results || [] });
}

function cleanSessionPayload(body) {
  const date = String(body.date || "");
  const name = String(body.name || "Workout").trim().slice(0, 90) || "Workout";
  const markdown = String(body.markdown || "").slice(0, MAX_MARKDOWN_CHARS);
  const rows = Array.isArray(body.rows) ? body.rows.slice(0, MAX_ROWS) : [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw publicError("Session date is invalid.");
  return {
    clientId: String(body.clientId || "").slice(0, 120) || null,
    date,
    name,
    markdown,
    rowsJson: JSON.stringify(rows)
  };
}

async function handleSaveSession(context) {
  const user = await requireUser(context);
  const session = cleanSessionPayload(await readJson(context.request));
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await context.env[DB_BINDING]
    .prepare(
      `INSERT INTO workout_sessions (id, user_id, client_id, session_date, name, markdown, rows_json, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?8)
       ON CONFLICT(user_id, client_id) DO UPDATE SET
         session_date = excluded.session_date,
         name = excluded.name,
         markdown = excluded.markdown,
         rows_json = excluded.rows_json,
         updated_at = excluded.updated_at`
    )
    .bind(id, user.id, session.clientId, session.date, session.name, session.markdown, session.rowsJson, now)
    .run();
  const saved = session.clientId
    ? await context.env[DB_BINDING]
        .prepare(
          `SELECT id, client_id, session_date, name, markdown, rows_json, created_at, updated_at
           FROM workout_sessions WHERE user_id = ?1 AND client_id = ?2`
        )
        .bind(user.id, session.clientId)
        .first()
    : await context.env[DB_BINDING]
        .prepare(
          `SELECT id, client_id, session_date, name, markdown, rows_json, created_at, updated_at
           FROM workout_sessions WHERE user_id = ?1 AND id = ?2`
        )
        .bind(user.id, id)
        .first();
  return json({ session: saved }, 201);
}

async function handleDeleteSession(context, sessionId) {
  const user = await requireUser(context);
  if (!/^[a-f0-9-]{20,}$/i.test(sessionId)) throw publicError("Session id is invalid.");
  await context.env[DB_BINDING]
    .prepare("DELETE FROM workout_sessions WHERE id = ?1 AND user_id = ?2")
    .bind(sessionId, user.id)
    .run();
  return json({ ok: true });
}
