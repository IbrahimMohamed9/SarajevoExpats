import WhatsappLink from "@atoms/WhatsappLink";

const ContactInfo = ({ phone, email, location, whatsappLink }) => {
  if (!phone && !email && !location && !whatsappLink) return null;

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
      </div>
    </div>
  );
};

export default ContactInfo;
