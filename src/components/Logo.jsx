export default function Logo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="schafric"
    >
      {/* Leaf mark */}
      <path
        d="M4 24C4 24 8 8 16 8C20 8 18 16 14 20C10 24 4 24 4 24Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M10 26C10 26 14 14 20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Text */}
      <text
        x="28"
        y="23"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        schafric
      </text>
    </svg>
  )
}
