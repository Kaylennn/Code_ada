import { useEffect, useMemo, useRef, useState } from 'react'
import Callout from '../components/Callout.jsx'
import MapView from '../components/MapView.jsx'
import PullSiteCard from '../components/PullSiteCard.jsx'
import SightingCard from '../components/SightingCard.jsx'
import { speciesOptions } from '../data/speciesMetadata.js'

function SpeciesFilter({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const filterRef = useRef(null)
  const triggerRef = useRef(null)
  const selectedOptionRef = useRef(null)
  const options = [{ key: 'all', name: 'All species' }, ...speciesOptions]
  const selectedOption = options.find((option) => option.key === value) ?? options[0]

  useEffect(() => {
    if (open) selectedOptionRef.current?.focus()
  }, [open])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!filterRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleOptionKeyDown = (event) => {
    const optionButtons = [...filterRef.current.querySelectorAll('[role="option"]')]
    const currentIndex = optionButtons.indexOf(event.currentTarget)
    let nextIndex

    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % optionButtons.length
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + optionButtons.length) % optionButtons.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = optionButtons.length - 1
    else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (nextIndex !== undefined) {
      event.preventDefault()
      optionButtons[nextIndex].focus()
    }
  }

  return (
    <div className="filter-control">
      <span id="species-filter-label">Species</span>
      <div
        className="species-filter"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}
        ref={filterRef}
      >
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby="species-filter-label species-filter-value"
          className="species-filter-trigger"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          onKeyDown={handleTriggerKeyDown}
          ref={triggerRef}
          type="button"
        >
          <span id="species-filter-value">{selectedOption.name}</span>
          <span aria-hidden="true" className="species-filter-chevron" />
        </button>
        {open && (
          <div aria-labelledby="species-filter-label" className="species-filter-options" role="listbox">
            {options.map((option) => (
              <button
                aria-selected={option.key === value}
                className="species-filter-option"
                key={option.key}
                onClick={() => {
                  onChange(option.key)
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                onKeyDown={handleOptionKeyDown}
                ref={option.key === value ? selectedOptionRef : null}
                role="option"
                type="button"
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ExploreMap({
  sightings,
  pullsites,
  loading,
  sightingsError,
  pullsitesError,
  onRetrySightings,
  onRetryPullsites,
  onSignup,
}) {
  const [speciesFilter, setSpeciesFilter] = useState('all')
  const [farmRiskOnly, setFarmRiskOnly] = useState(false)
  const [selectedKey, setSelectedKey] = useState('')

  const filteredSightings = useMemo(
    () => speciesFilter === 'all' ? sightings : sightings.filter((item) => item.species === speciesFilter),
    [sightings, speciesFilter],
  )
  const filteredPullsites = useMemo(
    () => pullsites.filter((site) =>
      (speciesFilter === 'all' || site.species === speciesFilter) &&
      (!farmRiskOnly || site.farm_risk),
    ),
    [farmRiskOnly, pullsites, speciesFilter],
  )
  const selectedSighting = filteredSightings.find((item) => `sighting-${item.id}` === selectedKey)
  const selectedPullsite = filteredPullsites.find((item) => `pullsite-${item.id}` === selectedKey)
  const hasRecords = filteredSightings.length > 0 || filteredPullsites.length > 0

  return (
    <section className="page-shell page-section map-page">
      <div className="page-intro">
        <p className="eyebrow">Observe. Understand. Restore.</p>
        <div className="map-page-title-row">
          <h1>Explore the map</h1>
          <a className="button map-report-cta" href="#report">
            Report a sighting <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p>Browse community reports and backend-identified pull sites around Champaign-Urbana.</p>
      </div>

      <div className="map-toolbar">
        <SpeciesFilter value={speciesFilter} onChange={setSpeciesFilter} />
        <label className="checkbox-control">
          <input checked={farmRiskOnly} onChange={(event) => setFarmRiskOnly(event.target.checked)} type="checkbox" />
          <span>Farm-risk pull sites only</span>
        </label>
      </div>

      {(sightingsError || pullsitesError) && (
        <div className="api-errors">
          {sightingsError && <Callout onRetry={onRetrySightings}>Couldn’t load sightings: {sightingsError}</Callout>}
          {pullsitesError && <Callout onRetry={onRetryPullsites}>Couldn’t load pull sites: {pullsitesError}</Callout>}
        </div>
      )}

      <div className="map-legend" aria-label="Map marker legend">
        <span><i className="legend-plant" aria-hidden="true">✿</i> Reported sighting</span>
        <span><i className="legend-site" aria-hidden="true">4</i> Pull site from backend</span>
        {loading && <span className="loading-copy" role="status">Updating map…</span>}
      </div>
      <MapView
        sightings={filteredSightings}
        pullsites={filteredPullsites}
        selectedKey={selectedKey}
        onSelect={(marker) => setSelectedKey(marker.key)}
      />

      <section className="map-results" aria-live="polite">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">From the community</p>
            <h2>Map details</h2>
          </div>
          <p>Markers show records returned by the project API.</p>
        </div>
        {selectedSighting && <SightingCard sighting={selectedSighting} />}
        {selectedPullsite && <PullSiteCard pullsite={selectedPullsite} onSignup={onSignup} />}
        {!loading && !hasRecords && !sightingsError && !pullsitesError && (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <h3>No records match these filters</h3>
            <p>Try another species or turn off the farm-risk filter.</p>
          </div>
        )}
        {!loading && hasRecords && !selectedKey && (
          <div className="empty-state empty-state--slim">
            <p>Select a marker on the map to view its details.</p>
          </div>
        )}
        {selectedKey && !selectedSighting && !selectedPullsite && (
          <div className="empty-state empty-state--slim">
            <p>The selected record is no longer visible with these filters.</p>
          </div>
        )}
      </section>
    </section>
  )
}

export default ExploreMap
