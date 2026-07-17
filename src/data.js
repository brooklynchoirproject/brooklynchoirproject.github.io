// ---------------------------------------------------------------------------
// Site data — edit this file to update content without touching components.
// ---------------------------------------------------------------------------

export const site = {
  instagram: 'https://www.instagram.com/brooklynchoirproject/',

  // Optional: set to a URL (e.g. your DICE page) to show a TICKETS link in
  // the info panel. Leave as '' to hide the link entirely.
  ticketsUrl: '',
}

// Paragraphs shown in the INFO panel. `withLogo: true` renders the wordmark
// inline at the start of the sentence, as on the original site.
export const aboutParagraphs = [
  {
    withLogo: true,
    text: 'is taking one of the oldest and most conservative of music genres \u2013 choral singing \u2013 and infusing it with the energy and ethos of New York\u2019s indie and underground music communities.',
  },
  {
    text: 'It\u2019s all the good things about singing together: community, the spine-tingling power of voices rising up together, the weekly challenge of weaving voices into harmony. But it\u2019s done fundamentally differently: the material is freshly written and arranged by songwriters \u2013 of any genre \u2013 who themselves are in the choir, singing side by side with other singers.',
  },
  {
    text: 'Audition slots \& song submissions for Fall 2026 coming soon.',
  },
]

// Logo-field layout. The grid recomputes on every resize:
// column width ≈ TILE_W (fit to viewport), rows every TILE_H, and every
// other row is offset by half a column for the staggered brick pattern.
export const tiling = {
  TILE_W: 560, // horizontal spacing between logos at full scale (px)
  TILE_H: 231, // vertical spacing between rows at full scale (px)
  LOGO_W: 235, // wordmark width at full scale (px)

  // Responsive scaling: everything above is multiplied by
  // clamp(MIN_SCALE, viewportWidth / BASE_W, 1), so logos get smaller
  // and pack closer together as the window narrows.
  BASE_W: 1440, // viewport width at which the layout is full scale
  MIN_SCALE: 0.52, // floor so logos stay legible on phones
}
