// Backgrounds drawn with code, so they look sharp at any size.

export const SCENES = [
  { id: "white", name: "Plain paper" },
  { id: "meadow", name: "Sunny meadow" },
  { id: "jungle", name: "Jungle" },
  { id: "ocean", name: "Under the sea" },
  { id: "beach", name: "Beach" },
  { id: "night", name: "Night sky" },
  { id: "snow", name: "Snowy day" },
  { id: "road", name: "Road for cars" },
];

function gradient(ctx, h, stops, y0 = 0, y1 = h) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  stops.forEach(([at, c]) => g.addColorStop(at, c));
  return g;
}

function hills(ctx, w, h, baseY, amp, color, phase = 0) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += w / 60) ctx.lineTo(x, baseY + Math.sin(x / w * Math.PI * 2.2 + phase) * amp);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

// Seeded random so a scene looks the same each time it's drawn.
function seeded(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

export function drawScene(ctx, id, w, h) {
  ctx.save();
  ctx.clearRect(0, 0, w, h);
  const rnd = seeded(42);
  const s = w / 1600;
  switch (id) {
    case "meadow":
      ctx.fillStyle = gradient(ctx, h, [[0, "#8fd3ff"], [1, "#d8f1ff"]]);
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ffe066";
      ctx.beginPath(); ctx.arc(w * 0.85, h * 0.18, 70 * s, 0, Math.PI * 2); ctx.fill();
      hills(ctx, w, h, h * 0.62, h * 0.04, "#9be37a", 0.5);
      hills(ctx, w, h, h * 0.72, h * 0.03, "#6cc551", 2);
      break;
    case "jungle":
      ctx.fillStyle = gradient(ctx, h, [[0, "#bff0c8"], [1, "#e9ffe0"]]);
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 14; i++) {
        const x = rnd() * w, y = rnd() * h * 0.5, r = (60 + rnd() * 90) * s;
        ctx.fillStyle = i % 2 ? "#3fa34d" : "#2d7d3a";
        ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.5, rnd() * Math.PI, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = "#2d7d3a"; ctx.lineWidth = 6 * s;
      for (let i = 0; i < 6; i++) {
        const x = (i + 0.5) * w / 6;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.quadraticCurveTo(x + 40 * s, h * 0.2, x - 10 * s, h * 0.35 + rnd() * h * 0.1); ctx.stroke();
      }
      hills(ctx, w, h, h * 0.78, h * 0.02, "#5a8f3c", 1);
      break;
    case "ocean":
      ctx.fillStyle = gradient(ctx, h, [[0, "#5fd0ff"], [1, "#0a4c8c"]]);
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let i = 0; i < 26; i++) {
        ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h * 0.8, (4 + rnd() * 12) * s, 0, Math.PI * 2); ctx.fill();
      }
      hills(ctx, w, h, h * 0.88, h * 0.02, "#f3d58a", 0);
      break;
    case "beach":
      ctx.fillStyle = gradient(ctx, h, [[0, "#9fe2ff"], [1, "#e6f7ff"]], 0, h * 0.5);
      ctx.fillRect(0, 0, w, h * 0.5);
      ctx.fillStyle = "#2fa7d8"; ctx.fillRect(0, h * 0.5, w, h * 0.18);
      hills(ctx, w, h, h * 0.68, h * 0.015, "#f6dc93", 1.3);
      ctx.fillStyle = "#ffd23f";
      ctx.beginPath(); ctx.arc(w * 0.15, h * 0.16, 60 * s, 0, Math.PI * 2); ctx.fill();
      break;
    case "night":
      ctx.fillStyle = gradient(ctx, h, [[0, "#0b1340"], [1, "#3b2a78"]]);
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 90; i++) {
        ctx.globalAlpha = 0.4 + rnd() * 0.6;
        ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h * 0.75, (1 + rnd() * 2.5) * s, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fff3b0";
      ctx.beginPath(); ctx.arc(w * 0.82, h * 0.2, 60 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1f52";
      ctx.beginPath(); ctx.arc(w * 0.82 + 26 * s, h * 0.2 - 14 * s, 54 * s, 0, Math.PI * 2); ctx.fill();
      hills(ctx, w, h, h * 0.85, h * 0.03, "#1a1f52", 0.7);
      break;
    case "snow":
      ctx.fillStyle = gradient(ctx, h, [[0, "#b9d7ef"], [1, "#eef6ff"]]);
      ctx.fillRect(0, 0, w, h);
      hills(ctx, w, h, h * 0.66, h * 0.05, "#ffffff", 1);
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 70; i++) {
        ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h * 0.7, (2 + rnd() * 4) * s, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case "road":
      ctx.fillStyle = gradient(ctx, h, [[0, "#9fdcff"], [1, "#dff4ff"]], 0, h * 0.55);
      ctx.fillRect(0, 0, w, h * 0.55);
      ctx.fillStyle = "#7cc95a"; ctx.fillRect(0, h * 0.55, w, h * 0.45);
      ctx.fillStyle = "#555b66"; ctx.fillRect(0, h * 0.7, w, h * 0.2);
      ctx.fillStyle = "#ffd60a";
      for (let x = 20 * s; x < w; x += 140 * s) ctx.fillRect(x, h * 0.795, 80 * s, 10 * s);
      break;
    default:
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
  }
  ctx.restore();
}
