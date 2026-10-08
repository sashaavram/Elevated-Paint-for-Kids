import { STICKER_CATEGORIES, OUTLINES } from "./stamps.js";
import { floodFill } from "./fill.js";
import { SCENES, drawScene } from "./scenes.js";

const W = 1600;
const H = 1000;
const BRUSH_SIZES = [6, 14, 28, 48];
const STICKER_SIZES = [80, 140, 220, 320];
const MAX_UNDO = 12;
const EMOJI_FONT = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';

const PALETTE = [
  "#000000", "#5b5b5b", "#a3a3a3", "#ffffff", "#7a4a2a", "#b5651d", "#f1c27d", "#e0ac69", "#8d5524",
  "#ff3b30", "#ff9500", "#ffcc00", "#fff275", "#a8e05f", "#34c759", "#0f8a4a", "#00c7be", "#5ac8fa",
  "#007aff", "#1c3faa", "#5856d6", "#af52de", "#ff2d92", "#ff9ecb", "#c7b8ff", "#ffd6a5", "#b0e0e6",
];

const IDEAS = [
  "a smiling elephant", "a dragon eating ice cream", "a castle on a cloud", "a puppy in a race car",
  "a unicorn rainbow", "a jungle with monkeys", "a rocket going to the moon", "a cat princess",
  "a happy dinosaur", "a fire truck", "a family of ducks", "an underwater castle", "a robot with flowers",
  "a teddy bear picnic", "a giraffe wearing a hat", "a house made of candy",
];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ---------- settings (kept per browser) ----------
const settings = { sound: true, voice: true, claude: true };
try { Object.assign(settings, JSON.parse(localStorage.getItem("kidspaint.settings") || "{}")); } catch {}
function saveSettings() {
  try { localStorage.setItem("kidspaint.settings", JSON.stringify(settings)); } catch {}
}

// ---------- sounds (made on the fly, no audio files) ----------
let audio;
function sfx(kind) {
  if (!settings.sound) return;
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    const tone = (freq, start, dur, type = "sine", vol = 0.15, endFreq) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t + start);
      if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + start + dur);
      gain.gain.setValueAtTime(vol, t + start);
      gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t + start);
      osc.stop(t + start + dur + 0.02);
    };
    if (kind === "pop") tone(500, 0, 0.12, "sine", 0.2, 1100);
    else if (kind === "click") tone(800, 0, 0.05, "triangle", 0.08);
    else if (kind === "splash") { tone(300, 0, 0.25, "sine", 0.15, 90); tone(900, 0.02, 0.15, "triangle", 0.05, 300); }
    else if (kind === "magic") [660, 880, 1100, 1320].forEach((f, i) => tone(f, i * 0.08, 0.25, "sine", 0.1));
    else if (kind === "undo") tone(600, 0, 0.12, "sine", 0.1, 300);
    else if (kind === "whoosh") tone(1200, 0, 0.3, "sawtooth", 0.04, 120);
  } catch {}
}

// ---------- speech: Tux Paint style spoken labels for kids who can't read yet ----------
function say(text) {
  if (!settings.voice || !text || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.15;
  speechSynthesis.speak(u);
}

// ---------- canvases ----------
const bgCanvas = $("#bg-layer");
const paintCanvas = $("#paint-layer");
const ghostCanvas = $("#ghost-layer");
const bg = bgCanvas.getContext("2d");
const paint = paintCanvas.getContext("2d", { willReadFrequently: true });
const ghost = ghostCanvas.getContext("2d");
const wrap = $("#canvas-wrap");

const state = {
  tool: "brush",
  color: "#ff3b30",
  size: 1,
  mirror: false,
  flip: false,
  scene: "white",
  sticker: null, // { kind: "emoji" | "letter" | "image", value, name, sound, img }
  category: "pets",
};

function composite() {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.drawImage(bgCanvas, 0, 0);
  ctx.drawImage(paintCanvas, 0, 0);
  return c;
}

function setScene(id) {
  state.scene = id;
  drawScene(bg, id, W, H);
}

// ---------- undo / redo ----------
const undoStack = [];
const redoStack = [];
function snapshot() {
  return { paint: paint.getImageData(0, 0, W, H), scene: state.scene };
}
function restore(snap) {
  paint.putImageData(snap.paint, 0, 0);
  if (snap.scene !== state.scene) setScene(snap.scene);
}
function pushUndo() {
  undoStack.push(snapshot());
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack.length = 0;
  updateUndoButtons();
}
function undo() {
  if (!undoStack.length) return;
  redoStack.push(snapshot());
  restore(undoStack.pop());
  sfx("undo");
  updateUndoButtons();
  scheduleAutosave();
}
function redo() {
  if (!redoStack.length) return;
  undoStack.push(snapshot());
  restore(redoStack.pop());
  sfx("click");
  updateUndoButtons();
  scheduleAutosave();
}
function updateUndoButtons() {
  $("#btn-undo").disabled = !undoStack.length;
  $("#btn-redo").disabled = !redoStack.length;
}

// ---------- brushes ----------
let hue = 0;
const rand = (a, b) => a + Math.random() * (b - a);

function strokeSegment(ctx, x0, y0, x1, y1) {
  const size = BRUSH_SIZES[state.size];
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  switch (state.tool) {
    case "pencil":
      ctx.strokeStyle = state.color;
      ctx.lineWidth = Math.max(2, size * 0.35);
      line(ctx, x0, y0, x1, y1);
      break;
    case "brush":
      ctx.strokeStyle = state.color;
      ctx.lineWidth = size;
      line(ctx, x0, y0, x1, y1);
      break;
    case "rainbow":
      hue = (hue + 4) % 360;
      ctx.strokeStyle = `hsl(${hue} 95% 55%)`;
      ctx.lineWidth = size;
      line(ctx, x0, y0, x1, y1);
      break;
    case "eraser":
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = size * 1.6;
      line(ctx, x0, y0, x1, y1);
      break;
    case "crayon": {
      // waxy look: lots of tiny specks along the path
      ctx.fillStyle = state.color;
      const r = size / 2;
      const steps = Math.max(1, Math.hypot(x1 - x0, y1 - y0) / 2);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = x0 + (x1 - x0) * t;
        const cy = y0 + (y1 - y0) * t;
        for (let j = 0; j < r * 1.2; j++) {
          const a = rand(0, Math.PI * 2);
          const d = Math.sqrt(Math.random()) * r;
          ctx.globalAlpha = rand(0.35, 0.9);
          ctx.fillRect(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2, 2);
        }
      }
      break;
    }
    case "spray": {
      ctx.fillStyle = state.color;
      const r = size * 1.4;
      for (let i = 0; i < size * 2; i++) {
        const a = rand(0, Math.PI * 2);
        const d = Math.sqrt(Math.random()) * r;
        ctx.fillRect(x1 + Math.cos(a) * d, y1 + Math.sin(a) * d, 2, 2);
      }
      break;
    }
    case "sparkle": {
      const dist = Math.hypot(x1 - x0, y1 - y0);
      sparkleBudget += dist;
      const gap = Math.max(10, size * 0.9);
      while (sparkleBudget >= gap) {
        sparkleBudget -= gap;
        const r = rand(size * 0.3, size * 0.8) + 4;
        const sx = x1 + rand(-size, size);
        const sy = y1 + rand(-size, size);
        ctx.fillStyle = `hsl(${rand(0, 360)} 95% 60%)`;
        star(ctx, sx, sy, r);
        ctx.fillStyle = "#fff8b0";
        ctx.beginPath();
        ctx.arc(sx + rand(-r, r) * 1.5, sy + rand(-r, r) * 1.5, rand(1.5, 3.5), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
  }
  ctx.restore();
}
let sparkleBudget = 0;

function line(ctx, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function star(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.42 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fill();
}

// Draws one segment, plus its reflection when mirror magic is on.
function drawSegment(x0, y0, x1, y1) {
  strokeSegment(paint, x0, y0, x1, y1);
  if (state.mirror) strokeSegment(paint, W - x0, y0, W - x1, y1);
}

// ---------- stickers ----------
function drawSticker(ctx, sticker, x, y, flipped) {
  const size = STICKER_SIZES[state.size];
  ctx.save();
  ctx.translate(x, y);
  if (flipped) ctx.scale(-1, 1);
  if (sticker.kind === "image") {
    const img = sticker.img;
    const scale = size / Math.max(img.naturalWidth || size, img.naturalHeight || size);
    const w = (img.naturalWidth || size) * scale;
    const h = (img.naturalHeight || size) * scale;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
  } else if (sticker.kind === "letter") {
    ctx.font = `bold ${size}px "Arial Rounded MT Bold", "Comic Sans MS", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = Math.max(3, size / 22);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = state.color;
    ctx.fillText(sticker.value, 0, 0);
    ctx.strokeText(sticker.value, 0, 0);
  } else {
    ctx.font = `${size}px ${EMOJI_FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sticker.value, 0, size * 0.04);
  }
  ctx.restore();
}

function placeSticker(x, y) {
  if (!state.sticker) return;
  pushUndo();
  drawSticker(paint, state.sticker, x, y, state.flip);
  if (state.mirror) drawSticker(paint, state.sticker, W - x, y, !state.flip);
  sfx("pop");
  const s = state.sticker;
  say(s.sound ? `${s.name}! ${s.sound}` : s.name);
  scheduleAutosave();
}

function showGhost(x, y) {
  ghost.clearRect(0, 0, W, H);
  if (state.tool !== "sticker" || !state.sticker) return;
  ghost.globalAlpha = 0.55;
  drawSticker(ghost, state.sticker, x, y, state.flip);
  if (state.mirror) drawSticker(ghost, state.sticker, W - x, y, !state.flip);
  ghost.globalAlpha = 1;
}

// ---------- pointer input ----------
let drawing = null; // { id, x, y }

function toCanvas(e) {
  const r = paintCanvas.getBoundingClientRect();
  return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
}

paintCanvas.addEventListener("pointerdown", (e) => {
  if (drawing) return; // ignore a second finger
  const p = toCanvas(e);
  paintCanvas.setPointerCapture(e.pointerId);
  if (state.tool === "fill") {
    pushUndo();
    const changed = floodFill(paint, composite().getContext("2d"), p.x, p.y, state.color, W, H);
    if (changed) { sfx("splash"); scheduleAutosave(); } else undoStack.pop();
    updateUndoButtons();
    return;
  }
  if (state.tool === "sticker") {
    // Press shows where it goes, lifting your finger sticks it down: works as a tap or a drag.
    drawing = { id: e.pointerId, ...p };
    showGhost(p.x, p.y);
    return;
  }
  pushUndo();
  drawing = { id: e.pointerId, ...p };
  sparkleBudget = 60; // first sparkle appears right away
  drawSegment(p.x, p.y, p.x + 0.01, p.y);
  sparkleBudget = 0;
});

paintCanvas.addEventListener("pointermove", (e) => {
  const p = toCanvas(e);
  if (state.tool === "sticker") {
    if (!drawing && e.pointerType !== "mouse") return;
    showGhost(p.x, p.y);
    return;
  }
  if (!drawing || drawing.id !== e.pointerId) return;
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  for (const ev of events.length ? events : [e]) {
    const q = toCanvas(ev);
    drawSegment(drawing.x, drawing.y, q.x, q.y);
    drawing.x = q.x;
    drawing.y = q.y;
  }
});

function endPointer(e) {
  if (!drawing || drawing.id !== e.pointerId) return;
  if (state.tool === "sticker" && e.type === "pointerup") {
    const p = toCanvas(e);
    placeSticker(p.x, p.y);
    if (e.pointerType !== "mouse") ghost.clearRect(0, 0, W, H);
  } else if (state.tool !== "sticker") {
    scheduleAutosave();
  }
  drawing = null;
}
paintCanvas.addEventListener("pointerup", endPointer);
paintCanvas.addEventListener("pointercancel", endPointer);
paintCanvas.addEventListener("pointerleave", () => { if (!drawing) ghost.clearRect(0, 0, W, H); });

// ---------- toolbar wiring ----------
function setTool(tool) {
  state.tool = tool;
  wrap.dataset.tool = tool;
  $$(".tool").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool));
  if (tool !== "sticker") {
    $$(".sticker").forEach((b) => b.classList.remove("active"));
    ghost.clearRect(0, 0, W, H);
  }
}

function setColor(color) {
  state.color = color;
  document.documentElement.style.setProperty("--paint", color);
  $$(".swatch").forEach((s) => s.classList.toggle("active", s.dataset.color === color));
  if (state.tool === "eraser" || state.tool === "sticker" && state.sticker?.kind !== "letter") setTool("brush");
}

$$(".tool").forEach((b) => b.addEventListener("click", () => { setTool(b.dataset.tool); sfx("click"); }));
$$(".size").forEach((b) =>
  b.addEventListener("click", () => {
    state.size = Number(b.dataset.size);
    $$(".size").forEach((s) => s.classList.toggle("active", s === b));
    sfx("click");
  }),
);
$("#btn-mirror").addEventListener("click", (e) => {
  state.mirror = !state.mirror;
  e.currentTarget.setAttribute("aria-pressed", state.mirror);
  sfx("magic");
});
$("#btn-flip").addEventListener("click", (e) => {
  state.flip = !state.flip;
  e.currentTarget.setAttribute("aria-pressed", state.flip);
  sfx("click");
});

const palette = $("#palette");
for (const color of PALETTE) {
  const b = document.createElement("button");
  b.className = "swatch";
  b.style.background = color;
  b.dataset.color = color;
  b.setAttribute("aria-label", `Color ${color}`);
  b.addEventListener("click", () => { setColor(color); sfx("click"); });
  palette.append(b);
}
$("#color-picker").addEventListener("input", (e) => setColor(e.target.value));

// Every button with data-say reads its name out loud when pressed.
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-say]");
  if (el) say(el.dataset.say);
});

// ---------- sticker tray ----------
const claudeCategory = { id: "claude", icon: "🪄", name: "Claude's drawings", images: [] };
const outlineCategory = { id: "outlines", icon: "✏️", name: "Coloring shapes", images: OUTLINES.map(([name, svg]) => ({ name, svg })) };
const categories = [...STICKER_CATEGORIES, outlineCategory, claudeCategory];

try {
  claudeCategory.images = JSON.parse(localStorage.getItem("kidspaint.claude") || "[]");
} catch {}
function saveClaudeDrawings() {
  try { localStorage.setItem("kidspaint.claude", JSON.stringify(claudeCategory.images.slice(0, 16))); } catch {}
}

const svgUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function renderTabs() {
  const tabs = $("#cat-tabs");
  tabs.textContent = "";
  for (const cat of categories) {
    if (cat === claudeCategory && (!cat.images.length || !settings.claude)) continue;
    const b = document.createElement("button");
    b.className = "cat-tab" + (cat.id === state.category ? " active" : "");
    b.textContent = cat.icon;
    b.dataset.say = cat.name;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", cat.name);
    b.addEventListener("click", () => { state.category = cat.id; renderTabs(); renderStickers(); sfx("click"); });
    tabs.append(b);
  }
}

function renderStickers() {
  const strip = $("#sticker-strip");
  strip.textContent = "";
  strip.scrollLeft = 0;
  const cat = categories.find((c) => c.id === state.category) ?? categories[0];
  if (cat.images) {
    for (const item of cat.images) {
      const b = document.createElement("button");
      b.className = "sticker";
      b.setAttribute("aria-label", item.name);
      const img = document.createElement("img");
      img.src = svgUrl(item.svg);
      img.alt = "";
      b.append(img);
      b.addEventListener("click", async () => {
        selectSticker(b, { kind: "image", name: item.name, img: await loadImage(img.src) });
      });
      strip.append(b);
    }
    return;
  }
  for (const [value, name, sound] of cat.stickers) {
    const b = document.createElement("button");
    b.className = "sticker" + (cat.letters ? " letter" : "");
    b.textContent = value;
    b.setAttribute("aria-label", name);
    b.addEventListener("click", () => selectSticker(b, { kind: cat.letters ? "letter" : "emoji", value, name, sound }));
    strip.append(b);
  }
}

function selectSticker(button, sticker) {
  state.sticker = sticker;
  setTool("sticker");
  $$(".sticker").forEach((s) => s.classList.toggle("active", s === button));
  sfx("click");
  say(sticker.name);
}

// ---------- backgrounds ----------
const sceneGrid = $("#scene-grid");
for (const scene of SCENES) {
  const b = document.createElement("button");
  b.setAttribute("aria-label", scene.name);
  b.dataset.say = scene.name;
  const c = document.createElement("canvas");
  c.width = 320;
  c.height = 200;
  drawScene(c.getContext("2d"), scene.id, 320, 200);
  b.append(c);
  b.addEventListener("click", () => {
    pushUndo();
    setScene(scene.id);
    sfx("whoosh");
    $("#dlg-scene").close();
    scheduleAutosave();
  });
  sceneGrid.append(b);
}
$("#btn-scene").addEventListener("click", () => $("#dlg-scene").showModal());

// close buttons inside any dialog
$$("dialog [data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
// tapping the dimmed area outside a dialog closes it
$$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

// ---------- saving: gallery in IndexedDB, plus autosave so nothing is lost ----------
const DB_NAME = "kidspaint";
let dbPromise;
function db() {
  dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore("pictures", { keyPath: "id", autoIncrement: true });
      req.result.createObjectStore("autosave");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}
async function dbDo(store, mode, fn) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction(store, mode);
    const req = fn(tx.objectStore(store));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
  });
}
const toBlob = (canvas) => new Promise((r) => canvas.toBlob(r, "image/png"));

function isBlank() {
  const data = paint.getImageData(0, 0, W, H).data;
  for (let i = 3; i < data.length; i += 4 * 7) if (data[i]) return false;
  return state.scene === "white";
}

async function saveToGallery({ quiet = false } = {}) {
  if (isBlank()) return false;
  try {
    const blob = await toBlob(composite());
    const layer = await toBlob(paintCanvas);
    await dbDo("pictures", "readwrite", (s) => s.add({ created: Date.now(), blob, layer, scene: state.scene }));
    if (!quiet) { cheer("Saved to your gallery! ⭐"); sfx("magic"); }
    return true;
  } catch (err) {
    console.error(err);
    if (!quiet) cheer("Oops, I couldn't save that.");
    return false;
  }
}

let autosaveTimer;
function scheduleAutosave() {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(async () => {
    try {
      const layer = await toBlob(paintCanvas);
      await dbDo("autosave", "readwrite", (s) => s.put({ layer, scene: state.scene }, "current"));
    } catch {}
  }, 1200);
}

async function loadLayer(blob, scene) {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    paint.clearRect(0, 0, W, H);
    paint.drawImage(img, 0, 0);
    setScene(scene || "white");
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function restoreAutosave() {
  try {
    const saved = await dbDo("autosave", "readonly", (s) => s.get("current"));
    if (saved?.layer) await loadLayer(saved.layer, saved.scene);
  } catch {}
}

async function openGallery() {
  const grid = $("#gallery-grid");
  grid.textContent = "";
  let items = [];
  try { items = await dbDo("pictures", "readonly", (s) => s.getAll()); } catch {}
  $("#gallery-empty").hidden = items.length > 0;
  for (const item of items.reverse()) {
    const cell = document.createElement("div");
    cell.className = "gallery-item";
    const open = document.createElement("button");
    open.className = "open";
    open.setAttribute("aria-label", "Open this picture");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(item.blob);
    img.alt = "";
    open.append(img);
    open.addEventListener("click", async () => {
      pushUndo();
      await loadLayer(item.layer ?? item.blob, item.layer ? item.scene : "white");
      $("#dlg-gallery").close();
      sfx("pop");
      scheduleAutosave();
    });
    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "🗑️";
    del.setAttribute("aria-label", "Delete this picture");
    del.addEventListener("click", async () => {
      if (!del.dataset.armed) {
        // two taps to delete, so a stray tap can't throw away a masterpiece
        del.dataset.armed = "1";
        del.textContent = "❓";
        say("Tap again to throw it away");
        setTimeout(() => { delete del.dataset.armed; del.textContent = "🗑️"; }, 2500);
        return;
      }
      await dbDo("pictures", "readwrite", (s) => s.delete(item.id));
      sfx("whoosh");
      cell.remove();
      $("#gallery-empty").hidden = grid.children.length > 0;
    });
    cell.append(open, del);
    grid.append(cell);
  }
  $("#dlg-gallery").showModal();
}

// ---------- top bar ----------
$("#btn-undo").addEventListener("click", undo);
$("#btn-redo").addEventListener("click", redo);
$("#btn-save").addEventListener("click", () => saveToGallery());
$("#btn-gallery").addEventListener("click", openGallery);
$("#btn-new").addEventListener("click", () => $("#dlg-new").showModal());
$("#btn-new-yes").addEventListener("click", async () => {
  await saveToGallery({ quiet: true });
  paint.clearRect(0, 0, W, H);
  setScene("white");
  undoStack.length = 0;
  redoStack.length = 0;
  updateUndoButtons();
  $("#dlg-new").close();
  sfx("whoosh");
  scheduleAutosave();
});
$("#btn-download").addEventListener("click", () => {
  const a = document.createElement("a");
  a.download = `my-picture-${new Date().toISOString().slice(0, 10)}.png`;
  a.href = composite().toDataURL("image/png");
  a.click();
  sfx("pop");
});
$("#btn-print").addEventListener("click", () => {
  const img = $("#print-img");
  img.onload = () => window.print();
  img.src = composite().toDataURL("image/png");
});
function renderSoundButton() {
  $("#btn-sound").textContent = settings.sound ? "🔊" : "🔇";
}
$("#btn-sound").addEventListener("click", () => {
  settings.sound = !settings.sound;
  settings.voice = settings.sound;
  saveSettings();
  renderSoundButton();
  sfx("click");
});

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
});

// ---------- grown-up settings: press and hold for 2 seconds (a simple parental gate) ----------
const parentBtn = $("#btn-parent");
let holdTimer;
function startHold(e) {
  e.preventDefault();
  parentBtn.classList.add("holding");
  holdTimer = setTimeout(() => {
    parentBtn.classList.remove("holding");
    openParent();
  }, 2000);
}
function stopHold() {
  clearTimeout(holdTimer);
  parentBtn.classList.remove("holding");
}
parentBtn.addEventListener("pointerdown", startHold);
parentBtn.addEventListener("pointerup", stopHold);
parentBtn.addEventListener("pointerleave", stopHold);
parentBtn.addEventListener("contextmenu", (e) => e.preventDefault());

function openParent() {
  $("#set-sound").checked = settings.sound;
  $("#set-voice").checked = settings.voice;
  $("#set-claude").checked = settings.claude;
  $("#claude-status").textContent = claudeReady
    ? "✅ Claude is connected."
    : "💤 Claude isn't connected: start the server with ANTHROPIC_API_KEY set (see README).";
  $("#dlg-parent").showModal();
}
for (const key of ["sound", "voice", "claude"]) {
  $(`#set-${key}`).addEventListener("change", (e) => {
    settings[key] = e.target.checked;
    saveSettings();
    renderSoundButton();
    applyClaudeVisibility();
  });
}

// ---------- Ask Claude to draw ----------
let claudeReady = false;
let lastSvg = null;
const dlgClaude = $("#dlg-claude");
const promptInput = $("#claude-prompt");
const claudeMsg = $("#claude-msg");

function applyClaudeVisibility() {
  $(".claude-group").hidden = !settings.claude;
  renderTabs();
}

fetch("/api/status")
  .then((r) => r.json())
  .then((s) => { claudeReady = Boolean(s.claude); })
  .catch(() => { claudeReady = false; });

function renderIdeas() {
  const box = $("#claude-ideas");
  box.textContent = "";
  const picks = [...IDEAS].sort(() => Math.random() - 0.5).slice(0, 5);
  for (const idea of picks) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "idea";
    b.textContent = idea;
    b.addEventListener("click", () => { promptInput.value = idea; say(idea); });
    box.append(b);
  }
}

$("#btn-claude").addEventListener("click", () => {
  renderIdeas();
  $("#claude-result").hidden = true;
  $("#btn-claude-use").hidden = true;
  claudeMsg.textContent = claudeReady ? "" : "Claude is sleeping right now. Ask a grown-up to set it up!";
  dlgClaude.showModal();
  promptInput.focus();
});
$("#btn-claude-cancel").addEventListener("click", () => dlgClaude.close());
$("#claude-form").addEventListener("submit", (e) => { e.preventDefault(); askClaude(); });
promptInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); askClaude(); } });
$("#btn-claude-go").addEventListener("click", askClaude);

const THINKING = ["Claude is drawing", "Sharpening crayons", "Adding colors", "Almost there"];

async function askClaude() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    claudeMsg.textContent = "Type or say what you want to see!";
    say("What should I draw?");
    return;
  }
  const go = $("#btn-claude-go");
  go.disabled = true;
  $("#btn-claude-use").hidden = true;
  claudeMsg.classList.add("thinking");
  let i = 0;
  claudeMsg.textContent = THINKING[0];
  say("Okay! Let me draw " + prompt);
  const ticker = setInterval(() => { claudeMsg.textContent = THINKING[++i % THINKING.length]; }, 2500);
  try {
    const coloring = new FormData($("#claude-form")).get("mode") === "coloring";
    const res = await fetch("/api/draw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, coloring }),
    });
    const data = await res.json().catch(() => ({}));
    if (!data.svg) throw new Error(data.kidMessage || "Oops, something went wrong. Try again!");
    lastSvg = { svg: data.svg, name: prompt };
    $("#claude-img").src = svgUrl(data.svg);
    $("#claude-img").alt = prompt;
    $("#claude-result").hidden = false;
    $("#btn-claude-use").hidden = false;
    claudeMsg.textContent = "Ta-da! 🎉";
    sfx("magic");
    say("Ta da! Here is " + prompt);
  } catch (err) {
    claudeMsg.textContent = err.message;
    say(err.message);
  } finally {
    clearInterval(ticker);
    claudeMsg.classList.remove("thinking");
    go.disabled = false;
  }
}

$("#btn-claude-use").addEventListener("click", async () => {
  if (!lastSvg) return;
  claudeCategory.images = [lastSvg, ...claudeCategory.images.filter((x) => x.svg !== lastSvg.svg)].slice(0, 16);
  saveClaudeDrawings();
  state.category = "claude";
  renderTabs();
  renderStickers();
  const img = await loadImage(svgUrl(lastSvg.svg));
  state.size = Math.max(state.size, 2);
  $$(".size").forEach((s) => s.classList.toggle("active", Number(s.dataset.size) === state.size));
  selectSticker($("#sticker-strip .sticker"), { kind: "image", name: lastSvg.name, img });
  dlgClaude.close();
  cheer("Tap your picture to put it there! 👆");
});

// Talking instead of typing: most young kids can't type yet.
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const micBtn = $("#btn-mic");
if (!Recognition) micBtn.hidden = true;
else {
  micBtn.addEventListener("click", () => {
    const rec = new Recognition();
    rec.lang = navigator.language || "en-US";
    rec.interimResults = true;
    micBtn.classList.add("listening");
    rec.onresult = (e) => { promptInput.value = [...e.results].map((r) => r[0].transcript).join(" "); };
    rec.onend = () => micBtn.classList.remove("listening");
    rec.onerror = () => micBtn.classList.remove("listening");
    rec.start();
  });
}

// ---------- little helpers ----------
let cheerTimer;
function cheer(text) {
  const el = $("#cheer");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(cheerTimer);
  cheerTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

// ---------- start ----------
setScene("white");
setColor(state.color);
setTool("brush");
renderSoundButton();
applyClaudeVisibility();
renderStickers();
updateUndoButtons();
restoreAutosave();
