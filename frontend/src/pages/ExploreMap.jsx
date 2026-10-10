import { useMemo, useState } from 'react'
import Callout from '../components/Callout.jsx'
import MapView from '../components/MapView.jsx'
import PullSiteCard from '../components/PullSiteCard.jsx'
import SightingCard from '../components/SightingCard.jsx'
import SpeciesSelect from '../components/SpeciesSelect.jsx'
import { speciesOptions } from '../data/speciesMetadata.js'

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
        <p>Browse community reports, pull sites, and illustrative locations for every invasive species in the catalog.</p>
      </div>

      <div className="map-toolbar">
        <div className="filter-control">
          <span id="species-filter-label">Species</span>
          <SpeciesSelect
            className="species-filter"
            id="species-filter"
            includeAll
            labelId="species-filter-label"
            onChange={setSpeciesFilter}
            options={speciesOptions}
            value={speciesFilter}
          />
        </div>
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
        <span><i className="legend-example" aria-hidden="true">✿</i> Illustrative species location (not a report)</span>
        <span><i className="legend-site" aria-hidden="true">4</i> Pull site from backend</span>
        {loading && <span className="loading-copy" role="status">Updating map…</span>}
      </div>
      <MapView
        sightings={filteredSightings}
        pullsites={filteredPullsites}
        selectedKey={selectedKey}
        showIllustrativeSpecies
        speciesFilter={speciesFilter}
        onSelect={(marker) => setSelectedKey(marker.key)}
      />

      <section className="map-results" aria-live="polite">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">From the community</p>
            <h2>Map details</h2>
          </div>
          <p>Illustrative species locations are examples only and do not represent verified sightings.</p>
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
