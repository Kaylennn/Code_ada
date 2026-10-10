import { useState, useEffect } from "react";

// The keys must match the spec EXACTLY. The labels are what people see.
const SPECIES = [
  { key: "buckthorn", label: "Buckthorn" },
  { key: "canada_thistle", label: "Canada Thistle" },
  { key: "poison_hemlock", label: "Poison Hemlock" },
  { key: "multiflora_rose", label: "Multiflora Rose" },
  { key: "garlic_mustard", label: "Garlic Mustard" },
];

// Props (App.jsx will pass these in):
//   pickedLocation  - { lat, lng } from a map click, or null
//   onReportSuccess - function called with the API response { sightings, pullsites }
function ReportForm({ pickedLocation, onReportSuccess }) {
  const [species, setSpecies] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // When the map owner passes a new clicked location, fill in the boxes.
  useEffect(() => {
    if (pickedLocation) {
      setLat(pickedLocation.lat.toFixed(5));
      setLng(pickedLocation.lng.toFixed(5));
    }
  }, [pickedLocation]);

  async function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading
    setError("");

    // Check the inputs before bothering the server
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (!species) {
      setError("Please choose a species.");
      return;
    }
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      setError("Please click the map or enter a valid latitude and longitude.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ species, lat: latNum, lng: lngNum }),
      });
      const data = await response.json();

      if (!response.ok) {
        // The backend sends errors as { "error": "message" }
        setError(data.error || "Something went wrong.");
        return;
      }

      onReportSuccess(data); // tell App.jsx: new sightings, pull sites, +5 points
      setSpecies(""); // reset the dropdown for the next report
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "12px" }}>
      <h3>Report an invasive plant</h3>

      <label>
        Species
        <select value={species} onChange={(e) => setSpecies(e.target.value)}>
          <option value="">-- choose a species --</option>
          {SPECIES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <label>
          Latitude
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Click the map"
          />
        </label>
      </div>

      <div>
        <label>
          Longitude
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Click the map"
          />
        </label>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit report (+5 points)"}
      </button>
    </form>
  );
}

export default ReportForm;