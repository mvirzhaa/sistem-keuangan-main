import { useState, useMemo } from "react";
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

// Mock dataset kaya untuk Monitoring Tarif
const initialMonitoringData: MonitoringTarifData[] = [
  {
    id: "km-1",
    unit: "S1 - Kesehatan Masyarakat",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 8,
    sudahDiatur: 3,
    belumDiatur: 5,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "1",
    unit: "86205",
    periode: "1994 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 182,
    sudahDiatur: 0,
    belumDiatur: 182,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "2",
    unit: "S1 - Teknik Sipil",
    periode: "1994 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 182,
    sudahDiatur: 0,
    belumDiatur: 182,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  // Data 2026 Ganjil & Genap
  {
    id: "3",
    unit: "S1 - Teknik Informatika",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 240,
    sudahDiatur: 180,
    belumDiatur: 60,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "4",
    unit: "S1 - Teknik Informatika",
    periode: "2026 Genap",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 210,
    sudahDiatur: 210,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "5",
    unit: "S1 - Sistem Informasi",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 150,
    sudahDiatur: 120,
    belumDiatur: 30,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "6",
    unit: "S1 - Sistem Informasi",
    periode: "2026 Genap",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 145,
    sudahDiatur: 145,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "7",
    unit: "S1 - Ilmu Hukum",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 310,
    sudahDiatur: 250,
    belumDiatur: 60,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 3",
  },
  {
    id: "8",
    unit: "S1 - Ilmu Hukum",
    periode: "2026 Genap",
    jalurPendaftaran: "BEASISWA KIP",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 85,
    sudahDiatur: 85,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Registrasi",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "9",
    unit: "S1 - Manajemen",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Non Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 190,
    sudahDiatur: 100,
    belumDiatur: 90,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "10",
    unit: "S1 - Manajemen",
    periode: "2026 Genap",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Karyawan",
    gelombang: "Gelombang 3",
    totalAkun: 130,
    sudahDiatur: 65,
    belumDiatur: 65,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "11",
    unit: "S1 - Akuntansi",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 175,
    sudahDiatur: 175,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "12",
    unit: "S1 - Akuntansi",
    periode: "2026 Genap",
    jalurPendaftaran: "PRESTASI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 95,
    sudahDiatur: 90,
    belumDiatur: 5,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "13",
    unit: "S2 - Pendidikan Agama Islam (S2)",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Non Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 60,
    sudahDiatur: 40,
    belumDiatur: 20,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Wisuda",
    frekuensi: "Tahunan",
    kelompok: "Kelompok 3",
  },
  {
    id: "14",
    unit: "S2 - Pendidikan Agama Islam (S2)",
    periode: "2026 Genap",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 55,
    sudahDiatur: 55,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 3",
  },
  {
    id: "15",
    unit: "S1 - Teknik Sipil",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 160,
    sudahDiatur: 140,
    belumDiatur: 20,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "16",
    unit: "S1 - Teknik Sipil",
    periode: "2026 Genap",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 155,
    sudahDiatur: 155,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "17",
    unit: "86205",
    periode: "2026 Ganjil",
    jalurPendaftaran: "BEASISWA KIP",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 90,
    sudahDiatur: 90,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Registrasi",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "18",
    unit: "86205",
    periode: "2026 Genap",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 120,
    sudahDiatur: 110,
    belumDiatur: 10,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  // Data 2025
  {
    id: "19",
    unit: "86205",
    periode: "2025 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 195,
    sudahDiatur: 195,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "20",
    unit: "86205",
    periode: "2025 Genap",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 180,
    sudahDiatur: 170,
    belumDiatur: 10,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 1",
  },
  {
    id: "21",
    unit: "S1 - Teknik Informatika",
    periode: "2025 Ganjil",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 220,
    sudahDiatur: 220,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  {
    id: "22",
    unit: "S1 - Teknik Informatika",
    periode: "2025 Genap",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 2",
    totalAkun: 205,
    sudahDiatur: 200,
    belumDiatur: 5,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "UKT",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 2",
  },
  // Data 2024
  {
    id: "23",
    unit: "S1 - Ilmu Hukum",
    periode: "2024 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 290,
    sudahDiatur: 290,
    belumDiatur: 0,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Semesteran",
    kelompok: "Kelompok 3",
  },
  {
    id: "24",
    unit: "S1 - Manajemen",
    periode: "2024 Genap",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Non Reguler",
    gelombang: "Gelombang 3",
    totalAkun: 120,
    sudahDiatur: 110,
    belumDiatur: 10,
    penerima: "Mahasiswa",
    status: "Aktif",
    jenisAkun: "Biaya Kuliah",
    frekuensi: "Bulanan",
    kelompok: "Kelompok 2",
  },
  {
    id: "25",
    unit: "Pendaftar Baru",
    periode: "2026 Ganjil",
    jalurPendaftaran: "SELEKSI MANDIRI",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 50,
    sudahDiatur: 0,
    belumDiatur: 50,
    penerima: "Pendaftar",
    status: "Aktif",
    jenisAkun: "Biaya Registrasi",
    frekuensi: "Harian",
    kelompok: "Kelompok 1",
  },
];

export default function MonitoringTarifPage() {
  document.title = "Monitoring Tarif";
  const navigate = useNavigate();

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
  };

  // Filter Data berdasarkan activeFilters dan activeSearch
  const filteredData = useMemo(() => {
    return initialMonitoringData.filter((item) => {
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
