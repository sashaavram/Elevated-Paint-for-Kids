# Elevated Paint for Kids

A paint app for 3–5 year olds, laid out like Windows Paint. It runs in the browser (Safari on iPad, Edge or Chrome on Windows), and you can install it as an app. Where Paint has its **Shapes** box, this app has a **Stickers** tray: farm and jungle animals, wild animals, ocean animals, dinosaurs, houses, dolls and toys, cars, nature, food, and letters. It also has an **Ask Claude to draw** button.

## Made for ages 3–5

- **Few, big buttons.** 6 tools, 3 sizes and 12 colors, with buttons 52–62 px wide (about 10 mm on an iPad). Grown-ups can switch on *More tools and colors* (pencil, spray, all 27 colors, color mixer) for older kids.
- **Paint Pals ⭐**: 28 custom stickers drawn for this app in one matching style (lion, elephant, giraffe, monkey, cat, dog, doll, car, fire truck, castle, rocket…). Each one also has a **coloring version ✏️** with black lines and white insides for the paint bucket.
- **202 emoji stickers** in 10 groups (pets & farm, jungle, wild, ocean, dinosaurs & magic, houses, dolls & toys, cars, nature, food), plus ABC 123.
- **Tap to place.** Tap a sticker, then tap the picture. Dragging is optional, because children under 5 struggle with drag-and-drop.
- **Talks.** Buttons and stickers say their names and sounds ("Lion! Roar!"). If you add your child's name in settings, the app greets them.
- **Hard to break.** One-tap undo, autosave, "start over?" saves to the gallery first, deleting a gallery picture takes two taps, and pinch-zoom can't move the app.
- **Magic.** Rainbow and sparkle brushes, 🦋 mirror painting, 🏞️ 8 backgrounds.
- **🪄 Ask Claude to draw.** Type, tap an idea, or talk (🎤 in Safari or Edge). Choose a color picture or a coloring page, then tap to place it.
- **Grown-up passcode on every Claude drawing.** A number keypad appears each time, so kids can't spend Claude credit alone. Five wrong tries lock drawing for 15 minutes.
- **Grown-up settings.** Press and **hold ⚙️ for 2 seconds**: sounds, voice, Claude on/off, more tools, child's name.

## The link (GitHub Pages)

**https://sashaavram.github.io/Elevated-Paint-for-Kids/**

GitHub publishes the app here automatically every time the code changes (`.github/workflows/pages.yml`). Everything works there **except "Ask Claude to draw"**: GitHub Pages can only show files, so it can't keep a Claude key secret or check the passcode, and the Claude button hides itself. To add Claude drawing, use the Render setup below and open the Render link instead.

## Use it on an iPad with Claude drawing (Render)

The iPad only needs a link, but something has to run the small server that keeps your Claude key private. The easiest host is [Render](https://render.com):

1. Create a free Render account and connect GitHub.
2. **New + → Blueprint →** pick this repository. Render reads `render.yaml`.
3. When asked, paste your `ANTHROPIC_API_KEY`, and type your passcode as `FAMILY_CODE`. It stays in Render's settings, never in the code on GitHub.
4. Open the `https://….onrender.com` link on the iPad in Safari.
5. Optional: **Share → Add to Home Screen** for a full-screen app icon. Voice input (🎤) only works in Safari itself, not from the Home Screen icon (an Apple limitation).

The free Render plan sleeps after about 15 minutes without visitors, so the first visit afterwards takes about a minute. A paid plan stays awake.

## Use it on Windows (installable app)

1. Install [Node.js](https://nodejs.org) 18 or newer.
2. Put your key and passcode in `start-windows.bat` (see the comments inside), then double-click it. The app opens at http://localhost:3000.
3. In Edge, click **⋯ → Apps → Install this site as an app**. You get a Start-menu app with its own window. It works with touchscreens and pens, and works offline (everything except Claude).

You can also install it from the hosted Render link the same way.

## Settings

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | unset | Turns on Claude drawing |
| `CLAUDE_MODEL` | `claude-haiku-5-5` | Model used for drawings (`claude-sonnet-5-5` gives more detailed pictures and costs about 20 times more per token) |
| `CLAUDE_EFFORT` | `medium` | `low` is faster and cheaper, `high` is more detailed |
| `FAMILY_CODE` | unset | Grown-up passcode typed before **every** Claude drawing. 5 wrong tries lock drawing for 15 minutes |
| `DAILY_DRAW_LIMIT` | `60` | Claude drawings per day for the whole server |
| `DRAWS_PER_MINUTE` | `6` | Per-device limit |
| `PORT` / `HOST` | `3000` / `127.0.0.1` | Where the server listens (`render.yaml` sets `0.0.0.0`) |

## How "Ask Claude to draw" works

The browser sends only the child's short idea (200 characters max) to `POST /api/draw`. The server checks the grown-up passcode, keeps the API key, and asks **Claude Haiku 5.5 at medium effort** for an SVG picture. Its system prompt describes a gentle children's illustrator: if a request isn't suitable, it draws a friendly alternative instead of explaining why. The server removes scripts, event handlers, embedded images and outside links from the SVG. The page only shows it through `<img>`, and a Content-Security-Policy blocks outside content.

## Develop

```bash
npm test     # SVG cleaning, paint bucket, passcode and server tests
```

Files: `server.js` (static files, API, spending guards), `lib/draw.js` (Claude call), `lib/svg.js` (SVG cleaning), `public/` (the app: `app.js`, `art.js` Paint Pals, `stamps.js` emoji, `fill.js`, `scenes.js`, `sw.js` offline cache, `styles.css`).

## Research behind the kid features

- [Tux Paint](https://tuxpaint.org/features/), an open-source kids' paint program [built for children as young as 3](https://en.wikipedia.org/wiki/Tux_Paint), uses icons, audible feedback, text hints, categorized stamps with sound, and "magic" tools. This app borrows the spoken labels, sticker sounds, and magic brushes.
- Children under 5 [can't use drag-and-drop reliably](https://init.cise.ufl.edu/?p=2440) (UF INIT Lab). Stickers here are placed with a **tap**, and dragging is optional.
- Preschool app guidance recommends [big, image-only buttons and an always-available way back](https://arxiv.org/pdf/1606.05753), which is why there is one-tap undo.
- Touch-target standards range from ~7 mm to ~9.5 mm for adults (ANSI/HFES 100-2007). I found no child-specific number, so buttons for ages 3–5 are 52–62 px (about 10 mm or more on an iPad).
- Safari supports speech input from 14.5 on iPadOS, but [not in Home Screen web apps](https://whatpwacando.today/speech-recognition), so the 🎤 button hides itself there.
