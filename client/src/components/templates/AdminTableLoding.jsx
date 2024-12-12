import React from "react";

const AdminTableLoding = () => {
  return (
    <>
      <div className="w-full bg-white rounded-lg p-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 rounded"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>

      <div className="h-4"></div>
    </>
  );
};

export default AdminTableLoding;
