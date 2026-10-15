import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataMonitoringUktCard, {
  type FilterValues,
} from "../components/FilterDataMonitoringUktCard";
import MonitoringUktTable, {
  type MonitoringUktData,
} from "../components/MonitoringUktTable";
import { ROUTES } from "../../../common/routes/routes";

const initialUktData: MonitoringUktData[] = [
  {
    id: "1",
    programStudi: "S1 - Teknik Informatika",
    kelompokUkt: "Kelompok UKT 1",
    kuota: 50,
    penerima: 45,
  },
  {
    id: "2",
    programStudi: "S1 - Teknik Informatika",
    kelompokUkt: "Kelompok UKT 2",
    kuota: 40,
    penerima: 35,
  },
  {
    id: "3",
    programStudi: "S1 - Sistem Informasi",
    kelompokUkt: "Kelompok UKT 1",
    kuota: 40,
    penerima: 38,
  },
  {
    id: "4",
    programStudi: "S1 - Akuntansi",
    kelompokUkt: "Kelompok UKT 1",
    kuota: 35,
    penerima: 30,
  },
  {
    id: "5",
    programStudi: "S1 - Ilmu Hukum",
    kelompokUkt: "Kelompok UKT 2",
    kuota: 30,
    penerima: 28,
  },
];

export default function MonitoringUktPage() {
  document.title = "Monitoring UKT";
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    periodeMasuk: "2025 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "Reguler Sore",
    programStudi: "Universitas Ibn Khaldun",
    kelompokUkt: "-- Semua Kelompok UKT --",
  });

  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter submit handler
  const handleFilter = (newFilters: FilterValues) => {
    setIsLoading(true);
    setFilters(newFilters);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  // Search handler
  const handleSearch = () => {
    setIsLoading(true);
    setSubmittedSearch(searchQuery.trim());
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Refresh / Reset handler
  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery("");
    setSubmittedSearch("");
    setSearchCategory("-- Semua --");
    setFilters({
      penerima: "Mahasiswa",
      periodeMasuk: "2025 Genap",
      gelombang: "Gelombang 1",
      jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
      sistemKuliah: "Reguler Sore",
      programStudi: "Universitas Ibn Khaldun",
      kelompokUkt: "-- Semua Kelompok UKT --",
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    let result = [...initialUktData];

    // Filter berdasarkan Program Studi dari FilterCard
    if (
      filters.programStudi &&
      filters.programStudi !== "Universitas Ibn Khaldun"
    ) {
      result = result.filter((item) =>
        item.programStudi
          .toLowerCase()
          .includes(filters.programStudi.toLowerCase()),
      );
    }

    // Filter berdasarkan Kelompok UKT dari FilterCard
    if (
      filters.kelompokUkt &&
      filters.kelompokUkt !== "-- Semua Kelompok UKT --"
    ) {
      result = result.filter(
        (item) =>
          item.kelompokUkt.toLowerCase() === filters.kelompokUkt.toLowerCase(),
      );
    }

    // Filter berdasarkan text pencarian
    if (submittedSearch) {
      const q = submittedSearch.toLowerCase();
      if (searchCategory === "Program Studi") {
        result = result.filter((item) =>
          item.programStudi.toLowerCase().includes(q),
        );
      } else if (searchCategory === "Kelompok UKT") {
        result = result.filter((item) =>
          item.kelompokUkt.toLowerCase().includes(q),
        );
      } else {
        result = result.filter(
          (item) =>
            item.programStudi.toLowerCase().includes(q) ||
            item.kelompokUkt.toLowerCase().includes(q),
        );
      }
    }

    return result;
  }, [filters, submittedSearch, searchCategory]);

  // Navigasi ke detail
  const handleView = (item: MonitoringUktData) => {
    navigate(ROUTES.OPERASIONAL.DETAIL_MONITORING_UKT, {
      state: {
        item,
        filters,
      },
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Monitoring UKT</h1>
      </div>

      <div className="mb-4">
        <FilterDataMonitoringUktCard onFilter={handleFilter} />
      </div>

      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 bg-white">
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mb-4">
          <Dropdown
            options={["-- Semua --", "Program Studi", "Kelompok UKT"]}
            value={searchCategory}
            onChange={(val) => setSearchCategory(val)}
            className="w-full sm:w-44 mb-2 sm:mb-0 text-xs"
          />
          <div className="flex space-x-1 items-center w-full sm:w-auto">
            <TextField
              placeholder="Cari Monitoring UKT"
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              onEnter={handleSearch}
              className="w-full sm:w-80"
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
              title="Reset"
            />
          </div>
        </div>

        <div>
          <MonitoringUktTable
            data={filteredData}
            loading={isLoading}
            onView={handleView}
          />
        </div>
      </div>
    </>
  );
}

