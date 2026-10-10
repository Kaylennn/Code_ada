import { speciesMetadata } from '../data/speciesMetadata.js'

function SightingCard({ sighting }) {
  const species = speciesMetadata[sighting.species]
  return (
    <article className="detail-card">
      <div className="detail-card-heading">
        <span className="species-symbol" style={{ '--marker-color': species?.color ?? '#55754b' }} aria-hidden="true">✿</span>
        <div>
          <p className="eyebrow">Reported sighting</p>
          <h3>{species?.name ?? sighting.species}</h3>
        </div>
      </div>
      <p>{species?.description ?? 'Plant identification details are not available.'}</p>
      <dl className="detail-grid">
        <div><dt>Reported</dt><dd>{sighting.date || 'Date not provided'}</dd></div>
        <div><dt>Coordinates</dt><dd>{Number(sighting.lat).toFixed(4)}, {Number(sighting.lng).toFixed(4)}</dd></div>
      </dl>
      {species?.farmRisk && <p className="risk-note"><span aria-hidden="true">!</span> May affect agricultural land</p>}
      {species?.hazardous && <p className="safety-note"><strong>Safety:</strong> {species.safety}</p>}
    </article>
  )
}

export default SightingCard
