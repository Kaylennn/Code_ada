import { useEffect, useMemo } from 'react'
import { CircleMarker, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { speciesMetadata } from '../data/speciesMetadata.js'

const center = [40.1106, -88.2073]
const goldenAngle = Math.PI * (3 - Math.sqrt(5))
const speciesCatalog = Object.values(speciesMetadata)

function illustrativePosition(index, count) {
  const distance = Math.sqrt((index + 0.5) / count)
  const angle = index * goldenAngle
  return [
    center[0] + Math.sin(angle) * distance * 0.035,
    center[1] + Math.cos(angle) * distance * 0.045,
  ]
}

function markerIcon(species, selected) {
  const color = speciesMetadata[species]?.color ?? '#55754b'
  return L.divIcon({
    className: 'leaflet-marker-host',
    html: `<span class="plant-marker${selected ? ' is-selected' : ''}" style="--marker-color:${color}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M19.5 4.5C12 4.8 6.1 7.8 5 13.1c-.6 2.9 1.5 5 4 4.6 5.4-.9 8.3-6.8 10.5-13.2Z"/><path d="M4 21c3.5-5.8 7-9 12.4-12.2"/></svg></span>`,
    iconSize: [38, 44],
    iconAnchor: [19, 38],
  })
}

function illustrativeSpeciesIcon(species) {
  const color = species.color ?? '#55754b'
  return L.divIcon({
    className: 'leaflet-marker-host',
    html: `<span class="species-example-marker" style="--marker-color:${color}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M19.5 4.5C12 4.8 6.1 7.8 5 13.1c-.6 2.9 1.5 5 4 4.6 5.4-.9 8.3-6.8 10.5-13.2Z"/><path d="M4 21c3.5-5.8 7-9 12.4-12.2"/></svg></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

function pullsiteIcon(count, selected) {
  const parsedCount = Number(count)
  const safeCount = Number.isFinite(parsedCount) && parsedCount >= 0
    ? Math.trunc(parsedCount)
    : '—'
  return L.divIcon({
    className: 'leaflet-marker-host',
    html: `<span class="pullsite-marker${selected ? ' is-selected' : ''}" aria-hidden="true"><span>${safeCount}</span></span>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  })
}

function CoordinatePicker({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect([event.latlng.lat, event.latlng.lng])
    },
  })
  return null
}

function SpeciesMapFocus({ enabled, speciesFilter, position }) {
  const map = useMap()

  useEffect(() => {
    if (!enabled) return

    if (position) map.flyTo(position, 14, { duration: 0.45 })
    else if (speciesFilter === 'all') map.setView(center, 12)
  }, [enabled, map, position, speciesFilter])

  return null
}

function MapView({
  sightings = [],
  pullsites = [],
  selectedKey,
  onSelect,
  selectable = false,
  selectedLocation,
  showIllustrativeSpecies = false,
  speciesFilter = 'all',
}) {
  const sightingMarkers = useMemo(() => sightings.map((sighting) => ({
    ...sighting,
    key: `sighting-${sighting.id}`,
    position: [sighting.lat, sighting.lng],
  })), [sightings])
  const pullsiteMarkers = useMemo(() => pullsites.map((pullsite) => ({
    ...pullsite,
    key: `pullsite-${pullsite.id}`,
    position: [pullsite.lat, pullsite.lng],
  })), [pullsites])
  const illustrativeMarkers = useMemo(() => {
    if (!showIllustrativeSpecies) return []

    if (speciesFilter !== 'all') {
      const species = speciesMetadata[speciesFilter]
      if (!species) return []
      const index = speciesCatalog.findIndex((entry) => entry.key === speciesFilter)
      if (index < 0) return []

      return [{
        ...species,
        key: `illustrative-${species.key}`,
        position: illustrativePosition(index, speciesCatalog.length),
      }]
    }

    return speciesCatalog.map((species, index) => ({
      ...species,
      key: `illustrative-${species.key}`,
      position: illustrativePosition(index, speciesCatalog.length),
    }))
  }, [showIllustrativeSpecies, speciesFilter])
  const focusPosition = speciesFilter !== 'all' ? illustrativeMarkers[0]?.position : null

  return (
    <div className="map-frame">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="map-canvas">
        <SpeciesMapFocus
          enabled={showIllustrativeSpecies}
          speciesFilter={speciesFilter}
          position={focusPosition}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectable && <CoordinatePicker onSelect={onSelect} />}
        {illustrativeMarkers.map((marker) => (
          <Marker
            key={marker.key}
            position={marker.position}
            icon={illustrativeSpeciesIcon(marker)}
            title={`${marker.name} — illustrative location, not a verified sighting`}
            alt={`${marker.name}, illustrative location only; not a verified sighting`}
            keyboard
          />
        ))}
        {sightingMarkers.map((marker) => (
          <Marker
            key={marker.key}
            position={marker.position}
            icon={markerIcon(marker.species, selectedKey === marker.key)}
            title={`${speciesMetadata[marker.species]?.name ?? marker.species} sighting`}
            alt={`${speciesMetadata[marker.species]?.name ?? marker.species} sighting`}
            keyboard
            eventHandlers={{
              click(event) {
                event.originalEvent?.stopPropagation()
                onSelect?.(marker)
              },
            }}
          />
        ))}
        {pullsiteMarkers.map((marker) => (
          <Marker
            key={marker.key}
            position={marker.position}
            icon={pullsiteIcon(marker.sighting_count, selectedKey === marker.key)}
            zIndexOffset={1000}
            title={`${speciesMetadata[marker.species]?.name ?? marker.species} pull site with ${marker.sighting_count} sightings`}
            alt={`Pull site: ${marker.sighting_count} sightings`}
            keyboard
            eventHandlers={{
              click(event) {
                event.originalEvent?.stopPropagation()
                onSelect?.(marker)
              },
            }}
          />
        ))}
        {selectable && selectedLocation && (
          <CircleMarker
            center={selectedLocation}
            radius={9}
            pathOptions={{ color: '#234B36', fillColor: '#A8BFA5', fillOpacity: 0.9 }}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default MapView