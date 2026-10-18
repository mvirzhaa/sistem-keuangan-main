import React, { useState, useEffect, useCallback } from "react";
import {
  IoMdArrowBack,
  IoMdSave,
  IoMdSearch,
  IoMdAdd,
} from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from "../../../components/inputs/TextField";
import DetailDepositForm, {
  type DetailDepositFormData,
} from "../components/DetailDepositForm";
import { ROUTES } from "../../../common/routes/routes";
import transaksiApi, { type DepositData } from "../services/transaksi.api";
import { ValidationModal } from "../../laporan/tagihan/components/ValidationModal";

export default function DetailDepositPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");

  // State
  const [deposit, setDeposit] = useState<DepositData | null>(null);
  const [allDeposits, setAllDeposits] = useState<DepositData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isValidationModalOpen, setIsValidationModalOpen] = useState<boolean>(false);

  // Load deposit data if paramId is present
  const fetchDepositDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getDeposit();
      if (res && res.data) {
        setAllDeposits(res.data);
        if (paramId) {
          const found = res.data.find(
            (d) =>
              String(d.id) === String(paramId) ||
              d.kodeDeposit === paramId ||
              d.nim === paramId
          );
          if (found) {
            setDeposit(found);
            setSearchQuery(found.kodeDeposit);
          } else {
            setDeposit(null);
          }
        } else {
          setDeposit(null);
        }
      }
    } catch (err) {
      console.error("Gagal memuat detail deposit:", err);
      setDeposit(null);
    } finally {
      setLoading(false);
    }
  }, [paramId]);

  useEffect(() => {
    fetchDepositDetail();
  }, [fetchDepositDetail]);

  // Set page title & subtitle:
  // When viewing existing deposit data (from table action or search), it is "Detail Deposit Keluar"
  // When in input form mode, it is "Detail Deposit Masuk"
  const isDetailView = Boolean(deposit && paramId);
  const subTitle = isDetailView ? "Detail Deposit Keluar" : "Detail Deposit Masuk";

  document.title = `Transaksi - ${subTitle}`;

  // Handle Search in Top Bar
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    const found = allDeposits.find(
      (d) =>
        d.kodeDeposit?.toLowerCase().includes(q) ||
        d.nim?.toLowerCase().includes(q) ||
        d.nama?.toLowerCase().includes(q)
    );
    if (found) {
      setDeposit(found);
      setSearchParams({ id: found.id });
    } else {
      alert("Data transaksi deposit tidak ditemukan.");
    }
  };

  // Helper currency format
  const formatCurrencyDecimal = (val?: number | null) => {
    if (val === null || val === undefined) return "0,00";
    return `${val.toLocaleString("id-ID")},00`;
  };

  // Handle Form Submit from Case 1 (Deposit Masuk / Input)
  const handleFormSubmit = async (formData: DetailDepositFormData) => {
    if (!formData.mahasiswaText.trim()) {
      alert("Silakan cari dan pilih mahasiswa terlebih dahulu.");
      return;
    }
    if (formData.periode === "-- Pilih Periode --") {
      alert("Silakan pilih periode.");
      return;
    }
    if (formData.metodePembayaran === "-- Pilih Metode Pembayaran --") {
      alert("Silakan pilih metode pembayaran.");
      return;
    }
    if (!formData.nominal || formData.nominal <= 0) {
      alert("Nominal deposit harus lebih dari 0.");
      return;
    }

    setSaving(true);
    try {
      // Auto-generate deposit code
      const currentYear = new Date().getFullYear();
      const randomSeq = Math.floor(1000000 + Math.random() * 9000000)
        .toString()
        .slice(1);
      const generatedKode = `DEP/${currentYear}1/00${randomSeq.slice(0, 5)}`;

      const newDepositPayload: Partial<DepositData> = {
        kodeDeposit: generatedKode,
        nim: formData.nim || formData.mahasiswaText.split(" - ")[0] || "231106040904",
        nama: formData.nama || formData.mahasiswaText.split(" - ")[1] || formData.mahasiswaText,
        periode: formData.periode.includes(" ") ? formData.periode.replace(/\s+/g, "") : "20261",
        periodeDeposit: formData.periode,
        tanggal: formData.tglDeposit
          ? new Date(formData.tglDeposit).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }) + `, ${new Date().toLocaleTimeString("id-ID")}`
          : new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }) + `, ${new Date().toLocaleTimeString("id-ID")}`,
        metodePembayaran: formData.metodePembayaran,
        channel: formData.channel === "-- Pilih Channel --" ? "" : formData.channel,
        masuk: formData.nominal,
        keluar: null,
        posisiTransaksi: "Masuk",
        eksekutor: "Kasir BASK UIKA",
        uraian: formData.uraian || "",
        dokumenPendukung: formData.dokumenPendukung || "-",
        penerima: formData.penerima,
      };

      await transaksiApi.createDeposit(newDepositPayload);
      alert("Data deposit berhasil disimpan ke server!");
      navigate(ROUTES.TRANSAKSI.DEPOSIT);
    } catch (err) {
      console.error("Gagal menyimpan data deposit:", err);
      alert("Gagal menyimpan data deposit. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">{subTitle}</p>
      </div>

      {/* Main Container Card dengan background putih */}
      <div className="w-full bg-white shadow-md rounded-md border-t-green-800 border-t-4 p-5 sm:p-7">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-stretch sm:items-center pb-5 mb-5 border-b border-gray-100">
          {/* Sisi Kiri: Search Transaksi */}
          <div className="flex space-x-1 items-center">
            <TextField
              placeholder="Cari Transaksi"
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              onEnter={handleSearch}
              className="w-full sm:w-80 text-xs"
            />
            <button
              type="button"
              onClick={handleSearch}
              className={`p-2 text-white rounded cursor-pointer transition-colors shrink-0 ${
                isDetailView
                  ? "bg-[#3c8dbc] hover:bg-[#357ca5]"
                  : "bg-[#00a65a] hover:bg-[#008d4c]"
              }`}
              title="Cari Transaksi"
            >
              <IoMdSearch className="text-base" />
            </button>
          </div>

          {/* Sisi Kanan: Action Buttons */}
          <div className="flex space-x-2 items-center">
            <button
              type="button"
              onClick={() => navigate(ROUTES.TRANSAKSI.DEPOSIT)}
              className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 py-2 rounded flex items-center space-x-1.5 text-xs font-semibold cursor-pointer shadow-xs transition-colors"
            >
              <IoMdArrowBack className="text-base" />
              <span>Kembali ke Daftar</span>
            </button>

            {isDetailView ? (
              /* Case 2: Tombol + Tambah Baru */
              <button
                type="button"
                onClick={() => {
                  setDeposit(null);
                  setSearchParams({});
                  setSearchQuery("");
                }}
                className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded flex items-center space-x-1.5 text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                <IoMdAdd className="text-base" />
                <span>Tambah Baru</span>
              </button>
            ) : (
              /* Case 1: Tombol Simpan */
              <button
                type="submit"
                form="detail-deposit-form"
                disabled={saving}
                className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded flex items-center space-x-1.5 text-xs font-semibold cursor-pointer shadow-xs transition-colors disabled:opacity-50"
              >
                <IoMdSave className="text-base" />
                <span>{saving ? "Menyimpan..." : "Simpan"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            Memuat data detail deposit...
          </div>
        ) : isDetailView && deposit ? (
          /* ========================================================= */
          /* CASE 2: READ-ONLY VIEW DETAIL DEPOSIT (Seperti Gambar 5)  */
          /* ========================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {/* Kolom Kiri */}
            <div className="space-y-3">
              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Kode Deposit
                </span>
                <span className="text-gray-900 font-mono">
                  {deposit.kodeDeposit}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Mahasiswa
                </span>
                <span className="text-gray-900 font-medium">
                  {deposit.nim} - {deposit.nama}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Tgl. Deposit
                </span>
                <span className="text-gray-900">
                  {deposit.tanggal}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Periode
                </span>
                <span className="text-gray-900">
                  {deposit.periodeDeposit || deposit.periode}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Metode Pembayaran
                </span>
                <span className="text-gray-900">
                  {deposit.metodePembayaran || "-"}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Channel
                </span>
                <span className="text-gray-900">
                  {deposit.channel || "-"}
                </span>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-3">
              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Nominal
                </span>
                <span className="text-gray-900 font-semibold">
                  {formatCurrencyDecimal(deposit.keluar || deposit.masuk)}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Posisi Transaksi
                </span>
                <span className="text-gray-900">
                  {deposit.posisiTransaksi || (deposit.keluar ? "Keluar" : "Masuk")}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Eksekutor
                </span>
                <span className="text-gray-900">
                  {deposit.eksekutor || "-"}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Uraian
                </span>
                <span className="text-gray-900">
                  {deposit.uraian || "-"}
                </span>
              </div>

              <div className="flex items-center py-1 border-b border-gray-50">
                <span className="w-44 text-sm font-semibold text-blue-600 shrink-0">
                  Dokumen Pendukung
                </span>
                <span className="text-gray-900">
                  {deposit.dokumenPendukung || "-"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* CASE 1: INPUT FORM DEPOSIT MASUK (Seperti Gambar 1)       */
          /* ========================================================= */
          <div>
            <DetailDepositForm
              formId="detail-deposit-form"
              onSubmit={handleFormSubmit}
              onValidationError={() => setIsValidationModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Modal Validasi: Mohon mengisi isian yang bergaris merah (Gambar 3) */}
      <ValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        title="Informasi"
        message="Mohon mengisi isian yang bergaris merah"
      />
    </>
  );
}
