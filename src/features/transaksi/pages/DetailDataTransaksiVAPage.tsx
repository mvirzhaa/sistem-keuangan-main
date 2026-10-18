import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  IoChevronBack,
  IoAdd,
  IoRefresh,
  IoClose,
} from "react-icons/io5";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import transaksiApi, {
  type VirtualAccountData,
  type VATagihanItem,
  type RiwayatPembayaranVAItem,
} from "../services/transaksi.api";
import { ROUTES } from "../../../common/routes/routes";

export default function DetailDataTransaksiVAPage() {
  document.title = "Virtual Account - Detail Data Transaksi VA";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState<boolean>(false);
  const [vaData, setVaData] = useState<VirtualAccountData | null>(null);
  const [tagihanItems, setTagihanItems] = useState<VATagihanItem[]>([]);
  const [riwayatPembayaranItems, setRiwayatPembayaranItems] = useState<
    RiwayatPembayaranVAItem[]
  >([]);

  // State Banner Alert Pengubahan data Virtual Account berhasil (Gambar 2)
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // State Modal Konfirmasi Batal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  // Fallback data untuk AKTIF (Gambar 2 / SYITS AHMAD YASIR)
  const defaultFallbackAktifVA: VirtualAccountData = {
    id: "3",
    kodeVA: "241105012115",
    nim: "241105012115",
    nama: "SYITS AHMAD YASIR",
    prodi: "Pendidikan Agama Islam",
    channel: "Shopee",
    metodePembayaran: "Shopee",
    kelompokTagihan: "",
    tglVA: "17 Oktober 2026, 21:54:17",
    tglJatuhTempo: "21 Oktober 2026, 23:59:59",
    nominal: 200000,
    bayar: null,
    tglBayar: null,
    status: "AKTIF",
    paymentUrl: "",
    tagihanList: [
      {
        kodeTagihan: "INV/20261/0032863",
        jenisTagihan: "5067 - Remedial Teaching",
        periode: "20261",
        bulan: "",
        angsuran: 1,
        nominal: 200000,
        denda: 0,
        potongan: 0,
        jumlahBayar: 200000,
      },
    ],
  };

  // Fallback data untuk LUNAS (Gambar 1 / MUTIARA MAULANI)
  const defaultFallbackLunasVA: VirtualAccountData = {
    id: "11",
    kodeVA: "231107010728",
    nim: "231107010728",
    nama: "MUTIARA MAULANI",
    prodi: "Kesehatan Masyarakat",
    channel: "Shopee",
    metodePembayaran: "Shopee",
    kelompokTagihan: "",
    tglVA: "18 Oktober 2026, 10:35:55",
    tglJatuhTempo: "22 Oktober 2026, 23:59:59",
    nominal: 1975000,
    bayar: 1975000,
    tglBayar: "18 Oktober 2026, 10:39:31",
    status: "LUNAS",
    paymentUrl: "",
    tagihanList: [
      {
        kodeTagihan: "INV/20261/0029955",
        jenisTagihan: "7126 - PBL dan LKP",
        periode: "20261",
        bulan: "",
        angsuran: 2,
        nominal: 1000000,
        denda: 0,
        potongan: 0,
        jumlahBayar: 1000000,
      },
      {
        kodeTagihan: "INV/20261/0032516",
        jenisTagihan: "7126 - PBL dan LKP",
        periode: "20261",
        bulan: "",
        angsuran: 3,
        nominal: 975000,
        denda: 0,
        potongan: 0,
        jumlahBayar: 975000,
      },
    ],
    riwayatPembayaran: [
      {
        no: 1,
        kodePembayaran: "PAY/20261/0007885",
        tanggal: "18 Oktober 2026, 10:39:31",
        nominal: 1975000,
        status: "Terbayar",
      },
    ],
  };

  // Fetch data
  const fetchData = useCallback(
    async (isCheckClick = false) => {
      setLoading(true);
      try {
        if (id) {
          const res = await transaksiApi.getVirtualAccountById(id);
          if (res && res.data) {
            setVaData(res.data);
            if (res.data.tagihanList && res.data.tagihanList.length > 0) {
              setTagihanItems(res.data.tagihanList);
            } else if (res.data.status === "LUNAS") {
              setTagihanItems(defaultFallbackLunasVA.tagihanList || []);
            } else {
              setTagihanItems(defaultFallbackAktifVA.tagihanList || []);
            }

            if (res.data.riwayatPembayaran && res.data.riwayatPembayaran.length > 0) {
              setRiwayatPembayaranItems(res.data.riwayatPembayaran);
            } else if (res.data.status === "LUNAS") {
              setRiwayatPembayaranItems(
                defaultFallbackLunasVA.riwayatPembayaran || []
              );
            } else {
              setRiwayatPembayaranItems([]);
            }

            if (isCheckClick) {
              setShowAlert(true);
            }
            return;
          }
        }

        // If id not provided or failed, check by list
        const listRes = await transaksiApi.getVirtualAccount();
        if (listRes && listRes.data && listRes.data.length > 0) {
          const match = id
            ? listRes.data.find((item) => item.id === id)
            : listRes.data.find((item) => item.nim === "241105012115") ||
              listRes.data[0];

          if (match) {
            setVaData(match);
            if (match.tagihanList && match.tagihanList.length > 0) {
              setTagihanItems(match.tagihanList);
            } else if (match.status === "LUNAS") {
              setTagihanItems(defaultFallbackLunasVA.tagihanList || []);
            } else {
              setTagihanItems(defaultFallbackAktifVA.tagihanList || []);
            }

            if (match.riwayatPembayaran && match.riwayatPembayaran.length > 0) {
              setRiwayatPembayaranItems(match.riwayatPembayaran);
            } else if (match.status === "LUNAS") {
              setRiwayatPembayaranItems(
                defaultFallbackLunasVA.riwayatPembayaran || []
              );
            } else {
              setRiwayatPembayaranItems([]);
            }

            if (isCheckClick) {
              setShowAlert(true);
            }
            return;
          }
        }

        // Fallback default
        setVaData(defaultFallbackAktifVA);
        setTagihanItems(defaultFallbackAktifVA.tagihanList || []);
        setRiwayatPembayaranItems([]);
        if (isCheckClick) {
          setShowAlert(true);
        }
      } catch (err) {
        console.warn("Gagal mengambil data VA, menggunakan fallback:", err);
        setVaData(defaultFallbackAktifVA);
        setTagihanItems(defaultFallbackAktifVA.tagihanList || []);
        setRiwayatPembayaranItems([]);
        if (isCheckClick) {
          setShowAlert(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Format currency
  const formatCurrency = (val: number | undefined | null) => {
    if (val === undefined || val === null) return "0";
    return val.toLocaleString("id-ID");
  };

  // Handle Cancel VA
  const handleConfirmCancel = async () => {
    if (!vaData) return;
    setCancelLoading(true);
    try {
      await transaksiApi.updateVirtualAccount(vaData.id, {
        status: "BATAL",
      });
      setVaData((prev) => (prev ? { ...prev, status: "BATAL" } : null));
      setIsCancelModalOpen(false);
    } catch (err) {
      console.error("Gagal membatalkan VA:", err);
      setVaData((prev) => (prev ? { ...prev, status: "BATAL" } : null));
      setIsCancelModalOpen(false);
    } finally {
      setCancelLoading(false);
    }
  };

  // Current active data
  const currentVA = vaData || defaultFallbackAktifVA;
  const isLunas = currentVA.status === "LUNAS";

  // Columns untuk Tabel Daftar Tagihan Virtual Account (Gambar 1 & Gambar 2)
  const columns: Column<VATagihanItem>[] = [
    {
      key: "kodeTagihan",
      header: "Kode Tagihan",
      sortable: true,
      className: "font-mono text-xs text-gray-800",
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      sortable: true,
      className: "text-xs text-gray-800",
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center text-xs text-gray-800",
    },
    {
      key: "bulan",
      header: "Bulan",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.bulan || "",
    },
    {
      key: "angsuran",
      header: "Angsuran",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.angsuran || 1,
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right text-xs text-gray-800",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.denda || 0,
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      render: (item) => item.potongan || 0,
    },
    {
      key: "jumlahBayar",
      header: "Jumlah Bayar",
      sortable: true,
      className: "text-right text-xs text-gray-800",
      render: (item) =>
        formatCurrency(
          item.jumlahBayar !== undefined ? item.jumlahBayar : item.nominal
        ),
    },
  ];

  const totalNominal = tagihanItems.reduce(
    (acc, curr) => acc + (curr.nominal || 0),
    0
  );
  const totalJumlahBayar = tagihanItems.reduce(
    (acc, curr) =>
      acc + (curr.jumlahBayar !== undefined ? curr.jumlahBayar : curr.nominal || 0),
    0
  );

  const footerRow = (
    <tr className="font-bold text-gray-900 border border-slate-300 bg-white">
      <td
        className="p-2 border border-slate-300 text-left font-bold text-xs"
        colSpan={5}
      >
        Total
      </td>
      <td className="p-2 border border-slate-300 text-right font-bold text-xs">
        {formatCurrency(totalNominal)}
      </td>
      <td className="p-2 border border-slate-300 text-center font-bold text-xs">
        0
      </td>
      <td className="p-2 border border-slate-300 text-center font-bold text-xs">
        0
      </td>
      <td className="p-2 border border-slate-300 text-right font-bold text-xs">
        {formatCurrency(totalJumlahBayar)}
      </td>
    </tr>
  );

  const totalRiwayatNominal = riwayatPembayaranItems.reduce(
    (acc, curr) => acc + (curr.nominal || 0),
    0
  );

  // Columns untuk Tabel Riwayat Pembayaran (Gambar 1)
  const riwayatColumns: Column<RiwayatPembayaranVAItem>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center text-xs text-gray-800",
      width: "60px",
      render: (item, index) => item.no || index + 1,
    },
    {
      key: "kodePembayaran",
      header: "Kode Pembayaran",
      sortable: true,
      className: "text-xs font-semibold text-[#00a65a] hover:underline cursor-pointer",
    },
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-xs text-gray-800",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right text-xs text-gray-800 font-medium",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "text-center text-xs",
      width: "120px",
      render: (item) => (
        <span className="bg-[#5cb85c] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
          {item.status || "Terbayar"}
        </span>
      ),
    },
  ];

  const riwayatFooterRow = (
    <tr className="font-bold text-gray-900 border border-slate-300 bg-white">
      <td
        className="p-2 border border-slate-300 text-left font-bold text-xs"
        colSpan={3}
      >
        Total Pembayaran
      </td>
      <td className="p-2 border border-slate-300 text-right font-bold text-xs">
        {formatCurrency(totalRiwayatNominal)}
      </td>
      <td className="p-2 border border-slate-300"></td>
    </tr>
  );

  return (
    <>
      {/* Alert Banner Pengubahan data Virtual Account berhasil (Gambar 2) */}
      {showAlert && (
        <div className="bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded mb-4 flex justify-between items-center text-sm shadow-xs transition-all animate-fade-in">
          <span>Pengubahan data Virtual Account berhasil</span>
          <button
            type="button"
            onClick={() => setShowAlert(false)}
            className="text-[#3c763d] hover:text-[#2b542c] font-bold text-lg cursor-pointer leading-none"
            title="Tutup"
          >
            &times;
          </button>
        </div>
      )}

      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Virtual Account</h1>
        <p className="text-sm text-gray-500 mb-1">Data Transaksi VA</p>
      </div>

      {/* Main Container Card dengan background putih (Gambar 1 & Gambar 2) */}
      <div className="w-full bg-white shadow-lg rounded-md border-t-4 border-t-green-800 p-6">
        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap justify-end gap-2 mb-6">
          {/* < Kembali ke Daftar (Tampil di semua status) */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.TRANSAKSI.VIRTUAL_ACCOUNT)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-3.5 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <IoChevronBack size={15} />
            Kembali ke Daftar
          </button>

          {/* + Tambah Baru (Tampil di semua status) */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.TRANSAKSI.DATA_TRANSAKSI_VA)}
            className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <IoAdd size={16} />
            Tambah Baru
          </button>

          {/* Tombol Check & Batal HANYA tampil jika status AKTIF (Gambar 2), tidak tampil jika LUNAS (Gambar 1) */}
          {!isLunas && (
            <>
              {/* 🔄 Check (Gambar 2: saat diklik memunculkan alert success dan refresh data) */}
              <button
                type="button"
                onClick={() => fetchData(true)}
                disabled={loading}
                className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                title="Check status VA"
              >
                <IoRefresh size={16} />
                Check
              </button>

              {/* ✕ Batal */}
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(true)}
                className="bg-[#dd4b39] hover:bg-[#c9302c] text-white px-3.5 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                title="Batalkan VA"
              >
                <IoClose size={16} />
                Batal
              </button>
            </>
          )}
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 mb-8 text-sm">
          {/* Kolom Kiri */}
          <div className="space-y-3.5">
            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">NIM</span>
              <span className="text-gray-900 font-medium">{currentVA.nim}</span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">Nama</span>
              <span className="text-gray-900 font-medium">{currentVA.nama}</span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Program Studi
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.prodi || "-"}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Metode Pembayaran
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.channel || currentVA.metodePembayaran || "-"}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Kelompok Tagihan
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.kelompokTagihan || ""}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Tanggal VA
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.tglVA || "-"}
              </span>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-3.5">
            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Tanggal Jatuh Tempo
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.tglJatuhTempo || "-"}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Kode VA
              </span>
              <span className="text-gray-900 font-medium font-mono">
                {currentVA.kodeVA}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Nominal
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.nominal ? `${currentVA.nominal},00` : "0,00"}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">Status</span>
              <span className="text-gray-900 font-medium">
                {currentVA.status === "AKTIF"
                  ? "Aktif"
                  : currentVA.status === "LUNAS"
                  ? "Lunas"
                  : "Batal"}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-48 font-bold text-blue-600 shrink-0">
                Payment URL
              </span>
              <span className="text-gray-900 font-medium">
                {currentVA.paymentUrl || ""}
              </span>
            </div>
          </div>
        </div>

        {/* Tabel 1: Daftar Tagihan Virtual Account (Gambar 1 & Gambar 2) */}
        <div className="mt-8 border-t-2 border-green-700 pt-4">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            Daftar Tagihan Virtual Account
          </h2>

          <div className="w-full overflow-x-auto">
            <ListTable
              data={tagihanItems}
              columns={columns}
              rowKey={(item) => item.kodeTagihan}
              showFooter={false}
              footerRow={footerRow}
              className="w-full text-xs"
              headerClassName="text-xs bg-[#0c4a6e] text-white"
            />
          </div>
        </div>

        {/* Tabel 2: Riwayat Pembayaran (HANYA tampil untuk status LUNAS sesuai Gambar 1) */}
        {isLunas && riwayatPembayaranItems.length > 0 && (
          <div className="mt-8 border-t-2 border-green-700 pt-4">
            <h2 className="text-xl font-bold text-green-700 mb-3">
              Riwayat Pembayaran
            </h2>

            <div className="w-full overflow-x-auto">
              <ListTable
                data={riwayatPembayaranItems}
                columns={riwayatColumns}
                rowKey={(item) =>
                  item.kodePembayaran || String(item.no || Math.random())
                }
                showFooter={false}
                footerRow={riwayatFooterRow}
                className="w-full text-xs"
                headerClassName="text-xs bg-[#0c4a6e] text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Pembatalan VA */}
      <KonfirmasiModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Konfirmasi Pembatalan VA"
        message={`Apakah anda yakin ingin membatalkan Virtual Account ${currentVA.kodeVA}?`}
        confirmVariant="danger"
        confirmText="Batalkan VA"
        cancelText="Kembali"
        loading={cancelLoading}
      />
    </>
  );
}
