import React from "react";

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "reviewed" | "yet to review";
  onFilterChange: (value: "all" | "reviewed" | "yet to review") => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-gray-50 border-b border-gray-200 shadow-sm">
      {/* Search */}
      <input
        type="text"
        placeholder="Search files..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-700"
      />

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "All" },
          { value: "reviewed", label: "Reviewed" },
          { value: "yet to review", label: "Yet to Review" },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value as "all" | "reviewed" | "yet to review")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200
              ${
                filter === value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBar;