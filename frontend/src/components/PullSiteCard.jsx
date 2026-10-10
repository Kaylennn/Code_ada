import { useState } from 'react'
import { speciesMetadata } from '../data/speciesMetadata.js'
import Callout from './Callout.jsx'

function PullSiteCard({ pullsite, onSignup, compact = false }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const species = speciesMetadata[pullsite.species]

  const signUp = async () => {
    setSubmitting(true)
    setError('')
    setConfirmation('')
    try {
      const result = await onSignup(pullsite.id)
      setConfirmation('Your signup was confirmed.')
      if (typeof result.points_awarded === 'number') {
        setConfirmation(`Your signup was confirmed. You earned ${result.points_awarded} points.`)
      }
    } catch (signupError) {
      setError(signupError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <article className={`detail-card pullsite-card${compact ? ' pullsite-card--compact' : ''}`}>
      <div className="detail-card-heading">
        <span className="pullsite-count" aria-label={`${pullsite.sighting_count} sightings`}>{pullsite.sighting_count}</span>
        <div>
          <p className="eyebrow">Community pull site</p>
          <h3>{species?.name ?? pullsite.species}</h3>
        </div>
      </div>
      <dl className="detail-grid">
        <div><dt>Coordinates</dt><dd>{Number(pullsite.lat).toFixed(4)}, {Number(pullsite.lng).toFixed(4)}</dd></div>
        <div><dt>Reported sightings</dt><dd>{pullsite.sighting_count}</dd></div>
        <div><dt>Volunteers needed</dt><dd>{pullsite.volunteers}</dd></div>
        <div><dt>Estimated time</dt><dd>{pullsite.hours} hours</dd></div>
        <div><dt>Current signups</dt><dd>{pullsite.signups}</dd></div>
      </dl>
      {pullsite.farm_risk
        ? <p className="risk-note"><span aria-hidden="true">!</span> Near or affecting farm-related land</p>
        : <p className="risk-clear">No farm risk flagged</p>}
      {species?.hazardous && <p className="safety-note"><strong>Safety warning:</strong> {species.safety}</p>}
      {error && <Callout>{error}</Callout>}
      {confirmation && <Callout tone="success">{confirmation}</Callout>}
      <button className="button" disabled={submitting || species?.hazardous} onClick={signUp} type="button">
        {submitting ? 'Confirming signup…' : species?.hazardous ? 'Trained response required' : 'Sign up to help'}
      </button>
      {species?.hazardous && <p className="field-hint">Volunteer signup is unavailable for hazardous plant response.</p>}
    </article>
  )
}

export default PullSiteCard
