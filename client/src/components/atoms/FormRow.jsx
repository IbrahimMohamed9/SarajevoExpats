import React from "react";

const FormRow = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormRow;
