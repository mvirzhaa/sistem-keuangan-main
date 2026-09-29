import React from "react";

export interface MenuItem {
  label: string;
  value: string;
  isActive: boolean;
}

interface AturanAkademikMenuProps {
  items: MenuItem[];
  title: string;
  onItemClick: (value: MenuItem) => void;
}

const AturanAkademikMenu: React.FC<AturanAkademikMenuProps> = ({
  title,
  items,
  onItemClick,
}) => (
  <div className="bg-blue-50 rounded text-xs border-l-2  border-l-blue-300">
    <div className="px-4 py-2 border-b border-gray-200">
      <span className="font-bold text-teal-700 text-base">{title}</span>
    </div>
    {items.map((item) => (
      <div
        key={item.value}
        className="px-4 py-3 border-b border-gray-100 hover:bg-gray-300 flex flex-col  justify-between cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        <span className="text-teal-700">{item.label}</span>
        {item.isActive && (
          <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded w-fit mt-1">
            Diaktifkan
          </span>
        )}
      </div>
    ))}
  </div>
);

export default AturanAkademikMenu;
