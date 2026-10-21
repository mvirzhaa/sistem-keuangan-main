import React from "react";
import Dropdown from "../../../components/inputs/Dropdown";

export interface AturanAkademikFormData {
  jenisAturan: string;
  unitKerja: string;
  jenisTagihan: string;
  cicilanAwal: string;
  pemeriksaanTagihan: string;
  aturanPembayaran: string;
  pembayaranMinimal: string;
  validasiTagihan: boolean;
  status: boolean;
}

interface DetailPengaturanAturanAkademikFormProps {
  form: AturanAkademikFormData;
  onChange: (field: keyof AturanAkademikFormData, value: any) => void;
  isEdit: boolean;
  searchQuery?: string;
}

const jenisAturanOptions = [
  "-- Pilih Jenis Aturan --",
  "Pengambilan KRS reguler (Gasal/Genap)",
  "Pengambilan KRS Semester Pendek",
  "Presensi mahasiswa",
  "Mengambil Proposal",
  "Mengambil Skripsi",
  "Mengikuti UAS",
  "Mengikuti UTS",
  "Mengambil Cuti",
  "Melihat KHS",
  "Kegiatan Pendukung",
  "Daftar Ulang",
  "Generate Mahasiswa",
];

const unitKerjaOptions = [
  "-- Pilih Unit Kerja --",
  "Universitas Ibn Khaldun",
  "Fakultas Teknik dan Sains",
  "Fakultas Ilmu Kesehatan",
  "S1 - Pendidikan Masyarakat",
];

const jenisTagihanOptions = [
  "-- Pilih Jenis Tagihan --",
  "SPP",
  "Uang Gedung Tahap 1",
  "Uang Gedung Tahap 2",
  "Heregistrasi",
  "UPM (Uang Pembinaan Mahasiswa)",
  "SKS",
  "Ujian Akhir Semester",
  "Wakaf Masjid Ibn Khaldun",
  "Ta'aruf",
];

const cicilanAwalOptions = ["Semua Cicilan", "Cicilan ke-1", "Cicilan ke-2", "Cicilan ke-3"];

const pemeriksaanTagihanOptions = [
  "Periode Saat Ini dan Sebelumnya",
  "Hanya Periode Saat Ini",
];

const aturanPembayaranOptions = ["Persentase", "Nominal"];

export default function DetailPengaturanAturanAkademikForm({
  form,
  onChange,
  isEdit,
  searchQuery = "",
}: DetailPengaturanAturanAkademikFormProps) {
  const leftFields = [
    {
      id: "jenisAturan",
      label: "Jenis Aturan",
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.jenisAturan}</span>
      ),
      editComponent: (
        <Dropdown
          options={jenisAturanOptions}
          value={form.jenisAturan}
          onChange={(v) => onChange("jenisAturan", v)}
          className="w-full text-sm"
        />
      ),
    },
    {
      id: "unitKerja",
      label: "Unit Kerja",
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.unitKerja}</span>
      ),
      editComponent: (
        <Dropdown
          options={unitKerjaOptions}
          value={form.unitKerja}
          onChange={(v) => onChange("unitKerja", v)}
          className="w-full text-sm"
        />
      ),
    },
    {
      id: "jenisTagihan",
      label: "Jenis Tagihan",
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.jenisTagihan}</span>
      ),
      editComponent: (
        <Dropdown
          options={jenisTagihanOptions}
          value={form.jenisTagihan}
          onChange={(v) => onChange("jenisTagihan", v)}
          className="w-full text-sm"
        />
      ),
    },
    {
      id: "cicilanAwal",
      label: "Cicilan Awal",
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.cicilanAwal}</span>
      ),
      editComponent: (
        <Dropdown
          options={cicilanAwalOptions}
          value={form.cicilanAwal}
          onChange={(v) => onChange("cicilanAwal", v)}
          className="w-full text-sm"
        />
      ),
    },
    {
      id: "pemeriksaanTagihan",
      label: "Pemeriksaan Tagihan",
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.pemeriksaanTagihan}</span>
      ),
      editComponent: (
        <Dropdown
          options={pemeriksaanTagihanOptions}
          value={form.pemeriksaanTagihan}
          onChange={(v) => onChange("pemeriksaanTagihan", v)}
          className="w-full text-sm"
        />
      ),
    },
  ];

  const minLabel =
    form.aturanPembayaran === "Nominal"
      ? "Pembayaran Minimal (Rp)"
      : "Pembayaran Minimal (%)";

  const rightFields = [
    {
      id: "aturanPembayaran",
      label: "Aturan Pembayaran",
      required: false,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.aturanPembayaran}</span>
      ),
      editComponent: (
        <Dropdown
          options={aturanPembayaranOptions}
          value={form.aturanPembayaran}
          onChange={(v) => onChange("aturanPembayaran", v)}
          className="w-full text-sm"
        />
      ),
    },
    {
      id: "pembayaranMinimal",
      label: minLabel,
      required: true,
      viewComponent: (
        <span className="text-sm text-gray-800">{form.pembayaranMinimal}</span>
      ),
      editComponent: (
        <input
          type="text"
          value={form.pembayaranMinimal}
          onChange={(e) => onChange("pembayaranMinimal", e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full text-right focus:outline-none focus:border-blue-500 bg-white"
        />
      ),
    },
    {
      id: "validasiTagihan",
      label: "Validasi Tagihan",
      required: false,
      viewComponent: (
        <div className="flex items-center">
          {form.validasiTagihan ? (
            <span className="text-green-600 font-bold mr-1.5 text-sm">✔</span>
          ) : (
            <span className="text-red-500 font-bold mr-1.5 text-sm">✖</span>
          )}
          <span className="text-sm text-gray-800">
            Memeriksa bulan sesuai urutan cicilan
          </span>
        </div>
      ),
      editComponent: (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={form.validasiTagihan}
            onChange={(e) => onChange("validasiTagihan", e.target.checked)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-800">
            Memeriksa bulan sesuai urutan cicilan
          </span>
        </div>
      ),
    },
    {
      id: "status",
      label: "Status",
      required: false,
      viewComponent: (
        <div className="flex items-center">
          {form.status ? (
            <span className="text-green-600 font-bold mr-1.5 text-sm">✔</span>
          ) : (
            <span className="text-red-500 font-bold mr-1.5 text-sm">✖</span>
          )}
          <span className="text-sm text-gray-800">
            {form.status ? "Aktif" : "Tidak Aktif"}
          </span>
        </div>
      ),
      editComponent: (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={form.status}
            onChange={(e) => onChange("status", e.target.checked)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-800">Aktif</span>
        </div>
      ),
    },
  ];

  const query = searchQuery.trim().toLowerCase();
  const filteredLeft = leftFields.filter((item) =>
    item.label.toLowerCase().includes(query),
  );
  const filteredRight = rightFields.filter((item) =>
    item.label.toLowerCase().includes(query),
  );

  const isNoResults =
    query.length > 0 &&
    filteredLeft.length === 0 &&
    filteredRight.length === 0;

  return (
    <div className="py-4 text-sm">
      {isNoResults ? (
        <div className="py-8 text-center text-gray-500 text-sm">
          Pengaturan &quot;{searchQuery}&quot; tidak ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {/* Left Column */}
          <div>
            {filteredLeft.map((field) => (
              <div
                key={field.id}
                className={
                  isEdit
                    ? "flex items-center mb-4"
                    : "flex items-center py-3.5 border-b border-gray-100"
                }
              >
                <div className="w-1/2">
                  <label className="text-blue-600 font-semibold text-sm">
                    {field.label}
                    {isEdit && field.required && (
                      <span className="text-red-500 ml-0.5">*</span>
                    )}
                  </label>
                </div>
                <div className="w-1/2">
                  {isEdit ? field.editComponent : field.viewComponent}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {filteredRight.map((field) => (
              <div
                key={field.id}
                className={
                  isEdit
                    ? "flex items-center mb-4"
                    : "flex items-center py-3.5 border-b border-gray-100"
                }
              >
                <div className="w-1/2">
                  <label className="text-blue-600 font-semibold text-sm">
                    {field.label}
                    {isEdit && field.required && (
                      <span className="text-red-500 ml-0.5">*</span>
                    )}
                  </label>
                </div>
                <div className="w-1/2">
                  {isEdit ? field.editComponent : field.viewComponent}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
