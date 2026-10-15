import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDataMonitoringAturanAkademikCard, {
  type FilterValues,
} from "../components/FilterDataMonitoringAturanAkademikCard";
import MonitoringAturanAkademikTable, {
  type MonitoringAturanAkademikData,
} from "../components/MonitoringAturanAkademikTable";
import { ROUTES } from "../../../common/routes/routes";

// Dataset realistis Monitoring Aturan Akademik (mencakup data contoh Gambar 2)
const initialAturanAkademikData: MonitoringAturanAkademikData[] = [
  {
    id: "1",
    kodeProdi: "86131",
    namaProgram: "S2 - Pendidikan Agama Islam (S2)",
    angkatan: "2026 Ganjil",
    jumlahMahasiswa: 1,
    jumlahMahasiswaAktif: 0,
    jumlahMahasiswaTercekal: 0,
  },
  {
    id: "2",
    kodeProdi: "55201",
    namaProgram: "S1 - Teknik Informatika",
    angkatan: "2026 Ganjil",
    jumlahMahasiswa: 45,
    jumlahMahasiswaAktif: 42,
    jumlahMahasiswaTercekal: 3,
  },
  {
    id: "3",
    kodeProdi: "62201",
    namaProgram: "S1 - Akuntansi",
    angkatan: "2026 Ganjil",
    jumlahMahasiswa: 38,
    jumlahMahasiswaAktif: 35,
    jumlahMahasiswaTercekal: 3,
  },
  {
    id: "4",
    kodeProdi: "74201",
    namaProgram: "S1 - Ilmu Hukum",
    angkatan: "2026 Ganjil",
    jumlahMahasiswa: 28,
    jumlahMahasiswaAktif: 26,
    jumlahMahasiswaTercekal: 2,
  },
  {
    id: "5",
    kodeProdi: "86208",
    namaProgram: "S1 - Pendidikan Agama Islam",
    angkatan: "2025 Ganjil",
    jumlahMahasiswa: 30,
    jumlahMahasiswaAktif: 29,
    jumlahMahasiswaTercekal: 1,
  },
  {
    id: "6",
    kodeProdi: "26201",
    namaProgram: "S1 - Teknik Industri",
    angkatan: "2026 Genap",
    jumlahMahasiswa: 24,
    jumlahMahasiswaAktif: 22,
    jumlahMahasiswaTercekal: 2,
  },
  {
    id: "7",
    kodeProdi: "57201",
    namaProgram: "S1 - Sistem Informasi",
    angkatan: "2026 Ganjil",
    jumlahMahasiswa: 32,
    jumlahMahasiswaAktif: 30,
    jumlahMahasiswaTercekal: 2,
  },
];

export default function MonitoringAturanAkademikPage() {
  document.title = "Monitoring Aturan Akademik";
  const navigate = useNavigate();

  const [currentFilters, setCurrentFilters] = useState<FilterValues>({
    unitKerja: "Universitas Ibn Khaldun",
    aturanAkademik: "KHS - Melihat KHS",
    periodeAkademik: "2027 Genap",
    statusSemester: "-- Semua --",
    angkatan: "-- Semua --",
  });

  const [tableData, setTableData] = useState<MonitoringAturanAkademikData[]>(
    initialAturanAkademikData,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter handler saat tombol "Simpan Filter" diklik
  const handleFilter = (filters: FilterValues) => {
    setIsLoading(true);
    setCurrentFilters(filters);

    setTimeout(() => {
      let result = [...initialAturanAkademikData];

      // Filter berdasarkan angkatan jika dipilih spesifik
      if (filters.angkatan && filters.angkatan !== "-- Semua --") {
        result = result.filter(
          (item) =>
            item.angkatan.toLowerCase() === filters.angkatan.toLowerCase(),
        );
      }

      // Filter berdasarkan unit kerja
      if (
        filters.unitKerja &&
        filters.unitKerja !== "Universitas Ibn Khaldun"
      ) {
        if (filters.unitKerja.includes("Agama Islam")) {
          result = result.filter((item) =>
            item.namaProgram.includes("Agama Islam"),
          );
        } else if (filters.unitKerja.includes("Teknik")) {
          result = result.filter(
            (item) =>
              item.namaProgram.includes("Teknik") ||
              item.namaProgram.includes("Informatika") ||
              item.namaProgram.includes("Sistem Informasi"),
          );
        } else if (filters.unitKerja.includes("Ekonomi")) {
          result = result.filter(
            (item) =>
              item.namaProgram.includes("Akuntansi") ||
              item.namaProgram.includes("Manajemen"),
          );
        } else if (filters.unitKerja.includes("Hukum")) {
          result = result.filter((item) =>
            item.namaProgram.includes("Hukum"),
          );
        }
      }

      setTableData(result);
      setIsLoading(false);
    }, 250);
  };

  // Navigasi ke halaman detail saat aksi diklik
  const handleView = (item: MonitoringAturanAkademikData) => {
    navigate(ROUTES.OPERASIONAL.DETAIL_MONITORING_ATURAN, {
      state: {
        item,
        filters: currentFilters,
      },
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          Monitoring Mahasiswa Tercekal Aturan Akademik
        </h1>
      </div>

      <div className="mb-4">
        <FilterDataMonitoringAturanAkademikCard onFilter={handleFilter} />
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 bg-white">
        <MonitoringAturanAkademikTable
          data={tableData}
          loading={isLoading}
          onView={handleView}
        />
      </div>
    </>
  );
}

