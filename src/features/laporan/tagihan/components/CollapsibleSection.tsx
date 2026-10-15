import React from "react";
import { IoChevronDown } from "react-icons/io5";

interface CollapsibleSectionProps {
  id?: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div>
      <div className="pt-2">
        <button
          id={id}
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-sm focus:outline-none cursor-pointer select-none group py-1"
        >
          <span>{title}</span>
          <IoChevronDown
            className={`text-emerald-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="space-y-4 pl-0 sm:pl-2 border-l-2 border-emerald-200/80 my-2 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};
