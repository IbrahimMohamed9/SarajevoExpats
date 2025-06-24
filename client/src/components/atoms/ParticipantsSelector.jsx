import React, { useState } from "react";

const ParticipantsSelector = ({ numberOfPeople, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDecrease = () => {
    if (numberOfPeople > 1) {
      onChange(numberOfPeople - 1);
    }
  };

  const handleIncrease = () => {
    if (numberOfPeople < 10) {
      onChange(numberOfPeople + 1);
    }
  };

  return (
    <div className="relative w-full">
      <div 
        className="flex items-center bg-white text-gray-700 rounded-full px-4 py-3 h-12 cursor-pointer border border-gray-200 transition-all hover:border-main"
        onClick={toggleDropdown}
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Adult x {numberOfPeople}</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 border-2 border-main/20 animate-fadeIn">
          <div className="flex flex-col items-center">
            <div className="text-main font-medium mb-2">Number of Adults</div>
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-main text-white flex items-center justify-center hover:bg-tertiary transition-colors"
                onClick={handleDecrease}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="text-2xl font-bold text-main px-4">
                {numberOfPeople}
              </span>

              <button
                type="button"
                className="w-10 h-10 rounded-full bg-main text-white flex items-center justify-center hover:bg-tertiary transition-colors"
                onClick={handleIncrease}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsSelector;
