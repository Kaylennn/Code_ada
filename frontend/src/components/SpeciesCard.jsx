import BotanicalArt from './BotanicalArt.jsx'

function SpeciesCard({ species }) {
  return (
    <article className="species-card">
      <div className="species-art" style={{ '--marker-color': species.color }}>
        <BotanicalArt />
        <span className="species-symbol" aria-hidden="true">✿</span>
      </div>
      <div className="species-card-body">
        <div className="species-title-row">
          <h3>{species.name}</h3>
          {species.farmRisk && <span className="risk-pill">Farm risk</span>}
        </div>
        <p>{species.description}</p>
        <h4>Why it matters</h4>
        <p>{species.impact}</p>
        <h4>Management note</h4>
        <p>{species.safety}</p>
        {species.hazardous && <p className="safety-note"><strong>Hazardous species:</strong> Avoid direct contact.</p>}
      </div>
    </article>
  )
}

export default SpeciesCard
