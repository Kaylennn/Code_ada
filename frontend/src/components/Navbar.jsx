import PointsBadge from './PointsBadge.jsx'

const links = [
  ['home', 'Home'],
  ['map', 'Explore Map'],
  ['learn', 'Learn'],
  ['volunteer', 'Volunteer'],
]

function Navbar({ activePage, pointsMessage }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Terratrace home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>Terra<span className="brand-accent">trace</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([route, label]) => (
          <a
            aria-current={activePage === route ? 'page' : undefined}
            className={activePage === route ? 'nav-link is-active' : 'nav-link'}
            href={`#${route}`}
            key={route}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <PointsBadge message={pointsMessage} />
        <a className="button button--small" href="#report">Report sighting <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}

export default Navbar
