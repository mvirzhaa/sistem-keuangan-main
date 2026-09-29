import { useState } from "react";
import TabNavigation from "../../../../components/navigation/TabNavigation";
import IconButton from "../../../../components/button/IconButton";
import { IoMdAdd, IoMdRefresh, IoMdSearch, IoMdSync } from "react-icons/io";
import ChannelPembayaranEdufinTable from "../components/ChannelPembayaranEdufinTable";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import ChannelPembayaranSiakadTable from "../components/ChannelPembayaranSiakadTable";

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

        {activeTab === "siakad" && <BuildChannelSiakad />}
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

function BuildChannelSiakad() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
        <div className="flex flex-col sm:flex-row space-x-8 ">
          <Dropdown
            options={["-- Semua --", "NIM", "Nama"]}
            className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
          />
          <div className="flex space-x-0.5 items-center">
            <TextField
              placeholder="Cari Channel Pembayaran"
              className="w-full sm:w-80"
            />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div className="flex space-x-2">
          <IconButton
            icon={<IoMdAdd />}
            responsive={false}
            text="Tambah"
            variant="success"
            className="text-sm"
            onClick={() => setShowAddForm(!showAddForm)} // Toggle form visibility
          />
        </div>
      </div>
      <ChannelPembayaranSiakadTable
        showAddForm={showAddForm}
        onAddClick={() => setShowAddForm(false)} // Hide form when done
      />
    </>
  );
}
