//Saat menekan tombol tambah di halaman Tagihan, maka akan diarahkan ke halaman Detail Tagihan ini

import { IoMdArrowBack, IoMdSave, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import DetailTagihanForm from "../components/DetailTagihanForm";
import type { TabItem } from "../../../components/navigation/TabNavigation";
import { useState } from "react";
import TabNavigation from "../../../components/navigation/TabNavigation";
import { useNavigate } from "react-router-dom";

export default function DetailTagihanPage() {
  document.title = "Transaksi - Detail Tagihan";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("tagihan");

  const tabs: TabItem[] = [
    { label: "Data Tagihan", value: "tagihan" },
    { label: "Potongan / Beasiswa", value: "potongan", disabled: true },
    { label: "Pembayaran", value: "pembayaran", disabled: true },
  ];

  // Handler untuk perubahan tab
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Tagihan</p>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex justify-between">
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Transaksi" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
          </div>
          <div className="flex space-x-0.5 items-center">
            <IconButton icon={<IoMdArrowBack />} text="Kembali ke Daftar" variant="info" onClick={() => navigate(-1)} />
            <IconButton icon={<IoMdSave />} text="Simpan" variant="success" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-4 sm:space-y-0 mt-4">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} vertical={true} className=" rounded bg-blue-100 h-fit" />
          <DetailTagihanForm />
        </div>
      </div>
    </>
  );
}
