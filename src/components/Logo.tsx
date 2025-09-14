export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 7L12 12L2 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}