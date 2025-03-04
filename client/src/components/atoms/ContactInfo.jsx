import WhatsappLink from "./WhatsappLink";
import PhoneIcon from "@icons/PhoneIcon";
import EmailIcon from "@icons/EmailIcon";
import LocationIcon from "@icons/LocationIcon";
import InstagramIcon from "@icons/InstagramIcon";
import ContactInfoRow from "@atoms/ContactInfoRow";
import WebAssetIcon from "@mui/icons-material/WebAsset";

const ContactInfo = ({
  phone,
  email,
  location,
  whatsappLink,
  instagramLink,
  className = "",
  website,
  whatsappNumber,
}) => {
  if (
    !phone &&
    !email &&
    !location &&
    !whatsappLink &&
    !instagramLink &&
    !website &&
    !whatsappNumber
  )
    return null;

  const rows = [
    { href: `tel:${phone}`, title: "Phone", icon: PhoneIcon, content: phone },
    {
      href: `mailto:${email}`,
      title: "Email",
      icon: EmailIcon,
      content: email,
    },
    {
      href: location,
      title: "Location",
      icon: LocationIcon,
      content: location,
    },
    {
      href: website,
      title: "Website",
      icon: WebAssetIcon,
      content: website,
    },
  ];

  const rowsElements = rows.map(
    (row, index) => row.content && <ContactInfoRow {...row} key={index} />
  );

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
        {rowsElements}

        {whatsappNumber && <WhatsappLink phone={whatsappNumber} />}

        {instagramLink && (
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-pink-50 transition-colors duration-300"
          >
            <div className="p-2 rounded-full bg-pink-50 group-hover:bg-white transition-colors duration-300">
              <InstagramIcon />
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
