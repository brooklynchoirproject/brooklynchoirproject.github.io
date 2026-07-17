import { useEffect, useRef, useState } from 'react'

/**
 * Full-viewport background video.
 *
 * Layers (back to front):
 *   1. .video-fallback — flat near-black CSS layer, always present, so the
 *      page never flashes white even with no media files.
 *   2. <video> — /media/hero.mp4, muted/looped/inline, with
 *      /media/hero-poster.jpg as the static thumbnail (shown while loading,
 *      permanently under prefers-reduced-motion, or if the video errors).
 *   3. .video-tint — subtle dark tint for legibility of the white wordmarks.
 *
 * If your source footage is color, uncomment the grayscale filter in
 * index.css (.bg-video) to match the black-and-white treatment.
 */
export default function VideoBackground() {
  const videoRef = useRef(null)
  const [videoOk, setVideoOk] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const applyMotionPref = () => {
      if (reduced.matches) {
        video.pause()
      } else {
        video.play().catch(() => {}) // autoplay can be blocked; poster remains
      }
    }

    applyMotionPref()
    reduced.addEventListener('change', applyMotionPref)
    return () => reduced.removeEventListener('change', applyMotionPref)
  }, [])

  return (
    <div className="video-bg" aria-hidden="true">
      <div className="video-fallback" />
      {videoOk && (
        <video
          ref={videoRef}
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
          onError={() => setVideoOk(false)}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="video-tint" />
    </div>
  )
}
