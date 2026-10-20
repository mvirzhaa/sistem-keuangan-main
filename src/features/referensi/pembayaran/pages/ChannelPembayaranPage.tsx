import { useState } from "react";
import TabNavigation from "../../../../components/navigation/TabNavigation";
import IconButton from "../../../../components/button/IconButton";
import { IoMdSync } from "react-icons/io";
import ChannelPembayaranEdufinTable from "../components/ChannelPembayaranEdufinTable";
import ChannelPembayaranSiakadSection from "../components/ChannelPembayaranSiakadSection";

export default function ChannelPembayaranPage() {
  document.title = "Channel Pembayaran";

  // Tab state management
  const [activeTab, setActiveTab] = useState("edufin");

  // Tab configuration
  const tabs = [
    { label: "Channel pembayaran edufin", value: "edufin" },
    { label: "Channel pembayaran siakad", value: "siakad" },
  ];

  // Handle tab change
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Channel Pembayaran</h1>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="w-full shadow-md"
      />

      {/* Tab Content */}
      <div className="shadow-md rounded-md p-4 bg-white">
        {activeTab === "edufin" && <BuildChannelEdufin />}

        {activeTab === "siakad" && <ChannelPembayaranSiakadSection />}
      </div>
    </>
  );
}

function BuildChannelEdufin() {
  return (
    <>
      <div className="flex justify-end my-2">
        <IconButton
          icon={<IoMdSync />}
          text="Sync Channel Edufin"
          variant="info"
        />
      </div>
      <ChannelPembayaranEdufinTable />
    </>
  );
}
