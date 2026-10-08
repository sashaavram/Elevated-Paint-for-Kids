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
- **Grown-up settings.** Press and **hold ⚙️ for 2 seconds**: sounds, voice, Claude on/off, more tools, child's name, family code.

## Use it on an iPad (a link)

The iPad only needs a link, but something has to run the small server that keeps your Claude key private. The easiest host is [Render](https://render.com):

1. Create a free Render account and connect GitHub.
2. **New + → Blueprint →** pick this repository. Render reads `render.yaml`.
3. When asked, paste your `ANTHROPIC_API_KEY`, and make up a `FAMILY_CODE` (any word).
4. Open the `https://….onrender.com` link on the iPad in Safari.
5. Press and hold ⚙️ for 2 seconds, then type the family code. Without it, strangers who find the link can't spend your Claude credit.
6. Optional: **Share → Add to Home Screen** for a full-screen app icon. Voice input (🎤) only works in Safari itself, not from the Home Screen icon (an Apple limitation).

The free Render plan sleeps after about 15 minutes without visitors, so the first visit afterwards takes about a minute. A paid plan stays awake.

## Use it on Windows (installable app)

1. Install [Node.js](https://nodejs.org) 18 or newer.
2. Put your key in `start-windows.bat` (see the comment inside), then double-click it. The app opens at http://localhost:3000.
3. In Edge, click **⋯ → Apps → Install this site as an app**. You get a Start-menu app with its own window. It works with touchscreens and pens, and works offline (everything except Claude).

You can also install it from the hosted Render link the same way.

## Settings

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | unset | Turns on Claude drawing |
| `CLAUDE_MODEL` | `claude-sonnet-5-5` | Model used for drawings |
| `CLAUDE_EFFORT` | `medium` | `low` is faster and cheaper, `high` is more detailed |
| `FAMILY_CODE` | unset | When set, the app must send this code before Claude draws |
| `DAILY_DRAW_LIMIT` | `60` | Claude drawings per day for the whole server |
| `DRAWS_PER_MINUTE` | `6` | Per-device limit |
| `PORT` / `HOST` | `3000` / `127.0.0.1` | Where the server listens (`render.yaml` sets `0.0.0.0`) |

## How "Ask Claude to draw" works

The browser sends only the child's short idea (200 characters max) to `POST /api/draw`. The server keeps the API key and asks **Claude Sonnet 5.5 at medium effort** for an SVG picture. Its system prompt describes a gentle children's illustrator: if a request isn't suitable, it draws a friendly alternative instead of explaining why. The server removes scripts, event handlers, embedded images and outside links from the SVG. The page only shows it through `<img>`, and a Content-Security-Policy blocks outside content. Requests also use Anthropic's server-side `fallbacks: "default"`: if a safety check declines a request, it is retried on Anthropic's recommended fallback model.

## Develop

```bash
npm test     # SVG cleaning, paint bucket, family code and server tests
```

Files: `server.js` (static files, API, spending guards), `lib/draw.js` (Claude call), `lib/svg.js` (SVG cleaning), `public/` (the app: `app.js`, `art.js` Paint Pals, `stamps.js` emoji, `fill.js`, `scenes.js`, `sw.js` offline cache, `styles.css`).

## Research behind the kid features

- [Tux Paint](https://tuxpaint.org/features/), an open-source kids' paint program [built for children as young as 3](https://en.wikipedia.org/wiki/Tux_Paint), uses icons, audible feedback, text hints, categorized stamps with sound, and "magic" tools. This app borrows the spoken labels, sticker sounds, and magic brushes.
- Children under 5 [can't use drag-and-drop reliably](https://init.cise.ufl.edu/?p=2440) (UF INIT Lab). Stickers here are placed with a **tap**, and dragging is optional.
- Preschool app guidance recommends [big, image-only buttons and an always-available way back](https://arxiv.org/pdf/1606.05753), which is why there is one-tap undo.
- Touch-target standards range from ~7 mm to ~9.5 mm for adults (ANSI/HFES 100-2007). I found no child-specific number, so buttons for ages 3–5 are 52–62 px (about 10 mm or more on an iPad).
- Safari supports speech input from 14.5 on iPadOS, but [not in Home Screen web apps](https://whatpwacando.today/speech-recognition), so the 🎤 button hides itself there.
