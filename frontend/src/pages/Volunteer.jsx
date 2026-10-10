import Callout from '../components/Callout.jsx'
import PullSiteCard from '../components/PullSiteCard.jsx'
import BotanicalArt from '../components/BotanicalArt.jsx'

function Volunteer({ pullsites, loading, pullsitesError, onRetryPullsites, onSignup }) {
  return (
    <section className="page-shell page-section volunteer-page">
      <div className="volunteer-hero">
        <div>
          <p className="eyebrow">Care is a team effort</p>
          <h1>Make room<br /><em>for what belongs.</em></h1>
          <p>Explore community pull sites identified by the project and see where volunteer support may be needed.</p>
        </div>
        <BotanicalArt />
      </div>
      <div className="section-heading section-heading--compact volunteer-heading">
        <div><p className="eyebrow">Community opportunities</p><h2>Pull sites</h2></div>
        <p>Volunteer and time estimates are provided by the backend.</p>
      </div>
      {pullsitesError && <Callout onRetry={onRetryPullsites}>Couldn’t load volunteer opportunities: {pullsitesError}</Callout>}
      {loading && <p className="loading-panel" role="status">Loading opportunities…</p>}
      {!loading && !pullsitesError && pullsites.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">✳</span>
          <h3>No pull sites are available right now</h3>
          <p>Check back later, or help by reporting a sighting.</p>
          <a className="button button--light" href="#report">Report a sighting</a>
        </div>
      )}
      {!loading && !pullsitesError && pullsites.length > 0 && (
        <div className="volunteer-grid">
          {pullsites.map((pullsite) => (
            <PullSiteCard key={pullsite.id} pullsite={pullsite} onSignup={onSignup} compact />
          ))}
        </div>
      )}
      <div className="volunteer-safety">
        <span aria-hidden="true">!</span>
        <p>Some plants require trained handling. Safety guidance is shown on individual opportunities; do not attempt unsupervised removal.</p>
      </div>
    </section>
  )
}

export default Volunteer
