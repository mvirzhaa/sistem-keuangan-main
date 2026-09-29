import { useState } from "react";
import TabNavigation from "../../../../components/navigation/TabNavigation";
import MetodePembayaranEdufinTable from "../components/MetodePembayaranEdufinTable";
import MetodePembayaranSiakadTable from "../components/MetodePembayaranSiakadTable";

export default function PengaturanMetodePembayaran() {
  document.title = "Channel Pembayaran";

  // Tab state management
  const [activeTab, setActiveTab] = useState("edufuin");

  // Tab configuration
  const tabs = [
    { label: "Metode pembayaran edufuin", value: "edufuin" },
    { label: "Metode pembayaran siakad", value: "siakad" },
  ];

  // Handle tab change
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan Metode Pembayaran</h1>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="w-full shadow-md"
      />

      {/* Tab Content */}
      <div className="shadow-md rounded-md p-4 bg-white">
        {activeTab === "edufuin" && <BuildChannelEdufin />}

        {activeTab === "siakad" && <BuildChannelSiakad />}
      </div>
    </>
  );
}

function BuildChannelEdufin() {
  return (
    <>
      <MetodePembayaranEdufinTable />
    </>
  );
}

function BuildChannelSiakad() {
  return (
    <>
      <MetodePembayaranSiakadTable />
    </>
  );
}
