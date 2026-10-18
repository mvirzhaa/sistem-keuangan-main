import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import { ROUTES } from "../../../common/routes/routes";
import FilterDataMonitoringTarifCard, {
  type FilterValues,
} from "../components/FilterDataMonitoringTarifCard";
import MonitoringTarifTable, {
  type MonitoringTarifData,
} from "../components/MonitoringTarifTable";
import operasionalApi from "../services/operasional.api";

export default function MonitoringTarifPage() {
  document.title = "Monitoring Tarif";
  const navigate = useNavigate();

  // State data monitoring tarif dari mock json (dengan cache agar selalu tampil instan)
  const [monitoringData, setMonitoringData] = useState<MonitoringTarifData[]>(
    () => {
      try {
        const cached = localStorage.getItem("cached_monitoring_tarif");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
      return [];
    },
  );
  const [loading, setLoading] = useState(false);

  // Ambil data monitoring tarif dari backend / mock json dengan auto-retry
  const fetchMonitoringTarif = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await operasionalApi.getMonitoringTarif();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

      if (list.length > 0) {
        setMonitoringData(list);
        try {
          localStorage.setItem("cached_monitoring_tarif", JSON.stringify(list));
        } catch {}
      } else if (retryCount < 2) {
        // Jika data masih kosong karena server baru restart, auto-retry
        setTimeout(() => fetchMonitoringTarif(retryCount + 1), 600);
      }
    } catch (error) {
      console.error("Gagal memuat data monitoring tarif:", error);
      if (retryCount < 2) {
        // Auto-retry jika terjadi transient error
        setTimeout(() => fetchMonitoringTarif(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Langsung hit by default saat halaman dimuat
  useEffect(() => {
    fetchMonitoringTarif();
  }, [fetchMonitoringTarif]);

  // State untuk Filter Atas (Card Filter)
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);
  const [filterCardKey, setFilterCardKey] = useState(0);

  // State untuk Input Pencarian dan Kategori Pencarian
  const searchCategoryOptions = [
    "-- Semua --",
    "Unit",
    "Periode",
    "Jalur Pendaftaran",
    "Sistem Kuliah",
    "Gelombang",
  ];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");

  // Search yang aktif hanya berubah ketika tombol search diklik atau ditekan Enter
  const [activeSearch, setActiveSearch] = useState<{
    category: string;
    term: string;
  }>({
    category: "-- Semua --",
    term: "",
  });

  // Handle Simpan Filter dari Card Atas
  const handleFilterSubmit = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  // Handle Tombol Cari (Search)
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
    setFilterCardKey((prev) => prev + 1);
    fetchMonitoringTarif();
  };

  // Filter Data berdasarkan activeFilters dan activeSearch
  const filteredData = useMemo(() => {
    return monitoringData.filter((item) => {
      // 1. Filter dari Card Atas jika sudah ada yang disimpan
      if (activeFilters) {
        if (
          activeFilters.penerima &&
          activeFilters.penerima !== "-- Semua --" &&
          item.penerima &&
          item.penerima.toLowerCase() !== activeFilters.penerima.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.periodeMasuk &&
          activeFilters.periodeMasuk !== "-- Semua Periode --" &&
          activeFilters.periodeMasuk !== "-- Semua --" &&
          !item.periode
            .toLowerCase()
            .includes(activeFilters.periodeMasuk.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.unit &&
          activeFilters.unit !== "Universitas Ibn Khaldun" &&
          activeFilters.unit !== "-- Semua Unit --" &&
          activeFilters.unit !== "-- Semua --" &&
          !item.unit.toLowerCase().includes(activeFilters.unit.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.status &&
          activeFilters.status !== "-- Semua --" &&
          item.status &&
          item.status.toLowerCase() !== activeFilters.status.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.jenisAkun &&
          activeFilters.jenisAkun !== "-- Semua --" &&
          item.jenisAkun &&
          item.jenisAkun.toLowerCase() !== activeFilters.jenisAkun.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.frekuensi &&
          activeFilters.frekuensi !== "-- Semua --" &&
          item.frekuensi &&
          item.frekuensi.toLowerCase() !== activeFilters.frekuensi.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.kelompok &&
          activeFilters.kelompok !== "-- Semua --" &&
          item.kelompok &&
          item.kelompok.toLowerCase() !== activeFilters.kelompok.toLowerCase()
        ) {
          return false;
        }
      }

      // 2. Filter dari Pencarian Tabel (hanya aktif ketika tombol cari diklik)
      if (activeSearch.term) {
        const term = activeSearch.term.toLowerCase();
        const cat = activeSearch.category;

        if (cat === "Unit") {
          return item.unit.toLowerCase().includes(term);
        } else if (cat === "Periode") {
          return item.periode.toLowerCase().includes(term);
        } else if (cat === "Jalur Pendaftaran") {
          return item.jalurPendaftaran.toLowerCase().includes(term);
        } else if (cat === "Sistem Kuliah") {
          return item.sistemKuliah.toLowerCase().includes(term);
        } else if (cat === "Gelombang") {
          return item.gelombang.toLowerCase().includes(term);
        } else {
          // "-- Semua --": cocokkan di semua kolom tabel
          return (
            item.unit.toLowerCase().includes(term) ||
            item.periode.toLowerCase().includes(term) ||
            item.jalurPendaftaran.toLowerCase().includes(term) ||
            item.sistemKuliah.toLowerCase().includes(term) ||
            item.gelombang.toLowerCase().includes(term) ||
            String(item.totalAkun).includes(term) ||
            String(item.sudahDiatur).includes(term) ||
            String(item.belumDiatur).includes(term)
          );
        }
      }

      return true;
    });
  }, [activeFilters, activeSearch]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring Tarif</h1>
      </div>

      {/* Card Filter Atas */}
      <div className="mb-4">
        <FilterDataMonitoringTarifCard
          key={filterCardKey}
          onFilter={handleFilterSubmit}
        />
      </div>

      {/* Container Tabel dengan border hijau atas */}
      <div className="container shadow-lg rounded border-t-emerald-600 border-t-4 p-4 bg-white">
        {/* Kontrol Pencarian dan Refresh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
          <Dropdown
            options={searchCategoryOptions}
            value={searchCategory}
            onChange={(val) => setSearchCategory(val)}
            className="w-full sm:w-40 text-xs"
          />
          <div className="flex items-center space-x-1 flex-1 max-w-md">
            <TextField
              value={searchInput}
              onChange={(val) => setSearchInput(val)}
              onEnter={handleSearch}
              placeholder="Cari Monitoring Tarif"
              className="w-full"
            />
            <IconButton
              icon={<IoMdSearch size={18} />}
              variant="success"
              onClick={handleSearch}
              title="Cari"
            />
            <IconButton
              icon={<IoMdRefresh size={18} />}
              variant="info"
              onClick={handleRefresh}
              title="Refresh / Reset"
            />
          </div>
        </div>

        {/* Tabel Data Monitoring Tarif */}
        <div className="mb-4">
          <MonitoringTarifTable
            data={filteredData}
            loading={loading}
            onView={(item) => {
              navigate(ROUTES.OPERASIONAL.DETAIL_MONITORING_TARIF, {
                state: { item },
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
