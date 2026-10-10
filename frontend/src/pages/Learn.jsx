import { lazy, Suspense } from 'react'

const EducationHub = lazy(() => import('../components/EducationHub.jsx'))

function Learn({ hidden, onEarnPoints, onReportSpecies }) {
  return (
    <section className="page-shell page-section" hidden={hidden}>
      <div className="page-intro page-intro--split">
        <div>
          <p className="eyebrow">A field guide for our community</p>
          <h1>Learn to spot<br /><em>what’s growing.</em></h1>
        </div>
        <p>Explore guided lessons, species profiles, and quizzes to learn what to look for and how to report safely.</p>
      </div>
      <Suspense fallback={<p className="loading-panel" role="status">Loading learning modules…</p>}>
        <EducationHub onEarnPoints={onEarnPoints} onReportSpecies={onReportSpecies} />
      </Suspense>
      <div className="learn-note">
        <span aria-hidden="true">✳</span>
        <p>Plant and pest identification can be difficult. This guide is introductory; follow local expert guidance for identification and management.</p>
      </div>
    </section>
  )
}

export default Learn
