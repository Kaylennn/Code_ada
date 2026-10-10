import { useState } from 'react'
import Callout from '../components/Callout.jsx'
import MapView from '../components/MapView.jsx'
import { speciesOptions } from '../data/speciesMetadata.js'

function Report({ onSubmitReport }) {
  const [species, setSpecies] = useState('')
  const [location, setLocation] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  const useCurrentLocation = () => {
    setLocationError('')
    if (!navigator.geolocation) {
      setLocationError('Location services are not available in this browser. Click the map to choose a location.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation([coords.latitude, coords.longitude])
        setLocating(false)
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. You can still choose a point on the map.'
          : error.code === error.POSITION_UNAVAILABLE
            ? 'Your current location is unavailable. Choose a point on the map instead.'
            : 'The location request timed out. Please try again or choose a point on the map.'
        setLocationError(message)
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSuccess(false)
    if (!species || !location) {
      setSubmitError('Choose a species and select a location on the map before submitting.')
      return
    }
    setSubmitting(true)
    try {
      await onSubmitReport({ species, lat: location[0], lng: location[1] })
      setSuccess(true)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-shell page-section">
      <div className="page-intro">
        <p className="eyebrow">Every observation helps</p>
        <h1>Report a sighting</h1>
        <p>Share what you found and where you found it. Your report helps build a clearer picture of local plant communities.</p>
      </div>
      <div className="report-layout">
        <form className="report-form" onSubmit={submit}>
          <div className="form-heading">
            <span className="form-step">01</span>
            <div><p className="eyebrow">Observation details</p><h2>What did you see?</h2></div>
          </div>
          <label className="form-field" htmlFor="report-species">
            <span>Plant species</span>
            <select id="report-species" value={species} onChange={(event) => setSpecies(event.target.value)} required>
              <option value="">Select a species</option>
              {speciesOptions.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}
            </select>
          </label>
          <div className="form-heading form-heading--location">
            <span className="form-step">02</span>
            <div><p className="eyebrow">Location</p><h2>Where did you see it?</h2></div>
          </div>
          <p className="form-instruction">Click anywhere on the map to place a pin, or use your current location.</p>
          <button className="button button--light location-button" disabled={locating} onClick={useCurrentLocation} type="button">
            <span aria-hidden="true">⌖</span> {locating ? 'Finding your location…' : 'Use my current location'}
          </button>
          {locationError && <Callout>{locationError}</Callout>}
          <MapView selectable selectedLocation={location} onSelect={setLocation} />
          <div className="coordinates-box" aria-live="polite">
            <span>Selected coordinates</span>
            <strong>{location ? `${location[0].toFixed(5)}, ${location[1].toFixed(5)}` : 'Click the map to choose'}</strong>
          </div>
          {submitError && <Callout>{submitError}</Callout>}
          {success && (
            <Callout tone="success">
              Your sighting was submitted and the map data has been updated.
            </Callout>
          )}
          <button className="button button--submit" disabled={submitting} type="submit">
            {submitting ? 'Submitting report…' : 'Submit sighting'} <span aria-hidden="true">↗</span>
          </button>
          {success && <a className="inline-link return-link" href="#map">Return to Explore Map <span aria-hidden="true">→</span></a>}
        </form>
        <aside className="report-aside">
          <div className="aside-illustration"><span aria-hidden="true">✳</span></div>
          <p className="eyebrow">A note for observers</p>
          <h3>Notice from a safe distance.</h3>
          <p>Some invasive plants can be hazardous to people and animals. Avoid touching or removing unfamiliar plants, especially poison hemlock.</p>
          <a className="inline-link" href="#learn">Explore the species guide <span aria-hidden="true">→</span></a>
        </aside>
      </div>
    </section>
  )
}

export default Report
