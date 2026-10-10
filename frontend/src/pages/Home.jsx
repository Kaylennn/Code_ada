import { useEffect, useState } from 'react'
import BotanicalArt from '../components/BotanicalArt.jsx'
import { commonsImage, commonsPage, SPECIES_INFO } from '../data/education.js'

const speciesPhotos = Object.values(SPECIES_INFO).flatMap((species) =>
  (species.images || []).map((photo) => ({ species, photo })),
)

const photoInterval = 5000

const steps = [
  { number: '01', title: 'Explore', text: 'See what your neighbors have reported across Champaign-Urbana.' },
  { number: '02', title: 'Report', text: 'Share a location so local conservation efforts can respond.' },
  { number: '03', title: 'Take action', text: 'Find community opportunities to care for the places we share.' },
]

function Home() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [previousPhoto, setPreviousPhoto] = useState(null)
  const [slideDirection, setSlideDirection] = useState('next')
  const [paused, setPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(motionPreference.matches)
    updatePreference()
    motionPreference.addEventListener('change', updatePreference)
    return () => motionPreference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (paused || prefersReducedMotion) return undefined

    const intervalId = window.setInterval(() => {
      setSlideDirection('next')
      setPreviousPhoto(speciesPhotos[activePhoto])
      setActivePhoto((current) => (current + 1) % speciesPhotos.length)
    }, photoInterval)

    return () => window.clearInterval(intervalId)
  }, [activePhoto, paused, prefersReducedMotion])

  const showPhoto = (offset) => {
    setSlideDirection(offset < 0 ? 'previous' : 'next')
    setPreviousPhoto(speciesPhotos[activePhoto])
    setActivePhoto((current) => (current + offset + speciesPhotos.length) % speciesPhotos.length)
  }
  const { species, photo } = speciesPhotos[activePhoto]

  return (
    <>
      <section className="home-hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Community conservation, rooted here</p>
          <h1>Track the Threat.<br /><em>Protect the Land.</em></h1>
          <p className="hero-subtitle">
            Discover invasive species, report sightings, and take action to protect Illinois ecosystems.
          </p>
          <div className="hero-actions">
            <a className="button" href="#map">Explore the map <span aria-hidden="true">↗</span></a>
            <a className="button button--light" href="#report">Report a sighting</a>
          </div>
          <div className="hero-location"><span aria-hidden="true">⌖</span> Champaign-Urbana, Illinois</div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <BotanicalArt className="hero-botanical" />
          <div className="hero-stamp"><span>GROW</span><span>TOGETHER</span><span aria-hidden="true">✳</span></div>
          <span className="hero-caption">A healthier landscape starts with noticing.</span>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Small actions, lasting change</p>
              <h2>How it works</h2>
            </div>
            <p>Good stewardship begins with the people who know a place best: the people who live here.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="page-shell why-layout">
          <div
            className="why-illustration"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
            }}
          >
            <figure className="why-species-photo">
              <div className="why-species-photo__stage">
                {previousPhoto && !prefersReducedMotion && (
                  <img
                    className={`why-species-photo__image why-species-photo__image--exit-${slideDirection}`}
                    src={commonsImage(previousPhoto.photo.file, 800)}
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <img
                  key={`${species.key}-${photo.file}`}
                  className={`why-species-photo__image${previousPhoto && !prefersReducedMotion ? ` why-species-photo__image--enter-${slideDirection}` : ''}`}
                  src={commonsImage(photo.file, 800)}
                  alt={`${species.name}: ${photo.caption}`}
                  onAnimationEnd={() => setPreviousPhoto(null)}
                />
              </div>
              <figcaption>
                <strong>{species.name}</strong>
                <span>{photo.caption}</span>
                <a href={commonsPage(photo.file)} target="_blank" rel="noreferrer">
                  Photo: {photo.credit} · {photo.license}
                </a>
              </figcaption>
            </figure>
            <div className="why-species-controls">
              <button type="button" onClick={() => showPhoto(-1)} aria-label="Previous species photo">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => showPhoto(1)} aria-label="Next species photo">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div>
            <p className="eyebrow">Care for the places we call home</p>
            <h2>Why invasive plants matter</h2>
            <p className="section-copy">
              Some introduced plants spread beyond where they were planted, changing the balance of local habitats and creating challenges for farms and natural areas. Sharing observations helps communities understand what is happening and where support may be useful.
            </p>
            <a className="inline-link" href="#learn">Meet the species <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="community-cta">
        <img
          className="cta-photo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Corn_fields_near_Royal%2C_Illinois.jpg/1920px-Corn_fields_near_Royal%2C_Illinois.jpg"
          alt="Corn and soybean fields near Royal in Champaign County, Illinois"
        />
        <div className="page-shell cta-content">
          <p className="eyebrow eyebrow--light">Better together</p>
          <h2>There’s a place for you<br />in this work.</h2>
          <p>Share what you see, learn about local plants, or lend a hand when community opportunities arise.</p>
          <a className="button button--cream" href="#volunteer">Find ways to help <span aria-hidden="true">↗</span></a>
        </div>
        <span className="cta-leaf cta-leaf--one" aria-hidden="true">✳</span>
        <span className="cta-leaf cta-leaf--two" aria-hidden="true">✳</span>
        <a
          className="cta-photo-credit"
          href="https://commons.wikimedia.org/wiki/File:Corn_fields_near_Royal,_Illinois.jpg"
          target="_blank"
          rel="noreferrer"
        >
          Photo: Daniel Schwen · CC BY-SA 4.0
        </a>
      </section>
    </>
  )
}

export default Home
