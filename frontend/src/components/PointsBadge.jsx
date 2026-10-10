function PointsBadge({ message }) {
  if (!message) return null
  return <span className="points-badge" role="status">{message}</span>
}

export default PointsBadge