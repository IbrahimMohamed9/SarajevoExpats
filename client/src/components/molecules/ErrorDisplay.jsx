const ErrorDisplay = ({ title, message }) => (
  <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
    <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
      <svg
        className="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800">
        {title || "No Items Found"}
      </h2>
      <p className="text-gray-600 max-w-md">{message}</p>
    </div>
  </div>
);

export default ErrorDisplay;
