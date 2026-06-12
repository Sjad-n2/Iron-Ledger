import { onRequest as handleApiRequest } from "./functions/api/[[path]].js";

const BLOCKED_ASSET_PATHS = [
  /^\/functions\//i,
  /^\/tests\//i,
  /^\/\.git/i,
  /^\/schema\.sql$/i,
  /^\/wrangler/i,
  /^\/worker\.js$/i,
  /^\/server\.js$/i,
  /^\/SECURITY\.md$/i,
  /^\/README\.md$/i
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApiRequest({ request, env, ctx });
    }

    if (BLOCKED_ASSET_PATHS.some((pattern) => pattern.test(url.pathname))) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
