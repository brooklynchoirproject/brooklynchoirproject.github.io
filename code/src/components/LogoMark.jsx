/**
 * Approximation of the Brooklyn Choir Project wordmark:
 * "BROOKLYN" and "PROJECT" set solid, with the letters of "CHOIR"
 * scattered/tumbled between them (H and O on the baseline, C and R
 * dropped below and rotated, I tilted like a slash).
 *
 * NOTE: This is a rebuild by eye. For pixel-perfect branding, replace the
 * contents of this SVG with the paths from your real logo file — the tiling,
 * hover, and panel components all consume this component, so swapping the
 * artwork here updates it everywhere.
 */
export default function LogoMark({ className = '', title = 'Brooklyn Choir Project' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 470 92"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="currentColor"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="700"
      >
        {/* BROOKLYN */}
        <text x="0" y="38" fontSize="34" letterSpacing="1">
          BROOKLYN
        </text>

        {/* C H O I R — scattered */}
        <text x="176" y="66" fontSize="26" transform="rotate(-24 184 58)">
          C
        </text>
        <text x="205" y="36" fontSize="27">
          H
        </text>
        <text x="238" y="38" fontSize="27" transform="rotate(9 246 30)">
          O
        </text>
        <text x="271" y="40" fontSize="28" transform="rotate(28 275 32)">
          I
        </text>
        <text x="288" y="70" fontSize="26" transform="rotate(32 296 62)">
          R
        </text>

        {/* PROJECT */}
        <text x="305" y="38" fontSize="34" letterSpacing="1">
          PROJECT
        </text>
      </g>
    </svg>
  )
}
