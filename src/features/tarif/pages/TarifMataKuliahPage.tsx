import { useState, useMemo } from "react";
import { IoMdSearch, IoMdRefresh } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifMataKuliahCard, {
  type FilterValues,
} from "../components/FIlterDataTarifMataKuliahCard";
import TarifMataKuliahTable from "../components/TarifMataKuliahTable";

const initialData = [
  {
    id: "1",
    no: 1,
    kode: "IF101",
    nama: "Algoritma dan Pemrograman",
    jenis: "Teori",
    sks: 3,
    semester: 1,
    wajib: true,
    paket: true,
    nominalTarif: 450000,
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalur: "Mandiri",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Teknik Informatika",
    kurikulum: "Kurikulum 2022",
  },
  {
    id: "2",
    no: 2,
    kode: "IF102",
    nama: "Praktikum Algoritma",
    jenis: "Praktikum",
    sks: 1,
    semester: 1,
    wajib: true,
    paket: true,
    nominalTarif: 200000,
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalur: "Mandiri",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Teknik Informatika",
    kurikulum: "Kurikulum 2022",
  },
  {
    id: "3",
    no: 3,
    kode: "MN201",
    nama: "Pengantar Manajemen",
    jenis: "Teori",
    sks: 3,
    semester: 1,
    wajib: true,
    paket: false,
    nominalTarif: 450000,
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 2",
    jalur: "SBMPTN",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Manajemen",
    kurikulum: "Kurikulum 2021",
  },
  {
    id: "4",
    no: 4,
    kode: "AK301",
    nama: "Akuntansi Dasar",
    jenis: "Teori",
    sks: 3,
    semester: 2,
    wajib: true,
    paket: true,
    nominalTarif: 450000,
    periodeMasuk: "2024 Ganjil",
    gelombang: "Gelombang 1",
    jalur: "SNMPTN",
    sistemKuliah: "Reguler",
    programStudi: "S1 - Akuntansi",
    kurikulum: "Kurikulum 2020",
  },
  {
    id: "5",
    no: 5,
    kode: "HK105",
    nama: "Pengantar Ilmu Hukum",
    jenis: "Teori",
    sks: 2,
    semester: 1,
    wajib: false,
    paket: false,
    nominalTarif: 300000,
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 3",
    jalur: "Mandiri",
    sistemKuliah: "Kelas Karyawan",
    programStudi: "S1 - Ilmu Hukum",
    kurikulum: "Kurikulum 2023",
  },
];

const defaultFilters: FilterValues = {
  periodeMasuk: "-- Semua Periode Masuk --",
  jalur: "-- Semua Jalur --",
  programStudi: "Universitas Ibn Khaldun",
  gelombang: "-- Semua Gelombang --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
  kurikulum: "-- Semua Kurikulum --",
};

export default function TarifMataKuliahPage() {
  document.title = "Tarif -  Mata Kuliah";

  const [filterForm, setFilterForm] = useState<FilterValues>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilters);

  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const handleFilterChange = (key: keyof FilterValues, val: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleApplyFilter = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const handleSearch = () => {
    setAppliedKeyword(searchKeyword.trim());
  };

  const handleReset = () => {
    setFilterForm(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchKeyword("");
    setAppliedKeyword("");
    setSearchCategory("-- Semua --");
  };

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      // Filter dari Card
      if (
        appliedFilters.periodeMasuk &&
        !appliedFilters.periodeMasuk.includes("Semua") &&
        item.periodeMasuk !== appliedFilters.periodeMasuk
      ) {
        return false;
      }
      if (
        appliedFilters.jalur &&
        !appliedFilters.jalur.includes("Semua") &&
        item.jalur !== appliedFilters.jalur
      ) {
        return false;
      }
      if (
        appliedFilters.programStudi &&
        appliedFilters.programStudi !== "Universitas Ibn Khaldun" &&
        !appliedFilters.programStudi.includes("Semua") &&
        item.programStudi !== appliedFilters.programStudi
      ) {
        return false;
      }
      if (
        appliedFilters.gelombang &&
        !appliedFilters.gelombang.includes("Semua") &&
        item.gelombang !== appliedFilters.gelombang
      ) {
        return false;
      }
      if (
        appliedFilters.sistemKuliah &&
        !appliedFilters.sistemKuliah.includes("Semua") &&
        item.sistemKuliah !== appliedFilters.sistemKuliah
      ) {
        return false;
      }
      if (
        appliedFilters.kurikulum &&
        !appliedFilters.kurikulum.includes("Semua") &&
        item.kurikulum !== appliedFilters.kurikulum
      ) {
        return false;
      }

      // Filter dari Search Bar
      if (appliedKeyword) {
        const kw = appliedKeyword.toLowerCase();
        if (searchCategory === "Kode") {
          return item.kode.toLowerCase().includes(kw);
        }
        if (searchCategory === "Nama") {
          return item.nama.toLowerCase().includes(kw);
        }
        if (searchCategory === "Jenis") {
          return item.jenis.toLowerCase().includes(kw);
        }
        return (
          item.kode.toLowerCase().includes(kw) ||
          item.nama.toLowerCase().includes(kw) ||
          item.jenis.toLowerCase().includes(kw) ||
          item.programStudi.toLowerCase().includes(kw)
        );
      }

      return true;
    });
  }, [appliedFilters, appliedKeyword, searchCategory]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Mata Kuliah</p>
      </div>

      <div>
        <FilterDataTarifMataKuliahCard
          value={filterForm}
          onChange={handleFilterChange}
          onFilter={handleApplyFilter}
        />
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-2 items-center">
            <Dropdown
              options={["-- Semua --", "Kode", "Nama", "Jenis"]}
              value={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="mr-2 mb-2 sm:mb-0 w-40 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Tarif Mata Kuliah"
                value={searchKeyword}
                onChange={(val) => {
                  setSearchKeyword(val);
                  if (!val) setAppliedKeyword("");
                }}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <IconButton
                icon={<IoMdSearch className="text-base" />}
                variant="success"
                onClick={handleSearch}
                title="Cari"
              />
              <IconButton
                icon={<IoMdRefresh className="text-base" />}
                variant="info"
                onClick={handleReset}
                title="Reset & Refresh Data"
              />
            </div>
          </div>

        </div>

        <div className="mb-4">
          <TarifMataKuliahTable data={filteredData} />
        </div>
      </div>
    </>
  );
}
