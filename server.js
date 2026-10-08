import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { drawWithClaude, hasCredentials, MAX_PROMPT_CHARS, MODEL } from "./lib/draw.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(here, "public");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

// A tiny per-address limit so one excited kid can't run up the bill.
const DRAWS_PER_MINUTE = Number(process.env.DRAWS_PER_MINUTE) || 6;
const recentDraws = new Map();
function allowDraw(ip) {
  const now = Date.now();
  const times = (recentDraws.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (times.length >= DRAWS_PER_MINUTE) {
    recentDraws.set(ip, times);
    return false;
  }
  times.push(now);
  recentDraws.set(ip, times);
  return true;
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function readJson(req, limit = 4096) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > limit) throw new Error("too large");
  }
  return JSON.parse(body || "{}");
}

async function handleDraw(req, res) {
  if (!hasCredentials()) {
    return sendJson(res, 503, {
      error: "no_key",
      kidMessage: "Claude is sleeping right now. Ask a grown-up to set it up!",
    });
  }
  if (!allowDraw(req.socket.remoteAddress)) {
    return sendJson(res, 429, { error: "slow_down", kidMessage: "Wow, so many ideas! Let's wait a minute." });
  }

  let payload;
  try {
    payload = await readJson(req);
  } catch {
    return sendJson(res, 400, { error: "bad_request", kidMessage: "Hmm, I didn't hear that. Try again!" });
  }
  const prompt = typeof payload.prompt === "string" ? payload.prompt.slice(0, MAX_PROMPT_CHARS) : "";

  try {
    const result = await drawWithClaude(prompt, { coloring: Boolean(payload.coloring) });
    return sendJson(res, result.svg ? 200 : 422, result);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return sendJson(res, 429, { error: "rate_limited", kidMessage: "Claude is busy. Let's try again soon!" });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Claude API key was rejected:", err.message);
      return sendJson(res, 503, { error: "bad_key", kidMessage: "Claude is sleeping right now. Ask a grown-up!" });
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Claude API error ${err.status}:`, err.message);
    } else {
      console.error("Drawing failed:", err);
    }
    return sendJson(res, 502, { error: "api_error", kidMessage: "Oops, something went wrong. Try again!" });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  const relative = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const file = path.normalize(path.join(PUBLIC_DIR, relative));
  if (!file.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
  }
}

export const server = http.createServer(async (req, res) => {
  if (req.url === "/api/status" && req.method === "GET") {
    return sendJson(res, 200, { claude: hasCredentials() });
  }
  if (req.url === "/api/draw" && req.method === "POST") return handleDraw(req, res);
  if (req.method === "GET" || req.method === "HEAD") return serveStatic(req, res);
  res.writeHead(405).end();
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, HOST, () => {
    console.log(`Elevated Paint for Kids is running at http://localhost:${PORT}`);
    console.log(hasCredentials()
      ? `"Ask Claude to draw" is on (model: ${MODEL}).`
      : `"Ask Claude to draw" is off: set ANTHROPIC_API_KEY to turn it on.`);
  });
}
