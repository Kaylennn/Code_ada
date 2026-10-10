import SpeciesCard from '../components/SpeciesCard.jsx'
import { speciesOptions } from '../data/speciesMetadata.js'

function Learn() {
  return (
    <section className="page-shell page-section">
      <div className="page-intro page-intro--split">
        <div>
          <p className="eyebrow">A field guide for our community</p>
          <h1>Get to know<br /><em>what’s growing.</em></h1>
        </div>
        <p>Learn a few visual clues and why these plants are monitored locally. If you are unsure, observe from a safe distance and ask a local expert.</p>
      </div>
      <div className="species-grid">
        {speciesOptions.map((species) => <SpeciesCard key={species.key} species={species} />)}
      </div>
      <div className="learn-note">
        <span aria-hidden="true">✳</span>
        <p>Plant identification can be difficult. This guide is introductory; follow local expert guidance for identification and management.</p>
      </div>
    </section>
  )
}

export default Learn
