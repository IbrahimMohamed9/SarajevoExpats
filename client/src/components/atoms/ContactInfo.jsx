import WhatsappLink from "./WhatsappLink";
import PhoneIcon from "../icons/PhoneIcon";
import EmailIcon from "../icons/EmailIcon";
import LocationIcon from "../icons/LocationIcon";
import InstagramIcon from "../icons/InstagramIcon";

const ContactInfo = ({
  phone,
  email,
  location,
  whatsappLink,
  instagramLink,
  className = "",
  whatsappNumber,
}) => {
  if (!phone && !email && !location && !whatsappLink && !instagramLink)
    return null;

  return (
    <div
      className={`mt-16 p-8 bg-gradient-to-br from-main/5 to-main/10 backdrop-blur-sm 
      rounded-2xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <h2
        className="text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-main to-main/70 
        bg-clip-text text-transparent"
      >
        Get in Touch
      </h2>
      <div className="space-y-4">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-main/5 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <PhoneIcon className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
                {phone}
              </p>
            </div>
          </a>
        )}

        {whatsappNumber && <WhatsappLink phone={whatsappNumber} />}

        {email && (
          <a
            href={`mailto:${email}`}
            className="group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-main/5 transition-colors duration-300"
            aria-label={`Send email to ${email}`}
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <EmailIcon className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300" />
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
            href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-main/5 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
              <LocationIcon className="w-6 h-6 text-main group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
                {location}
              </p>
            </div>
          </a>
        )}

        {instagramLink && (
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-pink-50 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-pink-50 group-hover:bg-white transition-colors duration-300">
              <InstagramIcon className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Instagram</p>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                Follow Us
              </p>
            </div>
          </a>
        )}

        {whatsappLink && <WhatsappLink />}
      </div>
    </div>
  );
};

export default ContactInfo;
