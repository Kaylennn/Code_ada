// Education section: modules -> lessons -> quiz.
//
// Usage (in App.jsx, owned by whoever has App):
//   import EducationHub from './components/EducationHub.jsx'
//   <EducationHub
//     onEarnPoints={(n) => setPoints((p) => p + n)}
//     onReportSpecies={(speciesKey) => { /* optional: open ReportForm preset */ }}
//   />
//
// Points are awarded once per lesson / quiz. Completion lives in this
// component's state, so keep it mounted (e.g. hide it with CSS when switching
// tabs) or completed lessons can be earned again.

import { useState } from 'react'
import {
  MODULES,
  SPECIES_INFO,
  SOURCES,
  POINTS,
  QUIZ_PASS_RATIO,
  MONTHS,
  lessonId,
  commonsImage,
  commonsPage,
} from '../data/education.js'
import './EducationHub.css'

export default function EducationHub({ onEarnPoints, onReportSpecies }) {
  const [view, setView] = useState({ name: 'hub' })
  const [doneLessons, setDoneLessons] = useState(() => new Set())
  const [passedQuizzes, setPassedQuizzes] = useState(() => new Set())

  function award(n, reason) {
    if (onEarnPoints) onEarnPoints(n, reason)
  }

  function completeLesson(id) {
    if (doneLessons.has(id)) return
    setDoneLessons(new Set(doneLessons).add(id))
    award(POINTS.lesson, `lesson:${id}`)
  }

  function passQuiz(moduleId) {
    if (passedQuizzes.has(moduleId)) return
    setPassedQuizzes(new Set(passedQuizzes).add(moduleId))
    award(POINTS.quiz, `quiz:${moduleId}`)
  }

  const module = view.moduleId && MODULES.find((m) => m.id === view.moduleId)

  return (
    <div className="edu">
      {view.name === 'hub' && (
        <Hub
          doneLessons={doneLessons}
          passedQuizzes={passedQuizzes}
          onOpen={(moduleId) => setView({ name: 'module', moduleId })}
        />
      )}

      {view.name === 'module' && (
        <ModuleView
          module={module}
          doneLessons={doneLessons}
          quizPassed={passedQuizzes.has(module.id)}
          onBack={() => setView({ name: 'hub' })}
          onOpenLesson={(index) => setView({ name: 'lesson', moduleId: module.id, index })}
          onOpenQuiz={() => setView({ name: 'quiz', moduleId: module.id })}
        />
      )}

      {view.name === 'lesson' && (
        <LessonView
          module={module}
          index={view.index}
          done={doneLessons.has(lessonId(module.lessons[view.index]))}
          onComplete={completeLesson}
          onReportSpecies={onReportSpecies}
          onNavigate={(index) => setView({ name: 'lesson', moduleId: module.id, index })}
          onBack={() => setView({ name: 'module', moduleId: module.id })}
          onQuiz={() => setView({ name: 'quiz', moduleId: module.id })}
        />
      )}

      {view.name === 'quiz' && (
        <Quiz
          key={module.id}
          module={module}
          alreadyPassed={passedQuizzes.has(module.id)}
          onPass={() => passQuiz(module.id)}
          onBack={() => setView({ name: 'module', moduleId: module.id })}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------

function moduleProgress(module, doneLessons, passedQuizzes) {
  const total = module.lessons.length + 1 // + quiz
  const done =
    module.lessons.filter((l) => doneLessons.has(lessonId(l))).length +
    (passedQuizzes.has(module.id) ? 1 : 0)
  return { done, total }
}

function ProgressBar({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="edu-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="edu-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

function Hub({ doneLessons, passedQuizzes, onOpen }) {
  const earned =
    doneLessons.size * POINTS.lesson + passedQuizzes.size * POINTS.quiz
  return (
    <>
      <header className="edu-header">
        <h2>Learn to Spot Invasives</h2>
        <p>
          Finish lessons (+{POINTS.lesson} pts each) and pass module quizzes (+{POINTS.quiz} pts) so
          you can identify and report invasive species around Champaign-Urbana.
        </p>
        <div className="edu-earned">⭐ {earned} education points earned</div>
      </header>

      <div className="edu-grid">
        {MODULES.map((m) => {
          const { done, total } = moduleProgress(m, doneLessons, passedQuizzes)
          return (
            <button key={m.id} className="edu-card" onClick={() => onOpen(m.id)}>
              <span className="edu-card-emoji">{m.emoji}</span>
              <span className="edu-card-title">{m.title}</span>
              <span className="edu-card-summary">{m.summary}</span>
              <ProgressBar done={done} total={total} />
              <span className="edu-card-meta">
                {done === total ? '✅ Complete' : `${done} / ${total} done`}
              </span>
            </button>
          )
        })}
      </div>

      <Sources />
    </>
  )
}

function ModuleView({ module, doneLessons, quizPassed, onBack, onOpenLesson, onOpenQuiz }) {
  return (
    <>
      <button className="edu-back" onClick={onBack}>← All modules</button>
      <header className="edu-header">
        <h2>{module.emoji} {module.title}</h2>
        <p>{module.summary}</p>
      </header>

      <ol className="edu-lesson-list">
        {module.lessons.map((lesson, i) => {
          const id = lessonId(lesson)
          const info = lesson.kind === 'species' ? SPECIES_INFO[lesson.species] : lesson
          return (
            <li key={id}>
              <button className="edu-lesson-row" onClick={() => onOpenLesson(i)}>
                {info.images ? (
                  <Thumb image={info.images[0]} emoji={info.emoji} />
                ) : (
                  <span className="edu-lesson-emoji">{info.emoji}</span>
                )}
                <span className="edu-lesson-text">
                  <strong>{info.title || info.name}</strong>
                  {info.scientific && <em>{info.scientific}</em>}
                </span>
                {info.farm_risk && <span className="edu-tag edu-tag-farm">Farm risk</span>}
                <span className="edu-check">{doneLessons.has(id) ? '✅' : '○'}</span>
              </button>
            </li>
          )
        })}
        <li>
          <button className="edu-lesson-row edu-quiz-row" onClick={onOpenQuiz}>
            <span className="edu-lesson-emoji">📝</span>
            <span className="edu-lesson-text">
              <strong>Module quiz</strong>
              <em>{module.quiz.length} questions · +{POINTS.quiz} pts</em>
            </span>
            <span className="edu-check">{quizPassed ? '✅' : '○'}</span>
          </button>
        </li>
      </ol>
    </>
  )
}

function LessonView({ module, index, done, onComplete, onReportSpecies, onNavigate, onBack, onQuiz }) {
  const lesson = module.lessons[index]
  const id = lessonId(lesson)
  const isLast = index === module.lessons.length - 1

  return (
    <>
      <button className="edu-back" onClick={onBack}>← {module.title}</button>

      {lesson.kind === 'species' ? (
        <SpeciesLesson info={SPECIES_INFO[lesson.species]} onReportSpecies={onReportSpecies} />
      ) : (
        <TextLesson lesson={lesson} />
      )}

      <footer className="edu-lesson-footer">
        <button disabled={index === 0} onClick={() => onNavigate(index - 1)}>← Prev</button>
        <button
          className="edu-primary"
          onClick={() => {
            onComplete(id)
            if (isLast) onQuiz()
            else onNavigate(index + 1)
          }}
        >
          {done ? '' : `✓ Complete (+${POINTS.lesson}) · `}
          {isLast ? 'Take quiz →' : 'Next →'}
        </button>
      </footer>
    </>
  )
}

function TextLesson({ lesson }) {
  return (
    <article className="edu-lesson">
      <h2>{lesson.emoji} {lesson.title}</h2>
      {lesson.sections.map((s) => (
        <section key={s.heading} className="edu-section">
          <h3>{s.heading}</h3>
          <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </section>
      ))}
    </article>
  )
}

function SpeciesLesson({ info, onReportSpecies }) {
  return (
    <article className="edu-lesson">
      <div className="edu-species-hero" style={{ '--species-color': info.color }}>
        <span className="edu-species-emoji">{info.emoji}</span>
        <div>
          <h2>{info.name}</h2>
          <em>{info.scientific}</em>
          <p>{info.tagline}</p>
          <div className="edu-tags">
            <span className="edu-tag">{info.group}</span>
            {info.farm_risk && <span className="edu-tag edu-tag-farm">Farm risk</span>}
            {info.hosts && <span className="edu-tag">Hosts: {info.hosts}</span>}
          </div>
        </div>
      </div>

      {info.images && <Gallery images={info.images} emoji={info.emoji} name={info.name} />}

      <section className="edu-section">
        <h3>🔍 How to identify it</h3>
        <ul className="edu-checklist">
          {info.quickId.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      <section className="edu-section">
        <h3>👯 Don’t confuse it with</h3>
        <ul>{info.lookAlikes.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>

      <section className="edu-section edu-two-col">
        <div>
          <h3>⚠️ Why it’s a problem</h3>
          <p>{info.whyHarmful}</p>
        </div>
        <div>
          <h3>🚜 Farm impact</h3>
          <p>{info.farmImpact}</p>
        </div>
      </section>

      <section className="edu-section">
        <h3>📅 Best time to look</h3>
        <MonthStrip months={info.bestMonths} />
        <p className="edu-muted">{info.bestTimeNote}</p>
      </section>

      <section className="edu-section">
        <h3>🛠️ Sustainable removal & management</h3>
        <ul>{info.management.map((p) => <li key={p}>{p}</li>)}</ul>
        <p><strong>Disposal:</strong> {info.disposal}</p>
        {info.pull_rate && (
          <p className="edu-muted">
            Volunteer pull rate used for pull-site estimates: ~{info.pull_rate} plants per volunteer per hour.
          </p>
        )}
      </section>

      <section className="edu-section edu-safety">
        <h3>🧤 Safety</h3>
        <p>{info.safety}</p>
      </section>

      {onReportSpecies && (
        <button className="edu-report-btn" onClick={() => onReportSpecies(info.key)}>
          📍 Seen {info.name}? Report it on the map
        </button>
      )}
    </article>
  )
}

// Image that falls back to the species emoji if it fails to load (offline, etc.)
function Photo({ image, emoji, width, className, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`${className} edu-photo-fallback`}>{emoji}</div>
  return (
    <img
      className={className}
      src={commonsImage(image.file, width)}
      alt={alt || image.caption}
      onError={() => setFailed(true)}
    />
  )
}

function Thumb({ image, emoji }) {
  return <Photo image={image} emoji={emoji} width={120} className="edu-thumb" alt="" />
}

function Gallery({ images, emoji, name }) {
  return (
    <section className={images.length > 1 ? 'edu-gallery multi' : 'edu-gallery'}>
      {images.map((img) => (
        <figure key={img.file} className="edu-figure">
          <Photo image={img} emoji={emoji} width={800} className="edu-photo" alt={`${name}: ${img.caption}`} />
          <figcaption>
            <span>{img.caption}</span>
            <a href={commonsPage(img.file)} target="_blank" rel="noreferrer" className="edu-credit">
              Photo: {img.credit} · {img.license}
            </a>
          </figcaption>
        </figure>
      ))}
    </section>
  )
}

function MonthStrip({ months }) {
  return (
    <div className="edu-months">
      {MONTHS.map((m, i) => (
        <span key={i} className={months.includes(i + 1) ? 'edu-month on' : 'edu-month'}>
          {m}
        </span>
      ))}
    </div>
  )
}

function Quiz({ module, alreadyPassed, onPass, onBack }) {
  const questions = module.quiz
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = questions.filter((q, i) => answers[i] === q.answer).length
  const passed = score / questions.length >= QUIZ_PASS_RATIO
  const allAnswered = Object.keys(answers).length === questions.length

  function submit() {
    setSubmitted(true)
    if (score / questions.length >= QUIZ_PASS_RATIO) onPass()
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <>
      <button className="edu-back" onClick={onBack}>← {module.title}</button>
      <header className="edu-header">
        <h2>📝 {module.title} quiz</h2>
        <p>
          Get {Math.ceil(questions.length * QUIZ_PASS_RATIO)} of {questions.length} right to pass
          {alreadyPassed ? ' (already passed, practice mode)' : ` and earn +${POINTS.quiz} pts`}.
        </p>
      </header>

      {questions.map((q, i) => (
        <fieldset key={i} className="edu-question" disabled={submitted}>
          <legend>{i + 1}. {q.q}</legend>
          {q.options.map((opt, j) => {
            let cls = 'edu-option'
            if (submitted && j === q.answer) cls += ' correct'
            else if (submitted && answers[i] === j) cls += ' wrong'
            return (
              <label key={j} className={cls}>
                <input
                  type="radio"
                  name={`${module.id}-q${i}`}
                  checked={answers[i] === j}
                  onChange={() => setAnswers({ ...answers, [i]: j })}
                />
                {opt}
              </label>
            )
          })}
          {submitted && <p className="edu-explain">💡 {q.explain}</p>}
        </fieldset>
      ))}

      {!submitted ? (
        <button className="edu-primary" disabled={!allAnswered} onClick={submit}>
          Submit answers
        </button>
      ) : (
        <div className={passed ? 'edu-result pass' : 'edu-result fail'}>
          <strong>
            {score} / {questions.length}: {passed ? 'Passed! 🎉' : 'Not quite. Review the lessons and try again.'}
          </strong>
          <div className="edu-result-actions">
            {!passed && <button onClick={retry}>Retry</button>}
            <button className="edu-primary" onClick={onBack}>Back to module</button>
          </div>
        </div>
      )}
    </>
  )
}

function Sources() {
  return (
    <footer className="edu-sources">
      Sources:{' '}
      {SOURCES.map((s, i) => (
        <span key={s.url}>
          {i > 0 && ' · '}
          <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
        </span>
      ))}
    </footer>
  )
}
