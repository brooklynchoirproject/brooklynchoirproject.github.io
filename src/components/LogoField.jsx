import { useEffect, useState } from 'react'
import LogoMark from './LogoMark.jsx'
import { tiling } from '../data.js'

function useViewport() {
  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }))

  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        setSize({ w: window.innerWidth, h: window.innerHeight }),
      )
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

/**
 * Staggered brick-pattern field of wordmarks over the video.
 * The grid is recomputed from the viewport on every resize, so the number
 * of columns/rows and their spacing adapt to the window — matching the
 * dynamic behavior of the original site.
 */
export default function LogoField() {
  const { w, h } = useViewport()
  const { TILE_W, TILE_H, LOGO_W, BASE_W, MIN_SCALE } = tiling

  // Shrink the whole layout proportionally on smaller windows:
  // full scale at BASE_W and up, tapering down to MIN_SCALE.
  const scale = Math.min(1, Math.max(MIN_SCALE, w / BASE_W))
  const tileW = TILE_W * scale
  const tileH = TILE_H * scale
  const logoBase = LOGO_W * scale

  // Fit whole columns to the viewport, but never let spacing collapse
  // below one logo width + breathing room.
  const cols = Math.max(1, Math.round(w / tileW))
  const colW = Math.max(w / cols, logoBase * 1.35)
  const rows = Math.ceil(h / tileH) + 1
  const logoW = Math.min(logoBase, w * 0.62)

  const marks = []
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 1 ? colW / 2 : 0
    // start at -1 so offset rows still bleed off the left edge
    for (let c = -1; c <= cols; c++) {
      marks.push({
        key: `${r}-${c}`,
        x: c * colW + offset + colW * 0.08,
        y: r * tileH + tileH * 0.18,
      })
    }
  }

  return (
    <div className="logo-field" aria-hidden="true">
      {marks.map((m) => (
        <span
          key={m.key}
          className="logo-tile-pos"
          style={{ left: m.x, top: m.y, width: logoW }}
        >
          <LogoMark className="logo-tile" title="" />
        </span>
      ))}
    </div>
  )
}
