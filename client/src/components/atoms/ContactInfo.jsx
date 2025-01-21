import WhatsappLink from "@atoms/WhatsappLink";

const ContactInfo = ({ phone, email, location, whatsappLink, instagramLink }) => {
  if (!phone && !email && !location && !whatsappLink && !instagramLink) return null;

  return (
    <div
      className="mt-16 p-8 bg-gradient-to-br from-main/5 to-main/10 backdrop-blur-sm 
      rounded-2xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300"
    >
      <h2
        className="text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-main to-main/70 
        bg-clip-text text-transparent"
      >
        Get in Touch
      </h2>
      <div className="space-y-4">
        {phone && <WhatsappLink phone={phone} title={phone} />}

        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg shadow-sm 
            hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group
            hover:bg-main/5"
            aria-label={`Send email to ${email}`}
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
                {email}
              </p>
            </div>
          </a>
        )}
        {location && (
          <a
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg shadow-sm 
            hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group
            hover:bg-main/5"
            aria-label="View location on map"
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
                View on Map
              </p>
            </div>
          </a>
        )}
        {instagramLink && (
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-white/80 rounded-lg shadow-sm 
            hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group
            hover:bg-main/5"
            aria-label="View on Instagram"
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Instagram</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
                View Event
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
