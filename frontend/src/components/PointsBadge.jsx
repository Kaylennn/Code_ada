// Prop (App.jsx will pass this in):
//   points - the user's current point total (a number)
function PointsBadge({ points }) {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "999px",
        background: "#2e7d32",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      Points: {points}
    </div>
  );
}

export default PointsBadge;