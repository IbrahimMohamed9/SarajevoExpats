import Link from "next/link";

const FilterButton = ({ label, count, isSelected, pathname }) => (
  <Link
    href={`${pathname}/${label}`}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full border !text-sm font-medium
      transition-all duration-200
      ${
        isSelected
          ? "bg-main !text-white border-main hover:bg-main/90"
          : "bg-white border-gray-300 !text-gray-700 hover:bg-gray-50 hover:border-gray-400"
      }
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main
    `}
  >
    <span>{label}</span>
    <span
      className={`
      px-2 py-0.5 rounded-full text-xs
      ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}
    `}
    >
      {count}
    </span>
  </Link>
);

export default FilterButton;
