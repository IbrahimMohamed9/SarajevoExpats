import React from "react";
import WhatsAppIcon from "../icons/WhatsAppIcon";

const WhatsappLink = ({ phone, title, className = "" }) => {
  const href = phone
    ? `https://wa.me/${phone}`
    : "https://chat.whatsapp.com/K7yBPN5rYs7K4d2uNg1dHT";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-main/5 transition-colors duration-300 ${className}`}
    >
      <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
        <WhatsAppIcon className="w-6 h-6 fill-main group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">
          WhatsApp {phone ? "Phone" : "Group"}
        </p>
        <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300">
          {title || phone || "Join Our Community"}
        </p>
      </div>
    </a>
  );
};

export default WhatsappLink;
