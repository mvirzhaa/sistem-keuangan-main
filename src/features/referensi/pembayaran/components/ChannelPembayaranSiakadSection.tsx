import React, { useState, useMemo } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import IconButton from "../../../../components/button/IconButton";
import { IoMdAdd, IoMdRefresh, IoMdSearch } from "react-icons/io";
import ChannelPembayaranSiakadTable, {
  type ChannelPembayaranSiakad,
} from "./ChannelPembayaranSiakadTable";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";

const initialSiakadData: ChannelPembayaranSiakad[] = [
  {
    id: "1",
    kode: "01",
    nama: "Bank Syariah Indonesia",
    logo: "bank_BSI.png",
    aktif: true,
  },
  {
    id: "2",
    kode: "02",
    nama: "BPRS Amanah Ummah",
    logo: "bank_amanah Ummah",
    aktif: true,
  },
  {
    id: "3",
    kode: "03",
    nama: "Tokopedia",
    logo: "bank_tokped.png",
    aktif: true,
  },
  {
    id: "4",
    kode: "ACH",
    nama: "Bank Aceh",
    logo: "bank_aceh.png",
    aktif: false,
  },
  {
    id: "5",
    kode: "BCA",
    nama: "Bank Central Asia",
    logo: "bank_bca.png",
    aktif: false,
  },
  {
    id: "6",
    kode: "BTS",
    nama: "BTN Syariah",
    logo: "bank_btnsyariah.png",
    aktif: false,
  },
  {
    id: "7",
    kode: "KSR",
    nama: "Kasir BASK UiKA",
    logo: "bank_Bask",
    aktif: true,
  },
  {
    id: "8",
    kode: "MUA",
    nama: "Bank Muamalat",
    logo: "bank_muamalat.png",
    aktif: true,
  },
  {
    id: "9",
    kode: "NAG",
    nama: "Bank Nagari",
    logo: "bank_nagari.png",
    aktif: false,
  },
  {
    id: "10",
    kode: "OVO",
    nama: "OVO",
    logo: "bank_OVO",
    aktif: true,
  },
];

const ChannelPembayaranSiakadSection: React.FC = () => {
  // Data state
  const [channelData, setChannelData] =
    useState<ChannelPembayaranSiakad[]>(initialSiakadData);

  // Search state
  const searchCategoryOptions = ["-- Semua --", "Kode", "Nama", "Logo"];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Add & Delete states
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] =
    useState<ChannelPembayaranSiakad | null>(null);

  // Search handlers
  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchQuery("");
    setSearchCategory("-- Semua --");
  };

  // Add, Edit, Delete handlers
  const handleSaveAdd = (newItem: ChannelPembayaranSiakad) => {
    setChannelData((prev) => [newItem, ...prev]);
    setIsAdding(false);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleUpdateItem = (updatedItem: ChannelPembayaranSiakad) => {
    setChannelData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const handleDeleteItem = (item: ChannelPembayaranSiakad) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setChannelData((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id),
      );
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  // Filtered Data based on Search
  const filteredData = useMemo(() => {
    if (!searchQuery) return channelData;
    const query = searchQuery.toLowerCase();

    return channelData.filter((item) => {
      if (searchCategory === "Kode") {
        return item.kode.toLowerCase().includes(query);
      } else if (searchCategory === "Nama") {
        return item.nama.toLowerCase().includes(query);
      } else if (searchCategory === "Logo") {
        return item.logo.toLowerCase().includes(query);
      } else {
        return (
          item.kode.toLowerCase().includes(query) ||
          item.nama.toLowerCase().includes(query) ||
          item.logo.toLowerCase().includes(query)
        );
      }
    });
  }, [channelData, searchQuery, searchCategory]);

  return (
    <>
      {/* Search & Actions Header (Image 1) */}
      <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 items-start sm:items-center">
          <Dropdown
            options={searchCategoryOptions}
            value={searchCategory}
            defaultValue="-- Semua --"
            onChange={(value) => setSearchCategory(value)}
            className="w-40 text-xs"
          />
          <div className="flex space-x-0.5 items-center">
            <TextField
              placeholder="Cari Channel Pembayaran"
              value={searchInput}
              onChange={(value) => setSearchInput(value)}
              onEnter={handleSearch}
              className="w-full sm:w-80 text-xs"
            />
            <IconButton
              icon={<IoMdSearch />}
              variant="success"
              onClick={handleSearch}
              title="Cari"
            />
            <IconButton
              icon={<IoMdRefresh />}
              variant="info"
              onClick={handleReset}
              title="Reset Pencarian"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <IconButton
            icon={<IoMdAdd />}
            responsive={false}
            text="Tambah"
            variant="success"
            className="text-sm"
            onClick={() => setIsAdding((prev) => !prev)}
          />
        </div>
      </div>

      {/* Table (Image 1 & Inline Edit Image 2) */}
      <ChannelPembayaranSiakadTable
        data={filteredData}
        isAdding={isAdding}
        onSaveAdd={handleSaveAdd}
        onCancelAdd={handleCancelAdd}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />

      {/* Delete Confirmation Modal (Image 3) */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setItemToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
};

export default ChannelPembayaranSiakadSection;
