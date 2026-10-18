import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilterDataMonitoringAturanAkademikCard, {
  type FilterValues,
} from "../components/FilterDataMonitoringAturanAkademikCard";
import MonitoringAturanAkademikTable, {
  type MonitoringAturanAkademikData,
} from "../components/MonitoringAturanAkademikTable";
import { ROUTES } from "../../../common/routes/routes";
import operasionalApi from "../services/operasional.api";

export default function MonitoringAturanAkademikPage() {
  document.title = "Monitoring Aturan Akademik";
  const navigate = useNavigate();

  const [currentFilters, setCurrentFilters] = useState<FilterValues>({
    unitKerja: "Universitas Ibn Khaldun",
    aturanAkademik: "KHS - Melihat KHS",
    periodeAkademik: "-- Semua --",
    statusSemester: "-- Semua --",
    angkatan: "-- Semua --",
  });

  // State data dari Mock JSON API (dengan cache localStorage)
  const [rawData, setRawData] = useState<MonitoringAturanAkademikData[]>(() => {
    try {
      const cached = localStorage.getItem("cached_monitoring_aturan_akademik");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [tableData, setTableData] = useState<MonitoringAturanAkademikData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper fungsi untuk memfilter dataset monitoring aturan akademik
  const filterMonitoringData = useCallback(
    (
      items: MonitoringAturanAkademikData[],
      filters: FilterValues,
    ): MonitoringAturanAkademikData[] => {
      return items.filter((item) => {
        // 1. Filter Periode Akademik
        if (
          filters.periodeAkademik &&
          filters.periodeAkademik !== "-- Semua --" &&
          filters.periodeAkademik !== "Semua"
        ) {
          const fPeriode = filters.periodeAkademik.trim().toLowerCase();
          const itemPeriode = (item.periodeAkademik || item.angkatan || "")
            .trim()
            .toLowerCase();
          if (!itemPeriode.includes(fPeriode)) {
            return false;
          }
        }

        // 2. Filter Angkatan
        if (
          filters.angkatan &&
          filters.angkatan !== "-- Semua --" &&
          filters.angkatan !== "Semua"
        ) {
          const fAngkatan = filters.angkatan.trim().toLowerCase();
          const itemAngkatan = (item.angkatan || "").trim().toLowerCase();
          if (!itemAngkatan.includes(fAngkatan)) {
            return false;
          }
        }

        // 3. Filter Aturan Akademik
        if (
          filters.aturanAkademik &&
          filters.aturanAkademik !== "-- Semua --" &&
          filters.aturanAkademik !== "Semua"
        ) {
          const fAturan = filters.aturanAkademik.trim().toLowerCase();
          const itemAturan = (item.aturanAkademik || "khs - melihat khs")
            .trim()
            .toLowerCase();
          const key = fAturan.split(" ")[0].toLowerCase(); // e.g. "khs", "krs", "uts", "uas"
          if (!itemAturan.includes(key) && !itemAturan.includes(fAturan)) {
            return false;
          }
        }

        // 4. Filter Status Semester
        if (
          filters.statusSemester &&
          filters.statusSemester !== "-- Semua --" &&
          filters.statusSemester !== "Semua"
        ) {
          const fStatus = filters.statusSemester.trim().toLowerCase();
          const itemStatus = (item.statusSemester || "aktif")
            .trim()
            .toLowerCase();
          if (!itemStatus.includes(fStatus)) {
            return false;
          }
        }

        // 5. Filter Unit Kerja
        if (
          filters.unitKerja &&
          filters.unitKerja !== "Universitas Ibn Khaldun" &&
          filters.unitKerja !== "-- Semua --" &&
          filters.unitKerja !== "Semua"
        ) {
          const unit = filters.unitKerja.toLowerCase();
          const itemUnit = (item.unitKerja || "").toLowerCase();
          const itemProdi = (item.namaProgram || "").toLowerCase();

          if (itemUnit && itemUnit.includes(unit)) {
            // match
          } else if (unit.includes("agama islam")) {
            if (
              !itemProdi.includes("agama islam") &&
              !itemProdi.includes("syariah") &&
              !itemProdi.includes("tarbiyah")
            )
              return false;
          } else if (unit.includes("keguruan") || unit.includes("fkip")) {
            if (
              !itemProdi.includes("keguruan") &&
              !itemProdi.includes("pendidikan bahasa") &&
              !itemProdi.includes("pendidikan biologi") &&
              !itemProdi.includes("teknologi pendidikan")
            )
              return false;
          } else if (unit.includes("ekonomi") || unit.includes("bisnis")) {
            if (
              !itemProdi.includes("akuntansi") &&
              !itemProdi.includes("manajemen") &&
              !itemProdi.includes("ekonomi") &&
              !itemProdi.includes("bisnis")
            )
              return false;
          } else if (unit.includes("teknik") || unit.includes("sains")) {
            if (
              !itemProdi.includes("teknik") &&
              !itemProdi.includes("informatika") &&
              !itemProdi.includes("sistem informasi") &&
              !itemProdi.includes("industri") &&
              !itemProdi.includes("sipil")
            )
              return false;
          } else if (unit.includes("hukum")) {
            if (!itemProdi.includes("hukum")) return false;
          } else if (unit.includes("kesehatan")) {
            if (
              !itemProdi.includes("kesehatan") &&
              !itemProdi.includes("gizi") &&
              !itemProdi.includes("kebidanan")
            )
              return false;
          } else if (unit.includes("pascasarjana")) {
            if (
              !itemProdi.startsWith("s2") &&
              !itemProdi.startsWith("s3") &&
              !itemProdi.includes("pascasarjana") &&
              !itemProdi.includes("magister")
            )
              return false;
          } else {
            if (!itemProdi.includes(unit)) return false;
          }
        }

        return true;
      });
    },
    [],
  );

  // Fetch data dari mock JSON backend
  const fetchMonitoringData = useCallback(
    async (retryCount = 0) => {
      setIsLoading(true);
      try {
        const response = await operasionalApi.getMonitoringAturanAkademik();
        const list = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray((response as any)?.data?.data)
          ? (response as any).data.data
          : [];

        if (list.length > 0) {
          setRawData(list);
          setTableData(filterMonitoringData(list, currentFilters));
          try {
            localStorage.setItem(
              "cached_monitoring_aturan_akademik",
              JSON.stringify(list),
            );
          } catch {}
        } else if (retryCount < 2) {
          setTimeout(() => fetchMonitoringData(retryCount + 1), 600);
        }
      } catch (err) {
        console.error("Gagal memuat monitoring aturan akademik:", err);
        if (retryCount < 2) {
          setTimeout(() => fetchMonitoringData(retryCount + 1), 800);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentFilters, filterMonitoringData],
  );

  useEffect(() => {
    fetchMonitoringData();
  }, [fetchMonitoringData]);

  // Filter handler saat tombol "Simpan Filter" diklik
  const handleFilter = (filters: FilterValues) => {
    setIsLoading(true);
    setCurrentFilters(filters);

    setTimeout(() => {
      const filtered = filterMonitoringData(rawData, filters);
      setTableData(filtered);
      setIsLoading(false);
    }, 150);
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
        <FilterDataMonitoringAturanAkademikCard
          initialFilters={currentFilters}
          onFilter={handleFilter}
        />
      </div>

      <div className="container shadow-lg rounded border-t-emerald-600 border-t-4 p-4 bg-white">
        <MonitoringAturanAkademikTable
          data={tableData}
          loading={isLoading}
          onView={handleView}
        />
      </div>
    </>
  );
}
