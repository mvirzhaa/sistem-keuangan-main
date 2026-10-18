import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IoMdAdd, IoMdClose, IoMdRefresh, IoMdSearch } from "react-icons/io";
import FilterDataVirtualAccountCard, {
  type FilterValues,
  defaultFilterVAValues,
} from "../components/FilterDataVirtualAccountCard";
import TextField from "../../../components/inputs/TextField";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import VirtualAccountTable from "../components/VirtualAccountTable";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";
import transaksiApi, { type VirtualAccountData } from "../services/transaksi.api";
import { ValidationModal } from "../../laporan/tagihan/components/ValidationModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";

export default function VirtualAccountPage() {
  document.title = "Virtual Account - Daftar Transaksi VA";

  const navigate = useNavigate();

  // State data dari json
  const [dataList, setDataList] = useState<VirtualAccountData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State selection checkbox
  const [selectedVAs, setSelectedVAs] = useState<VirtualAccountData[]>([]);

  // State Search & Category
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // State Filters
  const [filters, setFilters] = useState<FilterValues>(defaultFilterVAValues);
  const [filterResetKey, setFilterResetKey] = useState<number>(0);

  // State Modal Validasi: "Tidak ada VA yang tercentang" (Gambar 4)
  const [isValidationModalOpen, setIsValidationModalOpen] = useState<boolean>(false);

  // State Modal Konfirmasi Batalkan VA
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState<boolean>(false);
  const [itemToCancel, setItemToCancel] = useState<VirtualAccountData | null>(null);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  // State Alert Pengubahan data Virtual Account berhasil (Gambar 4)
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Fetch data from mock json-server
  const fetchVirtualAccountData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getVirtualAccount();
      if (res && res.data) {
        setDataList(res.data);
      } else {
        setDataList([]);
      }
    } catch (err) {
      console.error("Gagal memuat data virtual account dari server:", err);
      setDataList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVirtualAccountData();
  }, [fetchVirtualAccountData]);

  // Handle Search Trigger
  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  // Handle Refresh / Reset
  const handleReset = () => {
    setSearchInput("");
    setActiveSearch("");
    setSearchCategory("-- Semua --");
    setFilters({ ...defaultFilterVAValues });
    setFilterResetKey((prev) => prev + 1);
    fetchVirtualAccountData();
  };

  // Handle Filter Change from FilterDataVirtualAccountCard
  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Filter Data Client-Side
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Filter Search Keyword & Category
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        if (searchCategory === "Kode VA") {
          if (!item.kodeVA?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "NIM") {
          if (!item.nim?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Nama") {
          if (!item.nama?.toLowerCase().includes(query)) return false;
        } else {
          // -- Semua --
          const matchKode = item.kodeVA?.toLowerCase().includes(query);
          const matchNim = item.nim?.toLowerCase().includes(query);
          const matchNama = item.nama?.toLowerCase().includes(query);
          if (!matchKode && !matchNim && !matchNama) return false;
        }
      }

      // 2. Filter Status VA
      if (filters.statusVA && filters.statusVA !== "-- Semua Status --") {
        const filterStatus = filters.statusVA.toUpperCase();
        if (filterStatus === "AKTIF" && item.status !== "AKTIF") return false;
        if (filterStatus === "LUNAS" && item.status !== "LUNAS") return false;
        if (filterStatus === "BATAL" && item.status !== "BATAL") return false;
      }

      // 3. Filter Penerima Tagihan
      if (
        filters.penerimaTagihan &&
        filters.penerimaTagihan !== "-- Semua --" &&
        item.penerimaTagihan &&
        item.penerimaTagihan !== filters.penerimaTagihan
      ) {
        return false;
      }

      // 4. Filter Kelompok Tagihan
      if (
        filters.kelompokTagihan &&
        filters.kelompokTagihan !== "-- Semua Kelompok --" &&
        item.kelompokTagihan &&
        item.kelompokTagihan !== filters.kelompokTagihan
      ) {
        return false;
      }

      // 5. Filter Metode Pembayaran
      if (
        filters.metodePembayaran &&
        filters.metodePembayaran !== "-- Semua Metode Pembayaran --" &&
        item.metodePembayaran &&
        item.metodePembayaran !== filters.metodePembayaran
      ) {
        return false;
      }

      // 6. Filter Angkatan
      if (
        filters.angkatan &&
        filters.angkatan !== "-- Semua Angkatan --" &&
        item.angkatan &&
        item.angkatan !== filters.angkatan
      ) {
        return false;
      }

      // 7. Filter Unit Kerja
      if (
        filters.unitKerja &&
        filters.unitKerja !== "-- Semua Unit Kerja --" &&
        item.unitKerja &&
        item.unitKerja !== filters.unitKerja
      ) {
        return false;
      }

      // 8. Filter Gelombang
      if (
        filters.gelombang &&
        filters.gelombang !== "-- Semua Gelombang --" &&
        item.gelombang &&
        item.gelombang !== filters.gelombang
      ) {
        return false;
      }

      // 9. Filter Jalur Pendaftaran
      if (
        filters.jalurPendaftaran &&
        filters.jalurPendaftaran !== "-- Semua Jalur Pendaftaran --" &&
        item.jalurPendaftaran &&
        item.jalurPendaftaran !== filters.jalurPendaftaran
      ) {
        return false;
      }

      // 10. Filter Sistem Kuliah
      if (
        filters.sistemKuliah &&
        filters.sistemKuliah !== "-- Semua Sistem Kuliah --" &&
        item.sistemKuliah &&
        item.sistemKuliah !== filters.sistemKuliah
      ) {
        return false;
      }

      return true;
    });
  }, [dataList, activeSearch, searchCategory, filters]);

  // Handle Batalkan VA button click (Gambar 4)
  const handleBatalkanVAClick = () => {
    if (selectedVAs.length === 0) {
      setIsValidationModalOpen(true);
      return;
    }
    setItemToCancel(null);
    setIsConfirmCancelModalOpen(true);
  };

  // Handle single item cancel
  const handleSingleCancel = (item: VirtualAccountData) => {
    setItemToCancel(item);
    setIsConfirmCancelModalOpen(true);
  };

  // Execute cancellation on confirm
  const handleConfirmCancel = async () => {
    setCancelLoading(true);
    try {
      if (itemToCancel) {
        await transaksiApi.updateVirtualAccount(itemToCancel.id, {
          status: "BATAL",
        });
      } else {
        // Cancel all selected items that are AKTIF
        for (const item of selectedVAs) {
          if (item.status === "AKTIF") {
            await transaksiApi.updateVirtualAccount(item.id, {
              status: "BATAL",
            });
          }
        }
      }
      setIsConfirmCancelModalOpen(false);
      setItemToCancel(null);
      setSelectedVAs([]);
      fetchVirtualAccountData();
    } catch (err) {
      console.error("Gagal membatalkan Virtual Account:", err);
      alert("Gagal membatalkan Virtual Account. Silakan coba lagi.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Handle Refresh Item Status (Gambar 4)
  const handleRefreshItem = async (_item: VirtualAccountData) => {
    try {
      await fetchVirtualAccountData();
      setShowAlert(true);
    } catch (err) {
      console.error("Gagal memperbarui status VA:", err);
    }
  };

  return (
    <>
      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Virtual Account</h1>
        <p className="text-sm text-gray-500 mb-1">Daftar Transaksi VA</p>
      </div>

      {/* Alert Banner Pengubahan data Virtual Account berhasil (Gambar 4) */}
      {showAlert && (
        <div className="bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded mb-4 flex justify-between items-center text-sm shadow-xs transition-all">
          <span>Pengubahan data Virtual Account berhasil</span>
          <button
            type="button"
            onClick={() => setShowAlert(false)}
            className="text-[#3c763d] hover:text-[#2b542c] font-bold text-lg cursor-pointer leading-none"
            title="Tutup"
          >
            &times;
          </button>
        </div>
      )}

      {/* Filter Card (Gambar 1) */}
      <div>
        <FilterDataVirtualAccountCard
          key={filterResetKey}
          onFilter={handleFilter}
          initialFilters={filters}
        />
      </div>

      {/* Main Container Card dengan background putih (Gambar 2) */}
      <div className="w-full bg-white shadow-lg rounded-md border-t-green-800 border-t-4 p-5 mt-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-stretch sm:items-center mb-4">
          {/* Sisi Kiri: Dropdown Category & Search Input & Search/Refresh Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-stretch sm:items-center">
            <Dropdown
              options={["-- Semua --", "Kode VA", "NIM", "Nama"]}
              value={searchCategory}
              defaultValue="-- Semua --"
              onChange={(value) => setSearchCategory(value)}
              className="w-full sm:w-36 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Virtual Account"
                value={searchInput}
                onChange={(val) => setSearchInput(val)}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="p-2 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded cursor-pointer transition-colors shrink-0"
                title="Cari"
              >
                <IoMdSearch className="text-base" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded cursor-pointer transition-colors shrink-0"
                title="Reset pencarian"
              >
                <IoMdRefresh className="text-base" />
              </button>
            </div>
          </div>

          {/* Sisi Kanan: Action Buttons (+ Tambah, Batalkan VA) */}
          <div className="flex space-x-2 items-center">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={() => {
                navigate(ROUTES.TRANSAKSI.DATA_TRANSAKSI_VA);
              }}
            />
            <IconButton
              icon={<IoMdClose />}
              responsive={false}
              text="Batalkan VA"
              variant="danger"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={handleBatalkanVAClick}
            />
          </div>
        </div>

        {/* Tabel Virtual Account (Gambar 2 & 3) */}
        <VirtualAccountTable
          data={filteredData}
          loading={loading}
          onSelectionChange={setSelectedVAs}
          onView={(item) => {
            navigate(`${ROUTES.TRANSAKSI.DETAIL_DATA_TRANSAKSI_VA}?id=${item.id}`);
          }}
          onRefreshItem={handleRefreshItem}
          onCancel={handleSingleCancel}
        />
      </div>

      {/* Modal Validasi: "Tidak ada VA yang tercentang" (Gambar 4) */}
      <ValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        title="Informasi"
        message="Tidak ada VA yang tercentang"
      />

      {/* Modal Konfirmasi Pembatalan VA */}
      <KonfirmasiModal
        isOpen={isConfirmCancelModalOpen}
        onClose={() => {
          setIsConfirmCancelModalOpen(false);
          setItemToCancel(null);
        }}
        onConfirm={handleConfirmCancel}
        title="Konfirmasi Pembatalan VA"
        message={`Apakah anda yakin ingin membatalkan ${
          itemToCancel
            ? `Virtual Account dengan kode ${itemToCancel.kodeVA}`
            : `${selectedVAs.length} Virtual Account yang dipilih`
        }?`}
        confirmVariant="danger"
        confirmText="Batalkan VA"
        cancelText="Kembali"
        loading={cancelLoading}
      />
    </>
  );
}
