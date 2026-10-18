import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataMonitoringTagihanCard, {
  type FilterValues,
} from "../components/FilterDataMonitoringTagihanCard";
import MonitoringTagihanMahasiswaTable, {
  type MonitoringTagihanMahasiswaData,
} from "../components/MonitoringTagihanMahasiswaTable";
import operasionalApi from "../services/operasional.api";

export default function MonitoringTagihanMahasiswaPage() {
  document.title = "Monitoring Tagihan Mahasiswa";
  const navigate = useNavigate();

  // State data Monitoring Tagihan Mahasiswa dari Mock JSON API (dengan cache)
  const [tagihanData, setTagihanData] = useState<MonitoringTagihanMahasiswaData[]>(() => {
    try {
      const cached = localStorage.getItem("cached_monitoring_tagihan_mahasiswa");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState(false);

  // Fetch data dari mock API
  const fetchMonitoringTagihan = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await operasionalApi.getMonitoringTagihanMahasiswa();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

      if (list.length > 0) {
        setTagihanData(list);
        try {
          localStorage.setItem(
            "cached_monitoring_tagihan_mahasiswa",
            JSON.stringify(list)
          );
        } catch {}
      } else if (retryCount < 2) {
        setTimeout(() => fetchMonitoringTagihan(retryCount + 1), 600);
      }
    } catch (err) {
      console.error("Gagal memuat monitoring tagihan mahasiswa:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchMonitoringTagihan(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitoringTagihan();
  }, [fetchMonitoringTagihan]);

  // State untuk Filter Atas
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);
  const [filterCardKey, setFilterCardKey] = useState(0);

  // State untuk Pencarian Tabel
  const searchCategoryOptions = [
    "-- Semua --",
    "Unit",
    "Jalur Pendaftaran",
    "Sistem Kuliah",
    "Gelombang",
    "Periode Masuk",
  ];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");

  // Search aktif hanya berubah saat tombol cari diklik atau ditekan Enter
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
    fetchMonitoringTagihan();
  };

  // Filter Data berdasarkan activeFilters dan activeSearch
  const filteredData = useMemo(() => {
    return tagihanData.filter((item) => {
      // 1. Filter dari Card Atas jika sudah ada yang disimpan
      if (activeFilters) {
        if (
          activeFilters.periodeTagihan &&
          activeFilters.periodeTagihan !== "-- Semua --" &&
          item.periodeTagihan &&
          item.periodeTagihan.toLowerCase() !==
            activeFilters.periodeTagihan.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.periodeMasuk &&
          activeFilters.periodeMasuk !== "-- Semua --" &&
          !item.periodeMasuk
            .toLowerCase()
            .includes(activeFilters.periodeMasuk.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.unit &&
          activeFilters.unit !== "Universitas Ibn Khaldun" &&
          activeFilters.unit !== "-- Semua --" &&
          !item.unit.toLowerCase().includes(activeFilters.unit.toLowerCase())
        ) {
          return false;
        }

        if (
          activeFilters.jalurPendaftaran &&
          activeFilters.jalurPendaftaran !== "-- Semua --" &&
          item.jalurPendaftaran.toLowerCase() !==
            activeFilters.jalurPendaftaran.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.sistemKuliah &&
          activeFilters.sistemKuliah !== "-- Semua --" &&
          item.sistemKuliah.toLowerCase() !==
            activeFilters.sistemKuliah.toLowerCase()
        ) {
          return false;
        }

        if (
          activeFilters.gelombang &&
          activeFilters.gelombang !== "-- Semua --" &&
          item.gelombang.toLowerCase() !== activeFilters.gelombang.toLowerCase()
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
        } else if (cat === "Jalur Pendaftaran") {
          return item.jalurPendaftaran.toLowerCase().includes(term);
        } else if (cat === "Sistem Kuliah") {
          return item.sistemKuliah.toLowerCase().includes(term);
        } else if (cat === "Gelombang") {
          return item.gelombang.toLowerCase().includes(term);
        } else if (cat === "Periode Masuk") {
          return item.periodeMasuk.toLowerCase().includes(term);
        } else {
          // "-- Semua --": cocokkan di semua kolom tabel
          return (
            item.unit.toLowerCase().includes(term) ||
            item.jalurPendaftaran.toLowerCase().includes(term) ||
            item.sistemKuliah.toLowerCase().includes(term) ||
            item.gelombang.toLowerCase().includes(term) ||
            item.periodeMasuk.toLowerCase().includes(term) ||
            String(item.jumlahMahasiswa).includes(term)
          );
        }
      }

      return true;
    });
  }, [tagihanData, activeFilters, activeSearch]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring Tagihan Mahasiswa</h1>
      </div>

      {/* Card Filter Atas */}
      <div className="mb-4">
        <FilterDataMonitoringTagihanCard
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
              placeholder="Cari Monitoring Tagihan Mahasiswa"
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

        {/* Tabel Data Monitoring Tagihan Mahasiswa */}
        <div className="mb-4">
          <MonitoringTagihanMahasiswaTable
            data={filteredData}
            loading={loading}
            onView={(item) => {
              navigate(
                `/operasional/monitoring_tagihan_mahasiswa/detail?id=${item.id}`,
                {
                  state: { item },
                },
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
