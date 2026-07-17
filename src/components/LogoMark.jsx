export default function LogoMark({ className = '', title = 'Brooklyn Choir Project' }) {
  return (
    <img
      className={className}
      src="/media/bcp-long-logo-white.png"
      alt={title}
      aria-hidden={title === '' ? true : undefined}
    />
  )
}
