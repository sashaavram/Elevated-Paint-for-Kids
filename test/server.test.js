import { test, before, after } from "node:test";
import assert from "node:assert/strict";

// Set up before the server module reads its settings.
process.env.FAMILY_CODE = "rainbow";
process.env.ANTHROPIC_API_KEY = "sk-ant-test-not-real";
const { server } = await import("../server.js");

let base;
before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const draw = (headers = {}) =>
  fetch(`${base}/api/draw`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: '{"prompt":"a cat"}' });

test("status says a family code is needed", async () => {
  const res = await fetch(`${base}/api/status`);
  assert.deepEqual(await res.json(), { claude: true, needsCode: true });
});

test("drawing without the passcode is refused before calling Claude", async () => {
  assert.equal((await draw()).status, 401);
  assert.equal((await draw({ "X-Family-Code": "wrong" })).status, 401);
});

test("static files are served with safety headers, and paths can't escape public/", async () => {
  const res = await fetch(`${base}/`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-security-policy"), /default-src 'self'/);
  assert.equal((await fetch(`${base}/..%2fserver.js`)).status, 403);
});

test("too many wrong passcodes locks drawing, even for the right code", async () => {
  for (let i = 0; i < 3; i++) await draw({ "X-Family-Code": "guess" + i });
  const res = await draw({ "X-Family-Code": "rainbow" });
  assert.equal(res.status, 429);
  assert.equal((await res.json()).error, "locked");
});
