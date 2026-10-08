# Elevated Paint for Kids

A paint app for kids, laid out like Windows Paint. It runs in the browser (Edge or Chrome). Where Paint has its **Shapes** box, this app has a **Stickers** tray: farm and jungle animals, wild animals, ocean animals, dinosaurs, houses, dolls and toys, cars, nature, food, and letters. It also has an **Ask Claude to draw** button.

## Features

| Area | What kids get |
|---|---|
| **Stickers** (the old Shapes spot) | 202 color stickers in 10 groups plus 36 letters and numbers: pets & farm, jungle, wild & forest, ocean, dinosaurs & magic, houses & places, dolls/toys/people, cars & vehicles, nature & sky, food, plus ABC 123. The ✏️ tab has 20 **coloring shapes** (house, castle, car, bus, cat, dog, elephant, owl…) drawn as closed outlines for the paint bucket. |
| **Ask Claude to draw** | Type or **say** an idea (🎤 uses the browser's speech input). Choose a *color picture* or a *coloring page*, preview it, then tap to place it like a sticker. Claude's drawings are kept in a 🪄 sticker tab. |
| **Brushes** | Pencil, paint brush, crayon, spray, 🌈 rainbow, ✨ sparkle, paint bucket, eraser; four sizes |
| **Magic** | 🦋 Mirror mode (draws both halves), 🔁 flip sticker, 🏞️ 8 backgrounds (meadow, jungle, under the sea, beach, night, snow, road) |
| **Safety nets** | Undo/redo, saves itself after every change, "start over?" asks first and saves to the gallery, deleting a gallery picture takes two taps |
| **Gallery & sharing** | 💾 save to an in-browser gallery, ⬇️ download PNG, 🖨️ print (coloring pages!) |
| **Pre-readers** | Big icon buttons; buttons and stickers are read out loud (“Lion! Roar!”); sound effects made in the browser, no audio files |
| **Grown-up settings** | Press and **hold ⚙️ for 2 seconds**: sounds, voice, show/hide Claude |

## Run it

1. Install [Node.js](https://nodejs.org) 18 or newer.
2. Windows: double-click `start-windows.bat`. Any OS:
   ```bash
   npm install
   npm start          # http://localhost:3000
   ```
3. To turn on **Ask Claude to draw**, set an [Anthropic API key](https://console.anthropic.com/) before starting:
   ```powershell
   $env:ANTHROPIC_API_KEY = "sk-ant-..."   # PowerShell
   npm start
   ```
   With no key, the app still works and the Claude button says Claude is sleeping.

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | unset | Turns on Claude drawing |
| `CLAUDE_MODEL` | `claude-opus-5-5` | Model used for drawings |
| `DRAWS_PER_MINUTE` | `6` | Per-device limit to keep costs down |
| `PORT` / `HOST` | `3000` / `127.0.0.1` | Where the server listens (local only by default) |

## How "Ask Claude to draw" works

The browser sends only the kid's short idea (200 characters max) to the local server at `POST /api/draw`. The server keeps the API key and calls Claude with a children's-illustrator system prompt. The prompt asks for gentle, age-appropriate pictures. If a request isn't suitable, Claude draws a friendly alternative instead of explaining why. Claude replies with an SVG. The server removes scripts, event handlers, embedded images and outside links before returning it, and the page only shows it through `<img>`, where scripts can't run.

Requests use low effort to keep the wait short, and they turn on Anthropic's server-side `fallbacks: "default"`. If a safety check declines a request, it is retried on Anthropic's recommended fallback model.

## Develop

```bash
npm test     # SVG cleaning + paint-bucket tests
```

Files: `server.js` (static files + API), `lib/draw.js` (Claude call), `lib/svg.js` (SVG cleaning), `public/` (the app: `app.js`, `stamps.js`, `fill.js`, `scenes.js`, `styles.css`).

## Research behind the kid features

- [Tux Paint](https://tuxpaint.org/features/), an open-source kids' paint program [built for children as young as 3](https://en.wikipedia.org/wiki/Tux_Paint), uses icons, audible feedback, text hints, categorized stamps with sound, and "magic" tools. This app borrows the spoken labels, sticker sounds, and magic brushes.
- Children under 5 [can't use drag-and-drop reliably](https://init.cise.ufl.edu/?p=2440) (UF INIT Lab). Stickers here are placed with a **tap**, and dragging is optional.
- Preschool app guidance recommends [big, image-only buttons and an always-available way back](https://arxiv.org/pdf/1606.05753), which is why there is one-tap undo.
- Touch-target standards range from ~7 mm to ~9.5 mm for adults (ANSI/HFES 100-2007). I found no child-specific number, so buttons here are 46–56 px.
