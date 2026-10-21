import React from "react";

export interface MenuItem {
  label: string;
  value: string;
  isDiaktifkan?: boolean;
}

interface AturanAkademikMenuProps {
  items: MenuItem[];
  title: string;
  activeValue?: string;
  onItemClick: (item: MenuItem) => void;
}

const AturanAkademikMenu: React.FC<AturanAkademikMenuProps> = ({
  title,
  items,
  activeValue,
  onItemClick,
}) => (
  <div className="bg-[#f8fafc] border border-gray-200 rounded text-xs w-full sm:w-64 md:w-72 shrink-0 overflow-hidden shadow-xs">
    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
      <span className="font-bold text-[#004e82] text-sm tracking-wide">
        {title}
      </span>
    </div>
    <div className="flex flex-col">
      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <div
            key={item.value}
            className={`px-4 py-3 border-b border-gray-100 flex flex-col justify-between cursor-pointer transition-colors ${
              isActive
                ? "border-l-4 border-l-[#00c0ef] text-[#00c0ef] bg-[#f0f9ff]/60 font-medium"
                : "border-l-4 border-l-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => onItemClick(item)}
          >
            <span className="text-xs">{item.label}</span>
            {item.isDiaktifkan && (
              <span className="px-2 py-0.5 bg-[#00a65a] text-white text-[11px] font-semibold rounded w-fit mt-1.5">
                Diaktifkan
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default AturanAkademikMenu;
