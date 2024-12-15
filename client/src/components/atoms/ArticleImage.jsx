import Image from "next/image";

const ArticleImage = ({ src, alt, description }) => (
  <div className="space-y-4 mb-12 animate-fade-in">
    <div
      className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl 
      transform hover:scale-[1.02] transition-all duration-300 hover:shadow-main/20"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
    {description && (
      <div
        className="group bg-gradient-to-br from-white/80 to-main/5 backdrop-blur-sm p-6 rounded-xl 
        border border-main/10 shadow-sm hover:shadow-lg transform hover:-translate-y-1 
        transition-all duration-300 hover:border-main/20"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-main/5 group-hover:bg-main/10 transition-colors duration-300">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p
            className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 
            transition-colors duration-300"
          >
            {description}
          </p>
        </div>
      </div>
    )}
  </div>
);

export default ArticleImage;
