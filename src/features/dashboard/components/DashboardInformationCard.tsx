import React, { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

interface DashboardInformationCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  tooltipContent?: string;
  gradient: {
    from: string;
    to: string;
  };
  className?: string;
  textColor?: string;
}

const DashboardInformationCard: React.FC<DashboardInformationCardProps> = ({ title, value, icon, tooltipContent, gradient, className = "", textColor = "text-white" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative rounded-lg shadow-lg ${className}`}
      style={{
        background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {/* Card content */}
      <div className="p-5 relative z-10 overflow-visible">
        {/* Header with title and info icon */}
        <div className="flex justify-between items-center mb-2">
          <h3 className={`font-medium ${textColor}`}>{title}</h3>
          <div className="relative">
            <button className={`${textColor} hover:opacity-80 focus:outline-none transition-opacity`} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} aria-label="Information">
              <IoInformationCircle size={20} />
            </button>

            {/* Tooltip dengan posisi absolut di luar flow, tetap visible meskipun parent overflow hidden */}
            {showTooltip && tooltipContent && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-white text-gray-800 text-xs rounded shadow-lg p-3 w-60">
                <div className="absolute -top-1 right-2 w-2 h-2 bg-white transform rotate-45"></div>
                {tooltipContent}
              </div>
            )}
          </div>
        </div>

        {/* Value */}
        <div className={`text-4xl font-bold ${textColor}`}>{value}</div>
      </div>

      {/* Left side icon dengan overflow hidden pada container utama, posisikan icon di dalam */}
      <div className="absolute left-0 bottom-0 opacity-20 z-0 overflow-hidden">{icon}</div>
    </div>
  );
};

export default DashboardInformationCard;
