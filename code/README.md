# Brooklyn Choir Project — website remake

Single-screen site built with **Vite + React** (replacing the old create-react-app build):
a full-viewport background video, a tiled field of the BCP wordmark that reflows with the
window, and an INFO button that opens the about panel.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Background video + thumbnail

| File | Purpose |
| --- | --- |
| `public/media/hero.mp4` | Background video. Keep it a short muted loop, compressed (H.264, ~1080p; under ~10 MB is a good target). |
| `public/media/hero-poster.jpg` | Static thumbnail fallback. Shown while the video loads, if it fails, and permanently for visitors with "reduce motion" enabled. A grayscale placeholder is included — replace it with a still frame from your video. |

Drop your real files in with those exact names. If the video is missing, the poster shows;
behind both there's a flat black layer so nothing ever flashes or looks broken.

Export a poster frame from your video:

```bash
ffmpeg -i hero.mp4 -ss 00:00:03 -frames:v 1 hero-poster.jpg
```

If your footage is color and you want the black-and-white treatment done in the browser,
uncomment the `filter: grayscale(1)` line under `.bg-video` in `src/index.css`.

## The wordmark

`src/components/LogoMark.jsx` contains a rebuilt-by-eye SVG of the scattered-letter
wordmark. For pixel-perfect branding, paste the paths from your real logo file into that
component — the tiled field, the inline logo in the info panel, and everything else
consume the same component, so one swap updates the whole site.

## The tiled logo field

`src/components/LogoField.jsx` computes a staggered brick-pattern grid from the viewport
size and recomputes it on every resize. Tune spacing in `src/data.js`:

```js
export const tiling = {
  TILE_W: 560,     // horizontal spacing between logos at full scale
  TILE_H: 330,     // vertical spacing between rows at full scale
  LOGO_W: 235,     // wordmark width at full scale
  BASE_W: 1440,    // viewport width at which the layout is full scale
  MIN_SCALE: 0.52, // smallest scale (reached on narrow windows/phones)
}
```

Below `BASE_W`, the whole layout scales down proportionally — logos get smaller
and pack closer together as the window narrows, bottoming out at `MIN_SCALE`.

## The INFO panel

- The INFO button sits mid-right, inverts to white on hover, and opens the panel.
- Panel content lives in `src/data.js` (`aboutParagraphs`), with the wordmark rendered
  inline in the first sentence like the original.
- Instagram link is always shown; set `site.ticketsUrl` to a URL to show an optional
  TICKETS link next to it (leave `''` to hide).
- Closes via the CLOSE button or the Escape key.

## Structure

```
index.html
src/
  data.js                     editable content + tiling parameters
  index.css                   all styles
  App.jsx                     assembles the three layers
  components/
    VideoBackground.jsx       video + poster + reduced-motion handling
    LogoField.jsx             responsive staggered tiling
    LogoMark.jsx              the wordmark SVG (swap in your real logo here)
    InfoPanel.jsx             INFO button + about panel
```

## Accessibility notes

- Video is decorative: muted, `aria-hidden`, no audio track needed
- `prefers-reduced-motion` pauses the video (poster stays) and removes transitions
- The info panel is keyboard-accessible: focus moves to CLOSE on open, Escape closes
