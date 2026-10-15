import React from "react";

export type DashboardTabId =
  | "dashboard"
  | "jenis_tagihan"
  | "angkatan_mahasiswa"
  | "transaksi_tiap_bulan";

export interface TabItem {
  id: DashboardTabId;
  label: string;
}

export const DASHBOARD_TABS: TabItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "jenis_tagihan", label: "Jenis Tagihan" },
  { id: "angkatan_mahasiswa", label: "Angkatan Mahasiswa" },
  { id: "transaksi_tiap_bulan", label: "Transaksi Tiap Bulan" },
];

interface DashboardTabsProps {
  activeTab: DashboardTabId;
  onTabChange: (tabId: DashboardTabId) => void;
}

export default function DashboardTabs({
  activeTab,
  onTabChange,
}: DashboardTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-gray-200 pt-3 px-4 bg-white overflow-x-auto">
      {DASHBOARD_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-white text-gray-800 border-t border-l border-r border-gray-300 rounded-t-md -mb-px shadow-xs"
                : "text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50 rounded-t-md"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
