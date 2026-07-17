import { useEffect, useRef } from 'react'
import LogoMark from './LogoMark.jsx'
import { aboutParagraphs, site } from '../data.js'

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
        <button className="info-close" onClick={onClose} ref={closeRef} aria-label="Close">
          x
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
              {para.href ? (
                <a className="info-link" href={para.href} target="_blank" rel="noreferrer">
                  {para.text}
                </a>
              ) : (
                para.text
              )}
            </p>
          ))}
        </div>

        <div className="info-links">
          <span className="info-link-group">
            <a className="info-link" href={site.mailingListUrl} target="_blank" rel="noreferrer">
              mailing list
            </a>
            <span className="info-link-sep"> // </span>
            <a className="info-link" href={site.instagram} target="_blank" rel="noreferrer">
              instagram
            </a>
          </span>
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
