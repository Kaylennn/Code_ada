import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ExploreMap from './pages/ExploreMap.jsx'
import Learn from './pages/Learn.jsx'
import Report from './pages/Report.jsx'
import Volunteer from './pages/Volunteer.jsx'
import { getPullsites, getSightings, postReport, postSignup } from './services/api.js'

const pages = new Set(['home', 'map', 'learn', 'volunteer', 'report'])

function routeFromHash() {
  const page = window.location.hash.slice(1)
  return pages.has(page) ? page : 'home'
}

function App() {
  const [page, setPage] = useState(routeFromHash)
  const [sightings, setSightings] = useState([])
  const [pullsites, setPullsites] = useState([])
  const [sightingsError, setSightingsError] = useState('')
  const [pullsitesError, setPullsitesError] = useState('')
  const [loading, setLoading] = useState(true)
  const [pointsMessage, setPointsMessage] = useState('')

  useEffect(() => {
    let active = true
    const updatePage = () => setPage(routeFromHash())
    window.addEventListener('hashchange', updatePage)
    Promise.allSettled([getSightings(), getPullsites()]).then((results) => {
      if (!active) return
      if (results[0].status === 'fulfilled') {
        setSightings(results[0].value)
      } else {
        setSightingsError(results[0].reason.message)
      }
      if (results[1].status === 'fulfilled') {
        setPullsites(results[1].value)
      } else {
        setPullsitesError(results[1].reason.message)
      }
      setLoading(false)
    })
    return () => {
      active = false
      window.removeEventListener('hashchange', updatePage)
    }
  }, [])

  const handleReport = async (report) => {
    const result = await postReport(report)
    setSightings(result.sightings)
    setPullsites(result.pullsites)
    setSightingsError('')
    setPullsitesError('')
    return result
  }

  const handleSignup = async (pullsiteId) => {
    const result = await postSignup(pullsiteId)
    setPullsites((current) => current.map((site) =>
      site.id === result.pullsite.id ? result.pullsite : site,
    ))
    setPullsitesError('')
    if (typeof result.points_awarded === 'number') {
      setPointsMessage(`+${result.points_awarded} points earned`)
    } else {
      setPointsMessage('')
    }
    return result
  }

  const retrySightings = async () => {
    setSightingsError('')
    try {
      setSightings(await getSightings())
    } catch (error) {
      setSightingsError(error.message)
    }
  }

  const retryPullsites = async () => {
    setPullsitesError('')
    try {
      setPullsites(await getPullsites())
    } catch (error) {
      setPullsitesError(error.message)
    }
  }

  const sharedProps = {
    sightings,
    pullsites,
    loading,
    sightingsError,
    pullsitesError,
    onRetrySightings: retrySightings,
    onRetryPullsites: retryPullsites,
    onSignup: handleSignup,
  }

  return (
    <>
      <Navbar activePage={page} pointsMessage={pointsMessage} />
      <main>
        {page === 'home' && <Home />}
        {page === 'map' && <ExploreMap {...sharedProps} />}
        {page === 'learn' && <Learn />}
        {page === 'report' && <Report onSubmitReport={handleReport} />}
        {page === 'volunteer' && <Volunteer {...sharedProps} />}
      </main>
      <Footer />
    </>
  )
}

export default App
