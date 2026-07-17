import { useEffect, useRef } from 'react'
import LogoMark from './LogoMark.jsx'
import { aboutParagraphs, site } from '../data.js'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function InfoPanel({ open, onOpen, onClose }) {
  const closeRef = useRef(null)

  // Close on Escape; move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <button
        className="info-btn"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls="info-panel"
        hidden={open}
      >
        Info
      </button>

      <aside
        id="info-panel"
        className={`info-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="About Brooklyn Choir Project"
        hidden={!open}
      >
        <button className="info-close" onClick={onClose} ref={closeRef}>
          Close
        </button>

        <div className="info-body">
          {aboutParagraphs.map((para, i) => (
            <p key={i}>
              {para.withLogo && (
                <>
                  {'The '}
                  <LogoMark className="inline-logo" />{' '}
                </>
              )}
              {para.text}
            </p>
          ))}
        </div>

        <div className="info-links">
          <a
            className="info-icon"
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Brooklyn Choir Project on Instagram"
          >
            <InstagramIcon />
          </a>
          {site.ticketsUrl && (
            <a className="info-tickets" href={site.ticketsUrl} target="_blank" rel="noreferrer">
              Tickets
            </a>
          )}
        </div>
      </aside>
    </>
  )
}
