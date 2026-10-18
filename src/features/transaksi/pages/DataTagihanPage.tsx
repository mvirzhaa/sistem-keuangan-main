import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoChevronForward,
  IoChevronDown,
  IoClose,
  IoCalendarOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { ROUTES } from "../../../common/routes/routes";
import transaksiApi, { type TagihanItemData } from "../services/transaksi.api";

// Opsi Mahasiswa untuk auto-suggest
const defaultStudentList = [
  { nim: "261107010010", nama: "ZHAHRA TUSIFA", prodi: "S1 - Kesehatan Masyarakat" },
  { nim: "231106051399", nama: "ZIYAD RAIS", prodi: "S1 - Teknik Informatika" },
  { nim: "241203010997", nama: "LISKA FARIANDI DWIPUTRO", prodi: "S1 - Manajemen" },
  { nim: "221105010088", nama: "ANISA PUTRI", prodi: "S1 - Akuntansi" },
  { nim: "211105010366", nama: "AHMAD NABIL MUASSYAF KAMIL", prodi: "S1 - Teknik Informatika" },
  { nim: "231106040904", nama: "RIANDI SIDDIK HARAHAP", prodi: "S1 - Teknik Informatika" },
];

const jenisTagihanOptions = [
  "-- Pilih Jenis Tagihan --",
  "1011 - Uang Gedung Tahap 1",
  "1012 - Uang Gedung Tahap 2",
  "1090 - Sumbangan Fasilitas",
  "1000 - UKT KIP Kuliah (A)",
  "1010 - SPP",
  "1016 - Wakaf Masjid Ibn Khaldun",
  "1017 - Wakaf Uang Tunai",
  "1018 - TOEFL",
];

const periodeOptions = [
  "2026 Ganjil",
  "2026 Genap",
  "2025 Ganjil",
  "2025 Genap",
  "2024 Ganjil",
  "2024 Genap",
];

const bulanOptions = [
  "-- Pilih Bulan --",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const tahunOptions = [
  "-- Pilih Tahun --",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
];

const cicilanOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface CustomDatePickerProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function CustomDatePicker({
  id,
  value,
  onChange,
  placeholder = "dd-mm-yyyy",
}: CustomDatePickerProps) {
  return (
    <div className="relative flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 bg-white w-full">
      <div className="bg-gray-100 border-r border-gray-300 px-3 py-2 text-gray-500 flex items-center justify-center shrink-0">
        <IoCalendarOutline size={16} />
      </div>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white text-gray-700 focus:outline-none cursor-pointer"
      />
    </div>
  );
}

export default function DataTagihanPage() {
  document.title = "Transaksi - Data Tagihan";
  const navigate = useNavigate();

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchKode, setSearchKode] = useState<string>("");

  // Mahasiswa Autocomplete State
  const [mahasiswaInput, setMahasiswaInput] = useState<string>("");
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<{
    nim: string;
    nama: string;
    prodi: string;
  } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Form Fields State - Periode diberi default "2026 Ganjil" sesuai gambar
  const [penerima, setPenerima] = useState<string>("Mahasiswa");
  const [tglTagihan, setTglTagihan] = useState<string>("");
  const [periode, setPeriode] = useState<string>("2026 Ganjil");
  const [bulan, setBulan] = useState<string>("-- Pilih Bulan --");
  const [tahun, setTahun] = useState<string>("-- Pilih Tahun --");
  const [jenisTagihan, setJenisTagihan] = useState<string>("-- Pilih Jenis Tagihan --");
  const [cicilan, setCicilan] = useState<string>("1");

  const [tglTerbit, setTglTerbit] = useState<string>("");
  const [tglJatuhTempo, setTglJatuhTempo] = useState<string>("");
  const [nominal, setNominal] = useState<string>("");
  const [denda, setDenda] = useState<string>("0");
  const [potonganLangsung, setPotonganLangsung] = useState<string>("0");
  const [keterangan, setKeterangan] = useState<string>("");
  const [tglAkhirDispensasi, setTglAkhirDispensasi] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // Filter student suggestions
  const filteredStudents = defaultStudentList.filter(
    (s) =>
      s.nama.toLowerCase().includes(mahasiswaInput.toLowerCase()) ||
      s.nim.toLowerCase().includes(mahasiswaInput.toLowerCase()),
  );

  const handleSelectStudent = (student: {
    nim: string;
    nama: string;
    prodi: string;
  }) => {
    setSelectedMahasiswa(student);
    setMahasiswaInput(`${student.nim} - ${student.nama}`);
    setShowSuggestions(false);
  };

  // Simpan data tagihan baru
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validasi
    if (!mahasiswaInput.trim()) {
      setErrorMsg("Mahasiswa wajib diisi.");
      return;
    }
    if (!jenisTagihan || jenisTagihan === "-- Pilih Jenis Tagihan --") {
      setErrorMsg("Jenis Tagihan wajib dipilih.");
      return;
    }
    const nominalNum = parseFloat(nominal.replace(/\D/g, ""));
    if (isNaN(nominalNum) || nominalNum <= 0) {
      setErrorMsg("Nominal tagihan wajib diisi angka valid lebih dari 0.");
      return;
    }

    setSaving(true);
    try {
      const nim = selectedMahasiswa?.nim || mahasiswaInput.split(" - ")[0] || "261107010099";
      const nama = selectedMahasiswa?.nama || (mahasiswaInput.includes(" - ") ? mahasiswaInput.split(" - ")[1] : mahasiswaInput);
      const prodi = selectedMahasiswa?.prodi || "S1 - Teknik Informatika";

      const payload: Partial<TagihanItemData> & Record<string, any> = {
        penerima,
        nim,
        nama,
        prodi,
        tglTagihan: tglTagihan || new Date().toISOString().split("T")[0],
        periode,
        periodeTagihan: periode,
        periodeMasuk: periode.includes("2026") ? "20261" : "20241",
        bulan: bulan === "-- Pilih Bulan --" ? "-" : bulan,
        tahun: tahun === "-- Pilih Tahun --" ? "-" : tahun,
        jenisTagihan,
        jenis: jenisTagihan.split(" - ")[0],
        cicilan: parseInt(cicilan) || 1,
        tglTerbit: tglTerbit || "-",
        tglJatuhTempo: tglJatuhTempo || "-",
        nominal: nominalNum,
        denda: parseFloat(denda) || 0,
        potonganLangsung: parseFloat(potonganLangsung) || 0,
        potongan: parseFloat(potonganLangsung) || 0,
        keterangan: keterangan || "-",
        tglAkhirDispensasi: tglAkhirDispensasi || "-",
        lunas: false,
        statusPembayaran: "belum_lunas",
        bayar: 0,
      };

      const res = await transaksiApi.createTagihan(payload);
      const createdItem = (res as any)?.data || res;

      // Update cache di localStorage agar data baru langsung masuk & tampil di TagihanPage
      try {
        const cached = localStorage.getItem("cached_transaksi_tagihan");
        const list = cached ? JSON.parse(cached) : [];
        if (Array.isArray(list)) {
          list.unshift(createdItem);
          localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(list));
        }
        localStorage.setItem("active_filter_periode_tagihan", payload.periode || "2026 Ganjil");
      } catch {}

      setSuccessMsg("Data tagihan baru berhasil disimpan!");
      setTimeout(() => {
        navigate(ROUTES.TRANSAKSI.TAGIHAN);
      }, 700);
    } catch (err: any) {
      console.error("Gagal menyimpan tagihan:", err);
      setErrorMsg(err?.message || "Gagal menyimpan data tagihan. Pastikan server aktif.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Data Tagihan</p>
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
              placeholder="Cari Transaksi"
              value={searchKode}
              onChange={(e) => setSearchKode(e.target.value)}
              className="border-y border-gray-300 py-1.5 px-3 text-xs sm:text-sm focus:outline-none w-48 sm:w-64"
            />
            <button
              type="button"
              onClick={() => {}}
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
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm"
            >
              <IoChevronBack className="mr-1 text-sm font-bold" />
              Kembali ke Daftar
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm"
            >
              <IoSaveOutline className="mr-1.5 text-base" />
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs sm:text-sm rounded">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs sm:text-sm rounded">
            {successMsg}
          </div>
        )}

        {/* Main Body (Left Sidebar & Right Form) */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Sidebar Tabs (Bisa di-toggle sembunyikan) */}
          {isSidebarOpen && (
            <div className="w-full md:w-48 flex-shrink-0 flex flex-col space-y-1">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-xs sm:text-sm text-left transition-colors cursor-pointer border-l-4 border-sky-500 text-sky-600 font-semibold bg-sky-50/50"
              >
                Data Tagihan
              </button>
              <button
                type="button"
                disabled
                title="Tersedia setelah tagihan tersimpan"
                className="w-full py-2.5 px-4 text-xs sm:text-sm text-left border-l-4 border-transparent text-gray-400 font-medium cursor-not-allowed"
              >
                Potongan / Beasiswa
              </button>
              <button
                type="button"
                disabled
                title="Tersedia setelah tagihan tersimpan"
                className="w-full py-2.5 px-4 text-xs sm:text-sm text-left border-l-4 border-transparent text-gray-400 font-medium cursor-not-allowed"
              >
                Pembayaran
              </button>
            </div>
          )}

          {/* Right Content Form (2 Columns Grid) */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs sm:text-sm">
              {/* === KOLOM KIRI === */}
              <div className="space-y-3.5">
                {/* 1. Kode Tagihan */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Kode Tagihan
                  </label>
                  <div className="flex-1 py-1 text-gray-600 italic">
                    Generate Otomatis
                  </div>
                </div>

                {/* 2. Penerima* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Penerima<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <select
                      value={penerima}
                      onChange={(e) => setPenerima(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Pendaftar">Pendaftar</option>
                    </select>
                  </div>
                </div>

                {/* 3. Mahasiswa* (Cari Mahasiswa) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 relative">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Mahasiswa<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Cari Mahasiswa"
                      value={mahasiswaInput}
                      onChange={(e) => {
                        setMahasiswaInput(e.target.value);
                        setShowSuggestions(true);
                        setSelectedMahasiswa(null);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    {/* Dropdown Auto-suggest */}
                    {showSuggestions && mahasiswaInput.trim().length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-50">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((s) => (
                            <div
                              key={s.nim}
                              onMouseDown={() => handleSelectStudent(s)}
                              className="px-3 py-2 text-xs hover:bg-sky-50 cursor-pointer border-b border-gray-50 flex flex-col"
                            >
                              <span className="font-semibold text-gray-800">
                                {s.nim} - {s.nama}
                              </span>
                              <span className="text-gray-500 text-[11px]">
                                {s.prodi}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-xs text-gray-500">
                            Gunakan nama input: "{mahasiswaInput}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Tgl. Tagihan */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Tgl. Tagihan
                  </label>
                  <div className="flex-1">
                    <CustomDatePicker
                      value={tglTagihan}
                      onChange={setTglTagihan}
                    />
                  </div>
                </div>

                {/* 5. Periode* (Default: 2026 Ganjil sesuai gambar) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Periode<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1 relative">
                    <select
                      value={periode}
                      onChange={(e) => setPeriode(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 pr-8 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                    >
                      {periodeOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                      <IoChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* 6. Bulan */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Bulan
                  </label>
                  <div className="flex-1">
                    <select
                      value={bulan}
                      onChange={(e) => setBulan(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {bulanOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 7. Tahun */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Tahun
                  </label>
                  <div className="flex-1">
                    <select
                      value={tahun}
                      onChange={(e) => setTahun(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {tahunOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 8. Jenis Tagihan* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Jenis Tagihan<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <select
                      value={jenisTagihan}
                      onChange={(e) => setJenisTagihan(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {jenisTagihanOptions.map((jt) => (
                        <option key={jt} value={jt}>
                          {jt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 9. Cicilan Ke-* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Cicilan Ke-<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <select
                      value={cicilan}
                      onChange={(e) => setCicilan(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {cicilanOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* === KOLOM KANAN === */}
              <div className="space-y-3.5">
                {/* 1. Tgl. Terbit Tagihan */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Tgl. Terbit Tagihan
                  </label>
                  <div className="flex-1">
                    <CustomDatePicker
                      value={tglTerbit}
                      onChange={setTglTerbit}
                    />
                  </div>
                </div>

                {/* 2. Tgl. Jatuh Tempo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Tgl. Jatuh Tempo
                  </label>
                  <div className="flex-1">
                    <CustomDatePicker
                      value={tglJatuhTempo}
                      onChange={setTglJatuhTempo}
                    />
                  </div>
                </div>

                {/* 3. Nominal* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Nominal<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="0"
                      value={nominal}
                      onChange={(e) => setNominal(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 4. Denda* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Denda<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={denda}
                      onChange={(e) => setDenda(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                    />
                  </div>
                </div>

                {/* 5. Potongan Langsung* */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Potongan Langsung<span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={potonganLangsung}
                      onChange={(e) => setPotonganLangsung(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                    />
                  </div>
                </div>

                {/* 6. Keterangan */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Keterangan
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 7. Lunas? */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Lunas?
                  </label>
                  <div className="flex-1 py-1">
                    <IoClose className="text-red-500 font-bold text-lg" />
                  </div>
                </div>

                {/* 8. Tgl. Akhir Dispensasi */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <label className="w-40 sm:w-48 text-[#337ab7] font-semibold flex items-center shrink-0">
                    Tgl. Akhir Dispensasi
                  </label>
                  <div className="flex-1">
                    <CustomDatePicker
                      value={tglAkhirDispensasi}
                      onChange={setTglAkhirDispensasi}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
