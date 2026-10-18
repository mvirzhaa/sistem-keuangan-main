import { useState, useEffect, useCallback, useMemo } from "react";
import {
  IoMdAdd,
  IoMdCloudUpload,
  IoMdList,
  IoMdRefresh,
  IoMdSearch,
} from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataDepositCard, {
  defaultFilterDepositValues,
  type FilterDepositValues,
} from "../components/FilterDataDepositCard";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import DepositTable from "../components/DepositTable";
import SaldoDepositModal from "../components/SaldoDepositModal";
import ImportTransaksiModal from "../../../components/modal/ImportTransaksiModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";
import transaksiApi, { type DepositData } from "../services/transaksi.api";

export default function DepositPage() {
  document.title = "Transaksi - Deposit";
  const navigate = useNavigate();

  // State data dari JSON server
  const [dataList, setDataList] = useState<DepositData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State Search & Category
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // State Filter Card
  const [filters, setFilters] = useState<FilterDepositValues>(
    defaultFilterDepositValues
  );
  const [filterResetKey, setFilterResetKey] = useState<number>(0);

  // Modal States
  const [isSaldoModalOpen, setIsSaldoModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<DepositData | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Fetch data dari API JSON
  const fetchDepositData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getDeposit();
      if (res && res.data) {
        setDataList(res.data);
      } else {
        setDataList([]);
      }
    } catch (err) {
      console.error("Gagal memuat data deposit dari server:", err);
      setDataList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepositData();
  }, [fetchDepositData]);

  // Handle Search Trigger
  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  // Handle Refresh / Reset
  const handleReset = () => {
    setSearchInput("");
    setActiveSearch("");
    setSearchCategory("-- Semua --");
    setFilters({ ...defaultFilterDepositValues });
    setFilterResetKey((prev) => prev + 1);
    fetchDepositData();
  };

  // Handle Filter dari FilterDataDepositCard
  const handleFilter = (newFilters: FilterDepositValues) => {
    setFilters(newFilters);
  };

  // Handle Delete Confirmation
  const handleDeleteClick = (item: DepositData) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);
    try {
      await transaksiApi.deleteDeposit(itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      fetchDepositData();
    } catch (err) {
      console.error("Gagal menghapus data deposit:", err);
      alert("Gagal menghapus data deposit. Silakan coba lagi.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter Data Client-Side
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Filter Search Keyword & Category
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        if (searchCategory === "NIM") {
          if (!item.nim?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Nama") {
          if (!item.nama?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Kode Deposit") {
          if (!item.kodeDeposit?.toLowerCase().includes(query)) return false;
        } else {
          // -- Semua --
          const matchNim = item.nim?.toLowerCase().includes(query);
          const matchNama = item.nama?.toLowerCase().includes(query);
          const matchKode = item.kodeDeposit?.toLowerCase().includes(query);
          if (!matchNim && !matchNama && !matchKode) return false;
        }
      }

      // 2. Filter Penerima
      if (
        filters.penerima &&
        filters.penerima !== "-- Semua --" &&
        item.penerima &&
        item.penerima !== filters.penerima
      ) {
        return false;
      }

      // 3. Filter Periode Deposit
      if (
        filters.periodeDeposit &&
        filters.periodeDeposit !== "-- Semua Periode --" &&
        filters.periodeDeposit !== "-- Semua --"
      ) {
        const itemPeriode = item.periodeDeposit || item.periode;
        if (
          itemPeriode &&
          !itemPeriode
            .toLowerCase()
            .includes(filters.periodeDeposit.toLowerCase())
        ) {
          return false;
        }
      }

      // 4. Filter Metode Pembayaran
      if (
        filters.metodePembayaran &&
        filters.metodePembayaran !== "-- Semua Metode Pembayaran --" &&
        filters.metodePembayaran !== "-- Semua --"
      ) {
        if (
          item.metodePembayaran &&
          !item.metodePembayaran
            .toLowerCase()
            .includes(filters.metodePembayaran.toLowerCase())
        ) {
          return false;
        }
      }

      // 5. Filter Channel
      if (
        filters.channel &&
        filters.channel !== "-- Semua Channel --" &&
        filters.channel !== "-- Semua --"
      ) {
        if (
          item.channel &&
          !item.channel.toLowerCase().includes(filters.channel.toLowerCase())
        ) {
          return false;
        }
      }

      // 6. Filter Angkatan
      if (
        filters.angkatan &&
        filters.angkatan !== "-- Semua Angkatan --" &&
        filters.angkatan !== "-- Semua --"
      ) {
        if (item.angkatan && item.angkatan !== filters.angkatan) {
          return false;
        }
      }

      // 7. Filter Program Studi
      if (
        filters.programStudi &&
        filters.programStudi !== "-- Semua Program Studi --" &&
        filters.programStudi !== "-- Semua --"
      ) {
        if (
          item.programStudi &&
          !item.programStudi
            .toLowerCase()
            .includes(filters.programStudi.toLowerCase())
        ) {
          return false;
        }
      }

      // 8. Filter Gelombang
      if (
        filters.gelombang &&
        filters.gelombang !== "-- Semua Gelombang --" &&
        filters.gelombang !== "-- Semua --"
      ) {
        if (
          item.gelombang &&
          !item.gelombang
            .toLowerCase()
            .includes(filters.gelombang.toLowerCase())
        ) {
          return false;
        }
      }

      // 9. Filter Jalur Pendaftaran
      if (
        filters.jalurPendaftaran &&
        filters.jalurPendaftaran !== "-- Semua Jalur Pendaftaran --" &&
        filters.jalurPendaftaran !== "-- Semua --"
      ) {
        if (
          item.jalurPendaftaran &&
          !item.jalurPendaftaran
            .toLowerCase()
            .includes(filters.jalurPendaftaran.toLowerCase())
        ) {
          return false;
        }
      }

      // 10. Filter Sistem Kuliah
      if (
        filters.sistemKuliah &&
        filters.sistemKuliah !== "-- Semua Sistem Kuliah --" &&
        filters.sistemKuliah !== "-- Semua --"
      ) {
        if (
          item.sistemKuliah &&
          !item.sistemKuliah
            .toLowerCase()
            .includes(filters.sistemKuliah.toLowerCase())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [dataList, activeSearch, searchCategory, filters]);

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Deposit</p>
      </div>

      {/* Filter Card dengan background putih */}
      <div className="mt-4">
        <FilterDataDepositCard
          key={filterResetKey}
          onFilter={handleFilter}
          initialFilters={filters}
        />
      </div>

      {/* Wrapper Tabel dengan background putih */}
      <div className="w-full bg-white shadow-md rounded-md border-t-green-800 border-t-4 p-5 mt-4">
        {/* Controls Bar: Search & Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-stretch sm:items-center mb-4 gap-2">
          {/* Sisi Kiri: Dropdown Kategori & Search Field & Reset */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-stretch sm:items-center">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama", "Kode Deposit"]}
              value={searchCategory}
              defaultValue="-- Semua --"
              onChange={(val) => setSearchCategory(val)}
              className="w-full sm:w-40 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Transaksi"
                value={searchInput}
                onChange={(val) => setSearchInput(val)}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <IconButton
                icon={<IoMdSearch />}
                variant="success"
                onClick={handleSearch}
                title="Cari"
                className="text-xs shrink-0 cursor-pointer"
              />
              <IconButton
                icon={<IoMdRefresh />}
                variant="info"
                onClick={handleReset}
                title="Refresh / Reset"
                className="text-xs shrink-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Sisi Kanan: Action Buttons */}
          <div className="flex space-x-2 items-center flex-wrap">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={() => {
                navigate(ROUTES.TRANSAKSI.DETAIL_DEPOSIT);
              }}
            />
            <IconButton
              icon={<IoMdList />}
              responsive={false}
              text="Saldo Deposit"
              variant="info"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={() => {
                setIsSaldoModalOpen(true);
              }}
            />
            <IconButton
              icon={<IoMdCloudUpload />}
              responsive={false}
              text="Import"
              variant="info"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={() => {
                setIsImportModalOpen(true);
              }}
            />
          </div>
        </div>

        {/* Tabel Data Deposit */}
        <DepositTable
          data={filteredData}
          loading={loading}
          onView={(item) => {
            navigate(`${ROUTES.TRANSAKSI.DETAIL_DEPOSIT}?id=${item.id}`);
          }}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Modal Saldo Deposit Mahasiswa (Gambar 2) */}
      <SaldoDepositModal
        isOpen={isSaldoModalOpen}
        onClose={() => setIsSaldoModalOpen(false)}
      />

      {/* Modal Import Transaksi (Gambar 3) */}
      <ImportTransaksiModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        templateUrl="/templates/template_import_deposit.xlsx"
        templateFileName="template_import_deposit.xlsx"
        onImport={(file) => {
          alert(`File ${file.name} berhasil diunggah.`);
          setIsImportModalOpen(false);
        }}
      />

      {/* Modal Konfirmasi Hapus Deposit */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah anda yakin ingin menghapus data deposit ${
          itemToDelete ? `dengan kode ${itemToDelete.kodeDeposit}` : "ini"
        }?`}
        confirmVariant="danger"
        confirmText="Hapus"
        cancelText="Batal"
        loading={deleteLoading}
      />
    </>
  );
}
