// Keeps the app working without internet (everything except "Ask Claude to draw").
const CACHE = "kidspaint-v9";
const FILES = [
  "./", "index.html", "styles.css", "app.js", "stamps.js", "art.js", "magic.js", "fill.js", "scenes.js",
  "manifest.webmanifest", "icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Newest version first, so updates show up right away. If the internet doesn't answer
// within 3 seconds (a plane's Wi-Fi without internet, a weak signal), use the saved copy.
const WAIT_MS = 3000;

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.includes("/api/")) return;
  e.respondWith(fromNetworkOrSaved(e));
});

async function fromNetworkOrSaved(e) {
  const saved = await caches.match(e.request, { ignoreSearch: true });
  const network = fetch(e.request).then((res) => {
    // Keep only real answers from this site (not a Wi-Fi login page it was redirected to).
    if (res.ok && !res.redirected) {
      const copy = res.clone();
      e.waitUntil(caches.open(CACHE).then((cache) => cache.put(e.request, copy)));
    }
    return res;
  });
  if (!saved) return network;
  const timeout = new Promise((resolve) => setTimeout(() => resolve(saved), WAIT_MS));
  return Promise.race([network.catch(() => saved), timeout]);
}
