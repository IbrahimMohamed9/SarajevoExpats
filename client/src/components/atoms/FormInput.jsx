import React from "react";

const FormInput = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  className = "",
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full pl-10 pr-4 py-3 h-12 bg-white text-gray-700 rounded-full outline-none placeholder-gray-400 border border-gray-200 transition-all hover:border-main focus:border-main focus:shadow-sm ${className}`}
        placeholder={placeholder}
      />
      {icon && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
          {icon}
        </span>
      )}
    </div>
  );
};

export default FormInput;
