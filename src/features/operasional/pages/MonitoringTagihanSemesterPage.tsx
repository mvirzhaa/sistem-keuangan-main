import { useState, useMemo, useEffect, useCallback } from "react";
import operasionalApi from "../services/operasional.api";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { FaBan, FaUndo } from "react-icons/fa";
import FilterDataMonitoringTagihanSemesterCard, {
  type FilterTagihanSemesterValues,
} from "../components/FilterDataMonitoringTagihanSemesterCard";
import MonitoringTagihanSemesterTable, {
  type MahasiswaSemesterItem,
} from "../components/MonitoringTagihanSemesterTable";
import KonfirmasiCekalModal, {
  type CekalType,
} from "../components/KonfirmasiCekalModal";
import DetailTagihanSemesterModal from "../components/DetailTagihanSemesterModal";
import InformasiFilterModal from "../components/InformasiFilterModal";

export default function MonitoringTagihanSemesterPage() {
  document.title = "Tagihan Semester - Monitoring Tagihan Semester";

  // Data state dari Mock JSON API (dengan cache localStorage)
  const [dataList, setDataList] = useState<MahasiswaSemesterItem[]>(() => {
    try {
      const cached = localStorage.getItem("cached_monitoring_tagihan_semester");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch data dari mock backend JSON
  const fetchTagihanSemester = useCallback(async (retryCount = 0) => {
    setIsLoading(true);
    try {
      const response = await operasionalApi.getMonitoringTagihanSemester();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

      if (list.length > 0) {
        setDataList(list);
        try {
          localStorage.setItem(
            "cached_monitoring_tagihan_semester",
            JSON.stringify(list)
          );
        } catch {}
      } else if (retryCount < 2) {
        setTimeout(() => fetchTagihanSemester(retryCount + 1), 600);
      }
    } catch (err) {
      console.error("Gagal memuat monitoring tagihan semester:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchTagihanSemester(retryCount + 1), 800);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTagihanSemester();
  }, [fetchTagihanSemester]);

  // Filter State
  const [activeFilters, setActiveFilters] =
    useState<FilterTagihanSemesterValues | null>(null);
  const [filterCardKey, setFilterCardKey] = useState(0);

  // Search State
  const searchCategoryOptions = [
    "-- Semua --",
    "Mahasiswa",
    "NIM",
    "Program Studi",
    "Status Kuliah",
    "Status Keuangan",
  ];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState<{
    category: string;
    term: string;
  }>({
    category: "-- Semua --",
    term: "",
  });

  // Modal States
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState<CekalType>("cekal");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMahasiswaDetail, setSelectedMahasiswaDetail] =
    useState<MahasiswaSemesterItem | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Handle Simpan Filter dari Card Atas
  const handleFilterSubmit = (filters: FilterTagihanSemesterValues) => {
    setActiveFilters(filters);
  };

  // Handle Tombol Cari
  const handleSearch = () => {
    setActiveSearch({
      category: searchCategory,
      term: searchInput.trim(),
    });
  };

  // Handle Tombol Refresh
  const handleRefresh = () => {
    setSearchInput("");
    setSearchCategory("-- Semua --");
    setActiveSearch({
      category: "-- Semua --",
      term: "",
    });
    setActiveFilters(null);
    setSelectedIds([]);
    setFilterCardKey((prev) => prev + 1);
    fetchTagihanSemester();
  };

  // Filter Data berdasarkan activeFilters dan activeSearch
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Cek activeFilters
      if (activeFilters) {
        if (
          activeFilters.periodeAkademik &&
          activeFilters.periodeAkademik !== "-- Semua --" &&
          activeFilters.periodeAkademik !== "Semua" &&
          item.periode &&
          !item.periode
            .toLowerCase()
            .includes(activeFilters.periodeAkademik.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.tidakLolosAturan &&
          activeFilters.tidakLolosAturan !== "-" &&
          activeFilters.tidakLolosAturan !== "-- Semua --"
        ) {
          const ruleFilter = activeFilters.tidakLolosAturan.toLowerCase();
          const itemRule = (item.tidakLolosAturan || "").toLowerCase();
          if (!itemRule.includes(ruleFilter)) {
            return false;
          }
        }

        if (
          activeFilters.unitKerja &&
          activeFilters.unitKerja !== "Universitas Ibn Khaldun" &&
          activeFilters.unitKerja !== "-- Semua --" &&
          !item.programStudi
            .toLowerCase()
            .includes(activeFilters.unitKerja.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.angkatan &&
          activeFilters.angkatan !== "-- Semua Angkatan --" &&
          !item.angkatan
            .toLowerCase()
            .includes(activeFilters.angkatan.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.statusKuliah &&
          activeFilters.statusKuliah !== "-- Semua Status Kuliah --" &&
          item.statusKuliah.toLowerCase() !==
            activeFilters.statusKuliah.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.statusTagihan &&
          activeFilters.statusTagihan !== "-- Semua Status Tagihan --" &&
          item.statusTagihan.toLowerCase() !==
            activeFilters.statusTagihan.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.jenisTagihan &&
          activeFilters.jenisTagihan !== "-- Semua Jenis Tagihan --" &&
          item.jenisTagihan &&
          item.jenisTagihan.toLowerCase() !==
            activeFilters.jenisTagihan.toLowerCase()
        ) {
          return false;
        }
      }

      // 2. Cek activeSearch
      if (activeSearch.term) {
        const query = activeSearch.term.toLowerCase();
        if (activeSearch.category === "-- Semua --") {
          const matchName = item.nama.toLowerCase().includes(query);
          const matchNim = item.nim.toLowerCase().includes(query);
          const matchProdi = item.programStudi.toLowerCase().includes(query);
          const matchStatusKuliah = item.statusKuliah
            .toLowerCase()
            .includes(query);
          const matchStatusKeuangan = (item.statusKeuangan || "")
            .toLowerCase()
            .includes(query);
          if (
            !matchName &&
            !matchNim &&
            !matchProdi &&
            !matchStatusKuliah &&
            !matchStatusKeuangan
          ) {
            return false;
          }
        } else if (activeSearch.category === "Mahasiswa") {
          if (!item.nama.toLowerCase().includes(query)) return false;
        } else if (activeSearch.category === "NIM") {
          if (!item.nim.toLowerCase().includes(query)) return false;
        } else if (activeSearch.category === "Program Studi") {
          if (!item.programStudi.toLowerCase().includes(query)) return false;
        } else if (activeSearch.category === "Status Kuliah") {
          if (!item.statusKuliah.toLowerCase().includes(query)) return false;
        } else if (activeSearch.category === "Status Keuangan") {
          if (!(item.statusKeuangan || "").toLowerCase().includes(query))
            return false;
        }
      }

      return true;
    });
  }, [dataList, activeFilters, activeSearch]);

  // Handle Klik Cekal Keuangan
  const handleOpenCekal = () => {
    if (selectedIds.length === 0) {
      setAlertMessage(
        "Silakan pilih setidaknya satu mahasiswa yang akan dicekal keuangannya terlebih dahulu.",
      );
      setIsAlertModalOpen(true);
      return;
    }
    setConfirmModalType("cekal");
    setIsConfirmModalOpen(true);
  };

  // Handle Klik Batal Cekal Keuangan
  const handleOpenBatalCekal = () => {
    if (selectedIds.length === 0) {
      setAlertMessage(
        "Silakan pilih setidaknya satu mahasiswa yang akan dibatalkan cekal keuangannya terlebih dahulu.",
      );
      setIsAlertModalOpen(true);
      return;
    }
    setConfirmModalType("batal_cekal");
    setIsConfirmModalOpen(true);
  };

  // Eksekusi Konfirmasi Cekal / Batal Cekal
  const handleConfirmAction = () => {
    if (confirmModalType === "cekal") {
      setDataList((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? {
                ...item,
                isTercekal: true,
                statusKeuangan: "Tercekal Keuangan",
              }
            : item,
        ),
      );
    } else {
      setDataList((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? {
                ...item,
                isTercekal: false,
                statusKeuangan:
                  item.statusTagihan === "Lunas"
                    ? "Lunas"
                    : item.statusTagihan === "Ada Tagihan"
                      ? "Belum Lunas"
                      : "Tidak Ada Tagihan",
              }
            : item,
        ),
      );
    }

    setIsConfirmModalOpen(false);
    setSelectedIds([]);
  };

  // Handle Lihat Detail (Modal Aksi)
  const handleViewDetail = (item: MahasiswaSemesterItem) => {
    setSelectedMahasiswaDetail(item);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div className="w-full">
        {/* Header Judul Halaman */}
        <div className="flex items-baseline space-x-2 mb-4">
          <h1 className="text-2xl font-medium text-gray-800">
            Tagihan Semester
          </h1>
          <span className="text-sm text-gray-500">
            Daftar Tagihan Semester Mahasiswa
          </span>
        </div>

        {/* Card Filter Data */}
        <div className="mb-4">
          <FilterDataMonitoringTagihanSemesterCard
            key={filterCardKey}
            onFilter={handleFilterSubmit}
          />
        </div>

        {/* Card Tabel & Controls dengan Border Top Hijau */}
        <div className="bg-white rounded-md shadow-md border-t-4 border-t-emerald-600 p-4 mb-6">
          {/* Action & Search Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 mb-4">
            {/* Sisi Kiri: Search Dropdown, Input, Tombol Cari & Refresh */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 w-full lg:w-auto">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="border border-gray-300 rounded px-2.5 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {searchCategoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Cari Mahasiswa"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="border border-gray-300 rounded px-3 py-2 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white px-3 py-2 rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center"
                title="Cari"
              >
                <IoMdSearch size={16} />
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                className="bg-[#0073b7] hover:bg-[#005a92] active:bg-[#004773] text-white px-3 py-2 rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center"
                title="Refresh / Reset"
              >
                <IoMdRefresh size={16} />
              </button>
            </div>

            {/* Sisi Kanan: Tombol Cekal Keuangan & Batal Cekal Keuangan */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenCekal}
                className="bg-[#f56954] hover:bg-[#e05743] active:bg-[#cc4936] text-white px-3.5 py-2 rounded font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <FaBan size={12} />
                <span>Cekal Keuangan</span>
              </button>

              <button
                type="button"
                onClick={handleOpenBatalCekal}
                className="bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white px-3.5 py-2 rounded font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <FaUndo size={12} />
                <span>Batal Cekal Keuangan</span>
              </button>
            </div>
          </div>

          {/* Tabel Data Tagihan Semester */}
          <MonitoringTagihanSemesterTable
            data={filteredData}
            loading={isLoading}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>

      {/* Modal 1: Konfirmasi Cekal / Batal Cekal Keuangan */}
      <KonfirmasiCekalModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmAction}
        type={confirmModalType}
        selectedCount={selectedIds.length}
      />

      {/* Modal 2: Detail Tagihan Semester Mahasiswa (Aksi Mata) */}
      <DetailTagihanSemesterModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        mahasiswa={selectedMahasiswaDetail}
        periode={activeFilters?.periodeAkademik || "2026 Ganjil"}
      />

      {/* Modal 3: Alert Peringatan Jika Belum Memilih Baris */}
      <InformasiFilterModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Informasi"
        message={alertMessage}
        buttonText="Oke"
      />
    </>
  );
}
