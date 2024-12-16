"use client";

import FilterButton from "@atoms/FilterButton";

const FilterSection = ({ types, counts, onTypeSelect, selectedType }) => {
  const filterBtnElements = types.map((type) => (
    <FilterButton
      key={type._id}
      label={type.name}
      count={counts[type.name] || 0}
      isSelected={selectedType === type.name}
      onTypeSelect={onTypeSelect}
    />
  ));

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Filter by Type</h3>
          {selectedType && (
            <button
              onClick={() => onTypeSelect(null)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">{filterBtnElements}</div>
      </div>
    </div>
  );
};

export default FilterSection;
