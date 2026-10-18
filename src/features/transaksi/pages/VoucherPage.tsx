import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import FilterDataVoucherCard, {
  type FilterVoucherValues,
  defaultFilterVoucherValues,
} from "../components/FilterDataVoucherCard";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import VoucherTable, { type VoucherData } from "../components/VoucherTable";
import transaksiApi from "../services/transaksi.api";

export default function VoucherPage() {
  document.title = "Penerima Voucher";

  // State data dari json
  const [dataList, setDataList] = useState<VoucherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State Search & Category
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");

  // State Filter Card
  const [filters, setFilters] = useState<FilterVoucherValues>(
    defaultFilterVoucherValues
  );
  const [filterResetKey, setFilterResetKey] = useState<number>(0);

  // Fetch data dari mock JSON-server
  const fetchVoucherData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getPenerimaVoucher();
      if (res && res.data) {
        setDataList(res.data);
      } else {
        setDataList([]);
      }
    } catch (err) {
      console.error("Gagal memuat voucher dari server:", err);
      setDataList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVoucherData();
  }, [fetchVoucherData]);

  // Handle Search Trigger
  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  // Handle Reset / Refresh
  const handleReset = () => {
    setSearchInput("");
    setActiveSearch("");
    setSearchCategory("-- Semua --");
    setFilters({ ...defaultFilterVoucherValues });
    setFilterResetKey((prev) => prev + 1);
    fetchVoucherData();
  };

  // Handle Filter Change
  const handleFilter = (newFilters: FilterVoucherValues) => {
    setFilters(newFilters);
  };

  // Filter Data Client-Side
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Search Query & Category
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        if (searchCategory === "ID Pendaftar") {
          if (!item.idPendaftar?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Nama") {
          if (!item.nama?.toLowerCase().includes(query)) return false;
        } else if (searchCategory === "Voucher") {
          if (!item.voucher?.toLowerCase().includes(query)) return false;
        } else {
          // -- Semua --
          const matchId = item.idPendaftar?.toLowerCase().includes(query);
          const matchNama = item.nama?.toLowerCase().includes(query);
          const matchVoucher = item.voucher?.toLowerCase().includes(query);
          if (!matchId && !matchNama && !matchVoucher) return false;
        }
      }

      // 2. Filter Voucher
      if (
        filters.voucher &&
        filters.voucher !== "-- Semua Potongan --" &&
        item.voucher &&
        !item.voucher.toLowerCase().includes(filters.voucher.toLowerCase())
      ) {
        return false;
      }

      // 3. Filter Penerima
      if (
        filters.penerima &&
        filters.penerima !== "-- Semua --" &&
        item.penerima &&
        item.penerima !== filters.penerima
      ) {
        return false;
      }

      // 4. Filter Periode Akademik
      if (
        filters.periodeAkademik &&
        filters.periodeAkademik !== "-- Semua Periode --" &&
        item.periode &&
        item.periode !== filters.periodeAkademik
      ) {
        return false;
      }

      return true;
    });
  }, [dataList, activeSearch, searchCategory, filters]);

  // Handle Inline Save Edit Nominal & Digunakan
  const handleEditNominal = async (item: VoucherData, newValue: number) => {
    try {
      await transaksiApi.updatePenerimaVoucher(item.id, {
        nominal: newValue,
        digunakan: newValue,
      });

      // Update state data lokal
      setDataList((prev) =>
        prev.map((v) =>
          v.id === item.id
            ? { ...v, nominal: newValue, digunakan: newValue }
            : v
        )
      );
    } catch (err) {
      console.error("Gagal mengupdate nominal voucher:", err);
      // Fallback update state lokal jika mock PATCH offline
      setDataList((prev) =>
        prev.map((v) =>
          v.id === item.id
            ? { ...v, nominal: newValue, digunakan: newValue }
            : v
        )
      );
    }
  };

  return (
    <>
      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          Penerima Voucher
        </h1>
      </div>

      {/* Filter Card (Top) */}
      <div>
        <FilterDataVoucherCard
          key={filterResetKey}
          onFilter={handleFilter}
          initialFilters={filters}
        />
      </div>

      {/* Main Container Card dengan background putih (Bottom) */}
      <div className="w-full bg-white shadow-lg rounded-md border-t-green-800 border-t-4 p-5 mt-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-stretch sm:items-center justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-stretch sm:items-center">
            {/* Category Dropdown */}
            <Dropdown
              options={["-- Semua --", "ID Pendaftar", "Nama", "Voucher"]}
              value={searchCategory}
              defaultValue="-- Semua --"
              onChange={(value) => setSearchCategory(value)}
              className="w-full sm:w-36 text-xs"
            />

            {/* Search Input & Action Buttons */}
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Penerima Voucher"
                value={searchInput}
                onChange={(val) => setSearchInput(val)}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="p-2 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded cursor-pointer transition-colors shrink-0"
                title="Cari"
              >
                <IoMdSearch className="text-base" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded cursor-pointer transition-colors shrink-0"
                title="Reset pencarian"
              >
                <IoMdRefresh className="text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabel Penerima Voucher */}
        <VoucherTable
          data={filteredData}
          loading={loading}
          onEdit={handleEditNominal}
        />
      </div>
    </>
  );
}
