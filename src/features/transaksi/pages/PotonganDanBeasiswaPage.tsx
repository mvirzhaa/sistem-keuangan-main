import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  IoMdCheckmark,
  IoMdClose,
  IoMdRefresh,
  IoMdSearch,
} from "react-icons/io";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataPotonganDanBeasiswaCard, {
  type FilterPotonganDanBeasiswaValues,
  defaultFilterPotonganValues,
} from "../components/FilterDataPotonganDanBeasiswaCard";
import IconButton from "../../../components/button/IconButton";
import PotonganDanBeasiswaTable, {
  type PotonganDanBeasiswaData,
} from "../components/PotonganDanBeasiswaTable";
import transaksiApi from "../services/transaksi.api";
import { ValidationModal } from "../../laporan/tagihan/components/ValidationModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";

const fallbackData: PotonganDanBeasiswaData[] = [
  {
    id: "1",
    no: 1,
    nim: "22110501479",
    nama: "MUHAMMAD ULIL ALBAB",
    angkatan: "20221",
    programStudi: "S1 - Pendidikan Agama Islam",
    sumber: "Baznas Pusat",
    beasiswa: "BCB (Beasiswa Cendikia Baznas) 2024",
    periode: "2024 Genap",
    nominal: 3000000,
    digunakan: 2850000,
    jenisPotongan: "Beasiswa",
    penerima: "Mahasiswa",
  },
  {
    id: "2",
    no: 2,
    nim: "21105030210",
    nama: "MUHAMMAD FAKHRI IMRON",
    angkatan: "20211",
    programStudi: "S1 - Komunikasi dan Penyiaran Islam",
    sumber: "Baznas Pusat",
    beasiswa: "BCB (Beasiswa Cendikia Baznas) 2023",
    periode: "2024 Genap",
    nominal: 3000000,
    digunakan: 0,
    jenisPotongan: "Beasiswa",
    penerima: "Mahasiswa",
  },
];

export default function PotonganDanBeasiswaPage() {
  document.title = "Penerima Potongan dan Beasiswa";

  // State data dari json
  const [dataList, setDataList] = useState<PotonganDanBeasiswaData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State selection checkbox
  const [selectedItems, setSelectedItems] = useState<PotonganDanBeasiswaData[]>(
    []
  );

  // State Search & Category
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // State Filter Card
  const [filters, setFilters] = useState<FilterPotonganDanBeasiswaValues>(
    defaultFilterPotonganValues
  );
  const [filterResetKey, setFilterResetKey] = useState<number>(0);

  // State Modals
  const [isValidationModalOpen, setIsValidationModalOpen] =
    useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalActionType, setModalActionType] = useState<
    "generate" | "cancelVA"
  >("generate");

  // Fetch data dari mock JSON-server
  const fetchPotonganData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getPotonganDanBeasiswa();
      if (res && res.data && res.data.length > 0) {
        setDataList(res.data);
      } else {
        setDataList(fallbackData);
      }
    } catch (err) {
      console.warn("Gagal memuat potongan & beasiswa dari server:", err);
      setDataList(fallbackData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPotonganData();
  }, [fetchPotonganData]);

  // Handle Search Trigger
  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  // Handle Reset / Refresh
  const handleReset = () => {
    setSearchInput("");
    setActiveSearch("");
    setSearchCategory("-- Semua --");
    setFilters({ ...defaultFilterPotonganValues });
    setFilterResetKey((prev) => prev + 1);
    fetchPotonganData();
  };

  // Handle Filter Change
  const handleFilter = (newFilters: FilterPotonganDanBeasiswaValues) => {
    setFilters(newFilters);
  };

  // Filter Data Client-Side
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Search Query & Category
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        if (searchCategory === "NIM") {
          if (!item.nim?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Nama") {
          if (!item.nama?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Program Studi") {
          if (!item.programStudi?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Beasiswa") {
          if (!item.beasiswa?.toLowerCase().includes(query)) return false;
        } else {
          // -- Semua --
          const matchNim = item.nim?.toLowerCase().includes(query);
          const matchNama = item.nama?.toLowerCase().includes(query);
          const matchProdi = item.programStudi?.toLowerCase().includes(query);
          const matchBeasiswa = item.beasiswa?.toLowerCase().includes(query);
          const matchSumber = item.sumber?.toLowerCase().includes(query);
          if (
            !matchNim &&
            !matchNama &&
            !matchProdi &&
            !matchBeasiswa &&
            !matchSumber
          )
            return false;
        }
      }

      // 2. Filter Jenis Potongan
      if (
        filters.jenisPotongan &&
        filters.jenisPotongan !== "-- Semua --" &&
        item.jenisPotongan &&
        item.jenisPotongan !== filters.jenisPotongan
      ) {
        return false;
      }

      // 3. Filter Penerima
      if (
        filters.penerima &&
        filters.penerima !== "-- Semua --" &&
        item.penerima &&
        item.penerima !== filters.penerima
      ) {
        return false;
      }

      // 4. Filter Beasiswa
      if (
        filters.beasiswa &&
        filters.beasiswa !== "-- Semua Beasiswa --" &&
        item.beasiswa &&
        !item.beasiswa.toLowerCase().includes(filters.beasiswa.toLowerCase())
      ) {
        return false;
      }

      // 5. Filter Periode Akademik
      if (
        filters.periodeAkademik &&
        filters.periodeAkademik !== "-- Semua Periode --" &&
        item.periode &&
        item.periode !== filters.periodeAkademik
      ) {
        return false;
      }

      return true;
    });
  }, [dataList, activeSearch, searchCategory, filters]);

  // Handle Generate click
  const handleGenerate = () => {
    if (selectedItems.length === 0) {
      setIsValidationModalOpen(true);
      return;
    }
    setModalActionType("generate");
    setIsConfirmModalOpen(true);
  };

  // Handle Batalkan VA click
  const handleBatalkanVA = () => {
    if (selectedItems.length === 0) {
      setIsValidationModalOpen(true);
      return;
    }
    setModalActionType("cancelVA");
    setIsConfirmModalOpen(true);
  };

  // Confirm action in modal
  const handleConfirmAction = async () => {
    setModalLoading(true);
    try {
      await fetchPotonganData();
      setIsConfirmModalOpen(false);
      setSelectedItems([]);
    } catch (err) {
      console.error("Gagal melakukan aksi:", err);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          Penerima Potongan & Beasiswa
        </h1>
      </div>

      {/* Filter Card (Top) */}
      <div>
        <FilterDataPotonganDanBeasiswaCard
          key={filterResetKey}
          onFilter={handleFilter}
          initialFilters={filters}
        />
      </div>

      {/* Main Container Card dengan background putih (Bottom) */}
      <div className="w-full bg-white shadow-lg rounded-md border-t-green-800 border-t-4 p-5 mt-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-stretch sm:items-center mb-4">
          {/* Sisi Kiri: Category Dropdown & Search Input & Search/Refresh Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-stretch sm:items-center">
            <Dropdown
              options={[
                "-- Semua --",
                "NIM",
                "Nama",
                "Program Studi",
                "Beasiswa",
              ]}
              value={searchCategory}
              defaultValue="-- Semua --"
              onChange={(value) => setSearchCategory(value)}
              className="w-full sm:w-36 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Penerima Potongan & Beasiswa"
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

          {/* Sisi Kanan: Action Buttons (Generate, Batalkan VA) */}
          <div className="flex space-x-2 items-center">
            <IconButton
              icon={<IoMdCheckmark />}
              responsive={false}
              text="Generate"
              variant="info"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={handleGenerate}
            />
            <IconButton
              icon={<IoMdClose />}
              responsive={false}
              text="Batalkan VA"
              variant="danger"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={handleBatalkanVA}
            />
          </div>
        </div>

        {/* Tabel Potongan & Beasiswa */}
        <PotonganDanBeasiswaTable
          data={filteredData}
          loading={loading}
          onSelectionChange={setSelectedItems}
          onView={(item) => {
            console.log("Lihat detail:", item);
          }}
        />
      </div>

      {/* Modal Validasi: "Tidak ada data yang tercentang" */}
      <ValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        title="Informasi"
        message="Tidak ada data yang tercentang"
      />

      {/* Modal Konfirmasi */}
      <KonfirmasiModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={
          modalActionType === "generate"
            ? "Konfirmasi Generate"
            : "Konfirmasi Pembatalan VA"
        }
        message={`Apakah anda yakin ingin ${
          modalActionType === "generate" ? "memproses generate" : "membatalkan VA"
        } untuk ${selectedItems.length} data yang dipilih?`}
        confirmVariant={modalActionType === "generate" ? "primary" : "danger"}
        confirmText={
          modalActionType === "generate" ? "Proses Generate" : "Batalkan VA"
        }
        cancelText="Kembali"
        loading={modalLoading}
      />
    </>
  );
}
