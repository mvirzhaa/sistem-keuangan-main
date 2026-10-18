import { useState, useMemo, useEffect, useCallback } from "react";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import KeuanganTable from "../components/KeuanganTable";
import transaksiApi, {
  type TransaksiKeuanganData,
} from "../services/transaksi.api";
import { useReferensiStore } from "../../../common/stores/referensiStore";

const searchCategories = [
  "-- Semua --",
  "Kode Transaksi",
  "ID / NIM",
  "Nama",
  "Uraian",
];

const jenisTransaksiOptions = [
  "-- Semua Jenis Transaksi --",
  "DEP - Deposit",
  "PAY - Pembayaran",
  "INV - Tagihan",
];

export default function KeuanganPage() {
  document.title = "Transaksi - Keuangan";

  const { data: referensi, fetchReferensi } = useReferensiStore();

  // Load master referensi
  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  // Options Periode dengan default "-- Semua Periode --"
  const periodeOptions = useMemo(() => {
    const list = referensi.periode.filter(
      (p) => p !== "-- Semua --" && p !== "-- Semua Periode --",
    );
    return ["-- Semua Periode --", ...list];
  }, [referensi.periode]);

  // State Filter Card Atas (Input vs Applied saat klik "Simpan Filter")
  const [selectedPeriode, setSelectedPeriode] =
    useState<string>("-- Semua Periode --");
  const [appliedPeriode, setAppliedPeriode] =
    useState<string>("-- Semua Periode --");

  const [selectedJenisTransaksi, setSelectedJenisTransaksi] =
    useState<string>("-- Semua Jenis Transaksi --");
  const [appliedJenisTransaksi, setAppliedJenisTransaksi] =
    useState<string>("-- Semua Jenis Transaksi --");

  // State Search Bar
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Data state dari Mock JSON API (dengan cache localStorage)
  const [dataList, setDataList] = useState<TransaksiKeuanganData[]>(() => {
    try {
      const cached = localStorage.getItem("cached_transaksi_keuangan");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState(false);

  // Fetch data dari mock API
  const fetchTransaksi = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const res = await transaksiApi.getTransaksiKeuangan();
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray((res as any)?.data?.data)
        ? (res as any).data.data
        : [];

      if (list.length > 0) {
        setDataList(list);
        try {
          localStorage.setItem("cached_transaksi_keuangan", JSON.stringify(list));
        } catch {}
      } else if (retryCount < 2) {
        setTimeout(() => fetchTransaksi(retryCount + 1), 600);
      }
    } catch (err) {
      console.error("Gagal memuat transaksi keuangan:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchTransaksi(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransaksi();
  }, [fetchTransaksi]);

  // Aksi tombol "Simpan Filter": Terapkan filter yang dipilih
  const handleApplyFilter = () => {
    setAppliedPeriode(selectedPeriode);
    setAppliedJenisTransaksi(selectedJenisTransaksi);
  };

  // Aksi tombol "Refresh": Reset semua filter dan pencarian ke default, lalu muat ulang data
  const handleRefresh = async () => {
    // 1. Reset filter card atas
    setSelectedPeriode("-- Semua Periode --");
    setAppliedPeriode("-- Semua Periode --");
    setSelectedJenisTransaksi("-- Semua Jenis Transaksi --");
    setAppliedJenisTransaksi("-- Semua Jenis Transaksi --");

    // 2. Reset pencarian
    setSearchCategory("-- Semua --");
    setSearchInput("");
    setSearchQuery("");

    // 3. Hapus cache dan fetch data baru
    try {
      localStorage.removeItem("cached_transaksi_keuangan");
    } catch {}
    await fetchTransaksi(0);
  };

  // Filter Data gabungan (Applied Periode + Applied Jenis Transaksi + Search)
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // 1. Filter Periode (hanya aktif setelah klik "Simpan Filter")
      if (
        appliedPeriode &&
        appliedPeriode !== "-- Semua Periode --" &&
        appliedPeriode !== "-- Semua --"
      ) {
        const matchesPeriodeNama =
          item.periodeNama?.toLowerCase() === appliedPeriode.toLowerCase();
        const matchesPeriodeCode =
          item.periode?.toLowerCase() === appliedPeriode.toLowerCase();

        // Pemeriksaan padanan kode periode (contoh: "2024 Genap" <-> "20242")
        const isEquivalent =
          (appliedPeriode.includes("2024") &&
            appliedPeriode.includes("Genap") &&
            item.periode === "20242") ||
          (appliedPeriode.includes("2024") &&
            appliedPeriode.includes("Ganjil") &&
            item.periode === "20241") ||
          (appliedPeriode.includes("2025") &&
            appliedPeriode.includes("Genap") &&
            item.periode === "20252") ||
          (appliedPeriode.includes("2025") &&
            appliedPeriode.includes("Ganjil") &&
            item.periode === "20251") ||
          (appliedPeriode.includes("2026") &&
            appliedPeriode.includes("Genap") &&
            item.periode === "20262") ||
          (appliedPeriode.includes("2026") &&
            appliedPeriode.includes("Ganjil") &&
            item.periode === "20261");

        if (!matchesPeriodeNama && !matchesPeriodeCode && !isEquivalent) {
          return false;
        }
      }

      // 2. Filter Jenis Transaksi (hanya aktif setelah klik "Simpan Filter")
      if (
        appliedJenisTransaksi &&
        appliedJenisTransaksi !== "-- Semua Jenis Transaksi --" &&
        appliedJenisTransaksi !== "-- Semua --"
      ) {
        const prefix = appliedJenisTransaksi.split(" ")[0].toUpperCase();
        if (item.jenisTransaksi?.toUpperCase() !== prefix) {
          return false;
        }
      }

      // 3. Filter Search
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        if (searchCategory === "Kode Transaksi") {
          return item.kodeTransaksi?.toLowerCase().includes(q);
        } else if (
          searchCategory === "ID / NIM" ||
          searchCategory === "NIM" ||
          searchCategory === "ID"
        ) {
          return item.idPengguna?.toLowerCase().includes(q);
        } else if (searchCategory === "Nama") {
          return item.nama?.toLowerCase().includes(q);
        } else if (searchCategory === "Uraian") {
          return item.uraian?.toLowerCase().includes(q);
        } else {
          return (
            item.kodeTransaksi?.toLowerCase().includes(q) ||
            item.idPengguna?.toLowerCase().includes(q) ||
            item.nama?.toLowerCase().includes(q) ||
            item.uraian?.toLowerCase().includes(q) ||
            item.jenisTransaksi?.toLowerCase().includes(q)
          );
        }
      }

      return true;
    });
  }, [
    dataList,
    appliedPeriode,
    appliedJenisTransaksi,
    searchQuery,
    searchCategory,
  ]);

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Keuangan</p>
      </div>

      {/* Top Filter Card (bg-white, font label sedang, tombol Simpan Filter) */}
      <div className="w-full bg-white shadow-md rounded-md border-t-amber-500 border-t-4 p-4 mb-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-medium text-amber-600 whitespace-nowrap sm:w-28">
              Periode
            </label>
            <Dropdown
              options={periodeOptions}
              value={selectedPeriode}
              defaultValue={selectedPeriode}
              onChange={(val) => setSelectedPeriode(val)}
              className="w-full sm:flex-1 text-xs sm:text-sm"
            />
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-medium text-amber-600 whitespace-nowrap sm:w-36">
              Jenis Transaksi
            </label>
            <Dropdown
              options={jenisTransaksiOptions}
              value={selectedJenisTransaksi}
              defaultValue={selectedJenisTransaksi}
              onChange={(val) => setSelectedJenisTransaksi(val)}
              className="w-full sm:flex-1 text-xs sm:text-sm"
            />
          </div>

          {/* Tombol Simpan Filter */}
          <div className="flex justify-end items-center pt-1 lg:pt-0">
            <button
              type="button"
              onClick={handleApplyFilter}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-md flex items-center transition-colors cursor-pointer text-xs shadow-sm whitespace-nowrap"
            >
              <IoFilter className="mr-2 text-sm" />
              Simpan Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table Card (bg-white, green border, search bar & refresh) */}
      <div className="w-full bg-white shadow-md rounded-md border-t-[#10ac84] border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Dropdown
              options={searchCategories}
              value={searchCategory}
              defaultValue={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="text-xs sm:text-sm w-full sm:w-44"
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
                className="w-full sm:w-72 text-xs"
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
        </div>

        <div className="mb-4">
          <KeuanganTable data={filteredData} loading={loading} />
        </div>
      </div>
    </>
  );
}
