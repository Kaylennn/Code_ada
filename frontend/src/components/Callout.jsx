function Callout({ children, onRetry, tone = 'error' }) {
  return (
    <div className={`callout callout--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <p>{children}</p>
      {onRetry && (
        <button className="text-button" type="button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export default Callout
