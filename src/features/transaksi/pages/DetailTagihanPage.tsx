import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoChevronForward,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { ROUTES } from "../../../common/routes/routes";
import transaksiApi, {
  type TagihanItemData,
  type RiwayatPembayaranData,
  type RiwayatPotonganData,
} from "../services/transaksi.api";
import ListTable, { type Column } from "../../../components/tables/ListTable";


// Fallback data default sesuai gambar ke-1 jika API belum mengembalikan data
const defaultDetailTagihan: TagihanItemData = {
  id: "2",
  kodeTagihan: "INV/20232/0000126",
  nim: "231106051399",
  nama: "ZIYAD RAIS",
  prodi: "S1 - Teknik Informatika",
  sistemKuliah: "Reguler",
  jalurPendaftaran: "SELEKSI MANDIRI",
  periodeMasuk: "20231",
  gelombang: "Gelombang 1",
  penerima: "Mahasiswa",
  kelompok: "Kelompok 1",
  jenis: "1090",
  jenisTagihan: "1090 - Sumbangan Fasilitas",
  cicilan: 1,
  bulan: "-",
  tahun: "-",
  nominal: 1000000,
  denda: 0,
  potongan: 0,
  potonganLangsung: 0,
  potonganBeasiswa: 0,
  bayar: 1000000,
  lunas: true,
  statusPembayaran: "lunas",
  tglTagihan: "15 Maret 2024, 09:12:00",
  tglTerbit: "-",
  tglJatuhTempo: "-",
  tglAkhirDispensasi: "-",
  keterangan: "-",
  periodeTagihan: "2024 Genap",
  angkatan: "2023",
  riwayatPembayaran: [
    {
      no: 1,
      kodePembayaran: "PAY/20261/0003360",
      periode: "20261",
      metodePembayaran: "EduFin",
      channel: "Tokopedia",
      isOnline: true,
      tanggal: "2026-09-03 14:31:31",
      nominal: 2300000,
      isBatal: false,
    },
  ],
  riwayatPotongan: [],
};

const defaultPaymentRow: RiwayatPembayaranData = {
  no: 1,
  kodePembayaran: "PAY/20261/0003360",
  periode: "20261",
  metodePembayaran: "EduFin",
  channel: "Tokopedia",
  isOnline: true,
  tanggal: "2026-09-03 14:31:31",
  nominal: 2300000,
  isBatal: false,
};

export default function DetailTagihanPage() {
  document.title = "Transaksi - Detail Tagihan";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagihanId = searchParams.get("id");

  useEffect(() => {
    if (!tagihanId) {
      navigate(ROUTES.TRANSAKSI.DATA_TAGIHAN, { replace: true });
    }
  }, [tagihanId, navigate]);

  // State
  const [tagihan, setTagihan] = useState<TagihanItemData>(defaultDetailTagihan);
  const [tagihanList, setTagihanList] = useState<TagihanItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "tagihan" | "potongan" | "pembayaran"
  >("tagihan");
  const [searchKode, setSearchKode] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Fetch detail tagihan dari mock API
  const fetchDetail = useCallback(async () => {
    setLoading(true);
    try {
      const resList = await transaksiApi.getTagihan();
      const list = Array.isArray(resList)
        ? resList
        : Array.isArray(resList?.data)
        ? resList.data
        : [];

      if (list.length > 0) {
        setTagihanList(list);
        if (tagihanId) {
          const found = list.find(
            (item) => String(item.id) === String(tagihanId),
          );
          if (found) {
            setTagihan(found);
            setLoading(false);
            return;
          }
        }
        // Jika tidak ada ID atau ID tidak cocok, default ke item pertama
        setTagihan(list[0]);
      }
    } catch (err) {
      console.error("Gagal memuat detail tagihan:", err);
    } finally {
      setLoading(false);
    }
  }, [tagihanId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // Handler pencarian langsung di halaman detail
  const handleSearchDetail = () => {
    if (!searchKode.trim()) return;
    const q = searchKode.trim().toLowerCase();
    const found = tagihanList.find(
      (item) =>
        item.kodeTagihan?.toLowerCase().includes(q) ||
        item.nim?.toLowerCase().includes(q) ||
        item.nama?.toLowerCase().includes(q),
    );

    if (found) {
      setTagihan(found);
      setSearchParams({ id: found.id });
    } else {
      alert("Tagihan tidak ditemukan.");
    }
  };

  // Helper format currency rupiah dengan format `1.000.000,00`
  const formatRupiah = (val?: number | null) => {
    if (val === null || val === undefined || val === 0) return "0,00";
    return val.toLocaleString("id-ID") + ",00";
  };

  // Helper format integer biasa untuk box summary hijau `100.000` atau `0`
  const formatSimpleNumber = (val?: number | null) => {
    if (val === null || val === undefined || val === 0) return "0";
    return val.toLocaleString("id-ID");
  };

  // List pembayaran
  const paymentList =
    tagihan.riwayatPembayaran && tagihan.riwayatPembayaran.length > 0
      ? tagihan.riwayatPembayaran
      : [defaultPaymentRow];

  // Kolom ListTable untuk Tab Potongan / Beasiswa
  const potonganColumns: Column<RiwayatPotonganData>[] = useMemo(
    () => [
      {
        key: "no",
        header: "No.",
        width: "60px",
        className: "text-center",
        render: (item, index) => item.no || index + 1,
      },
      {
        key: "jenisPotongan",
        header: "Jenis Potongan",
        className: "text-center",
        render: (item) => item.jenisPotongan,
      },
      {
        key: "nominal",
        header: "Nominal",
        className: "text-center",
        render: (item) => formatSimpleNumber(item.nominal),
      },
      {
        key: "aksi",
        header: "Aksi",
        className: "text-center",
        width: "80px",
        render: (item) => item.aksi || "-",
      },
    ],
    [],
  );

  // Kolom ListTable untuk Tab Pembayaran
  const pembayaranColumns: Column<RiwayatPembayaranData>[] = useMemo(
    () => [
      {
        key: "no",
        header: "No.",
        width: "50px",
        className: "text-center",
        render: (item, index) => item.no || index + 1,
      },
      {
        key: "kodePembayaran",
        header: "Kode Pembayaran",
        className: "text-center font-medium text-gray-800",
        render: (item) => item.kodePembayaran,
      },
      {
        key: "periode",
        header: "Periode",
        className: "text-center",
        render: (item) => item.periode,
      },
      {
        key: "metodePembayaran",
        header: "Metode Pembayaran",
        className: "text-center",
        render: (item) => item.metodePembayaran,
      },
      {
        key: "channel",
        header: "Channel",
        className: "text-center",
        render: (item) => item.channel,
      },
      {
        key: "isOnline",
        header: "Online?",
        className: "text-center",
        render: (item) => (
          <div className="flex justify-center items-center">
            {item.isOnline ? (
              <IoCheckmark className="text-emerald-600 font-bold text-base" />
            ) : (
              <IoClose className="text-red-500 font-bold text-base" />
            )}
          </div>
        ),
      },
      {
        key: "tanggal",
        header: "Tanggal",
        className: "text-center",
        render: (item) => {
          if (!item.tanggal) return "-";
          const parts = item.tanggal.split(" ");
          if (parts.length === 2) {
            return (
              <div className="leading-tight">
                <div>{parts[0]}</div>
                <div>{parts[1]}</div>
              </div>
            );
          }
          return item.tanggal;
        },
      },
      {
        key: "nominal",
        header: "Nominal",
        className: "text-center font-medium",
        render: (item) =>
          typeof item.nominal === "number"
            ? item.nominal.toFixed(2)
            : item.nominal,
      },
      {
        key: "isBatal",
        header: "Batal?",
        className: "text-center",
        render: (item) => (
          <div className="flex justify-center items-center">
            {item.isBatal ? (
              <IoCheckmark className="text-emerald-600 font-bold text-base" />
            ) : (
              <IoClose className="text-red-500 font-bold text-base" />
            )}
          </div>
        ),
      },
    ],
    [],
  );


  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Tagihan</p>
      </div>

      {/* Main Container Card */}
      <div className="w-full bg-white shadow-md rounded-md border-t-[#10ac84] border-t-4 p-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
          {/* Left Search & Toggle Sidebar Controls */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-l-md transition-colors cursor-pointer flex items-center justify-center font-bold"
              title={isSidebarOpen ? "Sembunyikan Menu" : "Tampilkan Menu"}
            >
              {isSidebarOpen ? (
                <IoChevronBack className="text-base font-bold" />
              ) : (
                <IoChevronForward className="text-base font-bold" />
              )}
            </button>
            <input
              type="text"
              placeholder="Cari Tagihan"
              value={searchKode}
              onChange={(e) => setSearchKode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchDetail();
              }}
              className="border-y border-gray-300 py-1.5 px-3 text-xs sm:text-sm focus:outline-none w-48 sm:w-64"
            />
            <button
              type="button"
              onClick={handleSearchDetail}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md transition-colors cursor-pointer flex items-center justify-center"
              title="Cari"
            >
              <IoMdSearch className="text-base" />
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => navigate(ROUTES.TRANSAKSI.TAGIHAN)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs px-3.5 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm"
            >
              <IoChevronBack className="mr-1 text-sm font-bold" />
              Kembali ke Daftar
            </button>

            {/* Tombol "+ Tambah Baru" HANYA tampil di tab Data Tagihan */}
            {activeTab === "tagihan" && (
              <button
                type="button"
                onClick={() => {
                  navigate(ROUTES.TRANSAKSI.DATA_TAGIHAN);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm"
              >
                <IoMdAdd className="mr-1 text-base" />
                Tambah Baru
              </button>
            )}
          </div>
        </div>

        {/* Main Body (Left Sidebar & Right Content) */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Sidebar Tabs (Bisa di-toggle sembunyikan) */}
          {isSidebarOpen && (
            <div className="w-full md:w-48 flex-shrink-0 flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("tagihan")}
                className={`w-full py-2.5 px-4 text-xs sm:text-sm text-left transition-colors cursor-pointer border-l-4 ${
                  activeTab === "tagihan"
                    ? "border-sky-500 text-sky-600 font-semibold bg-sky-50/50"
                    : "border-transparent text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Data Tagihan
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("potongan")}
                className={`w-full py-2.5 px-4 text-xs sm:text-sm text-left transition-colors cursor-pointer border-l-4 ${
                  activeTab === "potongan"
                    ? "border-sky-500 text-sky-600 font-semibold bg-sky-50/50"
                    : "border-transparent text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Potongan / Beasiswa
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pembayaran")}
                className={`w-full py-2.5 px-4 text-xs sm:text-sm text-left transition-colors cursor-pointer border-l-4 ${
                  activeTab === "pembayaran"
                    ? "border-sky-500 text-sky-600 font-semibold bg-sky-50/50"
                    : "border-transparent text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Pembayaran
              </button>
            </div>
          )}

          {/* Right Content Area */}
          <div className="flex-1 space-y-6">
            {/* 1. KONTEN TAB: DATA TAGIHAN */}
            {activeTab === "tagihan" && (
              <>
                {/* Student Info Box (Kotak Biru Lembut) */}
                <div className="bg-sky-50/70 border-l-4 border-sky-500 rounded-r-md p-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {/* Kolom 1 Mahasiswa */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">NIM</span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nim}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Nama Mahasiswa
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nama}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Program Studi
                        </span>
                        <span className="text-gray-900">
                          {tagihan.prodi || "S1 - Teknik Informatika"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Sistem Kuliah
                        </span>
                        <span className="text-gray-900">
                          {tagihan.sistemKuliah || "Reguler"}
                        </span>
                      </div>
                    </div>

                    {/* Kolom 2 Mahasiswa */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Jalur Pendaftaran
                        </span>
                        <span className="text-gray-900">
                          {tagihan.jalurPendaftaran || "SELEKSI MANDIRI"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Periode Masuk
                        </span>
                        <span className="text-gray-900">
                          {tagihan.periodeMasuk || "20231"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 text-sky-700 font-medium">
                          Gelombang
                        </span>
                        <span className="text-gray-900">
                          {tagihan.gelombang || "Gelombang 1"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tagihan Details Grid (2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-xs sm:text-sm pt-2">
                  {/* Kolom Kiri Rincian */}
                  <div className="space-y-2.5">
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Kode Tagihan
                      </span>
                      <span className="text-gray-900 font-medium">
                        {tagihan.kodeTagihan}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Mahasiswa
                      </span>
                      <span className="text-gray-900">
                        {tagihan.nim} - {tagihan.nama}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Tgl. Tagihan
                      </span>
                      <span className="text-gray-900">
                        {tagihan.tglTagihan || "15 Maret 2024, 09:12:00"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Periode
                      </span>
                      <span className="text-gray-900">
                        {tagihan.periodeTagihan || "2024 Genap"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Bulan
                      </span>
                      <span className="text-gray-900">
                        {tagihan.bulan || "-"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Tahun
                      </span>
                      <span className="text-gray-900">
                        {tagihan.tahun || "-"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Jenis Tagihan
                      </span>
                      <span className="text-gray-900">
                        {tagihan.jenisTagihan ||
                          `${tagihan.jenis} - Sumbangan Fasilitas`}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Cicilan Ke-
                      </span>
                      <span className="text-gray-900">
                        {tagihan.cicilan || 1}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Tgl. Terbit Tagihan
                      </span>
                      <span className="text-gray-900">
                        {tagihan.tglTerbit || "-"}
                      </span>
                    </div>
                  </div>

                  {/* Kolom Kanan Rincian */}
                  <div className="space-y-2.5">
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Tgl. Jatuh Tempo
                      </span>
                      <span className="text-gray-900">
                        {tagihan.tglJatuhTempo || "-"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Nominal
                      </span>
                      <span className="text-gray-900 font-medium">
                        {formatRupiah(tagihan.nominal)}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Denda
                      </span>
                      <span className="text-gray-900">
                        {formatRupiah(tagihan.denda)}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Potongan Langsung
                      </span>
                      <span className="text-gray-900">
                        {formatRupiah(tagihan.potonganLangsung)}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Potongan / Beasiswa / Voucher
                      </span>
                      <span className="text-gray-900">
                        {formatRupiah(
                          tagihan.potonganBeasiswa || tagihan.potongan,
                        )}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Keterangan
                      </span>
                      <span className="text-gray-900">
                        {tagihan.keterangan || "-"}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Lunas?
                      </span>
                      <span className="text-gray-900 flex items-center">
                        {tagihan.lunas ||
                        tagihan.statusPembayaran === "lunas" ? (
                          <IoCheckmark className="text-emerald-600 font-bold text-lg" />
                        ) : (
                          <IoClose className="text-red-500 font-bold text-lg" />
                        )}
                      </span>
                    </div>
                    <div className="flex py-1.5 border-b border-gray-100 items-center">
                      <span className="w-48 text-gray-700 font-medium">
                        Tgl. Akhir Dispensasi
                      </span>
                      <span className="text-gray-900">
                        {tagihan.tglAkhirDispensasi || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 2. KONTEN TAB: POTONGAN / BEASISWA (Sesuai Gambar ke-2) */}
            {activeTab === "potongan" && (
              <div className="space-y-6">
                {/* Summary Box Hijau */}
                <div className="bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-md p-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {/* Kolom 1 */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Kode Tagihan
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.kodeTagihan}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          NIM
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nim}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Periode
                        </span>
                        <span className="text-gray-900">
                          {tagihan.periodeMasuk ||
                            tagihan.periodeTagihan ||
                            "20261"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Denda
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.denda)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Nominal Bayar
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.bayar || tagihan.nominal)}
                        </span>
                      </div>
                    </div>

                    {/* Kolom 2 */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Jenis Tagihan
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.jenisTagihan ||
                            tagihan.jenis ||
                            "Heregistrasi"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Nama Mahasiswa
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nama}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Tagihan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.nominal)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Potongan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.potongan)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Sisa Tagihan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(
                            Math.max(
                              0,
                              (tagihan.nominal || 0) -
                                (tagihan.bayar || 0) -
                                (tagihan.potongan || 0),
                            ),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabel Potongan Menggunakan ListTable */}
                <div className="w-full bg-white rounded-md overflow-hidden">
                  <ListTable<RiwayatPotonganData>
                    data={tagihan.riwayatPotongan || []}
                    columns={potonganColumns}
                    rowKey={(item) => item.no ?? item.jenisPotongan}
                    className="w-full text-xs bg-white"
                    headerClassName="text-xs font-semibold"
                    showFooter={false}
                    emptyMessage="Data kosong"
                  />
                </div>
              </div>
            )}

            {/* 3. KONTEN TAB: PEMBAYARAN (Sesuai Gambar ke-3) */}
            {activeTab === "pembayaran" && (
              <div className="space-y-6">
                {/* Summary Box Hijau */}
                <div className="bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-md p-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {/* Kolom 1 */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Kode Tagihan
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.kodeTagihan}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          NIM
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nim}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Periode
                        </span>
                        <span className="text-gray-900">
                          {tagihan.periodeMasuk ||
                            tagihan.periodeTagihan ||
                            "20261"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Denda
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.denda)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Nominal Bayar
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.bayar || tagihan.nominal)}
                        </span>
                      </div>
                    </div>

                    {/* Kolom 2 */}
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Jenis Tagihan
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.jenisTagihan ||
                            tagihan.jenis ||
                            "Heregistrasi"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Nama Mahasiswa
                        </span>
                        <span className="text-gray-900 font-medium">
                          {tagihan.nama}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Tagihan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.nominal)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Potongan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(tagihan.potongan)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-sky-700 font-medium">
                          Sisa Tagihan
                        </span>
                        <span className="text-gray-900">
                          {formatSimpleNumber(
                            Math.max(
                              0,
                              (tagihan.nominal || 0) -
                                (tagihan.bayar || 0) -
                                (tagihan.potongan || 0),
                            ),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabel Riwayat Pembayaran Menggunakan ListTable */}
                <div className="w-full bg-white rounded-md overflow-hidden">
                  <ListTable<RiwayatPembayaranData>
                    data={paymentList}
                    columns={pembayaranColumns}
                    rowKey={(item) => item.kodePembayaran || item.no || ""}
                    className="w-full text-xs bg-white"
                    headerClassName="text-xs font-semibold"
                    showFooter={false}
                    emptyMessage="Data kosong"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
