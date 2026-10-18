import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  IoCheckmark,
  IoClose,
  IoPrintOutline,
  IoList,
} from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { BsCreditCard2Front } from "react-icons/bs";
import { ROUTES } from "../../../common/routes/routes";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import transaksiApi, {
  type PembayaranDetailData,
  type TagihanDibayarItem,
  type DepositItem,
} from "../services/transaksi.api";

const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

export default function DetailPembayaranPage() {
  document.title = "Transaksi - Detail Pembayaran";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");

  const [pembayaran, setPembayaran] = useState<PembayaranDetailData | null>(null);
  const [pembayaranList, setPembayaranList] = useState<PembayaranDetailData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter State di baris atas
  const [penerima, setPenerima] = useState<string>("Mahasiswa");
  const [searchInput, setSearchInput] = useState<string>("");

  // Load detail pembayaran dari API JSON
  const fetchPembayaranData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getPembayaran();
      if (res && res.data && res.data.length > 0) {
        setPembayaranList(res.data);

        let selected = res.data[0];
        if (paramId) {
          const found = res.data.find(
            (p) =>
              String(p.id) === String(paramId) ||
              p.kodePembayaran === paramId ||
              p.nim === paramId
          );
          if (found) {
            selected = found;
          }
        }
        setPembayaran(selected);
        setSearchInput(`${selected.nim} - ${selected.nama}`);
      } else {
        setPembayaran(null);
      }
    } catch (err) {
      console.error("Gagal memuat data pembayaran:", err);
      setPembayaran(null);
    } finally {
      setLoading(false);
    }
  }, [paramId]);

  useEffect(() => {
    fetchPembayaranData();
  }, [fetchPembayaranData]);

  // Handle tombol Inquiry / Search
  const handleInquiry = () => {
    if (!searchInput.trim()) return;
    const query = searchInput.trim().toLowerCase();
    const found = pembayaranList.find(
      (p) =>
        p.nim?.toLowerCase().includes(query) ||
        p.nama?.toLowerCase().includes(query) ||
        p.kodePembayaran?.toLowerCase().includes(query)
    );

    if (found) {
      setPembayaran(found);
      setSearchParams({ id: found.id });
      setSearchInput(`${found.nim} - ${found.nama}`);
    } else {
      alert("Data pembayaran tidak ditemukan.");
    }
  };

  // Helper format currency
  const formatCurrency = (val?: number | null) => {
    if (val === null || val === undefined) return "0";
    return val.toLocaleString("id-ID");
  };

  const formatCurrencyDecimal = (val?: number | null) => {
    if (val === null || val === undefined) return "0,00";
    return `${val.toLocaleString("id-ID")},00`;
  };



  // Kolom ListTable untuk Tagihan yang Dibayar
  const tagihanColumns: Column<TagihanDibayarItem>[] = useMemo(
    () => [
      {
        key: "no",
        header: "No.",
        className: "text-center text-sm py-2.5",
        width: "50px",
        render: (item, idx) => item.no ?? idx + 1,
      },
      {
        key: "kodeTagihan",
        header: "Kode Tagihan",
        className: "text-center font-mono text-sm py-2.5",
      },
      {
        key: "jenisTagihan",
        header: "Jenis Tagihan",
        className: "text-left text-sm py-2.5",
      },
      {
        key: "cicilan",
        header: "Cicilan Ke-",
        className: "text-center text-sm py-2.5",
        render: (item) => item.cicilan ?? 1,
      },
      {
        key: "bulan",
        header: "Bulan",
        className: "text-center text-sm py-2.5",
        render: (item) => item.bulan ?? "-",
      },
      {
        key: "nominal",
        header: "Nominal",
        className: "text-right text-sm py-2.5",
        render: (item) => formatCurrency(item.nominal),
      },
      {
        key: "denda",
        header: "Denda",
        className: "text-right text-sm py-2.5",
        render: (item) => formatCurrency(item.denda),
      },
      {
        key: "potongan",
        header: "Potongan",
        className: "text-right text-sm py-2.5",
        render: (item) => formatCurrency(item.potongan),
      },
      {
        key: "bayar",
        header: "Bayar",
        className: "text-right font-medium text-sm py-2.5",
        render: (item) => formatCurrency(item.bayar),
      },
    ],
    []
  );

  // Kolom ListTable untuk Deposit
  const depositColumns: Column<DepositItem>[] = useMemo(
    () => [
      {
        key: "no",
        header: "No.",
        className: "text-center text-sm py-2.5",
        width: "50px",
        render: (item, idx) => item.no ?? idx + 1,
      },
      {
        key: "kodeDeposit",
        header: "Kode Deposit",
        className: "text-center font-mono text-sm py-2.5",
      },
      {
        key: "posisiDeposit",
        header: "Posisi Deposit",
        className: "text-center text-sm py-2.5",
      },
      {
        key: "nominal",
        header: "Nominal",
        className: "text-right font-medium text-sm py-2.5",
        render: (item) => formatCurrency(item.nominal),
      },
    ],
    []
  );



  const totalTagihanBayar = (pembayaran?.tagihanList || []).reduce(
    (sum, item) => sum + (item.bayar || 0),
    0
  );

  const totalDeposit = (pembayaran?.depositList || []).reduce(
    (sum, item) => sum + (item.nominal || 0),
    0
  );

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Pembayaran</p>
      </div>

      {/* Main Container Card */}
      <div className="w-full bg-white shadow-md rounded-md border-t-[#10ac84] border-t-4 p-5">
        {/* Top Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
          <Dropdown
            options={penerimaOptions}
            value={penerima}
            defaultValue={penerima}
            onChange={(val) => setPenerima(val)}
            className="w-full sm:w-48 text-xs sm:text-sm"
          />

          <div className="flex-1 flex items-center space-x-1.5">
            <TextField
              placeholder="Cari NIM / Nama / Kode Pembayaran"
              value={searchInput}
              onChange={(val) => setSearchInput(val)}
              onEnter={handleInquiry}
              className="w-full sm:max-w-md text-xs"
            />

            <button
              type="button"
              onClick={handleInquiry}
              className="bg-[#1e5bb8] hover:bg-[#184a96] text-white px-3.5 py-2 rounded flex items-center space-x-1 text-xs font-medium cursor-pointer shadow-xs transition-colors shrink-0"
              title="Inquiry"
            >
              <IoMdSearch className="text-base" />
              <span>Inquiry</span>
            </button>

            {pembayaran && (
              <button
                type="button"
                onClick={() => {
                  navigate(
                    `${ROUTES.TRANSAKSI.KWITANSI_PEMBAYARAN}?id=${pembayaran.id}`
                  );
                }}
                className="bg-[#E08E0B] hover:bg-[#c97f0a] text-white p-2 rounded flex items-center justify-center text-base cursor-pointer shadow-xs transition-colors shrink-0"
                title="Cetak Kwitansi"
              >
                <IoPrintOutline />
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate(ROUTES.TRANSAKSI.PEMBAYARAN)}
              className="bg-[#00acc1] hover:bg-[#0097a7] text-white p-2 rounded flex items-center justify-center text-base cursor-pointer shadow-xs transition-colors shrink-0"
              title="Kembali ke Daftar Pembayaran"
            >
              <IoList />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 text-gray-500 text-sm">
            Memuat data pembayaran...
          </div>
        ) : !pembayaran ? (
          <div className="flex justify-center items-center py-12 text-gray-500 text-sm">
            Data pembayaran tidak ditemukan.
          </div>
        ) : (
          <>
            {/* Section 1: PEMBAYARAN */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wide pb-2 border-b border-gray-700 mb-3">
                <BsCreditCard2Front className="text-base" />
                <span>PEMBAYARAN</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
                {/* Left Column - Label Warna Biru */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Kode Pembayaran
                    </span>
                    <span className="text-gray-900 font-medium">
                      {pembayaran.kodePembayaran}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Tanggal Pembayaran
                    </span>
                    <span className="text-gray-900">{pembayaran.tanggal}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Periode
                    </span>
                    <span className="text-gray-900">
                      {pembayaran.periodePembayaran || pembayaran.periode}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      NIM
                    </span>
                    <span className="text-gray-900 font-medium">
                      {pembayaran.nim}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Nama
                    </span>
                    <span className="text-gray-900 font-semibold uppercase">
                      {pembayaran.nama}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Metode Pembayaran
                    </span>
                    <span className="text-gray-900">
                      {pembayaran.metodePembayaran}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Channel
                    </span>
                    <span className="text-gray-900">{pembayaran.channel}</span>
                  </div>
                </div>

                {/* Right Column - Label Warna Biru */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Online?
                    </span>
                    <span className="flex items-center">
                      {pembayaran.online ? (
                        <IoCheckmark className="text-green-600 font-bold text-base" />
                      ) : (
                        <IoClose className="text-red-500 font-bold text-base" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Nominal
                    </span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrencyDecimal(pembayaran.nominal)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Biaya Admin
                    </span>
                    <span className="text-gray-900">
                      {formatCurrencyDecimal(pembayaran.biayaAdmin || 4000)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Batal?
                    </span>
                    <span className="flex items-center">
                      {pembayaran.batal ? (
                        <IoCheckmark className="text-green-600 font-bold text-base" />
                      ) : (
                        <IoClose className="text-red-500 font-bold text-base" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Eksekutor
                    </span>
                    <span className="text-gray-900">
                      {pembayaran.eksekutor || "-"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Dokumen Pendukung
                    </span>
                    <span className="text-gray-900">
                      {pembayaran.dokumenPendukung || "-"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-48 font-semibold text-blue-600 shrink-0">
                      Keterangan
                    </span>
                    <span className="text-gray-900">
                      {pembayaran.keterangan || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>



            {/* Section 3: TAGIHAN YANG DIBAYAR (Menggunakan ListTable) */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wide pb-2 border-b border-gray-700 mb-3">
                <BsCreditCard2Front className="text-base" />
                <span>TAGIHAN YANG DIBAYAR</span>
              </div>

              <div className="w-full bg-white rounded-md overflow-hidden border border-slate-300">
                <ListTable<TagihanDibayarItem>
                  data={pembayaran.tagihanList || []}
                  columns={tagihanColumns}
                  rowKey={(item) =>
                    item.kodeTagihan || String(item.no || Math.random())
                  }
                  selectable={false}
                  showFooter={false}
                  className="w-full text-sm"
                  headerClassName="text-sm font-semibold"
                  emptyMessage="Tidak ada data tagihan yang dibayar"
                />
                <div className="flex justify-end p-3 font-bold text-gray-900 border-t border-slate-300 bg-white text-sm pr-4">
                  <span>{formatCurrency(totalTagihanBayar)}</span>
                </div>
              </div>
            </div>

            {/* Section 4: DEPOSIT */}
            {pembayaran.depositList && pembayaran.depositList.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wide pb-2 border-b border-gray-700 mb-3">
                  <BsCreditCard2Front className="text-base" />
                  <span>Deposit</span>
                </div>

                <div className="w-full bg-white rounded-md overflow-hidden border border-slate-300">
                  <ListTable<DepositItem>
                    data={pembayaran.depositList}
                    columns={depositColumns}
                    rowKey={(item) =>
                      item.kodeDeposit || String(item.no || Math.random())
                    }
                    selectable={false}
                    showFooter={false}
                    className="w-full text-sm"
                    headerClassName="text-sm font-semibold"
                    emptyMessage="Tidak ada data deposit"
                  />
                  <div className="flex justify-end p-3 font-bold text-gray-900 border-t border-slate-300 bg-white text-sm pr-4">
                    <span>{formatCurrency(totalDeposit)}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
