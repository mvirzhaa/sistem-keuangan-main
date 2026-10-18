import { useState, useMemo, useEffect, useCallback } from "react";
import { IoMdAdd, IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataPembayaranCard, {
  type FilterPembayaranValues,
  defaultFilterPembayaranValues,
} from "../components/FilterDataPembayaranCard";
import { ROUTES } from "../../../common/routes/routes";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import PembayaranTable, { type PembayaranData } from "../components/PembayaranTable";
import { useNavigate } from "react-router-dom";
import transaksiApi from "../services/transaksi.api";

export interface PembayaranItemData extends PembayaranData {
  penerima?: string;
  periodePembayaran?: string;
  angkatan?: string;
  programStudi?: string;
  gelombang?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
}

const searchCategoryOptions = ["-- Semua --", "Kode Pembayaran", "NIM", "Nama"];

export default function PembayaranPage() {
  document.title = "Transaksi - Pembayaran";
  const navigate = useNavigate();

  // Filter Card State
  const [activeFilters, setActiveFilters] = useState<FilterPembayaranValues>(
    defaultFilterPembayaranValues
  );
  const [filterKey, setFilterKey] = useState<number>(0);

  // Search Bar State
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Data List State dari API JSON
  const [pembayaranList, setPembayaranList] = useState<PembayaranItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data dari mock API backend (JSON)
  const fetchPembayaran = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getPembayaran();
      if (res && res.data && res.data.length > 0) {
        setPembayaranList(res.data);
      } else {
        setPembayaranList([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data pembayaran:", err);
      setPembayaranList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPembayaran();
  }, [fetchPembayaran]);

  // Handle klik tombol Simpan Filter di Card Filter
  const handleFilterSubmit = (filters: FilterPembayaranValues) => {
    setActiveFilters(filters);
  };

  // Handle tombol Refresh / Reset
  const handleRefresh = () => {
    setActiveFilters(defaultFilterPembayaranValues);
    setFilterKey((prev) => prev + 1);
    setSearchCategory("-- Semua --");
    setSearchInput("");
    setSearchQuery("");
    fetchPembayaran();
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Filter Data (Filter Card + Search)
  const filteredData = useMemo(() => {
    return pembayaranList.filter((item) => {
      // 1. Filter dari Card Atas
      if (
        activeFilters.penerima &&
        activeFilters.penerima !== "-- Semua --" &&
        item.penerima &&
        item.penerima !== activeFilters.penerima
      ) {
        return false;
      }

      if (
        activeFilters.periodePembayaran &&
        activeFilters.periodePembayaran !== "-- Semua --" &&
        activeFilters.periodePembayaran !== "-- Semua Periode --"
      ) {
        const matchesPeriode =
          item.periodePembayaran?.toLowerCase() ===
            activeFilters.periodePembayaran.toLowerCase() ||
          (activeFilters.periodePembayaran.includes("2024") &&
            activeFilters.periodePembayaran.includes("Genap") &&
            item.periode === "20242");

        if (!matchesPeriode) {
          return false;
        }
      }

      if (
        activeFilters.metodePembayaran &&
        activeFilters.metodePembayaran !== "-- Semua --" &&
        activeFilters.metodePembayaran !== "-- Semua Metode Pembayaran --"
      ) {
        if (
          !item.metodePembayaran
            ?.toLowerCase()
            .includes(activeFilters.metodePembayaran.toLowerCase())
        ) {
          return false;
        }
      }

      if (
        activeFilters.channel &&
        activeFilters.channel !== "-- Semua --" &&
        activeFilters.channel !== "-- Semua Channel --"
      ) {
        if (
          !item.channel
            ?.toLowerCase()
            .includes(activeFilters.channel.toLowerCase())
        ) {
          return false;
        }
      }

      if (
        activeFilters.angkatan &&
        activeFilters.angkatan !== "-- Semua --" &&
        activeFilters.angkatan !== "-- Semua Angkatan --"
      ) {
        if (
          item.angkatan &&
          !item.angkatan.includes(activeFilters.angkatan.replace(/\D/g, ""))
        ) {
          return false;
        }
      }

      if (
        activeFilters.programStudi &&
        activeFilters.programStudi !== "-- Semua --" &&
        activeFilters.programStudi !== "-- Semua Program Studi --"
      ) {
        if (
          item.programStudi &&
          !item.programStudi
            .toLowerCase()
            .includes(activeFilters.programStudi.toLowerCase())
        ) {
          return false;
        }
      }

      if (
        activeFilters.gelombang &&
        activeFilters.gelombang !== "-- Semua --" &&
        activeFilters.gelombang !== "-- Semua Gelombang --"
      ) {
        if (item.gelombang && item.gelombang !== activeFilters.gelombang) {
          return false;
        }
      }

      if (
        activeFilters.jalurPendaftaran &&
        activeFilters.jalurPendaftaran !== "-- Semua --" &&
        activeFilters.jalurPendaftaran !== "-- Semua Jalur Pendaftaran --"
      ) {
        if (
          item.jalurPendaftaran &&
          !item.jalurPendaftaran
            .toLowerCase()
            .includes(activeFilters.jalurPendaftaran.toLowerCase())
        ) {
          return false;
        }
      }

      if (
        activeFilters.sistemKuliah &&
        activeFilters.sistemKuliah !== "-- Semua --" &&
        activeFilters.sistemKuliah !== "-- Semua Sistem Kuliah --"
      ) {
        if (
          item.sistemKuliah &&
          !item.sistemKuliah
            .toLowerCase()
            .includes(activeFilters.sistemKuliah.toLowerCase())
        ) {
          return false;
        }
      }

      // 2. Filter dari Pencarian
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        if (searchCategory === "Kode Pembayaran") {
          return item.kodePembayaran?.toLowerCase().includes(q);
        } else if (searchCategory === "NIM") {
          return item.nim?.toLowerCase().includes(q);
        } else if (searchCategory === "Nama") {
          return item.nama?.toLowerCase().includes(q);
        } else {
          return (
            item.kodePembayaran?.toLowerCase().includes(q) ||
            item.nim?.toLowerCase().includes(q) ||
            item.nama?.toLowerCase().includes(q) ||
            item.metodePembayaran?.toLowerCase().includes(q) ||
            item.channel?.toLowerCase().includes(q)
          );
        }
      }

      return true;
    });
  }, [pembayaranList, activeFilters, searchQuery, searchCategory]);

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Pembayaran</p>
      </div>

      {/* Top Filter Card (bg-white, font text-sm, tombol Simpan Filter) */}
      <div className="mb-4">
        <FilterDataPembayaranCard
          key={filterKey}
          initialFilters={activeFilters}
          onFilter={handleFilterSubmit}
        />
      </div>

      {/* Table Card (bg-white, green border, search bar & action buttons) */}
      <div className="w-full bg-white shadow-md rounded-md border-t-[#10ac84] border-t-4 p-4 mt-4">
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-start lg:items-center mb-4">
          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <Dropdown
              options={searchCategoryOptions}
              value={searchCategory}
              defaultValue={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="w-full sm:w-44 text-xs sm:text-sm"
            />
            <div className="flex items-center space-x-1">
              <TextField
                placeholder="Cari Transaksi"
                value={searchInput}
                onChange={(val) => {
                  setSearchInput(val);
                  if (!val) setSearchQuery("");
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
                icon={
                  <IoMdRefresh
                    className={`text-base ${loading ? "animate-spin" : ""}`}
                  />
                }
                variant="info"
                onClick={handleRefresh}
                title="Reset & Refresh Data"
              />
            </div>
          </div>

          {/* Action Buttons Right Side */}
          <div className="flex items-center space-x-2">
            <IconButton
              icon={<IoMdAdd className="text-base" />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-xs font-medium cursor-pointer"
              onClick={() => {
                navigate(ROUTES.OPERASIONAL.PEMBAYARAN);
              }}
            />
          </div>
        </div>

        {/* Tabel Pembayaran */}
        <div className="mb-4">
          <PembayaranTable
            data={filteredData}
            loading={loading}
            onView={(item) => {
              navigate(`${ROUTES.TRANSAKSI.DETAIL_PEMBAYARAN}?id=${item.id}`);
            }}
            onPrint={(item) => {
              navigate(`${ROUTES.TRANSAKSI.KWITANSI_PEMBAYARAN}?id=${item.id}`);
            }}
          />
        </div>
      </div>
    </>
  );
}
