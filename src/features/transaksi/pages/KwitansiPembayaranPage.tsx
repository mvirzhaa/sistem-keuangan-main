import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoPrintOutline, IoArrowBack, IoCheckmark } from "react-icons/io5";
import { BsCreditCard2Front } from "react-icons/bs";
import logoUika from "../../../assets/logo-uika.png";
import transaksiApi, {
  type PembayaranDetailData,
  type TagihanDibayarItem,
  type DepositItem,
} from "../services/transaksi.api";

export default function KwitansiPembayaranPage() {
  document.title = "Kwitansi Pembayaran";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("id");

  const [pembayaran, setPembayaran] = useState<PembayaranDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchKwitansi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getPembayaran();
      if (res && res.data && res.data.length > 0) {
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
      } else {
        setPembayaran(null);
      }
    } catch (err) {
      console.error("Gagal memuat data kwitansi:", err);
      setPembayaran(null);
    } finally {
      setLoading(false);
    }
  }, [paramId]);

  useEffect(() => {
    fetchKwitansi();
  }, [fetchKwitansi]);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrencyDecimal = (val?: number | null) => {
    if (val === null || val === undefined) return "0,00";
    return `${val.toLocaleString("id-ID")},00`;
  };

  const tagihanList: TagihanDibayarItem[] = pembayaran?.tagihanList || [];
  const depositList: DepositItem[] = pembayaran?.depositList || [];

  const totalBayar = tagihanList.reduce(
    (sum, item) => sum + (item.bayar || 0),
    0
  );

  const totalDeposit = depositList.reduce(
    (sum, item) => sum + (item.nominal || 0),
    0
  );

  if (loading) {
    return (
      <div className="w-full py-16 text-center text-gray-500 text-sm">
        Memuat kwitansi pembayaran...
      </div>
    );
  }

  if (!pembayaran) {
    return (
      <div className="w-full py-16 text-center text-gray-500 text-sm">
        Data kwitansi pembayaran tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Action Bar (hidden when printing) */}
      <div className="print:hidden flex items-center justify-between bg-white px-6 py-4 rounded-md shadow-xs border border-gray-200 mb-6">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1.5 text-sm font-medium transition-colors cursor-pointer"
          >
            <IoArrowBack className="text-lg" />
            <span>Kembali</span>
          </button>
          <span className="text-gray-300">|</span>
          <h1 className="text-lg text-gray-700 font-medium">
            Kwitansi Pembayaran
          </h1>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="bg-[#46b8da] hover:bg-[#31b0d5] text-white px-5 py-2 rounded flex items-center space-x-2 text-xs font-semibold cursor-pointer shadow-xs transition-colors"
        >
          <IoPrintOutline className="text-base" />
          <span>Cetak</span>
        </button>
      </div>

      {/* Kwitansi Sheet */}
      <div className="w-full max-w-5xl mx-auto bg-white shadow-md p-8 sm:p-12 border border-gray-200 rounded-sm print:shadow-none print:border-none print:p-0 print:m-0 print:w-full print:max-w-none text-black">
        {/* Kop Surat UIKA */}
        <div className="flex items-center justify-between pb-3">
          <div className="w-24 shrink-0 flex justify-center">
            <img
              src={logoUika}
              alt="Logo UIKA"
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-black">
              UNIVERSITAS IBN KHALDUN BOGOR
            </h1>
            <p className="text-xs text-gray-800 mt-0.5">
              Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor
            </p>
            <p className="text-xs text-gray-800">
              Website :uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon
              :0251-8356884
            </p>
          </div>
          <div className="w-24 shrink-0"></div>
        </div>

        {/* Double Border Line */}
        <div className="border-b-2 border-double border-black my-2"></div>

        {/* Title */}
        <h2 className="text-center font-bold text-sm tracking-wide uppercase my-5 text-black">
          KWITANSI PEMBAYARAN
        </h2>

        {/* Info Grid (2 Columns) - Selalu 2 kolom seperti template Gambar 3 */}
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-1.5 text-xs sm:text-sm print:text-xs text-black mb-6">
          {/* Kolom Kiri */}
          <div className="space-y-1">
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Kode Pembayaran</span>
              <span className="mr-2">:</span>
              <span className="font-semibold">{pembayaran.kodePembayaran}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Tanggal Pembayaran</span>
              <span className="mr-2">:</span>
              <span>{pembayaran.tanggal}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">NIM</span>
              <span className="mr-2">:</span>
              <span>{pembayaran.nim}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Nama</span>
              <span className="mr-2">:</span>
              <span className="font-semibold uppercase">{pembayaran.nama}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Program Studi</span>
              <span className="mr-2">:</span>
              <span>
                {pembayaran.programStudi || "S2 - Hukum Bisnis (S2)"}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Sistem Perkuliahan</span>
              <span className="mr-2">:</span>
              <span>{pembayaran.sistemKuliah || "Reguler"}</span>
            </div>
          </div>

          {/* Kolom Kanan (Posisi di kanan seperti template) */}
          <div className="space-y-1">
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Periode Pembayaran</span>
              <span className="mr-2">:</span>
              <span>
                {pembayaran.periodePembayaran || pembayaran.periode}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Metode Pembayaran</span>
              <span className="mr-2">:</span>
              <span>{pembayaran.metodePembayaran}</span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Channel</span>
              <span className="mr-2">:</span>
              <span>{pembayaran.channel}</span>
            </div>
            <div className="flex items-center">
              <span className="w-28 sm:w-36 shrink-0">Online?</span>
              <span className="mr-2">:</span>
              <span>
                {pembayaran.online ? (
                  <IoCheckmark className="text-black font-bold text-sm inline" />
                ) : (
                  <span className="font-bold text-xs">x</span>
                )}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 sm:w-36 shrink-0">Nominal</span>
              <span className="mr-2">:</span>
              <span>{formatCurrencyDecimal(pembayaran.nominal)}</span>
            </div>
          </div>
        </div>

        {/* Table Tagihan */}
        <div className="overflow-x-auto print:overflow-visible mb-4">
          <table className="w-full text-xs sm:text-sm print:text-[11px] border-collapse border border-black print:w-full">
            <thead>
              <tr className="border-b border-black text-center font-semibold bg-gray-50">
                <th className="border border-black py-2 px-1 text-center w-8">No.</th>
                <th className="border border-black py-2 px-2 text-center whitespace-nowrap">Kode Tagihan</th>
                <th className="border border-black py-2 px-3 text-center whitespace-nowrap">
                  Jenis Tagihan
                </th>
                <th className="border border-black py-2 px-2 text-center whitespace-nowrap">
                  Cicilan Ke-
                </th>
                <th className="border border-black py-2 px-2 text-center whitespace-nowrap">
                  Bulan
                </th>
                <th className="border border-black py-2 px-3 text-center whitespace-nowrap">
                  Nominal
                </th>
                <th className="border border-black py-2 px-2 text-center whitespace-nowrap">
                  Denda
                </th>
                <th className="border border-black py-2 px-2 text-center whitespace-nowrap">
                  Potongan
                </th>
                <th className="border border-black py-2 px-3 text-center whitespace-nowrap">
                  Bayar
                </th>
              </tr>
            </thead>
            <tbody>
              {tagihanList.map((tagihan, idx) => (
                <tr key={idx} className="text-black">
                  <td className="border border-black py-2 px-1 text-center">
                    {tagihan.no || idx + 1}
                  </td>
                  <td className="border border-black py-2 px-2 text-center font-mono whitespace-nowrap">
                    {tagihan.kodeTagihan}
                  </td>
                  <td className="border border-black py-2 px-3 text-left whitespace-nowrap">
                    {tagihan.jenisTagihan}
                  </td>
                  <td className="border border-black py-2 px-2 text-center whitespace-nowrap">
                    {tagihan.cicilan}
                  </td>
                  <td className="border border-black py-2 px-2 text-center whitespace-nowrap">
                    {tagihan.bulan}
                  </td>
                  <td className="border border-black py-2 px-3 text-right whitespace-nowrap">
                    {formatCurrencyDecimal(tagihan.nominal)}
                  </td>
                  <td className="border border-black py-2 px-2 text-right whitespace-nowrap">
                    {formatCurrencyDecimal(tagihan.denda)}
                  </td>
                  <td className="border border-black py-2 px-2 text-right whitespace-nowrap">
                    {formatCurrencyDecimal(tagihan.potongan)}
                  </td>
                  <td className="border border-black py-2 px-3 text-right whitespace-nowrap">
                    {formatCurrencyDecimal(tagihan.bayar)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-black font-bold">
                <td
                  colSpan={8}
                  className="border border-black py-2 px-3 text-center tracking-widest text-black"
                >
                  TOTAL
                </td>
                <td className="border border-black py-2 px-3 text-right text-black whitespace-nowrap">
                  {formatCurrencyDecimal(totalBayar)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Deposit Masuk Section (sesuai Gambar 2 & 3) */}
        {depositList.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-black my-3">
              <BsCreditCard2Front className="text-sm" />
              <span>Deposit Masuk</span>
            </div>

            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full text-xs sm:text-sm print:text-[11px] border-collapse border border-black print:w-full">
                <thead>
                  <tr className="border-b border-black text-center font-semibold bg-gray-50">
                    <th className="border border-black py-2 px-2 w-8 text-center">No.</th>
                    <th className="border border-black py-2 px-4 text-center whitespace-nowrap">
                      Kode Deposit
                    </th>
                    <th className="border border-black py-2 px-4 text-center whitespace-nowrap">
                      Posisi Deposit
                    </th>
                    <th className="border border-black py-2 px-4 text-center whitespace-nowrap">
                      Nominal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositList.map((dep, idx) => (
                    <tr key={idx} className="text-black">
                      <td className="border border-black py-2 px-2 text-center">
                        {dep.no || idx + 1}
                      </td>
                      <td className="border border-black py-2 px-4 text-center font-mono whitespace-nowrap">
                        {dep.kodeDeposit}
                      </td>
                      <td className="border border-black py-2 px-4 text-center whitespace-nowrap">
                        {dep.posisiDeposit}
                      </td>
                      <td className="border border-black py-2 px-4 text-right whitespace-nowrap">
                        {formatCurrencyDecimal(dep.nominal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-black font-bold">
                    <td
                      colSpan={3}
                      className="border border-black py-2 px-3 text-center tracking-widest text-black"
                    >
                      TOTAL
                    </td>
                    <td className="border border-black py-2 px-4 text-right text-black whitespace-nowrap">
                      {formatCurrencyDecimal(totalDeposit)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Signature Area */}
        <div className="flex justify-end mt-10 text-xs text-black">
          <div className="text-center w-64 space-y-1">
            <p>Bogor, 17 Oktober 2026</p>
            <div className="h-18"></div>
            <p className="font-bold underline uppercase tracking-wide">
              RIANDI SIDDIK HARAHAP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
