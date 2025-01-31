const ContactInfoRow = ({
  href,
  title,
  className = "",
  content,
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 p-4 min-w-full rounded-lg bg-white hover:bg-main/5 transition-colors duration-300 ${className}`}
    >
      <div className="p-2 rounded-full bg-main/5 group-hover:bg-white/80 transition-colors duration-300">
        <Icon className="w-6 h-6 fill-main group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="overflow-hidden">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-800 group-hover:text-main transition-colors duration-300 block overflow-hidden text-ellipsis">
          {content}
        </p>
      </div>
    </a>
  );
};

export default ContactInfoRow;
