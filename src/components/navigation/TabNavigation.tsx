import React from "react";

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  vertical?: boolean;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  vertical = false,
  className = "",
}) => {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`
            flex-1 text-center
            ${vertical ? "w-full" : ""}
            ${
              tab.disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-blue-50"
            }
            ${
              activeTab === tab.value
                ? `bg-blue-50 ${
                    vertical ? "border-l-4" : "border-b-4"
                  } border-blue-500`
                : ""
            }
            px-4 py-3 text-sm
          `}
          onClick={() => {
            if (!tab.disabled) {
              onTabChange(tab.value);
            }
          }}
        >
          <span
            className={`
              ${activeTab === tab.value ? "text-blue-500" : "text-gray-500"}
              ${tab.disabled ? "text-gray-400" : ""}
            `}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
