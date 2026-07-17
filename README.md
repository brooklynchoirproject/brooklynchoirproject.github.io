# Brooklyn Choir Project website

## Quick start

```bash
npm run dev      # local dev server
```

Then open: `http://localhost:5173/`. 

## How to edit the text

Everything editable lives in `src/data.js`:

- `aboutParagraphs` — the text shown in the INFO panel. Each entry is one paragraph;
  set `withLogo: true` on an entry to render the wordmark inline at the start of it.
- `site.instagram` — the Instagram link icon's URL.
- `site.ticketsUrl` — set to a URL to show a TICKETS link in the INFO panel, or leave
  `''` to hide it.

## How to change the images/videos

Replace the files in `public/media/`:

| File | Purpose |
| --- | --- |
| `public/media/hero.mp4` | Background video. Keep it a short muted loop, compressed (H.264, ~1080p; under ~10 MB is a good target). |
| `public/media/hero-poster.png` | Static thumbnail fallback. Rendered as the CSS background behind the video, so it's always visible while the video loads, if it fails, and permanently for visitors with "reduce motion" enabled. |
| `public/media/hero-poster-mobile.jpeg` | Portrait-cropped poster for narrow screens. Present in `public/media/` but not yet wired up in code — `VideoBackground.jsx` and `index.css` still use `hero-poster.png` at every size. |


FYI you can export a poster frame from a video with:

```bash
ffmpeg -i hero.mp4 -ss 00:00:03 -frames:v 1 hero-poster.png
```

If the video is in color and you want the black-and-white treatment done in the browser,
uncomment the `filter: grayscale(1)` line under `.bg-video` in `src/index.css`.
