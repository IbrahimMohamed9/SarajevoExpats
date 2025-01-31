const ArticleHeader = ({ title, date, type }) => (
  <header className="relative mb-12 text-center animate-fade-in">
    <div className="space-y-6">
      {type && (
        <div
          className="inline-block px-6 py-2 bg-main/5 text-main text-sm font-medium 
          rounded-full transform hover:scale-105 transition-all duration-300 cursor-default
          hover:bg-main/10 hover:shadow-sm hover:shadow-main/10"
        >
          {type}
        </div>
      )}
      <h1
        className="text-5xl font-bold mb-4 bg-gradient-to-r from-main to-main/70 bg-clip-text 
        text-transparent hover:from-main/70 hover:to-main transition-all duration-500
        leading-tight tracking-tight"
      >
        {title}
      </h1>
      <div className="text-gray-600 text-lg flex items-center justify-center gap-3 group">
        <div className="p-2 rounded-full bg-main/5 group-hover:bg-main/10 transition-colors duration-300">
          <svg
            className="w-5 h-5 text-main group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="group-hover:text-gray-900 transition-colors duration-300">
          Last updated: {date}
        </span>
      </div>
    </div>
  </header>
);

export default ArticleHeader;
