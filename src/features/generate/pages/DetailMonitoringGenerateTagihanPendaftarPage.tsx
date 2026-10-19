import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch, IoMdRefresh } from "react-icons/io";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import IconButton from "../../../components/button/IconButton";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import generateApi, {
  type DetailMonitoringGenerateTagihanPendaftarItem,
} from "../services/generate.api";

const STORAGE_KEY_DETAIL_PENDAFTAR =
  "saved_filter_detail_monitoring_generate_tagihan_pendaftar";

export default function DetailMonitoringGenerateTagihanPendaftarPage() {
  document.title = "Detail Monitoring Generate Tagihan Pendaftar";
  const location = useLocation();

  // Ambil metadata dari state navigasi jika ada
  const stateItem = location.state?.item;
  const initialFrekuensi = location.state?.frekuensi || "Tiap Transaksi";
  const initialPeriodeTagihan =
    location.state?.periodeTagihan && location.state.periodeTagihan !== "2025 Genap"
      ? location.state.periodeTagihan
      : "-- Semua --";

  const defaultFilters = useMemo(
    () => ({
      periodeTagihan: initialPeriodeTagihan,
      periodeMasuk: "-- Semua Periode Masuk --",
      gelombang: "-- Semua Gelombang --",
      jalur: "-- Semua Jalur Pendaftaran --",
      sistemKuliah: "-- Semua Sistem Kuliah --",
      unit: stateItem?.name || "Universitas Ibn Khaldun",
      frekuensi: initialFrekuensi,
      status: "-- Semua --",
    }),
    [initialPeriodeTagihan, initialFrekuensi, stateItem?.name],
  );

  // Filter input form state (tidak langsung memicu fetch sebelum tombol Simpan Filter diklik)
  const [filterForm, setFilterForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DETAIL_PENDAFTAR);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultFilters,
          ...parsed,
          periodeTagihan:
            !parsed.periodeTagihan || parsed.periodeTagihan === "2025 Genap"
              ? "-- Semua --"
              : parsed.periodeTagihan,
        };
      }
    } catch {}
    return defaultFilters;
  });

  // State filter yang aktif diterapkan untuk query/fetch data
  const [appliedFilters, setAppliedFilters] = useState(filterForm);

  // Search state
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  // Data list & loading
  const [dataList, setDataList] = useState<
    DetailMonitoringGenerateTagihanPendaftarItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Options dropdown filter
  const periodeTagihanOptions = [
    "-- Semua --",
    "2027 Genap",
    "2026 Genap",
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
  ];
  const periodeMasukOptions = [
    "-- Semua Periode Masuk --",
    "2027",
    "2026",
    "2025",
    "2024",
    "2023",
  ];
  const gelombangOptions = [
    "-- Semua Gelombang --",
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
  ];
  const jalurOptions = [
    "-- Semua Jalur Pendaftaran --",
    "SBMPTN",
    "SNMPTN",
    "Mandiri",
    "Prestasi",
  ];
  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    "Reguler",
    "Kelas Karyawan",
    "Online",
  ];
  const unitOptions = [
    "Universitas Ibn Khaldun",
    "Fakultas Teknik",
    "Fakultas Ekonomi dan Bisnis",
    "Fakultas Hukum",
    "Fakultas Keguruan dan Ilmu Pendidikan",
    "Fakultas Agama Islam",
    "Fakultas Ilmu Kesehatan",
    "S1 - Teknik Informatika",
    "S1 - Sistem Informasi",
    "S1 - Teknik Sipil",
    "S1 - Teknik Elektro",
    "S1 - Teknik Mesin",
    "S1 - Manajemen",
    "S1 - Akuntansi",
    "S1 - Bisnis Digital",
    "S1 - Ilmu Hukum",
    "S1 - Pendidikan Agama Islam",
    "S1 - Pendidikan Guru Sekolah Dasar",
    "S1 - Kesehatan Masyarakat",
  ];
  const frekuensiOptions = [
    "Tiap Transaksi",
    "Bulanan",
    "Semesteran",
    "Tahunan",
  ];
  const statusOptions = ["-- Semua --", "Lunas", "Belum Lunas"];
  const searchCategoryOptions = [
    "-- Semua --",
    "Kode Pendaftar",
    "Nama",
    "Unit Diterima",
    "Jalur Pendaftaran",
    "Jenis Akun",
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilterForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveFilter = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY_DETAIL_PENDAFTAR,
        JSON.stringify(filterForm),
      );
    } catch {}
    setAppliedFilters(filterForm);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await generateApi.getDetailMonitoringGenerateTagihanPendaftar({
        unit: appliedFilters.unit,
        status: appliedFilters.status,
        frekuensi: appliedFilters.frekuensi,
        periodeTagihan: appliedFilters.periodeTagihan,
        periodeMasuk: appliedFilters.periodeMasuk,
        gelombang: appliedFilters.gelombang,
        jalur: appliedFilters.jalur,
        sistemKuliah: appliedFilters.sistemKuliah,
        q: appliedKeyword,
      });

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

      setDataList(list);
    } catch (err) {
      console.error("Gagal memuat detail monitoring generate tagihan pendaftar:", err);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, appliedKeyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchSubmit = () => {
    setAppliedKeyword(searchKeyword.trim());
  };

  const handleResetSearch = () => {
    setSearchKeyword("");
    setAppliedKeyword("");
    setSearchCategory("-- Semua --");
    setFilterForm(defaultFilters);
    setAppliedFilters(defaultFilters);
    try {
      localStorage.removeItem(STORAGE_KEY_DETAIL_PENDAFTAR);
    } catch {}
  };

  // Format currency IDR
  const formatRupiah = (val: number) => {
    if (!val || val === 0) return "0,00";
    return Number(val).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Filter client-side berdasarkan kategori pencarian
  const filteredData = useMemo(() => {
    if (!appliedKeyword) return dataList;
    const kw = appliedKeyword.toLowerCase();
    return dataList.filter((item) => {
      if (searchCategory === "Kode Pendaftar")
        return item.kodePendaftar?.toLowerCase().includes(kw);
      if (searchCategory === "Nama")
        return item.nama?.toLowerCase().includes(kw);
      if (searchCategory === "Unit Diterima")
        return item.unitDiterima?.toLowerCase().includes(kw);
      if (searchCategory === "Jalur Pendaftaran")
        return item.jalurPendaftaran?.toLowerCase().includes(kw);
      if (searchCategory === "Jenis Akun")
        return item.jenisAkun?.toLowerCase().includes(kw);
      return (
        item.kodePendaftar?.toLowerCase().includes(kw) ||
        item.nama?.toLowerCase().includes(kw) ||
        item.unitDiterima?.toLowerCase().includes(kw) ||
        item.jalurPendaftaran?.toLowerCase().includes(kw) ||
        item.jenisAkun?.toLowerCase().includes(kw)
      );
    });
  }, [dataList, appliedKeyword, searchCategory]);

  // Kolom ListTable sesuai Gambar 2 dari User:
  // Kode Pendaftar | Nama | Periode | Gelombang | Jalur Pendaftaran | Sistem Kuliah | Unit Diterima | Jenis Akun | Nominal Tarif | Nominal Potongan | Nominal Sekarang | Cicilan Ke
  const columns: Column<DetailMonitoringGenerateTagihanPendaftarItem>[] = useMemo(
    () => [
      {
        key: "kodePendaftar",
        header: "Kode Pendaftar",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => (
          <span className="text-xs text-gray-800">{item.kodePendaftar}</span>
        ),
      },
      {
        key: "nama",
        header: "Nama",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => (
          <span className="text-xs font-normal text-gray-900">{item.nama}</span>
        ),
      },
      {
        key: "periode",
        header: "Periode",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => <span className="text-xs">{item.periode}</span>,
      },
      {
        key: "gelombang",
        header: "Gelombang",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => <span className="text-xs">{item.gelombang}</span>,
      },
      {
        key: "jalurPendaftaran",
        header: "Jalur Pendaftaran",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => (
          <span className="text-xs">{item.jalurPendaftaran}</span>
        ),
      },
      {
        key: "sistemKuliah",
        header: "Sistem Kuliah",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => <span className="text-xs">{item.sistemKuliah}</span>,
      },
      {
        key: "unitDiterima",
        header: "Unit Diterima",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => <span className="text-xs">{item.unitDiterima}</span>,
      },
      {
        key: "jenisAkun",
        header: "Jenis Akun",
        sortable: true,
        className: "text-xs",
        headerClassName: "text-xs",
        render: (item) => <span className="text-xs">{item.jenisAkun}</span>,
      },
      {
        key: "nominalTarif",
        header: "Nominal Tarif",
        sortable: true,
        className: "text-right text-xs",
        headerClassName: "text-right text-xs",
        render: (item) => (
          <span className="text-xs">{formatRupiah(item.nominalTarif)}</span>
        ),
      },
      {
        key: "nominalPotongan",
        header: "Nominal Potongan",
        sortable: true,
        className: "text-right text-xs",
        headerClassName: "text-right text-xs",
        render: (item) => (
          <span className="text-xs">{formatRupiah(item.nominalPotongan)}</span>
        ),
      },
      {
        key: "nominalSekarang",
        header: "Nominal Sekarang",
        sortable: true,
        className: "text-right text-xs",
        headerClassName: "text-right text-xs",
        render: (item) => (
          <span className="text-xs font-medium text-gray-900">
            {formatRupiah(item.nominalSekarang)}
          </span>
        ),
      },
      {
        key: "cicilanKe",
        header: "Cicilan Ke",
        sortable: true,
        className: "text-center text-xs",
        headerClassName: "text-center text-xs",
        render: (item) => <span className="text-xs">{item.cicilanKe}</span>,
      },
    ],
    [],
  );

  return (
    <>
      {/* Header Halaman */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">
          Detail Monitoring Generate Tagihan Pendaftar
        </h1>
      </div>

      {/* Filter Card Atas */}
      <div className="border-t-4 border-t-amber-500 bg-white rounded-md shadow-md p-5 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
          {/* Kolom Kiri 1: Periode Tagihan */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Periode Tagihan
            </label>
            <Dropdown
              options={periodeTagihanOptions}
              value={filterForm.periodeTagihan}
              onChange={(value) => handleFilterChange("periodeTagihan", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kanan 1: Periode Masuk */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Periode Masuk
            </label>
            <Dropdown
              options={periodeMasukOptions}
              value={filterForm.periodeMasuk}
              onChange={(value) => handleFilterChange("periodeMasuk", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kiri 2: Gelombang */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Gelombang
            </label>
            <Dropdown
              options={gelombangOptions}
              value={filterForm.gelombang}
              onChange={(value) => handleFilterChange("gelombang", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kanan 2: Jalur */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Jalur
            </label>
            <Dropdown
              options={jalurOptions}
              value={filterForm.jalur}
              onChange={(value) => handleFilterChange("jalur", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kiri 3: Sistem Kuliah */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Sistem Kuliah
            </label>
            <Dropdown
              options={sistemKuliahOptions}
              value={filterForm.sistemKuliah}
              onChange={(value) => handleFilterChange("sistemKuliah", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kanan 3: Unit */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Unit
            </label>
            <Dropdown
              options={unitOptions}
              value={filterForm.unit}
              onChange={(value) => handleFilterChange("unit", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kiri 4: Frekuensi */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Frekuensi
            </label>
            <Dropdown
              options={frekuensiOptions}
              value={filterForm.frekuensi}
              onChange={(value) => handleFilterChange("frekuensi", value)}
              className="w-full"
            />
          </div>

          {/* Kolom Kanan 4: Status */}
          <div className="flex items-center">
            <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
              Status
            </label>
            <Dropdown
              options={statusOptions}
              value={filterForm.status}
              onChange={(value) => handleFilterChange("status", value)}
              className="w-full"
            />
          </div>

          {/* Tombol Simpan Filter (tanpa teks "Filter tersimpan!" atau toast) */}
          <div className="md:col-span-2 flex justify-end items-center pt-1">
            <button
              type="button"
              onClick={handleSaveFilter}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium text-xs flex items-center shadow-sm transition-colors cursor-pointer"
            >
              <IoFilter className="mr-2" />
              Simpan Filter
            </button>
          </div>
        </div>
      </div>

      {/* Wrapper Tabel Bawah */}
      <div className="border-t-4 border-t-emerald-600 bg-white rounded-md shadow-md p-4 mt-4">
        {/* Baris Pencarian & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
          <Dropdown
            options={searchCategoryOptions}
            defaultValue={searchCategory}
            value={searchCategory}
            onChange={(val) => setSearchCategory(val)}
            className="w-full sm:w-44 text-xs"
          />
          <div className="flex items-center space-x-1">
            <TextField
              placeholder="Cari Detail Monitoring Generate Tagihan Pendaftar"
              value={searchKeyword}
              onChange={(val) => {
                setSearchKeyword(val);
                if (!val) setAppliedKeyword("");
              }}
              onEnter={handleSearchSubmit}
              className="w-full sm:w-80 text-xs"
            />
            <IconButton
              icon={<IoMdSearch className="text-base" />}
              variant="success"
              onClick={handleSearchSubmit}
              title="Cari"
            />
            <IconButton
              icon={
                <IoMdRefresh
                  className={`text-base ${loading ? "animate-spin" : ""}`}
                />
              }
              variant="info"
              onClick={handleResetSearch}
              title="Reset & Refresh Data"
            />
          </div>
        </div>

        {/* Tabel Data menggunakan ListTable */}
        <ListTable<DetailMonitoringGenerateTagihanPendaftarItem>
          data={filteredData}
          columns={columns}
          rowKey={(item) => item.id}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          className="w-full text-xs bg-white"
          headerClassName="bg-[#002f6c] text-white text-xs font-semibold"
          emptyMessage="Data kosong"
          loading={loading}
        />
      </div>
    </>
  );
}
