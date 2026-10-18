import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import DatePicker from "../../../components/inputs/DatePicker";
import { apiService } from "../../../common/services/apiService";

export interface DetailDepositFormData {
  kodeDeposit?: string;
  penerima: string;
  nim: string;
  nama: string;
  mahasiswaText: string;
  tglDeposit: string;
  periode: string;
  metodePembayaran: string;
  channel: string;
  nominal: number;
  uraian: string;
  dokumenPendukung?: string;
}

interface DetailDepositFormProps {
  initialData?: Partial<DetailDepositFormData>;
  onSubmit?: (data: DetailDepositFormData) => void;
  onValidationError?: () => void;
  onChange?: (data: DetailDepositFormData) => void;
  formId?: string;
}

const getTodayDefaultDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const penerimaOptions = ["Mahasiswa", "Dosen", "Karyawan"];
const periodeOptions = [
  "-- Pilih Periode --",
  "2026 Ganjil",
  "2026 Genap",
  "2025 Ganjil",
  "2025 Genap",
  "2024 Genap",
  "2024 Ganjil",
];
const metodePembayaranOptions = [
  "-- Pilih Metode Pembayaran --",
  "Kasir BASK UIKA",
  "Bank Syariah Indonesia",
  "Deposit",
  "Cash",
  "Transfer",
  "Virtual Account",
  "QRIS",
  "SevimaPay",
];
const channelOptions = [
  "-- Pilih Channel --",
  "Bank Syariah Indonesia",
  "Bank BNI",
  "Bank Mandiri",
  "Bank BSI",
  "Shopee",
  "Tokopedia",
];

const fallbackStudents = [
  { nim: "231106040904", nama: "RIANDI SIDDIK HARAHAP" },
  { nim: "251106050012", nama: "Bima Mahardika" },
  { nim: "251106050024", nama: "MUHAMMAD LANTANG ASY'ARI" },
  { nim: "221104011915", nama: "ANGGA IRAWAN" },
  { nim: "221104021745", nama: "ENRICO SULTAN FAATHIR" },
  { nim: "242103022158", nama: "SYARIFUDDIN" },
  { nim: "211102010735", nama: "RADEN RENA AMELIA" },
  { nim: "251106040016", nama: "DEFFA SAPTA NUGRAHA" },
];

const DetailDepositForm: React.FC<DetailDepositFormProps> = ({
  initialData = {},
  onSubmit,
  onValidationError,
  onChange,
  formId = "detail-deposit-form",
}) => {
  const [formData, setFormData] = useState<DetailDepositFormData>({
    kodeDeposit: "Generate Otomatis",
    penerima: "Mahasiswa",
    nim: "",
    nama: "",
    mahasiswaText: "",
    tglDeposit: "",
    periode: "-- Pilih Periode --",
    metodePembayaran: "-- Pilih Metode Pembayaran --",
    channel: "-- Pilih Channel --",
    nominal: 0,
    uraian: "",
    dokumenPendukung: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({
    mahasiswa: false,
    periode: false,
    metodePembayaran: false,
    nominal: false,
  });

  const [studentList, setStudentList] = useState<{ nim: string; nama: string }[]>(fallbackStudents);
  const [suggestions, setSuggestions] = useState<{ nim: string; nama: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiService.get<any[]>("/students");
        if (res && res.data && res.data.length > 0) {
          const list = res.data.map((s) => ({
            nim: s.nim || "",
            nama: s.nama || s.fullName || s.name || "",
          }));
          setStudentList(list);
        }
      } catch {
        setStudentList(fallbackStudents);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const handleChange = (field: keyof DetailDepositFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "periode" && value !== "-- Pilih Periode --") {
      setErrors((prev) => ({ ...prev, periode: false }));
    }
    if (field === "metodePembayaran" && value !== "-- Pilih Metode Pembayaran --") {
      setErrors((prev) => ({ ...prev, metodePembayaran: false }));
    }
    if (field === "nominal" && Number(value) > 0) {
      setErrors((prev) => ({ ...prev, nominal: false }));
    }
  };

  const handleStudentSearch = (val: string) => {
    handleChange("mahasiswaText", val);
    if (val.trim()) {
      setErrors((prev) => ({ ...prev, mahasiswa: false }));
    }
    if (!val.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const q = val.toLowerCase();
    const matches = studentList.filter(
      (s) => s.nim.toLowerCase().includes(q) || s.nama.toLowerCase().includes(q)
    );
    setSuggestions(matches.slice(0, 8));
    setShowSuggestions(true);
  };

  const handleSelectStudent = (student: { nim: string; nama: string }) => {
    setFormData((prev) => ({
      ...prev,
      nim: student.nim,
      nama: student.nama,
      mahasiswaText: `${student.nim} - ${student.nama}`,
    }));
    setErrors((prev) => ({ ...prev, mahasiswa: false }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      mahasiswa: !formData.mahasiswaText.trim(),
      periode: !formData.periode || formData.periode === "-- Pilih Periode --",
      metodePembayaran:
        !formData.metodePembayaran ||
        formData.metodePembayaran === "-- Pilih Metode Pembayaran --",
      nominal: !formData.nominal || formData.nominal <= 0,
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      if (onValidationError) {
        onValidationError();
      }
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
      {/* Kolom Kiri */}
      <div className="space-y-4">
        {/* Kode Deposit */}
        <div className="flex items-center">
          <label className="w-36 text-sm font-semibold text-blue-600 shrink-0">
            Kode Deposit
          </label>
          <div className="flex-1">
            <span className="text-sm text-gray-700 font-medium">
              {formData.kodeDeposit || "Generate Otomatis"}
            </span>
          </div>
        </div>

        {/* Penerima */}
        <div className="flex items-center">
          <label className="w-36 text-sm font-semibold text-blue-600 shrink-0">
            Penerima<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <Dropdown
              options={penerimaOptions}
              value={formData.penerima}
              defaultValue={formData.penerima}
              onChange={(value) => handleChange("penerima", value)}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Mahasiswa */}
        <div className="flex items-center relative">
          <label className="w-36 text-sm font-semibold text-blue-600 shrink-0">
            Mahasiswa<span className="text-red-500">*</span>
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.mahasiswaText}
              onChange={(e) => handleStudentSearch(e.target.value)}
              onFocus={() => {
                if (formData.mahasiswaText.trim()) setShowSuggestions(true);
              }}
              placeholder="Cari Mahasiswa"
              className={`w-full rounded px-3 py-2 text-xs focus:outline-none bg-white transition-colors ${
                errors.mahasiswa
                  ? "border border-red-500 ring-1 ring-red-500"
                  : "border border-gray-300 focus:ring-1 focus:ring-blue-500"
              }`}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-56 overflow-y-auto">
                {suggestions.map((s) => (
                  <div
                    key={s.nim}
                    onClick={() => handleSelectStudent(s)}
                    className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800">{s.nama}</span>
                    <span className="font-mono text-gray-500">{s.nim}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tgl. Deposit */}
        <div className="flex items-center">
          <label className="w-36 text-sm font-semibold text-blue-600 shrink-0">
            Tgl. Deposit
          </label>
          <div className="flex-1">
            <DatePicker
              value={formData.tglDeposit}
              onChange={(value) => handleChange("tglDeposit", value)}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Periode */}
        <div className="flex items-center">
          <label className="w-36 text-sm font-semibold text-blue-600 shrink-0">
            Periode<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <Dropdown
              options={periodeOptions}
              value={formData.periode}
              defaultValue={formData.periode}
              error={errors.periode}
              onChange={(value) => handleChange("periode", value)}
              className="w-full text-xs"
            />
          </div>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="space-y-4">
        {/* Metode Pembayaran */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-semibold text-blue-600 shrink-0">
            Metode Pembayaran<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <Dropdown
              options={metodePembayaranOptions}
              value={formData.metodePembayaran}
              defaultValue={formData.metodePembayaran}
              error={errors.metodePembayaran}
              onChange={(value) => handleChange("metodePembayaran", value)}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Channel */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-semibold text-blue-600 shrink-0">
            Channel
          </label>
          <div className="flex-1">
            <Dropdown
              options={channelOptions}
              value={formData.channel}
              defaultValue={formData.channel}
              onChange={(value) => handleChange("channel", value)}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Nominal */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-semibold text-blue-600 shrink-0">
            Nominal<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <input
              type="number"
              value={formData.nominal === 0 ? "" : formData.nominal}
              onChange={(e) => handleChange("nominal", Number(e.target.value) || 0)}
              placeholder="0"
              className={`w-full rounded px-3 py-2 text-xs focus:outline-none bg-white transition-colors ${
                errors.nominal
                  ? "border border-red-500 ring-1 ring-red-500"
                  : "border border-gray-300 focus:ring-1 focus:ring-blue-500"
              }`}
            />
          </div>
        </div>

        {/* Uraian */}
        <div className="flex items-start">
          <label className="w-40 text-sm font-semibold text-blue-600 shrink-0 pt-2">
            Uraian
          </label>
          <div className="flex-1">
            <textarea
              value={formData.uraian}
              onChange={(e) => handleChange("uraian", e.target.value)}
              className="w-full border border-gray-300 rounded p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              rows={4}
              placeholder=""
            />
          </div>
        </div>

        {/* Dokumen Pendukung (Gambar 2) */}
        <div className="flex items-start">
          <label className="w-40 text-sm font-semibold text-blue-600 shrink-0 pt-1">
            Dokumen Pendukung
          </label>
          <div className="flex-1">
            <input
              type="file"
              accept=".jpg,.jpeg,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                handleChange("dokumenPendukung", file ? file.name : "");
              }}
              className="text-xs text-gray-700 file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border file:border-gray-300 file:text-xs file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
            />
            <p className="text-xs text-[#0099cc] mt-1 font-normal">
              jpg, jpeg, pdf (maxsize: 5 MB)
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailDepositForm;
