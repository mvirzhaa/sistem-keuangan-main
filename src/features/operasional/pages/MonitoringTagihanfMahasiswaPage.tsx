import { useState, useMemo } from "react";
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

// Mock dataset kaya untuk Monitoring Tagihan Mahasiswa
const initialTagihanMahasiswaData: MonitoringTagihanMahasiswaData[] = [
  // 2 Data awal dari screenshot
  {
    id: "1",
    unit: "S1 - Akuntansi",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2017 Ganjil",
    jumlahMahasiswa: 29,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "2",
    unit: "S1 - Ilmu Hukum",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2017 Ganjil",
    jumlahMahasiswa: 22,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  // Data tambahan kaya untuk 2025 Genap & Ganjil
  {
    id: "3",
    unit: "S1 - Teknik Informatika",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 35,
    periodeTagihan: "2025 Genap",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "4",
    unit: "S1 - Teknik Informatika",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2025 Genap",
    jumlahMahasiswa: 18,
    periodeTagihan: "2025 Genap",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "5",
    unit: "S1 - Sistem Informasi",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 24,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "6",
    unit: "S1 - Sistem Informasi",
    jalurPendaftaran: "BEASISWA KIP",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Genap",
    jumlahMahasiswa: 12,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Registrasi",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "7",
    unit: "S1 - Teknik Sipil",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 40,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "8",
    unit: "S1 - Teknik Sipil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2025 Genap",
    jumlahMahasiswa: 27,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "9",
    unit: "S1 - Manajemen",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Non Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 45,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "10",
    unit: "S1 - Manajemen",
    jalurPendaftaran: "PRESTASI",
    sistemKuliah: "Karyawan",
    gelombang: "Gelombang 3",
    periodeMasuk: "2025 Genap",
    jumlahMahasiswa: 19,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "11",
    unit: "S1 - Akuntansi",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 31,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "12",
    unit: "S1 - Ilmu Hukum",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 52,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 3",
  },
  {
    id: "13",
    unit: "S2 - Pendidikan Agama Islam (S2)",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Non Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2025 Ganjil",
    jumlahMahasiswa: 15,
    periodeTagihan: "2025 Genap",
    jenisAkun: "Biaya Wisuda",
    frekuensi: "Tahunan",
    kelompok: "Kelompok 3",
  },
  // Data 2026
  {
    id: "14",
    unit: "S1 - Teknik Informatika",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2026 Ganjil",
    jumlahMahasiswa: 48,
    periodeTagihan: "2026 Ganjil",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "15",
    unit: "S1 - Teknik Informatika",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2026 Genap",
    jumlahMahasiswa: 33,
    periodeTagihan: "2026 Genap",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "16",
    unit: "S1 - Akuntansi",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2026 Ganjil",
    jumlahMahasiswa: 38,
    periodeTagihan: "2026 Ganjil",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "17",
    unit: "S1 - Ilmu Hukum",
    jalurPendaftaran: "BEASISWA KIP",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2026 Ganjil",
    jumlahMahasiswa: 14,
    periodeTagihan: "2026 Ganjil",
    jenisAkun: "Biaya Registrasi",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  // Data 2024
  {
    id: "18",
    unit: "S1 - Teknik Sipil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2024 Ganjil",
    jumlahMahasiswa: 26,
    periodeTagihan: "2024 Ganjil",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "19",
    unit: "S1 - Manajemen",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2024 Genap",
    jumlahMahasiswa: 30,
    periodeTagihan: "2024 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "20",
    unit: "S2 - Pendidikan Agama Islam (S2)",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    periodeMasuk: "2024 Genap",
    jumlahMahasiswa: 11,
    periodeTagihan: "2024 Genap",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 3",
  },
];

export default function MonitoringTagihanMahasiswaPage() {
  document.title = "Monitoring Tagihan Mahasiswa";
  const navigate = useNavigate();

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
  };

  // Filter Data berdasarkan activeFilters dan activeSearch
  const filteredData = useMemo(() => {
    return initialTagihanMahasiswaData.filter((item) => {
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
  }, [activeFilters, activeSearch]);

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
